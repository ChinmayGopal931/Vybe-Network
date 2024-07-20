import { useEffect, useState } from "react";
import axios from "axios";

const useMarketCapData = () => {
  const [data, setData] = useState<
    { tokenAddress: string; marketCap: number; fill: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/market-cap-distribution"
        );
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
        const chartData = response.data.map((item: any, index: number) => ({
          ...item,
          fill: colors[index % colors.length],
        }));
        setData(chartData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useMarketCapData;
