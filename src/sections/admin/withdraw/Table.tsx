import DataTable from "@/components/DataTable";
import Label from "@/components/Label";
import TableUser from "@/components/TableUser";
import { ADMIN_PATH } from "@/route";
import {
  adminApi,
  type AdminApiInputs,
  type AdminApiOutputs,
} from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Link } from "@mui/material";
import { type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["withdraw"]["getRecords"]["rows"][number];
type Status = AdminApiInputs["withdraw"]["getRecords"]["status"];

type Props = {
  title: string;
  sortBy?: Prisma.WithdrawScalarFieldEnum;
  pending?: boolean;
  status: Status;
};

const WithdrawTable = ({
  title,
  status,
  sortBy = "createdAt",
  pending,
}: Props) => {
  const columns: GridColKeys<Row>[] = [
    {
      field: "userId",
      headerName: upperCase("user"),
      minWidth: 180,
      flex: 1,
      renderCell({
        row: {
          user: { userName, userId, avatar },
        },
      }) {
        return (
          <TableUser
            avatar={avatar}
            title={userName}
            subtitle={userId}
            userId={userId}
          />
        );
      },
    },
    {
      field: "method.name",
      headerName: upperCase("gateway"),
      minWidth: 120,
      flex: 1,
      renderCell: ({
        row: {
          method: { name },
        },
      }) => name,
    },
    {
      field: "transactionId",
      headerName: upperCase("txn Id"),
      minWidth: 140,
      flex: 1,
      renderCell({ row: { transactionId } }) {
        return (
          <Link
            component={NextLink}
            href={ADMIN_PATH.withdraw.transaction(transactionId)}
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
      renderCell: ({ row: { amount } }) => fCurrency(amount),
    },
    {
      field: "charge",
      headerName: upperCase("charge"),
      minWidth: 89,
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
      field: "status",
      headerName: upperCase("Status"),
      minWidth: 100,
      flex: 1,
      renderCell: ({ row: { status } }) => (
        <Label
          color={
            (status === "rejected" && "error") ||
            (status === "pending" && "warning") ||
            (status === "success" && "success") ||
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
      minWidth: 180,
      flex: 1,
      renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
    },
  ];

  if (!pending) {
    columns.splice(8, 0, {
      field: "updatedAt",
      headerName: upperCase("proceed at"),
      minWidth: 180,
      flex: 1,
      renderCell: ({ row: { updatedAt } }) => fDateTime(updatedAt),
    });
  }
  return (
    <DataTable<Prisma.WithdrawScalarFieldEnum>
      title={title}
      query={(queryOptions) =>
        adminApi.withdraw.getRecords.useQuery({ status, table: queryOptions })
      }
      sortModel={[
        {
          field: sortBy,
          sort: pending ? ("asc" as const) : ("desc" as const),
        },
      ]}
      columns={columns}
    />
  );
};

export default WithdrawTable;
