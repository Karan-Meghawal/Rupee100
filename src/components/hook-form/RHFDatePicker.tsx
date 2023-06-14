import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

type Props = DatePickerProps<Date> & {
  name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error?.message,
              helperText: error?.message,
            },
          }}
          format="MM/dd/yyyy"
          {...field}
          {...other}
        />
      )}
    />
  );
}
