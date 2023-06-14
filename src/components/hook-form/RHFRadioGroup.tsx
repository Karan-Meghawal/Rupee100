import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  type RadioGroupProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  options,
  getOptionLabel,
  ...other
}: {
  name: string;
  options: string[];
  getOptionLabel: string[];
} & RadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup
            {...field}
            row
            {...other}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText
              error
              sx={{ px: 2 }}
            >
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
