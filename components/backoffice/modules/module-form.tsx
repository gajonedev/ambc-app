"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { moduleFormSchema, type ModuleFormInput } from "./schemas";

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

interface ModuleData {
  id: string;
  title: string;
  description: string | null;
  order: number;
  isPublished: boolean;
  courseId: string;
}

interface ModuleFormProps {
  mode: "create" | "edit";
  courseId: string;
  moduleData?: ModuleData;
  defaultOrder?: number;
}

export function ModuleForm({
  mode,
  courseId,
  moduleData,
  defaultOrder = 1,
}: ModuleFormProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const isEditMode = mode === "edit";
  const editing = isEditMode && moduleData;

  const form = useForm<ModuleFormInput>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: editing ? moduleData.title : "",
      description: editing ? (moduleData.description ?? "") : "",
      order: editing ? moduleData.order : defaultOrder,
      isPublished: editing ? moduleData.isPublished : false,
      courseId: courseId,
    },
  });

  // Create mutation
  const createMutation = useMutation(
    trpc.admin.module.create.mutationOptions({
      onSuccess: ({ title, id }) => {
        toast.success(`Module "${title}" créé avec succès !`);
        queryClient.invalidateQueries();
        router.push(`/backoffice/courses/${courseId}/modules/${id}`);
      },
      onError: (error) => {
        toast.error(error.message || "Erreur lors de la création du module");
      },
    }),
  );

  // Update mutation
  const updateMutation = useMutation(
    trpc.admin.module.update.mutationOptions({
      onSuccess: ({ title }) => {
        toast.success(`Module "${title}" mis à jour !`);
        queryClient.invalidateQueries();
        router.push(
          `/backoffice/courses/${courseId}/modules/${moduleData?.id}`,
        );
      },
      onError: (error) => {
        toast.error(error.message || "Erreur lors de la mise à jour");
      },
    }),
  );

  // Delete mutation
  const deleteMutation = useMutation(
    trpc.admin.module.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Module supprimé avec succès");
        queryClient.invalidateQueries();
        router.push(`/backoffice/courses/${courseId}`);
      },
      onError: (error) => {
        toast.error(error.message || "Erreur lors de la suppression");
      },
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  const onSubmit = (data: ModuleFormInput) => {
    if (isEditMode && moduleData) {
      updateMutation.mutate({
        id: moduleData.id,
        ...data,
      });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = () => {
    if (moduleData) {
      deleteMutation.mutate({ id: moduleData.id });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Informations du module */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du module</CardTitle>
            <CardDescription>
              {isEditMode
                ? "Modifiez les informations du module"
                : "Remplissez les informations de base du module"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du module *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Introduction aux plans architecturaux"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez le contenu de ce module..."
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Cette description sera affichée aux apprenants
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordre d&apos;affichage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      className="w-24"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 1)
                      }
                      disabled
                    />
                  </FormControl>
                  <FormDescription>
                    Position du module dans la liste
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Options de publication */}
        <Card>
          <CardHeader>
            <CardTitle>Publication</CardTitle>
            <CardDescription>
              Contrôlez la visibilité de ce module
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Publier le module
                    </FormLabel>
                    <FormDescription>
                      {isEditMode
                        ? "Rendre ce module visible aux apprenants inscrits"
                        : "Rendre automatiquement ce module visible aux apprenants inscrits"}
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

        {/* Hidden courseId field */}
        <input type="hidden" {...form.register("courseId")} />

        {/* Actions */}
        <div
          className={`flex items-center ${isEditMode ? "justify-between" : "justify-end"} gap-4`}
        >
          {isEditMode && moduleData && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isPending || isDeleting}
                >
                  <Trash2 className="mr-2 w-4 h-4" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Le module &quot;
                    {moduleData.title}
                    &quot; et toutes ses leçons seront définitivement supprimés.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  >
                    {isDeleting && (
                      <Loader className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href={`/backoffice/courses/${courseId}`}>Annuler</Link>
            </Button>
            <Button type="submit" disabled={isPending || isDeleting}>
              {isPending && <Loader className="mr-2 w-4 h-4 animate-spin" />}
              {isEditMode ? "Enregistrer" : "Créer le module"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
