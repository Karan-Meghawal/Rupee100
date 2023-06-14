import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import LoadingIconButton from "@/components/LoadingIconButton";
import { adminApi, useAdminUtils } from "@/utils/api";
import { IconButton, Stack } from "@mui/material";
import { type Faq } from "@prisma/client";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import FaqCreateDialog from "./FaqCreateDialog";

const FaqAction = ({ question, answer, id }: Omit<Faq, "createdAt">) => {
  const utils = useAdminUtils();
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const { mutate, isLoading } = adminApi.faq.remove.useMutation();

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Are you sure you want to delete this question?",
      });
      mutate(id, {
        onSuccess() {
          utils.faq.records.setData(undefined, (lists) =>
            lists?.filter((list) => list.id !== id),
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Stack
      direction="row"
      alignItems="center"
    >
      <IconButton onClick={handleOpen}>
        <Iconify icon={IconifyIcons.pencil} />
      </IconButton>
      <LoadingIconButton
        loading={isLoading}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleDelete}
      >
        <Iconify icon={IconifyIcons.delete} />
      </LoadingIconButton>
      {open && (
        <FaqCreateDialog
          question={question}
          answer={answer}
          id={id}
          open={open}
          handleClose={handleClose}
        />
      )}
    </Stack>
  );
};

export default FaqAction;
