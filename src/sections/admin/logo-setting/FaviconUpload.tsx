import { RHFProvider, RHFUploadAvatar } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { updateFavicon, useConfiguration } from "@/redux/slices/configuration";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["favicon"];

const FaviconUpload = () => {
  const { favicon } = useConfiguration();
  const dispatch = useAppDispatch();
  const { mutate, isLoading: isMutating } =
    adminApi.setting.favicon.useMutation();

  const defaultValues: FormValues = {
    favicon: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(settingSchema.favicon),
  });
  const { setValue } = methods;

  useEffect(() => {
    setValue("favicon", favicon);
  }, [favicon, setValue]);

  const onSuccess = (file: string) =>
    mutate(
      {
        favicon: file,
      },
      {
        onSuccess({ favicon }) {
          dispatch(updateFavicon(favicon));
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
        name="favicon"
        setValue={setValue}
      />
    </RHFProvider>
  );
};

export default FaviconUpload;
