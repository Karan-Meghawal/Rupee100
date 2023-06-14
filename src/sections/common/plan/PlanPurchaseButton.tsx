import NeonButton from "@/components/NeonButton";
import { useUserAuth } from "@/redux/slices/userAuth";
import { getRandomFromArray } from "@/utils/fns";
import { Button, type ButtonProps } from "@mui/material";
import { useMemo, useState } from "react";
import InvestmentDialog from "./InvestmentDialog";
import { type PlanCardType } from "./PlanCard";

type Props = {
  index: number;
  plan: PlanCardType;
};

type BtnColor = Exclude<ButtonProps["color"], "inherit" | undefined>;
const btnColors: BtnColor[] = [
  "error",
  "info",
  "primary",
  "secondary",
  "success",
  "warning",
];
const PlanPurchaseButton = ({ plan, index }: Props) => {
  const { user } = useUserAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const activePlanId = user?.planId;

  const btnColor: BtnColor = useMemo(
    () => btnColors[getRandomFromArray(index % btnColors.length)] ?? "primary",
    [index],
  );
  return (
    <>
      {open && (
        <InvestmentDialog
          plan={plan}
          open={open}
          onClose={handleClose}
        />
      )}
      {activePlanId === plan.id ? (
        <Button
          size="large"
          variant="contained"
          fullWidth
          disabled
          sx={{
            borderRadius: 999,
          }}
        >
          Invested
        </Button>
      ) : (
        <NeonButton
          size="large"
          onClick={handleOpen}
          fullWidth
          color={btnColor}
          variant="contained"
        >
          Invest Now
        </NeonButton>
      )}
    </>
  );
};

export default PlanPurchaseButton;
