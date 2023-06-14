import { useConfiguration } from "@/redux/slices/configuration";
import { NoSsr } from "@mui/material";
import {
  MuiTelInput,
  type MuiTelInputCountry,
  type MuiTelInputProps,
} from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

const RHFTelInput = ({
  name,
  ...other
}: { name: string } & MuiTelInputProps) => {
  const { control } = useFormContext();
  const { country = "IN" } = useConfiguration();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <NoSsr>
          <MuiTelInput
            {...field}
            {...other}
            defaultCountry={country as MuiTelInputCountry}
            focusOnSelectCountry
            error={!!error}
            helperText={error?.message}
            fullWidth
            inputMode="tel"
          />
        </NoSsr>
      )}
    />
  );
};

export default RHFTelInput;
