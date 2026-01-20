import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  PlayCircle,
  Clock,
  Trophy,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { userOnlyPage } from "@/server/utils";
import {
  mockDashboardStats,
  mockDashboardEnrolledCourses,
  mockRecentActivity,
} from "@/lib/mock-data";
import TestButton from "@/components/test-button";

export default async function DashboardPage() {
  const { name } = await userOnlyPage();

  const stats = mockDashboardStats;
  const enrolledCourses = mockDashboardEnrolledCourses;
  const recentActivity = mockRecentActivity;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight">
          Bienvenue, {name} ! 👋
        </h1>
        <p className="text-muted-foreground">
          Retrouvez vos formations et votre progression.
        </p>
      </div>
      <TestButton />

      {/* Stats Cards */}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Formations inscrites
            </CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.enrolledCourses}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              {stats.completedCourses} formation(s) terminée(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Leçons complétées
            </CardTitle>
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {stats.totalLessonsCompleted}
            </div>
            <p className="mt-1 text-muted-foreground text-xs">
              Toutes formations confondues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">
              Heures de visionnage
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.hoursWatched}h</div>
            <p className="mt-1 text-muted-foreground text-xs">
              Temps total de formation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="font-medium text-sm">Certificats</CardTitle>
            <Trophy className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.certificates}</div>
            <p className="mt-1 text-muted-foreground text-xs">
              <Link
                href="/dashboard/certificates"
                className="text-primary hover:underline"
              >
                Voir mes certificats
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Continuer mes formations</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/courses">Voir tout</Link>
          </Button>
        </div>
        <div className="gap-4 grid md:grid-cols-2">
          {enrolledCourses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        {course.currentLesson.moduleName}
                      </p>
                    </div>
                    <Badge variant="secondary">{course.progress}%</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-xs">
                      {course.lastAccessedAt}
                    </p>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/courses/${course.slug}/learn`}>
                        <PlayCircle className="mr-2 w-4 h-4" />
                        Reprendre
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 last:border-0 border-b"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.completed ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {activity.courseName} • {activity.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    activity.completed
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {activity.type === "certificate"
                    ? "Certificat"
                    : activity.completed
                      ? "Terminé"
                      : "En cours"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
