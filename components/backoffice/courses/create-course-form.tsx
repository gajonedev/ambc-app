"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { createCourseFormSchema, type CreateCourseFormInput } from "./schemas";

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
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { User } from "better-auth";

export function CreateCourseForm({ user }: { user?: User }) {
  const router = useRouter();
  const trpc = useTRPC();

  const form = useForm<CreateCourseFormInput>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      image: user?.image ?? "",
      price: "0",
      currency: "XOF",
      isPublished: false,
      isFeatured: false,
      instructorName: user?.name ?? "",
      instructorBio: "",
      instructorImage: "",
    },
  });

  const { mutate, isPending } = useMutation(
    trpc.admin.course.create.mutationOptions({
      onSuccess: ({ title }) => {
        toast.success("Formation " + title + " créée avec succès !");
        router.push(`/backoffice/courses`);
      },
      onError: (error) => {
        toast.error(
          "Erreur lors de la création du cours: " + error.message ||
            "Erreur lors de la création",
        );
      },
    }),
  );

  const onSubmit = (data: CreateCourseFormInput) => {
    mutate(data);
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
                        // Auto-generate slug if slug is empty or matches previous auto-generated
                        const currentSlug = form.getValues("slug");
                        const previousTitle = field.value;
                        if (
                          !currentSlug ||
                          currentSlug === generateSlug(previousTitle)
                        ) {
                          form.setValue("slug", generateSlug(e.target.value));
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
                  <FormLabel>Image de couverture</FormLabel>
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
                  <FormLabel>Nom du formateur</FormLabel>
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
                  <FormLabel>Photo du formateur</FormLabel>
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
                    (Si vous changez l&apos;image, veuillez cliquez sur le
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
              Contrôlez la visibilité de votre formation une fois crée (vous
              pouvez changer ces paramètres après avoir crée la formation)
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

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/backoffice/courses">Annuler</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader className="mr-2 w-4 h-4 animate-spin" />}
            Créer la formation
          </Button>
        </div>
      </form>
    </Form>
  );
}
