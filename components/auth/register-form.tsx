"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  registerSchema,
  type RegisterFormData,
} from "@/components/auth/schema";
import { Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // TODO: Implement register with Better Auth
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onError: ({ error }) => {
            toast.error("Erreur d'inscription: " + error.message);
            setErrorMessage(
              "Erreur lors de l'inscription. Veuillez vérifier vos informations et réessayer.",
            );
          },
          onSuccess: () => {
            toast.success("Inscription réussie !");
            router.push("/dashboard");
          },
        },
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      {errorMessage && (
        <div className="mb-4">
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jean Dupont"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-2 w-4 h-4 animate-spin" />
              Inscription
            </>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </Form>
  );
}
