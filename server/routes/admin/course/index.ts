import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import {
  courseIdOrSlugSchema,
  createCourseSchema,
  toggleCourseFeaturedSchema,
  toggleCoursePublishSchema,
  updateCourseSchema,
} from "./schema";
import { db } from "@/db";
import { course } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { utapi } from "@/server/uploadthing";

export const adminCourseRouter = createTRPCRouter({
  create: adminProcedure
    .input(createCourseSchema)
    .mutation(async ({ input }) => {
      try {
        const [createdCourse] = await db
          .insert(course)
          .values({
            ...input,
          })
          .returning();

        if (!createdCourse) {
          throw new Error("Échec de la création du cours");
        }

        return createdCourse;
      } catch (error) {
        console.error("Error creating course:", error);
        throw error;
      }
    }),

  // TODO: Add pagination and filtering
  list: adminProcedure.query(async () => {
    try {
      const courses = await db
        .select()
        .from(course)
        .orderBy(desc(course.createdAt))
        .limit(100);

      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }),

  update: adminProcedure
    .input(updateCourseSchema)
    .mutation(async ({ input }) => {
      try {
        const [updatedCourse] = await db
          .update(course)
          .set({
            ...input,
          })
          .where(eq(course.id, input.id))
          .returning();

        if (!updatedCourse) {
          throw new Error("Cours non trouvé.");
        }

        return updatedCourse;
      } catch (error) {
        console.error("Error updating course:", error);
        throw error;
      }
    }),

  getByIdOrSlug: adminProcedure
    .input(courseIdOrSlugSchema)
    .query(async ({ input: { id, slug } }) => {
      try {
        if ((!id && !slug) || (id && slug)) {
          throw new Error("Seul l'ID ou le slug du cours est requis.");
        }

        const [foundCourse] = await db
          .select()
          .from(course)
          .where(id ? eq(course.id, id) : eq(course.slug, slug!))
          .limit(1);

        if (!foundCourse) {
          return null;
        }

        return foundCourse;
      } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
      }
    }),

  tooglePublish: adminProcedure
    .input(toggleCoursePublishSchema)
    .mutation(async ({ input: { id, isPublished } }) => {
      try {
        const [updatedCourse] = await db
          .update(course)
          .set({ isPublished })
          .where(eq(course.id, id))
          .returning();

        if (!updatedCourse) {
          throw new Error("Cours non trouvé.");
        }

        return updatedCourse;
      } catch (error) {
        console.error("Error toggling publish status:", error);
        throw error;
      }
    }),

  toogleFeatured: adminProcedure
    .input(toggleCourseFeaturedSchema)
    .mutation(async ({ input: { id, isFeatured } }) => {
      try {
        const [updatedCourse] = await db
          .update(course)
          .set({ isFeatured })
          .where(eq(course.id, id))
          .returning();

        if (!updatedCourse) {
          throw new Error("Cours non trouvé.");
        }

        return updatedCourse;
      } catch (error) {
        console.error("Error toggling featured status:", error);
        throw error;
      }
    }),

  delete: adminProcedure
    .input(courseIdOrSlugSchema)
    .mutation(async ({ input: { id, slug } }) => {
      try {
        if ((!id && !slug) || (id && slug)) {
          throw new Error("Seul l'ID ou le slug du cours est requis.");
        }

        const [deletedCourse] = await db
          .delete(course)
          .where(id ? eq(course.id, id) : eq(course.slug, slug!))
          .returning();

        if (!deletedCourse) {
          throw new Error("Cours non trouvé.");
        }

        // Supprimer les images associées sur UploadThing
        const filesToDelete: string[] = [];
        if (deletedCourse.image) {
          const imageKey = deletedCourse.image.split("/").pop();
          if (imageKey) filesToDelete.push(imageKey);
        }
        if (deletedCourse.instructorImage) {
          const instructorKey = deletedCourse.instructorImage.split("/").pop();
          if (instructorKey) filesToDelete.push(instructorKey);
        }

        if (filesToDelete.length > 0) {
          await utapi.deleteFiles(filesToDelete);
        }

        return deletedCourse;
      } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
      }
    }),
});
