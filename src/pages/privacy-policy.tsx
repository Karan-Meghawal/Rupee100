import Page from "@/components/Page";
import TinyMceBox from "@/components/TInyMceBox";
import TitleText from "@/components/TitleText";
import { varSlide } from "@/components/animate";
import MainLayout from "@/layouts/main";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import { Card, CardContent, Typography } from "@mui/material";
import { m } from "framer-motion";
import { type GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

const PrivacyPolicy: NextPageWithLayout = () => {
  const { data } = api.sections.useQuery();
  const { privacyPolicy } = data!;
  const { title, description } = privacyPolicy;

  return (
    <Page
      title="Privacy Policy"
      motion
    >
      <Card
        component={m.div}
        variants={varSlide().inDown}
      >
        <CardContent sx={{ p: { xs: 2, md: 5 } }}>
          <Typography
            variant="h2"
            textAlign={"center"}
            mb={4}
          >
            <TitleText text={title} />
          </Typography>
          <TinyMceBox dangerouslySetInnerHTML={{ __html: description }} />
        </CardContent>
      </Card>
    </Page>
  );
};
PrivacyPolicy.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.sections.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default PrivacyPolicy;
