import { ADMIN_PATH } from "@/route";
import { Box } from "@mui/material";
import Iconify from "../../../components/Iconify";

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
  genealogy: getIcon("carbon:tree-view-alt"),
  manageUsers: getIcon("mdi:users-group-outline"),
  kyc: getIcon("mdi:user-card-details-outline"),
  support: getIcon("ic:round-support-agent"),
  withdraw: getIcon("uil:money-insert"),
  deposit: getIcon("uil:money-withdraw"),
  incomeHistory: getIcon("fluent:money-20-regular"),
  reports: {
    roiIncome: getIcon("mingcute:transfer-line"),
    transactions: getIcon("mingcute:transfer-line"),
    joining: getIcon("ph:users"),
    topSponsors: getIcon("fa6-regular:chess-king"),
    topEarners: getIcon("game-icons:throne-king"),
    analytics: getIcon("tabler:brand-google-analytics"),
    referralIncome: getIcon("vaadin:money-exchange"),
  },
  planSettings: getIcon("tabler:diamond"),
  paymentGateways: getIcon("mdi:payment"),
  systemConfiguration: getIcon("uiw:setting-o"),
  manageSection: getIcon("radix-icons:section"),
  changePassword: getIcon("material-symbols:password-rounded"),
  help: getIcon("material-symbols:help-outline-rounded"),
  pages: {
    home: getIcon("material-symbols:question-mark"),
    aboutUs: getIcon("material-symbols:question-mark"),
    faq: getIcon("material-symbols:question-mark"),
  },
};

type Config = ({ kyc }: { kyc: boolean }) => {
  subheader: string;
  items: (
    | {
        title: string;
        path: string;
        icon: JSX.Element;
        children?: undefined;
      }
    | {
        title: string;
        path: string;
        icon: JSX.Element;
        children: {
          title: string;
          path: string;
        }[];
      }
  )[];
}[];

const navConfig: Config = ({ kyc }: { kyc: boolean }) => [
  // GENERAL
  {
    subheader: "home",
    items: [
      { title: "dashboard", path: ADMIN_PATH.dashboard, icon: ICONS.dashboard },
      { title: "genealogy", path: ADMIN_PATH.genealogy, icon: ICONS.genealogy },
      {
        title: "manage users",
        path: ADMIN_PATH.users.root,
        icon: ICONS.manageUsers,
        children: [
          { title: "all users", path: ADMIN_PATH.users.all },
          { title: "active users", path: ADMIN_PATH.users.active },
          { title: "blocked users", path: ADMIN_PATH.users.blocked },
        ],
      },
      ...(kyc
        ? [
            {
              title: "kyc",
              path: ADMIN_PATH.kyc.root,
              icon: ICONS.kyc,
              children: [
                { title: "pending kyc", path: ADMIN_PATH.kyc.pending },
                { title: "verified kyc", path: ADMIN_PATH.kyc.verified },
                { title: "rejected kyc", path: ADMIN_PATH.kyc.rejected },
                { title: "all kyc", path: ADMIN_PATH.kyc.all },
              ],
            },
          ]
        : []),
      {
        title: "support tickets",
        path: ADMIN_PATH.support.root,
        icon: ICONS.support,
      },
      {
        title: "withdraw system",
        path: ADMIN_PATH.withdraw.root,
        icon: ICONS.withdraw,
        children: [
          { title: "pending withdraw", path: ADMIN_PATH.withdraw.pending },
          { title: "success withdraw", path: ADMIN_PATH.withdraw.success },
          { title: "rejected withdraw", path: ADMIN_PATH.withdraw.rejected },
          { title: "admin withdraw", path: ADMIN_PATH.withdraw.admin },
          { title: "all withdraw", path: ADMIN_PATH.withdraw.all },
        ],
      },
      {
        title: "deposit system",
        path: ADMIN_PATH.deposit.root,
        icon: ICONS.deposit,
        children: [
          { title: "pending deposit", path: ADMIN_PATH.deposit.pending },
          { title: "approved deposit", path: ADMIN_PATH.deposit.approved },
          { title: "rejected deposit", path: ADMIN_PATH.deposit.rejected },
          { title: "instant deposit", path: ADMIN_PATH.deposit.instant },
          { title: "admin deposit", path: ADMIN_PATH.deposit.admin },
          { title: "all deposit", path: ADMIN_PATH.deposit.all },
        ],
      },
    ],
  },
  {
    subheader: "reports",
    items: [
      {
        title: "joining",
        path: ADMIN_PATH.reports.joining,
        icon: ICONS.reports.joining,
      },
      {
        title: "transactions",
        path: ADMIN_PATH.reports.transactions.root,
        icon: ICONS.reports.transactions,
      },
      {
        title: "referral income",
        path: ADMIN_PATH.reports.referralIncome,
        icon: ICONS.reports.referralIncome,
      },
      {
        title: "roi income",
        path: ADMIN_PATH.reports.roiIncome,
        icon: ICONS.reports.roiIncome,
      },
      {
        title: "top sponsors",
        path: ADMIN_PATH.reports.topSponsors,
        icon: ICONS.reports.topSponsors,
      },
      {
        title: "top earners",
        path: ADMIN_PATH.reports.topEarners,
        icon: ICONS.reports.topEarners,
      },
      {
        title: "analytics",
        path: ADMIN_PATH.reports.analytics,
        icon: ICONS.reports.analytics,
      },
    ],
  },
  {
    subheader: "settings",
    items: [
      {
        title: "plan settings",
        path: ADMIN_PATH.plans.root,
        icon: ICONS.planSettings,
      },
      {
        title: "payment methods",
        path: ADMIN_PATH.paymentMethods.root,
        icon: ICONS.paymentGateways,
        children: [
          { title: "withdraw", path: ADMIN_PATH.paymentMethods.withdraw.root },
          {
            title: "instant deposit",
            path: ADMIN_PATH.paymentMethods.instantDeposit,
          },
          {
            title: "manual deposit",
            path: ADMIN_PATH.paymentMethods.manualDeposit.root,
          },
        ],
      },
      {
        title: "system configuration",
        path: ADMIN_PATH.settings.root,
        icon: ICONS.systemConfiguration,
        children: [
          {
            title: "email setting",
            path: ADMIN_PATH.settings.emailSetting,
          },
          {
            title: "email preferences",
            path: ADMIN_PATH.settings.emailPreferences,
          },
          { title: "kyc setting", path: ADMIN_PATH.settings.kyc },
          {
            title: "logo & favicon",
            path: ADMIN_PATH.settings.logo,
          },
          { title: "site setting", path: ADMIN_PATH.settings.site },
        ],
      },
    ],
  },
  {
    subheader: "frontend manager",
    items: [
      {
        title: "manage pages",
        path: ADMIN_PATH.sections.root,
        icon: ICONS.manageSection,
        children: [
          { title: "contact us", path: ADMIN_PATH.sections.contactUs },
          {
            title: "terms & conditions",
            path: ADMIN_PATH.sections.termsAndConditions,
          },
          {
            title: "privacy policy",
            path: ADMIN_PATH.sections.privacyPolicy,
          },
          {
            title: "refund policy",
            path: ADMIN_PATH.sections.refundPolicy,
          },
          {
            title: "commission policy",
            path: ADMIN_PATH.sections.commissionPolicy,
          },
          { title: "faq section", path: ADMIN_PATH.sections.faq },
          {
            title: "Home",
            path: ADMIN_PATH.pages.home,
          },
          {
            title: "About Us",
            path: ADMIN_PATH.pages.aboutUs,
          },
          {
            title: "Faq",
            path: ADMIN_PATH.pages.faq,
          },
        ],
      },
      {
        title: "Help",
        path: ADMIN_PATH.help,
        icon: ICONS.help,
      },
    ],
  },
  {
    subheader: "extra",
    items: [
      {
        title: "change password",
        path: ADMIN_PATH.changePassword,
        icon: ICONS.changePassword,
      },
    ],
  },
];

export default navConfig;
