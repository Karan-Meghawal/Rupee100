import FormLabel from "@/components/FormLabel";
import { UploadSingleFile } from "@/components/upload";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { type ManualDepositMethod_Detail } from "@prisma/client";

type Props = {
  details: ManualDepositMethod_Detail[];
};

const ManualDepositDialogPayeeDetails = ({ details }: Props) => (
  <Card>
    <CardHeader title="Payee Details" />
    <Divider />
    <CardContent>
      <Stack spacing={3}>
        {details.map(({ label, type, value }, index) =>
          type === "input" ? (
            <TextField
              key={index}
              label={label}
              disabled
              value={value}
            />
          ) : (
            <Box key={index}>
              <FormLabel label={label} />
              <UploadSingleFile
                disabled
                file={value}
              />
            </Box>
          ),
        )}
      </Stack>
    </CardContent>
  </Card>
);

export default ManualDepositDialogPayeeDetails;
