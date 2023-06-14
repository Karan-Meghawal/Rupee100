import { type Components, type Theme } from "@mui/material";

export default function DataGrid(theme: Theme): Components<Theme> {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `1px solid transparent`,
          "& .MuiTablePagination-root": {
            borderTop: 0,
          },
          "& .MuiDataGrid-toolbarContainer": {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.background.neutral,
            "& .MuiButton-root": {
              marginRight: theme.spacing(1.5),
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
          },
          "& .MuiDataGrid-cell, .MuiDataGrid-columnsContainer": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-columnSeparator": {
            color: theme.palette.divider,
          },
          '& .MuiDataGrid-columnHeader[data-field="__check__"]': {
            padding: 0,
          },
        },
        columnHeaders: {
          borderBottom: "none !important",
        },
        columnHeader: {
          height: `${theme.spacing(7)} !important`,
          textTransform: "uppercase",
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          fontSize: "0.75rem !important",
          "&.MuiDataGrid-columnHeader--sorted": {
            color: theme.palette.text.primary,
          },
          "&.MuiDataGrid-columnHeader--sorted button": {
            color: theme.palette.text.primary,
          },
          outline: "none !important",
          "&:first-of-type": {
            paddingLeft: theme.spacing(3),
          },
          "&:last-of-type": {
            paddingRight: theme.spacing(3),
          },
        },
        cell: {
          borderBottom: "none !important",
          "&:first-of-type": {
            paddingLeft: theme.spacing(3),
          },
          "&:last-of-type": {
            paddingRight: theme.spacing(3),
          },
          "&:focus": {
            outline: "none !important",
          },
        },
      },
    },
  };
}
