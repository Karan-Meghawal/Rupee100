import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { TransactionsTable } from "@/sections/admin/reports";

const Transactions: NextPageWithLayout = () => (
  <Page title="Transactions">
    <HeaderBreadcrumbs
      heading="Transactions"
      links={[{ name: "Reports" }, { name: "Transactions" }]}
    />
    {/* <TransactionsCards /> */}
    <TransactionsTable />
  </Page>
);
Transactions.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Transactions;
