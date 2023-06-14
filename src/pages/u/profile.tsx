import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import useTabs from "@/hooks/useTabs";
import Layout from "@/layouts";
import { USER_PATH } from "@/route";
import {
  MainTab,
  ProfileCover,
  ProfileKycStatus,
  SecurityTab,
} from "@/sections/user/profile";
import { capitalCase } from "@/utils/case";
import { Box, Card, Tab, Tabs, styled } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { type NextPageWithLayout } from "../_app";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

const PROFILE_TABS = [
  {
    value: "profile",
    icon: (
      <Iconify
        icon={"ic:round-account-box"}
        width={20}
        height={20}
      />
    ),
    component: <MainTab />,
  },
  {
    value: "security",
    icon: (
      <Iconify
        icon={"mdi:secure"}
        width={20}
        height={20}
      />
    ),
    component: <SecurityTab />,
  },
];

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { tab } = router.query;

  type Tabs = "profile" | "security";
  const { currentTab, onChangeTab, setCurrentTab } = useTabs<Tabs>(
    tab === "profile" || tab === "security" ? tab : "profile",
  );

  useEffect(() => {
    if (tab === "profile" || tab === "security") setCurrentTab(tab);
  }, [tab, setCurrentTab]);

  return (
    <Page title="Profile">
      <HeaderBreadcrumbs
        heading="Profile"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Profile" },
        ]}
      />

      <Card
        sx={{
          mb: RESPONSIVE_GAP,
          height: { xs: 340, md: 280 },
          position: "relative",
        }}
      >
        <ProfileCover />
        <TabsWrapperStyle>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                component={NextLink}
                href={{
                  pathname: USER_PATH.profile,
                  query: { tab: tab.value },
                }}
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>
      <ProfileKycStatus />
      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Page>
  );
};
Profile.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Profile;
