import GradientText from "@/components/GradientText";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import { MotionViewport, varFade } from "@/components/animate";
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  type Page_Home_HowItWork,
  type Page_Home_HowItWorkSection,
} from "@prisma/client";
import { m } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

type Props = {
  data: Page_Home_HowItWork[];
  section: Page_Home_HowItWorkSection;
};

const HowItWorks = ({ data, section: { heading, subheading } }: Props) => {
  const theme = useTheme();
  return (
    <Container component={MotionViewport}>
      <Stack
        spacing={1}
        component="section"
        mt={4}
        py={8}
        position="relative"
      >
        <Box
          component={m.div}
          mb={2}
          variants={varFade().inUp}
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
              textAlign="center"
              color="text.secondary"
            >
              <GradientText text={subheading} />
            </Typography>
          )}
        </Box>

        <VerticalTimeline>
          {data.map(({ description, heading, image }, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                background: theme.palette.background.paper,
              }}
              contentArrowStyle={{
                borderRightColor: theme.palette.background.paper,
              }}
              // @ts-ignore
              date={
                <Image
                  alt="register"
                  src={image}
                  width={150}
                  sx={{
                    marginLeft: index % 2 !== 0 ? "auto" : undefined,
                  }}
                />
              }
              icon={
                <Card
                  sx={{
                    height: 1,
                    borderRadius: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6"> {index + 1}</Typography>
                </Card>
              }
            >
              <Typography variant="h6">{heading}</Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {description}
              </Typography>
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{
              background: theme.palette.success.main,
              color: "#fff",
            }}
            icon={<Iconify icon="solar:star-linear" />}
          />
        </VerticalTimeline>
      </Stack>
    </Container>
  );
};

export default HowItWorks;
