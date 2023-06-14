import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  LinearProgress,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import TimezoneSelect from "./TimezoneSelect";

type FormValues = AdminApiInputs["setting"]["siteSetting"];

const SiteSetting = () => {
  const { isEditing, startEditing, stopEditing } = useFormEdit();

  const defaultValues: FormValues = {
    appName: "",
    currency: "",
    country: "",
    timezone: "",
    currencyPosition: "" as "prefix" | "suffix",
    transferPayment: {
      charge: "",
      type: "" as "fixed" | "percent",
    },
    emailAccountLimit: "",
  };
  const methods = useForm<FormValues>({
    resolver: zodResolver(settingSchema.siteSetting),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, watch } = methods;
  const country = watch("country");

  const { mutate, isLoading: isSubmitting } =
    adminApi.setting.siteSetting.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        stopEditing();
      },
    });

  const { data, isLoading } = adminApi.setting.getSetting.useQuery();
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Site Settings"
        action={
          <>
            {!isEditing && (
              <IconButton onClick={startEditing}>
                <Iconify icon={IconifyIcons.pencil} />
              </IconButton>
            )}
          </>
        }
        sx={{ pb: 2 }}
      />
      <Divider />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <RHFTextField
              disabled={!isEditing}
              name="appName"
              type="text"
              label="App Name"
            />
            <RHFTextField
              disabled={!isEditing}
              name="currency"
              type="text"
              label="Currency"
            />
            <RHFSelect
              disabled={!isEditing}
              name="currencyPosition"
              type="text"
              label="Currency Position"
            >
              <MenuItem value="prefix">Prefix</MenuItem>
              <MenuItem value="suffix">Suffix</MenuItem>
            </RHFSelect>
            <RHFTextField
              select
              disabled={!isEditing}
              name="transferPayment.type"
              type="text"
              label="Balance Transfer Charge Type"
            >
              <MenuItem value="fixed">Fixed</MenuItem>
              <MenuItem value="percent">Percent</MenuItem>
            </RHFTextField>
            <RHFTextField
              disabled={!isEditing}
              name="transferPayment.charge"
              type="text"
              label="Balance Transfer Charge"
              maskNumber
            />
            <RHFTextField
              maskNumber
              disabled={!isEditing}
              name="emailAccountLimit"
              type="text"
              label="Account Limited Per Email"
            />
            <TimezoneSelect
              disabled={!isEditing}
              name="timezone"
              label="Timezone"
            />
            <CountrySelect
              name="country"
              disabled={!isEditing}
              country={country}
              setValue={setValue}
            />

            {isEditing && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  onClick={stopEditing}
                  color="error"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            )}
          </Stack>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};

export default SiteSetting;
