import { Box, IconButton, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

const leftIcon = (customIcon?: string) => (
  <Iconify
    icon={customIcon || "eva:arrow-right-fill"}
    sx={{
      width: 20,
      height: 20,
      transform: " scaleX(-1)",
    }}
  />
);

const rightIcon = (customIcon?: string) => (
  <Iconify
    icon={customIcon || "eva:arrow-right-fill"}
    sx={{
      width: 20,
      height: 20,
    }}
  />
);

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  display: "flex",
  alignItems: "center",
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.48),
}));

const ArrowStyle = styled(IconButton)(({ theme }) => ({
  padding: 6,
  opacity: 0.48,
  color: theme.palette.common.white,
  "&:hover": { opacity: 1 },
}));

// ----------------------------------------------------------------------

interface CarouselArrowIndexProps {
  customIcon?: string;
  index: number;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
}

export default function CarouselArrowIndex({
  index,
  total,
  onNext,
  onPrevious,
  customIcon,
  ...other
}: CarouselArrowIndexProps) {
  return (
    <RootStyle {...other}>
      <ArrowStyle
        size="small"
        onClick={onPrevious}
      >
        {leftIcon(customIcon)}
      </ArrowStyle>

      <Typography variant="subtitle2">
        {index + 1}/{total}
      </Typography>

      <ArrowStyle
        size="small"
        onClick={onNext}
      >
        {rightIcon(customIcon)}
      </ArrowStyle>
    </RootStyle>
  );
}
