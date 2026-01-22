"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { ImageIcon, Loader, Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { normalizeFileSize } from "@/utils";

interface ImageDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  endpoint: keyof OurFileRouter;
  disabled?: boolean;
  className?: string;
  /** Options de compression (optionnel) */
  compressionOptions?: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    quality?: number;
  };
}

interface ImageDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  endpoint: keyof OurFileRouter;
  disabled?: boolean;
  className?: string;
}

export function ImageDropzone({
  value,
  onChange,
  endpoint,
  disabled,
  className,
  compressionOptions,
}: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  // Options de compression par défaut (mémoïsées)
  const compressionConfig = useMemo(
    () => ({
      maxSizeMB: compressionOptions?.maxSizeMB ?? 1,
      maxWidthOrHeight: compressionOptions?.maxWidthOrHeight ?? 1920,
      useWebWorker: true,
    }),
    [compressionOptions?.maxSizeMB, compressionOptions?.maxWidthOrHeight],
  );

  // UploadThing upload hook
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.ufsUrl) {
        onChange(res[0].ufsUrl);
        toast.success("Fichier importé avec succès !");
      }

      // Nettoyer le preview
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImageUploaded(true);
      setPreview(null);
      setFile(null);
      setProgress(0);
    },

    onUploadError: (error) => {
      toast.error(
        "Erreur d'importation du fichier: " + error.message ||
          "Erreur lors de l'import",
      );
      setProgress(0);
    },

    onUploadProgress: (p) => {
      setProgress(p);
    },
  });

  // Dropzone setup
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (selectedFile) {
        // Compresser l'image si c'est une image
        if (selectedFile.type.startsWith("image/")) {
          setIsCompressing(true);
          try {
            const compressedFile = await imageCompression(
              selectedFile,
              compressionConfig,
            );

            // Créer un nouveau File avec le nom original
            const finalFile = new File([compressedFile], selectedFile.name, {
              type: compressedFile.type,
            });

            setFile(finalFile);
            const objectUrl = URL.createObjectURL(finalFile);
            setPreview(objectUrl);
          } catch (error) {
            console.error("Erreur de compression:", error);
            // Fallback: utiliser le fichier original
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
          } finally {
            setIsCompressing(false);
          }
        } else {
          setFile(selectedFile);
          const objectUrl = URL.createObjectURL(selectedFile);
          setPreview(objectUrl);
        }
      }
    },
    [compressionConfig],
  );

  // Initialize react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    maxFiles: 1,
    disabled: disabled || isUploading,
    maxSize: 8 * 1024 * 1024, // 8MB
    onError: (err) => {
      toast.error("Erreur lors de la sélection du fichier: " + err.message);
    },
    onDropRejected: (f) => {
      toast.error(
        "Erreur lors de la sélection du fichier: " + f[0].errors[0].message,
      );
    },
  });

  // Handlers
  const handleUpload = async () => {
    if (!file) return;
    await startUpload([file]);
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFile(null);
    onChange("");
  };

  const displayImage = preview || value;

  return (
    <div className={cn("space-y-3", className)}>
      {displayImage ? (
        <div className="relative">
          <div className="relative bg-muted border rounded-lg w-full aspect-video overflow-hidden">
            <Image
              src={displayImage}
              alt="Aperçu"
              fill
              className="object-cover"
              unoptimized={preview !== null}
            />
          </div>
          {!imageUploaded && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="-top-2 -right-2 absolute w-6 h-6"
              onClick={handleRemove}
              disabled={disabled || isUploading || isCompressing}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col justify-center items-center gap-2 p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            (disabled || isUploading) && "cursor-not-allowed opacity-50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex justify-center items-center bg-muted rounded-full w-12 h-12">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          {isDragActive ? (
            <p className="text-primary text-sm">Déposez l&apos;image ici...</p>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">
                Glissez-déposez une image ici
              </p>
              <p className="text-muted-foreground text-xs">
                ou cliquez pour sélectionner
              </p>
            </>
          )}
          <p className="text-muted-foreground/75 text-xs">
            PNG, JPG, WEBP ou GIF
          </p>
        </div>
      )}

      {/* Indicateur de compression */}
      {isCompressing && (
        <div className="relative flex justify-center items-center gap-2 bg-muted/50 p-4 border rounded-lg">
          <Loader className="w-4 h-4 animate-spin" />
          <span className="text-muted-foreground text-sm">Traitement...</span>
        </div>
      )}

      {/* Bouton Importer - visible quand une image est en preview */}
      {preview && file && !isCompressing && (
        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || isCompressing}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Import en cours... {progress}%
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Importer {`(${normalizeFileSize(file.size)})`}
              </>
            )}
          </Button>
          {isUploading && <Progress value={progress} className="h-2" />}
        </div>
      )}
    </div>
  );
}
