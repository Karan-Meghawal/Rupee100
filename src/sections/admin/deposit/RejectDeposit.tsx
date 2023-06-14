import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { ADMIN_PATH } from "@/route";
import depositSchema from "@/server/admin/deposit/schema";
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

type FormValues = AdminApiInputs["deposit"]["reject"];
const RejectDeposit = ({ id }: Props) => {
  const utils = useAdminUtils();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultValues: FormValues = {
    id,
    message: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(depositSchema.reject),
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.deposit.reject.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        handleClose();
        void utils.deposit.getRecords.invalidate();
        void utils.deposit.getRecord.invalidate(id);
        void router.push(ADMIN_PATH.deposit.pending);
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
        onClick={handleOpen}
      >
        Reject
      </LoadingButton>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>Reject Deposit</DialogTitle>
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
            <Button
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
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

export default RejectDeposit;
