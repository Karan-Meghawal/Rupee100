import { useUserAuth } from "@/redux/slices/userAuth";
import { userDisplayName } from "@/utils/fns";
import createAvatar from "../utils/createAvatar";
import Avatar from "./Avatar";

export default function UserAvatar({ ...other }: { [x: string]: unknown }) {
  const { user } = useUserAuth();
  if (!user) return null;
  const displayName = userDisplayName(user.firstName, user.lastName);
  return (
    <Avatar
      src={user.avatar}
      alt={displayName}
      color={user.avatar ? "default" : createAvatar(displayName).color}
      {...other}
    >
      {createAvatar(displayName).name}
    </Avatar>
  );
}
