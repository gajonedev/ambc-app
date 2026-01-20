import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminOnlyPage } from "@/server/utils";
import { Users, CreditCard, BookOpen, TrendingUp } from "lucide-react";
import { mockBackofficeStats, mockRecentStudents } from "@/lib/mock-data";

export default async function BackofficeDashboard() {
  await adminOnlyPage();

  const stats = mockBackofficeStats;
  const recentStudents = mockRecentStudents;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre formation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Apprenants inscrits
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalStudents}</div>
            <p className="text-muted-foreground text-xs">
              {stats.paidStudents} ayant payé
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Revenus totaux
            </CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {stats.totalRevenue.toLocaleString()} XOF
            </div>
            <p className="text-muted-foreground text-xs">
              {stats.paidStudents} paiements reçus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Paiements en attente
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.pendingPayments}</div>
            <p className="text-muted-foreground text-xs">
              Inscrits sans paiement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">Contenu</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {stats.totalModules} modules
            </div>
            <p className="text-muted-foreground text-xs">
              {stats.totalLessons} leçons au total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières inscriptions</CardTitle>
          <CardDescription>Les apprenants récemment inscrits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentStudents.map((student, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-muted rounded-full w-10 h-10">
                    <span className="font-medium text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {student.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      student.paid
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {student.paid ? "Payé" : "En attente"}
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    {student.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
