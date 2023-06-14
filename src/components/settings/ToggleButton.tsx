import { Box, Tooltip, type Theme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { m } from "framer-motion";
import { useRef } from "react";
import cssStyles from "../../utils/cssStyles";
import Iconify from "../Iconify";
import { IconButtonAnimate } from "../animate";

const RootStyle = styled(Box)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: "24px 0 20px 24px",
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === "light"
      ? theme.palette.grey[600]
      : theme.palette.common.black,
    0.36,
  )}`,
}));

const DotStyle = styled("span")(({ theme }) => ({
  top: 8,
  width: 8,
  height: 8,
  right: 10,
  borderRadius: "50%",
  position: "absolute",
  backgroundColor: theme.palette.error.main,
}));

// ----------------------------------------------------------------------

export default function ToggleButton({
  notDefault,
  open,
  onToggle,
}: {
  notDefault: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const constraintsRef = useRef(null);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          bottom: "50%",
          right: 8,
          height: "100vh",
          width: 52,
          transform: "translateY(-50%)",
          zIndex: -1,
        }}
        ref={constraintsRef}
      />
      <m.div
        dragConstraints={constraintsRef}
        drag
        initial={{ bottom: 8, right: 8, position: "fixed" }}
        style={{ zIndex: 1102 }}
        dragTransition={{
          power: 1,
          min: 0,
          max: 100,
          bounceDamping: 4,
        }}
      >
        <RootStyle>
          {notDefault && !open && <DotStyle />}

          <Tooltip
            title="Settings"
            placement="left"
          >
            <IconButtonAnimate
              onClick={onToggle}
              sx={{
                p: 1.25,
                boxShadow: (theme) => theme.customShadows.darkCard,
                transition: (theme: Theme) => theme.transitions.create("all"),
                "&:hover": {
                  color: "primary.main",
                  bgcolor: (theme: Theme) =>
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.action.hoverOpacity,
                    ),
                },
              }}
            >
              <Iconify
                color="primary.main"
                icon="bi:toggles"
                width={24}
                height={24}
              />
            </IconButtonAnimate>
          </Tooltip>
        </RootStyle>
      </m.div>
    </>
  );
}
