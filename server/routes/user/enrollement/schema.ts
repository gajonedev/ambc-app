import { z } from "zod";

// ==================== ENROLLMENT SCHEMAS (USER) ====================

/**
 * Schema pour s'inscrire à un cours
 */
export const enrollCourseSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type EnrollCourseInput = z.infer<typeof enrollCourseSchema>;

/**
 * Schema pour vérifier l'inscription à un cours
 */
export const checkEnrollmentSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type CheckEnrollmentInput = z.infer<typeof checkEnrollmentSchema>;
