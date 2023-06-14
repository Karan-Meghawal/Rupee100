import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { type Prisma } from "@prisma/client";
import { type GridColKeys } from "~/types";

type Row = UserApiOutputs["incomes"]["roi"]["rows"][number];

const columns: GridColKeys<Row>[] = [
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

const Roi: NextPageWithLayout = () => (
  <Page title="Roi Income">
    <HeaderBreadcrumbs
      heading="Roi Income"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Roi Income" },
      ]}
    />
    <DataTable<Prisma.RoiScalarFieldEnum>
      title="Roi Income"
      query={(options) => userApi.incomes.roi.useQuery(options)}
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
  </Page>
);
Roi.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Roi;
