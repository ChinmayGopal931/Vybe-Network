import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import useWalletBalancesData from "@/hooks/useFetchWalletBalance";

const WalletBalancesBarChart: React.FC = () => {
  const { data, loading, error, refresh } = useWalletBalancesData();

  const series = [
    {
      name: "SOL Balance",
      data: data.map((item) => item.balance),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.map((item) => item.walletAddress),
      title: {
        text: "Wallet Address",
      },
    },
    yaxis: {
      title: {
        text: "Balance (SOL)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} SOL`;
        },
      },
    },
    title: {
      text: "Wallet Balances",
      align: "left",
    },
    colors: ["#73DD40"], // Change this to your desired color
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Wallet Balances</CardTitle>
        <CardDescription>Balances of 10 Wallets</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto w-full max-w-4xl">
          <Chart options={options} series={series} type="bar" height={400} />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the SOL balances of the top 10 wallets
        </div>
      </CardFooter>
    </Card>
  );
};

export default WalletBalancesBarChart;
