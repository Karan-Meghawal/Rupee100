import Image from "@/components/Image";
import { RHFProvider, RHFUploadAvatar } from "@/components/hook-form";
import { useAppDispatch } from "@/redux/hook";
import { updateAvatar, useUserAuth } from "@/redux/slices/userAuth";
import { userApi, type UserApiInputs } from "@/utils/api";
import cssStyles from "@/utils/cssStyles";
import { userDisplayName } from "@/utils/fns";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ProfileCoverImage from "~/public/images/profile_cover.jpg";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));
const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

type FormValues = UserApiInputs["profile"]["updateAvatar"];

export default function ProfileCover() {
  const dispatch = useAppDispatch();
  const { user } = useUserAuth();
  const { mutate } = userApi.profile.updateAvatar.useMutation();

  const defaultValues: FormValues = {
    avatar: "",
  };
  const methods = useForm<FormValues>({
    defaultValues,
  });
  const { setValue } = methods;

  useEffect(() => {
    setValue("avatar", user?.avatar ?? "");
  }, [setValue, user]);

  const onSuccess = (file: string) => {
    mutate(
      { avatar: file },
      {
        onSuccess() {
          dispatch(updateAvatar(file));
        },
      },
    );
  };
  if (!user) return null;

  return (
    <RootStyle>
      <InfoStyle>
        <RHFProvider
          methods={methods}
          onSubmit={() => {}}
        >
          <RHFUploadAvatar
            onSuccess={onSuccess}
            name="avatar"
            setValue={setValue}
          />
        </RHFProvider>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">
            {userDisplayName(user.firstName, user.lastName)}
          </Typography>
          <Typography sx={{ opacity: 0.72 }}>{user.userId}</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src={ProfileCoverImage}
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}
