import { createGradient } from "@/theme/palette";
import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect, useMemo } from "react";

// ----------------------------------------------------------------------

export function ProgressBarStyle() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "#nprogress": {
          pointerEvents: "none",
          "& .bar": {
            top: 0,
            left: 0,
            height: 2,
            width: "100%",
            position: "fixed",
            zIndex: theme.zIndex.snackbar,
            background: createGradient(
              theme.palette.primary.main,
              theme.palette.secondary.main,
            ),
            boxShadow: `0 0 2px ${theme.palette.primary.main}`,
          },
          "& .peg": {
            right: 0,
            opacity: 1,
            width: 100,
            height: "100%",
            display: "block",
            position: "absolute",
            transform: "rotate(3deg) translate(0px, -4px)",
            boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
          },
        },
      }}
    />
  );
}

export default function ProgressBar() {
  const router = useRouter();

  nProgress.configure({
    showSpinner: false,
  });

  useMemo(() => {
    nProgress.done();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", () => nProgress.start());
    router.events.on("routeChangeComplete", () => nProgress.done());
    router.events.on("routeChangeError", () => nProgress.done());
  }, [router]);

  return null;
}
