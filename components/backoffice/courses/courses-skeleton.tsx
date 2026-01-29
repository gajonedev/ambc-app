import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardsSkeleton() {
  return (
    <div className="gap-4 grid @md:grid-cols-2 @lg:grid-cols-2 @2xl:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className={
            i === 3 ? "@md:col-span-2 @lg:col-span-2 @2xl:col-span-1" : ""
          }
        >
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="rounded w-4 h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 w-16 h-8" />
            <Skeleton className="w-20 h-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CoursesTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-40 h-6" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and filters */}
        <div className="flex justify-between gap-4">
          <Skeleton className="w-64 h-10" />
          <div className="flex gap-2">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
        </div>

        {/* Table header */}
        <div className="border rounded-md">
          <div className="flex items-center gap-4 p-4 border-b">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="rounded-full w-10 h-10" />
            <Skeleton className="flex-1 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-8 h-4" />
          </div>

          {/* Table rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border-b last:border-b-0"
            >
              <Skeleton className="w-4 h-4" />
              <Skeleton className="rounded-full w-10 h-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-32 h-3" />
              </div>
              <Skeleton className="w-20 h-4" />
              <Skeleton className="rounded-full w-16 h-6" />
              <Skeleton className="w-8 h-4" />
              <Skeleton className="w-8 h-8" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <Skeleton className="w-32 h-4" />
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CoursesPageSkeleton() {
  return (
    <div className="@container space-y-6">
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-64 h-4" />
        </div>
        <Skeleton className="w-40 h-10" />
      </div>

      {/* Stats */}
      <StatsCardsSkeleton />

      {/* Table */}
      <CoursesTableSkeleton />
    </div>
  );
}
