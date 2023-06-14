import Avatar from "@/components/Avatar";
import DataTable from "@/components/DataTable";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import createAvatar from "@/utils/createAvatar";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";

type Row = UserApiOutputs["transferPayment"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "agentId",
    headerName: upperCase("User"),
    minWidth: 200,
    flex: 1,
    renderCell({ row: { agent, action } }) {
      const { userId, avatar, userName } = agent;

      return (
        <Box
          display="flex"
          alignItems="center"
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              alt={"name"}
              src={avatar}
              sx={{ borderRadius: 999, width: 48, height: 48 }}
              color={avatar ? "default" : createAvatar(userName).color}
            >
              {createAvatar(userName).name}
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 18,
                height: 18,
                bgcolor:
                  action !== "transferred" ? "success.main" : "error.main",
                borderRadius: 999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Iconify
                icon={
                  action === "transferred"
                    ? "material-symbols:arrow-outward-rounded"
                    : "ph:arrow-down-left-bold"
                }
              />
            </Box>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">{userName}</Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {userId}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "id",
    headerName: upperCase("txn Id"),
    minWidth: 200,
    flex: 1,
  },
  {
    field: "amount",
    headerName: upperCase("amount"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) => fCurrency(row.amount),
  },
  {
    field: "charge",
    headerName: upperCase("charge"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) => fCurrency(row.charge),
  },
  {
    field: "netAmount",
    headerName: upperCase("net Amount"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) => fCurrency(row.netAmount),
  },
  {
    field: "action",
    headerName: upperCase("action"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { action } }) => (
      <Label color={action === "received" ? "success" : "error"}>
        {capitalCase(action)}
      </Label>
    ),
  },
  {
    field: "createdAt",
    headerName: upperCase("date"),
    minWidth: 180,
    flex: 1,
    filterable: false,
    renderCell: ({ row }) => fDateTime(row.createdAt),
  },
];

const AllRecord = () => (
  <DataTable<Prisma.TransferPaymentScalarFieldEnum>
    title="Transfer Payment History"
    query={(queryOptions) =>
      userApi.transferPayment.getRecords.useQuery(queryOptions)
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
export default AllRecord;
