import { RESPONSIVE_GAP } from "@/config";
import { Stack } from "@mui/material";
import ChangePassword from "./ChangePassword";
import TwoFA from "./TwoFA";

const SecurityTab = () => (
  <Stack spacing={RESPONSIVE_GAP}>
    <ChangePassword />
    <TwoFA />
  </Stack>
);

export default SecurityTab;
