import Image from "@/components/Image";
import TitleText from "@/components/TitleText";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const OurVision = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => (
  <Paper
    sx={{ position: "relative", overflow: "hidden" }}
    component="section"
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
        viewBox="0 0 900 675"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <path
          d="M0 60L900 7L900 0L0 0Z"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </svg>
    </Box>
    <Box sx={{ mt: 18 }}>
      <Container>
        <Grid
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
          container
          spacing={6}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Image
              src={image}
              alt="our-vision"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Paper>
);

export default OurVision;
