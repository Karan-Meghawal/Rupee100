import { type Components, type Theme } from "@mui/material";

export default function Link(): Components<Theme> {
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  };
}
