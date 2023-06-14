import { useConfiguration } from "@/redux/slices/configuration";
import APP_PATH, { USER_PATH } from "@/route";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import RegisterForm from "./RegisterForm";

const MainRegistration = () => {
  const isRegistrationEnabled = true;
  const { appName } = useConfiguration();
  return (
    <Card
      sx={{
        boxShadow: (theme) => (theme.breakpoints.up("sm") ? undefined : "none"),
      }}
    >
      <CardContent sx={{ p: { md: 6 } }}>
        {!isRegistrationEnabled ? (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            <AlertTitle>Registration unavailable</AlertTitle>
            Currently registration is unavailable. Check back soon.
          </Alert>
        ) : null}
        <Box
          sx={{
            mb: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            Get started absolutely free
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Create an account to continue with {appName}
          </Typography>
        </Box>
        <RegisterForm />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          By registering, I agree to &nbsp;
          <Link
            href={APP_PATH.termsAndConditions}
            underline="always"
            color="text.primary"
            target="_blank"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={APP_PATH.privacyPolicy}
            underline="always"
            color="text.primary"
            target="_blank"
          >
            Privacy Policy
          </Link>
          .
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Already have an account?{" "}
          <Link
            variant="subtitle2"
            href={USER_PATH.login}
            component={NextLink}
          >
            Login
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MainRegistration;
