import { baseRegister } from "@/server/user/auth/schema";
import { intersection, object, string, type TypeOf } from "zod";

const install = intersection(
  baseRegister,
  object({
    license: string().nonempty("License is required"),
  }),
);

export type ConfigurationSchema = {
  install: TypeOf<typeof install>;
};

const configurationSchema = {
  install,
};

export default configurationSchema;
