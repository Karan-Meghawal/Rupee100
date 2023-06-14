import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import instantDepositSchema from "@/server/user/deposit/instant-deposit/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { type InstantDepositMethod } from "@prisma/client";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = UserApiInputs["deposit"]["instantDeposit"]["createTxn"];

type Props = {
  id: string;
  method: InstantDepositMethod;
};
const InstantDepositPaySection = ({ id, method }: Props) => {
  const defaultValues: FormValues = {
    amount: "",
    id,
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(instantDepositSchema.createTxn),
  });

  const { watch, handleSubmit, setValue } = methods;
  const amount = watch("amount");
  const { charge, chargeType, name } = method;
  const chargeText =
    chargeType === "fixed" ? charge : (Number(amount) * charge) / 100;
  const payableAmount = Number(amount) + chargeText;

  const { mutate, isLoading: isMutating } =
    userApi.deposit.instantDeposit.createTxn.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess(data) {
        if (typeof data === "object" && "url" in data) {
          window.location.href = data.url;
        } else {
          toast.error("Something went wrong");
        }
      },
    });

  useEffect(() => {
    setValue("id", id);
  }, [setValue, id]);

  return (
    <Grid
      item
      flexGrow={4}
    >
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader title="Amount" />
          <CardContent sx={{ py: 0 }}>
            <RHFTextField
              maskCurrency
              name="amount"
              value={amount}
              fullWidth
              label="Amount to Pay"
            />
          </CardContent>
          <CardHeader title="Summary" />
          <CardContent sx={{ py: 0 }}>
            <Stack spacing={3}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography color={"text.secondary"}>Payment Method</Typography>
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
                  {chargeType !== "fixed" && (
                    <Typography
                      variant="body2"
                      sx={{ ml: 1 }}
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
                <Typography color={"text.secondary"}>Payable Amount</Typography>
                <Typography variant="subtitle1">
                  {fCurrency(payableAmount)}
                </Typography>
              </Stack>
              <LoadingButton
                type="submit"
                loading={isMutating}
                variant="contained"
                size="large"
              >
                Pay Now
              </LoadingButton>
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
      </RHFProvider>
    </Grid>
  );
};

export default InstantDepositPaySection;
