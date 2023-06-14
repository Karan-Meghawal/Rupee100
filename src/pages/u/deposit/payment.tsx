import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import useTabs from "@/hooks/useTabs";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import {
  InstantDepositRecord,
  ManualDepositRecord,
} from "@/sections/user/deposit";
import { Box, Tab, Tabs } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const Deposit: NextPageWithLayout = () => {
  const router = useRouter();

  const TABS = useMemo(
    () =>
      [
        { value: "manual", label: "Manual" },
        { value: "instant", label: "Instant" },
      ] as const,
    [],
  );
  type Tabs = (typeof TABS)[number]["value"];
  const { currentTab, onChangeTab, setCurrentTab } = useTabs<Tabs>("manual");

  useEffect(() => {
    const { query } = router;
    const { tab } = query;
    const tabsArr = TABS.map((tab) => tab.value);
    if (typeof tab === "string" && tabsArr.includes(tab as Tabs))
      setCurrentTab(tab as Tabs);
    else setCurrentTab("manual");
  }, [TABS, router, setCurrentTab]);

  return (
    <Page title="Deposit Payment">
      <HeaderBreadcrumbs
        heading="Deposit"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Deposit Payment" },
        ]}
      />

      <Box sx={{ mb: 4 }}>
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={currentTab}
          onChange={onChangeTab}
          aria-label="icon label tabs example"
        >
          {TABS.map((tab) => (
            <Tab
              component={NextLink}
              key={tab.value}
              href={{
                pathname: USER_PATH.deposit.payment,
                query: { tab: tab.value },
              }}
              disableRipple
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mb: 4 }}>
        {currentTab === "instant" && <InstantDepositRecord />}
        {currentTab === "manual" && <ManualDepositRecord />}
      </Box>
    </Page>
  );
};
Deposit.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;

export default Deposit;
