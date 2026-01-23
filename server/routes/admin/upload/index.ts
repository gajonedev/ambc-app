import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import { deleteFileSchema } from "./schema";
import { utapi } from "@/server/uploadthing";

export const adminFileRouter = createTRPCRouter({
  /**
   * Supprime un fichier uploadé sur UploadThing
   * L'URL doit être une URL UploadThing valide (contenant le fileKey)
   */
  delete: adminProcedure.input(deleteFileSchema).mutation(async ({ input }) => {
    try {
      const { filesUrls } = input;

      // Extraire la fileKey de l'URL
      // Format: https://<APP_ID>.ufs.sh/f/<FILE_KEY>
      // ou ancien format: https://utfs.io/f/<FILE_KEY>
      const filesKeys = filesUrls.map((fileUrl) => {
        const urlObj = new URL(fileUrl);
        const pathParts = urlObj.pathname.split("/");
        const fileKey = pathParts[pathParts.length - 1];

        if (!fileKey) {
          throw new Error(
            "Impossible d'extraire la clé du fichier de l'URL: " + fileUrl,
          );
        }

        return fileKey;
      });

      if (!filesKeys || filesKeys.length === 0) {
        throw new Error("Impossible d'extraire la clé du fichier de l'URL");
      }

      const { success, deletedCount } = await utapi.deleteFiles(filesKeys);

      if (!success) {
        throw new Error("Échec de la suppression du fichier");
      }

      return { success, deletedCount };
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }),
});
