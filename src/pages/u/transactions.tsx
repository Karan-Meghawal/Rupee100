import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Link, Tooltip } from "@mui/material";
import { type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

type Row = UserApiOutputs["transaction"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "id",
    headerName: upperCase("txnId"),
    minWidth: 120,
    flex: 1,
    renderCell({ row: { category, id } }) {
      return ["planPurchased", "withdraw", "deposit"].includes(category) ? (
        <Link
          href={
            (category === "withdraw" && USER_PATH.withdraw.transaction(id)) ||
            (category === "deposit" && USER_PATH.deposit.transaction(id)) ||
            (category === "planPurchased" && USER_PATH.planHistory.transaction(id)) ||
            "#"
          }
          component={NextLink}
        >
          #{id}
        </Link>
      ) : (
        id
      );
    },
  },
  {
    field: "amount",
    headerName: upperCase("amount"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { amount } }) => fCurrency(amount),
  },
  {
    field: "charge",
    headerName: upperCase("txn Charge"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { charge } }) => fCurrency(charge),
  },
  {
    field: "netAmount",
    headerName: upperCase("net Amount"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { netAmount } }) => fCurrency(netAmount),
  },
  {
    field: "description",
    headerName: upperCase("description"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { description } }) => (
      <Tooltip title={description}>
        <Box>{description}</Box>
      </Tooltip>
    ),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { status } }) => (
      <Label
        color={
          (status === "credit" && "success") ||
          (status === "pending" && "warning") ||
          (status === "debit" && "error") ||
          (status === "failed" && "error") ||
          "error"
        }
      >
        {capitalCase(status)}
      </Label>
    ),
  },
  {
    field: "createdAt",
    headerName: upperCase("created At"),
    minWidth: 200,
    flex: 1,
    filterable: false,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "updatedAt",
    headerName: upperCase("proceed At"),
    minWidth: 200,
    flex: 1,
    filterable: false,
    renderCell: ({ row: { updatedAt } }) => fDateTime(updatedAt),
  },
];

const Transactions: NextPageWithLayout = () => (
  <Page title="Transactions">
    <HeaderBreadcrumbs
      heading="Transaction"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Transaction" },
      ]}
    />

    <DataTable<Prisma.TransactionScalarFieldEnum>
      title="Transaction History"
      sortModel={[
        {
          field: "createdAt",
          sort: "desc",
        },
      ]}
      columns={columns}
      query={(queryOptions) =>
        userApi.transaction.getRecords.useQuery(queryOptions)
      }
    />
  </Page>
);
Transactions.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Transactions;
