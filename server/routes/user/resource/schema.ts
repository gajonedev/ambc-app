import { z } from "zod";

// ==================== RESOURCE SCHEMAS (USER) ====================

/**
 * Schema pour récupérer les ressources d'une leçon
 */
export const resourcesByLessonSchema = z.object({
  lessonId: z.string().min(1, "L'ID de la leçon est requis"),
});

export type ResourcesByLessonInput = z.infer<typeof resourcesByLessonSchema>;

/**
 * Schema pour récupérer une ressource par ID
 */
export const resourceIdSchema = z.object({
  id: z.string().min(1, "L'ID de la ressource est requis"),
});

export type ResourceIdInput = z.infer<typeof resourceIdSchema>;
