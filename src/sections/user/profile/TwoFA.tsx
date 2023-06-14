import { useUserAuth } from "@/redux/slices/userAuth";
import { userApi } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TwoFAVerify from "./TwoFAVerify";

const TwoFA = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { user } = useUserAuth();
  const { twoFA } = user!;
  const { mutate, isLoading } = userApi.profile.twoFA.useMutation();

  const setTwoFa = () =>
    mutate(
      { step: 1, status: twoFA },
      {
        onSuccess() {
          setOpen(true);
        },
      },
    );

  return (
    <Card>
      <TwoFAVerify
        open={open}
        onClose={handleClose}
        onSuccess={handleClose}
      />
      <CardHeader
        sx={{ bgcolor: "background.neutral" }}
        title="Two Factor Authentication"
      />
      <CardContent>
        <Stack spacing={3}>
          <Typography>Secure Your Account</Typography>
          <Typography>
            Two-factor authentication adds an extra layer of security to your
            account. To log in, in addition you'll need to provide a 6 digit
            code
          </Typography>
          <Box>
            <LoadingButton
              loading={isLoading}
              color="error"
              variant="contained"
              onClick={setTwoFa}
            >
              {twoFA
                ? "Disable Two Factor Authentication"
                : "Enable Two Factor Authentication"}
            </LoadingButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TwoFA;
