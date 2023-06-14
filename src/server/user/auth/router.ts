import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import authController from "./controllers";
import { authSchema } from "./schema";

const register = publicProcedure
  .input(authSchema.register)
  .mutation(({ input }) => authController.register({ input }));

const login = publicProcedure
  .input(authSchema.login)
  .mutation(({ input, ctx }) => authController.login({ input, ctx }));

const forgotPassword = publicProcedure
  .input(authSchema.forgotPassword)
  .mutation(({ input }) => authController.forgotPassword({ input }));

const resetPassword = publicProcedure
  .input(authSchema.resetPassword)
  .mutation(({ input }) => authController.resetPassword({ input }));

const checkReferralId = publicProcedure
  .input(authSchema.checkReferralId)
  .mutation(({ input }) => authController.checkReferralId({ input }));

const checkPlacementId = publicProcedure
  .input(authSchema.checkPlacementId)
  .mutation(({ input }) => authController.checkPlacementId({ input }));

const checkUserName = publicProcedure
  .input(authSchema.checkUserName)
  .mutation(({ input }) => authController.checkUserName({ input }));

const checkPlacementSide = publicProcedure
  .input(authSchema.checkPlacementSide)
  .mutation(({ input }) => authController.checkPlacementSide({ input }));

const getNewUser = publicProcedure
  .input(authSchema.getNewUser)
  .query(({ input }) => authController.getNewUser({ input }));

const authRouter = createTRPCRouter({
  register,
  login,
  forgotPassword,
  resetPassword,
  checkReferralId,
  checkPlacementId,
  checkUserName,
  checkPlacementSide,
  getNewUser,
});

export default authRouter;
