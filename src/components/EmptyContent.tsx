import { Typography, type BoxProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import EmptyContentSvg from "~/public/images/empty-content.svg";
import Image from "./Image";

const RootStyle = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 2),
  minHeight: 400,
}));

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  img?: string;
  description?: string;
  element?: React.ReactNode;
} & BoxProps;

export default function EmptyContent({
  title,
  description,
  img,
  element,
  ...other
}: Props) {
  return (
    <RootStyle {...other}>
      <Image
        alt="empty content"
        src={img || (EmptyContentSvg as string)}
        sx={{ height: 260, mb: 3 }}
        objectFit="contain"
      />
      <Typography variant="h5">{title}</Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {description}
        </Typography>
      )}

      {element && element}
    </RootStyle>
  );
}
