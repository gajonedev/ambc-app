// ==================== LESSON SCHEMAS ====================

import z from "zod";

/**
 * Schema pour créer une leçon
 */
export const createLessonSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  videoUrl: z.url("URL de vidéo invalide").optional(),
  videoDuration: z.coerce
    .number()
    .int()
    .min(0, "La durée doit être positive")
    .optional(),
  order: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(false),
  moduleId: z.string().min(1, "L'ID du module est requis"),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;

/**
 * Schema pour mettre à jour une leçon
 */
export const updateLessonSchema = z.object({
  id: z.string().min(1, "L'ID de la leçon est requis"),
  title: z.string().min(1, "Le titre est requis").optional(),
  description: z.string().optional().nullable(),
  videoUrl: z.url("URL de vidéo invalide").optional().nullable(),
  videoDuration: z.coerce
    .number()
    .int()
    .min(0, "La durée doit être positive")
    .optional()
    .nullable(),
  order: z.coerce.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
  moduleId: z.string().min(1, "L'ID du module est requis").optional(),
});

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;

/**
 * Schema pour les actions nécessitant un ID de leçon
 */
export const lessonIdSchema = z.object({
  id: z.string().min(1, "L'ID de la leçon est requis"),
});

export type LessonIdInput = z.infer<typeof lessonIdSchema>;

/**
 * Schema pour récupérer les leçons d'un module
 */
export const lessonsByModuleSchema = z.object({
  moduleId: z.string().min(1, "L'ID du module est requis"),
});

export type LessonsByModuleInput = z.infer<typeof lessonsByModuleSchema>;

/**
 * Schema pour publier/dépublier une leçon
 */
export const toggleLessonPublishSchema = z.object({
  id: z.string().min(1, "L'ID de la leçon est requis"),
  isPublished: z.boolean(),
});

export type ToggleLessonPublishInput = z.infer<
  typeof toggleLessonPublishSchema
>;

/**
 * Schema pour réordonner les leçons
 */
export const reorderLessonsSchema = z.object({
  moduleId: z.string().min(1, "L'ID du module est requis"),
  lessons: z.array(
    z.object({
      id: z.string().min(1),
      order: z.number().int().min(0),
    }),
  ),
});

export type ReorderLessonsInput = z.infer<typeof reorderLessonsSchema>;
