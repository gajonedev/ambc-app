import { courseRouter } from "@/server/routes/course";
import { createTRPCRouter } from "../init";
import { helloRouter } from "./hello";

/**
 * Main application router
 * Add your sub-routers here
 */
export const appRouter = createTRPCRouter({
  hello: helloRouter,
  course: courseRouter,
  // TODO: Add more routers here
  // auth: authRouter,
  // modules: modulesRouter,
  // lessons: lessonsRouter,
  // students: studentsRouter,
  // payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;
