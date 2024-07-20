import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
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
import useTPSTimeSeriesData from "@/hooks/useFetchTPSData";

const chartConfig = {
  tps: {
    label: "TPS",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TPSTimeSeriesChart: React.FC = () => {
  const { data, loading, error, refresh } = useTPSTimeSeriesData();

  const chartData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp).toLocaleString(),
  }));

  const calculateTrendPercentage = () => {
    if (data.length < 2) return 0;
    const firstTPS = data[0].tps;
    const lastTPS = data[data.length - 1].tps;
    return ((lastTPS - firstTPS) / firstTPS) * 100;
  };

  const trendPercentage = calculateTrendPercentage();
  const isTrendingUp = trendPercentage >= 0;

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: Failed to fetch data</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Solana Transactions Per Second</CardTitle>
        <CardDescription>Real-time TPS Data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
            <Tooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <YAxis />
            <Line
              dataKey="tps"
              type="natural"
              stroke="rgba(75, 192, 192, 1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {isTrendingUp ? (
            <>
              Trending up by {trendPercentage.toFixed(2)}%{" "}
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Trending down by {trendPercentage.toFixed(2)}%{" "}
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing real-time Solana TPS data
        </div>
      </CardFooter>
    </Card>
  );
};

export default TPSTimeSeriesChart;
