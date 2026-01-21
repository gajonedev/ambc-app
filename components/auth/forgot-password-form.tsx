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
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/components/auth/schema";
import { Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      // TODO: Implement forgot password with Better Auth
      console.log("Forgot password:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex justify-center items-center bg-primary/10 mx-auto rounded-full w-16 h-16">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-lg">Vérifiez votre email</h3>
        <p className="text-muted-foreground text-sm">
          Nous avons envoyé un lien de réinitialisation à{" "}
          <span className="font-medium text-foreground">
            {form.getValues("email")}
          </span>
        </p>
        <div className="pt-4">
          <Button variant="outline" asChild className="w-full">
            <Link href="/login">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour à la connexion
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer le lien"
          )}
        </Button>

        <Button variant="ghost" asChild className="w-full">
          <Link href="/login">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Retour à la connexion
          </Link>
        </Button>
      </form>
    </Form>
  );
}
