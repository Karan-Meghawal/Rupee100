import { Icon, type IconProps } from "@iconify/react";
import { Box, type BoxProps } from "@mui/material";

// ----------------------------------------------------------------------
type Props = IconProps &
  BoxProps & {
    icon: string;
  };

export default function Iconify({ icon, sx, ...other }: Props) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{ fontSize: 24, ...sx }}
      {...other}
    />
  );
}
