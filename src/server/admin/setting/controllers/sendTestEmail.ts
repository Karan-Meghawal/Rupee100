import Email from "@/server/services/Email";
import { jsonResponse } from "@/server/utils/fns";
import { type SettingSchema } from "../schema";

const sendTestEmail = async({
  input,
}: {
  input: SettingSchema["sendTestEmail"];
}) => {
  await Email.sendTestMail(input.email);
  return jsonResponse("Test Mail has been sent");
};
export default sendTestEmail;
