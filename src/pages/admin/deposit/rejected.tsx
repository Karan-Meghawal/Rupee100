import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { DepositTable } from "@/sections/admin/deposit";

const Rejected: NextPageWithLayout = () => (
  <Page title="Rejected Deposits">
    <HeaderBreadcrumbs
      heading="Rejected Deposits"
      links={[{ name: "Deposit" }, { name: "Rejected Deposits" }]}
    />
    <DepositTable
      title="Rejected Deposits"
      status="rejected"
    />
  </Page>
);
Rejected.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Rejected;
