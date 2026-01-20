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
import { Camera } from "lucide-react";
import { mockSettings } from "@/lib/mock-data";

export default function SettingsPage() {
  const settings = mockSettings;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl">Paramètres</h1>
        <p className="text-muted-foreground">Configurez votre formation</p>
      </div>

      {/* Course Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tarification</CardTitle>
          <CardDescription>
            Définissez le prix de votre formation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="gap-4 grid grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Prix de la formation</Label>
                <Input
                  id="price"
                  type="number"
                  defaultValue={settings.coursePrice}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Input
                  id="currency"
                  defaultValue={settings.courseCurrency}
                  disabled
                />
              </div>
            </div>
            <Button>Enregistrer</Button>
          </form>
        </CardContent>
      </Card>

      {/* Instructor Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profil du formateur</CardTitle>
          <CardDescription>
            Ces informations seront affichées sur la page publique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="flex justify-center items-center bg-muted rounded-full w-24 h-24">
                  <span className="font-semibold text-muted-foreground text-3xl">
                    AC
                  </span>
                </div>
                <button
                  type="button"
                  className="right-0 bottom-0 absolute flex justify-center items-center bg-primary rounded-full w-8 h-8 text-primary-foreground"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <Button variant="outline" size="sm" type="button">
                  Changer la photo
                </Button>
                <p className="mt-2 text-muted-foreground text-xs">
                  JPG, PNG. Max 2MB
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructorName">Nom du formateur</Label>
              <Input
                id="instructorName"
                defaultValue={settings.instructorName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructorBio">Biographie</Label>
              <Textarea
                id="instructorBio"
                defaultValue={settings.instructorBio}
                rows={4}
              />
              <p className="text-muted-foreground text-xs">
                Cette biographie sera affichée sur la landing page
              </p>
            </div>

            <Button>Enregistrer</Button>
          </form>
        </CardContent>
      </Card>

      {/* KkiaPay Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration KkiaPay</CardTitle>
          <CardDescription>Clés API pour les paiements</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kkiapayPublic">Clé publique</Label>
              <Input
                id="kkiapayPublic"
                type="password"
                placeholder="pk_xxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kkiapayPrivate">Clé privée</Label>
              <Input
                id="kkiapayPrivate"
                type="password"
                placeholder="sk_xxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kkiapaySecret">Secret webhook</Label>
              <Input
                id="kkiapaySecret"
                type="password"
                placeholder="whsec_xxxxx"
              />
            </div>

            <Button>Enregistrer</Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Zone de danger</CardTitle>
          <CardDescription>Actions irréversibles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Réinitialiser les données</p>
              <p className="text-muted-foreground text-sm">
                Supprimer toutes les données de test
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
