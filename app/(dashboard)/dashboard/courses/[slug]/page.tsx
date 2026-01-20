import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Circle,
  Lock,
  PlayCircle,
  Clock,
  User,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCourseBySlug } from "@/lib/mock-data";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return <div>Formation non trouvée</div>;
  }

  const totalLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0,
  );
  const completedLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex lg:flex-row flex-col gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard/courses"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Formations
            </Link>
            <span className="text-muted-foreground">/</span>
          </div>
          <h1 className="mb-2 font-bold text-2xl tracking-tight">
            {course.title}
          </h1>
          <p className="mb-4 text-muted-foreground">{course.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex justify-center items-center bg-muted rounded-full w-10 h-10">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">{course.instructor.name}</p>
              <p className="text-muted-foreground text-xs">
                {course.instructor.bio}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>{course.modules.length} modules</span>
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-muted-foreground" />
              <span>{totalLessons} leçons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>~10 heures</span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="lg:w-80 shrink-0">
          <CardContent className="p-4">
            {course.isEnrolled ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="font-bold text-3xl">{course.progress}%</div>
                  <p className="text-muted-foreground text-sm">
                    {completedLessons}/{totalLessons} leçons complétées
                  </p>
                </div>
                <Progress value={course.progress} className="h-2" />
                <Button asChild className="w-full">
                  <Link href={`/dashboard/courses/${slug}/learn`}>
                    <PlayCircle className="mr-2 w-4 h-4" />
                    Continuer
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="font-bold text-3xl">
                  {course.price.toLocaleString()} {course.currency}
                </div>
                <Button className="w-full">S&apos;inscrire</Button>
                <p className="text-muted-foreground text-xs">
                  Accès à vie • Certificat inclus
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Programme de la formation</h2>
        {course.modules.map((module, moduleIndex) => (
          <Card key={module.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                    <span className="font-semibold text-primary">
                      {moduleIndex + 1}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-base">{module.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {module.lessons.length} leçons
                    </p>
                  </div>
                </div>
                {course.isEnrolled && (
                  <div className="text-right">
                    <span className="font-medium text-sm">
                      {module.progress}%
                    </span>
                    <Progress value={module.progress} className="mt-1 w-20" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={cn(
                      "flex justify-between items-center p-3 rounded-lg",
                      course.isEnrolled ? "hover:bg-muted cursor-pointer" : "",
                      lesson.current && "bg-primary/5 border border-primary/20",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {!course.isEnrolled ? (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      ) : lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : lesson.current ? (
                        <PlayCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          lesson.completed && "text-muted-foreground",
                        )}
                      >
                        {lesson.title}
                      </span>
                      {lesson.current && (
                        <Badge variant="secondary" className="text-xs">
                          En cours
                        </Badge>
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
