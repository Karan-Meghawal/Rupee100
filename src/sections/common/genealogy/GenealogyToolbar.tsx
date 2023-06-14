import Iconify from "@/components/Iconify";
import { type GenealogyUser } from "@/pages/u/network/genealogy";
import { Box, Card, CardActionArea, Tooltip, styled } from "@mui/material";
import { type OrgChart } from "d3-org-chart";
import { useEffect, useState } from "react";
import { CHART_ID } from "./config";

const ButtonCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  marginBottom: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "& svg": {
    height: "1.5rem",
    width: "1.5rem",
  },
}));
const ButtonCardActionArea = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const GenealogyToolbar = ({ chart }: { chart: OrgChart<GenealogyUser> }) => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleExpand = () => chart.expandAll();
  const handleFit = () => chart.fit();
  const handleZoomIn = () => chart.zoomIn();
  const handleZoomOut = () => chart.zoomOut();
  const fullScreenElement = document.querySelector(
    `#${CHART_ID}`,
  ) as HTMLElement;

  const handleFullScreen = (open: boolean) => {
    if (open) {
      void fullScreenElement.requestFullscreen();
      setFullscreen(true);
      return;
    }
    void document.exitFullscreen();
    setFullscreen(false);
  };
  const exitHandler = () => document.fullscreenElement ?? setFullscreen(false);

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler);
    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
    };
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      console.log("resized");

      if (chart) {
        fullScreenElement.classList.add("hidden");
        const height = fullScreenElement.clientHeight;
        const width = fullScreenElement.clientWidth;
        chart?.svgHeight(height).svgWidth(width).render();
        fullScreenElement.classList.remove("hidden");
      }
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [chart, fullScreenElement, fullscreen]);

  return (
    <Box sx={{ position: "absolute", right: 0, bottom: 0, mr: 1 }}>
      <ButtonCard
        sx={{ background: "palette.background.neutral" }}
        onClick={handleExpand}
      >
        <Tooltip title="Expand all nodes">
          <ButtonCardActionArea>
            <Iconify icon="gridicons:fullscreen" />
          </ButtonCardActionArea>
        </Tooltip>
      </ButtonCard>
      <ButtonCard onClick={handleFit}>
        <Tooltip title="Center nodes">
          <ButtonCardActionArea>
            <Iconify icon="ant-design:fullscreen-exit-outlined" />
          </ButtonCardActionArea>
        </Tooltip>
      </ButtonCard>
      <ButtonCard onClick={handleZoomIn}>
        <Tooltip title="Zoom in">
          <ButtonCardActionArea>
            <Iconify icon="ic:round-plus" />
          </ButtonCardActionArea>
        </Tooltip>
      </ButtonCard>
      <ButtonCard onClick={handleZoomOut}>
        <Tooltip title="Zoom out">
          <ButtonCardActionArea>
            <Iconify icon="ic:twotone-minus" />
          </ButtonCardActionArea>
        </Tooltip>
      </ButtonCard>
      {!fullscreen ? (
        <ButtonCard onClick={() => handleFullScreen(!fullscreen)}>
          <Tooltip title="Fullscreen">
            <ButtonCardActionArea>
              <Iconify icon="mingcute:fullscreen-2-line" />
            </ButtonCardActionArea>
          </Tooltip>
        </ButtonCard>
      ) : (
        <ButtonCard onClick={() => handleFullScreen(!fullscreen)}>
          <Tooltip title="Cancel Fullscreen">
            <ButtonCardActionArea>
              <Iconify icon="material-symbols:close-fullscreen-rounded" />
            </ButtonCardActionArea>
          </Tooltip>
        </ButtonCard>
      )}
    </Box>
  );
};

export default GenealogyToolbar;
