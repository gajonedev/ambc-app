"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Course = RouterOutputs["admin"]["course"]["list"][number];

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  user?: User;
  courseData?: Course;
}

export function CourseFormDialog({
  open,
  onOpenChange,
  mode,
  user,
  courseData,
}: CourseFormDialogProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = mode === "edit";
  const editing = isEditMode && courseData;

  const form = useForm<CourseFormInput>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: editing ? courseData.title : "",
      slug: editing ? courseData.slug : "",
      description: editing ? (courseData.description ?? "") : "",
      shortDescription: editing ? (courseData.shortDescription ?? "") : "",
      image: editing ? (courseData.image ?? "") : "",
      price: editing ? String(courseData.price ?? "0") : "0",
      currency: editing ? (courseData.currency ?? "XOF") : "XOF",
      isPublished: editing ? (courseData.isPublished ?? false) : false,
      isFeatured: editing ? (courseData.isFeatured ?? false) : false,
      instructorName: editing
        ? (courseData.instructorName ?? "")
        : (user?.name ?? ""),
      instructorBio: editing ? (courseData.instructorBio ?? "") : "",
      instructorImage: editing
        ? (courseData.instructorImage ?? "")
        : (user?.image ?? ""),
    },
  });

  // Reset form when dialog opens with new data
  const resetForm = () => {
    form.reset({
      title: editing ? courseData.title : "",
      slug: editing ? courseData.slug : "",
      description: editing ? (courseData.description ?? "") : "",
      shortDescription: editing ? (courseData.shortDescription ?? "") : "",
      image: editing ? (courseData.image ?? "") : "",
      price: editing ? String(courseData.price ?? "0") : "0",
      currency: editing ? (courseData.currency ?? "XOF") : "XOF",
      isPublished: editing ? (courseData.isPublished ?? false) : false,
      isFeatured: editing ? (courseData.isFeatured ?? false) : false,
      instructorName: editing
        ? (courseData.instructorName ?? "")
        : (user?.name ?? ""),
      instructorBio: editing ? (courseData.instructorBio ?? "") : "",
      instructorImage: editing
        ? (courseData.instructorImage ?? "")
        : (user?.image ?? ""),
    });
  };

  // Create mutation
  const createMutation = useMutation(
    trpc.admin.course.create.mutationOptions({
      onSuccess: ({ title }) => {
        toast.success("Formation " + title + " créée avec succès !");
        queryClient.invalidateQueries({
          queryKey: [["admin", "course", "list"]],
        });
        onOpenChange(false);
        resetForm();
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
        queryClient.invalidateQueries({
          queryKey: [["admin", "course", "list"]],
        });
        onOpenChange(false);
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
        queryClient.invalidateQueries({
          queryKey: [["admin", "course", "list"]],
        });
        onOpenChange(false);
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

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 max-w-2xl max-h-[90vh]">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEditMode ? "Modifier la formation" : "Nouvelle formation"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifiez les informations de votre formation"
              : "Remplissez les informations pour créer une nouvelle formation"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 pb-6 max-h-[calc(90vh-180px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Informations générales */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Informations générales</h3>
                <Separator />

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
                            if (!isEditMode) {
                              const currentSlug = form.getValues("slug");
                              const previousTitle = field.value;
                              if (
                                !currentSlug ||
                                currentSlug === generateSlug(previousTitle)
                              ) {
                                form.setValue(
                                  "slug",
                                  generateSlug(e.target.value),
                                );
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
                        URL : /courses/{field.value || "mon-cours"}
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
                          placeholder="Une brève description (max 200 caractères)"
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
                          placeholder="Description détaillée de la formation..."
                          className="min-h-24 resize-none"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tarification */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Tarification</h3>
                <Separator />

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
                        <FormDescription>0 = gratuit</FormDescription>
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
              </div>

              {/* Informations formateur */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Formateur</h3>
                <Separator />

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
                      <FormLabel>Biographie</FormLabel>
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
                    </FormItem>
                  )}
                />
              </div>

              {/* Options de publication */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Publication</h3>
                <Separator />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-between items-center p-3 border rounded-lg">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">Publier</FormLabel>
                        <FormDescription className="text-xs">
                          Visible par les apprenants
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
                    <FormItem className="flex flex-row justify-between items-center p-3 border rounded-lg">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">
                          Mettre en avant
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Afficher sur l&apos;accueil
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
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                {isEditMode && courseData ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting || isPending}
                      >
                        {isDeleting ? (
                          <Spinner />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Supprimer
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Supprimer la formation ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible. &quot;
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
                          {isDeleting ? <Spinner /> : "Supprimer"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    disabled={isPending}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending && <Spinner />}
                    {isEditMode ? "Enregistrer" : "Créer"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
