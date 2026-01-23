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
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { adminOnlyPage } from "@/server/utils";

interface NewLessonPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function NewLessonPage({ params }: NewLessonPageProps) {
  await adminOnlyPage();
  const { courseId, moduleId } = await params;

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
          <h1 className="font-bold text-2xl">Nouvelle leçon</h1>
          <p className="text-muted-foreground">
            Ajoutez une nouvelle leçon au module
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de la leçon</CardTitle>
            <CardDescription>
              Remplissez les informations de base
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la leçon *</Label>
              <Input
                id="title"
                placeholder="Ex: Qu'est-ce qu'un plan architectural ?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez le contenu de cette leçon..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordre d&apos;affichage</Label>
              <Input
                id="order"
                type="number"
                min="1"
                defaultValue="1"
                className="w-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Video Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Vidéo</CardTitle>
            <CardDescription>Uploadez la vidéo de la leçon</CardDescription>
          </CardHeader>
          <CardContent>
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
              <p className="mt-4 text-muted-foreground text-xs">
                Formats acceptés : MP4, MOV. Taille max : 500MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Ressources téléchargeables</CardTitle>
            <CardDescription>
              Ajoutez des fichiers que les apprenants pourront télécharger
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-2 border-dashed rounded-lg text-center">
                <Button type="button" variant="outline">
                  <Plus />
                  Ajouter une ressource
                </Button>
              </div>
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
              <Switch id="published" />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit">Créer la leçon</Button>
          <Button type="button" variant="outline" asChild>
            <Link
              href={`/backoffice/courses/${courseId}/modules/${moduleId}/lessons`}
            >
              Annuler
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
