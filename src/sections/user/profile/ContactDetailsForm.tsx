import { useAppDispatch } from "@/redux/hook";
import { updateContact, useUserAuth } from "@/redux/slices/userAuth";
import { profileSchema } from "@/server/user/profile/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { RHFProvider, RHFTextField } from "../../../components/hook-form";
import RHFTelInput from "../../../components/hook-form/RHFTelInput";

type FormValues = UserApiInputs["profile"]["updateContact"];

const ContactDetailsForm = ({
  disabled = false,
  action,
  onSuccess,
}: {
  disabled: boolean;
  action: (data: boolean) => JSX.Element;
  onSuccess: () => void;
}) => {
  const { user } = useUserAuth();
  const dispatch = useAppDispatch();

  const defaultValues: FormValues = {
    address: user?.contact.address ?? "",
    country: user?.contact.country ?? "",
    state: user?.contact.state ?? "",
    city: user?.contact.city ?? "",
    pinCode: user?.contact.pinCode ? String(user?.contact.pinCode) : "",
    mobileNumber: user!.contact.mobileNumber,
  };

  const methods = useForm({
    resolver: zodResolver(profileSchema.updateContact),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    userApi.profile.updateContact.useMutation();
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess({ data }) {
        dispatch(updateContact(data));
        onSuccess?.();
      },
    });

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            disabled={disabled}
            name="address"
            type="text"
            label="Address"
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            disabled={disabled}
            name="country"
            type="text"
            label="Country"
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            disabled={disabled}
            name="state"
            type="text"
            label="State/Region"
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            disabled={disabled}
            name="city"
            type="text"
            label="City"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            disabled={disabled}
            name="pinCode"
            type="text"
            label="Pin Code/Zip Code"
            maskNumber
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTelInput
            disabled={disabled}
            sx={{ width: 1 }}
            name="mobileNumber"
            label="Mobile Number"
          />
        </Grid>

        {action && (
          <Grid
            item
            marginLeft="auto"
          >
            {action(isSubmitting)}
          </Grid>
        )}
      </Grid>
    </RHFProvider>
  );
};

export default ContactDetailsForm;
