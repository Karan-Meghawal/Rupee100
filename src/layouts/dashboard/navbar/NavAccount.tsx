import UserAvatar from "@/components/UserAvatar";
import { useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import { Box, Link, Typography, styled } from "@mui/material";
import NextLink from "next/link";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

type Props = {
  isCollapse: boolean;
};
const NavAccount = ({ isCollapse }: Props) => {
  const { user } = useUserAuth();
  if (!user) return null;

  return (
    <Link
      underline="none"
      color="inherit"
      component={NextLink}
      href={USER_PATH.profile}
    >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: "transparent",
          }),
        }}
      >
        <UserAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography
            variant="subtitle2"
            noWrap
          >
            {user.firstName + user.lastName}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{ color: "text.secondary" }}
          >
            {user.userId}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
};
export default NavAccount;
