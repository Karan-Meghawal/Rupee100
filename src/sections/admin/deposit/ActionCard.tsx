import React from "react";
import { Stack } from "@mui/material";
import { RESPONSIVE_GAP } from "@/config";
import RejectDeposit from "./RejectDeposit";
import ApproveDeposit from "./ApproveDeposit";

type Props = {
  id: string;
};

const ActionCard = ({ id }: Props) => (
  <Stack
    mb={RESPONSIVE_GAP}
    justifyContent={"flex-end"}
    direction="row"
    spacing={RESPONSIVE_GAP}
  >
    <RejectDeposit id={id} />
    <ApproveDeposit id={id} />
  </Stack>
);

export default ActionCard;
