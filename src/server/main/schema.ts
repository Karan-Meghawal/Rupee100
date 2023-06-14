import { object, string, undefined, type TypeOf } from "zod";

const contactUs = object({
  firstName: string().nonempty("First Name is required"),
  lastName: string().nonempty("Last Name is required"),
  email: string().nonempty("Email is required").email("Email must be valid"),
  phone: string().nonempty("Phone Number is required"),
  message: string().nonempty("Message is required"),
});

const configuration = undefined();
const faq = undefined();
const plan = undefined();
const sections = undefined();
const pageHome = undefined();
const pageAboutUs = undefined();
const socialLinks = undefined();
const getKycData = undefined();

export type HomeSchema = {
  contactUs: TypeOf<typeof contactUs>;
  getKycData: TypeOf<typeof getKycData>;
};

const mainSchema = {
  configuration,
  contactUs,
  faq,
  plan,
  sections,
  pageHome,
  pageAboutUs,
  socialLinks,
  getKycData,
};
export default mainSchema;
