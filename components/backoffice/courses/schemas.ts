import { z } from "zod";

/**
 * Schema pour le formulaire de création de cours
 * Tous les champs sont requis (les valeurs par défaut sont gérées par defaultValues du formulaire)
 * Compatible avec react-hook-form + zodResolver
 */
export const createCourseFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit être en minuscules avec des tirets (ex: mon-cours)",
    ),
  description: z.string(),
  shortDescription: z.string().max(200, "Max 200 caractères"),
  image: z
    .string()
    .min(1, "Veuillez importer l'image avant de valider le formulaire"),
  price: z.string().min(1, "Le prix est requis"),
  currency: z.string().min(1, "La devise est requise"),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  instructorName: z.string().min(1, "Le nom du formateur est requis"),
  instructorBio: z.string(),
  instructorImage: z.string().min(1, "Veuillez importer l'image du formateur"),
});

export type CreateCourseFormInput = z.infer<typeof createCourseFormSchema>;
