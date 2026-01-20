import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { mockModules } from "@/lib/mock-data";

export default function ModulesPage() {
  const modules = mockModules.map((m) => ({
    id: m.id,
    title: m.title,
    lessons: m.lessonsCount ?? m.lessons.length,
    published: m.published ?? false,
    order: m.order ?? 1,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Modules</h1>
          <p className="text-muted-foreground">
            Gérez les modules de votre formation
          </p>
        </div>
        <Button asChild>
          <Link href="/backoffice/modules/new">
            <Plus className="mr-2 w-4 h-4" />
            Nouveau module
          </Link>
        </Button>
      </div>

      {/* Modules List */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les modules ({modules.length})</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <h3 className="font-medium truncate">{module.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {module.lessons} leçons
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      module.published
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {module.published ? (
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
                    <Link href={`/backoffice/modules/${module.id}/lessons`}>
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
        </CardContent>
      </Card>
    </div>
  );
}
