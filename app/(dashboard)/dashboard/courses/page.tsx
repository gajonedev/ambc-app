import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import { mockEnrolledCourses, mockAvailableCourses } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Mes Formations</h1>
        <p className="text-muted-foreground">
          Gérez vos formations et suivez votre progression
        </p>
      </div>

      {/* Enrolled Courses */}
      {mockEnrolledCourses.length > 0 && (
        <section>
          <h2 className="mb-4 font-semibold text-lg">Formations en cours</h2>
          <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
            {mockEnrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative bg-muted aspect-video">
                  <div className="absolute inset-0 flex justify-center items-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  {course.progress > 0 && (
                    <Badge className="top-2 right-2 absolute">
                      {course.progress}% complété
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {course.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {course.completedLessons}/{course.totalLessons} leçons
                    </span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/courses/${course.slug}`}>
                      <PlayCircle className="mr-2 w-4 h-4" />
                      {course.progress > 0 ? "Continuer" : "Commencer"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Available Courses */}
      {mockAvailableCourses.length > 0 && (
        <section>
          <h2 className="mb-4 font-semibold text-lg">Formations disponibles</h2>
          <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
            {mockAvailableCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative bg-muted aspect-video">
                  <div className="absolute inset-0 flex justify-center items-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {course.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      {course.lessonsCount} leçons
                    </div>
                    <span className="font-bold text-primary">
                      {course.price.toLocaleString()} {course.currency}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/courses/${course.slug}`}>
                      Voir le programme
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {mockEnrolledCourses.length === 0 &&
        mockAvailableCourses.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
              <h3 className="mb-2 font-medium">Aucune formation disponible</h3>
              <p className="text-muted-foreground text-sm">
                De nouvelles formations seront bientôt disponibles.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
