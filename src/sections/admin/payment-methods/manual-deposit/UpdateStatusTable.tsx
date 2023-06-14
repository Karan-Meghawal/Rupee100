import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { type ManualDepositMethod_Status } from "@prisma/client";
import React from "react";

type Props = {
  id: string;
  status: ManualDepositMethod_Status;
};

const UpdateStatusTable = ({ id, status }: Props) => {
  const utils = useAdminUtils();
  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.manualDeposit.updateStatus.useMutation();
  const onClick = () =>
    mutate(
      {
        id,
        status,
      },
      {
        onSuccess({ newStatus }) {
          utils.paymentMethod.manualDeposit.getRecords.setData(undefined, (data) =>
            !data
              ? undefined
              : data.map((record) =>
                  record.id === id ? { ...record, status: newStatus } : record,
                ),
          );
          utils.paymentMethod.manualDeposit.getRecord.setData(id, (data) =>
            !data ? undefined : { ...data, status: newStatus },
          );
        },
      },
    );
  return (
    <LoadingIconButton
      loading={isMutating}
      onClick={onClick}
    >
      <Iconify
        icon={status === "active" ? IconifyIcons.eyeClosed : IconifyIcons.eye}
      />
    </LoadingIconButton>
  );
};

export default UpdateStatusTable;
