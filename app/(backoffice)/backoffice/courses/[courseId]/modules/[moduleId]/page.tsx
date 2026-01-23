import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Plus,
  GripVertical,
  Trash2,
  Video,
  Eye,
  EyeOff,
  BookOpen,
  Clock,
} from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";
import { caller } from "@/trpc/server";

interface ModuleDetailPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function ModuleDetailPage({
  params,
}: ModuleDetailPageProps) {
  await adminOnlyPage();
  const { courseId, moduleId } = await params;

  // Fetch module data
  let moduleData;
  try {
    moduleData = await caller.admin.module.getById({ id: moduleId });
  } catch {
    notFound();
  }

  if (!moduleData) {
    notFound();
  }

  // TODO: Fetch lessons for this module
  // const lessons = await caller.admin.lesson.listByModule({ moduleId });

  // Mock lessons for now
  const lessons = [
    {
      id: "lesson-1",
      title: "Introduction à la leçon",
      description: "Description de la première leçon",
      videoDuration: 720,
      order: 1,
      isPublished: true,
    },
    {
      id: "lesson-2",
      title: "Concepts fondamentaux",
      description: "Les bases essentielles",
      videoDuration: 1080,
      order: 2,
      isPublished: true,
    },
    {
      id: "lesson-3",
      title: "Mise en pratique",
      description: "Exercices pratiques",
      videoDuration: 900,
      order: 3,
      isPublished: false,
    },
  ];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const totalDuration = lessons.reduce(
    (acc, lesson) => acc + (lesson.videoDuration || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/backoffice/courses/${courseId}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl line-clamp-2 tracking-tight">
                {moduleData.title}
              </h1>
              <Badge variant={moduleData.isPublished ? "default" : "secondary"}>
                {moduleData.isPublished ? "Publié" : "Brouillon"}
              </Badge>
            </div>
            {moduleData.description && (
              <p className="text-muted-foreground line-clamp-2">
                {moduleData.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/backoffice/courses/${courseId}/modules/${moduleId}/edit`}>
              <Edit />
              Modifier
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Leçons</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{lessons.length}</div>
            <p className="text-muted-foreground text-xs">
              {lessons.filter((l) => l.isPublished).length} publiées
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Durée totale</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {formatDuration(totalDuration)}
            </div>
            <p className="text-muted-foreground text-xs">minutes de contenu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Ordre</CardTitle>
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">#{moduleData.order}</div>
            <p className="text-muted-foreground text-xs">dans le cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Lessons Section */}
      <Card>
        <CardHeader className="flex sm:flex-row flex-col justify-between gap-4">
          <div>
            <CardTitle>Leçons</CardTitle>
            <p className="text-muted-foreground text-sm">
              Gérez les leçons de ce module
            </p>
          </div>
          <Button asChild>
            <Link
              href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons/new`}
            >
              <Plus className="mr-2 w-4 h-4" />
              Ajouter une leçon
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Video className="mx-auto mb-4 w-12 h-12 opacity-50" />
              <p>Aucune leçon pour le moment</p>
              <p className="text-sm">
                Commencez par ajouter votre première leçon
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <button className="cursor-grab text-muted-foreground hover:text-foreground">
                    <GripVertical className="w-5 h-5" />
                  </button>
                  <div className="flex justify-center items-center bg-muted rounded-md w-10 h-10">
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{lesson.title}</h4>
                      {lesson.isPublished ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm truncate">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {formatDuration(lesson.videoDuration || 0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}/edit`}
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
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
