import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fDateTime } from "@/utils/formatTime";
import { Button, Link } from "@mui/material";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

type Row = UserApiOutputs["support"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "id",
    headerName: upperCase("Ticket Id"),
    minWidth: 200,
    maxWidth: 240,
    flex: 1,
    renderCell(params) {
      const { id } = params.row;
      return (
        <Link
          href={USER_PATH.support.ticket(id)}
          component={NextLink}
        >
          #{id}
        </Link>
      );
    },
  },
  {
    field: "subject",
    headerName: upperCase("subject"),
    minWidth: 200,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: upperCase("created At"),
    minWidth: 150,
    flex: 1,
    filterable: false,
    renderCell: ({ row }) => fDateTime(row.createdAt),
  },
  {
    field: "updatedAt",
    headerName: upperCase("last Replied At"),
    minWidth: 150,
    flex: 1,
    filterable: false,
    renderCell: ({ row }) => fDateTime(row.updatedAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell({ row: { status } }) {
      return (
        <Label
          color={
            (status === "pending" && "warning") ||
            (status === "active" && "success") ||
            "error"
          }
        >
          {capitalCase(status)}
        </Label>
      );
    },
  },
];

const Support: NextPageWithLayout = () => (
  <Page title="Support">
    <HeaderBreadcrumbs
      heading="Support"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Support" },
      ]}
      action={
        <Button
          LinkComponent={NextLink}
          href={USER_PATH.support.create}
          size="large"
          startIcon={<Iconify icon="ic:round-plus" />}
          variant="contained"
        >
          Create a ticket
        </Button>
      }
    />

    <DataTable
      title="Support Tickets"
      subheader="List of tickets opened by you"
      sortModel={[
        {
          field: "createdAt",
          sort: "desc" as const,
        },
      ]}
      columns={columns}
      query={(queryOptions) =>
        userApi.support.getRecords.useQuery(queryOptions)
      }
    />
  </Page>
);

Support.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Support;
