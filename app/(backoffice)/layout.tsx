import { ReactNode } from "react";
import { BackofficeSidebar, BackofficeHeader } from "@/components/backoffice";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

export default function BackofficeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3.5rem",
        } as React.CSSProperties
      }
    >
      <BackofficeSidebar variant="inset" />
      <SidebarInset className="@container/sidebar flex flex-col min-h-screen">
        <BackofficeHeader />
        <main className="flex-1 overflow-auto">
          <div className="px-4 lg:px-6 py-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
