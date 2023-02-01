import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from ".";
import DashboardAdmin from "./DashboardAdmin";
export default function AdminRoute() {

  return (
    <Routes>
      <Route path="/" element={<Admin />}>
        <Route index path="/" element={<DashboardAdmin />} />
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="*" element={<DashboardAdmin />} />
      </Route>
    </Routes>
  );
}
