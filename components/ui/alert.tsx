import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative items-start gap-y-0.5 has-[>svg]:gap-x-3 grid grid-cols-[0_1fr] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] px-4 py-3 border rounded-lg w-full [&>svg]:size-4 [&>svg]:text-current text-sm [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-destructive/15 border-destructive [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        info: "bg-blue-800/15 text-blue-800 border-blue-800 [&>svg]:text-blue-500 *:data-[slot=alert-description]:text-blue-900",
        success:
          "bg-green-800/15 text-green-800 border-green-800 [&>svg]:text-green-500 *:data-[slot=alert-description]:text-green-900",
        warning:
          "bg-yellow-800/15 text-yellow-800 border-yellow-800 [&>svg]:text-yellow-500 *:data-[slot=alert-description]:text-yellow-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 min-h-4 font-medium line-clamp-1 tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "justify-items-start gap-1 grid col-start-2 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
