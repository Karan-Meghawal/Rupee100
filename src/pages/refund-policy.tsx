import TinyMceBox from "@/components/TInyMceBox";
import TitleText from "@/components/TitleText";
import MainLayout from "@/layouts/main";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import { Card, CardContent, Typography } from "@mui/material";
import { type GetStaticProps } from "next";
import Page from "@/components/Page";
import { m } from "framer-motion";
import { varSlide } from "@/components/animate";
import { type NextPageWithLayout } from "./_app";

const RefundPolicy: NextPageWithLayout = () => {
  const { data } = api.sections.useQuery();
  const { refundPolicy } = data!;
  const { title, description } = refundPolicy;

  return (
    <Page
      title="Refund Policy"
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
RefundPolicy.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.sections.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default RefundPolicy;
