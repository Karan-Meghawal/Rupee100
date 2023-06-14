import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import Page from "@/components/Page";
import TitleText from "@/components/TitleText";
import { MotionViewport, varFade, varSlide } from "@/components/animate";
import MainLayout from "@/layouts/main";
import { FaqContact } from "@/sections/faq";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { m } from "framer-motion";
import { type GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

const Faq: NextPageWithLayout = () => {
  const { data } = api.sections.useQuery();
  const {
    faq: { title, subtitle },
    contactUs: { email, whatsapp },
  } = data!;

  const { data: faqData } = api.faq.useQuery();
  const faqs = faqData!;

  return (
    <Page
      title="Faqs"
      component={MotionViewport}
    >
      <m.div variants={varSlide().inDown}>
        <Typography
          variant="h2"
          textAlign={"center"}
          mb={1}
        >
          <TitleText text={title} />
        </Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          color="text.secondary"
          mb={8}
        >
          <TitleText text={subtitle} />
        </Typography>
      </m.div>

      <Stack spacing={1}>
        {faqs.map(({ question, answer }, index) => (
          <Accordion
            disableGutters
            key={index}
            component={m.div}
            variants={varSlide().inDown}
          >
            <AccordionSummary
              expandIcon={
                <Iconify
                  color="primary.main"
                  icon="material-symbols:keyboard-arrow-down-rounded"
                />
              }
            >
              <Typography variant="h6">
                Q{index + 1}: {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{answer} </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          mt: 10,
        }}
        component={m.div}
        variants={varFade().inDown}
      >
        <Label color="primary">Question</Label>
        <Typography variant="h4">You still have a question?</Typography>
        <Typography color={"grey.600"}>
          If you cannot find a question in our FAQ, you can always contact us.
          We will answer to you shortly!
        </Typography>
      </Box>
      
      <FaqContact
        email={email}
        whatsapp={whatsapp}
      />
    </Page>
  );
};
Faq.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.sections.prefetch();
  await helpers.main.faq.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};
export default Faq;
