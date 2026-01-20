"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

import { NavMain } from "@/components/backoffice/nav-main";
import { NavSecondary } from "@/components/backoffice/nav-secondary";
import { NavUser } from "@/components/backoffice/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navMain = [
  {
    title: "Dashboard",
    url: "/backoffice",
    icon: LayoutDashboard,
  },
  {
    title: "Formations",
    url: "/backoffice/courses",
    icon: GraduationCap,
  },
  {
    title: "Modules & Leçons",
    url: "/backoffice/modules",
    icon: BookOpen,
  },
  {
    title: "Apprenants",
    url: "/backoffice/students",
    icon: Users,
  },
  {
    title: "Paiements",
    url: "/backoffice/payments",
    icon: CreditCard,
  },
];

const navSecondary = [
  {
    title: "Paramètres",
    url: "/backoffice/settings",
    icon: Settings,
  },
  {
    title: "Aide",
    url: "/backoffice/help",
    icon: HelpCircle,
  },
  {
    title: "Voir le site",
    url: "/",
    icon: ExternalLink,
    external: true,
  },
];

// TODO: Replace with actual admin data from auth
const admin = {
  name: "Admin",
  email: "admin@ambitionconcept.com",
  role: "Formateur",
  avatar: "",
};

export function BackofficeSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="p-1.5!">
              <Link href="/backoffice">
                <div className="flex justify-center items-center bg-primary rounded-md w-8 h-8">
                  <span className="font-bold text-primary-foreground text-sm">
                    AC
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Ambition Concept</span>
                  <span className="text-muted-foreground text-xs">
                    Backoffice
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
        <NavUser user={admin} />
      </SidebarFooter>
    </Sidebar>
  );
}
