import ApiError from "@/components/ApiError";
import CurrencyTextField from "@/components/CurrencyTextField";
import { RESPONSIVE_GAP } from "@/config";
import { userApi } from "@/utils/api";
import { fCurrency } from "@/utils/formatNumber";
import { fDateTime } from "@/utils/formatTime";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Stack,
} from "@mui/material";
import TransactionInput from "./TransactionInput";

type Props = {
  id: string;
};

const Transaction = ({ id }: Props) => {
  const { data, isLoading, error } = userApi.withdraw.getRecord.useQuery(id);
  const {
    actionBy,
    amount,
    charge,
    details,
    message,
    netAmount,
    status,
    createdAt,
    updatedAt,
    method,
  } = data! ?? {
    method: {},
    details: [],
  };

  const chargeText = method.chargeType === "percent" ? `${method.charge}%` : "";

  if (error) return <ApiError error={error} />;
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        xs={12}
      >
        {actionBy === "admin" ? (
          <Stack spacing={RESPONSIVE_GAP}>
            <Alert severity="success">
              <AlertTitle>Withdraw By Admin</AlertTitle>
              Admin withdrawn {fCurrency(amount)} at {fDateTime(createdAt)}
            </Alert>
            {message && <Alert severity="info">{message}</Alert>}
          </Stack>
        ) : (
          <>
            {status === "pending" && (
              <Alert severity="warning">
                <AlertTitle>Withdraw Pending</AlertTitle>
                You have requested to withdraw {fCurrency(amount)} at{" "}
                {fDateTime(createdAt)}
              </Alert>
            )}
            {status === "rejected" && (
              <Stack spacing={RESPONSIVE_GAP}>
                <Alert severity="error">
                  <AlertTitle>Withdraw Rejected</AlertTitle>
                  Your withdraw has been rejected at {fDateTime(updatedAt)}
                </Alert>
                {message && <Alert severity="info">{message}</Alert>}
              </Stack>
            )}
            {status === "success" && (
              <Stack spacing={RESPONSIVE_GAP}>
                <Alert severity="success">
                  <AlertTitle>Withdraw Success</AlertTitle>
                  Your withdraw has been success at {fDateTime(updatedAt)}
                </Alert>
                {message && <Alert severity="info">{message}</Alert>}
              </Stack>
            )}
          </>
        )}
      </Grid>

      {actionBy !== "admin" && (
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <CardHeader title={`Your ${method.name} Details`} />
            <Divider />
            <CardContent>
              <Stack spacing={3}>
                {details.map((detail) => (
                  <TransactionInput
                    key={detail.name}
                    {...detail}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Grid
        sx={{ marginInline: "auto" }}
        item
        xs={12}
        md={6}
      >
        <Card>
          <CardHeader title="Withdraw Details" />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              <CurrencyTextField
                disabled
                value={amount}
                label={"Amount"}
              />
              <CurrencyTextField
                value={charge}
                disabled
                label={`Withdraw Charge ${chargeText ? `(${chargeText})` : ""}`}
              />
              <CurrencyTextField
                value={netAmount}
                disabled
                label={"Final Amount"}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Transaction;
