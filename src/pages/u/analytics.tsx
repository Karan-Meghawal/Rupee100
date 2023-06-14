import ApiError from "@/components/ApiError";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { BaseOptionChart } from "@/components/chart";
import Layout from "@/layouts";
import { USER_PATH } from "@/route";
import AnalyticsDateRange from "@/sections/admin/analytics/AnalyticsDateRange";
import { userApi } from "@/utils/api";
import { fDate } from "@/utils/formatTime";
import { Card, CardHeader, LinearProgress } from "@mui/material";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { useState } from "react";
import dynamic from "next/dynamic";
import { type NextPageWithLayout } from "../_app";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Analytics: NextPageWithLayout = () => {
  const initializeData = {
    referral: [],
    team: [],
    categories: [],
  };

  const initialStartDate = subDays(startOfDay(new Date()), 6);
  const initialEndDate = endOfDay(new Date());

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const { data, isFetching, error } = userApi.analytics.joining.useQuery({
    startDate,
    endDate,
  });
  const result = data ?? initializeData;
  const { referral, team, categories } = result;

  const baseOptions = BaseOptionChart();
  const options = {
    ...baseOptions,
    legend: {
      ...baseOptions.legend,
      position: "top" as const,
      horizontalAlign: "right" as const,
    },
    xaxis: {
      ...baseOptions.xaxis,
      categories: categories.map((category) => fDate(new Date(category))),
    },
  };
  const series = [
    {
      name: "My Referral",
      data: referral,
    },
    {
      name: "Team Referral",
      data: team,
    },
  ];

  if (error) return <ApiError error={error} />;

  return (
    <Page title="Analytics">
      <HeaderBreadcrumbs
        heading="Analytics"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Analytics" },
        ]}
      />
      <Card>
        {isFetching && <LinearProgress />}
        <CardHeader
          title="Referrals Analytics"
          action={
            <AnalyticsDateRange
              initialStartDate={initialStartDate}
              initialEndDate={initialEndDate}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          }
        />
        <ReactApexChart
          type="area"
          series={series}
          options={options}
          height={364}
        />
      </Card>
    </Page>
  );
};
Analytics.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Analytics;
