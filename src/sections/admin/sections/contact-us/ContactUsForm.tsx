import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import { sectionSchema } from "@/server/admin/sections/schema";
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
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["section"]["contactUs"];

const ContactUsForm = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const defaultValues: FormValues = {
    title: "",
    subtitle: "",
    whatsapp: "",
    email: "",
    location: "",
  };

  const methods = useForm({
    resolver: zodResolver(sectionSchema.contactUs),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.section.contactUs.useMutation();

  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.section.getSection.setData(undefined, (val) =>
          val ? { ...val, contactUs: data } : val,
        );
        stopEditing();
      },
    });

  const { data, isLoading } = adminApi.section.getSection.useQuery();
  useEffect(() => {
    if (data) reset(data.contactUs);
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Contact Us"
        action={
          !isEditing ? (
            <IconButton onClick={startEditing}>
              <Iconify icon={IconifyIcons.pencil} />
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
            <RHFTextField
              disabled={!isEditing}
              name="title"
              type="text"
              label="Title"
            />
            <RHFTextField
              disabled={!isEditing}
              multiline
              minRows={4}
              name="subtitle"
              type="text"
              label="Subtitle"
            />
            <RHFTextField
              disabled={!isEditing}
              name="whatsapp"
              type="text"
              label="Whatsapp"
            />
            <RHFTextField
              disabled={!isEditing}
              name="email"
              type="text"
              label="Email"
            />
            <RHFTextField
              disabled={!isEditing}
              name="location"
              type="text"
              label="Location"
            />

            {isEditing && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  size="large"
                  onClick={stopEditing}
                >
                  Cancel
                </Button>
                <LoadingButton
                  size="large"
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

export default ContactUsForm;
