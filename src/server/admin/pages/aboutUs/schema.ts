import { array, object, string, undefined, type TypeOf } from "zod";

const updateHero = object({
  title: string().nonempty("Title is required"),
  subtitle: string().nonempty("Subtitle is required"),
  description: string().nonempty("Description is required"),
  image: string().nonempty("Image is required"),
  features: array(
    object({
      feature: string().nonempty("Feature is required"),
    }),
  )
    .nonempty()
    .min(2, "Minimum 2 Feature is required"),
});

const updateOurMission = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
  image: string().nonempty("Image is required"),
});

const updateFooterDescription = object({
  footer: string().nonempty("Footer Description is required"),
});

const getRecord = undefined();

export type AboutUsSchema = {
  getRecord: TypeOf<typeof getRecord>;
  updateHero: TypeOf<typeof updateHero>;
  updateOurMission: TypeOf<typeof updateOurMission>;
  updateFooterDescription: TypeOf<typeof updateFooterDescription>;
};

const aboutUsSchema = {
  getRecord,
  updateHero,
  updateOurMission,
  updateFooterDescription,
};
export default aboutUsSchema;
