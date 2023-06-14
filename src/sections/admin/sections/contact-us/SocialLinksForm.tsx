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

const fields = [
  { name: "youtube", label: "Youtube" },
  { name: "facebook", label: "Facebook" },
  { name: "instagram", label: "Instagram" },
  { name: "twitter", label: "Twitter" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "telegram", label: "Telegram" },
  { name: "discord", label: "Discord" },
];

type FormValues = AdminApiInputs["section"]["socialLinks"];
const SocialLinksForm = () => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const defaultValues: FormValues = {
    youtube: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    telegram: "",
    discord: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(sectionSchema.socialLinks),
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.section.socialLinks.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.section.getSection.setData(undefined, (val) =>
          val
            ? {
                ...val,
                socialLinks: {
                  ...val.socialLinks,
                  ...data,
                },
              }
            : val,
        );
        stopEditing();
      },
    });

  const { data, isLoading } = adminApi.section.getSection.useQuery();
  useEffect(() => {
    // todo
    // @ts-ignore
    if (data) reset(data.socialLinks);
  }, [data, reset]);

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        title="Social Links"
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
            {fields.map(({ name, label }, index) => (
              <RHFTextField
                InputProps={{
                  startAdornment: (
                    <Iconify
                      sx={{ mr: 1, fontSize: 24 }}
                      icon={
                        IconifyIcons.social[
                          name as keyof typeof IconifyIcons.social
                        ]
                      }
                    />
                  ),
                }}
                key={index}
                disabled={!isEditing}
                name={name}
                type="text"
                label={label}
              />
            ))}

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

export default SocialLinksForm;
