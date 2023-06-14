import Deposit from "@/server/services/Deposit";
import Ticket from "@/server/services/Ticket";
import User from "@/server/services/User";
import UserKyc from "@/server/services/UserKyc";
import Withdraw from "@/server/services/Withdraw";
import { type AdminContext } from "@/server/trpc";
import { type DashboardSchema } from "../schema";

const getSummary = async ({}: {
  ctx: AdminContext;
  input: DashboardSchema["getCardValues"];
}) => {
  const todayJoining = await User.getTodayJoiningCount();
  const activeUsers = await User.getActiveUsersCount();
  const depositInReviewCount = await Deposit.getDepositInReviewCount();
  const depositInReview = await Deposit.getDepositInReview();
  const pendingWithdrawCount = await Withdraw.getPendingWithdrawCount();
  const pendingWithdraw = await Withdraw.getPendingWithdraw();
  const totalDeposit = await Deposit.getTotalDeposit();
  const totalWithdraw = await Withdraw.getTotalWithdraw();
  const pendingKyc = await UserKyc.getPendingRequestCount();

  const activeTickets = await Ticket.getActiveTickets();
  const closedTickets = await Ticket.getClosedTickets();
  const pendingTickets = await Ticket.getPendingTickets();
  const allTickets = await Ticket.getAllTickets();

  return {
    todayJoining,
    activeUsers,
    depositInReviewCount,
    depositInReview,
    pendingWithdrawCount,
    pendingWithdraw,
    totalDeposit,
    totalWithdraw,
    pendingKyc,
    activeTickets,
    closedTickets,
    pendingTickets,
    allTickets,
  };
};
export default getSummary;
