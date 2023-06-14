import { useAppDispatch } from "@/redux/hook";
import { login } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { adminApi } from "@/utils/api";
import { LoadingButton } from "@mui/lab";

type Props = {
  userId: number;
};

const LoginAsClient = ({ userId }: Props) => {
  const dispatch = useAppDispatch();
  const { mutate, isLoading: isMutating } = adminApi.users.login.useMutation();
  const onClick = () =>
    mutate(userId, {
      onSuccess(data) {
        dispatch(login(data));
        window.open(USER_PATH.dashboard);
      },
    });
  return (
    <LoadingButton
      onClick={onClick}
      sx={{ flexGrow: 1 }}
      variant="contained"
      color="secondary"
      loading={isMutating}
      size="large"
    >
      Login As Client
    </LoadingButton>
  );
};

export default LoginAsClient;
