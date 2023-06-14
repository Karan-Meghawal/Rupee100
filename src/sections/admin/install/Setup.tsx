import IconifyIcons from "@/IconifyIcons";
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import RHFTelInput from "@/components/hook-form/RHFTelInput";
import { ADMIN_PATH } from "@/route";
import configurationSchema from "@/server/admin/configuration/schema";
import { adminApi, type AdminApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = AdminApiInputs["configuration"]["install"];
const Setup = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    license: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(configurationSchema.install),
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading: isSubmitting } =
    adminApi.configuration.install.useMutation({
      onSuccess() {
        void router.replace(ADMIN_PATH.login);
      },
    });

  const handleSetup = (formData: FormValues) => mutate(formData);

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<Iconify icon={IconifyIcons.rightDirectionArrow} />}
        variant="contained"
        size="large"
        sx={{ borderRadius: 99 }}
      >
        Setup App
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Setup App</DialogTitle>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(handleSetup)}
        >
          <DialogContent>
            <Stack spacing={3}>
              <RHFTextField
                name="license"
                label="License"
              />
              <RHFTextField
                name="email"
                label="Email"
              />
              <RHFTextField
                name="userName"
                label="Username"
              />
              <RHFTextField
                name="firstName"
                label="First Name"
              />
              <RHFTextField
                name="lastName"
                label="Last Name"
              />
              <RHFTelInput
                name="mobileNumber"
                label="Mobile Number"
              />
              <RHFTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />{" "}
              <RHFTextField
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="error"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </RHFProvider>
      </Dialog>
    </>
  );
};
export default Setup;
