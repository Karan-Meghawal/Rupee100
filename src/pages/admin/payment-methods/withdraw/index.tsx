import DataTableClient from "@/components/DataTableClient";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import Label from "@/components/Label";
import Page from "@/components/Page";
import IconifyIcons from "@/IconifyIcons";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { WithdrawUpdateStatus } from "@/sections/admin/payment-methods/withdraw";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Button, IconButton } from "@mui/material";
import Link from "next/link";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["paymentMethod"]["withdraw"]["getRecords"][number];

const sortModel = [
  {
    field: "createdAt",
    sort: "desc" as const,
  },
];
const columns: GridColKeys<Row>[] = [
  {
    field: "name",
    headerName: upperCase("Method"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { logo, name } }) => (
      <>
        <Image
          alt={name}
          src={logo}
          sx={{
            borderRadius: 999,
            width: 48,
            minWidth: 48,
            height: 48,
            mr: 2,
          }}
        />
        {name}
      </>
    ),
  },
  {
    field: "charge",
    headerName: upperCase("charge"),
    minWidth: 50,
    flex: 0.8,
    renderCell({ row: { charge, chargeType } }) {
      return chargeType === "fixed" ? fCurrency(charge) : fPercent(charge);
    },
  },
  {
    field: "minWithdraw",
    headerName: upperCase("limit"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { minWithdraw, maxWithdraw } }) =>
      `${fCurrency(minWithdraw)} - ${fCurrency(maxWithdraw)}`,
  },
  {
    field: "processingTime",
    headerName: upperCase("processing Time"),
    minWidth: 100,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: upperCase("created At"),
    minWidth: 180,
    flex: 1,
    renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 80,
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
    filterable: false,
    sortable: false,
    renderCell({ row: { id, status } }) {
      return (
        <>
          <WithdrawUpdateStatus
            id={id}
            status={status}
          >
            <Iconify
              icon={
                status === "active" ? IconifyIcons.eyeClosed : IconifyIcons.eye
              }
            />
          </WithdrawUpdateStatus>
          <IconButton
            LinkComponent={Link}
            href={ADMIN_PATH.paymentMethods.withdraw.update(id)}
          >
            <Iconify icon={IconifyIcons.pencil} />
          </IconButton>
        </>
      );
    },
  },
];

const Withdraw: NextPageWithLayout = () => (
  <Page title="Withdraw">
    <HeaderBreadcrumbs
      heading="Withdraw Setting"
      links={[{ name: "Payment Gateways" }, { name: "Withdraw" }]}
    />
    <DataTableClient
      title="Withdraw Methods"
      sortModel={sortModel}
      columns={columns}
      action={
        <Button
          LinkComponent={Link}
          href={ADMIN_PATH.paymentMethods.withdraw.create}
          startIcon={<Iconify icon="carbon:add" />}
          variant="contained"
        >
          Create a new
        </Button>
      }
      query={adminApi.paymentMethod.withdraw.getRecords.useQuery}
    />
  </Page>
);
Withdraw.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Withdraw;
