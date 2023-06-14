import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
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

type FormValues = AdminApiInputs["section"]["faq"];
const Faq: NextPageWithLayout = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const defaultValues: FormValues = {
    title: "",
    subtitle: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(sectionSchema.faq),
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.section.faq.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.section.getSection.setData(undefined, (val) =>
          val ? { ...val, faq: data } : val,
        );
        stopEditing();
      },
    });

  const { data, isLoading } = adminApi.section.getSection.useQuery();
  useEffect(() => {
    if (data) reset(data.faq);
  }, [data, reset]);

  return (
    <Page title="Faq">
      <HeaderBreadcrumbs
        heading="Faq Section"
        links={[{ name: "Manage Section" }, { name: "Faq Section" }]}
      />
      <Card>
        {isLoading && <LinearProgress />}
        <CardHeader
          title="Faq Section"
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
    </Page>
  );
};

Faq.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Faq;
