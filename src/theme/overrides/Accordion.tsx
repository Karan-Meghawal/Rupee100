import { type Components, type Theme } from "@mui/material";

export default function Accordion(theme: Theme): Components<Theme> {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          boxShadow: theme.customShadows.card,
          borderRadius: `${theme.spacing(2)} !important`,
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          "&.Mui-disabled": {
            opacity: 1,
            color: theme.palette.action.disabled,
            "& .MuiTypography-root": {
              color: "inherit",
            },
          },
        },
        expandIconWrapper: {
          color: "inherit",
        },
      },
    },
  };
}
