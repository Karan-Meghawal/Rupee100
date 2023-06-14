import { AnimatedLoadingButton } from "@/components/animate";
import {
  RHFCheckbox,
  RHFPasswordInput,
  RHFProvider,
  RHFTextField,
} from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { useConfiguration } from "@/redux/slices/configuration";
import { login, setLoginPage, useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { authSchema } from "@/server/user/auth/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = UserApiInputs["auth"]["login"];

const LoginMain = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    loginPage: { data },
  } = useUserAuth();
  const { appName } = useConfiguration();

  const defaultValues: FormValues = data ?? {
    userId: "admin",
    password: "admin790",
    remember: true,
    step: 1,
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(authSchema.login),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading } = userApi.auth.login.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess(res) {
        if ("email" in res) {
          dispatch(
            setLoginPage({
              step: 2,
              email: res.email,
              data: formData,
            }),
          );
        } else {
          dispatch(login(res));
          router.push(USER_PATH.dashboard);
        }
      },
    });

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
          >
            Sign in to {appName}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Enter your details below.
          </Typography>
        </Box>
      </Stack>
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <RHFTextField<FormValues>
            name="userId"
            label="User Id / Username"
          />
          <RHFPasswordInput
            name="password"
            label="Password"
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <RHFCheckbox
            name="remember"
            label="Remember me"
          />
          <Link
            component={NextLink}
            variant="subtitle2"
            href={USER_PATH.forgotPassword}
          >
            Forgot password?
          </Link>
        </Stack>

        <AnimatedLoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Login
        </AnimatedLoadingButton>
      </RHFProvider>
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
      >
        Don’t have an account?{"  "}
        <Link
          variant="subtitle2"
          component={NextLink}
          href={USER_PATH.register}
        >
          Get started
        </Link>
      </Typography>
    </Box>
  );
};
export default LoginMain;
