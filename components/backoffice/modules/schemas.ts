import { z } from "zod";

/**
 * Schema pour le formulaire de création de module
 * Compatible avec react-hook-form + zodResolver
 */
export const createModuleFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  order: z.number().int().min(1, "L'ordre doit être au moins 1"),
  isPublished: z.boolean(),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type CreateModuleFormInput = z.infer<typeof createModuleFormSchema>;

/**
 * Schema pour le formulaire d'édition de module
 * Compatible avec react-hook-form + zodResolver
 */
export const updateModuleFormSchema = z.object({
  id: z.string().min(1, "L'ID du module est requis"),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  order: z.number().int().min(1, "L'ordre doit être au moins 1"),
  isPublished: z.boolean(),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type UpdateModuleFormInput = z.infer<typeof updateModuleFormSchema>;
