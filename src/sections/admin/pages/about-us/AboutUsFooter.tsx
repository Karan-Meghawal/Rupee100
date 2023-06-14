import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import aboutUsSchema from "@/server/admin/pages/aboutUs/schema";
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

type FormValues = AdminApiInputs["pages"]["aboutUs"]["updateFooterDescription"];

const AboutUsFooter = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const defaultValues: FormValues = {
    footer: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(aboutUsSchema.updateFooterDescription),
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.pages.aboutUs.updateFooterDescription.useMutation({
      onSuccess({ data }) {
        utils.pages.aboutUs.getRecord.setData(undefined, (record) =>
          !record ? undefined : { ...record, ...data },
        );
        stopEditing();
      },
    });
  const onSubmit = (formData: FormValues) => mutate(formData);

  const { data, isLoading } = adminApi.pages.aboutUs.getRecord.useQuery();
  useEffect(() => {
    if (data?.footer) reset({ footer: data.footer });
  }, [data, reset]);
  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        sx={{ bgcolor: "background.neutral" }}
        title="Footer About Us"
        action={
          <>
            {!isEditing && (
              <IconButton onClick={startEditing}>
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
              multiline
              minRows={4}
              disabled={!isEditing}
              name="footer"
              label="Description"
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

export default AboutUsFooter;
