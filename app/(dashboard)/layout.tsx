import { ReactNode } from "react";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3.5rem",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar variant="inset" />
      <SidebarInset className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="px-4 lg:px-6 py-6 container">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
