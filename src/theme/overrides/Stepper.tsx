import { type Components, type Theme } from "@mui/material";

export default function Stepper(theme: Theme):Components<Theme> {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
