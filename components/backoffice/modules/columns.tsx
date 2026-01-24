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
  EyeOff,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  BookOpen,
  GripVertical,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { RouterOutputs } from "@/trpc/types";

type Module = RouterOutputs["admin"]["module"]["listByCourse"][number];

interface ColumnsProps {
  courseId: string;
}

export const getModuleColumns = ({
  courseId,
}: ColumnsProps): ColumnDef<Module>[] => [
  {
    id: "drag",
    header: "",
    cell: () => (
      <button className="text-muted-foreground hover:text-foreground cursor-grab">
        <GripVertical className="w-4 h-4" />
      </button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <p
          className="flex justify-center items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-1 w-3 h-3" />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center bg-primary/10 rounded-full w-8 h-8">
          <span className="font-semibold text-primary text-sm">
            {row.getValue("order")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titre du module
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: ({ row }) => {
      const moduleData = row.original;
      return (
        <div className="min-w-[200px]">
          <Link
            href={`/backoffice/courses/${courseId}/modules/${moduleData.id}`}
          >
            <p className="font-medium hover:underline">{moduleData.title}</p>
          </Link>
          {moduleData.description && (
            <p className="text-muted-foreground text-sm line-clamp-1">
              {moduleData.description}
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "lessonsCount",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center text-foreground text-sm cursor-pointer select-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Leçons
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </p>
      );
    },
    cell: () => {
      // TODO: Add lessons count from API
      return (
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">—</span>
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
        <Badge
          variant={isPublished ? "default" : "secondary"}
          className="gap-1"
        >
          {isPublished ? (
            <>
              <Eye className="w-3 h-3" />
              Publié
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              Brouillon
            </>
          )}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
      const moduleData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(moduleData.id);
                toast.success("ID copié dans le presse-papier");
              }}
            >
              <Copy className="mr-2 w-4 h-4" />
              Copier l&apos;ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/backoffice/courses/${courseId}/modules/${moduleData.id}/lessons`}
              >
                <BookOpen className="mr-2 w-4 h-4" />
                Voir les leçons
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/backoffice/courses/${courseId}/modules/${moduleData.id}/edit`}
              >
                <Pencil className="mr-2 w-4 h-4" />
                Modifier
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
