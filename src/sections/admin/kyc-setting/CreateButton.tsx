import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { Button } from "@mui/material";
import { useState } from "react";
import CreateRecordDialog from "./CreateRecordDialog";

const CreateButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {open && (
        <CreateRecordDialog
          open={open}
          onClose={handleClose}
        />
      )}
      <Button
        onClick={handleOpen}
        startIcon={<Iconify icon={IconifyIcons.add} />}
        variant="contained"
      >
        Create a new
      </Button>
    </>
  );
};

export default CreateButton;
