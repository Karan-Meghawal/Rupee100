import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { UserTable } from "@/sections/admin/users";

const Active: NextPageWithLayout = () => (
  <Page title="Active">
    <HeaderBreadcrumbs
      heading="Active Users"
      links={[{ name: "Users" }, { name: "Active Users" }]}
    />
    <UserTable
      status="active"
      title="Active Users"
    />
  </Page>
);
Active.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Active;
