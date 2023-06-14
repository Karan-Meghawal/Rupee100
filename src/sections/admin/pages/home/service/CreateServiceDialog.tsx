import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import homeSchema from "@/server/admin/pages/home/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
} from "@mui/material";
import { type Page_Home_Service } from "@prisma/client";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  editData?: Page_Home_Service;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
};

type FormValues = AdminApiInputs["pages"]["home"]["updateService"];

const CreateServiceDialog = ({ editData, open, onClose, onSuccess }: Props) => {
  const isEdit = !!editData;

  const defaultValues: FormValues = editData ?? {
    description: "",
    heading: "",
    icon: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(homeSchema.updateService),
  });
  const { handleSubmit, watch } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.pages.home.updateService.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess({ data }) {
        void onSuccess();
        onClose();
        // utils.pages.home.getServices.setData(undefined, () => data);
      },
    });

  const icon = watch("icon");

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{isEdit ? "Update" : "Create New"} Service</DialogTitle>
      <DialogContent dividers>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Alert severity="info">
              You can search icons on{" "}
              <Link
                target="_blank"
                href="https://icon-sets.iconify.design/"
              >
                Iconify
              </Link>{" "}
            </Alert>
            <RHFTextField
              name="icon"
              label="Icon"
              placeholder="ic:baseline-search"
              InputProps={{
                endAdornment: <Iconify icon={icon} />,
              }}
            />
            <RHFTextField
              name="heading"
              label="Heading"
            />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              minRows={4}
            />
            <Stack
              justifyContent="flex-end"
              direction="row"
              spacing={1}
            >
              <Button
                onClick={onClose}
                color="error"
              >
                Cancel
              </Button>
              <LoadingButton
                loading={isMutating}
                type="submit"
              >
                {isEdit ? "Update" : "Submit"}
              </LoadingButton>
            </Stack>
          </Stack>
        </RHFProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceDialog;
