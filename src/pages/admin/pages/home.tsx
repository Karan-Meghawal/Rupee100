import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  HomePageHero,
  HomePageHowItWorks,
  HomePageHowItWorksSection,
  HomePageServices,
  HomePageServicesSection,
} from "@/sections/admin/pages/home";
import { Grid } from "@mui/material";

const HomePage: NextPageWithLayout = () => (
  <Page title="Home Page">
    <HeaderBreadcrumbs
      heading="Home Page"
      links={[{ name: "Pages" }, { name: "Home Page" }]}
    />

    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        xs={12}
      >
        <HomePageHero />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <HomePageServicesSection />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <HomePageServices />
      </Grid>

      <Grid
        item
        xs={12}
      >
        <HomePageHowItWorksSection />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <HomePageHowItWorks />
      </Grid>
    </Grid>
  </Page>
);
HomePage.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default HomePage;
