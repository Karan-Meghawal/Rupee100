import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { ADMIN_PATH } from "@/route";
import withdrawSchema from "@/server/admin/withdraw/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  id: string;
};

type FormValues = AdminApiInputs["withdraw"]["reject"];
const RejectButton = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const utils = useAdminUtils();
  const router = useRouter();

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  const defaultValues: FormValues = {
    id,
    message: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(withdrawSchema.reject),
  });

  const { handleSubmit } = methods;
  const { mutate, isLoading: isMutating } =
    adminApi.withdraw.reject.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        void utils.withdraw.getRecords.invalidate();
        void utils.withdraw.getRecord.invalidate(id);
        void router.push(ADMIN_PATH.withdraw.pending);
      },
    });

  return (
    <>
      <LoadingButton
        fullWidth
        variant="contained"
        color="error"
        size="large"
        startIcon={<Iconify icon={IconifyIcons.close} />}
        onClick={onOpen}
      >
        Reject
      </LoadingButton>
      <Dialog
        onClose={onClose}
        open={open}
      >
        <DialogTitle>Reject Withdraw</DialogTitle>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <RHFTextField
              multiline
              minRows={4}
              name="message"
              label="Message"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              type="submit"
              loading={isMutating}
            >
              Reject
            </LoadingButton>
          </DialogActions>
        </RHFProvider>
      </Dialog>
    </>
  );
};

export default RejectButton;
