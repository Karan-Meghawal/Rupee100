import Avatar from "@/components/Avatar";
import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import InfoCard from "@/components/InfoCard";
import Label from "@/components/Label";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import createAvatar from "@/utils/createAvatar";
import { userDisplayName } from "@/utils/fns";
import { fCurrency, fShortCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Grid, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";

type Row = UserApiOutputs["incomes"]["referralIncome"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "userId",
    headerName: upperCase("User"),
    minWidth: 200,
    flex: 1,
    renderCell: ({
      row: {
        user: { userId, avatar, firstName, lastName },
      },
    }) => (
      <Box
        display="flex"
        alignItems="center"
      >
        <Avatar
          alt={"name"}
          src={avatar}
          color={
            avatar
              ? "default"
              : createAvatar(userDisplayName(firstName, lastName)).color
          }
          sx={{ borderRadius: 99, width: 48, height: 48, mr: 2 }}
        >
          {createAvatar(userDisplayName(firstName, lastName)).name}
        </Avatar>
        <Box>
          <Typography variant="body2">
            {userDisplayName(firstName, lastName)}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {userId}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "transactionId",
    headerName: upperCase("txn Id"),
    minWidth: 100,
    flex: 1,
    align: "center",
    renderCell: ({ row: { transactionId } }) => transactionId ?? "-",
  },
  {
    field: "amount",
    headerName: upperCase("Income"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { amount } }) => fCurrency(amount),
  },
  {
    field: "createdAt",
    headerName: upperCase("referred At"),
    minWidth: 200,
    flex: 1,
    filterable: false,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { status } }) => (
      <Label color={status === "pending" ? "warning" : "success"}>
        {capitalCase(status)}
      </Label>
    ),
  },
];

const ReferralIncome: NextPageWithLayout = () => {
  const { data, isLoading } =
    userApi.incomes.getReferralIncomeSummary.useQuery();

  return (
    <Page title="Referral Income">
      <HeaderBreadcrumbs
        heading="Referral Income"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Referral Income" },
        ]}
      />

      <Grid
        container
        spacing={RESPONSIVE_GAP}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <InfoCard
            loading={isLoading}
            label="Total Referrals"
            value={data?.totalReferrals}
            icon="teenyicons:wallet-alt-outline"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <InfoCard
            loading={isLoading}
            label="Premium Referrals"
            value={data?.premiumReferrals}
            icon="teenyicons:wallet-alt-outline"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <InfoCard
            loading={isLoading}
            label="Referral Income"
            value={fShortCurrency(data?.referralIncome ?? 0)}
            icon="teenyicons:wallet-alt-outline"
            tooltip={data?.referralIncome}
          />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <DataTable<Prisma.ReferralIncomeScalarFieldEnum>
            title="Referral Income"
            sortModel={[
              {
                field: "createdAt",
                sort: "desc" as const,
              },
            ]}
            columns={columns}
            query={(options) =>
              userApi.incomes.referralIncome.useQuery(options)
            }
          />
        </Grid>
      </Grid>
    </Page>
  );
};

ReferralIncome.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);

export default ReferralIncome;
