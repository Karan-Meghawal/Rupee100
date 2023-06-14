import { RHFCheckbox, RHFProvider, RHFTextField } from "@/components/hook-form";
import withdrawSchema, {
  type WithdrawSchema,
} from "@/server/admin/payment-methods/withdraw/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from "@mui/material";
import { type KycForm_FileExtensions } from "@prisma/client";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import DropDownOptionFields from "./DropDownOptionFields";
import FileExtensionsInput from "./FileExtensionsInput";

export type FormValues = WithdrawSchema["createDetail"];

type Props = {
  editId: number | null;
  edit: FormValues | null;
  open: boolean;
  onClose: () => void;
  onSuccess: (data: FormValues, id: number | null) => void;
};

const CreateRecordDialog = ({
  editId,
  edit,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const defaultValues: FormValues = {
    label: "",
    required: true,
    inputType: "input",
  };
  const isEdit = !!editId;

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(withdrawSchema.createDetail),
  });
  const { handleSubmit, reset, watch, setValue } = methods;

  const inputType = watch("inputType");
  const fileExtensions = watch("fileExtensions") ?? [];
  const setFileExtensions = (value: KycForm_FileExtensions[]) =>
    setValue("fileExtensions", value);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSuccess(data, editId);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    void handleSubmit(onSubmit)(e);
  };

  useEffect(() => {
    if (edit) reset(edit);
  }, [edit, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <RHFProvider
        methods={methods}
        onSubmit={handleFormSubmit}
      >
        <DialogTitle gutterBottom>
          {isEdit ? "Update Detail" : "Create Detail"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField
              name="label"
              label="Label"
              variant="standard"
            />
            <RHFTextField
              select
              name="inputType"
              label="Input Type"
              variant="standard"
            >
              <MenuItem value="input">Input</MenuItem>
              <MenuItem value="textarea">TextArea</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
              <MenuItem value="file">File</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </RHFTextField>

            {inputType === "file" && (
              <FileExtensionsInput
                fileExtensions={fileExtensions}
                setFileExtensions={setFileExtensions}
                name="fileExtensions"
              />
            )}

            {inputType === "dropdown" && <DropDownOptionFields />}

            <RHFCheckbox
              name="required"
              label="Required"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={onClose}
          >
            Cancel
          </Button>
          <LoadingButton type="submit">
            {isEdit ? "Update" : "Create"}
          </LoadingButton>
        </DialogActions>
      </RHFProvider>
    </Dialog>
  );
};

export default CreateRecordDialog;
