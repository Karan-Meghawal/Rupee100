import { Box, type BoxProps } from "@mui/material";
import { m, type Variants } from "framer-motion";
import { varFade } from "./variants";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  text: string;
  variants?: Variants;
};

export default function TextAnimate({ text, variants, sx, ...other }: Props) {
  return (
    <Box
      component={m.h1}
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <m.span
          key={index}
          variants={variants || varFade().inUp}
        >
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
