import { RESPONSIVE_GAP } from "@/config";
import { Stack } from "@mui/material";
import { type UserWithoutPassword } from "~/types";
import AddBalance from "./AddBalance";
import BlockUser from "./BlockUser";
import LoginAsClient from "./LoginAsClient";
import SubtractBalance from "./SubtractBalance";

type Props = UserWithoutPassword;

const UserActionButtons = ({ userId, status }: Props) => (
  <Stack
    direction={{ xs: "column", md: "row" }}
    spacing={RESPONSIVE_GAP}
  >
    <AddBalance userId={userId} />
    <SubtractBalance userId={userId} />
    <LoginAsClient userId={userId} />
    <BlockUser
      userId={userId}
      status={status}
    />
  </Stack>
);

export default UserActionButtons;
