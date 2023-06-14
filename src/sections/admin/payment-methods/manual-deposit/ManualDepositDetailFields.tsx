import Iconify from "@/components/Iconify";
import useFormRepeater from "@/hooks/useFormRepeater";
import { type AdminApiInputs } from "@/utils/api";
import { Button, Stack } from "@mui/material";
import { type FieldValues, type UseFormSetValue } from "react-hook-form";
import ManualDepositDetailInput from "./ManualDepositDetailInput";

type Props<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
};

type FormValues = AdminApiInputs["paymentMethod"]["manualDeposit"]["create"];
const ManualDepositDetailFields = <T extends FieldValues>({
  setValue,
}: Props<T>) => {
  const { fields, onAddField, onRemoveField } = useFormRepeater<FormValues>({
    name: "details",
    append: { label: "", value: "", type: "input" },
  });

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
      >
        <Button
          onClick={() => onAddField({ label: "", value: "", type: "input" })}
        >
          <Iconify icon={"carbon:add"} />
          Add New Label
        </Button>
        <Button
          onClick={() => onAddField({ label: "", value: "", type: "image" })}
        >
          <Iconify icon={"carbon:add"} />
          Add New Image
        </Button>
      </Stack>

      {fields.map(({ type, id }, index) => (
        <ManualDepositDetailInput
          key={id}
          setValue={setValue}
          type={type}
          onRemoveField={onRemoveField}
          index={index}
        />
      ))}
    </>
  );
};

export default ManualDepositDetailFields;
