import Link from "next/link";
import { VerifyOtpForm } from "@/components/auth";
import { ArrowLeft } from "lucide-react";
import { unverifiedUserOnlyPage } from "@/server/utils";

export default async function VerifyPage() {
  await unverifiedUserOnlyPage();

  // TODO: Get email from query params or state
  const email = "utilisateur@email.com";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-2xl tracking-tight">Vérification</h1>
        <p className="text-muted-foreground">
          Entrez le code de vérification à 6 chiffres
        </p>
      </div>

      {/* Form */}
      <VerifyOtpForm email={email} />

      {/* Back Link */}
      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
