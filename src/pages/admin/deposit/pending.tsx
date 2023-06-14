import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { DepositTable } from "@/sections/admin/deposit";

const Pending: NextPageWithLayout = () => (
  <Page title="Pending Deposits">
    <HeaderBreadcrumbs
      heading="Pending Deposits"
      links={[{ name: "Deposit" }, { name: "Pending Deposits" }]}
    />
    <DepositTable
      title="Pending Deposits"
      status="review"
    />
  </Page>
);
Pending.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Pending;
