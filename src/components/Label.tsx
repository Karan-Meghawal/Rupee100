import { alpha, styled } from "@mui/material/styles";
import { type PaletteBasicColor } from "../theme";
import { pxToRem } from "../utils/getFontValue";

// ----------------------------------------------------------------------

type Variant = "filled" | "outlined" | "ghost";
type Color = PaletteBasicColor | "default";

interface RootProps {
  ownerState: {
    color: Color;
    variant: Variant;
  };
}

const RootStyle = styled("span")<RootProps>(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === "light";
  const { color, variant } = ownerState;

  type Color =
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";

  const styleFilled = (color: Color) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
  });

  const styleOutlined = (color: Color) => ({
    color: theme.palette[color].main,
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette[color].main}`,
  });

  const styleGhost = (color: Color) => ({
    color: theme.palette[color][isLight ? "dark" : "light"],
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: "default",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== "default"
      ? {
          ...(variant === "filled" && { ...styleFilled(color) }),
          ...(variant === "outlined" && { ...styleOutlined(color) }),
          ...(variant === "ghost" && { ...styleGhost(color) }),
        }
      : {
          ...(variant === "outlined" && {
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === "ghost" && {
            color: isLight
              ? theme.palette.text.secondary
              : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

// ----------------------------------------------------------------------

type LabelProps = React.ButtonHTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
  color?: Color;
  variant?: Variant;
};

const Label: React.FC<LabelProps> = ({
  color = "default",
  variant = "filled",
  children,
  ...other
}) => (
  <RootStyle
    ownerState={{ color, variant }}
    {...other}
  >
    {children}
  </RootStyle>
);
export default Label;
