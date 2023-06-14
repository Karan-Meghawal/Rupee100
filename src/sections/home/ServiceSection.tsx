import GradientText from "@/components/GradientText";
import Iconify from "@/components/Iconify";
import { MotionViewport, varSlide } from "@/components/animate";
import PolygonIllustration from "@/illustration/PolygonIllustration";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  type Page_Home_Service,
  type Page_Home_ServicesSection,
} from "@prisma/client";
import { m } from "framer-motion";

type Props = {
  data: Page_Home_Service[];
  section: Page_Home_ServicesSection;
};

const ServiceSection = ({ data, section: { heading, subheading } }: Props) => (
  <Box
    component="section"
    position="relative"
  >
    <Container
      sx={{ py: 8, position: "relative" }}
      component={MotionViewport}
    >
      <Typography
        gutterBottom
        variant="h2"
        textAlign="center"
      >
        <GradientText text={heading} />
      </Typography>
      {subheading && (
        <Typography
          gutterBottom
          color="text.secondary"
          textAlign="center"
        >
          <GradientText text={subheading} />
        </Typography>
      )}

      <Grid
        container
        spacing={2}
        py={6}
      >
        {data.map(({ description, heading, icon }, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <m.div
              variants={varSlide().inUp}
              whileHover={{
                scale: 1.01,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <Card
                sx={{
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Box
                      my={1}
                      marginX="auto"
                      sx={{
                        width: 80,
                        height: 80,
                        background: (theme) => theme.palette.primary.lighter,
                        borderRadius: 999,
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <Iconify
                        color="primary.main"
                        icon={icon}
                        sx={{
                          fontSize: 34,
                        }}
                      />
                    </Box>
                    <Typography variant="h6">{heading}</Typography>
                    <Typography
                      color="text.secondary"
                      variant="body1"
                    >
                      {description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Container>
    <Box
      color="#E1CEF2"
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        zIndex: -1,
      }}
    >
      <PolygonIllustration />
    </Box>
  </Box>
);

export default ServiceSection;
