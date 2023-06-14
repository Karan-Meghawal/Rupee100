import Iconify from "@/components/Iconify";
import { varSlide } from "@/components/animate";
import { Grid, Stack } from "@mui/material";
import { m } from "framer-motion";

type Props = {
  text: string;
};

const AboutUsHeroFeatures = ({ text }: Props) => (
  <Grid
    item
    xs={12}
    sm={6}
  >
    <m.div variants={varSlide().inLeft}>
      <Stack
        alignItems="center"
        direction="row"
      >
        <Iconify
          color="primary.main"
          icon="uil:arrow-right"
          sx={{
            fontSize: 40,
          }}
        />
        {text}
      </Stack>
    </m.div>
  </Grid>
);

export default AboutUsHeroFeatures;
