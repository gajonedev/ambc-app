import { z } from "zod";

// ==================== PROFILE SCHEMAS (USER) ====================

/**
 * Schema pour mettre à jour le profil
 */
export const updateProfileSchema = z.object({
  phone: z.string().optional().nullable(),
  bio: z.string().max(500, "Max 500 caractères").optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * Schema pour mettre à jour les infos utilisateur (name, image)
 */
export const updateUserInfoSchema = z.object({
  name: z.string().min(1, "Le nom est requis").optional(),
  image: z.url("URL d'image invalide").optional().nullable(),
});

export type UpdateUserInfoInput = z.infer<typeof updateUserInfoSchema>;
