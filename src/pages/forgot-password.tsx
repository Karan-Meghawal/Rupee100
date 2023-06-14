import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { LockIcon, SentIcon } from "@/illustration";
import Layout from "@/layouts";
import { useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import {
  ForgotPasswordForm,
  ResetPasswordForm,
} from "@/sections/user/forgot-password";
import { OTP_LENGTH } from "@/server/config";
import { Box, Container, Link, NoSsr, Typography, styled } from "@mui/material";
import NextLink from "next/link";
import { type NextPageWithLayout } from "./_app";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
  background: theme.palette.background.paper,
  minHeight: "100vh",
}));

const ForgotPassword: NextPageWithLayout = () => {
  const {
    forgotPasswordPage: { step, email },
  } = useUserAuth();

  return (
    <Page title="Forgot Password">
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: "auto", textAlign: "center" }}>
            <NoSsr>
              {step === 1 ? (
                <Box>
                  <LockIcon sx={{ mb: 5, mx: "auto", height: 96 }} />
                  <Typography
                    variant="h3"
                    paragraph
                  >
                    Forgot your password?
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Please enter the <strong>User Id or Username</strong>{" "}
                    associated with your account and We will email you an otp to
                    reset your password.
                  </Typography>
                  <ForgotPasswordForm />
                  <Link
                    sx={{ alignItems: "center", display: "inline-flex", my: 3 }}
                    variant="subtitle2"
                    component={NextLink}
                    href={USER_PATH.login}
                  >
                    <Iconify
                      sx={{ width: 16, height: 16 }}
                      icon="eva:arrow-ios-back-fill"
                    />
                    Return to sign in
                  </Link>
                </Box>
              ) : (
                <Box>
                  <SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />
                  <Typography
                    variant="h3"
                    gutterBottom
                  >
                    Request sent successfully
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    We've sent a {OTP_LENGTH}-digit confirmation <b>code</b> to
                    your email <Link href={`mailto:${email}`}>{email}</Link>.
                    <br />
                    Please enter the <strong>code</strong> in below box to
                    verify.
                  </Typography>
                  <ResetPasswordForm />
                </Box>
              )}
            </NoSsr>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
};
ForgotPassword.getLayout = (page) => <Layout variant="logo">{page}</Layout>;
export default ForgotPassword;
