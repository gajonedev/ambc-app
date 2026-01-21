import { z } from "zod";

// ==================== STATS SCHEMAS (ADMIN) ====================

/**
 * Schema pour les stats du dashboard
 */
export const dashboardStatsSchema = z.object({
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
});

export type DashboardStatsInput = z.infer<typeof dashboardStatsSchema>;

/**
 * Schema pour les stats d'un cours spécifique
 */
export const courseStatsSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
});

export type CourseStatsInput = z.infer<typeof courseStatsSchema>;
