import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";
import { caller } from "@/trpc/server";
import { UpdateModuleForm } from "@/components/backoffice/modules";

interface EditModulePageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function EditModulePage({ params }: EditModulePageProps) {
  await adminOnlyPage();
  const { courseId, moduleId } = await params;

  // Fetch real module data
  let moduleData;
  try {
    moduleData = await caller.admin.module.getById({ id: moduleId });
  } catch {
    notFound();
  }

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/backoffice/courses/${courseId}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-2xl">Modifier le module</h1>
          <p className="text-muted-foreground">{moduleData.title}</p>
        </div>
      </div>

      {/* Form */}
      <UpdateModuleForm moduleData={moduleData} courseId={courseId} />
    </div>
  );
}
