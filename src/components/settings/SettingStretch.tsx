import { useAppDispatch } from "@/redux/hook";
import { toggleStretch, useTheme } from "@/redux/slices/theme";
import { CardActionArea, Stack, type Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../Iconify";

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

export default function SettingStretch() {
  const dispatch = useAppDispatch();
  const { isStretch } = useTheme();
  const onToggleStretch = () => dispatch(toggleStretch());

  const ICON_SIZE = {
    width: isStretch ? 24 : 18,
    height: isStretch ? 24 : 18,
  };

  return (
    <BoxStyle
      onClick={onToggleStretch}
      sx={{
        ...((isStretch && {
          color: (theme: Theme) => theme.palette.primary.main,
        }) as object),
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 1,
          mx: "auto",
          width: 0.5,
          height: 40,
          borderRadius: 1,
          color: "action.active",
          bgcolor: "background.default",
          boxShadow: (theme) => theme.customShadows.z12,
          transition: (theme) => theme.transitions.create("width"),
          ...((isStretch && {
            width: 1,
            color: "primary.main",
          }) as object),
        }}
      >
        <Iconify
          icon={
            isStretch ? "eva:arrow-ios-back-fill" : "eva:arrow-ios-forward-fill"
          }
          {...ICON_SIZE}
        />
        <Iconify
          icon={
            isStretch ? "eva:arrow-ios-forward-fill" : "eva:arrow-ios-back-fill"
          }
          {...ICON_SIZE}
        />
      </Stack>
    </BoxStyle>
  );
}
