import { z } from "zod";

/**
 * Schéma de validation pour la connexion
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Schéma de validation pour l'inscription
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom complet est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Veuillez entrer un email valide"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
      ),
    confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Schéma de validation pour la demande de réinitialisation de mot de passe
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Schéma de validation pour le code OTP
 */
export const verifyOtpSchema = z.object({
  code: z
    .string()
    .min(6, "Le code doit contenir 6 chiffres")
    .max(6, "Le code doit contenir 6 chiffres")
    .regex(/^\d+$/, "Le code ne doit contenir que des chiffres"),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

/**
 * Schéma de validation pour la réinitialisation du mot de passe
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
      ),
    confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
