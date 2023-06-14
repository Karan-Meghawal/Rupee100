import Iconify from "@/components/Iconify";
import { RHFOtpInput, RHFProvider } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import {
  resetRegisterPage,
  setRegisterPage,
  useUserAuth,
} from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { authSchema } from "@/server/user/auth/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Link, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = UserApiInputs["auth"]["register"];

const RegisterVerify = () => {
  const router = useRouter();
  const { registerPage } = useUserAuth();
  const { email } = registerPage;
  const dispatch = useAppDispatch();

  const defaultValues: FormValues = {
    ...registerPage.data!,
    otp: "",
    step: 2,
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(authSchema.register),
  });
  const { handleSubmit } = methods;
  const { mutate, isLoading } = userApi.auth.register.useMutation();
  const { mutate: resendOtp, isLoading: isSending } =
    userApi.auth.register.useMutation();

  const onGoBack = () => {
    dispatch(
      setRegisterPage({
        ...registerPage,
        step: 1,
      }),
    );
  };

  const handleResendOtp = () =>
    !!registerPage.data && resendOtp(registerPage.data);

  const onSubmit = (formData: FormValues) => {
    mutate(formData, {
      onSuccess(data) {
        dispatch(resetRegisterPage());
        if ("userId" in data) {
          router.push(USER_PATH.newRegistration(data.userId));
        } else router.push(USER_PATH.login);
      },
    });
  };

  return (
    <Card sx={{ maxWidth: 600, marginInline: "auto", p: { xs: 2, md: 6 } }}>
      <CardContent
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Image
          src={"/images/smartphone.svg"}
          alt="mobile"
          width={0}
          height={0}
          style={{ width: "auto", height: "auto" }}
        />
        <Typography variant="h4">Otp Verification</Typography>
        <Typography color="text.secondary">
          Enter the verification code sent to{" "}
        </Typography>
        <Typography>{email}</Typography>
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

        <Link
          onClick={onGoBack}
          sx={{
            cursor: "pointer",
            alignItems: "center",
            display: "inline-flex",
          }}
          variant="subtitle2"
        >
          <Iconify
            sx={{ width: 16, height: 16 }}
            icon="eva:arrow-ios-back-fill"
          />
          Go Back
        </Link>
      </CardContent>
    </Card>
  );
};
export default RegisterVerify;
