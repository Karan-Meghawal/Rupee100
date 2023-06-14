import { AnimatedButton } from "@/components/animate";
import { useAdminUtils } from "@/utils/api";
import { useState } from "react";
import CreateServiceDialog from "./CreateServiceDialog";

const AddServiceButton = () => {
  const utils = useAdminUtils();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSuccess = () => utils.pages.home.getRecord.invalidate();

  return (
    <>
      {open && (
        <CreateServiceDialog
          open={open}
          onClose={handleClose}
          onSuccess={onSuccess}
        />
      )}
      <AnimatedButton onClick={handleOpen}>Create New</AnimatedButton>
    </>
  );
};
export default AddServiceButton;
