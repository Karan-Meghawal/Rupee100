import { useConfiguration } from "@/redux/slices/configuration";
import { Box, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

const CurrencyTextField = (props: { [x: string]: unknown }) => {
  const { currency, currencyPosition } = useConfiguration();
  return (
    <NumericFormat
      allowNegative={false}
      decimalScale={2}
      customInput={TextField}
      InputProps={{
        ...(currencyPosition === "prefix"
          ? { startAdornment: <Box sx={{ mr: 1 }}>{currency}</Box> }
          : { endAdornment: <Box sx={{ ml: 1 }}>{currency}</Box> }),
      }}
      fullWidth
      {...props}
    />
  );
};

export default CurrencyTextField;
