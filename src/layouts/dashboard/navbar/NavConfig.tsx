import { USER_PATH } from "@/route";
import { Box } from "@mui/material";
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

function getIcon(src: string) {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
      }}
    >
      <Iconify icon={src} />
    </Box>
  );
}

const ICONS = {
  dashboard: getIcon("ri:dashboard-line"),
  products: getIcon("fluent-mdl2:product"),
  orders: getIcon("tabler:stack-2"),
  cart: getIcon("material-symbols:shopping-cart"),
  plans: getIcon("ion:diamond-outline"),
  planHistory: getIcon("fluent:history-24-filled"),
  offers: getIcon("bxs:offer"),
  network: getIcon("carbon:tree-view-alt"),
  myReferrals: getIcon("la:users"),
  totalTeam: getIcon("mdi:users-group-outline"),
  transferPayment: getIcon("mingcute:transfer-line"),
  analytics: getIcon("tabler:brand-google-analytics"),
  transactions: getIcon("uil:transaction"),
  withdraw: getIcon("uil:money-insert"),
  deposit: getIcon("uil:money-withdraw"),
  incomes: getIcon("teenyicons:money-stack-outline"),
  profile: getIcon("mdi:user-outline"),
  addMember: getIcon("mdi:user-add-outline"),
  referralLink: getIcon("ph:link-bold"),
  support: getIcon("ic:twotone-support-agent"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "dashboard",
        path: USER_PATH.dashboard,
        icon: ICONS.dashboard,
      },
      { title: "plans", path: USER_PATH.plans, icon: ICONS.plans },
      {
        title: "plan history",
        path: USER_PATH.planHistory.root,
        icon: ICONS.planHistory,
      },
      {
        title: "network",
        path: USER_PATH.network.root,
        icon: ICONS.network,
        children: [{ title: "genealogy", path: USER_PATH.network.genealogy }],
      },
      {
        title: "my referrals",
        path: USER_PATH.myReferrals,
        icon: ICONS.myReferrals,
      },
      {
        title: "total team",
        path: USER_PATH.totalTeam,
        icon: ICONS.totalTeam,
      },
      { title: "analytics", path: USER_PATH.analytics, icon: ICONS.analytics },
      {
        title: "transactions",
        path: USER_PATH.transactions.root,
        icon: ICONS.transactions,
      },
      {
        title: "transfer payment",
        path: USER_PATH.transferPayment,
        icon: ICONS.transferPayment,
      },
      {
        title: "deposit",
        path: USER_PATH.deposit.root,
        icon: ICONS.deposit,
        children: [
          { title: "deposit payment", path: USER_PATH.deposit.payment },
          { title: "deposit history", path: USER_PATH.deposit.history },
        ],
      },
      {
        title: "withdraw",
        path: USER_PATH.withdraw.root,
        icon: ICONS.withdraw,
        children: [
          { title: "withdraw history", path: USER_PATH.withdraw.history },
          { title: "withdraw payment", path: USER_PATH.withdraw.withdraw },
          { title: "withdraw methods", path: USER_PATH.withdraw.methods },
        ],
      },
      {
        title: "incomes",
        path: USER_PATH.incomes.root,
        icon: ICONS.incomes,
        children: [
          { title: "referral income", path: USER_PATH.incomes.referralIncome },
          { title: "roi income", path: USER_PATH.incomes.roi },
        ],
      },
      { title: "profile", path: USER_PATH.profile, icon: ICONS.profile },
      {
        title: "add_member",
        path: USER_PATH.addMember,
        icon: ICONS.addMember,
        target: "_blank",
      },
      {
        title: "referral link",
        path: USER_PATH.referralLink,
        icon: ICONS.referralLink,
      },
      { title: "support", path: USER_PATH.support.root, icon: ICONS.support },
    ],
  },
];

export default navConfig;
