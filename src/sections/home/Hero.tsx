import GradientText from "@/components/GradientText";
import TitleText from "@/components/TitleText";
import { AnimatedButton, MotionViewport, varFade } from "@/components/animate";
import { HEADER } from "@/config";
import { useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { Container, Grid, Stack, Typography, styled } from "@mui/material";
import { type Page_Home_Hero } from "@prisma/client";
import { m } from "framer-motion";
import Link from "next/link";
import HeroPlayButton from "./HeroPlayButton";

const ContainerStyle = styled("section")(() => ({
  maxHeight: `calc(100vh - ${HEADER.MOBILE_HEIGHT}px)`,
  position: "relative",
  backgroundImage: "url(/images/hero-background.png)",
  backgroundSize: "cover",
  backgroundPosition: "bottom",
  paddingBottom: "24vw",
}));

const Hero = ({ title, description, button, video }: Page_Home_Hero) => {
  const { isAuthenticated } = useUserAuth();
  return (
    <ContainerStyle>
      <Container component={MotionViewport}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ mt: 6 }}
          >
            <Stack spacing={4}>
              <m.div variants={varFade().inLeft}>
                <Typography
                  color="#fff"
                  sx={{ textTransform: "capitalize" }}
                  variant="h1"
                >
                  <GradientText text={title} />
                </Typography>
              </m.div>

              <m.div variants={varFade().inLeft}>
                <Typography
                  color="grey.300"
                  variant="h6"
                  fontWeight={600}
                >
                  <TitleText text={description} />
                </Typography>
              </m.div>

              <m.div variants={varFade().inLeft}>
                <AnimatedButton
                  LinkComponent={Link}
                  href={isAuthenticated ? USER_PATH.dashboard : USER_PATH.login}
                  variant="contained"
                  size="large"
                >
                  {button}
                </AnimatedButton>
              </m.div>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <m.div variants={varFade().inRight}>
              <HeroPlayButton video={video} />
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </ContainerStyle>
  );
};

export default Hero;
