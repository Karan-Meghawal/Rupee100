import { PageNotFoundIllustration } from "@/illustration";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import NextLink from "next/link";
import Page from "../components/Page";
import { MotionContainer, varBounce } from "../components/animate";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  width: "100%",
  minHeight: "100vh",
  background: theme.palette.background.paper,
}));

const Page404 = () => (
  <Page title="404 Page Not Found">
    <RootStyle>
      <Container component={MotionContainer}>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <m.div variants={varBounce().in}>
            <Typography
              variant="h3"
              paragraph
            >
              Sorry, page not found!
            </Typography>
          </m.div>
          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>
          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </m.div>
          <NextLink
            href="/"
            passHref
          >
            <Button
              size="large"
              variant="contained"
            >
              Go to Home
            </Button>
          </NextLink>
        </Box>
      </Container>
    </RootStyle>
  </Page>
);

export default Page404;
