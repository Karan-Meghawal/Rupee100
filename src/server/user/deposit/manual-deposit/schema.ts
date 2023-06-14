import { coerce, date, object, string, undefined, type TypeOf } from "zod";

const getRecords = undefined();
const createPayment = object({
  id: string().nonempty("Id is required"),
  amount: coerce.number().min(1),
  transactionId: string().nonempty("Transaction Id is required"),
  paymentImage: string().nonempty("Payment Image is required"),
  transactionDate: string()
    .nonempty("Transaction Date is required")
    .or(date().transform((date) => date.toISOString())),
});

export type ManualDepositSchema = {
  getRecords: TypeOf<typeof getRecords>;
  createPayment: TypeOf<typeof createPayment>;
};

const manualDepositSchema = { getRecords, createPayment };
export default manualDepositSchema;
