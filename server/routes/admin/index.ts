import { createTRPCRouter } from "@/trpc/init";
import { adminCourseRouter } from "./course";
import { adminLessonRouter } from "./lesson";
import { adminModuleRouter } from "./module";
import { adminFileRouter } from "./upload";

export const adminRouter = createTRPCRouter({
  course: adminCourseRouter,
  module: adminModuleRouter,
  lesson: adminLessonRouter,
  file: adminFileRouter,
});
