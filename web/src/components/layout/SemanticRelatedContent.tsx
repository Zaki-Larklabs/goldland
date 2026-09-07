import React from "react";
import { db } from "@/lib/db";
import { 
  authorities, 
  services, 
  projects, 
  guides, 
  faqs, 
  serviceAuthorities, 
  guideAuthorities, 
  guideServices 
} from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { AuthorityCard } from "@/components/cards/AuthorityCard";

interface SemanticRelatedContentProps {
  contextType: "authority" | "service" | "project" | "guide";
  contextId: string;
}

export async function SemanticRelatedContent({ contextType, contextId }: SemanticRelatedContentProps) {
  // 1. Fetching logic based on strict junction tables
  // Note: For local SQLite without actual seed data in the junction tables, 
  // we will mock the return arrays to prove the UI architecture doesn't break,
  // while utilizing the explicit Drizzle queries we'd run in production.

  let relatedAuthorities: any[] = [];
  let relatedServices: any[] = [];
  let relatedProjects: any[] = [];
  let relatedGuides: any[] = [];
  let relatedFaqs: any[] = [];

  try {
    if (contextType === "authority") {
      // If we are on an Authority page, find all Services linked to this Authority
      const linkedServices = await db.select().from(serviceAuthorities).where(eq(serviceAuthorities.authorityId, contextId));
      if (linkedServices.length > 0) {
        relatedServices = await db.select().from(services).where(inArray(services.id, linkedServices.map(ls => ls.serviceId)));
      }

      // Find all Projects built under this Authority
      relatedProjects = await db.select().from(projects).where(eq(projects.authorityId, contextId)).limit(2);
      
      // Find all Guides for this Authority
      const linkedGuides = await db.select().from(guideAuthorities).where(eq(guideAuthorities.authorityId, contextId));
      if (linkedGuides.length > 0) {
        relatedGuides = await db.select().from(guides).where(inArray(guides.id, linkedGuides.map(lg => lg.guideId))).limit(2);
      }

      // Find Authority-specific FAQs
      relatedFaqs = await db.select().from(faqs).where(eq(faqs.authorityId, contextId)).limit(3);
    }
    
    if (contextType === "service") {
      // Find all Authorities that govern this Service
      const linkedAuths = await db.select().from(serviceAuthorities).where(eq(serviceAuthorities.serviceId, contextId));
      if (linkedAuths.length > 0) {
        relatedAuthorities = await db.select().from(authorities).where(inArray(authorities.id, linkedAuths.map(la => la.authorityId)));
      }
    }

  } catch (error) {
    console.error("Semantic Linking Error:", error);
    // Fail gracefully without breaking the page
  }

  // 2. Strict UI Rendering (Zero Hallucination Rule)
  // We only render sections if the database explicitly returned linked records.

  const hasContent = relatedAuthorities.length > 0 || relatedServices.length > 0 || relatedProjects.length > 0 || relatedGuides.length > 0;

  if (!hasContent) return null;

  return (
    <div className="py-12 border-t border-border-light dark:border-border-dark mt-16">
      <h3 className="text-2xl font-display font-bold text-ink dark:text-white mb-8">Related Documentation & Approvals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Render Related Projects (Case Studies) */}
        {relatedProjects.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brass" /> Related Projects
            </h4>
            {relatedProjects.map(proj => (
              <ProjectCard key={proj.id} id={proj.id} title={proj.title} slug={proj.slug} />
            ))}
          </div>
        )}

        {/* Render Related Authorities */}
        {relatedAuthorities.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brass" /> Governing Authorities
            </h4>
            {relatedAuthorities.map(auth => (
              <AuthorityCard key={auth.id} id={auth.id} name={auth.name} slug={auth.slug} jurisdiction={auth.jurisdiction} />
            ))}
          </div>
        )}

        {/* Render Related Services */}
        {relatedServices.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brass" /> Associated Services
            </h4>
            <ul className="space-y-2">
              {relatedServices.map(srv => (
                <li key={srv.id}>
                  <Link href={`/services/${srv.slug}`} className="block p-4 bg-gray-50 dark:bg-ink-soft rounded-lg border border-border-light dark:border-border-dark hover:border-brass dark:hover:border-brass transition-colors text-ink dark:text-white font-medium text-sm">
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-brass" /> Technical Guides
            </h4>
            <ul className="space-y-2">
              {relatedGuides.map(guide => (
                <li key={guide.id}>
                  <Link href={`/guides/${guide.slug}`} className="group flex items-start gap-3 p-4 bg-gray-50 dark:bg-ink-soft rounded-lg border border-border-light dark:border-border-dark hover:border-brass dark:hover:border-brass transition-colors">
                    <FileText className="h-5 w-5 text-gray-400 group-hover:text-brass shrink-0 mt-0.5" />
                    <div>
                      <p className="text-ink dark:text-white font-medium text-sm leading-tight">{guide.title}</p>
                      <p className="text-brass text-xs font-bold mt-2 flex items-center">
                        Read Guide <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
