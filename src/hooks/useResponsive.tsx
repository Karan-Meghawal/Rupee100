import { useTheme, type Breakpoint } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

export default function useResponsive(
  query: "up" | "down" | "between" | "only",
  key: number | Breakpoint,
  start?: number,
  end?: number,
) {
  const theme = useTheme();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const mediaUp = useMediaQuery(theme.breakpoints.up(key));

  const mediaDown = useMediaQuery(theme.breakpoints.down(key));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start!, end!));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(key as Breakpoint));

  let result = null;

  if (query === "up") {
    result = mediaUp;
  }

  if (query === "down") {
    result = mediaDown;
  }

  if (query === "between") {
    result = mediaBetween;
  }

  if (query === "only") {
    result = mediaOnly;
  }

  if (!hydrated) {
    return null;
  }

  return result;
}
