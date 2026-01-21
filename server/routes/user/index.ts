import { createTRPCRouter } from "@/trpc/init";
import { userCourseRouter } from "./course";

export const userRouter = createTRPCRouter({
  course: userCourseRouter,
});
