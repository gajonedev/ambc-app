import { z } from "zod";

// ==================== RESOURCE SCHEMAS (ADMIN) ====================

/**
 * Schema pour créer une ressource
 */
export const createResourceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  url: z.string().url("URL invalide"),
  type: z.string().min(1, "Le type est requis"), // PDF, ZIP, etc.
  size: z.coerce.number().int().min(0).optional(),
  lessonId: z.string().min(1, "L'ID de la leçon est requis"),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;

/**
 * Schema pour mettre à jour une ressource
 */
export const updateResourceSchema = z.object({
  id: z.string().min(1, "L'ID de la ressource est requis"),
  name: z.string().min(1, "Le nom est requis").optional(),
  url: z.string().url("URL invalide").optional(),
  type: z.string().min(1, "Le type est requis").optional(),
  size: z.coerce.number().int().min(0).optional().nullable(),
  lessonId: z.string().min(1, "L'ID de la leçon est requis").optional(),
});

export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;

/**
 * Schema pour les actions nécessitant un ID de ressource
 */
export const resourceIdSchema = z.object({
  id: z.string().min(1, "L'ID de la ressource est requis"),
});

export type ResourceIdInput = z.infer<typeof resourceIdSchema>;

/**
 * Schema pour récupérer les ressources d'une leçon
 */
export const resourcesByLessonSchema = z.object({
  lessonId: z.string().min(1, "L'ID de la leçon est requis"),
});

export type ResourcesByLessonInput = z.infer<typeof resourcesByLessonSchema>;
