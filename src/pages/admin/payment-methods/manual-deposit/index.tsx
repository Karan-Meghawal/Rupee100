import Avatar from "@/components/Avatar";
import DataTableClient from "@/components/DataTableClient";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import Page from "@/components/Page";
import IconifyIcons from "@/IconifyIcons";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { UpdateStatusTable } from "@/sections/admin/payment-methods/manual-deposit";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import createAvatar from "@/utils/createAvatar";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import { Box, Button, IconButton, Typography } from "@mui/material";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

const sortModel = [
  {
    field: "createdAt",
    sort: "desc" as const,
  },
];

type Row =
  AdminApiOutputs["paymentMethod"]["manualDeposit"]["getRecords"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "name",
    headerName: upperCase("name"),
    minWidth: 200,
    flex: 1,
    renderCell({ row: { name, logo } }) {
      return (
        <Box
          display="flex"
          alignItems="center"
        >
          <Avatar
            alt={name}
            src={logo}
            color={logo ? "default" : createAvatar(name).color}
            sx={{ borderRadius: 99, width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography
              color="text.primary"
              variant="body2"
            >
              {name}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "charge",
    headerName: upperCase("charge"),
    minWidth: 50,
    flex: 1,
    renderCell: ({ row: { charge, chargeType } }) =>
      chargeType === "fixed" ? fCurrency(charge) : fPercent(charge),
  },
  {
    field: "minDeposit",
    headerName: upperCase("limit"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row }) =>
      `${fCurrency(row.minDeposit)} - ${fCurrency(row.maxDeposit)}`,
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
    renderCell({ row: { id, status } }) {
      return (
        <>
          <UpdateStatusTable
            id={id}
            status={status}
          />
          <IconButton
            LinkComponent={NextLink}
            href={ADMIN_PATH.paymentMethods.manualDeposit.update(id)}
          >
            <Iconify icon={IconifyIcons.pencil} />
          </IconButton>
        </>
      );
    },
  },
];

const ManualDeposit: NextPageWithLayout = () => (
  <Page title="Manual Deposit">
    <HeaderBreadcrumbs
      heading="Manual Deposit Setting"
      links={[{ name: "Payment Gateways" }, { name: "Manual Deposit" }]}
    />
    <DataTableClient
      title="Manual Deposit Methods"
      sortModel={sortModel}
      columns={columns}
      action={
        <Button
          LinkComponent={NextLink}
          href={ADMIN_PATH.paymentMethods.manualDeposit.create}
          startIcon={<Iconify icon="carbon:add" />}
          variant="contained"
        >
          Create a new
        </Button>
      }
      query={adminApi.paymentMethod.manualDeposit.getRecords.useQuery}
    />
  </Page>
);
ManualDeposit.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default ManualDeposit;
