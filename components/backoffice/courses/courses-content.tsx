"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, BookOpen } from "lucide-react";
import { CoursesTable } from "./courses-table";
import { columns } from "./columns";
import { CourseFormDialog } from "./course-form-dialog";
import { StatsCardsSkeleton, CoursesTableSkeleton } from "./courses-skeleton";
import { useTRPC } from "@/trpc/client";
import { User } from "better-auth";

interface CoursesContentProps {
  user?: User;
}

export function CoursesContent({ user }: CoursesContentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const trpc = useTRPC();

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery(trpc.admin.course.list.queryOptions());

  if (isError) {
    return (
      <div className="@container space-y-6">
        <div className="flex sm:flex-row flex-col justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl tracking-tight">Formations</h1>
            <p className="text-muted-foreground">
              Gérez vos formations et leur contenu
            </p>
          </div>
        </div>
        <Card className="border-destructive">
          <CardContent className="py-8">
            <div className="text-center">
              <p className="font-medium text-destructive">
                Erreur lors du chargement des formations
              </p>
              <p className="mt-1 text-muted-foreground text-sm">
                {error?.message || "Une erreur est survenue"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalCourses = courses?.length ?? 0;
  const publishedCourses =
    courses?.filter((course) => course.isPublished).length ?? 0;

  return (
    <div className="@container space-y-6">
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Formations</h1>
          <p className="text-muted-foreground">
            Gérez vos formations et leur contenu
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus />
          Nouvelle formation
        </Button>
      </div>

      {/* Stats */}
      {isLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="gap-4 grid @md:grid-cols-2 @lg:grid-cols-2 @2xl:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="font-medium text-sm">
                Total formations
              </CardTitle>
              <BookOpen className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{totalCourses}</div>
              <p className="text-muted-foreground text-xs">
                {publishedCourses} publiée(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="font-medium text-sm">
                Total inscriptions
              </CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">56</div>
              <p className="text-muted-foreground text-xs">
                Apprenants inscrits
              </p>
            </CardContent>
          </Card>

          <Card className="@md:col-span-2 @lg:col-span-2 @2xl:col-span-1">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="font-medium text-sm">
                Revenus totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="font-bold text-2xl line-clamp-1"
                title={`200000 XOF`}
              >
                20 400 000 XOF
              </div>
              <p className="text-muted-foreground text-xs line-clamp-1">
                Toutes formations confondues
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <CoursesTableSkeleton />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Liste des formations</CardTitle>
          </CardHeader>
          <CardContent>
            <CoursesTable columns={columns} data={courses ?? []} />
          </CardContent>
        </Card>
      )}

      {/* Create Dialog */}
      <CourseFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode="create"
        user={user}
      />
    </div>
  );
}
