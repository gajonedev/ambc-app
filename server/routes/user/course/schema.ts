import { z } from "zod";

// ==================== COURSE SCHEMAS (USER) ====================

/**
 * Schema pour lister les cours publiés avec pagination
 */
export const listCoursesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  featured: z.boolean().optional(),
});

export type ListCoursesInput = z.infer<typeof listCoursesSchema>;

/**
 * Schema pour récupérer un cours par slug
 */
export const courseBySlugSchema = z.object({
  slug: z.string().min(1, "Le slug du cours est requis"),
});

export type CourseBySlugInput = z.infer<typeof courseBySlugSchema>;

/**
 * Schema pour récupérer un cours par ID
 */
export const courseIdSchema = z.object({
  id: z.string().min(1, "L'ID du cours est requis"),
});

export type CourseIdInput = z.infer<typeof courseIdSchema>;
