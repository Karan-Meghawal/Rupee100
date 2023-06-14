import InstantDepositMethod from "@/server/services/InstantDepositMethod";
import { type UserContext } from "@/server/trpc";
import { ClientError } from "@/server/utils/errors";
import { type InstantDepositSchema } from "../schema";
import createCoinbaseTxn from "./coinbase";
import createCoingateTxn from "./coingate";

const createTxn = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: InstantDepositSchema["createTxn"];
}) => {
  const { id, amount } = input;
  const method = await InstantDepositMethod.getInstance(id);
  method.checkStatus();
  const { uniqueId } = method.row;

  switch (uniqueId) {
    case "coinbase":
      return createCoinbaseTxn({ amount, ctx, method });
    case "coingate":
      return createCoingateTxn({ amount, ctx, method });
    default:
      throw ClientError("No Such Deposit Method");
  }
};
export default createTxn;
