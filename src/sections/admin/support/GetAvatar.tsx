import Avatar from "@/components/Avatar";
import createAvatar from "@/utils/createAvatar";

type Props = { avatar: string | null; displayName: string };

const GetAvatar = ({ avatar, displayName }: Props) => (
  <Avatar
    alt={"name"}
    src={avatar}
    color={avatar ? "default" : createAvatar(displayName).color}
    sx={{ borderRadius: 99, width: 48, height: 48 }}
  >
    {createAvatar(displayName).name}
  </Avatar>
);

export default GetAvatar;
