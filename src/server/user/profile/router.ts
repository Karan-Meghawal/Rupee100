import { createTRPCRouter, userProcedure } from "@/server/trpc";
import profileController from "./controllers";
import { profileSchema } from "./schema";

const getSession = userProcedure
  .input(profileSchema.getSession)
  .query(({ ctx, input }) => profileController.getSession({ ctx, input }));

const getWallet = userProcedure
  .input(profileSchema.getWallet)
  .query(({ ctx, input }) => profileController.getWallet({ ctx, input }));

const updateProfile = userProcedure
  .input(profileSchema.updateProfile)
  .mutation(({ ctx, input }) =>
    profileController.updateProfile({ ctx, input }),
  );

const updateAvatar = userProcedure
  .input(profileSchema.updateAvatar)
  .mutation(({ ctx, input }) => profileController.updateAvatar({ ctx, input }));

const changePassword = userProcedure
  .input(profileSchema.changePassword)
  .mutation(({ ctx, input }) =>
    profileController.changePassword({ ctx, input }),
  );

const updateContact = userProcedure
  .input(profileSchema.updateContact)
  .mutation(({ ctx, input }) =>
    profileController.updateContact({ ctx, input }),
  );

const verifyKyc = userProcedure
  .input(profileSchema.verifyKyc)
  .mutation(({ ctx, input }) => profileController.verifyKyc({ ctx, input }));

const expireToken = userProcedure
  .input(profileSchema.expireToken)
  .mutation(({ ctx, input }) => profileController.expireToken({ ctx, input }));

const logoutAll = userProcedure
  .input(profileSchema.logoutAll)
  .mutation(({ ctx, input }) => profileController.logoutAll({ ctx, input }));

const twoFA = userProcedure
  .input(profileSchema.twoFA)
  .mutation(({ ctx, input }) => profileController.twoFA({ ctx, input }));

const getLoginSessions = userProcedure
  .input(profileSchema.loginSessions)
  .query(({ ctx, input }) => profileController.loginSessions({ ctx, input }));

const getLastKyc = userProcedure
  .input(profileSchema.getLastKyc)
  .query(({ ctx, input }) => profileController.getLastKyc({ ctx, input }));

const profileRouter = createTRPCRouter({
  getSession,
  getWallet,
  updateProfile,
  updateAvatar,
  changePassword,
  updateContact,
  verifyKyc,
  expireToken,
  logoutAll,
  twoFA,
  getLoginSessions,
  getLastKyc,
});

export default profileRouter;
