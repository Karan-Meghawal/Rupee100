import { type UserContext } from "@/server/trpc";
import { type ProfileSchema } from "../schema";

const getSession = ({
  ctx,
}: {
  ctx: UserContext;
  input: ProfileSchema["getSession"];
}) => {
  const { user } = ctx;
  return user.toJSON();
};
export default getSession;
