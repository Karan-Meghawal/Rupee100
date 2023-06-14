import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { DepositTable } from "@/sections/admin/deposit";

const Instant: NextPageWithLayout = () => (
  <Page title="Admin Deposits">
    <DepositTable
      title="Admin Deposits"
      status="admin"
    />
  </Page>
);
Instant.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Instant;
