import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import { adminApi, useAdminUtils, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { type KycForm } from "@prisma/client";
import { useForm } from "react-hook-form";
import { date, number, object, string } from "zod";
import { type UserWithoutPassword } from "~/types";
import UserProfileKycInput from "./UserProfileKycInput";

type Props = {
  user: UserWithoutPassword;
  kycData: KycForm[];
};

type FormValues = AdminApiInputs["users"]["updateProfile"];

const UserProfileForm = ({
  user: { userId, firstName, lastName, kycData: userData },
  kycData,
}: Props) => {
  const utils = useAdminUtils();
  const { isEditing, startEditing, stopEditing } = useFormEdit();

  const zodSchema = object({
    firstName: string(),
    lastName: string(),
    userId: number(),
    kyc: object({
      ...kycData.reduce((acc, { id, label, required, inputType }) => {
        if (inputType === "date") {
          let v = date();
          // @ts-ignore
          if (!required) v = v.nullish();
          return { ...acc, [id]: v };
        }

        let v = string();
        if (required) v = v.nonempty(`${label} is required`);
        if (inputType === "textarea")
          v = v.max(1000, "Maximum 1000 characters are allowed");
        if (inputType === "input")
          v = v.max(30, "Maximum 30 characters are allowed");
        return { ...acc, [id]: v };
      }, {}),
    }),
  });

  const defaultValues: FormValues = {
    userId,
    firstName,
    lastName,
    kyc: {
      ...kycData.reduce((acc, { id, inputType }) => {
        const value = userData?.[id] ?? null;
        return {
          ...acc,
          [id]:
            // eslint-disable-next-line no-nested-ternary
            inputType === "date"
              ? value
                ? new Date(value)
                : null
              : value ?? "",
        };
      }, {}),
    },
  };

  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;
  const { mutate, isLoading: isMutating } =
    adminApi.users.updateProfile.useMutation();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess({ data: res }) {
        stopEditing();
        utils.users.getProfile.setData(userId, (data) =>
          data ? { ...data, kycData: res } : undefined,
        );
      },
    });
  };

  return (
    <Card>
      <CardHeader
        title="My Profile"
        sx={{ bgcolor: "background.neutral" }}
        action={
          !isEditing ? (
            <IconButton
              size="small"
              onClick={startEditing}
            >
              <Iconify icon={IconifyIcons.pencil} />
            </IconButton>
          ) : undefined
        }
      />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <RHFTextField
                disabled
                name="firstName"
                type="text"
                label="First Name"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <RHFTextField
                disabled
                name="lastName"
                type="text"
                label="Last Name"
              />
            </Grid>

            {kycData?.map((data) => (
              <Grid
                item
                xs={12}
                md={6}
                key={data.id}
              >
                <UserProfileKycInput
                  disabled={!isEditing}
                  setValue={setValue}
                  name={`kyc.${data.id}`}
                  {...data}
                />
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              marginLeft="auto"
            >
              {isEditing && (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    size="small"
                    color="error"
                    onClick={stopEditing}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    size="small"
                    type="submit"
                    variant="contained"
                    loading={isMutating}
                  >
                    Save Changes
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
