import { fCurrency } from "@/utils/formatNumber";
import { Button, Card, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import SearchUserDialog from "./SearchUserDialog";
import TransferDialog from "./TransferDialog";

const RowStyle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export type TransferUserData = {
  userName: string;
  firstName: string;
  lastName: string;
  userId: number;
  avatar: string;
};

const QuickTransfer = ({
  receivedAmount,
  transferredAmount,
  wallet,
}: {
  receivedAmount: number;
  transferredAmount: number;
  wallet: number;
}) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<TransferUserData | null>(null);
  const handleSearchDialogOpen = () => setStep(1);
  const handleSearchDialogClose = () => setStep(0);
  const handleSearchDialogSubmit = (values: TransferUserData) => {
    setStep(2);
    setData(values);
  };
  const handleTransferDialogBack = () => setStep(1);
  const handleTransferDialogSubmit = () => setStep(0);

  return (
    <Card sx={{ p: 3 }}>
      {step === 1 && (
        <SearchUserDialog
          open={step === 1}
          onClose={handleSearchDialogClose}
          onSubmit={handleSearchDialogSubmit}
        />
      )}
      {step === 2 && (
        <TransferDialog
          open={step === 2}
          data={data!}
          onClose={handleTransferDialogSubmit}
          onBack={handleTransferDialogBack}
        />
      )}

      <Typography
        variant="subtitle2"
        gutterBottom
      >
        Quick Transfer
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{fCurrency(wallet)}</Typography>

        <RowStyle>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            Your Current Balance
          </Typography>
          <Typography variant="body2">{fCurrency(wallet)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            Received Amount
          </Typography>
          <Typography variant="body2">{fCurrency(receivedAmount)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            Sent Amount
          </Typography>
          <Typography variant="body2">
            {fCurrency(transferredAmount)}
          </Typography>
        </RowStyle>

        <Button
          onClick={handleSearchDialogOpen}
          size="large"
          fullWidth
          variant="contained"
          color="success"
        >
          Transfer Now
        </Button>
      </Stack>
    </Card>
  );
};

export default QuickTransfer;
