import Avatar from "@/components/Avatar";
import Image from "@/components/Image";
import cssStyles from "@/utils/cssStyles";
import { userDisplayName } from "@/utils/fns";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProfileCoverImage from "~/public/images/profile_cover.jpg";
import { type UserWithoutPassword } from "~/types";

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
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
  height: "100%",
  display: "grid",
  placeContent: "center",
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
  },
}));

const UserProfileCover = ({
  firstName,
  lastName,
  userId,
  avatar,
}: UserWithoutPassword) => (
  <RootStyle>
    <InfoStyle>
      <Avatar
        sx={{ width: 180, height: 180, margin: "auto" }}
        src={avatar ?? undefined}
      />
      <Box
        sx={{
          ml: { md: 3 },
          mt: { xs: 1, md: 0 },
          color: "common.white",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h4">
          {userDisplayName(firstName, lastName)}
        </Typography>
        <Typography sx={{ opacity: 0.72 }}>{userId}</Typography>
      </Box>
    </InfoStyle>
    <Image
      alt="profile cover"
      src={ProfileCoverImage}
      sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    />
  </RootStyle>
);
export default UserProfileCover;
