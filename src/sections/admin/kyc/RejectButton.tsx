import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { ADMIN_PATH } from "@/route";
import kycSchema from "@/server/admin/kyc/schema";
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

type FormValues = AdminApiInputs["kyc"]["reject"];

const RejectButton = ({ id }: Props) => {
  const router = useRouter();
  const utils = useAdminUtils();

  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  const defaultValues: FormValues = {
    id,
    message: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(kycSchema.reject),
  });
  const { handleSubmit } = methods;
  const { mutate, isLoading: isMutating } = adminApi.kyc.reject.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        void utils.kyc.getRecords.invalidate();
        void utils.kyc.getRecord.invalidate(id);
        void router.push(ADMIN_PATH.kyc.pending);
      },
    });

  return (
    <>
      <LoadingButton
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
        <DialogTitle>Reject Kyc Verification</DialogTitle>
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
              onClick={onClose}
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

export default RejectButton;
