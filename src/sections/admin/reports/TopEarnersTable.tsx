import DataTable from "@/components/DataTable";
import TableUser from "@/components/TableUser";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import { upperCase } from "@/utils/case";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["report"]["topEarners"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "userId",
    headerName: upperCase("user"),
    minWidth: 180,
    flex: 1,
    renderCell: ({ row: { avatar, userId, email, firstName, lastName } }) => (
      <TableUser
        avatar={avatar}
        title={`${firstName} ${lastName}`}
        subtitle={email}
        userId={userId}
      />
    ),
  },
  {
    field: "userName",
    headerName: upperCase("username / userId"),
    minWidth: 180,
    flex: 1,
    renderCell({ row: { userName, userId } }) {
      return (
        <Box>
          <Typography variant="body2">{userName}</Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {userId}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "createdAt",
    headerName: upperCase("registered At"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "earning",
    headerName: upperCase("earning"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { earning } }) => fCurrency(earning),
  },
];

const TopEarnersTable = () => (
  <DataTable<Prisma.UserScalarFieldEnum | "earning">
    title="Top Earners"
    sortModel={[
      {
        field: "earning",
        sort: "desc",
      },
    ]}
    columns={columns}
    query={(queryOptions) => adminApi.report.topEarners.useQuery(queryOptions)}
  />
);

export default TopEarnersTable;
