import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

const RHFHiddenInput: React.FC<Props> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <FormHelperText error>{error?.message}</FormHelperText>
      )}
    />
  );
};

export default RHFHiddenInput;
