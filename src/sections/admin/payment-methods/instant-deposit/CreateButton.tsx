import Iconify from "@/components/Iconify";
import { type InstantDepositMethodsType } from "@/server/api/instant-deposits";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import CreateFormDialog from "./CreateFormDialog";
import CreateListDialog from "./CreateListDialog";

const CreateButton = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const onOpen = useCallback(() => setStep(1), []);
  const onClose = useCallback(() => setStep(0), []);

  const [createData, setCreateData] =
    useState<InstantDepositMethodsType | null>(null);

  const onNext = useCallback((data: InstantDepositMethodsType) => {
    setCreateData(data);
    setStep(2);
  }, []);

  const isListOpen = step === 1;
  const isFormOpen = step === 2;
  const onPrev = () => setStep(1);

  return (
    <>
      {isListOpen && (
        <CreateListDialog
          open
          onClose={onClose}
          onNext={onNext}
        />
      )}
      {isFormOpen && createData && (
        <CreateFormDialog
          onPrev={onPrev}
          uniqueId={createData.uniqueId}
          open
          onClose={onClose}
          method={createData}
        />
      )}
      <Button
        variant="contained"
        onClick={onOpen}
        startIcon={<Iconify icon="carbon:add" />}
      >
        Create A New
      </Button>
    </>
  );
};

export default CreateButton;
