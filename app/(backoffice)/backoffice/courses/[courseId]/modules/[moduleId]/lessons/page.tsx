import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Video,
  Eye,
  EyeOff,
} from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";

interface ModuleLessonsPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function ModuleLessonsPage({
  params,
}: ModuleLessonsPageProps) {
  await adminOnlyPage();
  const { courseId, moduleId } = await params;

  // TODO: Fetch real module and lessons data
  // const module = await caller.admin.module.getById({ id: moduleId });
  // const lessons = await caller.admin.lesson.listByModule({ moduleId });

  // Mock data
  const moduleData = {
    id: moduleId,
    title: "Introduction aux plans architecturaux",
    description: "Ce module présente les bases des plans architecturaux.",
    order: 1,
  };

  const lessons = [
    {
      id: "lesson-1",
      title: "Qu'est-ce qu'un plan architectural ?",
      duration: "12:00",
      order: 1,
      isPublished: true,
    },
    {
      id: "lesson-2",
      title: "Les différents types de plans",
      duration: "18:00",
      order: 2,
      isPublished: true,
    },
    {
      id: "lesson-3",
      title: "Les outils nécessaires",
      duration: "15:00",
      order: 3,
      isPublished: false,
    },
    {
      id: "lesson-4",
      title: "Votre environnement de travail",
      duration: "10:00",
      order: 4,
      isPublished: false,
    },
  ];

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/backoffice/courses/${courseId}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1 text-muted-foreground text-sm">
              <Link
                href={`/backoffice/courses/${courseId}`}
                className="hover:underline"
              >
                Retour au cours
              </Link>
              <span>/</span>
              <span>Module {moduleData.order}</span>
            </div>
            <h1 className="font-bold text-2xl">{moduleData.title}</h1>
            <p className="text-muted-foreground">{moduleData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/backoffice/courses/${courseId}/modules/${moduleId}`}>
              <Edit className="mr-2 w-4 h-4" />
              Modifier le module
            </Link>
          </Button>
          <Button asChild>
            <Link
              href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons/new`}
            >
              <Plus className="mr-2 w-4 h-4" />
              Nouvelle leçon
            </Link>
          </Button>
        </div>
      </div>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle>Leçons ({lessons.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
            <div className="py-8 text-center">
              <Video className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
              <h3 className="mb-1 font-medium">Aucune leçon</h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Créez votre première leçon pour ce module
              </p>
              <Button asChild>
                <Link
                  href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons/new`}
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Créer une leçon
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-4 bg-muted/50 hover:bg-muted p-4 rounded-lg transition-colors"
                >
                  <button className="text-muted-foreground hover:text-foreground cursor-grab">
                    <GripVertical className="w-5 h-5" />
                  </button>

                  <div className="flex justify-center items-center bg-primary/10 rounded w-10 h-10 shrink-0">
                    <Video className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}
                      className="hover:underline"
                    >
                      <h3 className="font-medium truncate">
                        {index + 1}. {lesson.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {lesson.duration}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        lesson.isPublished
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {lesson.isPublished ? (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Publié
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> Brouillon
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
