"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // TODO: Implement login with Better Auth
      await authClient.signIn.email(
        {
          ...data,
        },
        {
          onError: ({ error }) => {
            setErrorMessage(
              "Erreur de connexion. Veuillez vérifier vos identifiants et réessayer.",
            );
            toast.error("Erreur de connexion: " + error.message);
          },
          onSuccess: () => {
            toast.success("Connexion réussie !");
            router.push("/dashboard");
          },
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      // form.resetField("password");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
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
              <div className="flex justify-between items-center">
                <FormLabel>Mot de passe</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-primary text-sm hover:underline"
                  tabIndex={-1}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="**********"
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
              Connexion
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </Form>
  );
}
