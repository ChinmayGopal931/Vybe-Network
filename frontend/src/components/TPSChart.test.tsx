import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useTPSTimeSeriesData from "@/hooks/useFetchTPSData";
import TPSTimeSeriesChart from "./ui/Charts/TPSTimeSeriesChart";
import { act } from "react-dom/test-utils";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock("@/hooks/useFetchTPSData");

describe("TPSTimeSeriesChart", () => {
  it("renders loading state initially", async () => {
    (useTPSTimeSeriesData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      refresh: jest.fn(),
    });

    await act(async () => {
      render(<TPSTimeSeriesChart />);
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (useTPSTimeSeriesData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch data",
      refresh: jest.fn(),
    });

    await act(async () => {
      render(<TPSTimeSeriesChart />);
    });

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("renders chart with data and calculates trend", async () => {
    const mockData = [
      { timestamp: new Date().toISOString(), tps: 50 },
      { timestamp: new Date().toISOString(), tps: 60 },
    ];

    (useTPSTimeSeriesData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refresh: jest.fn(),
    });

    await act(async () => {
      render(<TPSTimeSeriesChart />);
    });

    // Check if the chart is rendered
    expect(
      screen.getByText("Solana Transactions Per Second")
    ).toBeInTheDocument();
    expect(screen.getByText("Real-time TPS Data")).toBeInTheDocument();

    // Check if the trend is calculated and displayed
    expect(screen.getByText("Trending up by 20.00%")).toBeInTheDocument();
  });
});
