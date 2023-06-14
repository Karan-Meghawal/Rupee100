import CurrencyTextField from "@/components/CurrencyTextField";
import FormLabel from "@/components/FormLabel";
import { UploadSingleFile } from "@/components/upload";
import { RESPONSIVE_GAP } from "@/config";
import { fCurrency } from "@/utils/formatNumber";
import { fDate, fDateTime } from "@/utils/formatTime";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { type Deposit } from "@prisma/client";
import ManualDepositDialogPayeeDetails from "./ManualDepositDialogPayeeDetails";

type Props = {
  data: Deposit;
  isAdmin?: boolean;
};

const DepositByManual = ({
  data: {
    userId,
    amount,
    netAmount,
    charge,
    status,
    method: { name },
    details,
    createdAt,
    updatedAt,
  },
  isAdmin = false,
}: Props) => {
  const {
    method,
    user: { paymentImage, transactionDate, transactionId },
  } = details! ?? { method: {}, user: {} };
  return (
    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        xs={12}
      >
        {isAdmin ? (
          <>
            {status === "review" && (
              <Alert severity="warning">
                <AlertTitle>Deposit In Review</AlertTitle>
                {userId} has requested to deposit {fCurrency(amount)} on{" "}
                {fDateTime(createdAt)}
              </Alert>
            )}

            {status === "approved" && (
              <Alert severity="success">
                <AlertTitle>Deposit Approved</AlertTitle>
                {userId} - deposit of {fCurrency(amount)} has been approved
                at {fDateTime(updatedAt)}
              </Alert>
            )}
            {status === "rejected" && (
              <Alert severity="error">
                <AlertTitle>Deposit Rejected</AlertTitle>
                {userId} - deposit of {fCurrency(amount)} has been rejected
                at {fDateTime(updatedAt)}
              </Alert>
            )}
          </>
        ) : (
          <>
            {status === "review" && (
              <Alert severity="warning">
                <AlertTitle>Deposit In Review</AlertTitle>
                You have requested to deposit {fCurrency(amount)} at{" "}
                {fDateTime(createdAt)}
              </Alert>
            )}

            {status === "approved" && (
              <Alert severity="success">
                <AlertTitle>Deposit Approved</AlertTitle>
                Your deposit of {fCurrency(amount)} has been successful at{" "}
                {fDateTime(updatedAt)}
              </Alert>
            )}

            {status === "rejected" && (
              <Alert severity="error">
                <AlertTitle>Deposit Rejected</AlertTitle>
                Your deposit of {fCurrency(amount)} has been rejected at{" "}
                {fDateTime(updatedAt)}
              </Alert>
            )}
          </>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <Stack spacing={RESPONSIVE_GAP}>
          <ManualDepositDialogPayeeDetails details={method} />
          <Card>
            <CardHeader title="Summary" />
            <CardContent sx={{ pt: 0 }}>
              <Stack spacing={3}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography color={"text.secondary"}>
                    Payment Method
                  </Typography>
                  <Typography variant="subtitle1">{name}</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography color={"text.secondary"}>Amount</Typography>
                  <Typography variant="subtitle1">
                    {fCurrency(amount)}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography color={"text.secondary"}>Charge</Typography>
                  <Typography variant="subtitle1">
                  + {fCurrency(charge)}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography color={"text.secondary"}>
                    Payable Amount
                  </Typography>
                  <Typography variant="subtitle1">
                    {fCurrency(netAmount)}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <Card>
          <CardHeader title="Payment Details" />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              <CurrencyTextField
                label={"Amount"}
                disabled
                value={`${Number(netAmount) - Number(charge)}`}
              />
              <CurrencyTextField
                label={"Payable Amount"}
                disabled
                value={netAmount}
              />
              <TextField
                label={"Your Transaction Id"}
                disabled
                value={transactionId}
              />
              <TextField
                label={"Your Transaction Date"}
                disabled
                value={fDate(transactionDate)}
              />
              <Box>
                <FormLabel label={"Payment Image"} />
                <UploadSingleFile
                  disabled
                  file={paymentImage}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DepositByManual;
