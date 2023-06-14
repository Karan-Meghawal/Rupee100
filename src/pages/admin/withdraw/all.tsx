import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { WithdrawTable } from "@/sections/admin/withdraw";

const All: NextPageWithLayout = () => (
  <Page title="All">
    <HeaderBreadcrumbs
      heading="All Withdraw"
      links={[{ name: "Withdraw" }, { name: "All Withdraw" }]}
    />
    <WithdrawTable
      title="All Withdraws"
      status="all"
    />
  </Page>
);
All.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default All;
