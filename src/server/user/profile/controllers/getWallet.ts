import { type UserContext } from "@/server/trpc";
import { type ProfileSchema } from "../schema";

const getWallet = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["getWallet"];
}) => {};
export default getWallet;
