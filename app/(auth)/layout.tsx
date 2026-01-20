import { ReactNode } from "react";
import Link from "next/link";
import { GraduationCap, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  "Accès illimité à tous les modules",
  "Vidéos HD téléchargeables",
  "Ressources et exercices pratiques",
  "Certificat de réussite",
  "Support personnalisé",
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <aside className="hidden relative lg:flex bg-primary/70 lg:w-1/2 xl:w-2/5 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="z-10 relative flex flex-col justify-between p-8 lg:p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-primary-foreground rounded-lg w-10 h-10">
              <span className="font-bold text-primary text-lg">AC</span>
            </div>
            <span className="font-semibold text-primary-foreground text-xl">
              Ambition Concept
            </span>
          </Link>

          {/* Main Content */}
          <div className="flex flex-col flex-1 justify-center py-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-2 rounded-full">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
                <span className="font-medium text-primary-foreground text-sm">
                  Formation Professionnelle
                </span>
              </div>

              <h1 className="font-bold text-primary-foreground text-3xl lg:text-4xl xl:text-5xl leading-tight">
                Maîtrisez la conception de{" "}
                <span className="text-secondary">plans architecturaux</span>
              </h1>

              <p className="max-w-md text-primary-foreground/80 text-lg">
                Apprenez à créer des plans de construction professionnels et
                lancez votre carrière dans l&apos;architecture.
              </p>

              {/* Features */}
              <ul className="space-y-3 pt-4">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-primary-foreground/90"
                  >
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Ambition Concept. Tous droits réservés.
          </div>
        </div>
      </aside>

      {/* Right Side - Form */}
      <main className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="lg:hidden border-b">
          <div className="flex items-center px-4 h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-primary rounded-md w-8 h-8">
                <span className="font-bold text-primary-foreground text-sm">
                  AC
                </span>
              </div>
              <span className="font-semibold">Ambition Concept</span>
            </Link>
          </div>
        </header>

        {/* Form Container */}
        <div className="flex flex-1 justify-center items-center p-4 sm:p-8">
          <Card className="px-6 w-full max-w-md">{children}</Card>
        </div>

        {/* Mobile Footer */}
        <footer className="lg:hidden py-4 border-t">
          <div className="px-4 text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Ambition Concept. Tous droits réservés.
          </div>
        </footer>
      </main>
    </div>
  );
}
