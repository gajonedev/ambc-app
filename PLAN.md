# 📋 AMBITION CONCEPT - Plan de Développement

> **Formation en Ligne - Conception de Plans Architecturaux**  
> _"Concevoir avec précision, c'est protéger vos rêves"_

---

## 📌 Table des Matières

1. [Vue d'Ensemble](#1-vue-densemble)
2. [Stack Technique](#2-stack-technique)
3. [Architecture](#3-architecture)
4. [Fonctionnalités](#4-fonctionnalités)
5. [Modèles de Données](#5-modèles-de-données)
6. [Pages & Routes](#6-pages--routes)
7. [Intégrations Tierces](#7-intégrations-tierces)
8. [Sécurité](#8-sécurité)
9. [Déploiement](#9-déploiement)
10. [Roadmap](#10-roadmap)

---

## 1. Vue d'Ensemble

### 1.1 Description du Projet

Ambition Concept est une plateforme de formation en ligne dédiée à l'apprentissage de la **conception de plans architecturaux**. Ce n'est pas un marketplace - c'est une formation unique gérée par un seul formateur avec son backoffice dédié.

### 1.2 Objectifs Principaux

- [ ] Offrir une expérience d'apprentissage fluide pour les apprenants
- [ ] Permettre au formateur de gérer ses vidéos et contenus facilement
- [ ] Gérer les paiements des apprenants (KkiaPay)
- [ ] Suivre la progression des apprenants
- [ ] Délivrer des certificats de formation
- [ ] Fournir des statistiques au formateur

### 1.3 Utilisateurs

| Rôle          | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| **Admin**     | Le formateur - Gestion complète via backoffice                |
| **Apprenant** | Utilisateur inscrit qui suit la formation                     |
| **Visiteur**  | Navigation publique (landing page, présentation, inscription) |

### 1.4 Concept Clé

```
┌─────────────────────────────────────────────────────────────┐
│                    AMBITION CONCEPT                          │
├─────────────────────────────────────────────────────────────┤
│  1 Formateur (Admin) → 1 Formation → N Apprenants           │
│                                                              │
│  Formation : Conception de Plans Architecturaux              │
│  ├── Module 1 : Les bases                                   │
│  │   ├── Leçon 1.1 (Vidéo)                                  │
│  │   ├── Leçon 1.2 (Vidéo)                                  │
│  │   └── ...                                                │
│  ├── Module 2 : Techniques avancées                         │
│  │   └── ...                                                │
│  └── Module N : ...                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Stack Technique

### 2.1 Frontend

| Outil               | Usage                        | Version |
| ------------------- | ---------------------------- | ------- |
| **Next.js 15**      | Framework React (App Router) | ^15.x   |
| **React 19**        | Librairie UI                 | ^19.x   |
| **TypeScript**      | Typage statique              | ^5.x    |
| **Tailwind CSS 4**  | Styling                      | ^4.x    |
| **shadcn/ui**       | Composants UI                | Latest  |
| **React Hook Form** | Gestion des formulaires      | ^7.x    |
| **Zod**             | Validation des schémas       | ^3.x    |
| **TanStack Query**  | Data fetching & caching      | ^5.x    |

### 2.2 Backend

| Outil                  | Usage                       |
| ---------------------- | --------------------------- |
| **Next.js API Routes** | Server Actions              |
| **tRPC**               | API type-safe (obligatoire) |
| **Prisma**             | ORM                         |
| **PostgreSQL**         | Base de données             |

### 2.3 Authentification

| Outil            | Usage                               |
| ---------------- | ----------------------------------- |
| **Better Auth**  | Authentification & sessions         |
| **RBAC intégré** | Gestion des rôles (Admin/Apprenant) |

### 2.4 Stockage & Media

| Outil                          | Usage                    |
| ------------------------------ | ------------------------ |
| **Vercel Blob** ou **S3**      | Stockage vidéos/fichiers |
| **Cloudflare Stream** _(opt.)_ | Streaming vidéo sécurisé |

### 2.5 Paiements

| Outil       | Usage                        |
| ----------- | ---------------------------- |
| **KkiaPay** | Paiements mobile money/carte |

### 2.6 Communication

| Outil      | Usage                  |
| ---------- | ---------------------- |
| **Resend** | Emails transactionnels |

### 2.7 Outils de Développement

| Outil        | Usage           |
| ------------ | --------------- |
| **pnpm**     | Package manager |
| **ESLint**   | Linting         |
| **Prettier** | Formatting      |

---

## 3. Architecture

### 3.1 Structure des Dossiers

```
ambc-app/
├── app/
│   ├── (auth)/                   # Authentification
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── verify/
│   ├── (marketing)/              # Pages publiques
│   │   ├── page.tsx              # Landing page
│   │   ├── about/
│   │   └── contact/
│   ├── (platform)/               # Espace apprenant (protégé)
│   │   ├── layout.tsx
│   │   ├── dashboard/            # Dashboard apprenant
│   │   ├── learn/                # Lecteur de cours
│   │   │   └── [moduleId]/
│   │   │       └── [lessonId]/
│   │   ├── progress/             # Ma progression
│   │   ├── certificate/          # Mon certificat
│   │   └── profile/              # Mon profil
│   ├── (backoffice)/             # Espace formateur/admin (protégé)
│   │   ├── layout.tsx
│   │   ├── dashboard/            # Vue d'ensemble
│   │   ├── modules/              # Gestion modules
│   │   │   ├── page.tsx          # Liste modules
│   │   │   ├── new/              # Nouveau module
│   │   │   └── [id]/
│   │   │       ├── edit/         # Éditer module
│   │   │       └── lessons/      # Gérer leçons
│   │   ├── students/             # Gestion apprenants
│   │   ├── payments/             # Suivi paiements
│   │   └── settings/             # Paramètres
│   ├── api/
│   │   ├── trpc/                 # tRPC router
│   │   ├── auth/                 # Better Auth
│   │   ├── upload/               # Upload fichiers
│   │   └── webhooks/
│   │       └── kkiapay/          # Webhook paiement
│   ├── globals.css
│   └── layout.tsx
├── server/
│   ├── routers/                  # tRPC routers
│   │   ├── auth.ts
│   │   ├── modules.ts
│   │   ├── lessons.ts
│   │   ├── progress.ts
│   │   ├── students.ts
│   │   └── payments.ts
│   ├── trpc.ts                   # tRPC config
│   └── context.ts                # tRPC context
├── components/
│   ├── ui/                       # shadcn/ui
│   ├── shared/                   # Réutilisables
│   ├── forms/                    # Formulaires
│   ├── video/                    # Lecteur vidéo
│   └── dashboard/                # Composants dashboard
├── lib/
│   ├── auth.ts                   # Config Better Auth
│   ├── db.ts                     # Client Prisma
│   ├── kkiapay.ts                # Config KkiaPay
│   ├── upload.ts                 # Config upload
│   ├── email.ts                  # Config Resend
│   └── utils.ts
├── hooks/
├── types/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── public/
    └── images/
```

### 3.2 Architecture Simplifiée

```
┌─────────────────────────────────────────────────────────────┐
│                      VISITEUR / APPRENANT                    │
│                    (Browser - Next.js App)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       NEXT.JS 15                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Marketing  │  │   Platform   │  │  Backoffice  │       │
│  │   (Public)   │  │  (Apprenant) │  │   (Admin)    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                              │                               │
│  ┌───────────────────────────┴───────────────────────────┐  │
│  │              tRPC API (Type-safe)                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  PostgreSQL  │     │ Vercel Blob  │     │   KkiaPay    │
│   (Prisma)   │     │   (Vidéos)   │     │  (Paiements) │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 4. Fonctionnalités

### 4.1 🔐 Authentification

#### Inscription & Connexion

- [ ] Inscription avec email + mot de passe
- [ ] Inscription avec numéro de téléphone
- [ ] Connexion email ou téléphone
- [ ] Vérification email/téléphone (OTP)
- [ ] Mot de passe oublié
- [ ] Sessions sécurisées (Better Auth)

#### Profil Utilisateur

- [ ] Édition du profil (nom, avatar, téléphone)
- [ ] Changement de mot de passe

#### Rôles

| Rôle      | Permissions               |
| --------- | ------------------------- |
| Admin     | Accès backoffice complet  |
| Apprenant | Accès formation (si payé) |

---

### 4.2 📚 Structure de la Formation

La formation est composée de **Modules** contenant des **Leçons**.

```
Formation : Conception de Plans Architecturaux
│
├── Module 1 : Introduction aux plans architecturaux
│   ├── Leçon 1 : Qu'est-ce qu'un plan architectural ? (Vidéo)
│   ├── Leçon 2 : Les outils nécessaires (Vidéo)
│   └── Leçon 3 : Les normes et conventions (Vidéo + PDF)
│
├── Module 2 : Les fondamentaux du dessin technique
│   ├── Leçon 1 : Échelles et dimensions (Vidéo)
│   ├── Leçon 2 : Symboles architecturaux (Vidéo)
│   └── ...
│
├── Module 3 : Conception d'un plan de maison
│   └── ...
│
└── Module N : Projet final
    └── ...
```

#### Types de Contenu par Leçon

- [ ] Vidéo (principal)
- [ ] Description texte
- [ ] Fichiers téléchargeables (PDF, plans exemples)

---

### 4.3 🎓 Espace Apprenant

#### Dashboard Apprenant

- [ ] Progression globale (% complétion)
- [ ] Dernier module/leçon en cours
- [ ] Accès rapide pour continuer

#### Lecteur de Cours

- [ ] Lecteur vidéo
  - [ ] Contrôle de vitesse (0.5x - 2x)
  - [ ] Mode plein écran
  - [ ] Reprise automatique (dernière position)
- [ ] Liste des modules (sidebar)
- [ ] Navigation leçon précédente/suivante
- [ ] Marquage automatique comme "vu"
- [ ] Téléchargement des ressources

#### Progression

- [ ] Progression par module (%)
- [ ] Leçons complétées vs restantes
- [ ] Temps total passé

#### Certificat

- [ ] Génération automatique à 100% de complétion
- [ ] Téléchargement PDF
- [ ] Lien de vérification public

---

### 4.4 👨‍🏫 Backoffice (Admin/Formateur)

#### Dashboard Admin

- [ ] Nombre d'apprenants inscrits
- [ ] Nombre de paiements (reçus / en attente)
- [ ] Revenus totaux
- [ ] Derniers inscrits
- [ ] Progression moyenne des apprenants

#### Gestion des Modules

- [ ] Créer un module
- [ ] Éditer un module (titre, description, ordre)
- [ ] Supprimer un module
- [ ] Réordonner les modules (drag & drop)
- [ ] Publier / Dépublier un module

#### Gestion des Leçons

- [ ] Créer une leçon
- [ ] Upload vidéo avec progression
- [ ] Ajouter description (éditeur riche)
- [ ] Ajouter fichiers téléchargeables
- [ ] Éditer une leçon
- [ ] Supprimer une leçon
- [ ] Réordonner les leçons
- [ ] Prévisualiser une leçon

#### Gestion des Apprenants

- [ ] Liste des apprenants
- [ ] Voir la progression de chaque apprenant
- [ ] Filtrer par statut de paiement
- [ ] Activer/Désactiver l'accès manuellement

#### Suivi des Paiements

- [ ] Liste des paiements (KkiaPay)
- [ ] Statut : Complété / En attente / Échoué
- [ ] Montant et date
- [ ] Apprenant associé
- [ ] Export CSV

#### Paramètres

- [ ] Modifier le prix de la formation
- [ ] Informations du formateur (bio, photo)

---

### 4.5 💳 Paiements (KkiaPay)

#### Processus d'Achat

```
1. Apprenant s'inscrit (compte créé, accès bloqué)
2. Apprenant clique "Accéder à la formation"
3. Redirection vers KkiaPay (paiement Mobile Money / Carte)
4. Webhook KkiaPay → Validation du paiement
5. Accès débloqué automatiquement
6. Email de confirmation envoyé
```

#### Fonctionnalités

- [ ] Bouton de paiement KkiaPay
- [ ] Gestion des webhooks
- [ ] Table de suivi des paiements
- [ ] Email de confirmation après paiement
- [ ] Page de confirmation (succès/échec)

---

### 4.6 🌐 Pages Publiques (Marketing)

#### Landing Page

- [ ] Hero section (accroche + CTA)
- [ ] Présentation de la formation
- [ ] Programme détaillé (modules)
- [ ] À propos du formateur
- [ ] Témoignages _(futur)_
- [ ] Prix et CTA inscription
- [ ] FAQ

#### Autres Pages

- [ ] Page À propos
- [ ] Page Contact
- [ ] CGU / Mentions légales

---

### 4.7 📧 Emails

| Événement           | Email envoyé                        |
| ------------------- | ----------------------------------- |
| Inscription         | Bienvenue + instructions            |
| Paiement réussi     | Confirmation + accès à la formation |
| Mot de passe oublié | Lien de réinitialisation            |
| Certificat obtenu   | Félicitations + lien certificat     |

---

## 5. Modèles de Données

### 5.1 Schéma Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== USERS ====================

enum Role {
  ADMIN
  STUDENT
}

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  phone         String?   @unique
  emailVerified DateTime?
  phoneVerified DateTime?
  password      String
  name          String
  image         String?
  role          Role      @default(STUDENT)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  sessions      Session[]
  payment       Payment?
  progress      Progress[]
  certificate   Certificate?

  @@map("users")
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  expiresAt    DateTime
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

// ==================== FORMATION ====================

model Module {
  id          String   @id @default(cuid())
  title       String
  description String?
  order       Int
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  lessons Lesson[]

  @@map("modules")
}

model Lesson {
  id            String   @id @default(cuid())
  title         String
  description   String?  // Contenu texte (HTML/Markdown)
  videoUrl      String?
  videoDuration Int?     // en secondes
  order         Int
  isPublished   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  moduleId  String
  module    Module     @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  resources Resource[]
  progress  Progress[]

  @@map("lessons")
}

model Resource {
  id        String   @id @default(cuid())
  name      String
  url       String
  type      String   // PDF, ZIP, etc.
  size      Int?     // en bytes
  createdAt DateTime @default(now())

  lessonId String
  lesson   Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@map("resources")
}

// ==================== PROGRESSION ====================

model Progress {
  id             String    @id @default(cuid())
  userId         String
  lessonId       String
  isCompleted    Boolean   @default(false)
  watchedSeconds Int       @default(0)
  lastPosition   Int       @default(0) // position en secondes
  completedAt    DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
  @@map("progress")
}

// ==================== CERTIFICAT ====================

model Certificate {
  id                String   @id @default(cuid())
  userId            String   @unique
  certificateNumber String   @unique
  issuedAt          DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("certificates")
}

// ==================== PAIEMENTS ====================

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
}

model Payment {
  id                   String        @id @default(cuid())
  userId               String        @unique
  amount               Decimal
  currency             String        @default("XOF")
  status               PaymentStatus @default(PENDING)
  kkiapayTransactionId String?       @unique
  paidAt               DateTime?
  createdAt            DateTime      @default(now())
  updatedAt            DateTime      @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("payments")
}

// ==================== PARAMÈTRES ====================

model Settings {
  id              String   @id @default("settings")
  coursePrice     Decimal  @default(0)
  courseCurrency  String   @default("XOF")
  instructorName  String?
  instructorBio   String?
  instructorImage String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("settings")
}
```

---

## 6. Pages & Routes

### 6.1 Routes Publiques

| Route      | Description  |
| ---------- | ------------ |
| `/`        | Landing page |
| `/about`   | À propos     |
| `/contact` | Contact      |
| `/terms`   | CGU          |

### 6.2 Routes Authentification

| Route              | Description         |
| ------------------ | ------------------- |
| `/login`           | Connexion           |
| `/register`        | Inscription         |
| `/forgot-password` | Mot de passe oublié |
| `/verify`          | Vérification OTP    |

### 6.3 Routes Apprenant (protégées)

| Route                          | Description           |
| ------------------------------ | --------------------- |
| `/dashboard`                   | Dashboard apprenant   |
| `/learn/[moduleId]/[lessonId]` | Lecteur de cours      |
| `/progress`                    | Ma progression        |
| `/certificate`                 | Mon certificat        |
| `/profile`                     | Mon profil            |
| `/payment`                     | Page de paiement      |
| `/payment/success`             | Confirmation paiement |

### 6.4 Routes Backoffice (admin only)

| Route                                         | Description      |
| --------------------------------------------- | ---------------- |
| `/backoffice`                                 | Dashboard admin  |
| `/backoffice/modules`                         | Liste modules    |
| `/backoffice/modules/new`                     | Nouveau module   |
| `/backoffice/modules/[id]`                    | Détail/édition   |
| `/backoffice/modules/[id]/lessons`            | Leçons du module |
| `/backoffice/modules/[id]/lessons/new`        | Nouvelle leçon   |
| `/backoffice/modules/[id]/lessons/[lessonId]` | Éditer leçon     |
| `/backoffice/students`                        | Liste apprenants |
| `/backoffice/students/[id]`                   | Détail apprenant |
| `/backoffice/payments`                        | Liste paiements  |
| `/backoffice/settings`                        | Paramètres       |

---

## 7. Intégrations Tierces

### 7.1 KkiaPay (Paiements)

- [ ] Intégration SDK KkiaPay
- [ ] Webhook pour validation automatique
- [ ] Gestion des statuts de paiement

### 7.2 Vercel Blob (Stockage)

- [ ] Upload vidéos
- [ ] Upload fichiers ressources
- [ ] URLs signées pour sécurité

### 7.3 Resend (Emails)

- [ ] Templates emails (React Email)
- [ ] Emails transactionnels

---

## 8. Sécurité

### 8.1 Authentification

- [ ] Hachage bcrypt des mots de passe
- [ ] Sessions sécurisées (Better Auth)
- [ ] Protection CSRF
- [ ] Rate limiting sur login

### 8.2 Autorisation

- [ ] Middleware de vérification du rôle
- [ ] Vérification paiement pour accès contenu
- [ ] Protection des routes API (tRPC)

### 8.3 Protection du Contenu

- [ ] URLs signées pour les vidéos
- [ ] Vérification session avant streaming

---

## 9. Déploiement

### 9.1 Infrastructure

| Service         | Usage           |
| --------------- | --------------- |
| **Vercel**      | Hébergement app |
| **Neon**        | PostgreSQL      |
| **Vercel Blob** | Stockage vidéos |
| **Resend**      | Emails          |
| **KkiaPay**     | Paiements       |

### 9.2 Variables d'Environnement

```env
# Database
DATABASE_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# KkiaPay
KKIAPAY_PUBLIC_KEY=
KKIAPAY_PRIVATE_KEY=
KKIAPAY_SECRET=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## 10. Roadmap

### Phase 1 - Fondations (2-3 semaines)

- [x] Setup projet Next.js + Tailwind + shadcn/ui
- [x] Design system (couleurs Ambition Concept)
- [ ] Configuration Prisma + PostgreSQL
- [ ] Configuration Better Auth
- [ ] Configuration tRPC
- [ ] Pages auth (login, register, forgot-password)
- [ ] Layout backoffice + layout plateforme
- [ ] Middleware protection routes

### Phase 2 - Backoffice (2-3 semaines)

- [ ] Dashboard admin (stats basiques)
- [ ] CRUD Modules
- [ ] CRUD Leçons
- [ ] Upload vidéos (Vercel Blob)
- [ ] Upload ressources
- [ ] Liste des apprenants
- [ ] Paramètres (prix, infos formateur)

### Phase 3 - Plateforme Apprenant (2-3 semaines)

- [ ] Dashboard apprenant
- [ ] Lecteur de cours (vidéo)
- [ ] Navigation modules/leçons
- [ ] Système de progression
- [ ] Téléchargement ressources
- [ ] Page profil

### Phase 4 - Paiements (1-2 semaines)

- [ ] Intégration KkiaPay
- [ ] Webhook paiement
- [ ] Déblocage accès automatique
- [ ] Page paiement + confirmation
- [ ] Suivi paiements (backoffice)

### Phase 5 - Finalisation (1-2 semaines)

- [ ] Génération certificat
- [ ] Emails transactionnels
- [ ] Landing page
- [ ] Pages légales
- [ ] Tests et corrections
- [ ] Lancement 🚀

---

## 📝 Notes

### Extensions Futures (V2+)

Ces fonctionnalités pourront être ajoutées plus tard grâce à l'architecture extensible :

- [ ] Quiz et évaluations
- [ ] Commentaires sur les leçons
- [ ] Système de notifications in-app
- [ ] Plusieurs formations (marketplace)
- [ ] Coupons de réduction
- [ ] Blog
- [ ] PWA / App mobile

---

> **Dernière mise à jour :** 19 janvier 2026  
> **Version :** 1.1.0 (Simplifié)
