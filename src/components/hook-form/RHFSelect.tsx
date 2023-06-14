import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  children,
  ...other
}: {
  name: string;
  children: React.ReactNode;
} & TextFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <TextField
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          select
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
