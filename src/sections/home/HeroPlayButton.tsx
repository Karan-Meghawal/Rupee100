import Iconify from "@/components/Iconify";
import { getYouTubeVideoID } from "@/utils/fns";
import {
  Backdrop,
  Box,
  CardActionArea,
  Fade,
  Modal,
  styled,
} from "@mui/material";
import { m } from "framer-motion";
import { useState } from "react";

const PlayButtonContainer = styled(Box)({
  width: 140,
  height: 140,
  borderRadius: "50%",
  background: "linear-gradient(120deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.2))",
  boxShadow: "0 24px 72px 0 rgba(0,0,0,.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: ".5s ",
  "&:hover": {
    transform: "scale(.96)",
  },
});

const PlayButton = styled(Box)({
  width: 100,
  height: 100,
  borderRadius: "50%",
  background: "#fff",
  transition: ".5s ",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.16)",
  },
});

const buttonMotion = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 180,
  },
};

const HeroPlayButton = ({ video }: { video: string }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const videoId = getYouTubeVideoID(video);
  if (!videoId) return null;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autplay=1`;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        disableEnforceFocus
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as const,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1,
              maxWidth: 900,
              boxShadow: 24,
              outline: "none",
            }}
          >
            <iframe
              src={videoUrl}
              style={{
                border: 0,
                aspectRatio: "16 / 9",
                width: "100%",
              }}
              allowFullScreen
            />
          </Box>
        </Fade>
      </Modal>
      <PlayButtonContainer>
        <m.div
          initial="initial"
          whileHover="animate"
          animate="initial"
        >
          <PlayButton onClick={handleOpen}>
            <CardActionArea
              sx={{
                height: 1,
                width: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component={m.div}
                display="flex"
                variants={buttonMotion}
              >
                <Iconify
                  color="#111"
                  sx={{
                    fontSize: 34,
                  }}
                  icon="solar:play-bold"
                />
              </Box>
            </CardActionArea>
          </PlayButton>
        </m.div>
      </PlayButtonContainer>
    </>
  );
};

export default HeroPlayButton;
