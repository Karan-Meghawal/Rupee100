import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { useAdminUtils } from "@/utils/api";
import { IconButton } from "@mui/material";
import { type Page_Home_HowItWork } from "@prisma/client";
import { useState } from "react";
import CreateHowItWorkDialog from "./CreateHowItWorkDialog";

const UpdateHowItWorkButton = ({ editData }: { editData: Page_Home_HowItWork }) => {
  const utils = useAdminUtils();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSuccess = () => utils.pages.home.getRecord.invalidate();

  return (
    <>
      {open && (
        <CreateHowItWorkDialog
          editData={editData}
          open={open}
          onClose={handleClose}
          onSuccess={onSuccess}
        />
      )}
      <IconButton
        onClick={handleOpen}
        color="success"
      >
        <Iconify icon={IconifyIcons.pencil} />
      </IconButton>{" "}
    </>
  );
};
export default UpdateHowItWorkButton;
