"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, ChevronDown, Sun, Moon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { DisconnectButton } from "../dashboard/nav-user";
import { useTheme } from "next-themes";

const routeTitles: Record<string, string> = {
  "/backoffice": "Dashboard",
  "/backoffice/modules": "Modules",
  "/backoffice/students": "Apprenants",
  "/backoffice/payments": "Paiements",
  "/backoffice/settings": "Paramètres",
  "/backoffice/help": "Aide",
};

// TODO: Replace with actual admin data from auth
const admin = {
  name: "Admin",
  email: "admin@ambitionconcept.com",
  role: "Formateur",
  avatar: "",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function BackofficeHeader() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  // Build breadcrumb items
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: { title: string; href: string; isLast: boolean }[] = [];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const title = routeTitles[currentPath] || segment;
      breadcrumbs.push({
        title,
        href: currentPath,
        isLast: index === segments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="top-0 left-0 z-10 sticky flex items-center gap-2 bg-background px-4 lg:px-6 border-b h-14 lg:h-15 shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList className="line-clamp-1">
          {breadcrumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.href}>
              {crumb.isLast ? (
                <BreadcrumbPage className="max-w-30 line-clamp-1">
                  {crumb.title}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink className="max-w-40 line-clamp-1" asChild>
                    <Link href={crumb.href}>{crumb.title}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 pr-1 pl-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src={admin.avatar} alt={admin.name} />
              <AvatarFallback className="text-xs">
                {getInitials(admin.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block font-medium text-sm">
              {admin.name}
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">{admin.name}</p>
              <p className="text-muted-foreground text-xs">{admin.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/backoffice/settings">
                <Settings className="mr-2 size-4" />
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 size-4" />
                Mon profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              {theme === "light" ? (
                <Sun className="mr-2 size-4" />
              ) : (
                <Moon className="mr-2 size-4" />
              )}
              {theme === "light" ? "Mode sombre" : "Mode clair"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DisconnectButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
