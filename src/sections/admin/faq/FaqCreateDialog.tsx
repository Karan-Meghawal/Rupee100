import { RHFProvider, RHFTextField } from "@/components/hook-form";
import faqSchema from "@/server/admin/faq/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";

type Props = {
  question?: string;
  answer?: string;
  id?: string;
  open: boolean;
  handleClose: () => void;
};

type FormValues = AdminApiInputs["faq"]["create"];
const FaqCreateDialog = ({
  question = "",
  answer = "",
  id = "",
  open,
  handleClose,
}: Props) => {
  const utils = useAdminUtils();
  const defaultValues: FormValues = {
    id,
    question,
    answer,
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(faqSchema.create),
  });
  const { reset, handleSubmit } = methods;
  const { mutate, isLoading: isSubmitting } = adminApi.faq.create.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        utils.faq.records.setData(undefined, (lists) => {
          if (!lists) return [data];
          const index = lists.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            return lists.map((list) => (list.id === data.id ? data : list));
          }
          return [...lists, data];
        });
        reset();
        handleClose();
      },
    });
  const isEditing = !!id;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>{isEditing ? "Update Faq" : "Create New Faq"}</DialogTitle>
        <DialogContent sx={{ minWidth: { md: 500 } }}>
          <Stack
            spacing={4}
            py={2}
          >
            <RHFTextField
              fullWidth
              name="question"
              label="Question"
            />
            <RHFTextField
              fullWidth
              multiline
              minRows={4}
              name="answer"
              label="Answer"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
          >
            SUBMIT
          </LoadingButton>
        </DialogActions>
      </RHFProvider>
    </Dialog>
  );
};

export default FaqCreateDialog;
