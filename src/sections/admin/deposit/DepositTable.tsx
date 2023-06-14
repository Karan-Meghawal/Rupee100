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
import { Box, Link } from "@mui/material";
import { type Deposit_Status, type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { useMemo } from "react";
import { type GridColKeys } from "~/types";

const getColor = (status: Deposit_Status) =>
  ((status === "pending" || status === "review") && "warning") ||
  ((status === "credit" || status === "approved") && "success") ||
  "error";

type Props = {
  title: string;
  status: AdminApiInputs["deposit"]["getRecords"]["status"];
};

type Row = AdminApiOutputs["deposit"]["getRecords"]["rows"][number];

const DepositTable = ({ title, status }: Props) => {
  const columns: GridColKeys<Row>[] = useMemo(
    () => [
      {
        field: "userId",
        headerName: upperCase("user"),
        minWidth: 180,
        flex: 1,
        renderCell: ({
          row: {
            user: { userName, userId, avatar },
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
        field: "method",
        headerName: upperCase("method"),
        minWidth: 100,
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
        minWidth: 150,
        flex: 1,
        renderCell({ row: { transactionId } }) {
          return (
            <Link
              href={ADMIN_PATH.deposit.transaction(transactionId)}
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
        headerName: upperCase("charge"),
        minWidth: 60,
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
        field: "status",
        headerName: upperCase("status"),
        minWidth: 100,
        flex: 1,
        renderCell: ({ row: { status } }) => (
          <Label color={`${getColor(status)}`}>{capitalCase(status)}</Label>
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
      ...(status !== "review"
        ? [
            {
              field: "updatedAt" as const,
              headerName: upperCase("proceed At"),
              minWidth: 160,
              flex: 1,
              filterable: false,
              renderCell: ({ row: { updatedAt } }: { row: Row }) =>
                fDateTime(updatedAt),
            },
          ]
        : []),
    ],
    [status],
  );

  return (
    <DataTable<Prisma.DepositScalarFieldEnum>
      title={title}
      sortModel={[
        { field: "createdAt", sort: status === "review" ? "asc" : "desc" },
      ]}
      columns={columns}
      query={(options) =>
        adminApi.deposit.getRecords.useQuery({
          status,
          table: options,
        })
      }
    />
  );
};

export default DepositTable;
