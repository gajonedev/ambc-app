"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { createModuleFormSchema, type CreateModuleFormInput } from "./schemas";

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

interface CreateModuleFormProps {
  courseId: string;
  defaultOrder?: number;
}

export function CreateModuleForm({
  courseId,
  defaultOrder = 1,
}: CreateModuleFormProps) {
  const router = useRouter();
  const trpc = useTRPC();

  const form = useForm<CreateModuleFormInput>({
    resolver: zodResolver(createModuleFormSchema),
    defaultValues: {
      title: "",
      description: "",
      order: defaultOrder,
      isPublished: false,
      courseId: courseId,
    },
  });

  const { mutate, isPending } = useMutation(
    trpc.admin.module.create.mutationOptions({
      onSuccess: ({ title }) => {
        toast.success(`Module "${title}" créé avec succès !`);
        router.push(`/backoffice/courses/${courseId}`);
      },
      onError: (error) => {
        toast.error(error.message || "Erreur lors de la création du module");
      },
    }),
  );

  const onSubmit = (data: CreateModuleFormInput) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Informations du module */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du module</CardTitle>
            <CardDescription>
              Remplissez les informations de base du module
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
                      Rendre automatiquement ce module visible aux apprenants
                      inscrits
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
        <div className="flex justify-end items-center gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href={`/backoffice/courses/${courseId}`}>Annuler</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader className="animate-spin" />}
            Créer le module
          </Button>
        </div>
      </form>
    </Form>
  );
}
