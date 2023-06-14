import DataTableClient from "@/components/DataTableClient";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  KycCreateButton,
  KycEditButton,
  KycRemoveButton,
} from "@/sections/admin/kyc-setting";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["setting"]["kyc"]["records"][number];

const sortModel = [
  {
    field: "createdAt",
    sort: "desc" as const,
  },
];

const columns: GridColKeys<Row>[] = [
  {
    field: "label",
    headerName: upperCase("label"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "inputType",
    headerName: upperCase("type"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { inputType } }) => capitalCase(inputType),
  },
  {
    field: "required",
    headerName: upperCase("is required"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { required } }) => capitalCase(required ? "yes" : "no"),
  },
  {
    field: "id",
    headerName: upperCase("action"),
    minWidth: 50,
    sortable: false,
    renderCell({ row }) {
      return (
        <>
          <KycEditButton
            row={row}
            id={row.id}
          />
          <KycRemoveButton id={row.id} />
        </>
      );
    },
  },
];

const Kyc: NextPageWithLayout = () => (
  <Page title="Kyc">
    <HeaderBreadcrumbs
      heading="Kyc Setting"
      links={[{ name: "System Configuration" }, { name: "Kyc Setting" }]}
    />

    <DataTableClient
      title="Kyc Form Records"
      sortModel={sortModel}
      columns={columns}
      action={<KycCreateButton />}
      query={adminApi.setting.kyc.records.useQuery}
    />
  </Page>
);
Kyc.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Kyc;
