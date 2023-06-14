import { RHFProvider, RHFUploadAvatar } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { updateLogo, useConfiguration } from "@/redux/slices/configuration";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["logo"];

const LogoUpload = () => {
  const dispatch = useAppDispatch();
  const { logo } = useConfiguration();
  const { mutate, isLoading: isMutating } = adminApi.setting.logo.useMutation();

  const defaultValues: FormValues = {
    logo: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(settingSchema.logo),
  });
  const { setValue } = methods;

  useEffect(() => {
    setValue("logo", logo);
  }, [logo, setValue]);

  const onSuccess = (file: string) =>
    mutate(
      {
        logo: file,
      },
      {
        onSuccess({ logo }) {
          dispatch(updateLogo(logo));
        },
      },
    );

  return (
    <RHFProvider
      methods={methods}
      onSubmit={() => {}}
    >
      {isMutating && <LinearProgress />}
      <RHFUploadAvatar
        onSuccess={onSuccess}
        name="logo"
        setValue={setValue}
      />
    </RHFProvider>
  );
};

export default LogoUpload;
