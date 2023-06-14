import Iconify from "@/components/Iconify";
import { RHFProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["emailSetting"];
const EmailSettingCard = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: FormValues = {
    encryption: "" as FormValues["encryption"],
    host: "",
    port: "",
    userName: "",
    password: "",
  };
  const methods = useForm<FormValues>({
    resolver: zodResolver(settingSchema.emailSetting),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const { mutate, isLoading: isSubmitting } =
    adminApi.setting.emailSetting.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.setting.getSetting.setData(
          undefined,
          (val) => val && { ...val, mail: data },
        );
        stopEditing();
      },
    });

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const { data, isLoading } = adminApi.setting.getSetting.useQuery();
  useEffect(() => {
    if (data && data.mail) reset(data.mail);
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Email Setting"
        action={
          !isEditing ? (
            <IconButton onClick={startEditing}>
              <Iconify icon={"mdi:lead-pencil"} />
            </IconButton>
          ) : undefined
        }
      />
      <Divider />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <RHFSelect
              disabled={!isEditing}
              name="encryption"
              type="text"
              label="Encryption"
            >
              <MenuItem value="ssl">SSL</MenuItem>
              <MenuItem value="tls">TLS</MenuItem>
            </RHFSelect>
            <RHFTextField
              disabled={!isEditing}
              name="host"
              type="text"
              label="Host"
            />
            <RHFTextField
              disabled={!isEditing}
              name="port"
              type="text"
              label="Port"
            />
            <RHFTextField
              disabled={!isEditing}
              name="userName"
              type="text"
              label="Username"
            />
            <RHFTextField
              disabled={!isEditing}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle Password"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Iconify icon={"eva:eye-off-fill"} />
                      ) : (
                        <Iconify icon={"eva:eye-fill"} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isEditing && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  color="error"
                  onClick={stopEditing}
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

export default EmailSettingCard;
