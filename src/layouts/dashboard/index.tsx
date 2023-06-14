import { HEADER, NAVBAR, RESPONSIVE_GAP } from "@/config";
import useResponsive from "@/hooks/useResponsive";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleCollapse } from "@/redux/slices/sidebar";
import { useTheme } from "@/redux/slices/theme";
import { Box, Container, styled } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import NavHorizontal from "./navbar/NavHorizontal";
import NavVertical from "./navbar/NavVertical";

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})<{ collapseClick: boolean }>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  paddingTop: HEADER.MOBILE_HEIGHT + 0,
  [theme.breakpoints.up("lg")]: {
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { layout, isStretch } = useTheme();
  const { isCollapsed, collapseClicked } = useAppSelector(
    (state) => state.sidebar,
  );
  const onOpenSidebar = () => dispatch(toggleCollapse());
  const isDesktop = useResponsive("up", "lg");

  if (layout === "vertical") {
    return (
      <>
        <Header
          isCollapsed={isCollapsed}
          onOpenSidebar={onOpenSidebar}
          verticalLayout={true}
        />
        {isDesktop ? <NavHorizontal /> : <NavVertical />}
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
            },
          }}
        >
          <Container
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            maxWidth={isStretch ? false : "lg"}
          >
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {children}
            </Box>
            <Box sx={{ mt: RESPONSIVE_GAP }}>
              <Footer />
            </Box>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <Header
        isCollapsed={isCollapsed}
        onOpenSidebar={onOpenSidebar}
      />
      <NavVertical />
      <MainStyle
        style={{ display: "flex", flexDirection: "column" }}
        collapseClick={collapseClicked}
      >
        <Container
          sx={{
            display: "flex",
            flexGrow: 1,
            paddingBottom: 3,
            p: RESPONSIVE_GAP,
            flexDirection: "column",
          }}
          maxWidth={isStretch ? false : "lg"}
        >
          {children}
        </Container>
        <Footer />
      </MainStyle>
    </Box>
  );
};
export default DashboardLayout;
