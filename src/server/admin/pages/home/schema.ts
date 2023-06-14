import { getYouTubeVideoID } from "@/utils/fns";
import { object, string, undefined, type TypeOf } from "zod";

const getRecord = undefined();

const updateHero = object({
  title: string().nonempty("Title is required"),
  description: string().nonempty("Description is required"),
  button: string().nonempty("Button is required"),
  video: string()
    .nonempty("Video is required")
    .refine(
      (val) => {
        const id = getYouTubeVideoID(val);
        return !!id;
      },
      {
        message: "Unable to get id from url. Check if url is valid youtube url",
      },
    ),
});

const updateHowItWorks = object({
  id: string().optional(),
  image: string().nonempty("Image is required"),
  heading: string().nonempty("Heading is required"),
  description: string().nonempty("Description is required"),
});

const updateService = object({
  id: string().optional(),
  heading: string().nonempty("Heading is required"),
  description: string().nonempty("Description is required"),
  icon: string().nonempty("Icon is required"),
});

const deleteService = string().nonempty("Id is required");
const deleteHowItWork = string().nonempty("Id is required");

const updateServicesSection = object({
  heading: string().nonempty("Heading is required"),
  subheading: string().nullable(),
});
const updateHowItWorksSection = object({
  heading: string().nonempty("Heading is required"),
  subheading: string().nullish(),
});

export type HomeSchema = {
  getRecord: TypeOf<typeof getRecord>;
  updateHero: TypeOf<typeof updateHero>;
  updateHowItWorks: TypeOf<typeof updateHowItWorks>;
  updateService: TypeOf<typeof updateService>;
  deleteService: TypeOf<typeof deleteService>;
  deleteHowItWork: TypeOf<typeof deleteHowItWork>;
  updateServicesSection: TypeOf<typeof updateServicesSection>;
  updateHowItWorksSection: TypeOf<typeof updateHowItWorksSection>;
};

const homeSchema = {
  getRecord,
  updateHero,
  updateHowItWorks,
  updateService,
  deleteService,
  deleteHowItWork,
  updateServicesSection,
  updateHowItWorksSection,
};
export default homeSchema;
