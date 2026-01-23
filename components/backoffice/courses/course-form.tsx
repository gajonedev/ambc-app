"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { courseFormSchema, type CourseFormInput } from "./schemas";
import { RouterOutputs } from "@/trpc/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { User } from "better-auth";
import { Spinner } from "@/components/ui/spinner";

type Course = RouterOutputs["admin"]["course"]["getByIdOrSlug"];

interface CourseFormProps {
  mode: "create" | "edit";
  user?: User;
  courseData?: Course;
}

export function CourseForm({ mode, user, courseData }: CourseFormProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const isEditMode = mode === "edit";
  const editing = isEditMode && courseData;

  const form = useForm<CourseFormInput>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: editing ? courseData!.title : "",
      slug: editing ? courseData!.slug : "",
      description: editing ? (courseData!.description ?? "") : "",
      shortDescription: editing ? (courseData!.shortDescription ?? "") : "",
      image: editing ? (courseData!.image ?? "") : "",
      price: editing ? String(courseData!.price ?? "0") : "0",
      currency: editing ? (courseData!.currency ?? "XOF") : "XOF",
      isPublished: editing ? (courseData!.isPublished ?? false) : false,
      isFeatured: editing ? (courseData!.isFeatured ?? false) : false,
      instructorName: editing
        ? (courseData!.instructorName ?? "")
        : (user?.name ?? ""),
      instructorBio: editing ? (courseData!.instructorBio ?? "") : "",
      instructorImage: editing
        ? (courseData!.instructorImage ?? "")
        : (user?.image ?? ""),
    },
  });

  // Create mutation
  const createMutation = useMutation(
    trpc.admin.course.create.mutationOptions({
      onSuccess: ({ title }) => {
        toast.success("Formation " + title + " créée avec succès !");
        router.push(`/backoffice/courses`);
      },
      onError: (error) => {
        toast.error("Erreur lors de la création: " + error.message);
      },
    }),
  );

  // Update mutation
  const updateMutation = useMutation(
    trpc.admin.course.update.mutationOptions({
      onSuccess: ({ title }) => {
        toast.success("Formation " + title + " mise à jour !");
        router.push(`/backoffice/courses/${courseData?.id}`);
      },
      onError: (error) => {
        toast.error("Erreur lors de la mise à jour: " + error.message);
      },
    }),
  );

  // Delete mutation
  const deleteMutation = useMutation(
    trpc.admin.course.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Formation supprimée avec succès !");
        router.push(`/backoffice/courses`);
      },
      onError: (error) => {
        toast.error("Erreur lors de la suppression: " + error.message);
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  const onSubmit = (data: CourseFormInput) => {
    if (isEditMode && courseData) {
      updateMutation.mutate({
        id: courseData.id,
        ...data,
      });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = () => {
    if (courseData) {
      deleteMutation.mutate({ id: courseData.id });
    }
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/-+/g, "-") // Replace multiple - with single -
      .replace(/^-|-$/g, ""); // Remove leading/trailing -
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>
              Les informations de base de votre formation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de la formation *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Conception de Plans Architecturaux"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // Auto-generate slug if slug is empty or matches previous auto-generated (only in create mode)
                        if (!isEditMode) {
                          const currentSlug = form.getValues("slug");
                          const previousTitle = field.value;
                          if (
                            !currentSlug ||
                            currentSlug === generateSlug(previousTitle)
                          ) {
                            form.setValue("slug", generateSlug(e.target.value));
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL) *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="conception-plans-architecturaux"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Utilisé dans l&apos;URL : /courses/
                    {field.value || "mon-cours"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description courte</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Une brève description pour les cartes et aperçus (max 200 caractères)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/200 caractères
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description complète</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description détaillée de la formation, objectifs, prérequis..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image de couverture *</FormLabel>
                  <FormControl>
                    <ImageDropzone
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="courseImage"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    (Une fois l&apos;image choisie, cliquez sur le bouton
                    Importer pour importer l&apos;image avant de valider le
                    formulaire)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Tarification */}
        <Card>
          <CardHeader>
            <CardTitle>Tarification</CardTitle>
            <CardDescription>
              Définissez le prix de votre formation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="items-start gap-4 grid grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="100"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Laisser à 0 pour une formation gratuite
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Devise</FormLabel>
                    <FormControl>
                      <Input placeholder="XOF" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Informations formateur */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du formateur</CardTitle>
            <CardDescription>
              Ces informations seront affichées sur la page de la formation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="instructorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du formateur *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instructorBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biographie du formateur</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Présentez-vous brièvement..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instructorImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo du formateur *</FormLabel>
                  <FormControl>
                    <ImageDropzone
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="instructorImage"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    (Si vous changez l&apos;image, veuillez cliquer sur le
                    bouton Importer pour importer l&apos;image avant de valider
                    le formulaire)
                  </FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Options de publication */}
        <Card>
          <CardHeader>
            <CardTitle>Options de publication</CardTitle>
            <CardDescription>
              Contrôlez la visibilité de votre formation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Publier la formation
                    </FormLabel>
                    <FormDescription>
                      La formation sera visible par les apprenants
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mettre en avant</FormLabel>
                    <FormDescription>
                      La formation apparaîtra en avant sur la page
                      d&apos;accueil
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Zone de danger (edit mode only) */}
        {isEditMode && courseData && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zone de danger</CardTitle>
              <CardDescription>
                Actions irréversibles sur cette formation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isDeleting || isPending}
                  >
                    {isDeleting ? <Spinner /> : <Trash2 />}
                    Supprimer la formation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous sûr de vouloir supprimer cette formation ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. La formation &quot;
                      {courseData.title}&quot; sera définitivement supprimée
                      avec tous ses modules et leçons.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                      }}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      disabled={isDeleting}
                    >
                      {isDeleting ? <Spinner /> : "Supprimer définitivement"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <Button type="button" variant="outline" asChild disabled={isPending}>
            <Link
              href={
                isEditMode && courseData
                  ? `/backoffice/courses/${courseData.id}`
                  : "/backoffice/courses"
              }
            >
              Annuler
            </Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader className="mr-2 w-4 h-4 animate-spin" />}
            {isEditMode
              ? "Enregistrer les modifications"
              : "Créer la formation"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
