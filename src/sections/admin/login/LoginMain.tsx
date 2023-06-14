import {
  RHFCheckbox,
  RHFPasswordInput,
  RHFProvider,
  RHFTextField,
} from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { login, setLoginPage, useAdminAuth } from "@/redux/slices/adminAuth";
import { useConfiguration } from "@/redux/slices/configuration";
import { ADMIN_PATH } from "@/route";
import { authSchema } from "@/server/user/auth/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = UserApiInputs["auth"]["login"];

const LoginMain = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appName } = useConfiguration();
  const {
    loginPage: { data },
  } = useAdminAuth();

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
          router.push(ADMIN_PATH.dashboard);
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
          <RHFTextField
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
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </RHFProvider>
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
      ></Typography>
    </Box>
  );
};
export default LoginMain;
