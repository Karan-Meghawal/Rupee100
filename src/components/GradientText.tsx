import { createGradient } from "@/theme/palette";
import { Typography, useTheme, type TypographyProps } from "@mui/material";
import { type ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";

const GradientText = ({
  sx,
  borderWidth = 3,
  text,
  ...otherProps
}: {
  borderWidth?: number;
  text: string | ReactNodeArray;
} & TypographyProps) => {
  const theme = useTheme();
  const gradient = createGradient(
    theme.palette.primary.main,
    theme.palette.secondary.main,
  );

  let title = reactStringReplace(text, /{{(.*?)}}/, (match, i) => (
    <Typography
      key={`${match}${i}`}
      sx={{
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        borderImage: gradient,
        borderImageSlice: "1",
        borderBottomWidth: borderWidth,
        borderBottomStyle: "solid",
        fontSize: "inherit",
        fontWeight: "inherit",
        fontFamily: "inherit",
        ...sx,
      }}
      component={"span"}
      {...otherProps}
    >
      {match}
    </Typography>
  ));

  title = reactStringReplace(title, /\[\[(.*?)\]\]/, (match, i) => (
    <Typography
      key={`${match}${i}`}
      sx={{
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "primary.main",
        fontSize: "inherit",
        fontWeight: "inherit",
        fontFamily: "inherit",
        ...sx,
      }}
      component={"span"}
      {...otherProps}
    >
      {match}
    </Typography>
  ));

  return title as unknown as JSX.Element;
};
export default GradientText;
