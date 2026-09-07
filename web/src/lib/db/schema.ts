import { pgTable, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const authorities = pgTable("authorities", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  shortDescription: text("short_description"),
  description: text("description"),
  jurisdiction: text("jurisdiction"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
});

export const projectTypes = pgTable("project_types", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  projectTypeId: text("project_type_id").references(() => projectTypes.id),
  authorityId: text("authority_id").references(() => authorities.id),
  location: text("location"),
  approvalStatus: text("approval_status"),
  publishedAt: timestamp("published_at"),
});

export const caseStudies = pgTable("case_studies", {
  id: text("id").primaryKey(),
  projectId: text("project_id").references(() => projects.id),
  challenge: text("challenge"),
  solution: text("solution"),
  result: text("result"),
});

export const teamMembers = pgTable("team_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role"),
  department: text("department"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  linkedInUrl: text("linkedin_url"),
  isVerified: boolean("is_verified").default(false),
  credentials: jsonb("credentials"),
});

export const guides = pgTable("guides", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: text("author_id").references(() => teamMembers.id),
  status: text("status").default('draft'),
  publishedAt: timestamp("published_at"),
});

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  authorityId: text("authority_id").references(() => authorities.id),
  isVerified: boolean("is_verified").default(false),
});

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  reviewerName: text("reviewer_name").notNull(),
  rating: integer("rating"),
  content: text("content"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  projectLocation: text("project_location"),
  authority: text("authority"),
  service: text("service"),
  projectDetails: text("project_details"),
  status: text("status").default('New'),
  documentUrl: text("document_url"),
  sourcePage: text("source_page"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const media = pgTable("media", {
  id: text("id").primaryKey(),
  fileKey: text("file_key").notNull(),
  originalFilename: text("original_filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  uploadedBy: text("uploaded_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const redirects = pgTable("redirects", {
  id: text("id").primaryKey(),
  source: text("source").unique().notNull(),
  destination: text("destination").notNull(),
  statusCode: integer("status_code").default(301),
});

export const seoRecords = pgTable("seo_records", {
  id: text("id").primaryKey(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  title: text("title"),
  description: text("description"),
  canonical: text("canonical"),
});

export const knowledgeBase = pgTable("knowledge_base", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  embedding: jsonb("embedding"),
  source: text("source"),
});

export const adminUsers = pgTable("admin_users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  role: text("role").default('admin'),
});

export const chatSessions = pgTable("chat_sessions", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  pageContext: text("page_context"),
  history: jsonb("history"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const unansweredQuestions = pgTable("unanswered_questions", {
  id: text("id").primaryKey(),
  sessionId: text("session_id"),
  question: text("question").notNull(),
  pageContext: text("page_context"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default('Pending'),
});

export const serviceAuthorities = pgTable("service_authorities", {
  serviceId: text("service_id").notNull().references(() => services.id),
  authorityId: text("authority_id").notNull().references(() => authorities.id),
});

export const guideAuthorities = pgTable("guide_authorities", {
  guideId: text("guide_id").notNull().references(() => guides.id),
  authorityId: text("authority_id").notNull().references(() => authorities.id),
});

export const guideServices = pgTable("guide_services", {
  guideId: text("guide_id").notNull().references(() => guides.id),
  serviceId: text("service_id").notNull().references(() => services.id),
});
