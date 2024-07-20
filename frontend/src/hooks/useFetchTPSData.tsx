import { useEffect, useState } from "react";
import axios from "axios";

const useTPSTimeSeriesData = () => {
  const [data, setData] = useState<{ timestamp: string; tps: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/transactions-per-second"
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};

export default useTPSTimeSeriesData;
