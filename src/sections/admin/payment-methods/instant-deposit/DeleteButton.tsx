import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { useConfirm } from "material-ui-confirm";

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const utils = useAdminUtils();
  const confirm = useConfirm();

  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.instantDeposit.remove.useMutation();

  const handleClick = async () => {
    try {
      await confirm({
        description: "Are you sure want to delete this?",
      });
      mutate(id, {
        onSuccess() {
          utils.paymentMethod.instantDeposit.getRecords.setData(
            undefined,
            (data) =>
              !data ? undefined : data.filter((method) => method.id !== id),
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadingIconButton
      loading={isMutating}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleClick}
    >
      <Iconify icon={IconifyIcons.delete} />
    </LoadingIconButton>
  );
};

export default DeleteButton;
