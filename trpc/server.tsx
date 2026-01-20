import "server-only";
// ^-- ensure this file cannot be imported from the client

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import {
  dehydrate,
  HydrationBoundary,
  type FetchQueryOptions,
} from "@tanstack/react-query";
import { cache } from "react";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

/**
 * tRPC proxy for server components
 * Use this to prefetch queries or call procedures directly
 */
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

/**
 * Server-side caller for direct procedure calls
 * Use this when you need data in a server component without hydration
 */
export const caller = appRouter.createCaller(createTRPCContext);

/**
 * Helper to prefetch a query
 */
export function prefetch<T>(queryOptions: FetchQueryOptions<T>) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryOptions);
}

/**
 * HydrateClient component to wrap client components
 * that need access to prefetched data
 */
export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}
