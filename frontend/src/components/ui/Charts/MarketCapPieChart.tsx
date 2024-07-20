import React from "react";
import { Pie, PieChart } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import useMarketCapData from "@/hooks/useFetchMarketCapData";

const chartConfig = {
  marketCap: {
    label: "Market Cap",
  },
} satisfies ChartConfig;

const MarketCapPieChart: React.FC = () => {
  const { data, loading, error } = useMarketCapData();

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: Failed to fetch data</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Market Cap Distribution</CardTitle>
        <CardDescription>Top 5 SPL Tokens</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey="marketCap" nameKey="tokenAddress" />
          </PieChart>
        </ChartContainer>
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

export default MarketCapPieChart;
