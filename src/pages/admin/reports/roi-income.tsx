import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { RoiIncomeTable } from "@/sections/admin/reports";

const RoiIncome: NextPageWithLayout = () => (
  <Page title="Roi Income">
    <HeaderBreadcrumbs
      heading="Roi Income"
      links={[{ name: "Reports" }, { name: "Roi Income" }]}
    />
    <RoiIncomeTable />
  </Page>
);
RoiIncome.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default RoiIncome;
