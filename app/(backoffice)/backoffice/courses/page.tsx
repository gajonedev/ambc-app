import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Users,
  BookOpen,
} from "lucide-react";
import { mockCourses, mockCourseStats } from "@/lib/mock-data";

export default function BackofficeCoursesPage() {
  const stats = mockCourseStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Formations</h1>
          <p className="text-muted-foreground">
            Gérez vos formations et leur contenu
          </p>
        </div>
        <Button asChild>
          <Link href="/backoffice/courses/new">
            <Plus className="mr-2 w-4 h-4" />
            Nouvelle formation
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="gap-4 grid @md/container:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Total formations
            </CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalCourses}</div>
            <p className="text-muted-foreground text-xs">
              {stats.publishedCourses} publiée(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Total inscriptions
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalEnrollments}</div>
            <p className="text-muted-foreground text-xs">Apprenants inscrits</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {stats.totalRevenue.toLocaleString()} XOF
            </div>
            <p className="text-muted-foreground text-xs">
              Toutes formations confondues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des formations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formation</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-center">Modules</TableHead>
                <TableHead className="text-center">Inscrits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-muted-foreground text-sm">
                        /{course.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.price.toLocaleString()} {course.currency}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={course.isPublished ? "default" : "secondary"}
                    >
                      {course.isPublished ? "Publiée" : "Brouillon"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {course.modulesCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {course.enrolledCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/backoffice/courses/${course.id}`}>
                            <Eye className="mr-2 w-4 h-4" />
                            Voir
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/backoffice/courses/${course.id}/edit`}>
                            <Pencil className="mr-2 w-4 h-4" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 w-4 h-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
