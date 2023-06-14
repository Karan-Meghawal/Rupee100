import { type PaletteBasicColor } from "@/theme";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { m } from "framer-motion";
import Iconify from "./Iconify";

const IconWrapperStyle = styled(Box)(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(10),
  height: theme.spacing(10),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

type Props = {
  label: string;
  value?: number | string;
  icon: string;
  loading?: boolean;
  rotate?: number;
  color?: PaletteBasicColor;
  tooltip?: string | number;
};

const InfoCard = ({
  label,
  value,
  icon,
  loading,
  rotate,
  tooltip,
  color = "primary",
}: Props) => (
  <Card
    component={m.div}
    transition={{
      duration: 0.5,
    }}
    initial={{
      scale: 1,
    }}
    whileHover={{
      scale: 1.01,
    }}
    sx={{
      "&:hover": {
        boxShadow: (theme) => theme.shadows[24],
      },
    }}
  >
    <CardContent>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Stack
          spacing={1}
          sx={{ flex: 1 }}
        >
          <Tooltip title={tooltip ?? ""}>
            <Typography
              component="div"
              variant="h5"
            >
              {loading ? <Skeleton /> : value}
            </Typography>
          </Tooltip>
          <Typography
            sx={{ opacity: 0.72 }}
            component="div"
            variant="subtitle1"
          >
            {loading ? <Skeleton /> : label}
          </Typography>
        </Stack>
        {loading ? (
          <Skeleton
            variant="circular"
            width={80}
            height={80}
          />
        ) : (
          <IconWrapperStyle
            sx={{
              color: (theme) => theme.palette[color].dark,
              backgroundImage: (theme) =>
                `linear-gradient(135deg, ${alpha(
                  theme.palette[color].light,
                  0.1,
                )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
            }}
          >
            <Iconify
              icon={icon}
              width={40}
              height={40}
              rotate={rotate}
            />
          </IconWrapperStyle>
        )}
      </Stack>
    </CardContent>
  </Card>
);

export default InfoCard;
