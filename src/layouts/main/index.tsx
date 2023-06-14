import { HEADER } from "@/config";
import APP_PATH from "@/route";
import { Box, Container, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  bottomPadding?: boolean;
  children: React.ReactNode;
};

const Layout = ({
  bottomPadding,
  isFullWidth,
  children,
}: Props & {
  isFullWidth: boolean;
}) => (
  <Box
    sx={{
      flexGrow: 1,
      pt: {
        xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
        md: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 12}px`,
      },
      pb: !bottomPadding
        ? undefined
        : {
            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
            md: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 12}px`,
          },
      ...(!isFullWidth && {
        px: { xs: 0.4, lg: 2 },
      }),
    }}
  >
    {children}
  </Box>
);
const MainLayout = ({ children, bottomPadding = true }: Props) => {
  const path = usePathname();
  const fullWidthsPages = [APP_PATH.home, APP_PATH.aboutUs];
  const isFullWidth = fullWidthsPages.includes(path);

  return (
    <Stack
      component="main"
      sx={{
        minHeight: 1,
      }}
    >
      <Header />
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        {isFullWidth ? (
          <Layout
            bottomPadding={bottomPadding}
            isFullWidth={isFullWidth}
          >
            {children}
          </Layout>
        ) : (
          <Container sx={{ p: 0, display: "flex", flex: 1 }}>
            <Layout
              bottomPadding={bottomPadding}
              isFullWidth={isFullWidth}
            >
              {children}
            </Layout>
          </Container>
        )}
        <Footer />
      </Box>
    </Stack>
  );
};

export default MainLayout;
