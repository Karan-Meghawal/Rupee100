import { RHFCheckbox, RHFProvider } from "@/components/hook-form";
import { ADMIN_PATH } from "@/route";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["siteConfiguration"];
const SiteConfiguration = () => {
  const defaultValues: FormValues = {
    registration: false,
    contactDetails: false,
    kycVerification: false,
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(settingSchema.siteConfiguration),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.setting.siteConfiguration.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {},
    });

  const { data, isLoading } = adminApi.setting.getSetting.useQuery();
  useEffect(() => {
    if (data) reset(data.configuration);
  }, [data, reset]);
  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Site Configuration"
        subheader="You can enable and disable the features as per your requirements"
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
            <Stack sx={{ width: 1 }}>
              <CardActionArea>
                <RHFCheckbox
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        User Registration
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        If you uncheck this option, registration will be stopped
                        .
                      </Typography>
                    </Stack>
                  }
                  name="registration"
                  sx={{ m: 0, width: 1, py: 2 }}
                />
              </CardActionArea>
              <Divider />

              <CardActionArea>
                <RHFCheckbox
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        Contact Details
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        If you check this option, users must have to submit
                        their contact details to approve kyc.
                      </Typography>
                    </Stack>
                  }
                  name="contactDetails"
                  sx={{ m: 0, width: 1, py: 2 }}
                />
              </CardActionArea>
              <Divider />

              <CardActionArea>
                <RHFCheckbox
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography variant="overline">
                        Kyc Verification
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        If you check this option Kyc (Know Your Client) , users
                        must have to submit the required information of{" "}
                        <Link
                          component={NextLink}
                          href={ADMIN_PATH.settings.kyc}
                        >
                          kyc setting
                        </Link>{" "}
                        page to withdraw payment.
                      </Typography>
                    </Stack>
                  }
                  name="kycVerification"
                  sx={{ m: 0, width: 1, py: 2 }}
                />
              </CardActionArea>
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
  );
};

export default SiteConfiguration;
