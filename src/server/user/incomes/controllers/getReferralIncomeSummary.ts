import { type UserContext } from "@/server/trpc";
import { type IncomeSchema } from "../schema";

const getReferralIncomeSummary = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: IncomeSchema["getReferralIncomeSummary"];
}) => {
  const { user } = ctx;

  const totalReferrals = await user.getDirectReferralCount();
  const referralIncome = await user.getReferralIncome();
  const premiumReferrals = await user.getPremiumReferralCount();

  return {
    totalReferrals,
    referralIncome,
    premiumReferrals,
  };
};

export default getReferralIncomeSummary;
