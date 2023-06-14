import CurrencyTextField from "@/components/CurrencyTextField";
import FormLabel from "@/components/FormLabel";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { UploadSingleFile } from "@/components/upload";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import withdrawSchema from "@/server/user/withdraw/schema";
import {
  useUserUtils,
  userApi,
  type UserApiInputs,
  type UserApiOutputs,
} from "@/utils/api";
import { fCurrency } from "@/utils/formatNumber";
import { fDatePicker } from "@/utils/formatTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValues = UserApiInputs["withdraw"]["payment"];
type InputValue = UserApiOutputs["withdraw"]["getDataForPayment"]["data"];

const Input = ({
  userData,
  label,
  inputType,
  name,
}: InputValue["method"]["details"][number] & {
  userData: InputValue["details"];
}) => {
  if (typeof userData !== "object" || userData === null) return null;
  const user = userData;
  let value = user?.[name] as string;
  if (inputType === "date" && !!value) value = fDatePicker(value);

  switch (inputType) {
    case "input":
    case "date":
      return (
        <TextField
          disabled
          value={value}
          label={label}
        />
      );
    case "dropdown":
      return (
        <TextField
          disabled
          value={value}
          label={label}
        />
      );
    case "textarea":
      return (
        <TextField
          disabled
          multiline
          minRows={4}
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

const WithdrawPayment: NextPageWithLayout = () => {
  const utils = useUserUtils();
  const router = useRouter();
  const { query } = router;
  const id = query.id as string;
  const { data, isLoading } = userApi.withdraw.getDataForPayment.useQuery(id, {
    enabled: router.isReady,
  });

  const [values, setValues] = useState({
    charge: 0,
    finalAmount: 0,
  });

  const {
    wallet,
    isUpdated,
    data: {
      method: {
        name: methodName,
        minWithdraw,
        maxWithdraw,
        charge,
        chargeType,
        details = [],
      },
      details: userData,
    },
  } = data! ?? {
    data: {
      method: {},
    },
  };

  const defaultValues: FormValues = {
    id,
    amount: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(
      withdrawSchema.payment.merge(
        z.object({
          amount: z.coerce
            .number()
            .min(minWithdraw, `Min Withdraw is ${fCurrency(minWithdraw)}`)
            .max(maxWithdraw, `Max. Withdraw is ${fCurrency(maxWithdraw)}`),
        }),
      ),
    ),
  });
  const { handleSubmit, setValue, watch } = methods;
  const amount = watch("amount");

  const calculateCharge = useCallback(() => {
    if (chargeType === "fixed") return charge;
    return amount === 0 ? 0 : (Number(amount) * charge) / 100;
  }, [amount, charge, chargeType]);

  const calculateFinalAmount = useCallback(() => {
    const charge = calculateCharge();
    return Number(amount) - Number(charge);
  }, [amount, calculateCharge]);

  useEffect(() => {
    const charge = calculateCharge();
    const finalAmount = calculateFinalAmount();
    setValues((values) => ({
      ...values,
      charge,
      finalAmount,
    }));
  }, [amount, calculateCharge, calculateFinalAmount]);

  useEffect(() => {
    if (!minWithdraw) return;
    setValue("amount", minWithdraw);
  }, [setValue, minWithdraw]);

  const { mutate, isLoading: isMutating } =
    userApi.withdraw.payment.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (formData) =>
    mutate(formData, {
      onSuccess() {
        void utils.withdraw.getRecords.invalidate();
        void router.push(USER_PATH.withdraw.history);
      },
    });

  // redirect to update the data if data is not updated
  useEffect(() => {
    if (isUpdated === false)
      void router.replace(USER_PATH.withdraw.addMethod(id));
  }, [id, isUpdated, router]);

  if (typeof id !== "string") return null;
  return (
    <Page title="Withdraw Payment">
      <HeaderBreadcrumbs
        heading="Withdraw Payment"
        links={[
          { name: "Withdraw", href: USER_PATH.withdraw.withdraw },
          { name: "Withdraw Payment" },
        ]}
      />

      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          spacing={RESPONSIVE_GAP}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack spacing={RESPONSIVE_GAP}>
              <Card>
                <CardHeader title={`Your ${methodName} details`} />
                <Divider />
                <CardContent>
                  <Stack spacing={3}>
                    {details.map((detail) => (
                      <Input
                        userData={userData}
                        key={detail.name}
                        {...detail}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
              <Alert
                sx={{ mt: 1 }}
                severity="error"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold" }}
                >
                  Withdraw Limit : {fCurrency(minWithdraw)}
                  <Box
                    sx={{ mx: 0.5 }}
                    component={"span"}
                  >
                    -
                  </Box>
                  {fCurrency(maxWithdraw)}
                </Typography>
              </Alert>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Card>
              <CardHeader title="Withdraw Details" />
              <Divider />
              <CardContent>
                <RHFProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack spacing={3}>
                    <CurrencyTextField
                      disabled
                      name="wallet"
                      label={"Available Balance"}
                      value={wallet}
                    />
                    <RHFTextField
                      maskCurrency
                      name="amount"
                      label={"Amount"}
                    />
                    <CurrencyTextField
                      disabled
                      name="charge"
                      label={`Withdraw Charge ${
                        chargeType === "percent" ? `(${charge}%)` : ""
                      } `}
                      value={values.charge}
                    />
                    <CurrencyTextField
                      disabled
                      name="finalAmount"
                      label={"Final Amount"}
                      value={values.finalAmount}
                    />
                    <Box sx={{ textAlign: "right" }}>
                      <LoadingButton
                        type="submit"
                        size="large"
                        variant="contained"
                        loading={isMutating}
                      >
                        Withdraw
                      </LoadingButton>
                    </Box>
                  </Stack>
                </RHFProvider>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Page>
  );
};

WithdrawPayment.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default WithdrawPayment;
