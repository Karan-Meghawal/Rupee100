import { object, string, undefined, type TypeOf } from "zod";

const commissionPolicy = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
});

const contactUs = object({
  title: string().nonempty("Title is required"),
  subtitle: string().nonempty("Subtitle is required"),
  whatsapp: string().nonempty("Whatsapp is required"),
  email: string().nonempty("Email is required"),
  location: string().nonempty("Location is required"),
});

const faq = object({
  title: string().nonempty("Title is required"),
  subtitle: string().nonempty("Subtitle is required"),
});

const getSection = undefined();

const hero = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
  image: string().nonempty("Image is required"),
  button: string().nonempty("Button is required"),
});

const login = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
  image: string().nonempty("Image is required"),
});

const privacyPolicy = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
});

const refundPolicy = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
});

const termsConditions = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
});

const socialLinks = object({
  whatsapp: string().optional(),
  discord: string().optional(),
  facebook: string().optional(),
  instagram: string().optional(),
  linkedin: string().optional(),
  telegram: string().optional(),
  twitter: string().optional(),
  youtube: string().optional(),
});
export type SectionSchema = {
  commissionPolicy: TypeOf<typeof commissionPolicy>;
  contactUs: TypeOf<typeof contactUs>;
  faq: TypeOf<typeof faq>;
  getSection: TypeOf<typeof getSection>;
  hero: TypeOf<typeof hero>;
  login: TypeOf<typeof login>;
  privacyPolicy: TypeOf<typeof privacyPolicy>;
  refundPolicy: TypeOf<typeof refundPolicy>;
  socialLinks: TypeOf<typeof socialLinks>;
  termsConditions: TypeOf<typeof termsConditions>;
};

export const sectionSchema = {
  commissionPolicy,
  contactUs,
  faq,
  getSection,
  hero,
  login,
  privacyPolicy,
  refundPolicy,
  socialLinks,
  termsConditions,
};
