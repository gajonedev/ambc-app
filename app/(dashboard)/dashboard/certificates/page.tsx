import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, Lock } from "lucide-react";
import Link from "next/link";
import { mockCertificates, mockInProgressCourses } from "@/lib/mock-data";

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Mes Certificats</h1>
        <p className="text-muted-foreground">
          Vos certificats de réussite pour les formations complétées
        </p>
      </div>

      {/* Earned Certificates */}
      {mockCertificates.length > 0 && (
        <section>
          <h2 className="mb-4 font-semibold text-lg">Certificats obtenus</h2>
          <div className="gap-4 grid md:grid-cols-2">
            {mockCertificates.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex justify-center items-center bg-primary/10 rounded-lg w-16 h-16 shrink-0">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{cert.courseTitle}</h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        Délivré le {cert.issuedAt}
                      </p>
                      <p className="mt-1 font-mono text-muted-foreground text-xs">
                        N° {cert.certificateNumber}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      Validé
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Download className="mr-2 w-4 h-4" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* In Progress */}
      {mockInProgressCourses.length > 0 && (
        <section>
          <h2 className="mb-4 font-semibold text-lg">
            Certificats en préparation
          </h2>
          <div className="gap-4 grid md:grid-cols-2">
            {mockInProgressCourses.map((course) => (
              <Card key={course.id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex justify-center items-center bg-muted rounded-lg w-16 h-16 shrink-0">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        Progression : {course.progress}%
                      </p>
                      <p className="mt-1 text-muted-foreground text-xs">
                        Complétez 100% pour obtenir le certificat
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href={`/dashboard/courses/${course.slug}`}>
                        Continuer la formation
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {mockCertificates.length === 0 && mockInProgressCourses.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
            <h3 className="mb-2 font-medium">Aucun certificat</h3>
            <p className="mb-4 text-muted-foreground text-sm">
              Inscrivez-vous à une formation et complétez-la pour obtenir votre
              certificat.
            </p>
            <Button asChild>
              <Link href="/dashboard/courses">Voir les formations</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
