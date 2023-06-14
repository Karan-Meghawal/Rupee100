import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

export default function RHFPasswordInput({
  name,
  ...other
}: { name: string } & TextFieldProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle Password"
                  onClick={handleTogglePassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Iconify icon={"eva:eye-off-fill"} />
                  ) : (
                    <Iconify icon={"eva:eye-fill"} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? "text" : "password"}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
