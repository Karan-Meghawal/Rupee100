import { createTRPCRouter } from "@/server/trpc";
import aboutUsRouter from "./aboutUs/router";
import homeRouter from "./home/router";

const home = homeRouter;
const aboutUs = aboutUsRouter;

const pagesRouter = createTRPCRouter({
  home,
  aboutUs,
});
export default pagesRouter;
