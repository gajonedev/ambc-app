import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, PlayCircle, Award, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="mx-auto px-4 text-center container">
          <h1 className="mb-6 font-bold text-4xl md:text-6xl tracking-tight">
            Maîtrisez la <span className="text-primary">Conception</span> de
            <br />
            Plans Architecturaux
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
            Une formation complète pour apprendre à concevoir des plans de
            construction professionnels, du début à la fin.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Commencer la formation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#programme">Voir le programme</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16 border-y">
        <div className="mx-auto px-4 container">
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 text-center">
            <div>
              <div className="font-bold text-primary text-3xl md:text-4xl">
                50+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Vidéos de formation
              </div>
            </div>
            <div>
              <div className="font-bold text-primary text-3xl md:text-4xl">
                20h
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                De contenu
              </div>
            </div>
            <div>
              <div className="font-bold text-primary text-3xl md:text-4xl">
                100+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Apprenants formés
              </div>
            </div>
            <div>
              <div className="font-bold text-primary text-3xl md:text-4xl">
                100%
              </div>
              <div className="mt-1 text-muted-foreground text-sm">En ligne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto px-4 container">
          <h2 className="mb-4 font-bold text-3xl text-center">
            Pourquoi cette formation ?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground text-center">
            Apprenez les compétences essentielles pour concevoir des plans
            architecturaux professionnels et lancer votre carrière.
          </p>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <PlayCircle className="mb-2 w-10 h-10 text-primary" />
                <CardTitle className="text-lg">Vidéos HD</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Des vidéos de haute qualité, accessibles à tout moment depuis
                  n&apos;importe où.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="mb-2 w-10 h-10 text-primary" />
                <CardTitle className="text-lg">Progression suivie</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Suivez votre avancement et reprenez là où vous vous êtes
                  arrêté.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="mb-2 w-10 h-10 text-primary" />
                <CardTitle className="text-lg">Certificat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Obtenez un certificat de réussite à la fin de votre formation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 w-10 h-10 text-primary" />
                <CardTitle className="text-lg">Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Un formateur disponible pour répondre à vos questions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programme Section */}
      <section id="programme" className="bg-muted/30 py-20">
        <div className="mx-auto px-4 container">
          <h2 className="mb-4 font-bold text-3xl text-center">
            Programme de la formation
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground text-center">
            Un parcours structuré pour vous amener du niveau débutant au niveau
            professionnel.
          </p>

          <div className="space-y-4 mx-auto max-w-3xl">
            {[
              {
                title: "Module 1 : Introduction aux plans architecturaux",
                lessons: 5,
              },
              {
                title: "Module 2 : Les fondamentaux du dessin technique",
                lessons: 8,
              },
              {
                title: "Module 3 : Lecture et interprétation des plans",
                lessons: 6,
              },
              {
                title: "Module 4 : Conception d'un plan de maison",
                lessons: 10,
              },
              { title: "Module 5 : Les normes et réglementations", lessons: 4 },
              { title: "Module 6 : Projet final", lessons: 3 },
            ].map((module, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row justify-between items-center py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                      <span className="font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <CardTitle className="text-base">{module.title}</CardTitle>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {module.lessons} leçons
                  </span>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto px-4 text-center container">
          <h2 className="mb-4 font-bold text-3xl">Prêt à commencer ?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Rejoignez des centaines d&apos;apprenants qui ont déjà transformé
            leur carrière grâce à cette formation.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">S&apos;inscrire maintenant</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
