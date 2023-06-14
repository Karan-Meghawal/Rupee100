import { adminProcedure, createTRPCRouter } from "@/server/trpc";
import userController from "./controllers";
import userSchema from "./schema";

const getRecords = adminProcedure
  .input(userSchema.getRecords)
  .query(({ ctx, input }) => userController.getRecords({ ctx, input }));

const getProfile = adminProcedure
  .input(userSchema.getProfile)
  .query(({ ctx, input }) => userController.getProfile({ ctx, input }));

const updateProfile = adminProcedure
  .input(userSchema.updateProfile)
  .mutation(({ ctx, input }) => userController.updateProfile({ ctx, input }));

const updateStatus = adminProcedure
  .input(userSchema.updateStatus)
  .mutation(({ ctx, input }) => userController.updateStatus({ ctx, input }));

const deposit = adminProcedure
  .input(userSchema.deposit)
  .mutation(({ ctx, input }) => userController.deposit({ ctx, input }));

const withdraw = adminProcedure
  .input(userSchema.withdraw)
  .mutation(({ ctx, input }) => userController.withdraw({ ctx, input }));

const login = adminProcedure
  .input(userSchema.login)
  .mutation(({ ctx, input }) => userController.login({ ctx, input }));

const usersRouter = createTRPCRouter({
  deposit,
  getProfile,
  getRecords,
  login,
  updateProfile,
  updateStatus,
  withdraw,
});
export default usersRouter;
