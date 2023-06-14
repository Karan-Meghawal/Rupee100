import DataTable from "@/components/DataTable";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Label from "@/components/Label";
import Page from "@/components/Page";
import TableUser from "@/components/TableUser";
import useTabs from "@/hooks/useTabs";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import { adminApi, type AdminApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fDateTime } from "@/utils/formatTime";
import { Card, Link, Stack, Tab, Tabs } from "@mui/material";
import { type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["support"]["getRecords"]["rows"][number];

const columns: GridColKeys<Row>[] = [
  {
    field: "userId",
    headerName: upperCase("user"),
    minWidth: 200,
    flex: 1,
    renderCell: ({
      row: {
        user: { avatar, userId, userName },
      },
    }) => (
      <TableUser
        avatar={avatar}
        title={userName}
        subtitle={userId}
        userId={userId}
      />
    ),
  },
  {
    field: "id",
    headerName: upperCase("Ticket Id"),
    minWidth: 200,
    maxWidth: 240,
    flex: 1,
    renderCell(params) {
      const { id } = params.row;
      return (
        <Link
          href={ADMIN_PATH.support.ticket(id)}
          component={NextLink}
        >
          #{id}
        </Link>
      );
    },
  },
  {
    field: "subject",
    headerName: upperCase("subject"),
    minWidth: 200,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: upperCase("created At"),
    minWidth: 150,
    flex: 1,
    filterable: false,
    renderCell: ({ row }) => fDateTime(row.createdAt),
  },
  {
    field: "updatedAt",
    headerName: upperCase("last Replied At"),
    minWidth: 150,
    flex: 1,
    filterable: false,
    renderCell: ({ row }) => fDateTime(row.updatedAt),
  },
  {
    field: "status",
    headerName: upperCase("status"),
    minWidth: 100,
    flex: 1,
    renderCell({ row: { status } }) {
      return (
        <Label
          color={
            (status === "pending" && "warning") ||
            (status === "active" && "success") ||
            "error"
          }
        >
          {capitalCase(status)}
        </Label>
      );
    },
  },
];

const Support: NextPageWithLayout = () => {
  const router = useRouter();
  const { data } = adminApi.dashboard.getSummary.useQuery();

  const TABS = useMemo(
    () =>
      [
        {
          value: "all",
          label: "All",
          color: "info" as const,
          count: data?.allTickets ?? 0,
        },
        {
          value: "pending",
          label: "Pending",
          color: "warning" as const,
          count: data?.pendingTickets ?? 0,
        },
        {
          value: "active",
          label: "Active",
          color: "success" as const,
          count: data?.activeTickets ?? 0,
        },
        {
          value: "closed",
          label: "Closed",
          color: "error" as const,
          count: data?.closedTickets ?? 0,
        },
      ] as const,
    [data],
  );

  type Tabs = (typeof TABS)[number]["value"];

  const { query } = router;
  const { tab } = query;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabsArr = useMemo(() => TABS.map((tab) => tab.value), []);

  const { currentTab, onChangeTab, setCurrentTab } = useTabs<Tabs>(
    tabsArr.includes(tab as Tabs) ? (tab as Tabs) : "pending",
  );

  useEffect(() => {
    if (typeof tab === "string" && tabsArr.includes(tab as Tabs))
      setCurrentTab(tab as Tabs);
    else setCurrentTab("pending");
  }, [TABS, router, setCurrentTab, tab, tabsArr]);

  const sortModel = useMemo(
    () => [
      {
        field: "createdAt" as const,
        sort: currentTab === "pending" ? ("asc" as const) : ("desc" as const),
      },
    ],
    [currentTab],
  );

  return (
    <Page title="Support">
      <HeaderBreadcrumbs
        heading="Support"
        links={[
          { name: "Dashboard", href: ADMIN_PATH.dashboard },
          { name: "Support" },
        ]}
      />

      <Card>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
          sx={{ px: 2, bgcolor: "background.neutral" }}
        >
          {TABS.map((tab) => (
            <Tab
              component={NextLink}
              key={tab.value}
              href={{
                pathname: ADMIN_PATH.support.root,
                query: { tab: tab.value },
              }}
              disableRipple
              value={tab.value}
              label={
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                >
                  <div>{tab.label}</div>{" "}
                  <Label color={tab.color}> {tab.count} </Label>
                </Stack>
              }
            />
          ))}
        </Tabs>
        <DataTable<Prisma.TicketScalarFieldEnum>
          title="Support Tickets"
          subheader="List of tickets opened by you"
          sortModel={sortModel}
          columns={columns}
          query={(options) =>
            adminApi.support.getRecords.useQuery({
              status: currentTab,
              table: options,
            })
          }
        />
      </Card>
    </Page>
  );
};
Support.getLayout = (page) => <Layout variant="admin">{page}</Layout>;
export default Support;
