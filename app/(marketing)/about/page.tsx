import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto px-4 container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl">À propos</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Découvrez l&apos;histoire d&apos;Ambition Concept et notre mission.
          </p>
        </div>

        {/* Formateur Section */}
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex md:flex-row flex-col items-center gap-8">
                <div className="flex justify-center items-center bg-muted rounded-full w-40 h-40 shrink-0">
                  <span className="text-muted-foreground text-4xl">👨‍🏫</span>
                </div>
                <div>
                  <h2 className="mb-2 font-bold text-2xl">Votre Formateur</h2>
                  <p className="mb-4 font-medium text-primary">
                    Expert en conception architecturale
                  </p>
                  <p className="text-muted-foreground">
                    Avec plus de 10 ans d&apos;expérience dans le domaine de
                    l&apos;architecture et de la conception de plans, je partage
                    mon expertise à travers cette formation complète. Mon
                    objectif est de vous transmettre les compétences pratiques
                    nécessaires pour réussir dans ce métier passionnant.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="mx-auto mt-12 max-w-4xl">
          <h2 className="mb-6 font-bold text-2xl text-center">Notre Mission</h2>
          <div className="gap-6 grid md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-4xl">🎯</div>
                <h3 className="mb-2 font-semibold">Former</h3>
                <p className="text-muted-foreground text-sm">
                  Transmettre les compétences essentielles de la conception
                  architecturale.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-4xl">💡</div>
                <h3 className="mb-2 font-semibold">Inspirer</h3>
                <p className="text-muted-foreground text-sm">
                  Encourager la créativité et l&apos;innovation dans vos
                  projets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-4xl">🚀</div>
                <h3 className="mb-2 font-semibold">Accompagner</h3>
                <p className="text-muted-foreground text-sm">
                  Vous guider jusqu&apos;à l&apos;obtention de votre certificat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quote */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <blockquote className="text-muted-foreground text-2xl italic">
            &ldquo;Concevoir avec précision, c&apos;est protéger vos
            rêves.&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold">— Ambition Concept</p>
        </div>
      </div>
    </div>
  );
}
