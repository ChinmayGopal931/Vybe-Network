import { createHashRouter } from "react-router-dom";

import { AppLayout } from "./components/layouts/AppLayout";

import Analytics from "./pages/Analytics";
import AnalyticsWithShadcn from "./pages/AnalyticsWithShadcn";

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Analytics />,
      },
    ],
  },

  {
    path: "/analytics",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <AnalyticsWithShadcn />,
      },
    ],
  },
]);
