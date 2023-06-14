import Image from "@/components/Image";
import TitleText from "@/components/TitleText";
import { MotionViewport, varSlide } from "@/components/animate";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { m } from "framer-motion";

const OurMission = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => (
  <Paper
    sx={{ position: "relative", overflow: "hidden", py:6 }}
    component={MotionViewport}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        color: "background.default",
      }}
    >
      <svg
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <path
          d="M0 62L22.8 61.2C45.7 60.3 91.3 58.7 137 53.2C182.7 47.7 228.3 38.3 274 43.7C319.7 49 365.3 69 411.2 66.7C457 64.3 503 39.7 548.8 36.2C594.7 32.7 640.3 50.3 686 49.3C731.7 48.3 777.3 28.7 823 18.3C868.7 8 914.3 7 937.2 6.5L960 6L960 0L937.2 0C914.3 0 868.7 0 823 0C777.3 0 731.7 0 686 0C640.3 0 594.7 0 548.8 0C503 0 457 0 411.2 0C365.3 0 319.7 0 274 0C228.3 0 182.7 0 137 0C91.3 0 45.7 0 22.8 0L0 0Z"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </svg>
    </Box>
    <Box sx={{ mt: 18, pb: 12 }}>
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
            <m.div variants={varSlide().inLeft}>
              <Typography
                sx={{ mb: 6 }}
                variant="h3"
              >
                <TitleText text={title} />
              </Typography>
              <Typography
                variant="h6"
                fontWeight={"normal"}
                color="text.secondary"
              >
                <TitleText text={description} />
              </Typography>
            </m.div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <m.div variants={varSlide().inRight}>
              <Image
                src={image}
                alt="our-mission"
                sx={{
                  borderRadius: 1,
                }}
              />
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Paper>
);

export default OurMission;
