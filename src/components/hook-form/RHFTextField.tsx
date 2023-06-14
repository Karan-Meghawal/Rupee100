import { useConfiguration } from "@/redux/slices/configuration";
import { Box, TextField, type TextFieldProps } from "@mui/material";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";

type Props<T extends FieldValues> = {
  maskNumber?: boolean;
  maskCurrency?: boolean;
  maskPercent?: boolean;
} & UseControllerProps<T> &
  TextFieldProps;

const RHFTextField = <T extends FieldValues>({
  name,
  maskNumber,
  maskCurrency,
  maskPercent,
  ...restProps
}: Props<T>) => {
  const { currency, currencyPosition } = useConfiguration();
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        if (maskCurrency || maskNumber || maskPercent) {
          return (
            // todo
            // @ts-ignore
            <NumericFormat
              {...restProps}
              InputProps={{
                ...(maskCurrency && {
                  inputMode: maskNumber ? "numeric" : "decimal",
                  ...(currencyPosition === "prefix"
                    ? { startAdornment: <Box sx={{ mr: 1 }}>{currency}</Box> }
                    : { endAdornment: <Box sx={{ ml: 1 }}>{currency}</Box> }),
                }),
                ...(maskPercent && { endAdornment: <Box>%</Box> }),
              }}
              allowNegative={false}
              decimalScale={2}
              customInput={TextField}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          );
        }

        return (
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...restProps}
          />
        );
      }}
    />
  );
};

export default RHFTextField;
