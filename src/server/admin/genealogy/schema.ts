import { undefined, type TypeOf } from "zod";

const genealogy = undefined();

export type NetworkSchema = {
  genealogy: TypeOf<typeof genealogy>;
};
const networkSchema = { genealogy };
export default networkSchema;
