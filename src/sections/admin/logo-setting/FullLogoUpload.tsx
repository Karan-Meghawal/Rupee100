import { RHFProvider, RHFUploadSingleFile } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { updateFullLogo, useConfiguration } from "@/redux/slices/configuration";
import settingSchema from "@/server/admin/setting/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearProgress } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["setting"]["fullLogo"];

const FullLogoUpload = () => {
  const dispatch = useAppDispatch();
  const { fullLogo } = useConfiguration();
  const { mutate, isLoading: isMutating } =
    adminApi.setting.fullLogo.useMutation();

  console.log(fullLogo);

  const defaultValues: FormValues = {
    fullLogo,
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(settingSchema.fullLogo),
  });
  const { setValue } = methods;

  const onSuccess = (file: string) =>
    mutate(
      {
        fullLogo: file,
      },
      {
        onSuccess({ fullLogo }) {
          dispatch(updateFullLogo(fullLogo));
        },
      },
    );

  return (
    <RHFProvider
      methods={methods}
      onSubmit={() => {}}
    >
      {isMutating && <LinearProgress />}
      <RHFUploadSingleFile
        onSuccess={onSuccess}
        name="fullLogo"
        setValue={setValue}
      />
    </RHFProvider>
  );
};

export default FullLogoUpload;
