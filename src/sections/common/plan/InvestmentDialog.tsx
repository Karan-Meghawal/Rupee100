import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { updatePlan } from "@/redux/slices/userAuth";
import { userApi, useUserUtils, type UserApiInputs } from "@/utils/api";
import { fCurrency } from "@/utils/formatNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { type PlanCardType } from "./PlanCard";

type Props = {
  plan: PlanCardType;
  open: boolean;
  onClose: () => void;
};

type InputValues = UserApiInputs["plan"]["purchase"];

const InvestmentDialog = ({ open, onClose, plan }: Props) => {
  const utils = useUserUtils();
  const dispatch = useAppDispatch();
  const { mutate, isLoading: isMutating } = userApi.plan.purchase.useMutation();

  const { name, minInvestment, maxInvestment } = plan;

  const validationSchema = z.object({
    id: z.string().nonempty("Id is required"),
    investment: z
      .string()
      .transform(Number)
      .pipe(
        z
          .number()
          .min(
            minInvestment,
            `Investment must be more than or equal to ${fCurrency(
              minInvestment,
            )}`,
          )
          .max(
            maxInvestment,
            `Investment must be less than or equal to ${fCurrency(
              maxInvestment,
            )}`,
          ),
      ),
  });

  type FormValues = z.input<typeof validationSchema>;
  const defaultValues: FormValues = {
    id: plan.id,
    investment: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data as unknown as InputValues, {
      onSuccess({ planId }) {
        dispatch(updatePlan(planId));
        onClose();
        void utils.incomes.roi.invalidate();
      },
    });

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Invest in {name} plan</DialogTitle>
      <RHFProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent>
          <Stack spacing={3}>
            <Alert severity="info">
              You can choose investment between {fCurrency(minInvestment)} -{" "}
              {fCurrency(maxInvestment)}
            </Alert>
            <RHFTextField
              maskCurrency
              name="investment"
              label="Investment"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <LoadingButton
            size="small"
            type="submit"
            loading={isMutating}
          >
            Invest
          </LoadingButton>
        </DialogActions>
      </RHFProvider>
    </Dialog>
  );
};

export default InvestmentDialog;
