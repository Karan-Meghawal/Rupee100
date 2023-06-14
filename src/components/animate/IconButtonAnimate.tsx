import { Box, IconButton, type IconButtonProps } from "@mui/material";
import { m } from "framer-motion";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

function AnimateWrap({
  size,
  children,
}: {
  size: "medium" | "small" | "large";
  children: React.ReactNode;
}) {
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: "inline-flex",
      }}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

type IconButtonAnimateProps = IconButtonProps & {
  children: React.ReactNode;
  size?: "medium" | "small" | "large";
};

const IconButtonAnimate = forwardRef<null, IconButtonAnimateProps>(
  ({ children, size = "medium", ...other }, ref) => (
    <AnimateWrap size={size}>
      <IconButton
        size={size}
        ref={ref}
        {...other}
      >
        {children}
      </IconButton>
    </AnimateWrap>
  ),
);
IconButtonAnimate.displayName = "IconButtonAnimate";
export default IconButtonAnimate;
