import { render, screen, act } from "@testing-library/react";
import useWalletBalancesData from "@/hooks/useFetchWalletBalance";
import WalletBalancesBarChart from "./ui/Charts/WalletBalanceChart";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
jest.mock("@/hooks/useFetchWalletBalance");

describe("WalletBalancesBarChart", () => {
  it("renders loading state initially", async () => {
    (useWalletBalancesData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    await act(async () => {
      render(<WalletBalancesBarChart />);
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (useWalletBalancesData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch data",
    });

    await act(async () => {
      render(<WalletBalancesBarChart />);
    });

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("renders chart with data and calculates trend", async () => {
    const mockData = [
      { walletAddress: "wallet1", balance: 100 },
      { walletAddress: "wallet2", balance: 200 },
    ];

    (useWalletBalancesData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    await act(async () => {
      render(<WalletBalancesBarChart />);
    });

    // Check if the chart is rendered
    expect(screen.getByText("Top Wallet Balances")).toBeInTheDocument();
    expect(screen.getByText("Balances of 10 Wallets")).toBeInTheDocument();

    // Check if the trend is displayed
    expect(
      screen.getByText("Trending up by 5.2% this month")
    ).toBeInTheDocument();
  });
});
