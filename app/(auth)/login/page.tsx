import Link from "next/link";
import { LoginForm } from "@/components/auth";
import { publicOnlyPage } from "@/server/utils";

export default async function LoginPage() {
  await publicOnlyPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-2xl tracking-tight">Connexion</h1>
        <p className="text-muted-foreground">
          Connectez-vous à votre compte pour accéder à la formation
        </p>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Footer */}
      <div className="text-sm text-center">
        <span className="text-muted-foreground">Pas encore de compte ? </span>
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          S&apos;inscrire
        </Link>
      </div>
    </div>
  );
}
