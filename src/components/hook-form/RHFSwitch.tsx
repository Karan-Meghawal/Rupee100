import {
  FormControlLabel,
  Switch,
  type FormControlLabelProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFSwitch({
  name,
  label,
  control: labelControl,
  ...other
}: {
  name: string;
} & FormControlLabelProps) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      label=""
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value as boolean}
            />
          )}
        />
      }
      {...other}
    />
  );
}
