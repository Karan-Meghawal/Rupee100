/* eslint-disable @typescript-eslint/naming-convention */
import { prisma } from "@/server/db";
import type InstantDepositMethod from "@/server/services/InstantDepositMethod";
import { type CoingateConfig } from "@/server/services/InstantDepositMethod";
import { type UserContext } from "@/server/trpc";
import { formatApiUrl } from "@/server/utils/fns";
import coingate from "coingate-v2";

const createCoingateTxn = async ({
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
  const { name: gatewayName } = method.row;

  const charge = method.calcCharge(amount);
  const netAmount = amount + charge;
  const status = "pending";
  const category = "deposit";
  const description = `deposit - ${gatewayName}`;
  const currency = "USD";

  const CoingateConfig = method.getConfig<CoingateConfig>("coingate");
  const { testClient, client } = coingate;

  const Coingate =
    CoingateConfig.ENVIRONMENT === "production"
      ? client(CoingateConfig.AUTH_TOKEN)
      : testClient(CoingateConfig.AUTH_TOKEN);

  const price_amount = netAmount;
  const price_currency = currency;
  const receive_currency = currency;
  const callback_url = CoingateConfig.CALLBACK_URL;
  const cancel_url = CoingateConfig.CANCEL_URL;
  const success_url = CoingateConfig.SUCCESS_URL;

  const url = await prisma.$transaction(async (prismaTx) => {
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

    const order = await Coingate.createOrder({
      price_amount,
      price_currency,
      receive_currency,
      callback_url,
      cancel_url,
      success_url,
      description: "Pay to deposit",
      order_id: transactionId,
      title: "Jamsrworld",
    });
    const coingateId = order.token;

    // create deposit
    await prismaTx.deposit.create({
      data: {
        coingateId,
        transactionId,
        userId,
        amount: netAmount,
        charge,
        netAmount: amount,
        status,
        chargeType: method.row.chargeType,
        method: {
          logo: formatApiUrl(method.row.logo),
          name: method.row.name,
        },
        type: "instant",
      },
    });

    return order.payment_url;
  });

  return { url };
};
export default createCoingateTxn;
