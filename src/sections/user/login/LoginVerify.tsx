import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import { RHFOtpInput, RHFProvider } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import {
  login,
  resetLoginPage,
  setLoginPage,
  useUserAuth,
} from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { authSchema } from "@/server/user/auth/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormValues = UserApiInputs["auth"]["login"];

const LoginVerify = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loginPage } = useUserAuth();
  const { email, data } = loginPage;

  const defaultValues: FormValues = {
    ...data!,
    otp: "",
    step: 2,
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(authSchema.login),
  });
  const { handleSubmit } = methods;

  const { mutate: resendOtp, isLoading: isSending } =
    userApi.auth.login.useMutation();
  const handleResendOtp = () => !!data && resendOtp(data);

  const { mutate, isLoading } = userApi.auth.login.useMutation();
  const onSubmit = (formData: FormValues) => {
    mutate(formData, {
      onSuccess(res) {
        dispatch(resetLoginPage());
        if ("email" in res) {
          /* empty */
        } else {
          dispatch(login(res));
        }
        void router.push(USER_PATH.dashboard);
      },
    });
  };

  const onGoBack = () => {
    dispatch(
      setLoginPage({
        ...loginPage,
        step: 1,
      }),
    );
  };

  return (
    <Stack
      alignItems="center"
      spacing={1}
      px={{
        xs: 1,
      }}
    >
      <Image
        src={"/images/smartphone.svg"}
        alt="mobile"
        width={150}
      />
      <Typography variant="h4">Otp Verification</Typography>
      <Typography color="text.secondary">
        Enter the verification code sent to{" "}
      </Typography>
      <Typography>{email}</Typography>

      <Box>
        <Box sx={{ marginY: 1 }}>
          <RHFProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <RHFOtpInput
              name="otp"
              label="Otp"
            />
            <LoadingButton
              type="submit"
              sx={{ mt: 2 }}
              loading={isLoading}
              variant="contained"
              size="large"
              fullWidth
            >
              Verify
            </LoadingButton>
          </RHFProvider>
        </Box>
      </Box>

      <Typography
        sx={{ color: "text.secondary" }}
        variant="body2"
      >
        Didn't get the code?{" "}
        {isSending ? (
          <Link sx={{ cursor: "pointer", opacity: 0.7 }}>Sending...</Link>
        ) : (
          <Link
            onClick={handleResendOtp}
            sx={{ cursor: "pointer" }}
          >
            Resend
          </Link>
        )}
      </Typography>

      <Box>
        <Link
          onClick={onGoBack}
          sx={{
            cursor: "pointer",
            alignItems: "center",
            display: "inline-flex",
            marginTop: 1,
          }}
          variant="subtitle2"
        >
          <Iconify
            sx={{ width: 16, height: 16 }}
            icon="eva:arrow-ios-back-fill"
          />
          Go Back
        </Link>
      </Box>
    </Stack>
  );
};
export default LoginVerify;
