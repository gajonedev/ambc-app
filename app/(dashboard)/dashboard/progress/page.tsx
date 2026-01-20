import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { userOnlyPage } from "@/server/utils";
import { CheckCircle, Circle, Trophy } from "lucide-react";
import { mockModules } from "@/lib/mock-data";

export default async function ProgressPage() {
  await userOnlyPage();

  const modules = mockModules.map((m) => ({
    id: m.id,
    title: m.title,
    progress: m.progress ?? 0,
    lessonsCompleted: m.lessons.filter((l) => l.completed).length,
    totalLessons: m.lessonsCount ?? m.lessons.length,
  }));

  const overallProgress = Math.round(
    modules.reduce((acc, m) => acc + m.progress, 0) / modules.length,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Ma progression</h1>
        <p className="text-muted-foreground">
          Suivez votre avancement dans la formation
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Progression globale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-3xl">{overallProgress}%</span>
              <span className="text-muted-foreground">
                {modules.reduce((acc, m) => acc + m.lessonsCompleted, 0)} /{" "}
                {modules.reduce((acc, m) => acc + m.totalLessons, 0)} leçons
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-muted-foreground text-sm">
              Continuez ainsi ! Il vous reste {100 - overallProgress}% pour
              obtenir votre certificat.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Module Progress */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Progression par module</h2>
        {modules.map((module, index) => (
          <Card key={module.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12 shrink-0">
                  {module.progress === 100 ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : module.progress > 0 ? (
                    <span className="font-semibold text-primary">
                      {module.progress}%
                    </span>
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium truncate">
                      {index + 1}. {module.title}
                    </h3>
                    <span className="ml-2 text-muted-foreground text-sm shrink-0">
                      {module.lessonsCompleted}/{module.totalLessons}
                    </span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
