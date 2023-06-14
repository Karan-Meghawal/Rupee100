import Iconify from "@/components/Iconify";
import {
  RHFOtpInput,
  RHFPasswordInput,
  RHFProvider,
  RHFTextField,
} from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import {
  resetForgotPasswordPage,
  setForgotPasswordPage,
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

type FormValues = UserApiInputs["auth"]["resetPassword"];

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { forgotPasswordPage } = useUserAuth();
  const userId = forgotPasswordPage.userId!;

  const defaultValues: FormValues = {
    confirmPassword: "",
    otp: "",
    password: "",
    userId,
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(authSchema.resetPassword),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const { mutate: resendOtp, isLoading: isSending } =
    userApi.auth.forgotPassword.useMutation();
  const handleResendOtp = () => resendOtp({ userId: String(userId) });

  const { mutate, isLoading } = userApi.auth.resetPassword.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        dispatch(resetForgotPasswordPage());
        void router.push(USER_PATH.login)
      },
    });

  const onGoBack = () => {
    dispatch(
      setForgotPasswordPage({
        ...forgotPasswordPage,
        step: 1,
      }),
    );
  };

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <RHFTextField
          disabled
          name="userId"
          label="User Id"
        />
        <RHFOtpInput name="otp" />
        <RHFPasswordInput
          name="password"
          label="New Password"
        />
        <RHFPasswordInput
          name="confirmPassword"
          label="Confirm New Password"
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Reset Password
        </LoadingButton>
        <Typography variant="body2">
          Don't have a code?{" "}
          {isSending ? (
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "primary.main",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              Sending Code...
            </Typography>
          ) : (
            <Link
              sx={{ cursor: "pointer" }}
              onClick={handleResendOtp}
            >
              Resend Code
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
    </RHFProvider>
  );
};

export default ResetPasswordForm;
