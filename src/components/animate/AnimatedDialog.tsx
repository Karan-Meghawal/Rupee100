import { Box, Dialog, Paper, type DialogProps } from "@mui/material";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { varFade } from "./variants";

// ----------------------------------------------------------------------

type Props = DialogProps & {
  variants?: Variants;
};

const AnimatedDialog = ({
  open = false,
  variants,
  onClose,
  children,
  ...other
}: Props) => (
  <AnimatePresence>
    {open && (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={(props) => (
          <Box
            component={m.div}
            viewport={{
              once: true,
            }}
            
            {...(variants ||
              varFade({
                distance: 120,
                durationIn: 0.32,
                durationOut: 0.24,
                easeIn: "easeInOut",
              }).inUp)}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* @ts-ignore */}
            <Box
              onClick={onClose}
              sx={{ width: "100%", height: "100%", position: "fixed" }}
            />
            <Paper {...props}>{props.children}</Paper>
          </Box>
        )}
        {...other}
      >
        {children}
      </Dialog>
    )}
  </AnimatePresence>
);

export default AnimatedDialog;
