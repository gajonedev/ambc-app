export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="mx-auto px-4 container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 font-bold text-4xl">
            Politique de Confidentialité
          </h1>

          <div className="dark:prose-invert max-w-none prose prose-neutral">
            <p className="mb-8 text-muted-foreground">
              Dernière mise à jour : Janvier 2026
            </p>

            <section className="mb-8">
              <h2 className="mb-4 font-semibold text-2xl">
                1. Collecte des données
              </h2>
              <p className="text-muted-foreground">
                Nous collectons les informations que vous nous fournissez lors
                de votre inscription : nom, prénom, adresse email, numéro de
                téléphone. Ces données sont nécessaires pour la création de
                votre compte et l&apos;accès à la formation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-semibold text-2xl">
                2. Utilisation des données
              </h2>
              <p className="text-muted-foreground">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="space-y-1 mt-2 text-muted-foreground list-disc list-inside">
                <li>Gérer votre compte et votre accès à la formation</li>
                <li>Suivre votre progression dans la formation</li>
                <li>
                  Vous envoyer des communications relatives à la formation
                </li>
                <li>Générer votre certificat de réussite</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-semibold text-2xl">
                3. Protection des données
              </h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité appropriées pour
                protéger vos données personnelles contre tout accès non
                autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-semibold text-2xl">
                4. Partage des données
              </h2>
              <p className="text-muted-foreground">
                Nous ne vendons, n&apos;échangeons ni ne transférons vos données
                personnelles à des tiers, sauf pour les besoins du traitement
                des paiements via notre prestataire de paiement sécurisé
                (KkiaPay).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-semibold text-2xl">5. Vos droits</h2>
              <p className="text-muted-foreground">
                Vous disposez d&apos;un droit d&apos;accès, de rectification et
                de suppression de vos données personnelles. Pour exercer ces
                droits, contactez-nous à : contact@ambitionconcept.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 font-semibold text-2xl">6. Cookies</h2>
              <p className="text-muted-foreground">
                Nous utilisons des cookies essentiels pour le fonctionnement de
                la plateforme et le maintien de votre session de connexion.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
