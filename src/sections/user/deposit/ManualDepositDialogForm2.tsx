import IconifyIcons from "@/IconifyIcons";
import CurrencyTextField from "@/components/CurrencyTextField";
import FormLabel from "@/components/FormLabel";
import Iconify from "@/components/Iconify";
import {
  RHFProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from "@/components/hook-form";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import { USER_PATH } from "@/route";
import manualDepositSchema from "@/server/user/deposit/manual-deposit/schema";
import { useUserUtils, userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { type ManualDepositMethod } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  txnAmount: number;
  id: string;
  onPrev: () => void;
  method: ManualDepositMethod;
  onClose: () => void;
};

type FormValues = UserApiInputs["deposit"]["manualDeposit"]["createPayment"];

const ManualDepositDialogForm2 = ({
  txnAmount,
  onClose,
  method,
  id,
  onPrev,
}: Props) => {
  const router = useRouter();
  const utils = useUserUtils();
  const defaultValues: FormValues = {
    id,
    amount: txnAmount,
    transactionId: "",
    transactionDate: "",
    paymentImage: "",
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(manualDepositSchema.createPayment),
  });

  const { handleSubmit, setValue, watch } = methods;

  const { mutate, isLoading: isMutating } =
    userApi.deposit.manualDeposit.createPayment.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        void utils.deposit.getRecords.invalidate();
        void utils.dashboard.getSummary.invalidate();
        onClose();
        void router.push(USER_PATH.deposit.history);
      },
    });
  const { charge, chargeType } = method;

  const amount = watch("amount");
  const chargeText = chargeType === "fixed" ? charge : (amount * charge) / 100;
  const payableAmount = amount + chargeText;

  return (
    <Card>
      <CardHeader
        title={
          <>
            <IconButton
              sx={{ mr: 1 }}
              onClick={onPrev}
            >
              <Iconify icon={IconifyIcons.leftArrow} />
            </IconButton>
            Details
          </>
        }
      />
      <Divider />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <RHFTextField
              maskCurrency
              disabled
              name="amount"
              label="Amount"
            />
            <CurrencyTextField
              value={payableAmount}
              disabled
              label="Payable Amount"
            />
            <RHFTextField
              name="transactionId"
              label="Transaction Id"
            />
            <RHFDatePicker
              name="transactionDate"
              label="Transaction Date"
            />
            <Box>
              <FormLabel label="Payment Image" />
              <RHFUploadSingleFile
                setValue={setValue}
                name="paymentImage"
              />
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <LoadingButton
                type="submit"
                loading={isMutating}
              >
                Submit
              </LoadingButton>
            </Box>
          </Stack>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};

export default ManualDepositDialogForm2;
