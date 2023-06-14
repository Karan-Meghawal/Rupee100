const path = (link: string) => `/u${link}`;
const adminPath = (link: string) => `/admin${link}`;

const APP_PATH = {
  aboutUs: "/about-us",
  commissionPolicy: "/commission-policy",
  contactUs: "/contact-us",
  faq: "/faq",
  root: "/",
  home: "/",
  plans: "/plans",
  privacyPolicy: "/privacy-policy",
  refundPolicy: "/refund-policy",
  termsAndConditions: "/terms-and-conditions",
};

export const USER_PATH = {
  addMember: path("/add-member"),
  analytics: path("/analytics"),
  dashboard: path("/dashboard"),
  forgotPassword: "/forgot-password",
  login: "/login",
  myReferrals: path("/my-referrals"),
  network: {
    genealogy: path("/network/genealogy"),
    root: path("/network"),
  },
  plans: path("/plans"),
  planHistory: {
    root: path("/plan-history"),
    transaction: (id: string) => path(`/plan-history/transaction/${id}`),
  },
  profile: path("/profile"),
  referralLink: path("/referral-link"),
  register: "/register",
  newRegistration: (id: number) => `/new-registration?id=${id}`,
  support: {
    create: path("/support/create-ticket"),
    root: path("/support"),
    ticket: (id: string) => path(`/support/ticket/${id}`),
  },
  totalTeam: path("/total-team"),
  transferPayment: path("/transfer-payment"),
  transactions: {
    root: path("/transactions"),
    view: (id: string) => path(`/transactions/${id}`),
  },
  deposit: {
    payment: path("/deposit/payment"),
    history: path("/deposit/history"),
    root: path("/deposit"),
    transaction: (id: string) => path(`/deposit/transaction/${id}`),
  },
  withdraw: {
    addMethod: (id: string) => path(`/withdraw/add-method/${id}`),
    root: path("/withdraw"),
    withdraw: path("/withdraw/withdraw"),
    payment: (id: string) => path(`/withdraw/payment/${id}`),
    methods: path("/withdraw/methods"),
    history: path("/withdraw/history"),
    transaction: (id: string) => path(`/withdraw/transaction/${id}`),
  },
  incomes: {
    root: path(`/incomes`),
    referralIncome: path(`/incomes/referral-income`),
    roi: path(`/incomes/roi`),
  },
};

export const ADMIN_PATH = {
  changePassword: adminPath("/change-password"),
  dashboard: adminPath("/dashboard"),
  deposit: {
    all: adminPath("/deposit/all"),
    approved: adminPath("/deposit/approved"),
    instant: adminPath("/deposit/instant"),
    admin: adminPath("/deposit/admin"),
    pending: adminPath("/deposit/pending"),
    rejected: adminPath("/deposit/rejected"),
    root: adminPath("/deposit"),
    transaction: (id: string) => adminPath(`/deposit/transaction/${id}`),
  },
  genealogy: adminPath("/genealogy"),
  help: adminPath("/help"),
  install: adminPath("/install"),
  kyc: {
    all: adminPath("/kyc/all"),
    verified: adminPath("/kyc/verified"),
    pending: adminPath("/kyc/pending"),
    rejected: adminPath("/kyc/rejected"),
    root: adminPath("/kyc"),
    view: (id: string) => adminPath(`/kyc/view/${id}`),
  },
  login: adminPath("/login"),
  sections: {
    about: adminPath("/sections/about-us"),
    commissionPolicy: adminPath("/sections/commission-policy"),
    contactUs: adminPath("/sections/contact-us"),
    faq: adminPath("/sections/faq"),
    privacyPolicy: adminPath("/sections/privacy-policy"),
    refundPolicy: adminPath("/sections/refund-policy"),
    root: adminPath("/sections"),
    termsAndConditions: adminPath("/sections/terms-and-conditions"),
  },
  pages: {
    home: adminPath("/pages/home"),
    aboutUs: adminPath("/pages/about-us"),
    faq: adminPath("/pages/faq"),
  },
  paymentMethods: {
    instantDeposit: adminPath("/payment-methods/instant-deposit"),
    root: adminPath("/payment-methods"),
    withdraw: {
      root: adminPath("/payment-methods/withdraw"),
      create: adminPath("/payment-methods/withdraw/create"),
      update: (id: string) =>
        adminPath(`/payment-methods/withdraw/create/${id}`),
    },
    manualDeposit: {
      root: adminPath("/payment-methods/manual-deposit"),
      create: adminPath("/payment-methods/manual-deposit/create"),
      update: (id: string) =>
        adminPath(`/payment-methods/manual-deposit/create/${id}`),
    },
  },
  plans: {
    create: adminPath(`/plan-setting/create`),
    root: adminPath("/plan-setting"),
    update: (id: string) => adminPath(`/plan-setting/create/${id}`),
  },
  reports: {
    analytics: adminPath("/reports/analytics"),
    investment: adminPath("/reports/investment"),
    joining: adminPath("/reports/joining"),
    referralIncome: adminPath("/reports/referral-income"),
    roiIncome: adminPath("/reports/roi-income"),
    root: adminPath("/reports"),
    topEarners: adminPath("/reports/top-earners"),
    topSponsors: adminPath("/reports/top-sponsors"),
    transactions: {
      root: adminPath("/reports/transactions"),
      view: (id: string) => adminPath(`/reports/transactions/${id}`),
    },
  },
  settings: {
    emailSetting: adminPath("/settings/email-setting"),
    emailPreferences: adminPath("/settings/email-preferences"),
    kyc: adminPath("/settings/kyc"),
    logo: adminPath("/settings/logo"),
    root: adminPath("/settings"),
    site: adminPath("/settings/site"),
  },
  support: {
    root: adminPath("/support"),
    ticket: (id: string) => adminPath(`/support/ticket/${id}`),
  },
  users: {
    active: adminPath("/users/active"),
    all: adminPath("/users/all"),
    blocked: adminPath("/users/blocked"),
    root: adminPath("/users"),
    view: (userId: number) => adminPath(`/users/profile/${userId}`),
  },
  withdraw: {
    all: adminPath("/withdraw/all"),
    pending: adminPath("/withdraw/pending"),
    rejected: adminPath("/withdraw/rejected"),
    admin: adminPath("/withdraw/admin"),
    root: adminPath("/withdraw"),
    success: adminPath("/withdraw/success"),
    transaction: (id: string) => adminPath(`/withdraw/transaction/${id}`),
  },
};
export default APP_PATH;
