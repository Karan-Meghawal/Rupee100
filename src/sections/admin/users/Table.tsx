import DataTable from "@/components/DataTable";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import TableUser from "@/components/TableUser";
import {
  adminApi,
  type AdminApiInputs,
  type AdminApiOutputs,
} from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { userDisplayName } from "@/utils/fns";
import { fDateTime } from "@/utils/formatTime";
import { Box, Tooltip, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["users"]["getRecords"]["rows"][number];
type Status = AdminApiInputs["users"]["getRecords"]["status"];

const columns: GridColKeys<Row>[] = [
  {
    field: "email",
    headerName: upperCase("user"),
    minWidth: 260,
    flex: 1,
    renderCell: ({ row: { avatar, firstName, lastName, email, userId } }) => (
      <TableUser
        avatar={avatar}
        title={userDisplayName(firstName, lastName)}
        subtitle={email}
        userId={userId}
      />
    ),
  },
  {
    field: "userId",
    headerName: upperCase("username / userId"),
    minWidth: 150,
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
    field: "kyc",
    headerName: upperCase("kyc"),
    minWidth: 50,
    flex: 1,
    renderCell: ({ row: { kyc } }) => {
      const icon =
        (kyc === "verified" && "lucide:check-circle") ||
        (kyc === "pending" && "mdi:clock-time-three-outline") ||
        "ri:close-circle-line";

      const color =
        (kyc === "verified" && "success") ||
        (kyc === "rejected" && "error") ||
        (kyc === "pending" && "warning") ||
        "info";

      return (
        <Tooltip title={kyc}>
          <Box>
            <Iconify
              color={`${color}.main`}
              sx={{ fontSize: 24 }}
              icon={icon}
            />
          </Box>
        </Tooltip>
      );
    },
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { status } }) => {
      const color = status === "active" ? "success" : "error";
      return <Label color={color}>{capitalCase(status)}</Label>;
    },
  },
  {
    field: "createdAt",
    headerName: upperCase("registered At"),
    minWidth: 180,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "referralId",
    headerName: upperCase("Referral By"),
    minWidth: 100,
    flex: 1,
    renderCell({ row: { referral } }) {
      return (
        <Box>
          <Typography variant="body2">{referral?.userName ?? "NA"}</Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {referral?.userId ?? "NA"}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "placementId",
    headerName: upperCase("Placement At"),
    minWidth: 100,
    flex: 1,
    renderCell({ row: { placement } }) {
      return (
        <Box>
          <Typography variant="body2">{placement?.userName ?? "NA"}</Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {placement?.userId ?? "NA"}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "placementSide",
    headerName: upperCase("placement"),
    minWidth: 100,
    flex: 1,
  },
];

const Table = ({ status, title }: { status: Status; title: string }) => (
  <DataTable<Prisma.UserScalarFieldEnum>
    title={title}
    query={(queryOptions) =>
      adminApi.users.getRecords.useQuery({ status, table: queryOptions })
    }
    sortModel={[
      {
        field: "createdAt",
        sort: "desc" as const,
      },
    ]}
    columns={columns}
  />
);

export default Table;
