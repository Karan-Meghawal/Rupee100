import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFHiddenInput } from "@/components/hook-form";
import { type WithdrawSchema } from "@/server/admin/payment-methods/withdraw/schema";
import { type AdminApiInputs } from "@/utils/api";
import { capitalCase } from "@/utils/case";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from "react-hook-form";
import CreateRecordDialog, { type FormValues } from "./CreateRecordDialog";

const CreateTable = <T extends FieldValues>({
  details,
  setValue,
  name,
}: {
  name: Path<T>;
  details: AdminApiInputs["paymentMethod"]["withdraw"]["create"]["details"];
  setValue: UseFormSetValue<T>;
}) => {
  const [edit, setEdit] = useState<FormValues | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFieldRemove = (index: number) => {
    const fields = details.filter((e, i) => i !== index);
    setValue(name, fields as PathValue<T, Path<T>>);
  };

  const handleFieldUpdate = (index: number) => {
    const data = details.find((e, i) => i === index);
    if (data) {
      setEditId(index);
      setEdit(data);
      setOpen(true);
    }
  };

  const handleOnSuccess = (
    formData: WithdrawSchema["createDetail"],
    id: number | null,
  ) => {
    if (typeof id === "number") {
      const data = [...details];
      data[id] = formData;
      setValue(name, data as PathValue<T, Path<T>>);
    } else {
      setValue(name, [...details, formData] as PathValue<T, Path<T>>);
    }
  };

  return (
    <Card>
      {open && (
        <CreateRecordDialog
          editId={editId}
          edit={edit}
          onSuccess={handleOnSuccess}
          open={open}
          onClose={handleClose}
        />
      )}
      <CardHeader
        title="Payment Requirements"
        action={
          <Button
            onClick={handleOpen}
            startIcon={<Iconify icon="material-symbols:add" />}
          >
            Add New
          </Button>
        }
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ boxShadow: "none !important" }}>Label</TableCell>
              <TableCell>Required</TableCell>
              <TableCell>Type</TableCell>
              <TableCell sx={{ boxShadow: "none !important" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map(({ label, required, inputType }, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                >
                  {label}
                </TableCell>
                <TableCell>{capitalCase(required ? "yes" : "no")}</TableCell>
                <TableCell>{capitalCase(inputType)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleFieldRemove(index)}
                    color="error"
                  >
                    <Iconify icon={IconifyIcons.delete} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleFieldUpdate(index)}
                    color="success"
                  >
                    <Iconify icon={IconifyIcons.pencil} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CardContent>
        <RHFHiddenInput name="details" />
      </CardContent>
    </Card>
  );
};

export default CreateTable;
