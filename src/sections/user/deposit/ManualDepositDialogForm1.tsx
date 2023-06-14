import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { type ManualDepositMethod } from "@prisma/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { number, object, type output, string, type input } from "zod";

type Props = {
  txnAmount: number;
  method: ManualDepositMethod;
  onNext: (amount: number) => void;
};

const ManualDepositDialogForm1 = ({ onNext, method, txnAmount }: Props) => {
  const { minDeposit, maxDeposit, name, charge, chargeType } = method;
  const validationSchema = object({
    amount: string()
      .transform(Number)
      .pipe(number().min(minDeposit).max(maxDeposit)),
  });
  type FormValues = input<typeof validationSchema>;
  type OutputFormValues = output<typeof validationSchema>;

  const defaultValues: FormValues = {
    amount: txnAmount === 0 ? "" : String(txnAmount),
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });
  const { handleSubmit, watch } = methods;
  const amount = watch("amount");
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const parsedData = data as unknown as OutputFormValues;
    onNext(parsedData.amount);
  };

  const chargeText =
    chargeType === "fixed" ? charge : (Number(amount) * charge) / 100;
  const payableAmount = Number(amount) + chargeText;

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <RHFTextField
          maskCurrency
          name="amount"
          fullWidth
          label="Amount to Deposit"
        />
        <Grid
          item
          flexGrow={4}
        >
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
                    {fCurrency(Number(amount))}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography color={"text.secondary"}>
                    Charge
                    {chargeType === "percent" && (
                      <Typography
                        sx={{ mx: 1 }}
                        variant="body2"
                        color="text.disabled"
                        component={"span"}
                      >
                        ({fPercent(charge)})
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="subtitle1">
                    {fCurrency(chargeText)}
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
                    {fCurrency(payableAmount)}
                  </Typography>
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Pay Now
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Box sx={{ mt: 4 }}>
            <Stack spacing={3}>
              <Stack
                direction={"row"}
                alignItems="center"
                sx={{ gap: 2 }}
              >
                <Iconify
                  sx={{ fontSize: 32, color: "text.disabled" }}
                  icon="ri:secure-payment-fill"
                />
                <Typography color={"text.disabled"}>
                  Additional Level Of Payment Security.
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems="center"
                sx={{ gap: 2 }}
              >
                <Iconify
                  sx={{ fontSize: 32, color: "text.disabled" }}
                  icon="material-symbols:lock-clock"
                />
                <Typography color={"text.disabled"}>
                  2048-Bit Strong SSL Security.
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems="center"
                sx={{ gap: 2 }}
              >
                <Iconify
                  sx={{ fontSize: 32, color: "text.disabled" }}
                  icon="icon-park-solid:protect"
                />
                <Typography color={"text.disabled"}>
                  Safe and Secure Payments.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </RHFProvider>
  );
};

export default ManualDepositDialogForm1;
