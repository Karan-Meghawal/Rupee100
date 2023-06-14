import { useAppDispatch } from "@/redux/hook";
import { changeMode, useTheme, type ThemeState } from "@/redux/slices/theme";
import { CardActionArea, Grid, RadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../Iconify";
import BoxMask from "./BoxMask";

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

export default function SettingMode() {
  const dispatch = useAppDispatch();
  const { mode: themeMode } = useTheme();
  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeMode(event.target.value as ThemeState["mode"]));

  return (
    <RadioGroup
      name="mode"
      value={themeMode}
      onChange={onChangeMode}
    >
      <Grid
        dir="ltr"
        container
        spacing={2.5}
      >
        {["light", "dark"].map((mode, index) => {
          const isSelected = themeMode === mode;

          return (
            <Grid
              key={mode}
              item
              xs={6}
            >
              <BoxStyle
                sx={{
                  bgcolor: mode === "light" ? "common.white" : "grey.800",
                  ...(isSelected && {
                    color: "primary.main",
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                }}
              >
                <Iconify
                  icon={index === 0 ? "ph:sun-duotone" : "ph:moon-duotone"}
                  width={28}
                  height={28}
                />
                <BoxMask value={mode} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
