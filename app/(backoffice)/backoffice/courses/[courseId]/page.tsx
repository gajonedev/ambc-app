import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Edit,
  BookOpen,
  Users,
  Eye,
  EyeOff,
  ExternalLink,
  Plus,
  GripVertical,
  Trash2,
} from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";

interface CourseDetailPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  await adminOnlyPage();
  const { courseId } = await params;

  // TODO: Fetch real course data
  // const course = await caller.admin.course.getById({ id: courseId });

  // Mock data for now
  const course = {
    id: courseId,
    title: "Conception de Plans Architecturaux",
    slug: "conception-plans-architecturaux",
    description:
      "Apprenez à concevoir des plans architecturaux professionnels. Cette formation complète vous guidera à travers toutes les étapes de la conception.",
    price: 50000,
    currency: "XOF",
    isPublished: true,
    imageUrl: null,
    instructorName: "John Formateur",
    modulesCount: 5,
    lessonsCount: 20,
    enrolledCount: 45,
    createdAt: "2026-01-10",
  };

  // Mock modules
  const modules = [
    {
      id: "module-1",
      title: "Introduction aux plans architecturaux",
      description: "Ce module présente les bases des plans architecturaux.",
      order: 1,
      lessonsCount: 5,
      isPublished: true,
    },
    {
      id: "module-2",
      title: "Les fondamentaux du dessin technique",
      description: "Apprenez les bases du dessin technique architectural.",
      order: 2,
      lessonsCount: 5,
      isPublished: true,
    },
    {
      id: "module-3",
      title: "Maîtriser les échelles",
      description: "Comprendre et utiliser les échelles dans vos plans.",
      order: 3,
      lessonsCount: 4,
      isPublished: false,
    },
  ];

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/backoffice/courses">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl line-clamp-2 tracking-tight">
                {course.title}
              </h1>
              <Badge variant={course.isPublished ? "default" : "secondary"}>
                {course.isPublished ? "Publiée" : "Brouillon"}
              </Badge>
            </div>
            <p className="text-muted-foreground">/{course.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/courses/${course.slug}`} target="_blank">
              <ExternalLink />
              Voir
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/backoffice/courses/${courseId}/edit`}>
              <Edit />
              Modifier
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="gap-4 grid md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">Modules</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{course.modulesCount}</div>
            <p className="text-muted-foreground text-xs">
              {course.lessonsCount} leçons au total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">Apprenants</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{course.enrolledCount}</div>
            <p className="text-muted-foreground text-xs">Inscrits à ce cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">Prix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {course.price.toLocaleString()} {course.currency}
            </div>
            <p className="text-muted-foreground text-xs">Par apprenant</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Modules & Leçons</TabsTrigger>
          <TabsTrigger value="students">Apprenants</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          {/* Modules Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">Modules du cours</h2>
              <p className="text-muted-foreground text-sm">
                Organisez le contenu de votre formation
              </p>
            </div>
            <Button asChild>
              <Link href={`/backoffice/courses/${courseId}/modules/new`}>
                <Plus />
                Nouveau module
              </Link>
            </Button>
          </div>

          {/* Modules List */}
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              {modules.length === 0 ? (
                <div className="py-8 text-center">
                  <BookOpen className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
                  <h3 className="mb-1 font-medium">Aucun module</h3>
                  <p className="mb-4 text-muted-foreground text-sm">
                    Créez votre premier module pour commencer
                  </p>
                  <Button asChild>
                    <Link href={`/backoffice/courses/${courseId}/modules/new`}>
                      <Plus />
                      Créer un module
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center gap-4 bg-muted/50 hover:bg-muted p-4 rounded-lg transition-colors"
                    >
                      <button className="text-muted-foreground hover:text-foreground cursor-grab">
                        <GripVertical className="w-5 h-5" />
                      </button>

                      <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10 shrink-0">
                        <span className="font-semibold text-primary">
                          {module.order}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/backoffice/courses/${courseId}/modules/${module.id}/lessons`}
                          className="hover:underline"
                        >
                          <h3 className="font-medium truncate">
                            {module.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                          {module.lessonsCount} leçons
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            module.isPublished
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {module.isPublished ? (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Publié
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Brouillon
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            href={`/backoffice/courses/${courseId}/modules/${module.id}/lessons`}
                          >
                            <BookOpen className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            href={`/backoffice/courses/${courseId}/modules/${module.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {modules.length > 0 && (
                <Button variant="outline" asChild>
                  <Link href={`/backoffice/courses/${courseId}/modules`}>
                    Voir tous les modules
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Apprenants inscrits</CardTitle>
              <CardDescription>
                Liste des apprenants inscrits à cette formation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-muted-foreground text-center">
                Fonctionnalité à implémenter
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du cours</CardTitle>
              <CardDescription>
                Gérez les paramètres avancés de cette formation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-muted-foreground text-center">
                Fonctionnalité à implémenter
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
