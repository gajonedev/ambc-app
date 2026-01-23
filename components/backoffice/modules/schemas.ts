import { z } from "zod";

/**
 * Schema unifié pour le formulaire de module (création et édition)
 * Compatible avec react-hook-form + zodResolver
 */
export const moduleFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  order: z.number().int().min(1, "L'ordre doit être au moins 1"),
  isPublished: z.boolean(),
  courseId: z.string().min(1, "L'ID du cours est requis"),
});

export type ModuleFormInput = z.infer<typeof moduleFormSchema>;

// Aliases pour la rétrocompatibilité
export const createModuleFormSchema = moduleFormSchema;
export const updateModuleFormSchema = moduleFormSchema;
export type CreateModuleFormInput = ModuleFormInput;
export type UpdateModuleFormInput = ModuleFormInput;
