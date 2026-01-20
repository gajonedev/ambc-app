/**
 * Données simulées pour le développement
 * À remplacer par des appels tRPC vers la base de données
 */

// ==========================================
// TYPES
// ==========================================

export interface MockCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  isPublished: boolean;
  instructor: {
    name: string;
    bio: string;
    image: string | null;
  };
  modulesCount: number;
  lessonsCount: number;
  enrolledCount: number;
  createdAt: string;
}

export interface MockEnrolledCourse extends MockCourse {
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export interface MockLesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl?: string;
  completed: boolean;
  current?: boolean;
  published?: boolean;
  resources?: { id?: string; name: string; size: string }[];
}

export interface MockModule {
  id: string;
  title: string;
  description?: string;
  progress?: number;
  order?: number;
  published?: boolean;
  lessons: MockLesson[];
  lessonsCount?: number;
}

export interface MockCourseDetail extends MockCourse {
  isEnrolled: boolean;
  progress: number;
  modules: MockModule[];
}

export interface MockCertificate {
  id: string;
  courseTitle: string;
  courseSlug: string;
  certificateNumber: string;
  issuedAt: string;
  isCompleted: boolean;
}

export interface MockStudent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  progress: number;
  paid: boolean;
  joinedAt: string;
}

export interface MockPayment {
  id: string;
  student: string;
  email: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  courseName?: string;
}

export interface MockActivity {
  type: "lesson" | "module" | "certificate";
  title: string;
  courseName?: string;
  date: string;
  completed: boolean;
}

// ==========================================
// COURSES DATA
// ==========================================

export const mockCourses: MockCourse[] = [
  {
    id: "course-1",
    slug: "conception-plans-architecturaux",
    title: "Conception de Plans Architecturaux",
    description:
      "Apprenez à concevoir des plans architecturaux professionnels. Cette formation complète vous guidera à travers toutes les étapes de la conception, des bases du dessin technique aux techniques avancées.",
    image: "/images/course-1.jpg",
    price: 50000,
    currency: "XOF",
    isPublished: true,
    instructor: {
      name: "John Formateur",
      bio: "Expert en architecture avec 15 ans d'expérience",
      image: null,
    },
    modulesCount: 5,
    lessonsCount: 20,
    enrolledCount: 45,
    createdAt: "2026-01-10",
  },
  {
    id: "course-2",
    slug: "autocad-debutant",
    title: "AutoCAD pour Débutants",
    description: "Maîtrisez les bases d'AutoCAD pour le dessin technique",
    image: "/images/course-2.jpg",
    price: 35000,
    currency: "XOF",
    isPublished: true,
    instructor: {
      name: "Marie Expert",
      bio: "Spécialiste AutoCAD certifiée Autodesk",
      image: null,
    },
    modulesCount: 4,
    lessonsCount: 15,
    enrolledCount: 32,
    createdAt: "2026-01-15",
  },
  {
    id: "course-3",
    slug: "3d-sketchup",
    title: "Modélisation 3D avec SketchUp",
    description: "Créez des modèles 3D professionnels pour vos projets",
    image: "/images/course-3.jpg",
    price: 45000,
    currency: "XOF",
    isPublished: false,
    instructor: {
      name: "Paul Designer",
      bio: "Designer 3D avec 8 ans d'expérience",
      image: null,
    },
    modulesCount: 2,
    lessonsCount: 8,
    enrolledCount: 0,
    createdAt: "2026-01-18",
  },
];

// ==========================================
// MODULES DATA (for course-1)
// ==========================================

export const mockModules: MockModule[] = [
  {
    id: "module-1",
    title: "Introduction aux plans architecturaux",
    description: "Ce module présente les bases des plans architecturaux.",
    progress: 100,
    order: 1,
    published: true,
    lessonsCount: 5,
    lessons: [
      {
        id: "lesson-1",
        title: "Qu'est-ce qu'un plan architectural ?",
        completed: true,
        duration: "12 min",
        published: true,
      },
      {
        id: "lesson-2",
        title: "Les différents types de plans",
        completed: true,
        duration: "18 min",
        published: true,
      },
      {
        id: "lesson-3",
        title: "Les outils nécessaires",
        completed: true,
        duration: "15 min",
        published: true,
      },
      {
        id: "lesson-4",
        title: "Votre environnement de travail",
        completed: true,
        duration: "10 min",
        published: false,
      },
      {
        id: "lesson-5",
        title: "Les conventions de base",
        completed: true,
        duration: "20 min",
        published: false,
      },
    ],
  },
  {
    id: "module-2",
    title: "Les fondamentaux du dessin technique",
    description: "Apprenez les bases du dessin technique architectural.",
    progress: 40,
    order: 2,
    published: true,
    lessonsCount: 5,
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction au dessin technique",
        completed: true,
        duration: "15 min",
        published: true,
      },
      {
        id: "lesson-2",
        title: "Les outils de mesure",
        completed: true,
        duration: "22 min",
        published: true,
      },
      {
        id: "lesson-3",
        title: "Échelles et proportions",
        completed: false,
        duration: "25 min",
        current: true,
        published: true,
      },
      {
        id: "lesson-4",
        title: "Les symboles architecturaux",
        completed: false,
        duration: "30 min",
        published: true,
      },
      {
        id: "lesson-5",
        title: "Exercices pratiques",
        completed: false,
        duration: "35 min",
        published: false,
      },
    ],
  },
  {
    id: "module-3",
    title: "Conception d'un plan de maison",
    description: "Concevez votre premier plan de maison de A à Z.",
    progress: 0,
    order: 3,
    published: true,
    lessonsCount: 8,
    lessons: [
      {
        id: "lesson-1",
        title: "Analyse du terrain",
        completed: false,
        duration: "20 min",
        published: true,
      },
      {
        id: "lesson-2",
        title: "Le plan de masse",
        completed: false,
        duration: "35 min",
        published: true,
      },
    ],
  },
  {
    id: "module-4",
    title: "Les normes et réglementations",
    description: "Comprenez les normes à respecter dans vos plans.",
    progress: 0,
    order: 4,
    published: false,
    lessonsCount: 4,
    lessons: [],
  },
  {
    id: "module-5",
    title: "Techniques avancées",
    description: "Perfectionnez vos compétences avec des techniques avancées.",
    progress: 0,
    order: 5,
    published: false,
    lessonsCount: 6,
    lessons: [],
  },
  {
    id: "module-6",
    title: "Projet final",
    description: "Réalisez un projet complet pour valider votre formation.",
    progress: 0,
    order: 6,
    published: false,
    lessonsCount: 3,
    lessons: [],
  },
];

// ==========================================
// CURRENT LESSON DATA
// ==========================================

export const mockCurrentLesson: MockLesson = {
  id: "lesson-3",
  title: "Échelles et proportions",
  description:
    "Dans cette leçon, vous apprendrez à utiliser les échelles correctement et à maintenir les bonnes proportions dans vos plans architecturaux.",
  videoUrl: "https://example.com/video.mp4",
  duration: "25 min",
  completed: false,
  current: true,
  resources: [
    { name: "Guide des échelles.pdf", size: "2.4 MB" },
    { name: "Exercices pratiques.pdf", size: "1.1 MB" },
  ],
};

export const mockLessonNavigation = {
  prev: { id: "lesson-2", title: "Les outils de mesure" },
  next: { id: "lesson-4", title: "Les symboles architecturaux" },
};

// ==========================================
// LESSON DETAIL FOR BACKOFFICE
// ==========================================

export const mockLessonDetail: MockLesson = {
  id: "lesson-1",
  title: "Qu'est-ce qu'un plan architectural ?",
  description:
    "Dans cette leçon, vous découvrirez les fondamentaux des plans architecturaux, leur importance et leur utilité dans le domaine de la construction.",
  videoUrl: "https://example.com/video.mp4",
  duration: "12:30",
  completed: false,
  published: true,
  resources: [
    { id: "1", name: "Introduction.pdf", size: "245 KB" },
    { id: "2", name: "Exercices.pdf", size: "1.2 MB" },
  ],
};

// ==========================================
// ENROLLMENTS DATA
// ==========================================

export const mockEnrolledCourses: MockEnrolledCourse[] = [
  {
    ...mockCourses[0],
    progress: 35,
    totalLessons: 20,
    completedLessons: 7,
  },
  {
    ...mockCourses[1],
    progress: 10,
    totalLessons: 15,
    completedLessons: 0,
  },
];

export const mockAvailableCourses = mockCourses.filter(
  (c) => c.isPublished && !mockEnrolledCourses.find((e) => e.id === c.id),
);

// ==========================================
// CERTIFICATES DATA
// ==========================================

export const mockCertificates: MockCertificate[] = [
  {
    id: "cert-1",
    courseTitle: "Conception de Plans Architecturaux",
    courseSlug: "conception-plans-architecturaux",
    certificateNumber: "AMBC-2026-001234",
    issuedAt: "20 Janvier 2026",
    isCompleted: true,
  },
];

export const mockInProgressCourses = [
  {
    id: "course-2",
    title: "AutoCAD pour Débutants",
    slug: "autocad-debutant",
    progress: 45,
  },
];

// ==========================================
// STUDENTS DATA
// ==========================================

export const mockStudents: MockStudent[] = [
  {
    id: "1",
    name: "Kofi Mensah",
    email: "kofi@email.com",
    phone: "+229 97 11 22 33",
    progress: 75,
    paid: true,
    joinedAt: "15 Jan 2026",
  },
  {
    id: "2",
    name: "Ama Diallo",
    email: "ama@email.com",
    phone: "+229 97 22 33 44",
    progress: 0,
    paid: false,
    joinedAt: "18 Jan 2026",
  },
  {
    id: "3",
    name: "Yao Koffi",
    email: "yao@email.com",
    phone: "+229 97 33 44 55",
    progress: 45,
    paid: true,
    joinedAt: "10 Jan 2026",
  },
  {
    id: "4",
    name: "Fatou Sow",
    email: "fatou@email.com",
    phone: "+229 97 44 55 66",
    progress: 100,
    paid: true,
    joinedAt: "05 Jan 2026",
  },
  {
    id: "5",
    name: "Jean Mensah",
    email: "jean@email.com",
    phone: "+229 97 55 66 77",
    progress: 0,
    paid: false,
    joinedAt: "19 Jan 2026",
  },
  {
    id: "6",
    name: "Marie Adjovi",
    email: "marie@email.com",
    phone: "+229 97 66 77 88",
    progress: 30,
    paid: true,
    joinedAt: "08 Jan 2026",
  },
];

export const mockRecentStudents = [
  {
    name: "Kofi Mensah",
    email: "kofi@email.com",
    date: "Aujourd'hui",
    paid: true,
  },
  {
    name: "Ama Diallo",
    email: "ama@email.com",
    date: "Aujourd'hui",
    paid: false,
  },
  { name: "Yao Koffi", email: "yao@email.com", date: "Hier", paid: true },
  { name: "Fatou Sow", email: "fatou@email.com", date: "Hier", paid: true },
  {
    name: "Jean Mensah",
    email: "jean@email.com",
    date: "Il y a 2 jours",
    paid: false,
  },
];

// ==========================================
// PAYMENTS DATA
// ==========================================

export const mockPayments: MockPayment[] = [
  {
    id: "KKP-001",
    student: "Kofi Mensah",
    email: "kofi@email.com",
    amount: 50000,
    status: "completed",
    date: "15 Jan 2026 14:30",
  },
  {
    id: "KKP-002",
    student: "Yao Koffi",
    email: "yao@email.com",
    amount: 50000,
    status: "completed",
    date: "10 Jan 2026 09:15",
  },
  {
    id: "KKP-003",
    student: "Fatou Sow",
    email: "fatou@email.com",
    amount: 50000,
    status: "completed",
    date: "05 Jan 2026 16:45",
  },
  {
    id: "KKP-004",
    student: "Marie Adjovi",
    email: "marie@email.com",
    amount: 50000,
    status: "completed",
    date: "08 Jan 2026 11:20",
  },
  {
    id: "KKP-005",
    student: "Ama Diallo",
    email: "ama@email.com",
    amount: 50000,
    status: "pending",
    date: "18 Jan 2026 10:00",
  },
  {
    id: "KKP-006",
    student: "Jean Mensah",
    email: "jean@email.com",
    amount: 50000,
    status: "failed",
    date: "19 Jan 2026 08:30",
  },
];

export const mockPaymentStatusConfig = {
  completed: { label: "Complété", variant: "default" as const },
  pending: { label: "En attente", variant: "secondary" as const },
  failed: { label: "Échoué", variant: "destructive" as const },
};

// ==========================================
// STATS DATA
// ==========================================

export const mockDashboardStats = {
  enrolledCourses: 2,
  completedCourses: 1,
  totalLessonsCompleted: 32,
  hoursWatched: 12.5,
  certificates: 1,
};

export const mockBackofficeStats = {
  totalStudents: 127,
  paidStudents: 89,
  pendingPayments: 38,
  totalRevenue: 4450000,
  totalModules: 6,
  totalLessons: 36,
};

export const mockPaymentStats = {
  total: 4450000,
  completed: 89,
  pending: 12,
  failed: 3,
};

export const mockCourseStats = {
  totalCourses: mockCourses.length,
  publishedCourses: mockCourses.filter((c) => c.isPublished).length,
  totalEnrollments: mockCourses.reduce((acc, c) => acc + c.enrolledCount, 0),
  totalRevenue: 3250000,
};

// ==========================================
// ACTIVITY DATA
// ==========================================

export const mockRecentActivity: MockActivity[] = [
  {
    type: "lesson",
    title: "Les outils de mesure",
    courseName: "Conception de Plans Architecturaux",
    date: "Aujourd'hui",
    completed: true,
  },
  {
    type: "lesson",
    title: "Introduction au dessin technique",
    courseName: "Conception de Plans Architecturaux",
    date: "Hier",
    completed: true,
  },
  {
    type: "certificate",
    title: "Certificat obtenu",
    courseName: "Initiation à l'architecture",
    date: "Il y a 3 jours",
    completed: true,
  },
];

export const mockDashboardEnrolledCourses = [
  {
    id: "course-1",
    slug: "conception-plans-architecturaux",
    title: "Conception de Plans Architecturaux",
    progress: 35,
    currentLesson: {
      moduleName: "Les fondamentaux du dessin technique",
      lessonName: "Échelles et proportions",
    },
    lastAccessedAt: "Il y a 2 heures",
  },
  {
    id: "course-2",
    slug: "autocad-debutant",
    title: "AutoCAD pour Débutants",
    progress: 10,
    currentLesson: {
      moduleName: "Introduction à AutoCAD",
      lessonName: "L'interface utilisateur",
    },
    lastAccessedAt: "Hier",
  },
];

// ==========================================
// SETTINGS DATA
// ==========================================

export const mockSettings = {
  coursePrice: 50000,
  courseCurrency: "XOF",
  instructorName: "Formateur Ambition Concept",
  instructorBio:
    "Expert en conception architecturale avec plus de 10 ans d'expérience dans le domaine du BTP.",
};

// ==========================================
// USER DATA
// ==========================================

export const mockUser = {
  name: "John Doe",
  email: "john@email.com",
  joinedAt: "15 Janvier 2026",
};

// ==========================================
// HELPERS
// ==========================================

export function getCourseBySlug(slug: string): MockCourseDetail | undefined {
  const course = mockCourses.find((c) => c.slug === slug);
  if (!course) return undefined;

  return {
    ...course,
    isEnrolled: mockEnrolledCourses.some((e) => e.id === course.id),
    progress:
      mockEnrolledCourses.find((e) => e.id === course.id)?.progress ?? 0,
    modules: mockModules,
  };
}

export function getCourseForLearn(slug: string) {
  return {
    slug,
    title: mockCourses.find((c) => c.slug === slug)?.title ?? "Formation",
    modules: mockModules.slice(0, 2).map((m) => ({
      id: m.id,
      title: m.title,
      lessons: m.lessons,
    })),
  };
}

export function getModuleById(id: string) {
  return (
    mockModules.find((m) => m.id === id) ?? {
      id,
      title: "Introduction aux plans architecturaux",
      description: "Ce module présente les bases des plans architecturaux.",
      lessons: [],
    }
  );
}
