import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { TopEarnersTable } from "@/sections/admin/reports";

const TopEarners: NextPageWithLayout = () => (
  <Page title="TopEarners">
    <HeaderBreadcrumbs
      heading="Top Earners"
      links={[{ name: "Reports" }, { name: "Top Earners" }]}
    />
    <TopEarnersTable />
  </Page>
);
TopEarners.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default TopEarners;
