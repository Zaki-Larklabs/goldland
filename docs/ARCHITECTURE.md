# System Architecture

## 1. Overview
The Goldland Contracting Digital Platform is a highly performant, SEO-optimized, CMS-backed web application. It transitions the company from a static brochure site into a dynamic "Topical Authority Model" capturing search intent across all Dubai authority jurisdictions.

## 2. Architecture Diagrams

### A. System Architecture
```mermaid
graph TD
    Client[Browser/Client] --> NextJS[Next.js App Router]
    
    subgraph Frontend
        NextJS --> Pages[React Server Components]
        NextJS --> ClientComps[Client Components]
        NextJS --> API[Next.js API Routes]
    end

    subgraph Backend Services
        API --> DB[(Supabase PostgreSQL)]
        API --> Storage[Supabase Storage]
        API --> Auth[Supabase Auth]
        API --> AI[AI Gateway / Vercel AI SDK]
    end
    
    AI --> LLM[External LLM Provider]
    DB <--> Drizzle[Drizzle ORM]
    Pages <--> Drizzle
```

### B. Request Flow
```mermaid
sequenceDiagram
    participant User
    participant CDN as CDN/Edge
    participant NextJS as Next.js Server
    participant DB as Supabase DB

    User->>CDN: GET /authority-approvals/dda
    alt Cache Hit
        CDN-->>User: Cached HTML
    else Cache Miss
        CDN->>NextJS: Forward Request
        NextJS->>DB: Query DDA Authority & Projects
        DB-->>NextJS: Return Relational Data
        NextJS-->>CDN: Render RSC -> HTML
        CDN-->>User: HTML Response
    end
```

### C. CMS Flow
```mermaid
sequenceDiagram
    participant Admin
    participant NextJS
    participant Auth
    participant DB

    Admin->>NextJS: POST /api/admin/content
    NextJS->>Auth: Validate Session (super_admin)
    Auth-->>NextJS: Valid
    NextJS->>DB: Update Entity (e.g. Project)
    DB-->>NextJS: Success
    NextJS->>NextJS: revalidatePath('/projects')
    NextJS-->>Admin: 200 OK
```

### D. Lead Flow
```mermaid
sequenceDiagram
    participant User
    participant Form as React Hook Form
    participant API as /api/leads
    participant DB as Supabase DB
    
    User->>Form: Submits Project details
    Form->>API: POST JSON (Zod Validated)
    API->>API: Rate Limit & Validation
    API->>DB: Insert Lead Status='New'
    API-->>Form: 201 Created
    Form-->>User: Show Success State
```

### E. AI Chatbot Flow
```mermaid
sequenceDiagram
    participant User
    participant Chat UI
    participant API as /api/chat
    participant DB as Vector DB / KB
    participant LLM

    User->>Chat UI: "What documents are needed for DDA?"
    Chat UI->>API: POST /api/chat
    API->>DB: Semantic Search Knowledge Base
    DB-->>API: Return Top N Matches
    API->>LLM: Stream Prompt + Context
    LLM-->>API: Streaming Response
    API-->>Chat UI: Stream to UI
```

### F. Authentication Flow
```mermaid
sequenceDiagram
    participant Admin
    participant NextJS
    participant Supabase Auth

    Admin->>NextJS: Login Request
    NextJS->>Supabase Auth: Authenticate
    Supabase Auth-->>NextJS: JWT Session
    NextJS-->>Admin: Set Secure HttpOnly Cookie
```

### G. File Upload Flow
```mermaid
sequenceDiagram
    participant User
    participant NextJS as Next.js API
    participant Storage as Supabase Storage

    User->>NextJS: Upload Document/Image
    NextJS->>NextJS: Validate MIME/Size/Auth
    NextJS->>Storage: Store in restricted bucket
    Storage-->>NextJS: Return Object Key
    NextJS->>DB: Link Key to Record
    NextJS-->>User: Success
```

### H. SEO Rendering Flow
```mermaid
graph LR
    NextJS[Next.js] --> metadata[generateMetadata]
    NextJS --> schema[JSON-LD Generator]
    metadata --> DB[Supabase DB]
    schema --> DB
    DB --> metadata
    DB --> schema
    metadata --> HTML[Output HTML <head>]
    schema --> HTML
```
