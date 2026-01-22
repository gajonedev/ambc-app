import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 min-h-screen">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex justify-center items-center bg-muted rounded-full w-20 h-20">
          <FileQuestion className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-4xl tracking-tight">404</h1>
          <h2 className="mt-2 font-semibold text-xl">Page non trouvée</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </Button>
    </div>
  );
}
