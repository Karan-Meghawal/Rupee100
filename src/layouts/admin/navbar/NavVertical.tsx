import Label from "@/components/Label";
import Logo from "@/components/Logo";
import Scrollbar from "@/components/Scrollbar";
import { NavSectionVertical } from "@/components/nav-section";
import { APP_VERSION, NAVBAR } from "@/config";
import useResponsive from "@/hooks/useResponsive";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setMouseEnter,
  setMouseLeave,
  toggleCollapse,
} from "@/redux/slices/sidebar";
import {
  Box,
  Drawer,
  Stack,
  styled,
  useTheme
} from "@mui/material";
import CollapseButton from "./CollapseButton";
import NavAccount from "./NavAccount";
import navConfig from "./NavConfig";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

const NavVertical = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "lg") ?? true;

  const dispatch = useAppDispatch();
  const { isCollapsed, collapseClicked, collapseHovered } = useAppSelector(
    (state) => state.sidebar,
  );
  const onCloseSidebar = () => dispatch(toggleCollapse());
  const onMouseEnter = () => dispatch(setMouseEnter());
  const onMouseLeave = () => dispatch(setMouseLeave());

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapsed ? { alignItems: "center" } : null),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo isCollapsed={isCollapsed} />
          {isDesktop && !isCollapsed && <CollapseButton />}
        </Stack>
        <NavAccount isCollapse={isCollapsed} />
      </Stack>
      <NavSectionVertical
        navConfig={navConfig({ kyc: true })}
        isCollapse={isCollapsed}
      />
      <Box
        margin="auto"
        mb={1}
      >
        <Label color="primary">V {APP_VERSION}</Label>
      </Box>
      <Box sx={{ flexGrow: 1, paddingBottom: 2 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapsed
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClicked
          ? {
              position: "absolute",
            }
          : null),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={!isCollapsed}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              transition: (themeT) =>
                themeT.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapsed
                ? {
                    width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
                  }
                : null),
              ...(collapseHovered
                ? {
                    // ...cssStyles(theme).bgBlur(),
                    boxShadow: (theme2) => theme2.customShadows.z24,
                  }
                : null),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};
export default NavVertical;
