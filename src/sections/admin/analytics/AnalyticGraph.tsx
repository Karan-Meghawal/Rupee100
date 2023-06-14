import { BaseOptionChart } from "@/components/chart";
import { fCurrency } from "@/utils/formatNumber";
import { fDate } from "@/utils/formatTime";
import { Card, CardHeader, LinearProgress } from "@mui/material";
import { type UseQueryResult } from "@tanstack/react-query";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { useState } from "react";
import dynamic from "next/dynamic";
import AnalyticsDateRange from "./AnalyticsDateRange";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Input = {
  startDate: Date;
  endDate: Date;
};

type Output = {
  categories: string[];
  values: number[];
};

type Props = {
  title: string;
  isCurrency?: boolean;
  query: (
    options: Input,
  ) => UseTRPCQueryResult<Output, UseQueryResult["error"]>;
};

const AnalyticGraph = ({ title, isCurrency, query }: Props) => {
  const initializeData = {
    values: [],
    categories: [],
  };

  const initialStartDate = subDays(startOfDay(new Date()), 6);
  const initialEndDate = endOfDay(new Date());

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const { data, isFetching } = query({
    startDate,
    endDate,
  });

  const response = data ?? initializeData;
  const { values, categories } = response;

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
      categories: categories.map((category: string) =>
        fDate(new Date(category)),
      ),
    },
    ...(isCurrency && {
      yaxis: {
        labels: {
          formatter: (value: number) => `${fCurrency(value)}`,
        },
      },
    }),
  };
  const series = [
    {
      name: title,
      data: values,
    },
  ];

  return (
    <Card>
      {isFetching && <LinearProgress />}
      <CardHeader
        title={title}
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
  );
};

export default AnalyticGraph;
