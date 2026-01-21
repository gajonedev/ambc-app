import { z } from "zod";

// ==================== PAYMENT SCHEMAS (ADMIN) ====================

/**
 * Schema pour lister les paiements avec pagination et filtres
 */
export const listPaymentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["pending", "completed", "failed"]).optional(),
  courseId: z.string().optional(),
  userId: z.string().optional(),
  sortBy: z.enum(["createdAt", "amount", "paidAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ListPaymentsInput = z.infer<typeof listPaymentsSchema>;

/**
 * Schema pour récupérer un paiement par ID
 */
export const paymentIdSchema = z.object({
  id: z.string().min(1, "L'ID du paiement est requis"),
});

export type PaymentIdInput = z.infer<typeof paymentIdSchema>;

/**
 * Schema pour mettre à jour le statut d'un paiement
 */
export const updatePaymentStatusSchema = z.object({
  id: z.string().min(1, "L'ID du paiement est requis"),
  status: z.enum(["pending", "completed", "failed"]),
  kkiapayTransactionId: z.string().optional(),
  paidAt: z.coerce.date().optional(),
});

export type UpdatePaymentStatusInput = z.infer<
  typeof updatePaymentStatusSchema
>;
