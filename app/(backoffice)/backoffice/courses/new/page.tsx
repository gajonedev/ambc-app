import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminOnlyPage } from "@/server/utils";
import { Button } from "@/components/ui/button";
import { CreateCourseForm } from "@/components/backoffice/courses/create-course-form";

export default async function NewCoursePage() {
  const user = await adminOnlyPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/backoffice/courses">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-2xl tracking-tight">
            Nouvelle formation
          </h1>
          <p className="text-muted-foreground">
            Créez une nouvelle formation pour vos apprenants
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <CreateCourseForm user={user} />
      </div>
    </div>
  );
}
