import { type Components } from "@mui/material";
import { type Theme } from "@mui/material/styles";

export default function Backdrop(theme: Theme): Components<Theme> {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(3px)",
          "&.MuiBackdrop-invisible": {
            background: "transparent",
          },
        },
      },
    },
  };
}
