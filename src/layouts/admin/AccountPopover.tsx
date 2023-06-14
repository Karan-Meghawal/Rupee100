import AdminAvatar from "@/components/AdminAvatar";
import MenuPopover from "@/components/MenuPopover";
import { IconButtonAnimate } from "@/components/animate";
import { useAppDispatch } from "@/redux/hook";
import { useAdminAuth } from "@/redux/slices/adminAuth";
import { logout } from "@/redux/slices/userAuth";
import APP_PATH, { ADMIN_PATH } from "@/route";
import { useAdminUtils } from "@/utils/api";
import {
  Box,
  Divider,
  MenuItem,
  Stack,
  Typography,
  alpha,
  type Theme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: APP_PATH.home,
  },
];

const AccountPopover = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const utils = useAdminUtils();
  const { user } = useAdminAuth();
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => setOpen(null);
  const handleLogout = () => {
    dispatch(logout());
    router.push(ADMIN_PATH.login);
    void utils.invalidate(undefined, {
      refetchType: "none",
    });
  };

  if (!user) return null;
  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open
            ? {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme: Theme) =>
                    alpha(theme.palette.grey[900], 0.8),
                },
              }
            : {}),
        }}
      >
        <AdminAvatar />
      </IconButtonAnimate>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography
            variant="subtitle2"
            noWrap
          >
            {user.firstName + user.lastName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            noWrap
          >
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              href={option.linkTo}
              component={Link}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleLogout}
          sx={{ m: 1 }}
        >
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};
export default AccountPopover;
