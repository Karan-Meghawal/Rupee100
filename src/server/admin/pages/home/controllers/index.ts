import deleteHowItWork from "./deleteHowItWork";
import deleteService from "./deleteService";
import getRecord from "./getRecord";
import updateHero from "./updateHero";
import updateHowItWorks from "./updateHowItWorks";
import updateHowItWorksSection from "./updateHowItWorksSection";
import updateService from "./updateService";
import updateServicesSection from "./updateServicesSection";

const homeController = {
  getRecord,
  updateHero,
  updateHowItWorks,
  updateService,
  deleteService,
  deleteHowItWork,
  updateServicesSection,
  updateHowItWorksSection,
};
export default homeController;
