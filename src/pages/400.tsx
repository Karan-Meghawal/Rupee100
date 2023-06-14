import { SeverErrorIllustration } from "@/illustration";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { m } from "framer-motion";
import Page from "../components/Page";
import { MotionContainer, varBounce } from "../components/animate";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function Page400({ message }: { message?: string }) {
  return (
    <Page title="400 Bad Request">
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <m.div variants={varBounce({}).in}>
              <Typography
                variant="h3"
                paragraph
              >
                Something went wrong
              </Typography>
            </m.div>
            <Typography sx={{ color: "text.secondary" }}>{message}</Typography>

            <m.div variants={varBounce({}).in}>
              <SeverErrorIllustration
                sx={{ height: 260, my: { xs: 5, sm: 10 } }}
              />
            </m.div>
            <Button
              onClick={() => window.location.reload()}
              size="large"
              variant="contained"
            >
              Reload Page
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
