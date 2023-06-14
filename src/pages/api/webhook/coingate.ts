/* eslint-disable @typescript-eslint/naming-convention */
import { prisma } from "@/server/db";
import Deposit from "@/server/services/Deposit";
import { type NextApiRequest, type NextApiResponse } from "next";
import { object, string } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST")
      return res.status(500).json({ message: "Invalid request" });

    const body = req.body as string;

    const response = object({
      token: string().nonempty(),
      status: string().nonempty(),
      price_amount: string(),
      price_currency: string(),
      receive_currency: string(),
    }).parse(body);

    const { token, status, price_amount, price_currency, receive_currency } =
      response;
    const coingateId = token;

    const deposit = await Deposit.getInstanceByCoingateId(coingateId);
    const { transactionId, status: dbStatus, amount: dbAmount } = deposit.row;
    const dbCurrency = deposit.currency;

    // check for amount
    if (Number(dbAmount) !== Number(price_amount))
      throw new Error("Transaction amount not matching");

    // check for currency
    if (
      dbCurrency.toLowerCase() !== price_currency.toLowerCase() ||
      dbCurrency.toLowerCase() !== receive_currency.toLowerCase()
    )
      throw new Error("Payment failed invalid currency");

    if (dbStatus === "pending") {
      if (status === "paid") {
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
      } else if (status === "invalid") {
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
      }
    }

    return res.status(200).send("Successful");
  } catch (error) {
    return res.status(500).send(`Something went wrong`);
  }
}
