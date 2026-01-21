import { db } from "@/db";
import { course } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const userCourseRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({}) => {
    try {
      const courses = await db.select().from(course);
      console.log("Fetched courses:", courses);

      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw new Error("Failed to fetch courses");
    }
  }),
});
