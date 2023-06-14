import Iconify from "@/components/Iconify";
import { USER_PATH } from "@/route";
import { useUserUtils, userApi } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";

type Props = {
  id: string;
};

const CloseTicket = ({ id }: Props) => {
  const utils = useUserUtils();
  const router = useRouter();
  const confirm = useConfirm();

  const { mutate, isLoading: isDeleting } =
    userApi.support.closeTicket.useMutation();
  const closeTicket = async () => {
    try {
      await confirm({ description: "Are you sure want to close this ticket?" });
      mutate(id, {
        onSuccess() {
          void utils.support.getRecords.invalidate();
          void utils.support.getTicket.invalidate(id);
          void router.push(USER_PATH.support.root);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingButton
      color="error"
      variant="contained"
      size="large"
      startIcon={<Iconify icon="jam:close-circle" />}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={closeTicket}
      loading={isDeleting}
      loadingPosition="start"
    >
      {isDeleting ? "Closing Ticket..." : "Close Ticket"}
    </LoadingButton>
  );
};

export default CloseTicket;
