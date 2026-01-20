"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlayCircle,
  BarChart3,
  Award,
  User,
  Settings,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Formations",
    url: "/dashboard/courses",
    icon: PlayCircle,
  },
  {
    title: "Ma progression",
    url: "/dashboard/progress",
    icon: BarChart3,
  },
  {
    title: "Mes certificats",
    url: "/dashboard/certificates",
    icon: Award,
  },
  {
    title: "Profil",
    url: "/dashboard/profile",
    icon: User,
  },
];

const navSecondary = [
  {
    title: "Aide",
    url: "/dashboard/help",
    icon: HelpCircle,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

// TODO: Replace with actual user data from auth
const user = {
  name: "John Doe",
  email: "john@email.com",
  avatar: "",
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isPending, data, error } = authClient.useSession();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarRail />
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <div className="flex justify-center items-center bg-primary rounded-md w-8 h-8">
                  <span className="font-bold text-primary-foreground text-sm">
                    AC
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Ambition Concept</span>
                  <span className="text-muted-foreground text-xs">
                    Formation
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} pathname={pathname} />
        <NavSecondary
          items={navSecondary}
          pathname={pathname}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        {isPending && <Skeleton className="w-full h-10"></Skeleton>}

        {data && <NavUser user={data.user} />}
        {error && (
          <div className="flex justify-center items-center bg-destructive/20 px-3 rounded-md w-full h-10 text-destructive text-sm">
            <AlertCircle className="text-destructive" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
