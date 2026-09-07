# Database Architecture

## Overview
Built on PostgreSQL (via Supabase) and managed using Drizzle ORM.

## Entities

### 1. `authorities`
- `id`: UUID (PK)
- `slug`: VARCHAR (Unique, Indexed)
- `name`: VARCHAR
- `short_description`: TEXT
- `description`: TEXT
- `jurisdiction`: VARCHAR
- `is_verified`: BOOLEAN
- `created_at`, `updated_at`: TIMESTAMP

### 2. `services`
- `id`: UUID (PK)
- `slug`: VARCHAR (Unique, Indexed)
- `name`: VARCHAR
- `category`: VARCHAR
- `description`: TEXT

### 3. `project_types`
- `id`: UUID (PK)
- `slug`: VARCHAR (Unique, Indexed)
- `name`: VARCHAR

### 4. `projects`
- `id`: UUID (PK)
- `slug`: VARCHAR (Unique, Indexed)
- `title`: VARCHAR
- `project_type_id`: UUID (FK -> project_types)
- `authority_id`: UUID (FK -> authorities)
- `location`: VARCHAR
- `approval_status`: VARCHAR
- `published_at`: TIMESTAMP

### 5. `case_studies`
- `id`: UUID (PK)
- `project_id`: UUID (FK -> projects)
- `challenge`: TEXT
- `solution`: TEXT
- `result`: TEXT

### 6. `guides`
- `id`: UUID (PK)
- `slug`: VARCHAR (Unique, Indexed)
- `title`: VARCHAR
- `content`: TEXT
- `author_id`: UUID (FK -> team_members)
- `status`: VARCHAR
- `published_at`: TIMESTAMP

### 7. `faqs`
- `id`: UUID (PK)
- `question`: TEXT
- `answer`: TEXT
- `authority_id`: UUID (FK -> authorities)
- `is_verified`: BOOLEAN

### 8. `team_members`
- `id`: UUID (PK)
- `name`: VARCHAR
- `role`: VARCHAR
- `bio`: TEXT
- `credentials`: JSONB

### 9. `reviews`
- `id`: UUID (PK)
- `reviewer_name`: VARCHAR
- `rating`: INTEGER
- `content`: TEXT
- `is_verified`: BOOLEAN

### 10. `leads`
- `id`: UUID (PK)
- `name`: VARCHAR
- `email`: VARCHAR
- `phone`: VARCHAR
- `project_details`: TEXT
- `status`: VARCHAR (New, Contacted, Qualified, Won, Lost)
- `created_at`: TIMESTAMP

### 11. `media` (Storage metadata)
- `id`: UUID (PK)
- `file_key`: VARCHAR
- `entity_type`: VARCHAR (project, team, etc)
- `entity_id`: UUID

### 12. `redirects`
- `id`: UUID (PK)
- `source`: VARCHAR (Indexed)
- `destination`: VARCHAR
- `status_code`: INTEGER

### 13. `seo_records`
- `id`: UUID (PK)
- `entity_type`: VARCHAR
- `entity_id`: UUID
- `title`: VARCHAR
- `description`: TEXT
- `canonical`: VARCHAR

### 14. `knowledge_base` (For AI Chatbot)
- `id`: UUID (PK)
- `content`: TEXT
- `embedding`: vector(1536)
- `source`: VARCHAR

### 15. `admin_users`
Handled entirely by Supabase Auth (auth.users). Roles stored in a custom `user_roles` table or JWT claims.
