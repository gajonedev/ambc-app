import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { CreateModuleForm } from "@/components/backoffice/modules";
import { caller } from "@/trpc/server";

interface NewModulePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function NewModulePage({ params }: NewModulePageProps) {
  await adminOnlyPage();
  const { courseId } = await params;

  // Récupérer le nombre de modules pour définir l'ordre par défaut
  const modules = await caller.admin.module.listByCourse({ courseId });
  const defaultOrder = modules.length + 1;

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
          <h1 className="font-bold text-2xl">Nouveau module</h1>
          <p className="text-muted-foreground">
            Créez un nouveau module pour cette formation
          </p>
        </div>
      </div>

      {/* Form */}
      <CreateModuleForm courseId={courseId} defaultOrder={defaultOrder} />
    </div>
  );
}
