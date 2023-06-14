import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  type FormControlLabelProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export function RHFCheckbox({
  name,
  ...other
}: { name: string } & Omit<FormControlLabelProps, "control">) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
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

// ----------------------------------------------------------------------

export function RHFMultiCheckbox({
  name,
  options,
  ...other
}: Omit<FormControlLabelProps, "control" | "label"> & {
  name: string;
  options: string[];
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const val = field.value as string[];
        const onSelected = (option: string) =>
          val.includes(option)
            ? val.filter((value: string) => value !== option)
            : [...val, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={val.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
