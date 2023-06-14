import FormLabel from "@/components/FormLabel";
import {
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from "@/components/hook-form";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import { Box, MenuItem } from "@mui/material";
import { type KycForm } from "@prisma/client";
import {
  type FieldValues,
  type Path,
  type UseFormSetValue,
} from "react-hook-form";

type Props<T extends FieldValues> = KycForm & {
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  disabled: boolean;
};

const UserProfileKycInput = <T extends FieldValues>({
  setValue,
  label,
  inputType,
  fileExtensions,
  dropdownOptions,
  name,
  disabled,
}: Props<T>) => {
  switch (inputType) {
    case "input":
      return (
        <RHFTextField
          disabled={disabled}
          name={name}
          label={label}
        />
      );
    case "textarea":
      return (
        <RHFTextField
          disabled={disabled}
          multiline
          minRows={4}
          name={name}
          label={label}
        />
      );
    case "date": {
      return (
        <RHFDatePicker
          disabled={disabled}
          name={name}
          label={label}
        />
      );
    }
    case "dropdown": {
      return (
        <RHFSelect
          disabled={disabled}
          name={name}
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
            disabled={disabled}
            setValue={setValue}
            name={name}
          />
        </Box>
      );
    }
    default:
      return null;
  }
};

export default UserProfileKycInput;
