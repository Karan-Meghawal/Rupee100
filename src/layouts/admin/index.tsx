import { HEADER, NAVBAR, RESPONSIVE_GAP } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCollapse } from "@/redux/slices/sidebar";
import { useTheme } from "@/redux/slices/theme";
import { Box, Container, styled } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
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
const AdminDashboardLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { isStretch } = useTheme();
  const { isCollapsed, collapseClicked } = useAppSelector((state) => state.sidebar);
  const onOpenSidebar = () => dispatch(setCollapse(false));

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <Header
        isCollapse={isCollapsed}
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
export default AdminDashboardLayout;
