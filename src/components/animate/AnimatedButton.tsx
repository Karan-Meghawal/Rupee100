import { Button, type ButtonProps } from "@mui/material";
import { m } from "framer-motion";

type Props = ButtonProps;

const AnimatedButton = ({
  children,
  disabled,
  fullWidth,
  ...restProps
}: Props) => (
  <m.div
    initial={{ scale: 1 }}
    {...(!disabled && {
      whileHover: {
        scale: 1.05,
      },
      whileTap: {
        scale: 0.95,
      },
    })}
    style={{
      display: "inline-flex",
      ...(fullWidth && {
        width: "100%",
      }),
    }}
  >
    <Button
      disabled={disabled}
      fullWidth={fullWidth}
      {...restProps}
    >
      {children}
    </Button>
  </m.div>
);

export default AnimatedButton;
