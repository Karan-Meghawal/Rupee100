import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { type AdminApiOutputs } from "@/utils/api";
import CreateRecordDialog from "./CreateRecordDialog";

export type KycRecord = AdminApiOutputs["setting"]["kyc"]["records"][number];

type Props = {
  row: KycRecord;
  id: string;
};

const EditButton = ({ row, id }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {open && (
        <CreateRecordDialog
          edit={row}
          open={open}
          onClose={handleClose}
        />
      )}
      <IconButton onClick={handleOpen}>
        <Iconify icon={IconifyIcons.pencil} />
      </IconButton>
    </>
  );
};

export default EditButton;
