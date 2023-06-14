export const InstantDepositMethods = [
  {
    uniqueId: "coinbase" as const,
    name: "Coinbase",
    logo: "/images/coinbase.png",
    fullLogo: "/images/coinbase-1.png",
    config: [
      {
        key: "API_KEY",
        label: "Api Key",
      },
      {
        key: "WEBHOOK_SECRET",
        label: "Webhook Secret",
      },
    ],
  },
  {
    uniqueId: "coingate" as const,
    name: "Coingate",
    logo: "/images/coingate.png",
    fullLogo: "/images/coingate-1.png",
    config: [
      { key: "AUTH_TOKEN", label: "Auth Token" },
      {
        key: "ENVIRONMENT",
        label: "Environment",
        options: ["test", "production"],
      },
    ],
  },
];

export type InstantDepositMethodsType = (typeof InstantDepositMethods)[number];
