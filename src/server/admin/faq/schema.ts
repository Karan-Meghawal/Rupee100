import { object, string, undefined, type TypeOf } from "zod";

const create = object({
  id: string().optional(),
  question: string().nonempty("Question is required"),
  answer: string().nonempty("Answer is required"),
});

const remove = string().nonempty("Id is required");
const records = undefined();

export type FaqsSchema = {
  create: TypeOf<typeof create>;
  remove: TypeOf<typeof remove>;
  records: TypeOf<typeof records>;
};

const faqSchema = {
  create,
  remove,
  records,
};

export default faqSchema;
