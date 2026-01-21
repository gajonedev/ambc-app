"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "@/components/auth/schema";
import { Loader } from "lucide-react";
import { useState } from "react";

interface VerifyOtpFormProps {
  email?: string;
  onResend?: () => Promise<void>;
}

export function VerifyOtpForm({ email, onResend }: VerifyOtpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: VerifyOtpFormData) {
    setIsLoading(true);
    try {
      // TODO: Implement OTP verification with Better Auth
      console.log("Verify OTP:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await onResend?.();
      // Start countdown
      setCountdown(60);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">
          Nous avons envoyé un code de vérification à
        </p>
        {email && <p className="font-medium">{email}</p>}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 w-4 h-4 animate-spin" />
                Vérification...
              </>
            ) : (
              "Vérifier"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Vous n&apos;avez pas reçu le code ?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isResending}
            className="disabled:opacity-50 text-primary hover:underline disabled:cursor-not-allowed"
          >
            {isResending
              ? "Envoi..."
              : countdown > 0
                ? `Renvoyer dans ${countdown}s`
                : "Renvoyer"}
          </button>
        </p>
      </div>
    </div>
  );
}
