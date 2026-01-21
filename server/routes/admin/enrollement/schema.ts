import { z } from "zod";

// ==================== ENROLLMENT SCHEMAS (ADMIN) ====================

/**
 * Schema pour lister les inscriptions avec pagination
 */
export const listEnrollmentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  courseId: z.string().optional(),
  userId: z.string().optional(),
  sortBy: z.enum(["createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ListEnrollmentsInput = z.infer<typeof listEnrollmentsSchema>;

/**
 * Schema pour créer une inscription manuellement
 */
export const createEnrollmentSchema = z.object({
  userId: z.string().min(1, "L'ID de l'utilisateur est requis"),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;

/**
 * Schema pour supprimer une inscription
 */
export const deleteEnrollmentSchema = z.object({
  id: z.string().min(1, "L'ID de l'inscription est requis"),
});

export type DeleteEnrollmentInput = z.infer<typeof deleteEnrollmentSchema>;

/**
 * Schema pour récupérer une inscription par user et course
 */
export const enrollmentByUserCourseSchema = z.object({
  userId: z.string().min(1, "L'ID de l'utilisateur est requis"),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type EnrollmentByUserCourseInput = z.infer<
  typeof enrollmentByUserCourseSchema
>;
