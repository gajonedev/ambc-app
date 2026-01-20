import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockStudents } from "@/lib/mock-data";

export default function StudentsPage() {
  const students = mockStudents;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl">Apprenants</h1>
        <p className="text-muted-foreground">Gérez vos apprenants inscrits</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="relative flex-1">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
              <Input
                placeholder="Rechercher un apprenant..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Tous
              </Button>
              <Button variant="outline" size="sm">
                Payés
              </Button>
              <Button variant="outline" size="sm">
                En attente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les apprenants ({students.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Apprenant
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Téléphone
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Progression
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Paiement
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">
                    Inscrit le
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-muted/50 last:border-0 border-b"
                  >
                    <td className="px-4 py-3">
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
                          <p className="font-medium">{student.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{student.phone}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted rounded-full w-16 h-2 overflow-hidden">
                          <div
                            className="bg-primary rounded-full h-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={student.paid ? "default" : "secondary"}>
                        {student.paid ? "Payé" : "En attente"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {student.joinedAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                          <DropdownMenuItem>
                            Voir la progression
                          </DropdownMenuItem>
                          {!student.paid && (
                            <DropdownMenuItem>
                              Activer l&apos;accès
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            Suspendre
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
