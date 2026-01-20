import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download } from "lucide-react";
import {
  mockPayments,
  mockPaymentStats,
  mockPaymentStatusConfig,
} from "@/lib/mock-data";

export default function PaymentsPage() {
  const payments = mockPayments;
  const stats = mockPaymentStats;
  const statusConfig = mockPaymentStatusConfig;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Paiements</h1>
          <p className="text-muted-foreground">
            Suivez les paiements des apprenants
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 w-4 h-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="gap-4 grid md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-sm">
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {stats.total.toLocaleString()} XOF
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-sm">Complétés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-green-600 text-2xl">
              {stats.completed}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-sm">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-yellow-600 text-2xl">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-sm">Échoués</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-red-600 text-2xl">
              {stats.failed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
            <Input
              placeholder="Rechercher par nom ou référence..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Référence
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Apprenant
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Montant
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Statut
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-muted/50 last:border-0 border-b"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm">{payment.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{payment.student}</p>
                        <p className="text-muted-foreground text-sm">
                          {payment.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {payment.amount.toLocaleString()} XOF
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          statusConfig[
                            payment.status as keyof typeof statusConfig
                          ].variant
                        }
                      >
                        {
                          statusConfig[
                            payment.status as keyof typeof statusConfig
                          ].label
                        }
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {payment.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
