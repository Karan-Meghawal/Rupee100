import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { useAdminUtils } from "@/utils/api";
import { IconButton } from "@mui/material";
import { type Page_Home_Service } from "@prisma/client";
import { useState } from "react";
import CreateServiceDialog from "./CreateServiceDialog";

const UpdateServiceButton = ({ editData }: { editData: Page_Home_Service }) => {
  const utils = useAdminUtils();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSuccess = () => utils.pages.home.getRecord.invalidate();

  return (
    <>
      {open && (
        <CreateServiceDialog
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
export default UpdateServiceButton;
