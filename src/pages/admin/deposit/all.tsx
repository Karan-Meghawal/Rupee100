import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { DepositTable } from "@/sections/admin/deposit";

const All: NextPageWithLayout = () => (
  <Page title="All Deposits">
    <HeaderBreadcrumbs
      heading="All Deposit"
      links={[{ name: "Deposit" }, { name: "All Deposit" }]}
    />
    <DepositTable
      title="All Deposit"
      status="all"
    />
  </Page>
);
All.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default All;
