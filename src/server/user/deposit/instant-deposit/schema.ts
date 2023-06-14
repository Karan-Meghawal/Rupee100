import { coerce, object, undefined, type TypeOf, string } from "zod";

const createTxn = object({
  id: string().nonempty("Id is required"),
  amount: string()
    .transform(Number)
    .pipe(coerce.number().gt(0))
    .or(coerce.number().gt(0)),
});
const getRecords = undefined();

export type InstantDepositSchema = {
  createTxn: TypeOf<typeof createTxn>;
  getRecords: TypeOf<typeof getRecords>;
};
const instantDepositSchema = {
  createTxn,
  getRecords,
};
export default instantDepositSchema;
