import CurrencyTextField from "@/components/CurrencyTextField";
import { RESPONSIVE_GAP } from "@/config";
import { adminApi } from "@/utils/api";
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
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";
import TransactionInput from "./TransactionInput";

type Props = {
  id: string;
};

const Transaction = ({ id }: Props) => {
  const { data, isLoading } = adminApi.withdraw.getRecord.useQuery(id);
  const {
    userId,
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

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      {status === "pending" && (
        <Grid
          item
          xs={12}
        >
          <Stack
            justifyContent={"flex-end"}
            direction="row"
            spacing={3}
          >
            <RejectButton id={id} />
            <ApproveButton id={id} />
          </Stack>
        </Grid>
      )}
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
                {userId} requested to withdraw on {fDateTime(createdAt)}
              </Alert>
            )}
            {status === "rejected" && (
              <Stack spacing={RESPONSIVE_GAP}>
                <Alert severity="error">
                  <AlertTitle>Withdraw Rejected</AlertTitle>
                  You have rejected the withdraw on {fDateTime(updatedAt)}
                </Alert>
                {message && <Alert severity="info">{message}</Alert>}
              </Stack>
            )}
            {status === "success" && (
              <Stack spacing={RESPONSIVE_GAP}>
                <Alert severity="success">
                  <AlertTitle>Withdraw Success</AlertTitle>
                  You have approved the withdraw on {fDateTime(updatedAt)}
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
            <CardHeader title={`User ${method.name} Details`} />
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
                label={`Withdraw Charge ${
                  method.chargeType === "percent" ? `(${method.charge}%)` : ""
                }`}
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
