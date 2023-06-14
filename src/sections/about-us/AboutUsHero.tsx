import Image from "@/components/Image";
import { AnimatedButton, MotionViewport, varSlide } from "@/components/animate";
import APP_PATH from "@/route";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { type Page_AboutUs_Hero } from "@prisma/client";
import { m } from "framer-motion";
import Link from "next/link";
import AboutUsHeroFeatures from "./AboutUsHeroFeatures";

const AboutUsHero = ({
  description,
  features,
  image,
  subtitle,
  title,
}: Page_AboutUs_Hero) => (
  <Box component={MotionViewport}>
    <Container>
      <Grid
        container
        spacing={6}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Stack spacing={1}>
            <m.div variants={varSlide().inLeft}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Typography
                  variant="h6"
                  color="primary.main"
                  textTransform="uppercase"
                >
                  {title}
                </Typography>
                <Stack spacing={0.6}>
                  <Box
                    bgcolor="primary.main"
                    height={2}
                    width={40}
                  ></Box>
                  <Box
                    bgcolor="primary.main"
                    height={2}
                    width={60}
                  ></Box>
                </Stack>
              </Stack>
            </m.div>

            <m.div variants={varSlide().inLeft}>
              <Typography variant="h2">{subtitle} </Typography>
            </m.div>

            <m.div variants={varSlide().inLeft}>
              <Box>
                <Box
                  bgcolor="primary.main"
                  sx={{ p: 0.5, width: 200, borderRadius: 1 }}
                />
              </Box>
            </m.div>
          </Stack>

          <m.div variants={varSlide().inLeft}>
            <Box mt={6}>
              <Typography>{description}</Typography>
            </Box>
          </m.div>

          <Box mt={4}>
            <Grid
              container
              spacing={1}
            >
              {features.map(({ feature }, index) => (
                <AboutUsHeroFeatures
                  key={index}
                  text={feature}
                />
              ))}
            </Grid>
          </Box>

          <m.div variants={varSlide().inLeft}>
            <Box mt={4}>
              <AnimatedButton
                LinkComponent={Link}
                variant="contained"
                size="large"
                href={APP_PATH.contactUs}
              >
                Contact Us
              </AnimatedButton>
            </Box>
          </m.div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <m.div variants={varSlide().inRight}>
            <Image
              alt="about us"
              src={image}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default AboutUsHero;
