import FormLabel from "@/components/FormLabel";
import {
  RHFProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from "@/components/hook-form";
import homeSchema from "@/server/admin/pages/home/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { type Page_Home_HowItWork } from "@prisma/client";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  editData?: Page_Home_HowItWork;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
};

type FormValues = AdminApiInputs["pages"]["home"]["updateHowItWorks"];

const CreateHowItWorkDialog = ({
  editData,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const isEdit = !!editData;

  const defaultValues: FormValues = editData ?? {
    description: "",
    heading: "",
    image: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(homeSchema.updateHowItWorks),
  });
  const { handleSubmit, setValue } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.pages.home.updateHowItWorks.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess({ data }) {
        void onSuccess();
        onClose();
        // utils.pages.home.getServices.setData(undefined, () => data);
      },
    });

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{isEdit ? "Update" : "Create New"} How It Work</DialogTitle>
      <DialogContent dividers>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Box>
              <FormLabel label="Image" />
              <RHFUploadSingleFile
                setValue={setValue}
                name="image"
              />
            </Box>

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

export default CreateHowItWorkDialog;
