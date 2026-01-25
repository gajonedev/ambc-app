import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Edit,
  BookOpen,
  Users,
  Eye,
  EyeOff,
  ExternalLink,
  Plus,
  ImageIcon,
} from "lucide-react";
import { adminOnlyPage } from "@/server/utils";
import { notFound } from "next/navigation";
import { caller } from "@/trpc/server";

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

  const course = await caller.admin.course.getByIdOrSlug({
    id: courseId,
  });

  if (!course) notFound();

  const modules = await caller.admin.module.listByCourse({
    courseId: course.id,
  });

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
            {/* <p className="text-muted-foreground">/{course.slug}</p> */}
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

      {/* Course Info & Stats */}
      <div className="items-stretch gap-4 grid grid-cols-1 md:grid-cols-[460px_1fr]">
        {/* Left column — Card (image) */}
        <Card className="flex flex-col md:col-span-1 p-0 w-full h-full">
          <CardContent className="flex flex-col p-0">
            {/* Image wrapper : full height on lg so image fills the card */}
            <div className="relative bg-muted rounded-t-lg w-full h-48 overflow-hidden">
              {course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              <Badge
                variant={course.isPublished ? "default" : "secondary"}
                className="top-3 right-3 absolute"
              >
                {course.isPublished ? "Publiée" : "Brouillon"}
              </Badge>
            </div>

            {/* Body that stretches to fill remaining vertical space if needed */}
            <div className="flex-1 space-y-4 p-6">
              <p className="text-muted-foreground text-sm line-clamp-3">
                {course.description}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={course.instructorImage ?? undefined} />
                  <AvatarFallback>
                    {course.instructorName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{course.instructorName}</p>
                  <p className="text-muted-foreground text-xs">Formateur</p>
                </div>
              </div>

              <div className="gap-2 grid grid-cols-2 pt-2 border-t text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Durée totale</p>
                  {/* TODO: Replace with */}
                  <p className="font-medium">15h 30min</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Créé le</p>
                  <p className="font-medium">
                    {new Date(course.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column — stats grid */}
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 w-full">
          <Card className="flex flex-col w-full h-full">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="font-medium text-sm">Modules</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1">
              <div className="font-bold text-2xl">{modules.length}</div>
              <p className="text-muted-foreground text-xs">
                {/* TODO: Replace with */}
                {26} leçons au total
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col w-full h-full">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="font-medium text-sm">Apprenants</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with  */}
              <div className="font-bold text-2xl">{6}</div>
              <p className="text-muted-foreground text-xs">
                Inscrits à ce cours
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col lg:col-span-2 w-full h-full">
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
      </div>

      <div className="flex-1 space-y-4">
        {/* Modules Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Modules du cours</h2>
            <p className="text-muted-foreground text-sm">
              Organisez le contenu de votre formation
            </p>
          </div>
          <Button asChild className="flex items-center">
            <Link href={`/backoffice/courses/${courseId}/modules/new`}>
              <Plus />
              <span className="max-md:hidden">Nouveau module</span>
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
                        <h3 className="font-medium truncate">{module.title}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm">
                        {5} leçons
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
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" asChild>
              <Link href={`/backoffice/courses/${courseId}/modules`}>
                Voir tous les modules
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
