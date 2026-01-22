import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./routers/_app";

/**
 * Inference helpers for input/output types
 * @example
 * type CourseListOutput = RouterOutputs["admin"]["course"]["list"];
 * type CreateCourseInput = RouterInputs["admin"]["course"]["create"];
 */
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
