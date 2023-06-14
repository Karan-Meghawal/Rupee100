import { Box, GlobalStyles } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Slide, ToastContainer as ToastContainerMain } from "react-toastify";

import IconifyIcons from "../IconifyIcons";
import { type PaletteBasicColor } from "../theme";
import { IconButtonAnimate } from "./animate";
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

function SnackbarIcon({
  icon,
  color,
}: {
  icon: string;
  color: PaletteBasicColor;
}) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Iconify
        icon={icon}
        width={24}
        height={24}
      />
    </Box>
  );
}

function ToastStyles() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "body ": {
          "& .Toastify__toast-container ": {
            [theme.breakpoints.up("md")]: {
              width: "unset",
            },
          },
          "& .Toastify__toast ": {
            width: "100%",
            padding: theme.spacing(1),
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            [theme.breakpoints.up("md")]: {
              minWidth: 240,
            },
            fontFamily: theme.typography.fontFamily,
            [theme.breakpoints.down("md")]: {
              marginBottom: 6,
            },
          },
          "& .Toastify__progress-bar": {
            height: 2,
          },
          "& .Toastify__toast-icon": {
            width: "initial",
          },
          "& .Toastify__toast-body > div:last-child": {
            padding: "0 !important",
            fontWeight: 500,
            fontSize: theme.typography.body2.fontSize,
          },
          "& .Toastify_action": {
            marginRight: 0,
            color: theme.palette.action.active,
            display: "flex",
            alignItems: "center",
            "& svg": { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

const CloseButton = () => (
  <div className={"Toastify_action"}>
    <IconButtonAnimate
      size="small"
      sx={{ p: 0.5 }}
    >
      <Iconify icon={"eva:close-fill"} />
    </IconButtonAnimate>
  </div>
);
const ToastContainer = () => (
  <>
    <ToastStyles />
    <ToastContainerMain
      position="bottom-center"
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      autoClose={1000}
      transition={Slide}
      closeButton={CloseButton}
      icon={({ theme, type }) => {
        if (type === "success") {
          return (
            <SnackbarIcon
              icon={IconifyIcons.check}
              color="success"
            />
          );
        }
        return (
          <SnackbarIcon
            icon={IconifyIcons.close}
            color="error"
          />
        );
      }}
    />
  </>
);

export default ToastContainer;
