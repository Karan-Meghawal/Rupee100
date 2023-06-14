import { Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Iconify from "../Iconify";

export default function SettingFullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
      setFullscreen(false);
    }
  };
  const exitHandler = () => document.fullscreenElement ?? setFullscreen(false);

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler);
    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
    };
  }, []);

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={fullscreen ? "primary" : "inherit"}
      startIcon={
        <Iconify
          icon={fullscreen ? "ic:round-fullscreen-exit" : "ic:round-fullscreen"}
        />
      }
      onClick={toggleFullScreen}
      sx={{
        fontSize: 14,
        ...(fullscreen && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity,
            ),
        }),
      }}
    >
      {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
    </Button>
  );
}
