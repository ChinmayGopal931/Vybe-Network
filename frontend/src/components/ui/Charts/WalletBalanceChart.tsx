import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "../chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import useWalletBalancesData from "@/hooks/useFetchWalletBalance";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const WalletBalancesBarChart: React.FC = () => {
  const { data, loading, error, refresh } = useWalletBalancesData();

  const chartData = data.map((item) => ({
    ...item,
    fill: "var(--chart-1)",
  }));

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: Failed to fetch data</div>;
  }

  return (
    <Card className="flex flex-col w-[100%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Wallet Balances</CardTitle>
        <CardDescription>Balances of 10 Wallets</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="walletAddress"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="balance" fill="#73DD40" radius={8} />
          </BarChart>
        </ChartContainer>
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
