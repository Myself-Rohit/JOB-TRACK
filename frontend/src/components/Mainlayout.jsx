import React from "react";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function Mainlayout() {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <Outlet className={"w-[calc(100vw-68px)] px-10"} />
    </div>
  );
}

export default Mainlayout;
