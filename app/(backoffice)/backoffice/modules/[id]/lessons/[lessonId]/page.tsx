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
import { ArrowLeft, Upload, Plus, X, Play } from "lucide-react";
import { mockLessonDetail } from "@/lib/mock-data";

interface EditLessonPageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  const { id, lessonId } = await params;

  const lesson = {
    ...mockLessonDetail,
    id: lessonId,
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/backoffice/modules/${id}/lessons`}>
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
                  <Button variant="outline">Remplacer la vidéo</Button>
                  <Button variant="ghost" className="text-destructive">
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
                <Button variant="outline">Sélectionner un fichier</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Ressources téléchargeables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lesson?.resources?.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{resource.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {resource.size}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 w-4 h-4" />
                Ajouter une ressource
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label>Publier la leçon</Label>
                <p className="text-muted-foreground text-sm">
                  Rendre cette leçon visible pour les apprenants
                </p>
              </div>
              <Switch defaultChecked={lesson.published} />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button variant="destructive" type="button">
            Supprimer la leçon
          </Button>
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href={`/backoffice/modules/${id}/lessons`}>Annuler</Link>
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
