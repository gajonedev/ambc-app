import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  integer,
  decimal,
  unique,
} from "drizzle-orm/pg-core";
import { init } from "@paralleldrive/cuid2";

const createId = init({ length: 8 });
// ==================== AUTH (Better Auth) ====================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: text("role", { enum: ["admin", "user"] }).default("user"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_user_id_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_user_id_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// ==================== PROFILE ====================

export const profile = pgTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  phone: text("phone"),
  bio: text("bio"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  occupation: text("occupation"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
});

// ==================== FORMATION ====================

export const course = pgTable("course", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  image: text("image"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0").notNull(),
  currency: text("currency").default("XOF").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  // Infos formateur
  instructorName: text("instructor_name"),
  instructorBio: text("instructor_bio"),
  instructorImage: text("instructor_image"),
});

export const enrollment = pgTable(
  "enrollment",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
  },
  (table) => [
    unique("enrollment_user_course_unique").on(table.userId, table.courseId),
    index("enrollment_user_id_idx").on(table.userId),
    index("enrollment_course_id_idx").on(table.courseId),
  ],
);

export const courseModule = pgTable(
  "module",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    courseId: text("course_id")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
  },
  (table) => [index("module_course_id_idx").on(table.courseId)],
);

export const lesson = pgTable(
  "lesson",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    description: text("description"),
    videoUrl: text("video_url"),
    videoDuration: integer("video_duration"), // en secondes
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    moduleId: text("module_id")
      .notNull()
      .references(() => courseModule.id, { onDelete: "cascade" }),
  },
  (table) => [index("lesson_module_id_idx").on(table.moduleId)],
);

export const resource = pgTable(
  "resource",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    url: text("url").notNull(),
    type: text("type").notNull(), // PDF, ZIP, etc.
    size: integer("size"), // en bytes
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lesson.id, { onDelete: "cascade" }),
  },
  (table) => [index("resource_lesson_id_idx").on(table.lessonId)],
);

// ==================== PROGRESSION ====================

export const progress = pgTable(
  "progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    isCompleted: boolean("is_completed").default(false).notNull(),
    watchedSeconds: integer("watched_seconds").default(0).notNull(),
    lastPosition: integer("last_position").default(0).notNull(), // en secondes
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lesson.id, { onDelete: "cascade" }),
  },
  (table) => [
    unique("progress_user_lesson_unique").on(table.userId, table.lessonId),
    index("progress_user_id_idx").on(table.userId),
    index("progress_lesson_id_idx").on(table.lessonId),
  ],
);

// ==================== CERTIFICAT ====================

export const certificate = pgTable(
  "certificate",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    certificateNumber: text("certificate_number").notNull().unique(),
    issuedAt: timestamp("issued_at").defaultNow().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
  },
  (table) => [
    unique("certificate_user_course_unique").on(table.userId, table.courseId),
    index("certificate_user_id_idx").on(table.userId),
    index("certificate_course_id_idx").on(table.courseId),
  ],
);

// ==================== PAIEMENTS ====================

export const payment = pgTable(
  "payment",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").default("XOF").notNull(),
    status: text("status", { enum: ["pending", "completed", "failed"] })
      .default("pending")
      .notNull(),
    kkiapayTransactionId: text("kkiapay_transaction_id").unique(),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
  },
  (table) => [
    unique("payment_user_course_unique").on(table.userId, table.courseId),
    index("payment_user_id_idx").on(table.userId),
    index("payment_course_id_idx").on(table.courseId),
    index("payment_status_idx").on(table.status),
  ],
);

// ==================== RELATIONS ====================

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile),
  sessions: many(session),
  accounts: many(account),
  enrollments: many(enrollment),
  progress: many(progress),
  certificates: many(certificate),
  payments: many(payment),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));

export const courseRelations = relations(course, ({ many }) => ({
  modules: many(courseModule),
  enrollments: many(enrollment),
  certificates: many(certificate),
  payments: many(payment),
}));

export const enrollmentRelations = relations(enrollment, ({ one }) => ({
  user: one(user, {
    fields: [enrollment.userId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [enrollment.courseId],
    references: [course.id],
  }),
}));

export const moduleRelations = relations(courseModule, ({ one, many }) => ({
  course: one(course, {
    fields: [courseModule.courseId],
    references: [course.id],
  }),
  lessons: many(lesson),
}));

export const lessonRelations = relations(lesson, ({ one, many }) => ({
  module: one(courseModule, {
    fields: [lesson.moduleId],
    references: [courseModule.id],
  }),
  resources: many(resource),
  progress: many(progress),
}));

export const resourceRelations = relations(resource, ({ one }) => ({
  lesson: one(lesson, {
    fields: [resource.lessonId],
    references: [lesson.id],
  }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(user, {
    fields: [progress.userId],
    references: [user.id],
  }),
  lesson: one(lesson, {
    fields: [progress.lessonId],
    references: [lesson.id],
  }),
}));

export const certificateRelations = relations(certificate, ({ one }) => ({
  user: one(user, {
    fields: [certificate.userId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [certificate.courseId],
    references: [course.id],
  }),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  user: one(user, {
    fields: [payment.userId],
    references: [user.id],
  }),
  course: one(course, {
    fields: [payment.courseId],
    references: [course.id],
  }),
}));
