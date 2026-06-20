import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protected";

import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Salary from "./pages/Salary";
import Payroll from "./pages/Payroll";

import AppLayout from "./components/layout/Layout";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance",
        element: (
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "salary",
        element: (
          <ProtectedRoute>
            <Salary />
          </ProtectedRoute>
        ),
      },
      {
        path: "payroll",
        element: (
          <ProtectedRoute>
            <Payroll />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
