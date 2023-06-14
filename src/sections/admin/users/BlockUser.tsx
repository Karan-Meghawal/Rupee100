import { adminApi, useAdminUtils } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { type User_Status } from "@prisma/client";
import { useConfirm } from "material-ui-confirm";

type Props = {
  userId: number;
  status: User_Status;
};

const BlockUser = ({ status, userId }: Props) => {
  const confirm = useConfirm();
  const utils = useAdminUtils();
  const { mutate, isLoading: isMutating } =
    adminApi.users.updateStatus.useMutation();

  const onClick = async () => {
    try {
      await confirm({
        description: `Are you sure want to ${
          status === "active" ? "Block" : "Unblock"
        } this user?`,
      });
      mutate(
        {
          userId,
          status,
        },
        {
          onSuccess({ newStatus }) {
            void utils.users.getProfile.setData(userId, (data) =>
              !data
                ? undefined
                : {
                    ...data,
                    status: newStatus,
                  },
            );
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingButton
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClick}
      sx={{ flexGrow: 1 }}
      variant="contained"
      color="error"
      size="large"
      loading={isMutating}
    >
      {status === "active" ? "Block User" : "Unblock User"}
    </LoadingButton>
  );
};

export default BlockUser;
