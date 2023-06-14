import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Link } from "@mui/material";
import { type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";
import { type NextPageWithLayout } from "../../_app";

type Row = UserApiOutputs["plan"]["getHistory"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "transactionId",
    headerName: upperCase("txn Id"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { transactionId } }) => (
      <Link
        component={NextLink}
        href={USER_PATH.planHistory.transaction(transactionId)}
      >
        #{transactionId}
      </Link>
    ),
  },
  {
    field: "investment",
    headerName: upperCase("investment"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { investment } }) => fCurrency(investment),
  },
  {
    field: "planName",
    headerName: upperCase("planName"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "referralIncome",
    headerName: upperCase("referralIncome"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { referralIncome } }) => fCurrency(referralIncome),
  },
  {
    field: "roiIncome",
    headerName: upperCase("roiIncome"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { roiIncome } }) => fCurrency(roiIncome),
  },
  {
    field: "createdAt",
    headerName: upperCase("purchased at"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 60,
    flex: 1,
    renderCell: ({ row: { status } }) => (
      <Label color={status === "active" ? "success" : "error"}>
        {capitalCase(status)}
      </Label>
    ),
  },
  {
    field: "validity",
    headerName: upperCase("validity"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { validity } }) =>
      `${validity} ${validity === 1 ? "day" : "days"}`,
  },
  {
    field: "validTill",
    headerName: upperCase("valid Till"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { validTill } }) => fDateTime(validTill),
  },
  {
    field: "expiredAt",
    headerName: upperCase("expired At"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { expiredAt } }) =>
      !expiredAt ? "-" : fDateTime(expiredAt),
  },
];

const MyReferrals: NextPageWithLayout = () => (
  <Page title="Plan History">
    <HeaderBreadcrumbs
      heading="Plan History"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Plan History" },
      ]}
    />
    <DataTable<Prisma.PlanHistoryScalarFieldEnum>
      title="Plan History"
      query={(options) => userApi.plan.getHistory.useQuery(options)}
      sortModel={[
        {
          field: "createdAt",
          sort: "desc",
        },
      ]}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: {
            validTill: false,
            expiredAt: false,
            validity: false,
          },
        },
      }}
    />
  </Page>
);
MyReferrals.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default MyReferrals;
