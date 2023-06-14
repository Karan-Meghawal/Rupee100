import { type UserContactRequired } from "@/server/services/User";
import { type UserContext } from "@/server/trpc";
import { jsonResponse } from "@/server/utils/fns";
import { type ProfileSchema } from "../schema";

const updateContact = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: ProfileSchema["updateContact"];
}) => {
  const { user } = ctx;
  const data: UserContactRequired = {
    ...input,
    pinCode: Number(input.pinCode),
  };

  await user.updateContact(data);
  return jsonResponse("Contact details have been updated", {
    data,
  });
};
export default updateContact;
