import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userOnlyPage } from "@/server/utils";
import { CheckCircle, CreditCard, Shield } from "lucide-react";
import { mockCourses } from "@/lib/mock-data";

export default async function PaymentPage() {
  await userOnlyPage();

  const coursePrice = mockCourses[0]?.price ?? 50000;
  const hasPaid = false;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Paiement</h1>
        <p className="text-muted-foreground">
          {hasPaid
            ? "Votre paiement a été confirmé"
            : "Finalisez votre inscription à la formation"}
        </p>
      </div>

      {hasPaid ? (
        // Payment Confirmed
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 font-semibold text-xl">Paiement confirmé</h2>
              <p className="mb-4 text-muted-foreground">
                Vous avez un accès complet à la formation
              </p>
              <div className="text-muted-foreground text-sm">
                <p>Référence : KKP-2026-001234</p>
                <p>Date : 15 Janvier 2026</p>
                <p>Montant : {coursePrice.toLocaleString()} XOF</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Payment Required
        <>
          {/* Course Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-primary/10 rounded-lg w-16 h-16 shrink-0">
                    <span className="font-bold text-primary text-xl">AC</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      Conception de Plans Architecturaux
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Formation complète • 6 modules • 31 leçons
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>{coursePrice.toLocaleString()} XOF</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Mode de paiement</CardTitle>
              <CardDescription>
                Payez en toute sécurité avec KkiaPay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* KkiaPay Button Placeholder */}
              <div className="p-8 border-2 border-dashed rounded-lg text-center">
                <CreditCard className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
                <p className="mb-2 font-medium">Paiement sécurisé</p>
                <p className="mb-4 text-muted-foreground text-sm">
                  Mobile Money (MTN, Moov) ou Carte bancaire
                </p>
                <Button size="lg" className="w-full sm:w-auto">
                  Payer {coursePrice.toLocaleString()} XOF
                </Button>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4" />
                <span>Paiement sécurisé par KkiaPay</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
