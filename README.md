# 🏗️ Ambition Concept

> **Formation en Ligne - Conception de Plans Architecturaux**  
> _"Concevoir avec précision, c'est protéger vos rêves"_

Plateforme de formation en ligne dédiée à l'apprentissage de la conception de plans architecturaux. Une formation unique gérée par un seul formateur avec son backoffice dédié.

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router)
- **UI** : React 19, Tailwind CSS 4, shadcn/ui
- **Backend** : tRPC, Prisma, PostgreSQL
- **Auth** : Better Auth
- **Paiement** : KkiaPay
- **Emails** : Resend

## 🚀 Getting Started

```bash
# Installation
pnpm install

# Lancer le serveur de développement
pnpm dev

# Ouvrir http://localhost:3000
```

## 📋 Roadmap des Fonctionnalités

### ✅ Terminé

- [x] Structure Next.js 15 + App Router
- [x] UI (shadcn/ui, Tailwind 4)
- [x] Pages Auth (login, register, forgot-password, verify)
- [x] Better Auth (email only)
- [x] tRPC + TanStack Query setup
- [x] Layout Dashboard utilisateur (sidebar shadcn)
- [x] Layout Backoffice admin (sidebar shadcn)
- [x] Pages UI Dashboard (learn, progress, certificate, profile, payment)
- [x] Pages UI Backoffice (modules, students, payments, settings)
- [x] Prisma schema basique (User, Session, Account)

---

### 🗄️ Phase 1 : Base de Données & Modèles

- [ ] Ajouter `role` au User (ADMIN/STUDENT)
- [ ] Créer modèle `Module`
- [ ] Créer modèle `Lesson`
- [ ] Créer modèle `Resource`
- [ ] Créer modèle `Progress`
- [ ] Créer modèle `Payment`
- [ ] Créer modèle `Certificate`
- [ ] Migrer la base de données

---

### 🔌 Phase 2 : tRPC Routers Backend

- [ ] Créer router `modules.ts` - CRUD modules
- [ ] Créer router `lessons.ts` - CRUD leçons + upload vidéo
- [ ] Créer router `students.ts` - Liste/gestion apprenants
- [ ] Créer router `progress.ts` - Suivi progression
- [ ] Créer router `payments.ts` - Suivi paiements
- [ ] Créer router `certificate.ts` - Génération certificat
- [ ] Ajouter `protectedProcedure` (middleware auth)
- [ ] Ajouter `adminProcedure` (middleware admin)

---

### 👨‍🏫 Phase 3 : Backoffice Fonctionnel

#### Gestion des Modules

- [ ] Liste des modules (avec tRPC)
- [ ] Créer un module
- [ ] Éditer un module
- [ ] Supprimer un module
- [ ] Réordonner les modules (drag & drop)
- [ ] Publier / Dépublier un module

#### Gestion des Leçons

- [ ] Liste des leçons par module
- [ ] Créer une leçon
- [ ] Upload vidéo (Vercel Blob ou S3)
- [ ] Éditer une leçon
- [ ] Ajouter ressources (PDF, fichiers)
- [ ] Supprimer une leçon
- [ ] Réordonner les leçons

#### Gestion des Apprenants

- [ ] Liste des apprenants (avec statut paiement)
- [ ] Voir progression d'un apprenant
- [ ] Activer/Désactiver accès manuellement
- [ ] Filtrer par statut de paiement

#### Dashboard Admin

- [ ] Stats réelles (nombre apprenants, revenus)
- [ ] Derniers inscrits
- [ ] Progression moyenne des apprenants

---

### 🎓 Phase 4 : Espace Apprenant Fonctionnel

#### Lecteur de Formation

- [ ] Fetch modules/leçons depuis tRPC
- [ ] Lecteur vidéo fonctionnel
- [ ] Contrôle de vitesse (0.5x - 2x)
- [ ] Mode plein écran
- [ ] Téléchargement des ressources
- [ ] Navigation entre leçons (précédent/suivant)

#### Suivi de Progression

- [ ] Marquer leçon comme vue
- [ ] Sauvegarder position vidéo (reprise auto)
- [ ] Calcul % progression par module
- [ ] Calcul % progression globale
- [ ] Dashboard avec vraies données

#### Certificat

- [ ] Vérifier 100% complétion
- [ ] Générer PDF certificat
- [ ] Numéro unique de certificat
- [ ] Lien de vérification public

---

### 💳 Phase 5 : Paiements KkiaPay

#### Intégration

- [ ] Configuration SDK KkiaPay
- [ ] Bouton de paiement
- [ ] Webhook de validation
- [ ] Déblocage accès automatique après paiement
- [ ] Page succès paiement
- [ ] Page échec paiement

#### Suivi

- [ ] Table paiements dans backoffice
- [ ] Statuts (Complété / En attente / Échoué)
- [ ] Montant et date
- [ ] Export CSV

---

### 📧 Phase 6 : Emails (Resend)

- [ ] Configuration Resend
- [ ] Email de bienvenue (inscription)
- [ ] Email confirmation paiement
- [ ] Email réinitialisation mot de passe
- [ ] Email certificat obtenu

---

### 🌐 Phase 7 : Pages Marketing

#### Landing Page

- [ ] Hero section (accroche + CTA)
- [ ] Présentation de la formation
- [ ] Programme détaillé (modules)
- [ ] À propos du formateur
- [ ] Prix et CTA inscription
- [ ] FAQ

#### Autres Pages

- [ ] Page À propos
- [ ] Page Contact (fonctionnelle)
- [ ] CGU / Mentions légales

---

### ✨ Phase 8 : Finitions

#### Optimisations

- [ ] SEO (meta, OpenGraph)
- [ ] Performance (images, lazy loading)
- [ ] Gestion des erreurs (error boundaries)
- [ ] Loading states (skeletons)
- [ ] Responsive design

#### Déploiement

- [ ] Configuration Vercel
- [ ] Variables d'environnement production
- [ ] Domaine custom
- [ ] SSL

---

## 📁 Structure du Projet

```
ambc-app/
├── app/
│   ├── (auth)/           # Pages d'authentification
│   ├── (marketing)/      # Pages publiques
│   ├── (dashboard)/      # Espace apprenant
│   ├── (backoffice)/     # Espace admin
│   └── api/              # API routes (tRPC, auth, webhooks)
├── components/
│   ├── ui/               # shadcn/ui
│   ├── auth/             # Composants auth
│   ├── dashboard/        # Composants dashboard
│   └── backoffice/       # Composants backoffice
├── lib/                  # Utilitaires (auth, prisma, etc.)
├── trpc/                 # Configuration tRPC
├── prisma/               # Schema & migrations
└── server/               # Logique serveur
```

## 📝 Documentation

- [PLAN.md](./PLAN.md) - Plan de développement détaillé

## 📄 License

Propriétaire - Ambition Concept
