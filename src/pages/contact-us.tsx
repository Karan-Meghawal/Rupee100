import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import SocialsButton from "@/components/SocialsButton";
import TitleText from "@/components/TitleText";
import { varSlide } from "@/components/animate";
import MainLayout from "@/layouts/main";
import { ContactUsForm } from "@/sections/contact-us";
import ssgHelper from "@/server/ssgHelper";
import { api } from "@/utils/api";
import { Box, Card, Grid, Stack, Typography, styled } from "@mui/material";
import { m } from "framer-motion";
import { type GetStaticProps } from "next";
import { type NextPageWithLayout } from "./_app";

const LeftCard = styled(Box)(({ theme }) => ({
  background: "#3E1F92",
  height: "100%",
  borderRadius: theme.spacing(2),
  padding: 40,
  color: "#fff",
  position: "relative",
  overflow: "hidden",
}));

const RightCard = styled(Box)(() => ({
  height: "100%",
  padding: 40,
  display: "grid",
  placeItems: "center",
}));

const LeftBottomRightCard = styled(Box)(() => ({
  width: 250,
  height: 250,
  borderRadius: 999,
  background: "#FA949D",
  marginLeft: "auto",
  position: "absolute",
  right: -100,
  bottom: -100,
}));

const LeftCircleCard = styled(Box)(() => ({
  width: 100,
  height: 100,
  borderRadius: 999,
  background: "#8758FA",
  opacity: 0.9,
  marginTop: -20,
}));

const ContactUs: NextPageWithLayout = () => {
  const { data } = api.sections.useQuery();
  const { contactUs } = data!;
  if (!contactUs) return null;
  const { title, subtitle, whatsapp, email, location } = contactUs;
  
  return (
    <Page
      title="Contact Us"
      motion
    >
      <m.div variants={varSlide().inLeft}>
        <Typography
          variant="h2"
          textAlign={"center"}
          mb={8}
        >
          Contact Us
        </Typography>
      </m.div>

      <Card
        component={m.div}
        variants={varSlide().inLeft}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={5}
          >
            <LeftCard>
              <Typography
                variant="h4"
                marginBottom={1}
              >
                <TitleText text={title} />
              </Typography>
              <Typography sx={{ color: "#A4A2BC" }}>
                <TitleText text={subtitle} />
              </Typography>

              <Stack
                marginTop={8}
                spacing={6}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Iconify
                    color="#FA949D"
                    sx={{ fontSize: 26 }}
                    icon={"ri:whatsapp-fill"}
                  />
                  <Typography>{whatsapp}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Iconify
                    color="#FA949D"
                    sx={{ fontSize: 26 }}
                    icon={"ic:round-email"}
                  />
                  <Typography>{email}</Typography>
                </Box>
                {location && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Iconify
                      color="#FA949D"
                      sx={{ fontSize: 26 }}
                      icon={"material-symbols:location-on"}
                    />
                    <Typography>{location}</Typography>
                  </Box>
                )}
              </Stack>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: 150 }}
              >
                <Box sx={{ width: "75%" }}>
                  <SocialsButton />
                </Box>
                <LeftBottomRightCard>
                  <LeftCircleCard />
                </LeftBottomRightCard>
              </Box>
            </LeftCard>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <RightCard>
              <ContactUsForm />
            </RightCard>
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
ContactUs.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async () => {
  const helpers = ssgHelper();
  await helpers.main.sections.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default ContactUs;
