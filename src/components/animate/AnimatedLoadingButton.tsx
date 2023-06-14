import { LoadingButton, type LoadingButtonProps } from "@mui/lab";
import { m } from "framer-motion";

type Props = LoadingButtonProps;

const AnimatedLoadingButton = ({ children, disabled, ...restProps }: Props) => (
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
  >
    <LoadingButton
      disabled={disabled}
      {...restProps}
    >
      {children}
    </LoadingButton>
  </m.div>
);
export default AnimatedLoadingButton;
