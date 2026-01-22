import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default async function NotFound({
  searchParams,
}: {
  searchParams: Promise<{ courseId: string }>;
}) {
  const { courseId } = await searchParams;

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex justify-center items-center bg-muted rounded-full w-20 h-20">
          <FileQuestion className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-2xl tracking-tight">
            Module non trouvée
          </h1>
          <p className="mt-2 text-muted-foreground">
            Le module de cours que vous recherchez n&apos;existe pas ou a été
            supprimé.
          </p>
        </div>
      </div>
      <Button asChild>
        <Link href={`/backoffice/courses/${courseId}/modules`}>
          <Home className="mr-2 w-4 h-4" />
          Retour aux modules
        </Link>
      </Button>
    </div>
  );
}
