import { Suspense } from "react";
import { adminOnlyPage } from "@/server/utils";
import { trpc, HydrateClient, prefetch } from "@/trpc/server";
import { CoursesContent } from "@/components/backoffice/courses/courses-content";
import { CoursesPageSkeleton } from "@/components/backoffice/courses/courses-skeleton";

export default async function BackofficeCoursesPage() {
  const user = await adminOnlyPage();

  // Prefetch courses data
  prefetch(trpc.admin.course.list.queryOptions());

  return (
    <HydrateClient>
      <Suspense fallback={<CoursesPageSkeleton />}>
        <CoursesContent user={user} />
      </Suspense>
    </HydrateClient>
  );
}
