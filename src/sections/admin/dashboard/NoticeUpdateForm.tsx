import IconifyIcons from "@/IconifyIcons";
import Editor from "@/components/Editor";
import FormLabel from "@/components/FormLabel";
import Iconify from "@/components/Iconify";
import { RHFHiddenInput, RHFProvider } from "@/components/hook-form";
import dashboardSchema from "@/server/admin/dashboard/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = AdminApiInputs["dashboard"]["updateNotice"];

type Props = {
  data: string;
};

const NoticeUpdateForm = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const utils = useAdminUtils();
  const { mutate, isLoading: isMutating } =
    adminApi.dashboard.updateNotice.useMutation();

  const defaultValues: FormValues = {
    notice: data,
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(dashboardSchema.updateNotice),
  });

  const { setValue, handleSubmit } = methods;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onChangeValue = (value: string) => setValue("notice", value);

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess({ notice }) {
        utils.dashboard.getNotice.setData(undefined, notice);
        handleClose();
      },
    });

  return (
    <>
      <Dialog
        open={open}
        maxWidth={"xl"}
        onClose={handleClose}
      >
        <DialogTitle>Update Notice</DialogTitle>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Box>
              <FormLabel label="Description" />
              <Editor
                onChangeValue={onChangeValue}
                initialValue={data}
              />
              <RHFHiddenInput name="notice" />
            </Box>
            <Stack
              pt={2}
              spacing={1}
              direction="row"
              justifyContent="end"
            >
              <Button
                onClick={handleClose}
                color="error"
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={isMutating}
              >
                Update
              </LoadingButton>
            </Stack>
          </DialogContent>
        </RHFProvider>
      </Dialog>
      <IconButton onClick={handleOpen}>
        <Iconify
          icon={IconifyIcons.pencil}
          color="#fff"
        />
      </IconButton>
    </>
  );
};

export default NoticeUpdateForm;
