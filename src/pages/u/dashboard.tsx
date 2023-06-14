import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import InfoCard from "@/components/InfoCard";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { NoticeCard } from "@/sections/user/dashboard";
import { userApi } from "@/utils/api";
import { fShortCurrency } from "@/utils/formatNumber";
import { Grid } from "@mui/material";
import { type NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const { data, isLoading } = userApi.dashboard.getSummary.useQuery();

  return (
    <Page title="Dashboard">
      <HeaderBreadcrumbs
        heading="Dashboard"
        links={[{ name: "Dashboard" }]}
      />
      <Grid
        container
        spacing={RESPONSIVE_GAP}
      >
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Wallet"
            value={fShortCurrency(data?.wallet ?? 0)}
            icon="teenyicons:wallet-alt-outline"
            tooltip={data?.wallet}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Total Income"
            value={fShortCurrency(data?.totalIncome ?? 0)}
            icon="game-icons:take-my-money"
            tooltip={data?.totalIncome}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Referral Income"
            value={fShortCurrency(data?.referralIncome ?? 0)}
            icon="game-icons:take-my-money"
            tooltip={data?.referralIncome}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Total Team"
            value={data?.totalTeam}
            icon="heroicons:user-group"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Left Count"
            value={data?.leftCount}
            icon="icon-park-outline:people-left"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Right Count"
            value={data?.rightCount}
            icon="icon-park-outline:people-right"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Direct Referral"
            value={data?.directReferral}
            icon="bi:people"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Last Deposit"
            value={fShortCurrency(data?.lastDeposit ?? 0)}
            icon="uil:money-insert"
            tooltip={data?.lastDeposit}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Last Withdraw"
            value={fShortCurrency(data?.lastWithdraw ?? 0)}
            icon="uil:money-withdraw"
            tooltip={data?.lastWithdraw}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Deposit In Review"
            value={fShortCurrency(data?.depositInReview ?? 0)}
            icon="fluent:clock-arrow-download-20-regular"
            tooltip={data?.depositInReview}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            loading={isLoading}
            label="Pending Withdraw"
            value={fShortCurrency(data?.pendingWithdraw ?? 0)}
            icon="fluent:clock-arrow-download-20-regular"
            rotate={2}
            tooltip={data?.pendingWithdraw}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <NoticeCard />
        </Grid>
      </Grid>
    </Page>
  );
};

Dashboard.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Dashboard;
