import { z } from "zod";

// ==================== PROGRESS SCHEMAS (USER) ====================

/**
 * Schema pour mettre à jour la progression sur une leçon
 */
export const updateProgressSchema = z.object({
  lessonId: z.string().min(1, "L'ID de la leçon est requis"),
  watchedSeconds: z.coerce.number().int().min(0).optional(),
  lastPosition: z.coerce.number().int().min(0).optional(),
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;

/**
 * Schema pour marquer une leçon comme complétée
 */
export const markCompleteSchema = z.object({
  lessonId: z.string().min(1, "L'ID de la leçon est requis"),
});

export type MarkCompleteInput = z.infer<typeof markCompleteSchema>;

/**
 * Schema pour récupérer la progression sur un cours
 */
export const courseProgressSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type CourseProgressInput = z.infer<typeof courseProgressSchema>;

/**
 * Schema pour récupérer la progression sur une leçon
 */
export const lessonProgressSchema = z.object({
  lessonId: z.string().min(1, "L'ID de la leçon est requis"),
});

export type LessonProgressInput = z.infer<typeof lessonProgressSchema>;
