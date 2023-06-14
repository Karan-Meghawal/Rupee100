import { type AdminContext } from "@/server/trpc";
import { type SectionSchema } from "../schema";

const login = async ({
  input,
}: {
  input: SectionSchema["login"];
  ctx: AdminContext;
}) => {
  // await prisma.section.updateMany({
  //   data: {
  //     login: input,
  //   },
  // });
  // return jsonResponse("Login Page has been updated", { data: input });
};
export default login;
