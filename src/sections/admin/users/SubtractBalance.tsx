import { RHFProvider, RHFTextField } from "@/components/hook-form";
import userSchema from "@/server/admin/users/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
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
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  userId: number;
};

type FormValues = AdminApiInputs["users"]["withdraw"];

const SubtractBalance = ({ userId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const defaultValues: FormValues = {
    userId,
    amount: "",
    message: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(userSchema.deposit),
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isLoading: isMutating } = adminApi.users.withdraw.useMutation(
    {
      onSuccess() {
        reset();
        onClose();
      },
    },
  );
  const onSubmit = (formData: FormValues) => mutate(formData);

  return (
    <>
      <LoadingButton
        onClick={onOpen}
        sx={{ flexGrow: 1 }}
        variant="contained"
        color="warning"
        size="large"
      >
        Subtract Balance
      </LoadingButton>
      <Dialog
        open={isOpen}
        onClose={onClose}
      >
        <DialogTitle>Subtract Balance</DialogTitle>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Stack spacing={3}>
              <RHFTextField
                maskCurrency
                name="amount"
                placeholder="Amount"
                label="Amount"
              />
              <RHFTextField
                name="message"
                placeholder="Message"
                multiline
                minRows={4}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              color="primary"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={isMutating}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </RHFProvider>
      </Dialog>
    </>
  );
};

export default SubtractBalance;
