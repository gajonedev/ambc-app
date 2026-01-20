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
import { ArrowLeft } from "lucide-react";

export default function NewModulePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/backoffice/modules">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-2xl">Nouveau module</h1>
          <p className="text-muted-foreground">
            Créez un nouveau module pour votre formation
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informations du module</CardTitle>
          <CardDescription>
            Remplissez les informations de base du module
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du module *</Label>
              <Input
                id="title"
                placeholder="Ex: Introduction aux plans architecturaux"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez le contenu de ce module..."
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
              <p className="text-muted-foreground text-xs">
                Position du module dans la liste
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button type="submit">Créer le module</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/backoffice/modules">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
