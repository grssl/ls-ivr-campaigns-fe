import React from "react";
import { Route, Routes } from "react-router-dom";
import AgentPage from ".";
import DashboardAgent from "./DashboardAgent";
import ManualCallingComponent from "./pages/ManualCallingComponent";
export default function AgentRoute() {
  return (
    <Routes>
      <Route path="/" element={<AgentPage />}>
        <Route index path="/" element={<DashboardAgent />} />
        <Route path="dashboard" element={<DashboardAgent />} />
        <Route path="calling" element={<ManualCallingComponent />} />
        <Route path="*" element={<DashboardAgent />} />
      </Route>
    </Routes>
  );
}
