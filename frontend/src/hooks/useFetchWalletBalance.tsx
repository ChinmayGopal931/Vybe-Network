import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useWalletBalancesData = () => {
  const [data, setData] = useState<
    { walletAddress: string; balance: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/wallet-balances"
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
};

export default useWalletBalancesData;
