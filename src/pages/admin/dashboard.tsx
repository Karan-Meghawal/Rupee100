import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import InfoCard from "@/components/InfoCard";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { NoticeUpdateCard } from "@/sections/admin/dashboard";
import { adminApi } from "@/utils/api";
import { fShortCurrency } from "@/utils/formatNumber";
import { Grid } from "@mui/material";

const Dashboard: NextPageWithLayout = () => {
  const { data, isLoading } = adminApi.dashboard.getSummary.useQuery();

  return (
    <Page title="Dashboard">
      <HeaderBreadcrumbs
        heading="Dashboard"
        links={[{ name: "Home" }]}
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
            label="Today Joining"
            value={data?.todayJoining}
            icon="heroicons:user-group"
            loading={isLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Active Users"
            value={data?.activeUsers}
            icon="heroicons:user-group"
            loading={isLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Pending Deposits"
            value={data?.depositInReviewCount}
            icon="fluent:clock-arrow-download-20-regular"
            loading={isLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Pending Deposit"
            value={fShortCurrency(data?.depositInReview ?? 0)}
            icon="fluent:clock-arrow-download-20-regular"
            loading={isLoading}
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
            label="Pending Withdraws"
            value={data?.pendingWithdrawCount}
            icon="fluent:clock-arrow-download-20-regular"
            loading={isLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Pending Withdraw"
            value={fShortCurrency(data?.pendingWithdraw ?? 0)}
            icon="fluent:clock-arrow-download-20-regular"
            loading={isLoading}
            tooltip={data?.pendingWithdraw}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Total Deposit"
            value={fShortCurrency(data?.totalDeposit ?? 0)}
            icon="game-icons:take-my-money"
            loading={isLoading}
            tooltip={data?.totalDeposit}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Total Withdraw"
            value={fShortCurrency(data?.totalWithdraw ?? 0)}
            icon="uil:money-withdraw"
            loading={isLoading}
            tooltip={data?.totalWithdraw}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Pending Tickets"
            value={data?.pendingTickets}
            icon="material-symbols:contact-support-outline"
            loading={isLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Active Tickets"
            value={data?.activeTickets}
            icon="material-symbols:contact-support-outline"
            loading={isLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
        >
          <InfoCard
            label="Pending Kyc"
            value={data?.pendingKyc}
            icon="mdi:user-card-details-outline"
            loading={isLoading}
          />
        </Grid>
      </Grid>
      <NoticeUpdateCard />
    </Page>
  );
};

Dashboard.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Dashboard;
