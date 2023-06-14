import IconifyIcons from "@/IconifyIcons";
import FormLabel from "@/components/FormLabel";
import Iconify from "@/components/Iconify";
import {
  RHFHiddenInput,
  RHFProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import aboutUsSchema from "@/server/admin/pages/aboutUs/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
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
import AboutUsFeatures from "./AboutUsFeatures";

type FormValues = AdminApiInputs["pages"]["aboutUs"]["updateHero"];

const AboutUsHero = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();

  const defaultValues: FormValues = {
    title: "",
    subtitle: "",
    description: "",
    image: "",
    features: [{ feature: "" }, { feature: "" }],
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(aboutUsSchema.updateHero),
  });
  const { reset, setValue, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.pages.aboutUs.updateHero.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.pages.aboutUs.getRecord.setData(undefined, (record) =>
          !record ? undefined : { ...record, hero: data },
        );
        stopEditing();
      },
    });

  const { data, isLoading } = adminApi.pages.aboutUs.getRecord.useQuery();

  useEffect(() => {
    if (data?.hero) reset(data.hero);
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        sx={{ bgcolor: "background.neutral" }}
        title="Hero Section"
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
              disabled={!isEditing}
              name="title"
              label="Title"
            />
            <RHFTextField
              disabled={!isEditing}
              name="subtitle"
              label="Subtitle"
            />
            <RHFTextField
              multiline
              minRows={4}
              disabled={!isEditing}
              name="description"
              label="Description"
            />
            <Box>
              <FormLabel label={"Image"} />
              <RHFUploadSingleFile
                disabled={!isEditing}
                setValue={setValue}
                name={"image"}
              />
            </Box>
            <AboutUsFeatures disabled={!isEditing} />
            <RHFHiddenInput name="features" />

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

export default AboutUsHero;
