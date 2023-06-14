import Iconify from "@/components/Iconify";
import { RHFTextField, RHFUploadSingleFile } from "@/components/hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { type Path, type FieldValues, type UseFormSetValue } from "react-hook-form";

type Props<T extends FieldValues> = {
  type: string;
  onRemoveField: (index: number) => void;
  index: number;
  setValue: UseFormSetValue<T>;
};

const ManualDepositDetailInput = <T extends FieldValues>({
  type,
  onRemoveField,
  index,
  setValue,
}: Props<T>) => (
  <>
    {type === "input" ? (
      <Card>
        <CardHeader
          title="Details"
          action={
            <IconButton onClick={() => onRemoveField(index)}>
              <Iconify icon={"carbon:delete"} />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <RHFTextField
              name={`details.${index}.label`}
              label="Label"
            />
            <RHFTextField
              name={`details.${index}.value`}
              label="Value"
            />
          </Stack>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardHeader
          title="Details"
          action={
            <IconButton onClick={() => onRemoveField(index)}>
              <Iconify icon={"carbon:delete"} />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <RHFTextField
              name={`details.${index}.label`}
              label="Label"
            />
            <RHFUploadSingleFile
              name={`details.${index}.value` as Path<T>}
              setValue={setValue}
            />
          </Stack>
        </CardContent>
      </Card>
    )}
  </>
);

export default ManualDepositDetailInput;
