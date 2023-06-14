import {
  RHFProvider,
  RHFTextField,
  RHFUploadMultiFile,
} from "@/components/hook-form";
import { SUPPORT_MAXIMUM_FILES } from "@/config";
import { ADMIN_PATH } from "@/route";
import supportSchema from "@/server/admin/support/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type Props = {
  id: string;
};

type FormValues = AdminApiInputs["support"]["addReply"];
const SupportTicketForm = ({ id }: Props) => {
  const utils = useAdminUtils();
  const router = useRouter();

  const defaultValues: FormValues = {
    id,
    message: "",
    files: [],
  };
  const methods = useForm({
    resolver: zodResolver(supportSchema.addReply),
    defaultValues,
  });
  const { mutate, isLoading: isSubmitting } =
    adminApi.support.addReply.useMutation();

  const { getValues, setValue, handleSubmit } = methods;
  const onSubmit = (data: FormValues) =>
    mutate(data, {
      onSuccess() {
        void utils.support.getRecords.invalidate();
        if (id) void utils.support.getTicket.invalidate(id);
        void router.push(ADMIN_PATH.support.root);
      },
    });

  const isReply = !!id;

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        justifyContent="flex-end"
        spacing={3}
      >
        {!isReply && (
          <RHFTextField
            name="subject"
            type="text"
            label="Subject"
          />
        )}
        <RHFTextField
          multiline
          minRows={4}
          name="message"
          type="text"
          label="Message "
        />
        <Box>
          <Typography
            component="div"
            variant="body2"
            sx={{ mb: 2 }}
          >
            Add Files
            <Typography
              component={"span"}
              color="text.secondary"
              variant="body2"
            >
              (Maximum 5 Files)
            </Typography>
          </Typography>
          <RHFUploadMultiFile
            setValue={setValue}
            getValues={getValues}
            maxFiles={SUPPORT_MAXIMUM_FILES}
            name="files"
            accept="any"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Box>
      </Stack>
    </RHFProvider>
  );
};

export default SupportTicketForm;
