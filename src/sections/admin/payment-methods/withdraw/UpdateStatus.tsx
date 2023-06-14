import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { type WithdrawMethod_Status } from "@prisma/client";
import { type ReactNode } from "react";

type Props = {
  id: string;
  status: WithdrawMethod_Status;
  children: ReactNode;
};

const UpdateStatus = ({ status, id }: Props) => {
  const utils = useAdminUtils();
  const { mutate, isLoading } =
    adminApi.paymentMethod.withdraw.updateStatus.useMutation();

  const handleStatus = () =>
    mutate(
      { id, status },
      {
        onSuccess({ newStatus }) {
          utils.paymentMethod.withdraw.getRecords.setData(undefined, (lists) =>
            lists?.map((list) =>
              list.id === id
                ? {
                    ...list,
                    status: newStatus,
                  }
                : list,
            ),
          );

          utils.paymentMethod.withdraw.getRecord.setData(id, (data) =>
            data ? { ...data, status: newStatus } : undefined,
          );
        },
      },
    );
  return (
    <LoadingIconButton
      loading={isLoading}
      onClick={handleStatus}
    >
      <Iconify
        icon={status === "active" ? IconifyIcons.eyeClosed : IconifyIcons.eye}
      />
    </LoadingIconButton>
  );
};

export default UpdateStatus;
