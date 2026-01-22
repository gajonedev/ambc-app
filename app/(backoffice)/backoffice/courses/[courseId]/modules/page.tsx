import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";
import { caller } from "@/trpc/server";
import { getModuleColumns, ModulesTable } from "@/components/backoffice/modules";

interface ModulesPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function ModulesPage({ params }: ModulesPageProps) {
  await adminOnlyPage();
  const { courseId } = await params;

  // Fetch course data
  let course;
  try {
    course = await caller.admin.course.getByIdOrSlug({ id: courseId });
  } catch {
    notFound();
  }

  if (!course) {
    notFound();
  }

  // Fetch modules
  const modules = await caller.admin.module.listByCourse({ courseId });

  const columns = getModuleColumns({ courseId });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/backoffice/courses/${courseId}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-2xl tracking-tight">
              Modules du cours
            </h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/backoffice/courses/${courseId}/modules/new`}>
              <Plus />
              Nouveau module
            </Link>
          </Button>
        </div>
      </div>

      {/* Modules Table */}
      <ModulesTable columns={columns} data={modules} />
    </div>
  );
}
