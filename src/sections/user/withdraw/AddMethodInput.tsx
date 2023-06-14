import FormLabel from "@/components/FormLabel";
import {
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from "@/components/hook-form";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import { Box, MenuItem } from "@mui/material";
import { type WithdrawMethod } from "@prisma/client";
import { type Path, type FieldValues, type UseFormSetValue } from "react-hook-form";

type Props<T extends FieldValues> = WithdrawMethod["details"][number] & {
  setValue: UseFormSetValue<T>;
  name: Path<T>;
};

const AddMethodInput = <T extends FieldValues>({
  setValue,
  label,
  inputType,
  fileExtensions,
  dropdownOptions,
  name,
}: Props<T>) => {
  const inputName = name;

  switch (inputType) {
    case "input":
      return (
        <RHFTextField
          name={inputName}
          label={label}
        />
      );
    case "textarea":
      return (
        <RHFTextField
          multiline
          minRows={4}
          name={inputName}
          label={label}
        />
      );
    case "date": {
      return (
        <RHFDatePicker
          name={inputName}
          label={label}
        />
      );
    }
    case "dropdown": {
      return (
        <RHFSelect
          name={inputName}
          label={label}
        >
          {dropdownOptions.map(({ option }) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </RHFSelect>
      );
    }
    case "file": {
      return (
        <Box>
          <FormLabel label={label} />
          <RHFUploadSingleFile
            accept={fileExtensions}
            setValue={setValue}
            name={inputName}
          />
        </Box>
      );
    }
    default:
      return null;
  }
};

export default AddMethodInput;
