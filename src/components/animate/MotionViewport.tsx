import { Box, type BoxProps } from "@mui/material";
import { m, type MotionProps } from "framer-motion";
import useResponsive from "../../hooks/useResponsive";
import { varContainer } from "./variants";

type Props = MotionProps &
  BoxProps & {
    children: React.ReactNode;
    disableAnimatedMobile?: boolean;
  };

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}: Props) {
  const isDesktop = useResponsive("up", "sm");
  if (!isDesktop && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: "some", once: true }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
