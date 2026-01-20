import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b">
        <div className="flex justify-between items-center mx-auto px-4 h-16 container">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-primary rounded-md w-8 h-8">
              <span className="font-bold text-primary-foreground text-sm">
                AC
              </span>
            </div>
            <span className="font-semibold text-lg">Ambition Concept</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild>
              <Link href="/register">S&apos;inscrire</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="mx-auto px-4 py-8 container">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex justify-center items-center bg-primary rounded-md w-8 h-8">
                  <span className="font-bold text-primary-foreground text-sm">
                    AC
                  </span>
                </div>
                <span className="font-semibold">Ambition Concept</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Concevoir avec précision, c&apos;est protéger vos rêves.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Navigation</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Formation</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/register" className="hover:text-foreground">
                    S&apos;inscrire
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Se connecter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Légal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Ambition Concept. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
