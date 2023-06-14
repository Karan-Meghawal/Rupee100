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
import { type Deposit_Status, type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

const getColor = (status: Deposit_Status) =>
  ((status === "pending" || status === "review") && "warning") ||
  ((status === "credit" || status === "approved") && "success") ||
  "error";

type Row = UserApiOutputs["deposit"]["getRecords"]["rows"][number];
const columns: GridColKeys<Row>[] = [
  {
    field: "method.name",
    headerName: upperCase("gateway"),
    minWidth: 180,
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
    headerName: upperCase("txn Id"),
    minWidth: 150,
    flex: 1,
    renderCell({ row: { transactionId } }) {
      return (
        <Link
          href={USER_PATH.deposit.transaction(transactionId)}
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
    minWidth: 120,
    flex: 1,
    renderCell: ({ row: { amount, status } }) => (
      <Box color={`${getColor(status)}.main`}>{fCurrency(amount)}</Box>
    ),
  },
  {
    field: "charge",
    headerName: upperCase("charge"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { charge, status } }) => (
      <Box color={`${getColor(status)}.main`}>{fCurrency(charge)}</Box>
    ),
  },
  {
    field: "netAmount",
    headerName: upperCase("net Amount"),
    minWidth: 120,
    flex: 1,
    renderCell: ({ row: { netAmount, status } }) => (
      <Box color={`${getColor(status)}.main`}>{fCurrency(netAmount)}</Box>
    ),
  },
  {
    field: "createdAt",
    headerName: upperCase("requested At"),
    minWidth: 170,
    flex: 1,
    filterable: false,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "updatedAt",
    headerName: upperCase("proceed At"),
    minWidth: 160,
    flex: 1,
    filterable: false,
    renderCell: ({ row: { updatedAt } }) => fDateTime(updatedAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { status } }) => (
      <Label color={`${getColor(status)}`}>{capitalCase(status)}</Label>
    ),
  },
];

const DepositHistory: NextPageWithLayout = () => (
  <Page title="Deposit History">
    <HeaderBreadcrumbs
      heading="Deposit"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Deposit History" },
      ]}
    />

    <DataTable<Prisma.DepositScalarFieldEnum>
      title="Deposit History"
      sortModel={[{ field: "createdAt", sort: "desc" }]}
      columns={columns}
      query={(options) => userApi.deposit.getRecords.useQuery(options)}
    />
  </Page>
);
DepositHistory.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default DepositHistory;
