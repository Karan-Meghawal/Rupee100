import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { UserTable } from "@/sections/admin/users";

const All: NextPageWithLayout = () => (
  <Page title="All Users">
    <HeaderBreadcrumbs
      heading="All Users"
      links={[{ name: "Users" }, { name: "All Users" }]}
    />

    <UserTable
      status="all"
      title="All Users"
    />
  </Page>
);
All.getLayout = (page) => <Layout variant="admin">{page}</Layout>;
export default All;
