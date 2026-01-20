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
import { getModuleById } from "@/lib/mock-data";

interface ModuleLessonsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModuleLessonsPage({
  params,
}: ModuleLessonsPageProps) {
  const { id } = await params;

  const moduleData = getModuleById(id);
  const module = {
    id,
    title: moduleData.title,
    description:
      moduleData.description ??
      "Ce module présente les bases des plans architecturaux.",
  };

  const lessons = moduleData.lessons.map((l, index) => ({
    id: l.id ?? String(index + 1),
    title: l.title,
    duration: l.duration?.replace(" min", ":00") ?? "10:00",
    published: l.published ?? false,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/backoffice/modules">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-2xl">{module.title}</h1>
            <p className="text-muted-foreground">
              Gérez les leçons de ce module
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/backoffice/modules/${id}/lessons/new`}>
            <Plus className="mr-2 w-4 h-4" />
            Nouvelle leçon
          </Link>
        </Button>
      </div>

      {/* Module Info */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-base">Informations du module</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/backoffice/modules/${id}/edit`}>
              <Edit className="mr-2 w-4 h-4" />
              Modifier
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{module.description}</p>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle>Leçons ({lessons.length})</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <h3 className="font-medium truncate">
                    {index + 1}. {lesson.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {lesson.duration}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      lesson.published
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {lesson.published ? (
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
                      href={`/backoffice/modules/${id}/lessons/${lesson.id}`}
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

            {lessons.length === 0 && (
              <div className="py-8 text-muted-foreground text-center">
                <Video className="opacity-50 mx-auto mb-4 w-12 h-12" />
                <p>Aucune leçon dans ce module</p>
                <Button className="mt-4" asChild>
                  <Link href={`/backoffice/modules/${id}/lessons/new`}>
                    <Plus className="mr-2 w-4 h-4" />
                    Ajouter une leçon
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
