import { z } from "zod";

// ==================== CERTIFICATE SCHEMAS (ADMIN) ====================

/**
 * Schema pour lister les certificats avec pagination
 */
export const listCertificatesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  courseId: z.string().optional(),
  userId: z.string().optional(),
  sortBy: z.enum(["issuedAt"]).default("issuedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ListCertificatesInput = z.infer<typeof listCertificatesSchema>;

/**
 * Schema pour récupérer un certificat par ID
 */
export const certificateIdSchema = z.object({
  id: z.string().min(1, "L'ID du certificat est requis"),
});

export type CertificateIdInput = z.infer<typeof certificateIdSchema>;

/**
 * Schema pour délivrer un certificat manuellement
 */
export const issueCertificateSchema = z.object({
  userId: z.string().min(1, "L'ID de l'utilisateur est requis"),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type IssueCertificateInput = z.infer<typeof issueCertificateSchema>;

/**
 * Schema pour révoquer un certificat
 */
export const revokeCertificateSchema = z.object({
  id: z.string().min(1, "L'ID du certificat est requis"),
});

export type RevokeCertificateInput = z.infer<typeof revokeCertificateSchema>;

/**
 * Schema pour vérifier un certificat par son numéro
 */
export const verifyCertificateSchema = z.object({
  certificateNumber: z.string().min(1, "Le numéro de certificat est requis"),
});

export type VerifyCertificateInput = z.infer<typeof verifyCertificateSchema>;
