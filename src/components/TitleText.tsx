import { Typography, type TypographyProps } from "@mui/material";
import { type ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";

const TitleText = ({
  sx,
  borderWidth = 3,
  text,
  ...otherProps
}: {
  borderWidth?: number;
  text: string | ReactNodeArray;
} & TypographyProps) => {
  let title = reactStringReplace(text, /{{(.*?)}}/, (match, i) => (
    <Typography
      key={`${match}${i}`}
      sx={{
        color: "primary.main",
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
export default TitleText;
