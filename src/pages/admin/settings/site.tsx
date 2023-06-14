import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { SiteSetting } from "@/sections/admin/site-setting";
import SiteConfiguration from "@/sections/admin/site-setting/SiteConfiguration";
import { Stack } from "@mui/material";

const Site: NextPageWithLayout = () => (
  <Page title="Site">
    <HeaderBreadcrumbs
      heading="Site Setting"
      links={[{ name: "System Configuration" }, { name: "Site Setting" }]}
    />
    <Stack spacing={3}>
      <SiteSetting />
      <SiteConfiguration />
    </Stack>
  </Page>
);
Site.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Site;
