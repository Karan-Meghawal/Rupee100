import { Stack, type SxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props {
  endIcon: boolean;
  icon: string;
  sx?: SxProps;
  value?: unknown;
}
export default function TextIconLabel({
  icon,
  value,
  endIcon = false,
  sx,
  ...other
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: "body2",
        ...sx,
      }}
      {...other}
    >
      <>
        {!endIcon && icon}
        {value}
        {endIcon && icon}
      </>
    </Stack>
  );
}
