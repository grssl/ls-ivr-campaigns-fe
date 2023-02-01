import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminIndex from "./index";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AllUsers from './pages/AllUsers';
import BaseUpload from './pages/BaseUpload';
import AllCampaigns from './pages/AllCampaigns';
import AllReportManagment from "./pages/AllReportManagment";
import ElastixAllReportManagment from './pages/ElastixAllReportManagment';
import AgentPerformance from "./pages/AgentPerformance";

export default function DevRoute() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SuperAdminIndex />}>
          <Route index path="/" element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="user" element={<AllUsers />} />
          <Route path="baseupload" element={<BaseUpload />} />
          <Route path="campaign" element={<AllCampaigns />} />
          <Route path="reports" element={<AllReportManagment />} />
          <Route path="elastix" element={<ElastixAllReportManagment />} />
          <Route path="performance" element={<AgentPerformance />} />
          <Route path="*" element={<SuperAdminDashboard />} />
        </Route>
      </Routes>

    </>
  );
}
