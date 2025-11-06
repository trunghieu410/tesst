import { Sidebar } from "@/layout/Sidebar";
import { Header } from "@/layout/Header";
import { Outlet } from "react-router-dom";

export function Main() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header defaultTitle="Publisher" />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
