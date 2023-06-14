import AdminAvatar from "@/components/AdminAvatar";
import { useAdminAuth } from "@/redux/slices/adminAuth";
import { Box, Typography, styled } from "@mui/material";

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
  const { user } = useAdminAuth();
  if (!user) return null;
  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          bgcolor: "transparent",
        }),
      }}
    >
      <AdminAvatar />
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
  );
};
export default NavAccount;
