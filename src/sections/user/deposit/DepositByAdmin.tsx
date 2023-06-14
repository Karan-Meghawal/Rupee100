import CurrencyTextField from "@/components/CurrencyTextField";
import { RESPONSIVE_GAP } from "@/config";
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
  Stack,
} from "@mui/material";
import { type Deposit } from "@prisma/client";

type Props = {
  data: Deposit;
};

const DepositByAdmin = ({
  data: { updatedAt, amount, charge, chargeType, netAmount, message },
}: Props) => (
  <>
    <Alert>
      <AlertTitle>Deposit By Admin</AlertTitle>
      {fCurrency(netAmount)} has been deposit on {fDateTime(updatedAt)}
    </Alert>
    {!!message && (
      <Alert
        sx={{ mt: RESPONSIVE_GAP }}
        severity="info"
      >
        {message}
      </Alert>
    )}
    <Grid
      container
      mt={RESPONSIVE_GAP}
    >
      <Grid
        sx={{ marginInline: "auto" }}
        item
        xs={12}
        md={6}
      >
        <Card>
          <CardHeader title="Deposit Details" />
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
                label={`Charge ${
                  chargeType === "percent" ? `${charge}%` : ""
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
  </>
);

export default DepositByAdmin;
