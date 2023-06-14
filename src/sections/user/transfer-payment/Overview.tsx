import { fCurrency, fPercent } from "@/utils/formatNumber";
import {
  Card,
  CardHeader,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

const getPercent = (amount: number, totalAmount: number) =>
  (amount / totalAmount) * 100;

const ProgressItem = ({
  amount,
  label,
  value,
}: {
  amount: number;
  label: string;
  value: number;
}) => (
  <Stack spacing={1}>
    <Stack
      direction="row"
      alignItems="center"
    >
      <Typography
        variant="subtitle2"
        sx={{ flexGrow: 1 }}
      >
        {label}
      </Typography>
      <Typography variant="subtitle2">{fCurrency(amount)}</Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp;({fPercent(value)})
      </Typography>
    </Stack>

    <LinearProgress
      variant="determinate"
      value={value}
      color={label === "Total Received" ? "success" : "error"}
    />
  </Stack>
);

const Overview = ({
  receivedAmount,
  transferredAmount,
}: {
  transferredAmount: number;
  receivedAmount: number;
}) => {
  const totalAmount = receivedAmount + transferredAmount;
  return (
    <Card>
      <CardHeader title="Transfer Payment Overview" />
      <Stack
        spacing={4}
        sx={{ p: 3 }}
      >
        <ProgressItem
          label="Total Received"
          amount={receivedAmount}
          value={getPercent(receivedAmount, totalAmount)}
        />
        <ProgressItem
          label="Total Transferred"
          amount={transferredAmount}
          value={getPercent(transferredAmount, totalAmount)}
        />
      </Stack>
    </Card>
  );
};

export default Overview;
