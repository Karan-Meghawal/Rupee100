import { RHFProvider, RHFTextField } from "@/components/hook-form";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, CardHeader, Divider, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["sendTestEmail"];
const SendTestEmail = () => {
  const defaultValues: FormValues = {
    email: "",
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(settingSchema.sendTestEmail),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.setting.sendTestEmail.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        reset();
      },
    });

  return (
    <Card>
      <CardHeader
        title="Email Setting"
        subheader="You can send a test mail to check if your mail server is working."
        sx={{
          "& .MuiCardHeader-subheader": {
            color: "info.main",
          },
        }}
      />
      <Divider />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <RHFTextField
              name="email"
              type="email"
              label="Email Address"
            />
            <LoadingButton
              sx={{ marginLeft: "auto !important" }}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Send Email
            </LoadingButton>
          </Stack>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};

export default SendTestEmail;
