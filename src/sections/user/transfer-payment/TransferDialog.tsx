import IconifyIcons from "@/IconifyIcons";
import CurrencyTextField from "@/components/CurrencyTextField";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import transferPaymentSchema from "@/server/user/transfer-payment/schema";
import { type UserApiInputs, useUserUtils, userApi } from "@/utils/api";
import createAvatar from "@/utils/createAvatar";
import { isDecNum } from "@/utils/fns";
import { fCurrency } from "@/utils/formatNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@/components/Avatar";
import { type TransferUserData } from "./QuickTransfer";

type Props = {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  data: TransferUserData;
};

type FormValues = UserApiInputs["transferPayment"]["transfer"];
const TransferDialog = ({ open, onClose, data, onBack }: Props) => {
  const utils = useUserUtils();
  const [txnCharge, setTxnCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { data: config, isLoading } =
    userApi.transferPayment.getConfig.useQuery();

  const { userName, firstName, lastName, userId, avatar } = data;
  const { charge, type } = config! ?? {};

  const defaultValues: FormValues = {
    amount: "",
    receiverId: userId,
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(transferPaymentSchema.transfer),
  });
  const { handleSubmit, reset, watch } = methods;

  const amount = watch("amount");
  const chargeText = type === "percent" ? `${charge}%` : fCurrency(charge);

  const { mutate, isLoading: isSubmitting } =
    userApi.transferPayment.transfer.useMutation();

  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        void utils.transferPayment.invalidate();
        onClose();
        reset();
      },
    });

  useEffect(() => {
    const numAmount = Number(amount);
    const chargeAmount =
      type === "percent" ? (Number(amount) * charge) / 100 : charge;

    if (isDecNum(numAmount)) {
      setTxnCharge(chargeAmount);
      setTotalAmount(numAmount + chargeAmount);
    }
  }, [amount, charge, type]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      {isLoading && <LinearProgress />}
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>
          <IconButton onClick={onBack}>
            <Iconify icon={IconifyIcons.leftArrow} />
          </IconButton>
          Transfer Payment
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{ py: 3 }}
            spacing={3}
          >
            {!!charge && (
              <Alert severity="warning">
                Transfer Payment charge :- {chargeText}
              </Alert>
            )}
            <Box>
              <Stack
                key={userId}
                direction="row"
                justifyContent="space-between"
              >
                <Stack
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    color={avatar ? "default" : createAvatar(firstName).color}
                    src={avatar}
                  >
                    {createAvatar(firstName).name}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {firstName} {lastName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {userId} - {userName}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
            <RHFTextField
              maskCurrency
              name="amount"
              label="Amount"
            />
            <CurrencyTextField
              disabled
              value={txnCharge}
              label="Charge"
            />
            <Typography>Payable Amount: {fCurrency(totalAmount)}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ textAlign: "right" }}>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </RHFProvider>
    </Dialog>
  );
};

export default TransferDialog;
