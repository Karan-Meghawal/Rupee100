import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { DepositTable } from "@/sections/admin/deposit";

const Instant: NextPageWithLayout = () => (
  <Page title="Instant Deposits">
    <HeaderBreadcrumbs
      heading="Instant Deposits"
      links={[{ name: "Deposit" }, { name: "Instant Deposits" }]}
    />
    <DepositTable
      title="Instant Deposits"
      status="instant"
    />
  </Page>
);
Instant.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Instant;
