import { z } from "zod";

// ==================== MODULE SCHEMAS (USER) ====================

/**
 * Schema pour récupérer les modules d'un cours
 */
export const modulesByCourseSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type ModulesByCourseInput = z.infer<typeof modulesByCourseSchema>;

/**
 * Schema pour récupérer un module par ID
 */
export const moduleIdSchema = z.object({
  id: z.string().min(1, "L'ID du module est requis"),
});

export type ModuleIdInput = z.infer<typeof moduleIdSchema>;
