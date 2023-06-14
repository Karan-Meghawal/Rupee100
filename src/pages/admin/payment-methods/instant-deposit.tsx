import DataTableClient from "@/components/DataTableClient";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Image from "@/components/Image";
import Label from "@/components/Label";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  InstantDepositCreateButton,
  InstantDepositDeleteButton,
  InstantDepositEditButton,
  InstantDepositUpdateStatusButton,
} from "@/sections/admin/payment-methods/instant-deposit";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fDateTime } from "@/utils/formatTime";
import { type GridColKeys } from "~/types";

const sortModel = [
  {
    field: "createdAt",
    sort: "desc" as const,
  },
];

type Row =
  AdminApiOutputs["paymentMethod"]["instantDeposit"]["getRecords"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "name",
    headerName: upperCase("method"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { name, logo } }) => (
      <>
        <Image
          alt={name}
          src={logo}
          sx={{ borderRadius: 999, width: 48, height: 48, mr: 2 }}
        />
        {name}
      </>
    ),
  },
  {
    field: "createdAt",
    headerName: upperCase("created At"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
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
  {
    field: "id",
    headerName: upperCase("action"),
    minWidth: 100,
    flex: 1,
    sortable: false,
    renderCell({ row: { status, id, uniqueId } }) {
      return (
        <>
          <InstantDepositUpdateStatusButton
            id={id}
            status={status}
          />
          <InstantDepositDeleteButton id={id} />
          <InstantDepositEditButton uniqueId={uniqueId} />
        </>
      );
    },
  },
];

const InstantDeposit: NextPageWithLayout = () => (
  <Page title="Instant Deposit">
    <HeaderBreadcrumbs
      heading="Instant Deposit Setting"
      links={[{ name: "Payment Gateways" }, { name: "Instant Deposit" }]}
    />

    <DataTableClient
      action={<InstantDepositCreateButton />}
      title="Instant Deposit Gateways"
      sortModel={sortModel}
      columns={columns}
      query={adminApi.paymentMethod.instantDeposit.getRecords.useQuery}
    />
  </Page>
);
InstantDeposit.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default InstantDeposit;
