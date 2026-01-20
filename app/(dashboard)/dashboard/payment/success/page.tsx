import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";
import { userOnlyPage } from "@/server/utils";

export default async function PaymentSuccessPage() {
  await userOnlyPage();

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 mx-auto mb-6 rounded-full w-20 h-20">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="mb-2 font-bold text-2xl">Paiement réussi !</h1>
          <p className="mb-6 text-muted-foreground">
            Félicitations ! Vous avez maintenant accès à la formation complète.
          </p>

          <div className="bg-muted/50 mb-6 p-4 rounded-lg">
            <p className="text-muted-foreground text-sm">Référence</p>
            <p className="font-mono font-medium">KKP-2026-001234</p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/dashboard/learn">
                <BookOpen className="mr-2 w-4 h-4" />
                Commencer la formation
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/dashboard">
                Aller au tableau de bord
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
