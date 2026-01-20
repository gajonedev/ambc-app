import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

/**
 * Example router for testing
 */
export const helloRouter = createTRPCRouter({
  greet: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Bonjour ${input.name ?? "le monde"} !`,
      };
    }),
});
