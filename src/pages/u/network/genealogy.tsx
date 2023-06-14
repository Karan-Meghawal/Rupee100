import ApiError from "@/components/ApiError";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { useUserAuth } from "@/redux/slices/userAuth";
import { USER_PATH } from "@/route";
import {
  DrawerProfile,
  GenealogyNode,
  GenealogyNodeButton,
  GenealogyToolbar,
  SearchAutoComplete,
} from "@/sections/common/genealogy";
import {
  CHART_ID,
  NODE_HEIGHT,
  NODE_WIDTH,
} from "@/sections/common/genealogy/config";
import AboutCard from "@/sections/user/profile/AboutCard";
import { userApi, type UserApiOutputs } from "@/utils/api";
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  SwipeableDrawer,
  styled,
} from "@mui/material";
import { OrgChart } from "d3-org-chart";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

const GenealogyContainer = styled(Card)(({ theme }) => ({
  "--primary": theme.palette.primary.main,
  "--neutral": theme.palette.background.neutral,
  "--box-shadow": theme.shadows[1],
  "--padding": theme.transitions.create("padding"),
  "--border-color": theme.palette.primary.main,
  "--color": theme.palette.text.primary,
  "--font-family": theme.typography.fontFamily,
  display: "flex",
  flexGrow: 1,
}));

export type GenealogyUser = UserApiOutputs["network"]["genealogy"][number];

const Genealogy: NextPageWithLayout = () => {
  const { user } = useUserAuth();
  const {
    data: nodes,
    isLoading,
    error,
  } = userApi.network.genealogy.useQuery(undefined, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const d3Container = useRef(null);
  const [chart, setChart] = useState<OrgChart<GenealogyUser> | null>(null);

  const [drawerUser, setDrawerUser] = useState<GenealogyUser | null>(null);

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerUser(null);
    };

  const container = document.querySelector(`#${CHART_ID}`) as HTMLElement;

  useEffect(() => {
    if (nodes && d3Container.current) {
      if (!chart) {
        setChart(new OrgChart());
      } else {
        chart
          .container(d3Container.current)
          .data(nodes)
          .svgHeight(container.clientHeight)
          .svgWidth(container.clientWidth)
          .nodeHeight(() => NODE_HEIGHT)
          .nodeWidth(() => NODE_WIDTH)
          .childrenMargin(() => 50)
          .compactMarginBetween(() => 15)
          .compactMarginPair(() => 15)
          .neightbourMargin(() => 15)
          .siblingsMargin(() => 20)
          .buttonContent(({ node }) =>
            renderToString(<GenealogyNodeButton node={!!node.children} />),
          )
          .nodeContent(({ data }) =>
            renderToString(<GenealogyNode {...data} />),
          )
          .compact(false)
          .onNodeClick((nodeId) => {
            const nodeData = nodes.find((e) => e.id === nodeId);
            if (!nodeData) return;

            const { isValid, parentId, placementSide } = nodeData;
            if (isValid) {
              setDrawerUser(nodeData);
            } else {
              window.open(
                `${USER_PATH.register}?referralId=${String(
                  user?.userId,
                )}&placementId=${String(parentId)}&placement=${
                  placementSide === "left" ? "left" : "right"
                }`,
              );
            }
          })
          .render();
      }
    }
  }, [nodes, chart, container, user]);

  if (error) return <ApiError error={error} />;
  return (
    <Page title="Genealogy">
      <HeaderBreadcrumbs
        heading="Genealogy"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Genealogy" },
        ]}
      />
      <SwipeableDrawer
        anchor="right"
        open={!!drawerUser}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        <Box sx={{ width: { xs: 250, md: 400 } }}>
          {drawerUser && (
            <>
              <DrawerProfile
                avatar={drawerUser.avatar}
                displayName={drawerUser.firstName}
              />
              <Box>
                <CardContent>
                  <AboutCard user={drawerUser} />
                </CardContent>
              </Box>
            </>
          )}
        </Box>
      </SwipeableDrawer>
      {isLoading && <LinearProgress />}

      <GenealogyContainer
        id={CHART_ID}
        sx={{
          "&.hidden svg.svg-chart-container": {
            display: "none",
          },
        }}
      >
        <SearchAutoComplete
          nodes={nodes}
          chart={chart}
        />
        <Box
          sx={{
            width: 1,
            height: "inherit",
          }}
          ref={d3Container}
        ></Box>
        {chart && <GenealogyToolbar chart={chart} />}
      </GenealogyContainer>
    </Page>
  );
};

Genealogy.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Genealogy;
