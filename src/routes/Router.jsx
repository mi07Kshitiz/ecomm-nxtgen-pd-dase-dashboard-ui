import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import HomePage from "../pages/HomePage";
import Report from "../pages/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />, 
  },
  {
    path: "/home",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />, 
      },
      {
        path: ":section/:reportId", 
        element: <Report />,
      },
      {
        path: ":section",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
