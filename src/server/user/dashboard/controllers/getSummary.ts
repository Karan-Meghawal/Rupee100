import { type UserContext } from "@/server/trpc";
import { type DashboardSchema } from "../schema";

const getSummary = async ({
  ctx,
}: {
  ctx: UserContext;
  input: DashboardSchema["getSummary"];
}) => {
  const { user } = ctx;
  const depositInReview = await user.getDepositInReview();
  const directReferral = await user.getDirectReferralCount();
  const lastDeposit = await user.getLastDeposit();
  const lastWithdraw = await user.getLastWithdraw();
  const pendingWithdraw = await user.getPendingWithdraw();
  const referralIncome = await user.getReferralIncome();
  const roiIncome = await user.getRoiIncome();
  const totalDeposit = await user.getDeposit();
  const totalIncome = await user.getTotalIncome();
  const totalTeam = await user.getTotalTeamCount();
  const totalWithdraw = await user.getWithdraw();
  const wallet = await user.getWallet();
  const { leftCount, rightCount } = user.row;

  return {
    depositInReview,
    directReferral,
    lastDeposit,
    lastWithdraw,
    leftCount,
    pendingWithdraw,
    referralIncome,
    rightCount,
    roiIncome,
    totalDeposit,
    totalIncome,
    totalTeam,
    totalWithdraw,
    wallet,
  };
};

export default getSummary;
