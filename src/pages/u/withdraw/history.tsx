import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Image from "@/components/Image";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Link, Typography } from "@mui/material";
import { type Prisma, type Withdraw_Status } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

const getColor = (status: Withdraw_Status) =>
  (status === "pending" && "warning") ||
  (status === "rejected" && "error") ||
  "success";

type Row = UserApiOutputs["withdraw"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "method",
    headerName: upperCase("gateway"),
    minWidth: 160,
    flex: 1,
    renderCell({
      row: {
        method: { logo, name },
      },
    }) {
      return (
        <Box
          display="flex"
          alignItems="center"
        >
          <Image
            alt={name}
            src={logo}
            sx={{ borderRadius: 999, width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography variant="body2">{name}</Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "transactionId",
    headerName: upperCase("txnId"),
    minWidth: 150,
    flex: 1,
    renderCell({ row: { transactionId } }) {
      return (
        <Link
          href={USER_PATH.withdraw.transaction(transactionId)}
          component={NextLink}
        >
          #{transactionId}
        </Link>
      );
    },
  },
  {
    field: "amount",
    headerName: upperCase("amount"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { amount, status } }) => (
      <Box color={`${getColor(status)}.main`}>{fCurrency(amount)}</Box>
    ),
  },
  {
    field: "charge",
    headerName: upperCase("charges"),
    minWidth: 80,
    flex: 1,
    renderCell: ({ row: { charge, status } }) => (
      <Box color={`${getColor(status)}.main`}>{fCurrency(charge)}</Box>
    ),
  },
  {
    field: "netAmount",
    headerName: upperCase("net Amount"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { netAmount, status } }) => (
      <Box color={`${getColor(status)}.main`}>{fCurrency(netAmount)}</Box>
    ),
  },
  {
    field: "createdAt",
    headerName: upperCase("requested At"),
    minWidth: 180,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "updatedAt",
    headerName: upperCase("processed At"),
    minWidth: 180,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell({ row: { status } }) {
      return (
        <Label
          color={
            (status === "pending" && "warning") ||
            (status === "success" && "success") ||
            "error"
          }
        >
          {capitalCase(status)}
        </Label>
      );
    },
  },
];

const WithdrawHistory: NextPageWithLayout = () => (
  <Page title="Withdraw History">
    <HeaderBreadcrumbs
      heading="Withdraw History"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Withdraw" },
        { name: "Withdraw History" },
      ]}
    />
    <DataTable<Prisma.WithdrawScalarFieldEnum>
      title="Withdraw History"
      sortModel={[
        {
          field: "createdAt",
          sort: "desc" as const,
        },
      ]}
      columns={columns}
      query={(queryOptions) =>
        userApi.withdraw.getRecords.useQuery(queryOptions)
      }
    />
  </Page>
);
WithdrawHistory.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default WithdrawHistory;
