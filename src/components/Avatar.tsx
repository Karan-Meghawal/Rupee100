import { Avatar as MUIAvatar, type AvatarProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { type PaletteBasicColor } from "../theme";
import { getFileSrc } from "../utils/fns";

type AvatarPropsWithoutSrc = Omit<AvatarProps, "src">;

type Props = AvatarPropsWithoutSrc & {
  src?: string | null;
  color?: PaletteBasicColor | "default";
};

const Avatar = forwardRef<null, Props>(
  ({ color = "default", children, sx, src, ...other }, ref) => {
    const theme = useTheme();

    if (color === "default") {
      return (
        <MUIAvatar
          src={src ? getFileSrc(src) : undefined}
          ref={ref}
          sx={sx}
          {...other}
        >
          {children}
        </MUIAvatar>
      );
    }

    return (
      <MUIAvatar
        ref={ref}
        src={src ? getFileSrc(src) : undefined}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  },
);

Avatar.displayName = "Avatar";
export default Avatar;
