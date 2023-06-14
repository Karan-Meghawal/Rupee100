import { RHFCheckbox, RHFProvider, RHFTextField } from "@/components/hook-form";
import kycSchema from "@/server/admin/setting/kyc/schema";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
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
import { useForm } from "react-hook-form";
import DropDownOptionFields from "./DropDownOptionFields";
import { type KycRecord } from "./EditButton";
import FileExtensionsInput from "./FileExtensionsInput";

type Props = {
  edit?: KycRecord;
  open: boolean;
  onClose: () => void;
};

type FormValues = AdminApiInputs["setting"]["kyc"]["create"];
const CreateRecordDialog = ({ edit, open, onClose }: Props) => {
  const utils = useAdminUtils();
  const defaultValues: FormValues = {
    id: edit?.id,
    label: "",
    required: true,
    inputType: "input",
  };
  const isEdit = !!edit;

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(kycSchema.create),
  });
  const { handleSubmit, reset, watch, setValue, getValues } = methods;

  const inputType = watch("inputType");
  const fileExtensions = watch("fileExtensions") ?? [];
  const setFileExtensions = (value: KycForm_FileExtensions[]) =>
    setValue("fileExtensions", value);

  const { mutate, isLoading: isMutating } =
    adminApi.setting.kyc.create.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data: res }) {
        utils.setting.kyc.records.setData(undefined, (lists) => {
          if (!lists) return [res];
          const index = lists.findIndex((item) => item.id === res.id);
          if (index !== -1) {
            return lists.map((list) => (list.id === res.id ? res : list));
          }
          return [...lists, res];
        });
        reset();
        onClose();
      },
    });

  useEffect(() => {
    console.log("i changed");
    const values = getValues();
    const { inputType } = values;
    if (inputType === "dropdown") {
      const { dropdownOptions } = values;
      if (!dropdownOptions.length)
        setValue("dropdownOptions", [{ option: "" }]);
    }
  }, [getValues, inputType, setValue]);

  useEffect(() => {
    reset(edit);
  }, [edit, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle gutterBottom>
          {isEdit ? "Update Kyc Form Record" : "Create New Kyc Form Record"}
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
            sx={{ textTransform: "uppercase" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isMutating}
            type="submit"
            sx={{ textTransform: "uppercase" }}
          >
            {isEdit ? "Update" : "Create"}
          </LoadingButton>
        </DialogActions>
      </RHFProvider>
    </Dialog>
  );
};

export default CreateRecordDialog;
