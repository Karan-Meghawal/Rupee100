import Avatar from "@/components/Avatar";
import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import createAvatar from "@/utils/createAvatar";
import { userDisplayName } from "@/utils/fns";
import { fDateTime } from "@/utils/formatTime";
import { Box, Tooltip, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";
import { type NextPageWithLayout } from "../_app";

type Row = UserApiOutputs["totalTeam"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "email",
    headerName: upperCase("user"),
    minWidth: 260,
    flex: 1,
    renderCell: ({ row: { avatar, firstName, lastName, email } }) => (
      <Box
        display="flex"
        alignItems="center"
      >
        <Avatar
          alt={"name"}
          src={avatar}
          color={
            avatar
              ? "default"
              : createAvatar(userDisplayName(firstName, lastName)).color
          }
          sx={{ borderRadius: 99, width: 48, height: 48, mr: 2 }}
        >
          {createAvatar(userDisplayName(firstName, lastName)).name}
        </Avatar>
        <Box>
          <Typography variant="body2">
            {userDisplayName(firstName, lastName)}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "userId",
    headerName: upperCase("username / userId"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { userName, userId } }) => (
      <Box>
        <Typography variant="body2">{userName}</Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
        >
          {userId}
        </Typography>
      </Box>
    ),
  },
  {
    field: "createdAt",
    headerName: upperCase("registered At"),
    minWidth: 200,
    flex: 1,
    filterable: false,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
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
        (kyc === "pending" && "warning") ||
        (kyc === "unverified" && "info") ||
        "error";

      return (
        <Tooltip title={capitalCase(kyc)}>
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
    renderCell: ({ row: { status } }) => (
      <Label color={status === "active" ? "success" : "error"}>
        {capitalCase(status)}
      </Label>
    ),
  },
];

const TotalTeam: NextPageWithLayout = () => (
  <Page title="Total Team">
    <HeaderBreadcrumbs
      heading="Total Team"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Total Team" },
      ]}
    />
    <DataTable<Prisma.UserScalarFieldEnum>
      title="Total Team"
      query={(options) => userApi.totalTeam.getRecords.useQuery(options)}
      sortModel={[
        {
          field: "createdAt",
          sort: "desc" as const,
        },
      ]}
      columns={columns}
    />
  </Page>
);
TotalTeam.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default TotalTeam;
