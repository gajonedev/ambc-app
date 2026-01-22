"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { MockCourse } from "@/lib/mock-data";
import { toast } from "sonner";

export const columns: ColumnDef<MockCourse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Formation
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="min-w-[200px]">
          <Link href={`/backoffice/courses/${course.id}`}>
            <p className="font-medium">{course.title}</p>
            <p className="text-muted-foreground text-sm">/{course.slug}</p>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "instructor.name",
    header: "Formateur",
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.instructor.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="font-medium">
          {course.price.toLocaleString()} {course.currency}
        </div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Statut",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean;
      return (
        <Badge variant={isPublished ? "default" : "secondary"}>
          {isPublished ? "Publiée" : "Brouillon"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "modulesCount",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modules
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-center">
          {row.getValue("modulesCount")}
        </div>
      );
    },
  },
  {
    accessorKey: "enrolledCount",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inscrits
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-center">
          {row.getValue("enrolledCount")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
        >
          Date création
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-muted-foreground text-sm">
          {date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(course.id);
                toast.success("ID copié dans le presse-papier");
              }}
            >
              <Copy className="mr-2 w-4 h-4" />
              Copier l&apos;ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/backoffice/courses/${course.id}`}>
                <Eye className="mr-2 w-4 h-4" />
                Voir les détails
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/backoffice/courses/${course.id}/edit`}>
                <Pencil className="mr-2 w-4 h-4" />
                Modifier
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${course.slug}`} target="_blank">
                <ExternalLink className="mr-2 w-4 h-4" />
                Voir en public
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toast.warning("Fonctionnalité à implémenter");
              }}
              variant="destructive"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
