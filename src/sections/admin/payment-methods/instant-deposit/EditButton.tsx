import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { type InstantDepositMethodsType } from "@/server/api/instant-deposits";
import { adminApi } from "@/utils/api";
import { IconButton } from "@mui/material";
import { useState } from "react";
import CreateFormDialog from "./CreateFormDialog";

type Props = {
  uniqueId: string;
};

const EditButton = ({ uniqueId }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [createData, setCreateData] =
    useState<InstantDepositMethodsType | null>(null);

  const { data } =
    adminApi.paymentMethod.instantDeposit.getCreateRecords.useQuery();

  const handleOnClick = () => {
    const methodData = data?.find((method) => method.uniqueId === uniqueId);
    if (methodData) {
      setOpen(true);
      setCreateData(methodData);
    }
  };

  return (
    <>
      {open && createData && (
        <CreateFormDialog
          isEdit
          uniqueId={createData.uniqueId}
          open
          onClose={onClose}
          method={createData}
        />
      )}

      <IconButton onClick={handleOnClick}>
        <Iconify icon={IconifyIcons.pencil} />
      </IconButton>
    </>
  );
};

export default EditButton;
