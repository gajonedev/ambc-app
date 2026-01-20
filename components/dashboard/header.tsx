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
import {
  CreditCard,
  User,
  Award,
  BarChart3,
  BookOpen,
  AlertCircleIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { DisconnectButton } from "./nav-user";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/learn": "Formation",
  "/dashboard/progress": "Progression",
  "/dashboard/certificate": "Certificat",
  "/dashboard/profile": "Profil",
  "/dashboard/payment": "Paiement",
  "/dashboard/settings": "Paramètres",
  "/dashboard/help": "Aide",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function DashboardHeader() {
  const pathname = usePathname();
  const { data, error, isPending } = authClient.useSession();

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
    <header className="flex items-center gap-2 bg-background px-4 lg:px-6 border-b h-14 lg:h-15 shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.href}>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.title}
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
      {data && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="w-7 h-7">
                <AvatarImage src={data.user.image!} alt={data.user.name} />
                <AvatarFallback className="text-xs">
                  {getInitials(data.user.name)}
                </AvatarFallback>
              </Avatar>
              {/* <ChevronDown className="size-4 text-muted-foreground" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">{data.user.name}</p>
                <p className="text-muted-foreground text-xs">
                  {data.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/learn">
                  <BookOpen className="mr-2 size-4" />
                  Formation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/progress">
                  <BarChart3 className="mr-2 size-4" />
                  Progression
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/certificate">
                  <Award className="mr-2 size-4" />
                  Certificat
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 size-4" />
                  Mon profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/payment">
                  <CreditCard className="mr-2 size-4" />
                  Paiement
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DisconnectButton />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {isPending && <Skeleton className="rounded-full w-8 h-8" />}
      {error && (
        <div className="flex justify-center items-center bg-destructive/20 px-3 rounded-md w-10 h-10 text-destructive text-sm">
          <AlertCircleIcon className="size-5" />
        </div>
      )}
    </header>
  );
}
