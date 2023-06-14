import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RHFCheckbox, RHFProvider } from "@/components/hook-form";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["emailPreferences"];
const EmailPreferences: NextPageWithLayout = () => {
  const utils = useAdminUtils();

  const defaultValues: FormValues = {
    registrationSuccess: false,
    paymentTransfer: false,
    paymentDeposit: false,
    paymentWithdraw: false,
  };
  const methods = useForm<FormValues>({
    resolver: zodResolver(settingSchema.emailPreferences),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.setting.emailPreferences.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.setting.getSetting.setData(
          undefined,
          (val) => val && { ...val, emailPreferences: data },
        );
      },
    });

  const { data, isLoading } = adminApi.setting.getSetting.useQuery();
  useEffect(() => {
    if (data && data.emailPreferences) reset(data.emailPreferences);
  }, [data, reset]);

  return (
    <Page title="EmailPreferences">
      <HeaderBreadcrumbs
        heading="Email Preferences"
        links={[
          { name: "System Configuration" },
          { name: "Email Preferences" },
        ]}
      />

      <Card>
        {isLoading && <LinearProgress />}
        <CardHeader
          title="Email Preferences"
          sx={{ pb: 2 }}
        />
        <Divider />
        <CardContent>
          <RHFProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack
              spacing={3}
              alignItems="flex-end"
            >
              <Stack
                spacing={2}
                sx={{ width: 1 }}
              >
                <RHFCheckbox
                  name="registrationSuccess"
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        Successful Registration
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Receive an email on successful registration.
                      </Typography>
                    </Stack>
                  }
                  sx={{ m: 0 }}
                />
                <Divider />
                <RHFCheckbox
                  name="paymentTransfer"
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        Transfer Payment
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Receive an email on successful transferred and received
                        payment .
                      </Typography>
                    </Stack>
                  }
                  sx={{ m: 0 }}
                />
                <Divider />
                <RHFCheckbox
                  name="paymentDeposit"
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        Payment Deposit
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Receive an email on payment deposit request, reject and
                        success.
                      </Typography>
                    </Stack>
                  }
                  sx={{ m: 0 }}
                />

                <Divider />
                <RHFCheckbox
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        Payment Withdraw
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Receive an email on payment withdraw request, reject and
                        success.
                      </Typography>
                    </Stack>
                  }
                  name="paymentWithdraw"
                  sx={{ m: 0 }}
                />
              </Stack>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </RHFProvider>
        </CardContent>
      </Card>
    </Page>
  );
};
EmailPreferences.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default EmailPreferences;
