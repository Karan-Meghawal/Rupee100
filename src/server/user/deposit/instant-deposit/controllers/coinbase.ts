import { prisma } from "@/server/db";
import type InstantDepositMethod from "@/server/services/InstantDepositMethod";
import { type CoinbaseConfig } from "@/server/services/InstantDepositMethod";
import Setting from "@/server/services/Setting";
import { type UserContext } from "@/server/trpc";
import coinbase from "coinbase-commerce-node";

const createCoinbaseTxn = async ({
  ctx,
  amount,
  method,
}: {
  ctx: UserContext;
  amount: number;
  method: InstantDepositMethod;
}) => {
  const { user } = ctx;
  const { userId } = user.row;
  const displayName = user.getDisplayName();

  const { name: gatewayName } = method.row;
  const charge = method.calcCharge(amount);
  const netAmount = amount + charge;
  const status = "pending";
  const category = "deposit";
  const description = `deposit - ${gatewayName}`;
  const currency = "USD";

  const {
    row: { appName },
  } = await Setting.getInstance();

  const CoinbaseConfig = method.getConfig<CoinbaseConfig>("coinbase");

  const { Client, resources } = coinbase;
  Client.init(CoinbaseConfig.API_KEY);
  const { Charge } = resources;

  // create coinbase order
  const order = await Charge.create({
    name: appName,
    description: appName,
    pricing_type: "fixed_price",
    local_price: {
      amount: String(netAmount),
      currency,
    },
    metadata: {
      user: displayName,
    },
    cancel_url: CoinbaseConfig.CANCEL_URL,
    redirect_url: CoinbaseConfig.SUCCESS_URL,
  });
  const coinbaseId = order.id;

  await prisma.$transaction(async (prismaTx) => {
    // create transaction
    const transaction = await prismaTx.transaction.create({
      data: {
        userId,
        amount: netAmount,
        charge,
        netAmount: amount,
        category,
        status,
        description,
      },
    });
    const transactionId = transaction.id;

    // create deposit
    await prismaTx.deposit.create({
      data: {
        coinbaseId,
        transactionId,
        userId,
        amount: netAmount,
        charge,
        netAmount: amount,
        status,
        chargeType: method.row.chargeType,
        method: {
          logo: method.row.logo,
          name: method.row.name,
        },
        type: "instant",
      },
    });
  });
  return { url: order.hosted_url };
};
export default createCoinbaseTxn;
