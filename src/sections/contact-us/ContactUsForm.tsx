import { RHFProvider, RHFTelInput, RHFTextField } from "@/components/hook-form";
import mainSchema from "@/server/main/schema";
import { api, type ApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = ApiInputs["contactUs"];

const ContactUsForm = () => {
  const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(mainSchema.contactUs),
    mode: "all",
  });
  const { handleSubmit, reset } = methods;

  const { mutate, isLoading: isSubmitting } = api.contactUs.useMutation({
    onSuccess() {
      reset();
    },
  });
  const onSubmit = (formData: FormValues) => mutate(formData);

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        spacing={5}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            name="firstName"
            label="First Name"
            placeholder="Jamsr"
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            name="lastName"
            label="Last Name"
            placeholder="World"
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            name="email"
            label="Email"
            placeholder="contact@email.com"
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTelInput
            name="phone"
            label="Contact Number"
            placeholder="+ (91) 9771 7018 93"
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <RHFTextField
            multiline
            minRows={3}
            name="message"
            label="Message"
            placeholder="Write your message.."
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
        >
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            sx={{ marginLeft: "auto" }}
            variant="contained"
            size="large"
          >
            Send Message
          </LoadingButton>
        </Grid>
      </Grid>
    </RHFProvider>
  );
};
export default ContactUsForm;
