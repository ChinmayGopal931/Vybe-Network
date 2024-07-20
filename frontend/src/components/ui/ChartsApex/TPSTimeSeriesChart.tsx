import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import useTPSTimeSeriesData from "@/hooks/useFetchTPSData";

const TPSTimeSeriesChart: React.FC = () => {
  const { data, loading, error, refresh } = useTPSTimeSeriesData();

  const series = [
    {
      name: "TPS",
      data: data.map((item) => ({
        x: new Date(item.timestamp).getTime(),
        y: parseInt(item.tps.toString()),
      })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Timestamp",
      },
    },
    yaxis: {
      title: {
        text: "TPS",
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Transactions Per Second",
      align: "left",
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
    },
  };

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-card shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        Solana Transactions Per Second
      </h2>
      {data.length > 0 && (
        <Chart options={options} series={series} type="line" height={350} />
      )}
    </div>
  );
};

export default TPSTimeSeriesChart;
