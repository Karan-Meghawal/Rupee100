import Logo from "@/components/Logo";
import { AnimatedButton } from "@/components/animate";
import { HEADER } from "@/config";
import useOffSetTop from "@/hooks/useOffSetTop";
import { useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import cssStyles from "@/utils/cssStyles";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  styled,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

const Header = () => {
  const isOffset = useOffSetTop(HEADER.MOBILE_HEIGHT);
  const theme = useTheme();
  const { isAuthenticated } = useUserAuth();

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <AnimatedButton
            color="warning"
            variant="contained"
            LinkComponent={NextLink}
            href={isAuthenticated ? USER_PATH.dashboard : USER_PATH.login}
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </AnimatedButton>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
};
export default Header;
