import WalletBalancesBarChart from "@/components/ui/Charts/WalletBalanceChart";
import MarketCapPieChart from "@/components/ui/Charts/MarketCapPieChart";
import TPSTimeSeriesChart from "@/components/ui/Charts/TPSTimeSeriesChart";

export default function Analytics() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex py-10">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Vybe Analytics
        </p>
      </div>
      <div className="flex flex-col py-1 gap-12 w-full">
        <div className="w-full">
          <MarketCapPieChart />
        </div>

        <div className="w-full">
          <TPSTimeSeriesChart />
        </div>
        <div className="w-full">
          <WalletBalancesBarChart />
        </div>
      </div>
    </div>
  );
}
