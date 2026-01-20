import { ForgotPasswordForm } from "@/components/auth";
import { publicOnlyPage } from "@/server/utils";

export default async function ForgotPasswordPage() {
  await publicOnlyPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-2xl tracking-tight">
          Mot de passe oublié ?
        </h1>
        <p className="text-muted-foreground">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      {/* Form */}
      <ForgotPasswordForm />
    </div>
  );
}
