import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: Omit<TextFieldProps, "onChange"> & {
  value?: string;
  onChange: (text: string) => void;
  debounce?: number;
}) {
  const [value, setValue] = useState<string>(initialValue || "");
  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, value]);

  return (
    <TextField
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
export default DebouncedInput;
