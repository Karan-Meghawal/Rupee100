import DataTableClient from "@/components/DataTableClient";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import Page from "@/components/Page";
import IconifyIcons from "@/IconifyIcons";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { PlanMarkPopular } from "@/sections/admin/plan-setting";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import { Box, Button, IconButton, Stack } from "@mui/material";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["plan"]["getRecords"][number];

const sortModel = [
  {
    field: "createdAt",
    sort: "desc" as const,
  },
];
const columns: GridColKeys<Row>[] = [
  {
    field: "name",
    headerName: upperCase("Name"),
    minWidth: 200,
    flex: 1,
    renderCell: ({ row: { name, isPopular } }) => (
      <Stack
        alignItems="center"
        direction="row"
      >
        {name}
        {isPopular && (
          <Iconify
            color="warning.main"
            sx={{ ml: 1, fontSize: 18 }}
            icon="humbleicons:crown"
          />
        )}
      </Stack>
    ),
  },
  {
    field: "minInvestment",
    headerName: upperCase("Investment"),
    minWidth: 50,
    flex: 0.8,
    renderCell: ({ row: { minInvestment, maxInvestment } }) =>
      `${fCurrency(minInvestment)} - ${fCurrency(maxInvestment)}`,
  },
  {
    field: "minRoi",
    headerName: upperCase("Roi"),
    minWidth: 150,
    flex: 1,
    renderCell: ({ row: { minRoi, maxRoi } }) =>
      `${fPercent(minRoi)} - ${fPercent(maxRoi)}`,
  },
  {
    field: "referralIncome",
    headerName: upperCase("referralIncome"),
    minWidth: 100,
    flex: 1,
    renderCell: ({ row: { referralIncome } }) => fPercent(referralIncome),
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
    renderCell: ({ row: { id, isPopular } }) => (
      <Box>
        <IconButton
          LinkComponent={NextLink}
          href={ADMIN_PATH.plans.update(id)}
        >
          <Iconify icon={IconifyIcons.pencil} />
        </IconButton>
        <PlanMarkPopular
          id={id}
          isPopular={isPopular}
        />
      </Box>
    ),
  },
];

const PlanSetting: NextPageWithLayout = () => (
  <Page title="PlanSetting">
    <HeaderBreadcrumbs
      heading="Plan Setting"
      links={[{ name: "Settings" }, { name: "Plan Setting" }]}
    />
    <DataTableClient
      title="Plans List"
      sortModel={sortModel}
      columns={columns}
      action={
        <Button
          LinkComponent={NextLink}
          href={ADMIN_PATH.plans.create}
          startIcon={<Iconify icon="carbon:add" />}
          variant="contained"
        >
          Create a new
        </Button>
      }
      query={adminApi.plan.getRecords.useQuery}
    />
  </Page>
);
PlanSetting.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default PlanSetting;
