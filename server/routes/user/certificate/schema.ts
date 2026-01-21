import { z } from "zod";

// ==================== CERTIFICATE SCHEMAS (USER) ====================

/**
 * Schema pour récupérer un certificat par ID
 */
export const certificateIdSchema = z.object({
  id: z.string().min(1, "L'ID du certificat est requis"),
});

export type CertificateIdInput = z.infer<typeof certificateIdSchema>;

/**
 * Schema pour vérifier l'éligibilité à un certificat
 */
export const checkEligibilitySchema = z.object({
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type CheckEligibilityInput = z.infer<typeof checkEligibilitySchema>;

/**
 * Schema pour télécharger un certificat
 */
export const downloadCertificateSchema = z.object({
  id: z.string().min(1, "L'ID du certificat est requis"),
});

export type DownloadCertificateInput = z.infer<
  typeof downloadCertificateSchema
>;

/**
 * Schema pour vérifier un certificat (public)
 */
export const verifyCertificateSchema = z.object({
  certificateNumber: z.string().min(1, "Le numéro de certificat est requis"),
});

export type VerifyCertificateInput = z.infer<typeof verifyCertificateSchema>;
