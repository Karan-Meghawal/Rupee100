import DataTable from "@/components/DataTable";
import Label from "@/components/Label";
import TableUser from "@/components/TableUser";
import { type NextPageWithLayout } from "@/pages/_app";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["report"]["roiIncome"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "userId",
    headerName: upperCase("User"),
    minWidth: 200,
    flex: 1,
    renderCell: ({
      row: {
        user: { avatar, userId, userName },
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
    field: "transactionId",
    headerName: upperCase("txn Id"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "amount",
    headerName: upperCase("roi"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { amount } }) => fCurrency(amount),
  },
  {
    field: "investment",
    headerName: upperCase("investment"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { investment } }) => fCurrency(investment),
  },
  {
    field: "planName",
    headerName: upperCase("plan"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: upperCase("date"),
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
      <Label color={status === "credit" ? "success" : "error"}>
        {capitalCase(status)}
      </Label>
    ),
  },
];

const RoiIncomeTable: NextPageWithLayout = () => (
  <DataTable<Prisma.RoiScalarFieldEnum>
    title="Roi Income"
    query={(options) => adminApi.report.roiIncome.useQuery(options)}
    sortModel={[
      {
        field: "createdAt",
        sort: "desc" as const,
      },
    ]}
    columns={columns}
    initialState={{
      columns: {
        columnVisibilityModel: {
          transactionId: false,
        },
      },
    }}
  />
);
export default RoiIncomeTable;
