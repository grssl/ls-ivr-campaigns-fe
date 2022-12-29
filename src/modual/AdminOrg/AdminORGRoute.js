import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAdmin from "./DashboardORGAdmin";
import ORGAdmin from ".";
import DashboardORGAdmin from "./DashboardORGAdmin";
export default function AdminORGRoute() {


  return (
    <Routes>
      <Route path="/" element={<ORGAdmin />}>
        <Route index path="/" element={<DashboardORGAdmin />} />
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="*" element={<DashboardAdmin />} />
      </Route>
    </Routes>
  );
}
