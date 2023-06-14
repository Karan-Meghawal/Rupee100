import { RHFProvider } from "@/components/hook-form";
import { USER_PATH } from "@/route";
import { prismaJsonToRecord } from "@/server/utils/fns";
import { useUserUtils, userApi } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material";
import { type UserWithdrawMethod, type WithdrawMethod } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { date, object, string } from "zod";
import AddMethodInput from "./AddMethodInput";

type Props = {
  id: string;
  isUpdated: boolean;
  method: WithdrawMethod;
  userMethod?: UserWithdrawMethod | null;
};

type FormValues = Record<string, string>;

const AddMethodForm = ({ id, isUpdated, method, userMethod }: Props) => {
  const utils = useUserUtils();
  const router = useRouter();
  const { details, name: methodName } = method;
  const userDetails = prismaJsonToRecord(userMethod?.details ?? {});

  const defaultValues = {
    ...details.reduce((a, { name, inputType }) => {
      const value = userDetails?.[name] ?? null;
      return {
        ...a,
        [name]:
          // eslint-disable-next-line no-nested-ternary
          inputType === "date" ? (value ? new Date(value) : null) : value ?? "",
      };
    }, {}),
  };

  const validationSchema = object(
    details.reduce((acc, { name, label, required, inputType }) => {
      if (inputType === "date") {
        let v = date();
        // @ts-ignore
        if (!required) v = v.nullish();
        return { ...acc, [name]: v };
      }

      let v = string();
      if (required) v = v.nonempty(`${label} is required`);
      if (inputType === "textarea")
        v = v.max(1000, "Maximum 1000 characters are allowed");
      if (inputType === "input")
        v = v.max(30, "Maximum 30 characters are allowed");
      return { ...acc, [name]: v };
    }, {}),
  );

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });
  const { setValue, handleSubmit } = methods;

  const { mutate, isLoading: isMutating } =
    userApi.withdraw.createMethod.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutate(
      { id, details: formData },
      {
        onSuccess() {
          void utils.withdraw.getMethodData.invalidate(id);
          void utils.withdraw.getMethodRecords.invalidate();
          void utils.withdraw.getUserMethodRecords.invalidate();
          void utils.withdraw.getDataForPayment.invalidate(id);
          void router.push(USER_PATH.withdraw.methods);
        },
      },
    );
  };

  return (
    <Stack spacing={3}>
      {isUpdated && (
        <Alert severity="warning">
          You need to updated details to withdraw
        </Alert>
      )}
      <Box>
        <Card sx={{ maxWidth: 600, m: "auto" }}>
          <CardHeader title={methodName} />
          <Divider />
          <CardContent>
            <RHFProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={4}>
                {details.map(({ name, ...otherDetail }) => (
                  <AddMethodInput
                    // todo
                    // @ts-ignore
                    name={name}
                    setValue={setValue}
                    key={name}
                    {...otherDetail}
                  />
                ))}
                <Box sx={{ textAlign: "right" }}>
                  <LoadingButton
                    type="submit"
                    size="large"
                    variant="contained"
                    loading={isMutating}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Stack>
            </RHFProvider>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default AddMethodForm;
