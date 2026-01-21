import { z } from "zod";

// ==================== MODULE SCHEMAS ====================

/**
 * Schema pour créer un module
 */
export const createModuleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  order: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(false),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;

/**
 * Schema pour mettre à jour un module
 */
export const updateModuleSchema = z.object({
  id: z.string().min(1, "L'ID du module est requis"),
  title: z.string().min(1, "Le titre est requis").optional(),
  description: z.string().optional().nullable(),
  order: z.coerce.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
  courseId: z.string().min(1, "L'ID du cours est requis").optional(),
});

export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;

/**
 * Schema pour les actions nécessitant un ID de module
 */
export const moduleIdSchema = z.object({
  id: z.string().min(1, "L'ID du module est requis"),
});

export type ModuleIdInput = z.infer<typeof moduleIdSchema>;

/**
 * Schema pour récupérer les modules d'un cours
 */
export const modulesByCourseSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type ModulesByCourseInput = z.infer<typeof modulesByCourseSchema>;

/**
 * Schema pour publier/dépublier un module
 */
export const toggleModulePublishSchema = z.object({
  id: z.string().min(1, "L'ID du module est requis"),
  isPublished: z.boolean(),
});

export type ToggleModulePublishInput = z.infer<
  typeof toggleModulePublishSchema
>;

/**
 * Schema pour réordonner les modules
 */
export const reorderModulesSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
  modules: z.array(
    z.object({
      id: z.string().min(1),
      order: z.number().int().min(0),
    }),
  ),
});

export type ReorderModulesInput = z.infer<typeof reorderModulesSchema>;
