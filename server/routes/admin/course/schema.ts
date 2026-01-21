import { z } from "zod";

// ==================== COURSE SCHEMAS ====================

/**
 * Schema pour créer un cours
 */
export const createCourseSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit être en minuscules avec des tirets (ex: mon-cours)",
    ),
  description: z.string().optional(),
  shortDescription: z.string().max(200, "Max 200 caractères").optional(),
  image: z.url("URL d'image invalide").optional(),
  price: z.coerce.string().optional().default("0"),
  currency: z.string().default("XOF"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  instructorName: z.string().optional(),
  instructorBio: z.string().optional(),
  instructorImage: z.url("URL d'image invalide").optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

/**
 * Schema pour mettre à jour un cours
 */
export const updateCourseSchema = z.object({
  id: z.string().min(1, "L'ID du cours est requis"),
  title: z.string().min(1, "Le titre est requis").optional(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit être en minuscules avec des tirets",
    )
    .optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(200, "Max 200 caractères").optional(),
  image: z.url("URL d'image invalide").optional().nullable(),
  price: z.coerce.string().optional(),
  currency: z.string().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  instructorName: z.string().optional().nullable(),
  instructorBio: z.string().optional().nullable(),
  instructorImage: z.url("URL d'image invalide").optional().nullable(),
});

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;

/**
 * Schema pour les actions nécessitant un ID de cours
 */
export const courseIdOrSlugSchema = z.object({
  id: z.string().min(1, "L'ID du cours est requis").optional(),
  slug: z.string().min(1, "Le slug du cours est requis").optional(),
});

export type CourseIdInput = z.infer<typeof courseIdOrSlugSchema>;
/**
 * Schema pour publier/dépublier un cours
 */
export const toggleCoursePublishSchema = z.object({
  id: z.string().min(1, "L'ID du cours est requis"),
  isPublished: z.boolean(),
});

export type ToggleCoursePublishInput = z.infer<
  typeof toggleCoursePublishSchema
>;

/**
 * Schema pour mettre en avant un cours
 */
export const toggleCourseFeaturedSchema = z.object({
  id: z.string().min(1, "L'ID du cours est requis"),
  isFeatured: z.boolean(),
});

export type ToggleCourseFeaturedInput = z.infer<
  typeof toggleCourseFeaturedSchema
>;
