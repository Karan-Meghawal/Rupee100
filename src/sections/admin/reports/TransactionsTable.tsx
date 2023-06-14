import DataTable from "@/components/DataTable";
import Label from "@/components/Label";
import TableUser from "@/components/TableUser";
import { ADMIN_PATH } from "@/route";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Link, Tooltip } from "@mui/material";
import { type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["report"]["transactions"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "userId",
    headerName: upperCase("user"),
    minWidth: 180,
    flex: 1,
    renderCell: ({
      row: {
        user: { avatar, userName, userId },
      },
    }) => (
      <TableUser
        avatar={avatar}
        title={userName}
        subtitle={userId}
        userId={userId}
      />
    ),
  },
  {
    field: "id",
    headerName: upperCase("txn Id"),
    minWidth: 120,
    flex: 1,
    renderCell({ row: { category, id } }) {
      return ["plan_purchased", "withdraw", "deposit"].includes(category) ? (
        <Link
          href={
            (category === "withdraw" && ADMIN_PATH.withdraw.transaction(id)) ||
            (category === "deposit" && ADMIN_PATH.deposit.transaction(id)) ||
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
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "updatedAt",
    headerName: upperCase("proceed At"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { updatedAt } }) => fDateTime(updatedAt),
  },
];

const TransactionsTable = () => (
  <DataTable<Prisma.TransactionScalarFieldEnum>
    title="Transactions History"
    sortModel={[
      {
        field: "createdAt",
        sort: "desc" as const,
      },
    ]}
    columns={columns}
    query={(queryOptions) =>
      adminApi.report.transactions.useQuery(queryOptions)
    }
  />
);

export default TransactionsTable;
