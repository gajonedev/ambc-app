import { z } from "zod";

// ==================== LESSON SCHEMAS (USER) ====================

/**
 * Schema pour récupérer les leçons d'un module
 */
export const lessonsByModuleSchema = z.object({
  moduleId: z.string().min(1, "L'ID du module est requis"),
});

export type LessonsByModuleInput = z.infer<typeof lessonsByModuleSchema>;

/**
 * Schema pour récupérer une leçon par ID
 */
export const lessonIdSchema = z.object({
  id: z.string().min(1, "L'ID de la leçon est requis"),
});

export type LessonIdInput = z.infer<typeof lessonIdSchema>;
