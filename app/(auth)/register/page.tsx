import Link from "next/link";
import { RegisterForm } from "@/components/auth";
import { publicOnlyPage } from "@/server/utils";

export default async function RegisterPage() {
  await publicOnlyPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-2xl tracking-tight">Créer un compte</h1>
        <p className="text-muted-foreground">
          Inscrivez-vous pour accéder à la formation complète
        </p>
      </div>

      {/* Form */}
      <RegisterForm />

      {/* Footer */}
      <div className="space-y-4">
        <div className="text-sm text-center">
          <span className="text-muted-foreground">Déjà inscrit ? </span>
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Se connecter
          </Link>
        </div>

        <p className="text-muted-foreground text-xs text-center">
          En vous inscrivant, vous acceptez nos{" "}
          <Link href="/terms" className="hover:text-foreground underline">
            Conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="hover:text-foreground underline">
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
