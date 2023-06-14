import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  AboutUsFooter,
  AboutUsHero,
  AboutUsOurMission,
} from "@/sections/admin/pages/about-us";
import { Grid } from "@mui/material";

const AboutUsPage: NextPageWithLayout = () => (
  <Page title="About-Us Page">
    <HeaderBreadcrumbs
      heading="Pages"
      links={[{ name: "Pages" }, { name: "About-Us Page" }]}
    />

    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        xs={12}
      >
        <AboutUsHero />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <AboutUsOurMission />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <AboutUsFooter />
      </Grid>
    </Grid>
  </Page>
);
AboutUsPage.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default AboutUsPage;
