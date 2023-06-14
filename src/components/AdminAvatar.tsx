import { useAdminAuth } from "@/redux/slices/adminAuth";
import { userDisplayName } from "@/utils/fns";
import createAvatar from "../utils/createAvatar";
import Avatar from "./Avatar";

export default function AdminAvatar({ ...other }: { [x: string]: unknown }) {
  const { user } = useAdminAuth();
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
