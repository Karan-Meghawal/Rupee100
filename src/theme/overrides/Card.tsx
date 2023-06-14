import { type Components, type Theme } from "@mui/material";

export default function Card(theme: Theme):Components<Theme> {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          border: ".0625rem solid rgba(243,247,250,.05)",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          "& .MuiCardHeader-action": {
            margin: 0,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
