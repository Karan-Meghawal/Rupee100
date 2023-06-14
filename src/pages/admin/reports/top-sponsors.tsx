import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { TopSponsorsTable } from "@/sections/admin/reports";

const TopSponsors: NextPageWithLayout = () => (
  <Page title="TopSponsors">
    <HeaderBreadcrumbs
      heading="Top Sponsors"
      links={[{ name: "Reports" }, { name: "Top Sponsors" }]}
    />
    <TopSponsorsTable />
  </Page>
);
TopSponsors.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default TopSponsors;
