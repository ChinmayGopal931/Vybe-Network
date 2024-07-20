import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import useMarketCapData from "@/hooks/useFetchMarketCapData";

const MarketCapBarChart: React.FC = () => {
  const { data, loading, error } = useMarketCapData();

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
      title: {
        text: "Market Cap",
      },
    },
    yaxis: {
      title: {
        text: "Token Address",
      },
    },
  });

  const series = [
    {
      name: "Market Cap",
      data: data.map((item) => item.marketCap),
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Market Cap Distribution</CardTitle>
        <CardDescription>Top 5 SPL Tokens</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto max-w-4xl">
          <Chart
            options={chartOptions}
            series={series}
            type="bar"
            height={400}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing market cap for the top 5 SPL tokens
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarketCapBarChart;
