import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "@/lib/auth";

/**
 * Context creation - runs for every request
 * Add database clients, auth session, etc.
 */
export const createTRPCContext = cache(async () => {
  // TODO: Add auth session here
  // const session = await auth();

  return {
    // session,
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialize tRPC
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create callers and routers
 */
export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

/**
 * Procedures
 */
export const publicProcedure = t.procedure;

// TODO: Add authenticated procedure
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data || !data.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: data,
    },
  });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { user } = ctx.auth;

  if (user.role !== "admin") {
    console.error(
      "Forbidden access attempt by user:",
      user.name,
      "(",
      user.email,
      ") with ID:",
      user.id,
    );

    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }

  return next();
});
