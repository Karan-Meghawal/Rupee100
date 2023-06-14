import Editor from "@/components/Editor";
import FormLabel from "@/components/FormLabel";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { sectionSchema } from "@/server/admin/sections/schema";
import { type AdminApiInputs, adminApi, useAdminUtils } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
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

type FormValues = AdminApiInputs["section"]["refundPolicy"];
const RefundPolicy: NextPageWithLayout = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const defaultValues: FormValues = {
    title: "",
    description: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(sectionSchema.refundPolicy),
  });
  const { getValues, reset, setValue, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.section.refundPolicy.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.section.getSection.setData(undefined, (val) =>
          val ? { ...val, refundPolicy: data } : val,
        );
        stopEditing();
      },
    });

  const onChangeValue = (value: string) => setValue("description", value);

  const { data, isLoading } = adminApi.section.getSection.useQuery();
  useEffect(() => {
    if (data) reset(data.refundPolicy);
  }, [data, reset]);

  return (
    <Page title="Refund Policy">
      <HeaderBreadcrumbs
        heading="Refund Policy"
        links={[{ name: "Manage Section" }, { name: "Refund Policy" }]}
      />

      <Card>
        {isLoading && <LinearProgress />}
        <CardHeader
          sx={{ background: "background.neutral" }}
          title="Refund Policy Page"
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
              <Box>
                <FormLabel label="Description" />
                <Editor
                  disabled={!isEditing}
                  onChangeValue={onChangeValue}
                  initialValue={getValues().description}
                />
                <RHFTextField
                  sx={{ "& fieldset": { display: "none" } }}
                  name="description"
                  type="hidden"
                />
              </Box>
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
                    Update
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
RefundPolicy.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default RefundPolicy;
