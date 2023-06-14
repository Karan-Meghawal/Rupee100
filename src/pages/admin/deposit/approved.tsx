import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { DepositTable } from "@/sections/admin/deposit";

const Approved: NextPageWithLayout = () => (
  <Page title="Approved Deposits">
    <HeaderBreadcrumbs
      heading="Approved Deposits"
      links={[{ name: "Deposit" }, { name: "Approved Deposits" }]}
    />
    <DepositTable
      title="Approved Deposits"
      status="approved"
    />
  </Page>
);
Approved.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Approved;
