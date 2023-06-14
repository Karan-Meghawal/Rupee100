import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
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
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["pages"]["home"]["updateHero"];

const Hero: NextPageWithLayout = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const defaultValues: FormValues = {
    title: "",
    description: "",
    video: "",
    button: "",
  };

  const methods = useForm({
    resolver: zodResolver(homeSchema.updateHero),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.pages.home.updateHero.useMutation();

  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        stopEditing();
        utils.pages.home.getRecord.setData(undefined, (record) =>
          !record ? undefined : { ...record, hero: data },
        );
      },
    });

  const { data, isLoading } = adminApi.pages.home.getRecord.useQuery();
  useEffect(() => {
    if (data) reset(data.hero);
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Hero Section"
        sx={{
          bgcolor: "background.neutral",
        }}
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
              placeholder="Helping {millions} to grow better"
            />
            <RHFTextField
              multiline
              minRows={4}
              disabled={!isEditing}
              name="description"
              label="Description"
            />
            <RHFTextField
              disabled={!isEditing}
              name="button"
              label="Button"
            />
            <RHFTextField
              disabled={!isEditing}
              name="video"
              label="Video"
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
            )}
          </Stack>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};
Hero.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Hero;
