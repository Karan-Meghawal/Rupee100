import Page from "@/components/Page";
import Layout from "@/layouts";
import { useUserAuth } from "@/redux/slices/userAuth";
import { MainRegistration, RegisterVerify } from "@/sections/user/register";
import { Container, styled } from "@mui/material";
import { type NextPageWithLayout } from "./_app";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(() => ({
  maxWidth: 900,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
}));

const Register: NextPageWithLayout = () => {
  const {
    registerPage: { step },
  } = useUserAuth();

  return (
    <Page title="Register">
      <RootStyle>
        <Container sx={{ p: 0 }}>
          <ContentStyle>
            {step === 1 ? <MainRegistration /> : <RegisterVerify />}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};
Register.getLayout = (page) => <Layout variant="logo">{page}</Layout>;
export default Register;
