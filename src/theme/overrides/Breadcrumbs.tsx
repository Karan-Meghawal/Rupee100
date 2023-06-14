import { type Components, type Theme } from "@mui/material";

export default function Breadcrumbs(theme: Theme):Components<Theme> {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
      },
    },
  };
}
