import Image from "@/components/Image";
import { RHFOtpInput, RHFProvider } from "@/components/hook-form";
import { useUserAuth } from "@/redux/slices/userAuth";
import { profileSchema } from "@/server/user/profile/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = UserApiInputs["profile"]["changePassword"];
type Props = {
  data: FormValues;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const ChangePasswordVerify = ({ open, onClose, data, onSuccess }: Props) => {
  const auth = useUserAuth();
  const { email } = auth.user!;

  const defaultValues: FormValues = {
    ...data,
    step: 2,
    otp: "",
  };
  const methods = useForm({
    resolver: zodResolver(profileSchema.changePassword),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const { mutate, isLoading } = userApi.profile.changePassword.useMutation();

  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        onSuccess();
      },
    });

  const { mutate: mutateResend, isLoading: isResending } =
    userApi.profile.changePassword.useMutation();
  const handleResendOtp = () => mutateResend(data);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Change password Verification</DialogTitle>
      <DialogContent>
        <CardContent
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 0,
          }}
        >
          <Image
            src={"/images/smartphone.svg"}
            alt="mobile"
            width={150}
          />
          <Typography variant="h4">Email Verification</Typography>
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
            {isResending ? (
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
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordVerify;
