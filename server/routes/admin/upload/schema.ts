import { z } from "zod";

export const deleteFileSchema = z.object({
  filesUrls: z.array(z.url()).min(1, "At least one file URL is required"),
});

export type DeleteFileInput = z.infer<typeof deleteFileSchema>;
