import Iconify from "@/components/Iconify";
import { useUserUtils, userApi } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useConfirm } from "material-ui-confirm";

const LogoutAll = () => {
  const utils = useUserUtils();
  const confirm = useConfirm();
  const { mutate, isLoading } = userApi.profile.logoutAll.useMutation();

  const handleLogoutAll = async () => {
    await confirm({
      description: "Are you sure you want to log out from all devices?",
    });
    mutate(undefined, {
      onSuccess() {
        void utils.profile.getLoginSessions.invalidate();
      },
    });
  };

  return (
    <LoadingButton
      size="small"
      startIcon={
        <Iconify
          icon="ri:login-circle-line"
          rotate={2}
        />
      }
      color="error"
      variant="contained"
      loading={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleLogoutAll}
      sx={{ ml: 2 }}
    >
      Logout All
    </LoadingButton>
  );
};

export default LogoutAll;
