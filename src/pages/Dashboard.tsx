import { Sidebar } from "@/layout/Sidebar";
import { Header } from "@/layout/Header";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header defaultTitle="Publisher" />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
