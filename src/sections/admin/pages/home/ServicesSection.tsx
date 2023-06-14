import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import homeSchema from "@/server/admin/pages/home/schema";
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
  LinearProgress,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = AdminApiInputs["pages"]["home"]["updateServicesSection"];

const ServicesSection = () => {
  const utils = useAdminUtils();
  const { data, isLoading } = adminApi.pages.home.getRecord.useQuery();
  const { isEditing, startEditing, stopEditing } = useFormEdit();

  const defaultValues: FormValues = {
    heading: "",
    subheading: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(homeSchema.updateServicesSection),
  });
  const { handleSubmit, reset } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.pages.home.updateServicesSection.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess({ data }) {
        stopEditing();
        utils.pages.home.getRecord.setData(undefined, (record) =>
          !record ? undefined : { ...record, servicesSection: data },
        );
      },
    });

  useEffect(() => {
    if (data?.servicesSection) reset(data.servicesSection);
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Services Section"
        sx={{ bgcolor: "background.neutral" }}
        action={
          <>
            {!isEditing && (
              <IconButton
                size="small"
                onClick={startEditing}
              >
                <Iconify icon={IconifyIcons.pencil} />
              </IconButton>
            )}
          </>
        }
      />
      <Divider />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <RHFTextField
              name="heading"
              label="Heading"
              disabled={!isEditing}
            />
            <RHFTextField
              name="subheading"
              label="Sub Heading"
              disabled={!isEditing}
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
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isMutating}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            )}{" "}
          </Stack>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};

export default ServicesSection;
