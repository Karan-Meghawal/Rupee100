import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { USER_PATH } from "@/route";
import {
  AllRecord,
  Overview,
  QuickTransfer,
} from "@/sections/user/transfer-payment";
import { userApi } from "@/utils/api";
import { Grid, LinearProgress } from "@mui/material";
import { type NextPageWithLayout } from "../_app";

const TransferPayment: NextPageWithLayout = () => {
  const { data, isLoading } = userApi.transferPayment.getWallet.useQuery();
  const { receivedAmount, transferredAmount, wallet } = data ?? {
    receivedAmount: 0,
    transferredAmount: 0,
    wallet: 0,
  };

  return (
    <Page title="Transfer Payment">
      <HeaderBreadcrumbs
        heading="Transfer Payment"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Transfer Payment" },
        ]}
      />
      {isLoading && <LinearProgress />}
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={7}
        >
          <Overview
            receivedAmount={receivedAmount}
            transferredAmount={transferredAmount}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={5}
        >
          <QuickTransfer
            receivedAmount={receivedAmount}
            transferredAmount={transferredAmount}
            wallet={wallet}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <AllRecord />
        </Grid>
      </Grid>
    </Page>
  );
};
TransferPayment.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default TransferPayment;
