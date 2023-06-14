import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { WithdrawTable } from "@/sections/admin/withdraw";

const AdminWithdraws: NextPageWithLayout = () => (
  <Page title="Admin Withdraws">
    <HeaderBreadcrumbs
      heading="Admin Withdraws"
      links={[{ name: "Withdraw" }, { name: "Admin Withdraws" }]}
    />
    <WithdrawTable
      title="Admin Withdraws"
      status="admin"
    />
  </Page>
);
AdminWithdraws.getLayout = (page) => <Layout variant="admin">{page}</Layout>;
export default AdminWithdraws;
