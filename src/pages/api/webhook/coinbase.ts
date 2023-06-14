import { prisma } from "@/server/db";
import Deposit from "@/server/services/Deposit";
import InstantDepositMethod, {
  type CoinbaseConfig,
} from "@/server/services/InstantDepositMethod";
import { type InstantDepositMethod_UniqueId } from "@prisma/client";
import type coinbase from "coinbase-commerce-node";
import { Webhook } from "coinbase-commerce-node";
import { buffer } from "micro";
import { type NextApiRequest, type NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST")
      return res.status(500).json({ message: "Invalid request" });

    const signature = req.headers["x-cc-webhook-signature"];
    const rawBody = (await buffer(req)) as unknown as string;

    if (typeof signature !== "string") throw new Error("Invalid signature");

    const uniqueId: InstantDepositMethod_UniqueId = "coinbase";
    const method = await InstantDepositMethod.getInstanceByUniqueId(uniqueId);
    const CoinbaseConfig = method.getConfig<CoinbaseConfig>("coinbase");

    const event = Webhook.verifyEventBody(
      rawBody,
      signature,
      CoinbaseConfig.WEBHOOK_SECRET,
    );

    const data = <coinbase.ChargeResource>event.data;
    const coinbaseId = data.id;
    const { amount: coinbaseAmount, currency } = data.pricing.local;

    const deposit = await Deposit.getInstanceByCoinbaseId(coinbaseId);
    const { transactionId, status, amount } = deposit.row;
    const dbCurrency = deposit.currency;

    // check for amount
    if (Number(amount) !== Number(coinbaseAmount))
      throw new Error("Transaction amount not matching");

    // check for currency
    if (dbCurrency.toLowerCase() !== currency.toLowerCase())
      throw new Error("Payment failed invalid currency");

    if (status === "pending") {
      switch (event.type) {
        case "charge:confirmed":
          // update db status
          await prisma.$transaction([
            prisma.deposit.update({
              where: {
                transactionId,
              },
              data: {
                status: "credit",
              },
            }),
            prisma.transaction.update({
              where: {
                id: transactionId,
              },
              data: {
                status: "credit",
              },
            }),
          ]);

          break;

        case "charge:failed":
          // update db status
          await prisma.$transaction([
            prisma.deposit.update({
              where: {
                transactionId,
              },
              data: {
                status: "failed",
              },
            }),
            prisma.transaction.update({
              where: {
                id: transactionId,
              },
              data: {
                status: "failed",
              },
            }),
          ]);
          break;

        default:
          break;
      }
    }

    return res.status(200).send("Successful");
  } catch (error) {
    return res.status(500).send(`Something went wrong`);
  }
}
