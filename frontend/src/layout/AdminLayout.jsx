import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../components/ui/sidebar";
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayoutInner = () => {
  const { state, isMobile } = useSidebar();
  const sidebarWidth = isMobile
    ? "w-0"
    : state === "collapsed"
    ? "w-12"
    : "w-64";

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`${sidebarWidth} flex-shrink-0 transition-all duration-200`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 overflow-x-auto">
        <SidebarInset>
          <SidebarTrigger className="-ml-1 md:hidden fixed top-4 left-4 z-20 bg-sidebar-accent p-4" />
          <Outlet />
        </SidebarInset>
      </div>
    </div>
  );
};

const AdminLayout = () => (
  <SidebarProvider>
    <AdminLayoutInner />
  </SidebarProvider>
);

export default AdminLayout;
