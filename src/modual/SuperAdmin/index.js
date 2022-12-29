import React from "react";
import { Outlet } from "react-router-dom";
export default function SuperAdminIndex() {
  return (
    <div className="px-4">
      <Outlet />
    </div>

  );
}
