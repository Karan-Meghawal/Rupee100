import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import LoadingProgress from "@/components/LoadingProgress";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import {
  DepositByAdmin,
  DepositByInstant,
  DepositByManual,
} from "@/sections/user/deposit";
import { userApi } from "@/utils/api";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const DepositTransaction: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const transactionId = query.id as string;
  const { data, isLoading } = userApi.deposit.getRecord.useQuery(
    transactionId,
    {
      enabled: router.isReady,
    },
  );

  const { type } = data! ?? {};

  if (typeof transactionId !== "string") return null;
  return (
    <Page title={`Deposit Transaction ${transactionId}`}>
      <HeaderBreadcrumbs
        heading="Deposit Details"
        links={[
          {
            name: "Deposits",
            href: USER_PATH.deposit.history,
          },
          {
            name: `Deposit #${transactionId}`,
          },
        ]}
      />
      {isLoading ? (
        <LoadingProgress />
      ) : (
        <Box>
          {type === "admin" && <DepositByAdmin data={data!} />}
          {type === "manual" && <DepositByManual data={data!} />}
          {type === "instant" && <DepositByInstant data={data!} />}
        </Box>
      )}
    </Page>
  );
};
DepositTransaction.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);

export default DepositTransaction;
