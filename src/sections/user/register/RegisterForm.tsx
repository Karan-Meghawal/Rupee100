/* eslint-disable @typescript-eslint/no-unused-vars */
import Iconify from "@/components/Iconify";
import { RHFProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import RHFTelInput from "@/components/hook-form/RHFTelInput";
import { useAppDispatch } from "@/redux/hook";
import { useConfiguration } from "@/redux/slices/configuration";
import { setRegisterPage, useUserAuth } from "@/redux/slices/userAuth";
import { baseRegister } from "@/server/user/auth/schema";
import { userApi } from "@/utils/api";
import { isUserId } from "@/utils/fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { User_PlacementSide } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

// type FormValues = UserApiInputs["auth"]["register"];

const errors = {
  referralId: {
    error: false,
    message: "",
  },
  placementId: {
    error: false,
    message: "",
  },
  placementSide: {
    error: false,
    message: "",
  },
  userName: {
    error: false,
    message: "",
  },
};

const registerResolver = z.intersection(
  baseRegister,
  z.object({
    referralId: z
      .number()
      .or(
        z.string().nonempty({
          message: "Referral Id is required",
        }),
      )
      .refine(
        () => !errors.referralId.error,
        () => ({
          message: errors.referralId.message,
        }),
      ),
    placementId: z
      .number()
      .or(z.string())
      .optional()
      .refine(
        () => !errors.placementId.error,
        () => ({
          message: errors.placementId.message,
        }),
      ),
    userName: z.string().refine(
      () => !errors.userName.error,
      () => ({
        message: errors.userName.message,
      }),
    ),
    placementSide: z
      .nativeEnum(User_PlacementSide, {
        errorMap: (issue) => {
          switch (issue.code) {
            case "invalid_type":
            default:
              return {
                message: `Placement Side is invalid`,
              };
          }
        },
      })
      .refine(
        () => !errors.placementSide.error,
        () => ({
          message: errors.placementSide.message,
        }),
      ),
    step: z.literal(1).or(z.literal(2)),
  }),
);

type FormValues = z.input<typeof registerResolver>;

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { registerPage } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    configuration: { registration: isRegistrationEnabled },
  } = useConfiguration();
  const params = router.query;

  const [referralUserName, setReferralUserName] = useState("");
  const [placementUserName, setPlacementUserName] = useState("");

  const defaultValues: FormValues = registerPage.data ?? {
    step: 1,
    referralId: "",
    placementSide: "" as FormValues["placementSide"],
    placementId: "",
    userName: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(registerResolver),
    defaultValues,
  });

  const { handleSubmit, setValue, setError, clearErrors, watch } = methods;
  const { mutate, isLoading } = userApi.auth.register.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutate(formData, {
      onSuccess(data, values) {
        if ("email" in data)
          dispatch(
            setRegisterPage({ step: 2, email: data.email, data: values }),
          );
      },
    });
  };

  // set data from query for referral links
  useEffect(() => {
    const { placement, placementId, referralId } = params;

    // placement side
    if (placement === "left" || placement === "right")
      setValue("placementSide", placement);

    // referral Id
    if (typeof referralId === "string") setValue("referralId", referralId);

    // placement Id
    if (typeof placementId === "string") setValue("placementId", placementId);
  }, [params, setValue]);

  const referralId = watch("referralId");
  const placementId = watch("placementId");
  const placementSide = watch("placementSide");
  const userName = watch("userName");

  const { mutateAsync: checkReferralId } =
    userApi.auth.checkReferralId.useMutation();
  const { mutateAsync: checkPlacementId } =
    userApi.auth.checkPlacementId.useMutation();
  const { mutateAsync: checkPlacementSide } =
    userApi.auth.checkPlacementSide.useMutation();
  const { mutateAsync: checkUserName } =
    userApi.auth.checkUserName.useMutation();

  useEffect(() => {
    const value = referralId;
    const onError = (message: string) => {
      errors.referralId.error = true;
      errors.referralId.message = message;
      setReferralUserName("");
      setError("referralId", {
        type: "referralIdManual",
        message,
      });
    };
    const onSuccess = (userName: string) => {
      errors.referralId.error = false;
      errors.referralId.message = "";
      setReferralUserName(userName);
      clearErrors("referralId");
    };

    if (!referralId) return onSuccess("");
    if (!isUserId(value)) return onError("Referral Id is not valid");

    async function check() {
      try {
        const { success, userName } = await checkReferralId(value);
        if (success) onSuccess(userName);
        else onError("Referral Id doesn't exist");
      } catch (error) {
        onError("Referral Id doesn't exist");
      }
    }
    void check();
    return undefined;
  }, [checkReferralId, clearErrors, referralId, setError, setValue]);

  useEffect(() => {
    const value = placementId;
    const onError = (message: string) => {
      errors.placementId.error = true;
      errors.placementId.message = message;
      setPlacementUserName("");
      setError("placementId", {
        type: "placementIdManual",
        message,
      });
    };
    const onSuccess = (placementUsername: string) => {
      errors.placementId.error = false;
      errors.placementId.message = "";
      setPlacementUserName(placementUsername);
      clearErrors("placementId");
    };

    if (!value || String(value)?.length < 1) return onSuccess("");
    if (!isUserId(value)) return onError("Placement Id is not valid");

    async function check() {
      const { success, userName } = await checkPlacementId(Number(value));
      if (success) onSuccess(userName);
      else onError("Placement Id doesn't exist");
    }
    void check();
    return undefined;
  }, [checkPlacementId, clearErrors, placementId, setError, setValue]);

  useEffect(() => {
    const value = placementSide;

    const onSuccess = () => {
      errors.placementSide.error = false;
      errors.placementSide.message = "";
      clearErrors("placementSide");
    };

    const onError = (message: string) => {
      errors.placementSide.error = true;
      errors.placementSide.message = message;
      setError("placementSide", {
        type: "placementSideManual",
        message,
      });
    };

    if (!placementId || !isUserId(placementId)) return onSuccess();

    async function check() {
      if (placementId) {
        const { leftId, rightId, success } = await checkPlacementSide(
          placementId,
        );
        if (success) {
          const left = !!leftId;
          const right = !!rightId;
          const both = left && right;

          let message;
          if (both) message = "Both left and right side are in use";
          if (left && value === "left") message = "Left side is in use";
          if (right && value === "right") message = "Right side is in use";

          if (message) onError(message);
          else onSuccess();
        } else onSuccess();
      }
    }
    void check();

    return undefined;
  }, [checkPlacementSide, clearErrors, placementId, placementSide, setError]);

  useEffect(() => {
    const value = userName?.toLowerCase();
    if (!value) return;

    async function check() {
      const success = await checkUserName(value);
      if (success) {
        errors.userName.error = false;
        errors.userName.message = "";
        clearErrors("userName");
      } else {
        errors.userName.error = true;
        errors.userName.message = "Username is already registered";
        setError("userName", {
          type: "userNameManual",
          message: "Username is already registered",
        });
      }
    }
    void check();
  }, [checkUserName, clearErrors, setError, userName]);

  const [haveReferral, setHaveReferral] = useState<"yes" | "no">("yes");
  const handleChangeHaveReferral = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target as HTMLInputElement;
    if (value === "yes" || value === "no") setHaveReferral(value);

    if (value === "no") {
      setValue("referralId", "1006090");
    } else {
      setValue("referralId", "");
    }
  };

  return (
    <RHFProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!params.referralId || (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <FormLabel>Do you have a sponsor?</FormLabel>
          <RadioGroup
            name="sponsor"
            row
            value={haveReferral}
            onChange={handleChangeHaveReferral}
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </Stack>
      )}

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
            name="referralId"
            label="Referral Id"
            maskNumber
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <TextField
            fullWidth
            disabled
            label="Referral Username"
            value={referralUserName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            placeholder="(optional)"
            name="placementId"
            label="Placement Id"
            maskNumber
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <TextField
            fullWidth
            disabled
            label="Placement Username"
            value={placementUserName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFSelect
            name="placementSide"
            label="Placement Side"
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </RHFSelect>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            name="userName"
            label="Username"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTextField
            name="firstName"
            label="First Name"
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
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <RHFTelInput
            name="mobileNumber"
            label="Mobile Number"
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
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
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
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
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
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <LoadingButton
            disabled={!isRegistrationEnabled}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Register
          </LoadingButton>
        </Grid>
      </Grid>
    </RHFProvider>
  );
};
export default RegisterForm;
