import appData from "@/appData.json";
import Page from "@/components/Page";
import MainLayout from "@/layouts/main";
import { Hero, HowItWorks, ServiceSection } from "@/sections/home";
import PlansSection from "@/sections/home/PlansSection";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import { type GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data } = api.pageHome.useQuery();
  const { data: plans } = api.plan.useQuery();
  const { hero, howItWork, services, howItWorkSection, servicesSection } =
    data! ?? {};

  if (!data) return null;
  return (
    <Page
      title={`${appData.siteName} - Next-Generation MLM Platform`}
      sx={{
        position: "relative",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "url(/images/overlay-dark.png)"
            : "url(/images/overlay-light.png)",
        zIndex: 0,
      }}
    >
      <Hero {...hero} />
      <ServiceSection
        data={services}
        section={servicesSection}
      />
      <PlansSection plans={plans!} />
      <HowItWorks
        data={howItWork}
        section={howItWorkSection}
      />
    </Page>
  );
};
Home.getLayout = (page) => (
  <MainLayout bottomPadding={false}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.pageHome.prefetch();
  await helpers.main.plan.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default Home;
