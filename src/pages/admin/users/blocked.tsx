import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { UserTable } from "@/sections/admin/users";

const Blocked: NextPageWithLayout = () => (
  <Page title="Blocked">
    <HeaderBreadcrumbs
      heading="Blocked Users"
      links={[{ name: "Users" }, { name: "Blocked Users" }]}
    />
    <UserTable
      status="blocked"
      title="Blocked Users"
    />
  </Page>
);
Blocked.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Blocked;
