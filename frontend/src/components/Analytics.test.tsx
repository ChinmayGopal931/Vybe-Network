import { render, screen } from "@testing-library/react";
import Analytics from "@/pages/AnalyticsWithShadcn";

// Mock the child components
jest.mock("@/components/ui/Charts/MarketCapPieChart", () => () => (
  <div data-testid="market-cap-chart" />
));
jest.mock("@/components/ui/Charts/TPSTimeSeriesChart", () => {
  return function TPSTimeSeriesChart() {
    return <div data-testid="tps-time-series-chart" />;
  };
});
jest.mock("@/components/ui/Charts/WalletBalanceChart", () => {
  return function WalletBalancesBarChart() {
    return <div data-testid="wallet-balances-chart" />;
  };
});

describe("Analytics", () => {
  it("renders the analytics page with all charts", () => {
    render(<Analytics />);

    // Check if the main title is rendered
    expect(screen.getByText("Vybe Analytics")).toBeInTheDocument();

    // Check if the child components are rendered
    expect(screen.getByTestId("market-cap-chart")).toBeInTheDocument();
    expect(screen.getByTestId("tps-time-series-chart")).toBeInTheDocument();
    expect(screen.getByTestId("wallet-balances-chart")).toBeInTheDocument();
  });
});
