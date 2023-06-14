import { OTP_LENGTH } from "@/server/config";
import { Box, FormHelperText } from "@mui/material";
import {
  MuiOtpInput,
  type MuiOtpInputProps,
} from "mui-one-time-password-input";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFOtpInput({
  name,
  label,
  ...other
}: { name: string; label?: string } & MuiOtpInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box
          sx={{
            maxWidth: { xs: 350, sm: 1 },
            display: "flex",
            width: 1,
            justifyContent: "center",
          }}
        >
          <MuiOtpInput
            {...field}
            {...other}
            length={OTP_LENGTH}
            sx={{ gap: 1 }}
            TextFieldsProps={{
              placeholder: "-",
              error: !!error,
            }}
          />
          {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
}
