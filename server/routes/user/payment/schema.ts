import { z } from "zod";

// ==================== PAYMENT SCHEMAS (USER) ====================

/**
 * Schema pour lister mes paiements avec pagination
 */
export const listMyPaymentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.enum(["pending", "completed", "failed"]).optional(),
});

export type ListMyPaymentsInput = z.infer<typeof listMyPaymentsSchema>;

/**
 * Schema pour initier un paiement
 */
export const initiatePaymentSchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;

/**
 * Schema pour récupérer un paiement par ID
 */
export const paymentIdSchema = z.object({
  id: z.string().min(1, "L'ID du paiement est requis"),
});

export type PaymentIdInput = z.infer<typeof paymentIdSchema>;

/**
 * Schema pour le callback KkiaPay (webhook)
 */
export const kkiapayCallbackSchema = z.object({
  transactionId: z.string().min(1, "L'ID de transaction est requis"),
  status: z.enum(["SUCCESS", "FAILED"]),
  amount: z.coerce.number(),
  // Ajoute d'autres champs selon la doc KkiaPay
});

export type KkiapayCallbackInput = z.infer<typeof kkiapayCallbackSchema>;
