import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import useFormEdit from "@/hooks/useFormEdit";
import { useAppDispatch } from "@/redux/hook";
import { updateProfile, useUserAuth } from "@/redux/slices/userAuth";
import { userApi, type UserApiInputs } from "@/utils/api";
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
import { date, object, string } from "zod";
import MyProfileKycInput from "./MyProfileKycInput";

type Props = {
  kycData: KycForm[];
};

type FormValues = UserApiInputs["profile"]["updateProfile"];

const MyProfileForm = ({ kycData }: Props) => {
  const { user } = useUserAuth();
  const dispatch = useAppDispatch();
  const { isEditing, startEditing, stopEditing } = useFormEdit();
  const { firstName, lastName, kyc, kycData: userData } = user!;

  const zodSchema = object({
    firstName: string()
      .nonempty("First Name is required")
      .max(15, "Maximum 15 characters are allowed"),
    lastName: string()
      .nonempty("Last Name is required")
      .max(15, "Maximum 15 characters are allowed"),
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

  const defaultValues = {
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
    userApi.profile.updateProfile.useMutation();

  const onSubmit = (data: FormValues) =>
    mutate(data, {
      onSuccess({ data }) {
        dispatch(updateProfile(data));
        stopEditing();
      },
    });

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
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                <MyProfileKycInput
                  disabled={!isEditing || (kyc === "verified" && data.required)}
                  setValue={setValue}
                  // todo
                  // @ts-ignore
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

export default MyProfileForm;
