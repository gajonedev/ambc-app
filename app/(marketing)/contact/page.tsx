import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="mx-auto px-4 container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-4xl">Contact</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Une question ? N&apos;hésitez pas à nous contacter.
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-5xl">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons dans
                les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="gap-4 grid grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" placeholder="+229 XX XX XX XX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12 shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Email</h3>
                    <p className="text-muted-foreground">
                      contact@ambitionconcept.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12 shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Téléphone</h3>
                    <p className="text-muted-foreground">+229 XX XX XX XX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12 shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Adresse</h3>
                    <p className="text-muted-foreground">Cotonou, Bénin</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Suivez-nous</h3>
                <div className="flex gap-4">
                  <div className="flex justify-center items-center bg-muted hover:bg-muted/80 rounded-full w-10 h-10 cursor-pointer">
                    <span>📘</span>
                  </div>
                  <div className="flex justify-center items-center bg-muted hover:bg-muted/80 rounded-full w-10 h-10 cursor-pointer">
                    <span>📸</span>
                  </div>
                  <div className="flex justify-center items-center bg-muted hover:bg-muted/80 rounded-full w-10 h-10 cursor-pointer">
                    <span>🔗</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
