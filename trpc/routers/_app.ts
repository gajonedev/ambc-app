import { adminRouter } from "@/server/routes/admin";
import { createTRPCRouter } from "../init";
import { userRouter } from "@/server/routes/user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  admin: adminRouter,
  // auth: authRouter,
  // modules: modulesRouter,
  // lessons: lessonsRouter,
  // students: studentsRouter,
  // payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;
