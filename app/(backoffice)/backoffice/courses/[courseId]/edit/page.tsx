import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";
import { caller } from "@/trpc/server";
import { CourseForm } from "@/components/backoffice/courses/course-form";

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const user = await adminOnlyPage();
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/backoffice/courses/${courseId}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-2xl tracking-tight">
            Modifier la formation
          </h1>
          <p className="text-muted-foreground">{course.title}</p>
        </div>
      </div>

      {/* Form */}
      <CourseForm mode="edit" courseData={course} user={user} />
    </div>
  );
}
