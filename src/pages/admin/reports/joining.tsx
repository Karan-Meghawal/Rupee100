import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Label from "@/components/Label";
import Page from "@/components/Page";
import TableUser from "@/components/TableUser";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fDateTime } from "@/utils/formatTime";
import { Box, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["users"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "email",
    headerName: upperCase("user"),
    minWidth: 260,
    flex: 1,
    renderCell: ({ row: { avatar, userName, email, userId } }) => (
      <TableUser
        avatar={avatar}
        title={userName}
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
  },
  {
    field: "placementId",
    headerName: upperCase("Placement At"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "placementSide",
    headerName: upperCase("placement"),
    minWidth: 100,
    flex: 1,
  },
];

const Joining: NextPageWithLayout = () => (
  <Page title="Joining">
    <HeaderBreadcrumbs
      heading="Joining"
      links={[{ name: "Reports" }, { name: "Joining" }]}
    />

    <DataTable<Prisma.UserScalarFieldEnum>
      title="Users Joining"
      query={(queryOptions) =>
        adminApi.users.getRecords.useQuery({
          status: "all",
          table: queryOptions,
        })
      }
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
Joining.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Joining;
