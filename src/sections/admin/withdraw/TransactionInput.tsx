import FormLabel from "@/components/FormLabel";
import { UploadSingleFile } from "@/components/upload";
import { fDateTime } from "@/utils/formatTime";
import { Box, TextField } from "@mui/material";
import { type Withdraw_Details } from "@prisma/client";

type Props = Withdraw_Details;
const TransactionInput = ({ inputType, label, value }: Props) => {
  switch (inputType) {
    case "date":
      return (
        <TextField
          disabled
          value={fDateTime(value)}
          label={label}
        />
      );
    case "input":
    case "textarea":
    case "dropdown":
      return (
        <TextField
          disabled
          value={value}
          label={label}
        />
      );
    case "file": {
      return (
        <Box>
          <FormLabel label={label} />
          <UploadSingleFile
            disabled
            file={value}
          />
        </Box>
      );
    }
    default:
      return null;
  }
};

export default TransactionInput;
