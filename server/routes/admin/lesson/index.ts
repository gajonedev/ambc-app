import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import {
  createLessonSchema,
  lessonIdSchema,
  lessonsByModuleSchema,
  reorderLessonsSchema,
  toggleLessonPublishSchema,
  updateLessonSchema,
} from "./schema";
import { lesson } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const adminLessonRouter = createTRPCRouter({
  create: adminProcedure
    .input(createLessonSchema)
    .mutation(async ({ input }) => {
      try {
        const [createdLesson] = await db
          .insert(lesson)
          .values({
            ...input,
          })
          .returning();

        if (!createdLesson) {
          throw new Error("Échec de la création de la leçon");
        }

        return createdLesson;
      } catch (error) {
        console.error("Error creating lesson:", error);
        throw error;
      }
    }),

  update: adminProcedure
    .input(updateLessonSchema)
    .mutation(async ({ input }) => {
      try {
        const [updatedLesson] = await db
          .update(lesson)
          .set({
            ...input,
          })
          .where(eq(lesson.id, input.id))
          .returning();

        if (!updatedLesson) {
          throw new Error("Leçon non trouvée.");
        }

        return updatedLesson;
      } catch (error) {
        console.error("Error updating lesson:", error);
        throw error;
      }
    }),

  getById: adminProcedure.input(lessonIdSchema).query(async ({ input }) => {
    try {
      const [foundLesson] = await db
        .select()
        .from(lesson)
        .where(eq(lesson.id, input.id))
        .limit(1);

      if (!foundLesson) {
        throw new Error("Leçon non trouvée.");
      }

      return foundLesson;
    } catch (error) {
      console.error("Error fetching lesson by ID:", error);
      throw error;
    }
  }),

  listByModule: adminProcedure
    .input(lessonsByModuleSchema)
    .query(async ({ input }) => {
      try {
        const lessons = await db
          .select()
          .from(lesson)
          .where(eq(lesson.moduleId, input.moduleId))
          .orderBy(lesson.order);

        return lessons;
      } catch (error) {
        console.error("Error fetching lessons by module:", error);
        throw error;
      }
    }),

  togglePublish: adminProcedure
    .input(toggleLessonPublishSchema)
    .mutation(async ({ input: { id, isPublished } }) => {
      try {
        const [updatedLesson] = await db
          .update(lesson)
          .set({ isPublished })
          .where(eq(lesson.id, id))
          .returning();

        if (!updatedLesson) {
          throw new Error("Erreur. Leçon non trouvée.");
        }

        return updatedLesson;
      } catch (error) {
        console.error("Error toggling lesson publish status:", error);
        throw error;
      }
    }),

  reorder: adminProcedure
    .input(reorderLessonsSchema)
    .mutation(async ({ input }) => {
      try {
        const updatePromises = input.lessons.map(({ id, order }) =>
          db.update(lesson).set({ order }).where(eq(lesson.id, id)),
        );

        await Promise.all(updatePromises);

        return { success: true };
      } catch (error) {
        console.error("Error reordering lessons:", error);
        throw error;
      }
    }),

  delete: adminProcedure.input(lessonIdSchema).mutation(async ({ input }) => {
    try {
      const [deletedLesson] = await db
        .delete(lesson)
        .where(eq(lesson.id, input.id))
        .returning();

      if (!deletedLesson) {
        throw new Error("Erreur. Leçon non trouvée.");
      }

      return deletedLesson;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      throw error;
    }
  }),
});
