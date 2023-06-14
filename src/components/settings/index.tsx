import { useAppDispatch } from "@/redux/hook";
import { resetTheme, useTheme } from "@/redux/slices/theme";
import { Backdrop, Card, Divider, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { NAVBAR, defaultTheme } from "../../config";
import Iconify from "../Iconify";
import Scrollbar from "../Scrollbar";
import { IconButtonAnimate, varFade } from "../animate";
import SettingColorPresets from "./SettingColorPresets";
import SettingFullscreen from "./SettingFullscreen";
import SettingLayout from "./SettingLayout";
import SettingMode from "./SettingMode";
import SettingStretch from "./SettingStretch";
import ToggleButton from "./ToggleButton";

const RootStyle = styled(m.div)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  position: "fixed",
  overflow: "hidden",
  width: NAVBAR.BASE_WIDTH,
  flexDirection: "column",
  margin: theme.spacing(2),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === "light"
      ? theme.palette.grey[500]
      : theme.palette.common.black,
    0.16,
  )}`,
}));

export default function Settings() {
  const { mode, activeColorPreset, isStretch, layout } = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const notDefault =
    mode !== defaultTheme.mode ||
    activeColorPreset !== defaultTheme.activeColorPreset ||
    layout !== defaultTheme.layout ||
    isStretch !== defaultTheme.isStretch;

  const varSidebar = varFade({
    distance: NAVBAR.BASE_WIDTH,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inRight;

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);
  const onResetSetting = () => dispatch(resetTheme());

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          background: "transparent",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />

      <ToggleButton
        open={open}
        notDefault={notDefault}
        onToggle={handleToggle}
      />

      <AnimatePresence>
        {open && (
          <RootStyle {...varSidebar}>
            <Card sx={{ height: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 2, pr: 1, pl: 2.5 }}
              >
                <Typography variant="subtitle1">Settings</Typography>
                <div>
                  <IconButtonAnimate onClick={onResetSetting}>
                    <Iconify
                      icon={"ic:round-refresh"}
                      width={20}
                      height={20}
                    />
                  </IconButtonAnimate>
                  <IconButtonAnimate onClick={handleClose}>
                    <Iconify
                      icon={"eva:close-fill"}
                      width={20}
                      height={20}
                    />
                  </IconButtonAnimate>
                </div>
              </Stack>

              <Divider sx={{ borderStyle: "dashed" }} />

              <Scrollbar sx={{ flexGrow: 1 }}>
                <Stack
                  spacing={3}
                  sx={{ p: 3 }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Mode</Typography>
                    <SettingMode />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Layout</Typography>
                    <SettingLayout />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Presets</Typography>
                    <SettingColorPresets />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Stretch</Typography>
                    <SettingStretch />
                  </Stack>

                  <SettingFullscreen />
                </Stack>
              </Scrollbar>
            </Card>
          </RootStyle>
        )}
      </AnimatePresence>
    </>
  );
}
