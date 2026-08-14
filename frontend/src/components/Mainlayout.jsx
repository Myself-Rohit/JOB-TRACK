import React from "react";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

function Mainlayout() {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default Mainlayout;
