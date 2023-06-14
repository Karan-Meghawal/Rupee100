import Iconify from "@/components/Iconify";
import { ADMIN_PATH } from "@/route";
import { adminApi, useAdminUtils } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";

type Props = {
  id: string;
};

const RemoveButton = ({ id }: Props) => {
  const router = useRouter();
  const utils = useAdminUtils();
  const confirm = useConfirm();
  const { isLoading, mutate } =
    adminApi.paymentMethod.withdraw.remove.useMutation();

  const handleRemove = async () => {
    try {
      await confirm({
        description: "Are you sure want to delete this gateway?",
      });
      mutate(id);
      void utils.paymentMethod.withdraw.getRecords.invalidate();
      void utils.paymentMethod.withdraw.getRecord.invalidate(id);
      void router.push(ADMIN_PATH.paymentMethods.withdraw.root);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingButton
      loading={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleRemove}
      startIcon={<Iconify icon="mdi:trash" />}
      color="error"
      variant="contained"
    >
      Delete
    </LoadingButton>
  );
};

export default RemoveButton;
