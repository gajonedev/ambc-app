"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CoursesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const statusFilter = columnFilters.find((f) => f.id === "isPublished");
  const hasActiveFilters = statusFilter !== undefined || globalFilter !== "";

  const clearFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex sm:flex-row flex-col justify-between items-start gap-4">
        {/* Search & Filters */}
        <div className="flex flex-wrap flex-1 items-center gap-2">
          <div className="relative w-full lg:w-[300px]">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
            <Input
              placeholder="Rechercher une formation..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal className="mr-2 w-4 h-4" />
                <span className="md-hidden">Statut</span>
                {statusFilter && (
                  <Badge variant="secondary" className="ml-2 px-1.5">
                    {Array.isArray(statusFilter.value)
                      ? statusFilter.value.length
                      : "1"}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[150px]">
              <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={
                  statusFilter?.value === true ||
                  (Array.isArray(statusFilter?.value) &&
                    statusFilter?.value.includes(true))
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    table.getColumn("isPublished")?.setFilterValue([true]);
                  } else {
                    table.getColumn("isPublished")?.setFilterValue(undefined);
                  }
                }}
              >
                Publiée
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  statusFilter?.value === false ||
                  (Array.isArray(statusFilter?.value) &&
                    statusFilter?.value.includes(false))
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    table.getColumn("isPublished")?.setFilterValue([false]);
                  } else {
                    table.getColumn("isPublished")?.setFilterValue(undefined);
                  }
                }}
              >
                Brouillon
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={clearFilters}
            >
              <X className="mr-2 w-4 h-4" />
              Réinitialiser
            </Button>
          )}
        </div>
      </div>

      {/* TODO: === */}
      {/* Selected Rows Info */}
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
          <span className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} formation(s)
            sélectionnée(s)
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => table.resetRowSelection()}
          >
            Désélectionner
          </Button>
        </div>
      )} */}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center gap-2 py-8">
                    <p className="text-muted-foreground">
                      Aucune formation trouvée.
                    </p>
                    {hasActiveFilters && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={clearFilters}
                        className="text-sm"
                      >
                        Réinitialiser les filtres
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex sm:flex-row flex-col justify-between items-center gap-4 px-2">
        {/* <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span>
            {table.getFilteredRowModel().rows.length} formation(s) au total
          </span>
        </div> */}

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Lignes par page</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex sm:flex-row flex-col items-center gap-4">
          {/* Rows per page */}

          {/* Page info */}
          <div className="text-muted-foreground text-sm">
            Page {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Première page</span>
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Page précédente</span>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Page suivante</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Dernière page</span>
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
