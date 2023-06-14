import { AnimatedButton } from "@/components/animate";
import { useAdminUtils } from "@/utils/api";
import { useState } from "react";
import CreateHowItWorkDialog from "./CreateHowItWorkDialog";

const AddHowItWorkButton = () => {
  const utils = useAdminUtils();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSuccess = () => utils.pages.home.getRecord.invalidate();

  return (
    <>
      {open && (
        <CreateHowItWorkDialog
          open={open}
          onClose={handleClose}
          onSuccess={onSuccess}
        />
      )}
      <AnimatedButton onClick={handleOpen}>Create New</AnimatedButton>
    </>
  );
};
export default AddHowItWorkButton;
