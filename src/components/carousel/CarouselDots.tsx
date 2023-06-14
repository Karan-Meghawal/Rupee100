import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "rounded",
})<{ rounded: boolean }>(({ rounded }) => ({
  display: "flex",
  listStyle: "none",
  alignItems: "center",
  justifyContent: "center",
  "& li": {
    width: 18,
    height: 18,
    opacity: 0.32,
    cursor: "pointer",
  },
  "& li.slick-active": {
    opacity: 1,
    ...(rounded && {
      "& .dotActive": {
        width: 16,
        borderRadius: 6,
      },
    }),
  },
}));

const DotWrapStyle = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const DotStyle = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------

export default function CarouselDots({
  color,
  rounded,
  ...others
}: {
  color?: string;
  rounded?: boolean;
  [x: string]: unknown;
}) {
  return {
    appendDots: (dots: string) => (
      <>
        <RootStyle
          rounded={rounded ?? false}
          component="ul"
          {...others}
        >
          {dots}
        </RootStyle>
      </>
    ),
    customPaging: () => (
      <DotWrapStyle>
        <DotStyle
          className="dotActive"
          sx={{
            bgcolor: color || "primary.main",
          }}
        />
      </DotWrapStyle>
    ),
  };
}
