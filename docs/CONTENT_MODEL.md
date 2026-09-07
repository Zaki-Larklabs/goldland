# Content Model & CMS Entity Graph

## 1. Authorities
`id`, `name`, `slug`, `shortDescription`, `description`, `jurisdiction`, `logo`, `verificationStatus`
Related to: Services, ProjectTypes, Projects, Guides.

## 2. Services
`id`, `name`, `slug`, `category` (e.g., Design, Approvals, Project Management).
Example legacy services to migrate: Architectural Design, MEP, HVAC, Furniture Layouts.

## 3. Projects & Case Studies
`id`, `title`, `projectType`, `location`, `authority`, `scope`, `photos[]`, `beforeAfter[]`, `approvalStatus`.

## 4. Guides & Knowledge Base
`id`, `title`, `category` (Authority Guides, Project Guides, Process Guides), `content`, `author`.
Acts as the main hub for topical authority.
