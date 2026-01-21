import { z } from "zod";

// ==================== STUDENT SCHEMAS (ADMIN) ====================

/**
 * Schema pour lister les étudiants avec pagination
 */
export const listStudentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.enum(["name", "email", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ListStudentsInput = z.infer<typeof listStudentsSchema>;

/**
 * Schema pour récupérer un étudiant par ID
 */
export const studentIdSchema = z.object({
  id: z.string().min(1, "L'ID de l'étudiant est requis"),
});

export type StudentIdInput = z.infer<typeof studentIdSchema>;

/**
 * Schema pour récupérer la progression d'un étudiant sur un cours
 */
export const studentProgressSchema = z.object({
  studentId: z.string().min(1, "L'ID de l'étudiant est requis"),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type StudentProgressInput = z.infer<typeof studentProgressSchema>;
