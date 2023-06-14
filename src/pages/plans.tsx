import GradientText from "@/components/GradientText";
import Page from "@/components/Page";
import { MotionViewport, varSlide } from "@/components/animate";
import MainLayout from "@/layouts/main";
import { PlanCard } from "@/sections/common/plan";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import { Box, Grid, Typography } from "@mui/material";
import { type Plan } from "@prisma/client";
import { m } from "framer-motion";
import { type GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

type Props = {
  head?: boolean;
  plans?: Plan[];
};

const PlansPage: NextPageWithLayout<Props> = ({ head = true, plans }) => {
  const { data } = api.plan.useQuery();
  return (
    <Page
      head={head}
      title="Plans"
      component={MotionViewport}
    >
      <Box
        component={m.div}
        sx={{ mb: 6, textAlign: "center" }}
        variants={varSlide().inDown}
      >
        <Typography
          gutterBottom
          variant="h2"
        >
          <GradientText text="Choose the {{right plan}} for your need" />
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle1"
        >
          Our Plans
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
      >
        {(plans ?? data)?.map((plan, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={plan.id}
          >
            <PlanCard
              index={index}
              plan={plan}
            />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};
PlansPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.plan.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default PlansPage;
