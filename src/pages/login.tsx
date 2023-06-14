import Image from "@/components/Image";
import Page from "@/components/Page";
import useResponsive from "@/hooks/useResponsive";
import LogoLayout from "@/layouts/logo";
import { useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { LoginMain, LoginVerify } from "@/sections/user/login";
import { Box, Card, Container, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { type NextPageWithLayout } from "./_app";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  background: theme.palette.background.paper,
}));
const ContentStyle = styled(Container)(({ theme }) => ({
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
const LoginCardContainer = styled("div")(({ theme }) => ({
  maxWidth: 1000,
  position: "relative",
  [theme.breakpoints.up("md")]: {
    "&:before": {
      content: "''",
      width: 100,
      height: 100,
      background:
        "linear-gradient(109deg, rgba(131,64,255,0.76)  0%, rgba(32,77,204,0.76) 100%)",
      position: "absolute",
      right: -40,
      top: -20,
      borderRadius: theme.spacing(1),
      transform: "translateZ(-1px)",
    },
    "&:after": {
      content: "''",
      width: 80,
      height: 80,
      background:
        "linear-gradient(109deg, rgba(131,64,255,0.76)  0%, rgba(32,77,204,0.76) 100%)",
      position: "absolute",
      left: -40,
      bottom: -20,
      borderRadius: theme.spacing(1),
      transform: "translateZ(-1px)",
    },
  },
}));
const LoginCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: 1000,
  },
  margin: "auto",
  display: "flex",
  borderTopRightRadius: theme.spacing(1),
  borderBottomLeftRadius: theme.spacing(1),
  borderTopLeftRadius: theme.spacing(6),
  borderBottomRightRadius: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
  },
}));
const LeftCard = styled("div")(({ theme }) => ({
  background: theme.palette.primary.main,
  width: "50%",
}));
const RightCard = styled("div")(() => ({
  width: "100%",
  maxWidth: 420,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: 8,
}));

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const mdUp = useResponsive("up", "md");
  const { isAuthenticated, loginPage } = useUserAuth();
  const { step } = loginPage;

  useEffect(() => {
    if (isAuthenticated) void router.replace(USER_PATH.dashboard);
  }, [isAuthenticated, router]);

  return (
    <Page title="Login">
      <RootStyle>
        <ContentStyle>
          <LoginCardContainer>
            <LoginCard>
              {mdUp && (
                <LeftCard>
                  <Typography
                    variant="h3"
                    sx={{ px: 5, mt: 10, mb: 5 }}
                  >
                    Hi, Welcome Back
                  </Typography>
                  <Box>
                    <Image
                      src="/images/login.png"
                      alt="login"
                      height={400}
                    />
                  </Box>
                </LeftCard>
              )}
              <RightCard>
                {step === 1 ? <LoginMain /> : <LoginVerify />}
              </RightCard>
            </LoginCard>
          </LoginCardContainer>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
};
Login.getLayout = (page) => <LogoLayout>{page}</LogoLayout>;
export default Login;
