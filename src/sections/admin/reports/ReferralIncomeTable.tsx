import DataTable from "@/components/DataTable";
import Label from "@/components/Label";
import TableUser from "@/components/TableUser";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["report"]["referralIncome"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "referralId",
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
    field: "amount",
    headerName: upperCase("referral Income"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { amount } }) => fCurrency(amount),
  },
  {
    field: "userId",
    headerName: upperCase("referred id"),
    minWidth: 150,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: upperCase("referred At"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { status } }) => (
      <Label
        color={
          (status === "pending" && "warning") ||
          (status === "credit" && "success") ||
          "error"
        }
      >
        {capitalCase(status)}
      </Label>
    ),
  },
];

const ReferralIncomeTable = () => (
  <DataTable
    title="Referral Income"
    sortModel={[
      {
        field: "createdAt",
        sort: "desc",
      },
    ]}
    columns={columns}
    query={(queryOptions) =>
      adminApi.report.referralIncome.useQuery(queryOptions)
    }
  />
);

export default ReferralIncomeTable;
