import Page from "@/components/Page";
import MainLayout from "@/layouts/main";
import { AboutUsHero } from "@/sections/about-us";
import { OurMission } from "@/sections/home";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import { Stack } from "@mui/material";
import { type GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

const AboutUs: NextPageWithLayout = () => {
  const { data } = api.pageAboutUs.useQuery();
  const { hero, ourMission } = data!;

  return (
    <Page title="About Us">
      <Stack spacing={2}>
        <AboutUsHero {...hero} />
        <OurMission {...ourMission} />
      </Stack>
    </Page>
  );
};
AboutUs.getLayout = (page) => (
  <MainLayout bottomPadding={false}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.pageAboutUs.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default AboutUs;
