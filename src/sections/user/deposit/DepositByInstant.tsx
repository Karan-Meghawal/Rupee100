import { RESPONSIVE_GAP } from "@/config";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { type Deposit } from "@prisma/client";

type Props = {
  data: Deposit;
  isAdmin?: boolean;
};

const DepositByInstant = ({
  data: {
    status,
    netAmount,
    createdAt,
    updatedAt,
    userId,
    charge,
    amount,
    method,
  },
  isAdmin = false,
}: Props) => (
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
          {status === "pending" && (
            <Alert severity="warning">
              <AlertTitle>Deposit Pending</AlertTitle>
              {userId} has requested to deposit {fCurrency(netAmount)} on{" "}
              {fDateTime(createdAt)}
            </Alert>
          )}

          {status === "credit" && (
            <Alert severity="success">
              <AlertTitle>Deposit Credit</AlertTitle>
              {userId} - deposit of {fCurrency(netAmount)} has been successful
              at {fDateTime(updatedAt)}
            </Alert>
          )}

          {status === "cancelled" && (
            <Alert severity="info">
              <AlertTitle>Deposit Cancelled</AlertTitle>
              {userId} has requested to deposit {fCurrency(netAmount)} on{" "}
              {fDateTime(createdAt)}
            </Alert>
          )}

          {status === "failed" && (
            <Alert severity="error">
              <AlertTitle>Deposit Failed</AlertTitle>
              {userId} - deposit of {fCurrency(netAmount)} has been failed at{" "}
              {fDateTime(updatedAt)}
            </Alert>
          )}
        </>
      ) : (
        <>
          {status === "pending" && (
            <Alert severity="warning">
              <AlertTitle>Deposit Pending</AlertTitle>
              Your deposit of {fCurrency(netAmount)} is in pending since{" "}
              {fDateTime(createdAt)}
            </Alert>
          )}

          {status === "credit" && (
            <Alert severity="success">
              <AlertTitle>Deposit Credit</AlertTitle>
              Your deposit of {fCurrency(netAmount)} has been successful at{" "}
              {fDateTime(updatedAt)}
            </Alert>
          )}

          {status === "rejected" && (
            <Alert severity="error">
              <AlertTitle>Deposit Rejected</AlertTitle>
              Your deposit of {fCurrency(netAmount)} has been rejected at{" "}
              {fDateTime(updatedAt)}
            </Alert>
          )}

          {status === "cancelled" && (
            <Alert severity="info">
              <AlertTitle>Deposit Cancelled</AlertTitle>
              You requested to deposit {fCurrency(netAmount)} at{" "}
              {fDateTime(createdAt)}
            </Alert>
          )}

          {status === "failed" && (
            <Alert severity="error">
              <AlertTitle>Deposit Failed</AlertTitle>
              Your deposit of {fCurrency(netAmount)} has been failed at{" "}
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
      marginX={"auto"}
    >
      <Card>
        <CardHeader title="Summary" />
        <CardContent sx={{ pt: 0 }}>
          <Stack spacing={3}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography color={"text.secondary"}>Payment Method</Typography>
              <Typography variant="subtitle1">{method.name}</Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography color={"text.secondary"}>Amount</Typography>
              <Typography variant="subtitle1">
                {fCurrency(netAmount)}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography color={"text.secondary"}>Charge</Typography>
              <Typography variant="subtitle1">{fCurrency(charge)}</Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography color={"text.secondary"}>Payable Amount</Typography>
              <Typography variant="subtitle1">{fCurrency(amount)}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default DepositByInstant;
