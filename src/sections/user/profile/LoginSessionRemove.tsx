import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { useUserAuth } from "@/redux/slices/userAuth";
import { useUserUtils, userApi } from "@/utils/api";
import { Box } from "@mui/material";
import { useConfirm } from "material-ui-confirm";

type Props = {
  id: string;
};

const LoginSessionRemove = ({ id }: Props) => {
  const utils = useUserUtils();
  const auth = useUserAuth();
  const confirm = useConfirm();
  const sessionId = auth.sessionId!;

  const { mutate, isLoading } = userApi.profile.expireToken.useMutation({
    onSuccess() {
      void utils.profile.getLoginSessions.invalidate();
    },
  });

  const handleTokeExpire = async () => {
    await confirm({ description: "Are you sure want to log out?" });
    mutate(id);
  };

  return id === sessionId ? (
    <Box>This device</Box>
  ) : (
    <LoadingIconButton
      loading={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleTokeExpire}
    >
      <Iconify icon={IconifyIcons.delete} />
    </LoadingIconButton>
  );
};

export default LoginSessionRemove;
