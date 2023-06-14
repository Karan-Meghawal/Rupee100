import Iconify from "@/components/Iconify";
import { RHFProvider, RHFTextField } from "@/components/hook-form";
import { MIN_PASSWORD_LENGTH } from "@/server/config";
import { profileSchema } from "@/server/user/profile/schema";
import { userApi, type UserApiInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ChangePasswordVerify from "./ChangePasswordVerify";

type FormValues = UserApiInputs["profile"]["changePassword"];

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<FormValues | null>(null);
  const onClose = () => setOpen(false);

  const defaultValues: FormValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
    step: 1,
  };
  const methods = useForm({
    resolver: zodResolver(profileSchema.changePassword),
    defaultValues,
  });

  const { mutate, isLoading } = userApi.profile.changePassword.useMutation();

  const { handleSubmit, reset } = methods;
  const onSubmit = (formData: FormValues) =>
    mutate(formData, {
      onSuccess() {
        setOpen(true);
        setData(formData);
      },
    });

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const onVerifySuccess = () => {
    setOpen(false);
    reset();
  };

  return (
    <Card>
      {open && (
        <ChangePasswordVerify
          open={open}
          onClose={onClose}
          onSuccess={onVerifySuccess}
          data={data!}
        />
      )}
      <CardHeader
        title="Change Password"
        sx={{ bgcolor: "background.neutral" }}
      />
      <CardContent>
        <RHFProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <RHFTextField
              name="currentPassword"
              type={showPassword ? "text" : "password"}
              label="Current Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle Password"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Iconify icon={"eva:eye-off-fill"} />
                      ) : (
                        <Iconify icon={"eva:eye-fill"} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="password"
              type={showPassword ? "text" : "password"}
              label="New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle Password"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Iconify icon={"eva:eye-off-fill"} />
                      ) : (
                        <Iconify icon={"eva:eye-fill"} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              label="Confirm New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle Password"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Iconify icon={"eva:eye-off-fill"} />
                      ) : (
                        <Iconify icon={"eva:eye-fill"} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Alert
              icon={false}
              variant="outlined"
              severity="error"
            >
              <AlertTitle>Password Requirements</AlertTitle>
              <List
                sx={{
                  listStyle: "disc inside",
                  "& li": { display: "list-item" },
                }}
              >
                <ListItem>
                  Minimum {MIN_PASSWORD_LENGTH} characters long - the more, the
                  better
                </ListItem>
                <ListItem>
                  At least one lowercase & one uppercase character
                </ListItem>
                <ListItem>At least one number, symbol</ListItem>
              </List>
            </Alert>

            <LoadingButton
              sx={{ marginLeft: "auto !important" }}
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Change Password
            </LoadingButton>
          </Stack>
        </RHFProvider>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
