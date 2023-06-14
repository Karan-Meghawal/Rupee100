import Iconify from "@/components/Iconify";
import { ADMIN_PATH } from "@/route";
import { adminApi } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";

type Props = {
  id: string;
};

const DeleteRecord = ({ id }: Props) => {
  const router = useRouter();
  const confirm = useConfirm();
  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.manualDeposit.remove.useMutation();

  const onClick = async () => {
    try {
      await confirm({ description: "Are you sure want to delete?" });
      void router.push(ADMIN_PATH.paymentMethods.manualDeposit.root);
      mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingButton
      loading={isMutating}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClick}
      startIcon={<Iconify icon="mdi:trash" />}
      color="error"
      variant="contained"
    >
      Delete
    </LoadingButton>
  );
};

export default DeleteRecord;
