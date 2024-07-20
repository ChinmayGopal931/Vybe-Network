import React from "react";
import { render, screen, act } from "@testing-library/react";
import useMarketCapData from "@/hooks/useFetchMarketCapData";
import MarketCapPieChart from "./ui/Charts/MarketCapPieChart";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
jest.mock("@/hooks/useFetchMarketCapData");

describe("MarketCapPieChart", () => {
  it("renders loading state initially", async () => {
    (useMarketCapData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    await act(async () => {
      render(<MarketCapPieChart />);
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (useMarketCapData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch data",
    });

    await act(async () => {
      render(<MarketCapPieChart />);
    });

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("renders chart with data and calculates trend", async () => {
    const mockData = [
      { tokenAddress: "token1", marketCap: 100 },
      { tokenAddress: "token2", marketCap: 200 },
    ];

    (useMarketCapData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    await act(async () => {
      render(<MarketCapPieChart />);
    });

    // Check if the chart is rendered
    expect(screen.getByText("Market Cap Distribution")).toBeInTheDocument();
    expect(screen.getByText("Top 5 SPL Tokens")).toBeInTheDocument();

    // Check if the trend is displayed
    expect(
      screen.getByText("Trending up by 5.2% this month")
    ).toBeInTheDocument();
  });
});
