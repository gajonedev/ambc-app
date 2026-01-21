import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import {
  createModuleSchema,
  modulesByCourseSchema,
  reorderModulesSchema,
  toggleModulePublishSchema,
  updateModuleSchema,
} from "./schema";
import { db } from "@/db";
import { courseModule } from "@/db/schema";
import { eq } from "drizzle-orm";

export const adminModuleRouter = createTRPCRouter({
  create: adminProcedure
    .input(createModuleSchema)
    .mutation(async ({ input }) => {
      try {
        const [createdModule] = await db
          .insert(courseModule)
          .values({
            ...input,
          })
          .returning();

        if (!createdModule) {
          throw new Error("Échec de la création du module");
        }

        return createdModule;
      } catch (error) {
        console.error("Error creating module:", error);
        throw error;
      }
    }),

  update: adminProcedure
    .input(updateModuleSchema)
    .mutation(async ({ input }) => {
      try {
        const [updatedModule] = await db
          .update(courseModule)
          .set({
            ...input,
          })
          .where(eq(courseModule.id, input.id))
          .returning();

        if (!updatedModule) {
          throw new Error("Module non trouvé.");
        }

        return updatedModule;
      } catch (error) {
        console.error("Error updating module:", error);
        throw error;
      }
    }),

  getById: adminProcedure
    .input(updateModuleSchema)
    .query(async ({ input: { id } }) => {
      try {
        const [foundModule] = await db
          .select()
          .from(courseModule)
          .where(eq(courseModule.id, id))
          .limit(1);

        if (!foundModule) {
          throw new Error("Module non trouvé.");
        }

        return foundModule;
      } catch (error) {
        console.error("Error fetching module by ID:", error);
        throw error;
      }
    }),

  listByCourse: adminProcedure
    .input(modulesByCourseSchema)
    .query(async ({ input: { courseId } }) => {
      try {
        const modules = await db
          .select()
          .from(courseModule)
          .where(eq(courseModule.courseId, courseId))
          .orderBy(courseModule.order);

        return modules;
      } catch (error) {
        console.error("Error fetching modules by course ID:", error);
        throw error;
      }
    }),

  togglePublish: adminProcedure
    .input(toggleModulePublishSchema)
    .mutation(async ({ input: { id, isPublished } }) => {
      try {
        const [updatedModule] = await db
          .update(courseModule)
          .set({ isPublished })
          .where(eq(courseModule.id, id))
          .returning();

        if (!updatedModule) {
          throw new Error("Module non trouvé.");
        }

        return updatedModule;
      } catch (error) {
        console.error("Error toggling module publish status:", error);
        throw error;
      }
    }),

  reorder: adminProcedure
    .input(reorderModulesSchema)
    .mutation(async ({ input }) => {
      try {
        const updatePromises = input.modules.map(({ id, order }) =>
          db.update(courseModule).set({ order }).where(eq(courseModule.id, id)),
        );

        await Promise.all(updatePromises);

        return { success: true };
      } catch (error) {
        console.error("Error reordering modules:", error);
        throw error;
      }
    }),

  delete: adminProcedure
    .input(updateModuleSchema)
    .mutation(async ({ input: { id } }) => {
      try {
        const [deletedModule] = await db
          .delete(courseModule)
          .where(eq(courseModule.id, id))
          .returning();

        if (!deletedModule) {
          throw new Error("Module non trouvé ou déjà supprimé.");
        }

        return deletedModule;
      } catch (error) {
        console.error("Error deleting module:", error);
        throw error;
      }
    }),
});
