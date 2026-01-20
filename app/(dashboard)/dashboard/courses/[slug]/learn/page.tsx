import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  Circle,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getCourseForLearn,
  mockCurrentLesson,
  mockLessonNavigation,
} from "@/lib/mock-data";

interface LearnPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const course = getCourseForLearn(slug);
  const currentLesson = mockCurrentLesson;
  const navigation = mockLessonNavigation;

  return (
    <div className="flex gap-6">
      {/* Sidebar - Course Content */}
      <aside className="hidden lg:block w-80 shrink-0">
        <Card className="top-6 sticky">
          <CardContent className="p-4">
            <Link
              href={`/dashboard/courses/${slug}`}
              className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au cours
            </Link>
            <h3 className="mb-4 font-semibold">{course.title}</h3>
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id}>
                  <p className="mb-2 font-medium text-muted-foreground text-sm">
                    {module.title}
                  </p>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={cn(
                          "flex items-center gap-2 hover:bg-muted p-2 rounded w-full text-sm text-left",
                          lesson.current && "bg-primary/10 text-primary",
                        )}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        ) : lesson.current ? (
                          <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Mobile Back Link */}
        <div className="lg:hidden">
          <Link
            href={`/dashboard/courses/${slug}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Retour au cours
          </Link>
        </div>

        {/* Video Player */}
        <div className="bg-black rounded-lg aspect-video overflow-hidden">
          <div className="flex justify-center items-center w-full h-full text-white">
            <div className="text-center">
              <div className="flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-20 h-20">
                <svg
                  className="ml-1 w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm">
                Lecteur vidéo - {currentLesson.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="flex lg:flex-row flex-col gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="font-bold text-2xl">{currentLesson.title}</h1>
              <p className="mt-2 text-muted-foreground">
                {currentLesson.description}
              </p>
            </div>

            {/* Mark as Complete */}
            <Button className="w-full sm:w-auto">
              <CheckCircle className="mr-2 w-4 h-4" />
              Marquer comme terminé
            </Button>
          </div>

          {/* Sidebar - Resources */}
          <Card className="lg:w-72 shrink-0">
            <CardContent className="p-4">
              <h3 className="flex items-center gap-2 mb-4 font-semibold">
                <FileText className="w-4 h-4" />
                Ressources
              </h3>
              <div className="space-y-3">
                {currentLesson.resources?.map((resource, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-muted/50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{resource.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {resource.size}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t">
          {navigation.prev ? (
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              <span className="hidden sm:inline">{navigation.prev.title}</span>
              <span className="sm:hidden">Précédent</span>
            </Button>
          ) : (
            <div />
          )}
          {navigation.next ? (
            <Button>
              <span className="hidden sm:inline">{navigation.next.title}</span>
              <span className="sm:hidden">Suivant</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
