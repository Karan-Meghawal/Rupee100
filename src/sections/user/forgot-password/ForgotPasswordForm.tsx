import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { setForgotPasswordPage } from "@/redux/slices/userAuth";
import { authSchema } from "@/server/user/auth/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = UserApiInputs["auth"]["forgotPassword"];

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const defaultValues: FormValues = {
    userId: "",
  };
  const methods = useForm<FormValues>({
    resolver: zodResolver(authSchema.forgotPassword),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = userApi.auth.forgotPassword.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess(data) {
        dispatch(
          setForgotPasswordPage({
            step: 2,
            email: data.email,
            userId: data.userId,
          }),
        );
      },
    });

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <RHFTextField
          name="userId"
          label="User Id / Username"
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
      </Stack>
    </RHFProvider>
  );
};

export default ForgotPasswordForm;
