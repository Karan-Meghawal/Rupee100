import {
  CircularProgress,
  IconButton,
  type IconButtonProps,
} from "@mui/material";

type Props = IconButtonProps & {
  loading: boolean;
  children: React.ReactNode;
};

const LoadingIconButton = ({ loading, children, ...others }: Props) => (
  <IconButton
    disabled={loading}
    {...others}
  >
    {loading ? <CircularProgress size={24} /> : children}
  </IconButton>
);

export default LoadingIconButton;
