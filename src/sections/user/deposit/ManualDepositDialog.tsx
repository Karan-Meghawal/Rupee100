import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { fCurrency } from "@/utils/formatNumber";
import {
  Alert,
  Box,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type ManualDepositMethod } from "@prisma/client";
import { forwardRef, useState } from "react";
import ManualDepositDialogForm1 from "./ManualDepositDialogForm1";
import ManualDepositDialogForm2 from "./ManualDepositDialogForm2";
import ManualDepositDialogPayeeDetails from "./ManualDepositDialogPayeeDetails";

type Props = {
  id: string;
  method: ManualDepositMethod;
  open: boolean;
  onClose: () => void;
};

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) => (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  ),
);
Transition.displayName = "Transition";

const ManualDepositDialog = ({ id, method, open, onClose }: Props) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const onPrev = () => setIsConfirm(false);
  const { minDeposit, maxDeposit } = method;
  const [txnAmount, setTxnAmount] = useState(0);

  const onNext = (amount: number) => {
    setIsConfirm(true);
    setTxnAmount(amount);
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-container > .MuiPaper-root": {
          bgcolor: "background.default",
        },
      }}
      maxWidth={"lg"}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <IconButton
          sx={{ position: "absolute", right: 12, top: 6 }}
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <Iconify icon={IconifyIcons.close} />
        </IconButton>
      </DialogTitle>
      <Stack
        sx={{ flexGrow: 1, py: 4 }}
        direction="row"
        justifyContent={"center"}
        alignItems="center"
      >
        <Container>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <Alert
                sx={{ mb: 1 }}
                severity="info"
              >
                Please make the payment to the payee details mentioned below.
              </Alert>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <ManualDepositDialogPayeeDetails details={method.details} />
              <Alert
                sx={{ mt: 1 }}
                severity="error"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold" }}
                >
                  Deposit Limit : {fCurrency(minDeposit)}
                  <Box
                    sx={{ mx: 0.5 }}
                    component={"span"}
                  >
                    -
                  </Box>
                  {fCurrency(maxDeposit)}
                </Typography>
              </Alert>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              {isConfirm ? (
                <ManualDepositDialogForm2
                  txnAmount={txnAmount}
                  onClose={onClose}
                  method={method}
                  onPrev={onPrev}
                  id={id}
                />
              ) : (
                <ManualDepositDialogForm1
                  txnAmount={txnAmount}
                  method={method}
                  onNext={onNext}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Dialog>
  );
};

export default ManualDepositDialog;
