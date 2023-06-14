import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { type InstantDepositMethod_Status } from "@prisma/client";

type Props = {
  id: string;
  status: InstantDepositMethod_Status;
};

const UpdateStatusButton = ({ id, status }: Props) => {
  const utils = useAdminUtils();
  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.instantDeposit.updateStatus.useMutation();

  const handleClick = () =>
    mutate(
      { id, status },
      {
        onSuccess({ newStatus }) {
          utils.paymentMethod.instantDeposit.getRecords.setData(
            undefined,
            (lists) =>
              !lists
                ? undefined
                : lists.map((list) =>
                    list.id !== id ? list : { ...list, status: newStatus },
                  ),
          );
        },
      },
    );
  return (
    <LoadingIconButton
      loading={isMutating}
      onClick={handleClick}
    >
      <Iconify
        icon={status === "active" ? IconifyIcons.eyeClosed : IconifyIcons.eye}
      />
    </LoadingIconButton>
  );
};

export default UpdateStatusButton;
