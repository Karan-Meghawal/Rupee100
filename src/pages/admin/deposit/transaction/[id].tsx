import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import LoadingProgress from "@/components/LoadingProgress";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { DepositActionCard } from "@/sections/admin/deposit";
import {
  DepositByAdmin,
  DepositByInstant,
  DepositByManual,
} from "@/sections/user/deposit";
import { adminApi } from "@/utils/api";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const Transaction: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const transactionId = query.id as string;
  const { data, isLoading } = adminApi.deposit.getRecord.useQuery(
    transactionId,
    {
      enabled: !!transactionId && router.isReady,
    },
  );

  const { type, status } = data! ?? {};
  if (transactionId && typeof transactionId !== "string") return null;
  return (
    <Page title={`Deposit Transaction ${transactionId}`}>
      <HeaderBreadcrumbs
        heading="Deposit Details"
        links={[
          {
            name: "Deposits",
            href: ADMIN_PATH.deposit.all,
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
          {type === "manual" && (
            <>
              {status === "review" && <DepositActionCard id={transactionId} />}
              <DepositByManual
                isAdmin
                data={data!}
              />
            </>
          )}
          {type === "instant" && (
            <DepositByInstant
              isAdmin
              data={data!}
            />
          )}
        </Box>
      )}
    </Page>
  );
};
Transaction.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Transaction;
