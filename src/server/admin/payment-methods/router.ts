import { createTRPCRouter } from "@/server/trpc";
import manualDepositMethodRouter from "./manual-deposit/router";
import withdrawRouter from "./withdraw/router";
import instantDepositRouter from "./instant-deposit/router";

const withdraw = withdrawRouter;
const manualDeposit = manualDepositMethodRouter;
const instantDeposit = instantDepositRouter;

const paymentMethodRouter = createTRPCRouter({
  withdraw,
  manualDeposit,
  instantDeposit,
});
export default paymentMethodRouter;
