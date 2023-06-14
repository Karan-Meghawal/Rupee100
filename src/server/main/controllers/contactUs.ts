import Email from "@/server/services/Email";
import { jsonResponse } from "@/server/utils/fns";
import { type HomeSchema } from "../schema";

const contactUs = ({ input }: { input: HomeSchema["contactUs"] }) => {
  void Email.sendContactUsMail(input);
  return jsonResponse("Thanks for contacting us. We will reply soon.");
};

export default contactUs;
