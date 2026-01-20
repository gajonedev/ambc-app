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
import { Separator } from "@/components/ui/separator";
import { userOnlyPage } from "@/server/utils";
import { Camera } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

export default async function ProfilePage() {
  await userOnlyPage();

  const user = mockUser;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Mon profil</h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles
        </p>
      </div>

      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="flex justify-center items-center bg-muted rounded-full w-24 h-24">
                <span className="font-semibold text-muted-foreground text-3xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
              <Button variant="outline" size="sm">
                Changer la photo
              </Button>
              <p className="mt-2 text-muted-foreground text-xs">
                JPG, PNG. Max 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Mettez à jour vos informations de profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" defaultValue={user.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>

            <Button>Enregistrer</Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Changer le mot de passe</CardTitle>
          <CardDescription>
            Assurez-vous d&apos;utiliser un mot de passe fort
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input id="currentPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input id="newPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmer le nouveau mot de passe
              </Label>
              <Input id="confirmPassword" type="password" />
            </div>

            <Button>Changer le mot de passe</Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations du compte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Membre depuis</p>
              <p className="text-muted-foreground text-sm">{user.joinedAt}</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-destructive">
                Supprimer le compte
              </p>
              <p className="text-muted-foreground text-sm">
                Cette action est irréversible
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
