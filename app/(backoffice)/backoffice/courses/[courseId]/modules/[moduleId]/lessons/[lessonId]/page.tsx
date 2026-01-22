import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  Play,
  Trash2,
  FileText,
} from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";

interface EditLessonPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>;
}

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  await adminOnlyPage();
  const { courseId, moduleId, lessonId } = await params;

  // TODO: Fetch real lesson data
  // const lesson = await caller.admin.lesson.getById({ id: lessonId });

  // Mock data
  const lesson = {
    id: lessonId,
    title: "Qu'est-ce qu'un plan architectural ?",
    description:
      "Dans cette leçon, nous allons découvrir ce qu'est un plan architectural et pourquoi il est essentiel dans tout projet de construction.",
    duration: "12:00",
    order: 1,
    isPublished: true,
    videoUrl: "https://example.com/video.mp4",
    resources: [
      { id: "res-1", name: "Guide PDF", size: "2.4 MB" },
      { id: "res-2", name: "Fichiers exemples.zip", size: "15 MB" },
    ],
  };

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-2xl">Modifier la leçon</h1>
          <p className="text-muted-foreground">{lesson.title}</p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de la leçon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la leçon *</Label>
              <Input id="title" defaultValue={lesson.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={lesson.description}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordre d&apos;affichage</Label>
              <Input
                id="order"
                type="number"
                min="1"
                defaultValue={lesson.order}
                className="w-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Video */}
        <Card>
          <CardHeader>
            <CardTitle>Vidéo</CardTitle>
            <CardDescription>Vidéo actuelle de la leçon</CardDescription>
          </CardHeader>
          <CardContent>
            {lesson.videoUrl ? (
              <div className="space-y-4">
                {/* Video Preview */}
                <div className="flex justify-center items-center bg-black rounded-lg aspect-video">
                  <div className="text-white text-center">
                    <div className="flex justify-center items-center bg-white/20 mx-auto mb-2 rounded-full w-16 h-16">
                      <Play className="ml-1 w-8 h-8 text-white" />
                    </div>
                    <p className="text-white/60 text-sm">
                      Durée : {lesson.duration}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline">
                    Remplacer la vidéo
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-destructive"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed rounded-lg text-center">
                <Upload className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
                <p className="mb-1 font-medium">
                  Glissez-déposez votre vidéo ici
                </p>
                <p className="mb-4 text-muted-foreground text-sm">
                  ou cliquez pour sélectionner
                </p>
                <Button type="button" variant="outline">
                  Sélectionner un fichier
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Ressources téléchargeables</CardTitle>
            <CardDescription>
              Fichiers que les apprenants peuvent télécharger
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lesson.resources.length > 0 && (
                <div className="space-y-2">
                  {lesson.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex justify-between items-center bg-muted/50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{resource.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {resource.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button type="button" variant="outline">
                <Plus className="mr-2 w-4 h-4" />
                Ajouter une ressource
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Publishing */}
        <Card>
          <CardHeader>
            <CardTitle>Publication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="published">Publier la leçon</Label>
                <p className="text-muted-foreground text-sm">
                  Rendre cette leçon visible aux apprenants
                </p>
              </div>
              <Switch id="published" defaultChecked={lesson.isPublished} />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button type="submit">Enregistrer</Button>
            <Button type="button" variant="outline" asChild>
              <Link
                href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons`}
              >
                Annuler
              </Link>
            </Button>
          </div>
          <Button type="button" variant="destructive">
            <Trash2 className="mr-2 w-4 h-4" />
            Supprimer
          </Button>
        </div>
      </form>
    </div>
  );
}
