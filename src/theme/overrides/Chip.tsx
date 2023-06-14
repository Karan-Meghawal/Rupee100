import { type Components, type Theme } from "@mui/material";
import { CloseIcon } from "./CustomIcons";

export default function Chip(theme: Theme):Components<Theme> {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <CloseIcon />,
      },
      styleOverrides: {
        outlined: {
          borderColor: theme.palette.grey[500_32],
          "&.MuiChip-colorPrimary": {
            borderColor: theme.palette.primary.main,
          },
          "&.MuiChip-colorSecondary": {
            borderColor: theme.palette.secondary.main,
          },
        },
      },
    },
  };
}
