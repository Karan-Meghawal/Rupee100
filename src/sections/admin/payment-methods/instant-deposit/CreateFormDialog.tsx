import Iconify from "@/components/Iconify";
import { RHFProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import instantDepositSchema from "@/server/admin/payment-methods/instant-deposit/schema";
import { type InstantDepositMethodsType } from "@/server/api/instant-deposits";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { capitalCase } from "@/utils/case";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  MenuItem,
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  isEdit?: boolean;
  open: boolean;
  onPrev?: () => void;
  onClose: () => void;
  uniqueId: string;
  method: InstantDepositMethodsType;
};

type FormValues = AdminApiInputs["paymentMethod"]["instantDeposit"]["create"];
const CreateFormDialog = ({
  uniqueId,
  open,
  onClose,
  onPrev,
  method,
  isEdit: _isEdit,
}: Props) => {
  const utils = useAdminUtils();
  const [isEdit, setIsEdit] = useState(_isEdit ?? false);

  const { data, isLoading } =
    adminApi.paymentMethod.instantDeposit.getRecords.useQuery(undefined);

  const keys = method.config.map(({ key }) => key);
  const options = method.config.map((data) => {
    if ("options" in data) {
      return data.options;
    }
    return undefined;
  });
  const labels = method.config.map(({ label }) => label);

  const defaultValues: FormValues = {
    uniqueId,
    status: "" as FormValues["status"],
    charge: "",
    chargeType: "" as FormValues["chargeType"],
    details: {
      ...keys.reduce(
        (data, key) => ({
          ...data,
          [key]: "",
        }),
        {},
      ),
    },
  };

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(instantDepositSchema.create),
  });
  const { handleSubmit, reset } = methods;

  const { mutate, isLoading: isMutating } =
    adminApi.paymentMethod.instantDeposit.create.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        void utils.paymentMethod.instantDeposit.getRecords.invalidate();
        onClose();
      },
    });

  useEffect(() => {
    if (data) {
      const activeData = data.find((method) => method.uniqueId === uniqueId);
      if (activeData) {
        reset(activeData as FormValues);
        setIsEdit(true);
      }
    }
  }, [data, uniqueId, reset]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      {isLoading && <LinearProgress />}
      <DialogTitle>
        {onPrev && (
          <IconButton onClick={onPrev}>
            <Iconify icon={"ic:round-keyboard-arrow-left"} />
          </IconButton>
        )}
        {!isEdit ? (
          <> Create {method.name} deposit gateway</>
        ) : (
          <> Update {method.name} deposit gateway </>
        )}
      </DialogTitle>
      <DialogContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={4}>
            {keys.map((key, index) => {
              const dropDownOptions = options[index];
              if (Array.isArray(dropDownOptions)) {
                return (
                  <RHFTextField
                    select
                    variant="standard"
                    key={key}
                    name={`details.${key}`}
                    label={index in labels ? labels[index] : ""}
                  >
                    {dropDownOptions.map((value, index) => (
                      <MenuItem
                        key={index}
                        value={value}
                      >
                        {capitalCase(value)}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                );
              }
              return (
                <RHFTextField
                  variant="standard"
                  key={key}
                  name={`details.${key}`}
                  label={index in labels ? labels[index] : ""}
                />
              );
            })}

            <RHFTextField
              maskNumber
              name="charge"
              label="Charge"
              variant="standard"
            />
            <RHFSelect
              name="chargeType"
              label="Charge Type"
              variant="standard"
            >
              <MenuItem value="fixed">Fixed</MenuItem>
              <MenuItem value="percent">Percent</MenuItem>
            </RHFSelect>

            <RHFTextField
              select
              variant="standard"
              name="status"
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </RHFTextField>

            <Box sx={{ textAlign: "right" }}>
              <LoadingButton
                type="submit"
                loading={isMutating}
              >
                {isEdit ? "Update" : "Create"}
              </LoadingButton>
            </Box>
          </Stack>
        </RHFProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormDialog;
