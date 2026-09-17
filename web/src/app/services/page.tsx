import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ServiceFinder, ServiceFinderModes, CarouselRow, ProcessTimeline } from "./ServicesInteractive";
import { AssessmentWizard } from "@/components/ui/AssessmentWizard";
import { AUTHORITY_LOGO, getAuthorityImage, getProjectTypeImage } from "@/data/service-images";
import Services3DStoryClient from "@/components/Services3DStoryClient";
import { Building2, Users, ShieldCheck, Phone, MessageCircle, Star } from "lucide-react";
import { db } from "@/lib/db";
import { authorities, services, projectTypes, projects, reviews } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

import { generateSeoMetadata } from "@/lib/seo/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/services", {
    title: "Engineering, Authority Approvals & Project Delivery in Dubai | Goldland Contracting",
    description: "Goldland Contracting provides engineering, authority approval and project support for commercial, industrial and development projects across Dubai — from assessment to handover.",
  });
}

// Force dynamic so DB is fresh, but cache via ISR if needed later
export const revalidate = 3600;

// Helpers to build display arrays from DB with safe fallbacks
async function getAuthorities() {
  try {
    const rows = await db.select().from(authorities).where(eq(authorities.isVerified, true));
    if (rows.length) return rows.map((a) => ({
      name: a.name.includes("Municipality") ? "Dubai Municipality" : a.name.replace(" (DDA)", ""),
      slug: a.slug,
      label: a.shortDescription ?? a.description?.slice(0, 60) ?? "Authority approval support",
      href: `/authority-approvals/${a.slug}`,
      verified: !!a.isVerified,
    }));
  } catch {}
  // fallback to verified 3 from local.db snapshot
  return [
    { name: "DDA", slug: "dda", label: "Dubai Development Authority", href: "/authority-approvals/dda", verified: true },
    { name: "Dubai Municipality", slug: "dubai-municipality", label: "Building, fit-out, change of use", href: "/authority-approvals/dubai-municipality", verified: true },
    { name: "DCD", slug: "dcd", label: "Dubai Civil Defence — Fire & life safety", href: "/authority-approvals/dcd", verified: true },
  ];
}

async function getServices() {
  try {
    const rows = await db.select().from(services);
    if (rows.length) return rows.map((s) => ({
      name: s.name,
      slug: s.slug,
      href: `/services/${s.slug}`,
      desc: s.description ?? (s.slug.includes("mep") ? "Mechanical, electrical and plumbing coordination." : "Design development and authority-compliant documentation."),
    }));
  } catch {}
  return [
    { name: "Architectural Design", slug: "architectural-design", href: "/services/architectural-design", desc: "Design development and authority-compliant documentation." },
    { name: "MEP Engineering", slug: "mep-engineering", href: "/services/mep-engineering", desc: "Mechanical, electrical and plumbing coordination." },
  ];
}

async function getProjectTypes() {
  try {
    const rows = await db.select().from(projectTypes);
    if (rows.length) return rows.map((p) => ({
      name: p.name,
      slug: p.slug,
      href: `/project-approvals/${p.slug}`,
      desc: p.name.includes("Warehouse") ? "Warehouse and industrial approvals" : p.name.includes("Fit-Out") ? "Commercial interior delivery" : "Approval and engineering support",
    }));
  } catch {}
  return [
    { name: "Warehouse", slug: "warehouse", href: "/project-approvals/warehouse", desc: "Warehouse and industrial approvals" },
    { name: "Commercial Fit-Out", slug: "commercial-fit-out", href: "/project-approvals/commercial-fit-out", desc: "Commercial interior delivery" },
  ];
}

async function getFeaturedProjects() {
  try {
    const rows = await db.select().from(projects).orderBy(desc(projects.publishedAt)).limit(6);
    if (rows.length) return rows.map((p) => ({ title: p.title, loc: p.location ?? "Dubai", auth: p.approvalStatus ?? "Approval support", slug: p.slug, isReal: true }));
  } catch {}
  // No fake slugs that 404 — point to /projects list if no real projects
  return [];
}

async function getVerifiedReviews() {
  try {
    const rows = await db.select().from(reviews).where(eq(reviews.isVerified, true)).limit(3);
    return rows;
  } catch { return []; }
}

export default async function ServicesPage() {
  const [authoritiesList, servicesList, projectTypesList, featured, verifiedReviews] = await Promise.all([
    getAuthorities(),
    getServices(),
    getProjectTypes(),
    getFeaturedProjects(),
    getVerifiedReviews(),
  ]);
  // SEO portal → H1/H2 override (falls back to hardcoded headings)
  const { getPageHeadings } = await import("@/lib/seo/getSeo");
  const headings = await getPageHeadings("/services");

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Goldland Services",
    itemListElement: authoritiesList.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://goldlandcontracting.ae${a.href}`,
      name: a.name,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://goldlandcontracting.ae/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://goldlandcontracting.ae/services" },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Dubai Authority Approvals, Engineering & Fit-Out",
    provider: { "@type": "Organization", name: "Goldland Contracting L.L.C.", url: "https://goldlandcontracting.ae", telephone: "+971566321734" },
    areaServed: { "@type": "City", name: "Dubai" },
    description: "Engineering-led authority approvals, design and project delivery across Dubai — from assessment to handover.",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Which Dubai authority do I need for my location?", acceptedAnswer: { "@type": "Answer", text: "It depends on jurisdiction — mainland (DM/DCD), DDA free zones, Trakhees, JAFZA, Dubai South etc. Use the finder or assessment and we map the exact pathway." } },
      { "@type": "Question", name: "How long does authority approval take?", acceptedAnswer: { "@type": "Answer", text: "Timelines vary by authority, project type and completeness of drawings. We provide a project-specific estimate after the initial assessment — no generic guarantees." } },
      { "@type": "Question", name: "Do you handle engineering and drawings?", acceptedAnswer: { "@type": "Answer", text: "Yes — architectural, structural and MEP (including HVAC/electrical/plumbing/fire) plus shop drawings and 3D/BIM where needed, all authority-compliant." } },
      { "@type": "Question", name: "What should I prepare before contacting Goldland?", acceptedAnswer: { "@type": "Answer", text: "Trade license / tenancy, affection plan or title, existing drawings if any, and a brief scope. We confirm the full checklist per authority after review." } },
    ],
  };

  return (
    <div className="bg-[#FDFBF6] dark:bg-[#050A14] text-[#0A0D14] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#070C1C] text-white border-b border-white/10">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-[0.55]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C1C] via-[#070C1C]/85 to-[#070C1C]/15" />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        <div className="relative container mx-auto max-w-[1240px] px-4 md:px-6 pt-[88px] pb-12 md:pb-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] tracking-wide text-white/60 mb-6">
            <Link href="/" className="hover:text-[#C9A544] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] rounded">Home</Link>
            <span className="text-white/30" aria-hidden>›</span>
            <span className="text-white" aria-current="page">Services</span>
            <span className="ml-auto hidden md:block text-[10px] tracking-[0.18em] uppercase text-white/50">Building Possibilities<br />In Dubai</span>
          </nav>

          <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#C9A544] mb-3">Engineering • Approvals • Project Delivery</p>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <div>
              <h1 className="text-[36px] md:text-[50px] font-bold leading-[0.95] tracking-tight">
                {headings.h1 ?? <>Engineering the approvals behind Dubai&apos;s next generation of spaces.</>}
              </h1>
              <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-white/70 max-w-[52ch]">
                Goldland Contracting provides engineering, authority approval and project support for commercial, industrial and development projects across Dubai.
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-[11px] tracking-wide text-white/70">
                <span className="inline-flex items-center gap-2"><span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center"><ShieldCheck className="w-3.5 h-3.5 text-[#C9A544]" aria-hidden /></span> Single Point<br />of Contact</span>
                <span className="inline-flex items-center gap-2"><span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center"><Building2 className="w-3.5 h-3.5 text-[#C9A544]" aria-hidden /></span> End-to-End<br />Support</span>
                <span className="inline-flex items-center gap-2"><span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-[#C9A544]" aria-hidden /></span> Dubai Authority<br />Expertise</span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="#assessment" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C9A544] hover:bg-[#D9B96A] text-black text-[13px] font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[48px] shadow-lg shadow-black/20">
                  Start Project Assessment <span aria-hidden>→</span>
                </Link>
                <a href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20would%20like%20an%20assessment%20for%20my%20project." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 bg-white/5 hover:bg-white/10 text-white text-[13px] font-semibold backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] min-h-[48px]">
                  <span className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center"><MessageCircle className="w-3 h-3 text-white" aria-hidden /></span> Speak to an Engineer
                </a>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end justify-center gap-6 min-h-[320px] relative">
              <div className="absolute inset-0 -z-10 opacity-60">
                <Image src="/images/hero-bg.jpg" alt="Goldland 3D architectural visual" fill className="object-cover rounded-2xl" sizes="420px" priority={false} />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#070C1C]/60 to-transparent" />
              </div>
              <a href="#assessment" className="group flex items-center gap-3 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] rounded-full bg-black/20 backdrop-blur px-3 py-2">
                <span className="w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#C9A544] group-hover:text-black group-hover:border-[#C9A544] transition-colors" aria-hidden>▶</span>
                <span className="text-left leading-tight text-[11px]">Watch Our Approach<br /><span className="text-white/50">(1:30)</span></span>
              </a>
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-white/40" aria-hidden>
                <span className="text-white">01</span><span className="w-8 h-px bg-[#C9A544]" />02<span className="w-6 h-px bg-white/20" />03
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE FINDER — 3-mode data-driven (APPROVALS/ENGINEERING/PROJECT) ── */}
      <ServiceFinderModes authorities={authoritiesList} services={servicesList} projectTypes={projectTypesList} />
      <ServiceFinder />

      {/* ── TRUSTED PARTNER INTRO — Goldland premium version of DAEM's "Your Trusted..." ── */}
      <section className="py-10 md:py-12 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden /> Your Trusted Partner</div>
              <h2 className="text-[24px] md:text-[30px] font-bold tracking-tight text-[#0A0D14] dark:text-white mt-2 leading-tight">{headings.h2 ?? "Engineering-led approvals across Dubai & beyond"}</h2>
              <p className="text-[14px] leading-relaxed text-[#6B7280] dark:text-white/60 mt-3 max-w-[60ch]">
                Goldland Contracting L.L.C. transforms complex authority requirements into a clear, engineered pathway — from Dubai Municipality and DDA to DCD, DEWA, RTA and free-zone jurisdictions. One engineering team, one point of accountability, from drawings to NOC. No hassle, no inflated promises — just coordination, preparation and follow-through.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3 py-1.5 rounded-full bg-[#0A0D14] text-white dark:bg-white dark:text-[#0A0D14] font-semibold">Fast-track coordination</span>
                <span className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04]">Zero-hassle NOCs</span>
                <span className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04]">Drawings → Approvals</span>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-6">
              <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]">Fast & Reliable Government Approvals</div>
              <h3 className="text-[16px] font-bold text-[#0A0D14] dark:text-white mt-2">We bridge your design and government standards.</h3>
              <p className="text-[13px] leading-relaxed text-[#6B7280] dark:text-white/60 mt-2">Deep regulatory knowledge and structured documentation help move your file without the back-and-forth that causes delays. Every submission is prepared to the reviewing authority&apos;s own standard — not a generic format reviewers send back.</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white dark:bg-white/[0.04] border border-black/5 dark:border-white/10 p-3">
                  <div className="text-[18px] font-bold text-[#0A0D14] dark:text-white">DM</div>
                  <div className="text-[10px] text-[#6B7280] dark:text-white/50">Mainland</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-white/[0.04] border border-black/5 dark:border-white/10 p-3">
                  <div className="text-[18px] font-bold text-[#0A0D14] dark:text-white">DDA</div>
                  <div className="text-[10px] text-[#6B7280] dark:text-white/50">Free zones</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-white/[0.04] border border-black/5 dark:border-white/10 p-3">
                  <div className="text-[18px] font-bold text-[#0A0D14] dark:text-white">DCD</div>
                  <div className="text-[10px] text-[#6B7280] dark:text-white/50">Life safety</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHORITY APPROVALS ────────────────────────────────── */}
      <section id="authority-approvals" className="py-10 md:py-12 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5 scroll-mt-[88px]">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden /> Authority Approvals</div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#0A0D14] dark:text-white mt-1">Dubai Authority Approvals</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60 max-w-[52ch]">Specialized support for relevant Dubai authority submissions, documentation and approval coordination.</p>
            </div>
            <Link href="/authority-approvals" className="hidden md:inline-flex text-xs font-semibold text-[#B48B2D] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] rounded">View All Authorities →</Link>
          </div>

          <CarouselRow ariaLabel="Authority approvals">
            {authoritiesList.map((a) => {
              const logo = AUTHORITY_LOGO[a.slug];
              return (
                <Link
                  key={a.slug}
                  href={a.href}
                  className="group snap-start shrink-0 w-[192px] rounded-2xl overflow-hidden bg-white dark:bg-[#0F172A] border border-black/10 dark:border-white/10 hover:border-[#C9A544]/50 dark:hover:border-[#C9A544]/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] flex flex-col"
                >
                  <div className="relative h-[112px] bg-[#FDFBF6] dark:bg-white flex items-center justify-center p-5 border-b border-black/[0.04] dark:border-white/5 group-hover:bg-[#FEFBF3] dark:group-hover:bg-[#FFFDF5] transition-colors">
                    <div className="absolute top-2 right-2">
                      <span className={`text-[8px] font-bold tracking-widest px-2 py-1 rounded-full border ${a.verified ? "bg-[#C9A544] text-black border-[#C9A544]" : "bg-white dark:bg-[#0A0D14] text-[#6B7280] dark:text-white/60 border-black/10 dark:border-white/10"}`}>{a.verified ? "VERIFIED" : "COORDINATED"}</span>
                    </div>
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt={`${a.name} logo`} className="max-h-[64px] max-w-[140px] w-auto h-auto object-contain drop-shadow-sm group-hover:scale-[1.05] transition-transform duration-500" loading="lazy" />
                    ) : (
                      <span className="text-[13px] font-bold tracking-wide text-[#0A0D14]">{a.name}</span>
                    )}
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col bg-white dark:bg-[#0F172A] group-hover:bg-[#FFFEFB] dark:group-hover:bg-[#162033] transition-colors">
                    <div className="text-[12px] font-bold leading-tight text-[#0A0D14] dark:text-white">{a.name}</div>
                    <div className="text-[11px] leading-snug text-[#6B7280] dark:text-white/55 mt-1 line-clamp-2 min-h-[30px]">{a.label}</div>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#B48B2D] dark:text-[#C9A544]">Explore <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span></div>
                  </div>
                </Link>
              );
            })}
          </CarouselRow>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <span className="text-[#6B7280] dark:text-white/50 font-semibold">Additional coverage via coordinated submission:</span>
            {["RTA", "Trakhees", "JAFZA", "Dubai South", "DEWA", "Concordia", "DIEZ", "Emaar", "Nakheel", "Tecom / DCCA"].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] text-[#0A0D14] dark:text-white/70">{t}</span>
            ))}
            <span className="text-[#6B7280] dark:text-white/40">— pathway confirmed per project in assessment, no partnership claim.</span>
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-white/40 mt-3">Only verified authorities as cards. We never claim official partnership — we coordinate submissions.</p>
          <div className="md:hidden mt-3 text-right"><Link href="/authority-approvals" className="text-xs font-semibold text-[#B48B2D]">View All Authorities →</Link></div>
        </div>
      </section>

      {/* ── DAEM-INSPIRED EXPANDED APPROVALS — Goldland premium reinterpretation ── */}
      <section className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden /> +15 pathways</div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#0A0D14] dark:text-white mt-1">Our Approvals Services — like DAEM, engineered</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60 max-w-[62ch]">DAEM lists 15 pathways; Goldland mirrors the coverage with an engineering-led approach — verified where we have direct filing history, coordinated where pathway is confirmed per project. No copy, no partnership inflation.</p>
            </div>
            <Link href="#assessment" className="hidden md:inline-flex px-5 py-2.5 rounded-lg bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] text-xs font-bold hover:opacity-90">Start Your Approval →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Dubai Municipality", desc: "Mainland building, fit-out, change of use — BPS submission & DEQ drawings.", slug: "dubai-municipality", verified: true },
              { name: "DDA", desc: "Dubai Development Authority — TECOM free zones (DIC, Media City).", slug: "dda", verified: true },
              { name: "DCD", desc: "Dubai Civil Defence — fire & life safety, suppression & alarm.", slug: "dcd", verified: true },
              { name: "DEWA", desc: "Electricity & water — load, connection, solar Shams where needed.", slug: "dewa", verified: false },
              { name: "RTA", desc: "Roads & Transport — gate level, access, traffic where impacted.", slug: "rta", verified: false },
              { name: "Trakhees", desc: "PCFC/EHS — Palm, JAFZA corridor & coastal free zones.", slug: "trakhees", verified: false },
              { name: "JAFZA", desc: "Jebel Ali Free Zone — industrial & logistics coordination.", slug: "jafza", verified: false },
              { name: "Dubai South", desc: "Aviation/expo corridor — logistics & commercial.", slug: "dubai-south", verified: false },
              { name: "Emaar", desc: "Master community NOC — Downtown, Marina, etc. via community portal.", slug: "emaar", verified: false },
              { name: "Nakheel", desc: "Master community NOC — Palm, Deira islands coordination.", slug: "nakheel", verified: false },
              { name: "Tecom / DCCA", desc: "Design & creative clusters — DCCA coordinated pathway.", slug: "tecom", verified: false },
              { name: "Concordia", desc: "JLT & associated communities — building management NOC.", slug: "concordia", verified: false },
              { name: "Sharjah", desc: "Sharjah Municipality — coordinated where project extends.", slug: "sharjah", verified: false },
              { name: "Solar / Shams", desc: "DEWA solar — Shams Dubai grid integration.", slug: "solar", verified: false },
              { name: "Fire Systems", desc: "Fire alarm, suppression, emergency lighting — DCD aligned.", slug: "fire-systems", verified: false },
            ].map((s) => {
              const logo = AUTHORITY_LOGO[s.slug];
              const href = `/authority-approvals/${s.slug}`;
              return (
                <Link
                  key={s.slug}
                  href={href}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0F172A] border border-black/10 dark:border-white/10 hover:border-[#C9A544]/50 dark:hover:border-[#C9A544]/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] flex flex-col backdrop-blur-sm"
                >
                  {/* Full-size logo area — premium ivory/white in light, white card in dark for contrast */}
                  <div className="relative h-[128px] bg-[#FDFBF6] dark:bg-white flex items-center justify-center p-6 overflow-hidden border-b border-black/[0.04] dark:border-white/5 group-hover:bg-[#FEFBF3] dark:group-hover:bg-[#FFFDF5] transition-colors">
                    {/* subtle gold accent corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#C9A544]/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className={`text-[9px] font-bold tracking-widest px-2 py-1 rounded-full border ${s.verified ? "bg-[#C9A544] text-black border-[#C9A544] shadow-sm" : "bg-white dark:bg-[#0A0D14] text-[#6B7280] dark:text-white/60 border-black/10 dark:border-white/10"}`}>{s.verified ? "VERIFIED" : "COORDINATED"}</span>
                    </div>
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo}
                        alt={`${s.name} logo`}
                        className="max-h-[72px] max-w-[160px] w-auto h-auto object-contain drop-shadow-sm group-hover:scale-[1.04] transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-xl bg-[#0A0D14] dark:bg-[#0A0D14] flex items-center justify-center text-[#C9A544] font-bold text-[16px]">{s.slug.slice(0,2).toUpperCase()}</div>
                        <span className="text-[11px] font-bold tracking-wide text-[#0A0D14]">{s.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col bg-white dark:bg-[#0F172A] group-hover:bg-[#FFFEFB] dark:group-hover:bg-[#162033] transition-colors">
                    <div className="text-[13px] font-bold leading-tight text-[#0A0D14] dark:text-white group-hover:text-[#0A0D14] dark:group-hover:text-white">{s.name}</div>
                    <div className="text-[11px] leading-snug text-[#6B7280] dark:text-white/55 mt-1.5 line-clamp-2 flex-1">{s.desc}</div>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#B48B2D] dark:text-[#C9A544] group-hover:gap-2 transition-all">
                      {s.verified ? "View requirements" : "Confirm via assessment"} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-white/40 mt-4">Goldland version: cards link to verified authority pages where we have filing history; “Coordinated” cards scroll to assessment for pathway confirmation — never claiming partnership, unlike generic DAEM-style lists.</p>
        </div>
      </section>

      {/* ── STATS BAR — honest Goldland vs DAEM numeric inflation ── */}
      <section className="py-6 bg-[#070C1C] text-white border-y border-white/10 dark:border-white/10">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center divide-x-0 md:divide-x divide-white/10">
            <div className="p-3 md:p-4">
              <div className="text-[22px] md:text-[24px] font-bold text-[#C9A544] tracking-tight">{authoritiesList.length}+</div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-medium">Authorities mapped</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-[22px] md:text-[24px] font-bold text-[#C9A544] tracking-tight">{servicesList.length}+</div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-medium">Engineering services</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-[22px] md:text-[24px] font-bold text-[#C9A544] tracking-tight">{projectTypesList.length}+</div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-medium">Project types</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-[22px] md:text-[24px] font-bold text-[#C9A544] tracking-tight">Dubai</div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-medium">Coverage • One team</div>
            </div>
          </div>
          <p className="text-[11px] text-white/40 text-center mt-3">Honest counts from live database — no inflated “650 team / 567 permits” claims. DAEM-style numbers omitted until verified.</p>
        </div>
      </section>

      {/* ── ENGINEERING EXCELLENCE (dark) ─────────────────────── */}
      <section id="engineering" className="py-10 md:py-12 bg-[#070C1C] text-white relative overflow-hidden border-b border-white/5 scroll-mt-[88px]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden />
        <div className="absolute right-6 top-6 opacity-[0.08] hidden lg:block" aria-hidden>
          <div className="w-[420px] h-[180px] border border-[#C9A544] rounded" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(201,165,68,0.15) 50%, transparent 60%)" }} />
        </div>
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 relative">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#C9A544]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden /> Engineering & Design</div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight mt-1">Engineering Excellence</h2>
              <p className="text-sm text-white/60">Only services Goldland actually offers — no inflated claims.</p>
            </div>
            <Link href="/services" className="hidden md:inline-flex text-xs font-semibold text-[#C9A544] underline underline-offset-4 decoration-[#C9A544]/40 hover:text-[#F4E4A6]">View All Engineering Services →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {servicesList.map((e) => (
              <Link key={e.slug} href={e.href} className="group rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-[#C9A544]/40 p-4 flex flex-col gap-2 transition-colors min-h-[120px] sm:min-h-[130px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#C9A544]/15 border border-white/10 group-hover:border-[#C9A544]/30 flex items-center justify-center text-[#C9A544] text-[12px] font-bold" aria-hidden>◈</span>
                <span className="text-[12px] font-semibold leading-tight text-white/90 group-hover:text-white">{e.name}</span>
                <span className="text-[11px] leading-snug text-white/50 line-clamp-2">{e.desc}</span>
              </Link>
            ))}
          </div>
          <p className="text-[11px] text-white/40 mt-4">Additional disciplines (Structural, HVAC, Electrical, Plumbing, Fire Safety, Shop Drawings, BIM) available via coordinated engineering review — ask in assessment.</p>
          <div className="md:hidden mt-4"><Link href="/services" className="text-xs font-semibold text-[#C9A544]">View All Engineering Services →</Link></div>
        </div>
      </section>

      {/* ── 3D STORYTELLING — Blueprint → Completed ── */}
      <section className="relative overflow-hidden bg-[#0A0A0A] border-y border-white/5" aria-label="3D Storytelling: Blueprint to Completed">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 py-6 md:py-8 relative z-10">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#C9A544]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden />
            3D Storytelling
          </div>
          <h2 className="text-[18px] md:text-[20px] font-bold text-white mt-1 leading-tight">Blueprint → Structure → MEP → Envelope → Interior → Completed</h2>
          <p className="text-sm text-white/60 mt-1 max-w-[62ch]">
            Engineering + Architecture + MEP + Approvals + Fit-Out + Delivery — one continuous story. Respects{" "}
            <code className="px-1 py-0.5 rounded bg-white/10 text-white/80">prefers-reduced-motion</code> (static Blueprint frame when enabled).
          </p>
        </div>
        <div style={{ background: "#0A0A0A" }}>
          <Services3DStoryClient />
        </div>
        {/* Fallback grid for no-JS / reduced-motion — visible when canvas is static */}
        <noscript>
          <div className="container mx-auto max-w-[1240px] px-4 md:px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0A0A0A]">
            {[
              { n: "01", t: "Blueprint" },
              { n: "02", t: "Structure" },
              { n: "03", t: "MEP" },
              { n: "04", t: "Envelope" },
              { n: "05", t: "Interior" },
              { n: "06", t: "Completed" },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs font-bold text-[#C9A544]">{s.n}</div>
                <div className="text-sm font-bold text-white">{s.t}</div>
              </div>
            ))}
          </div>
        </noscript>
      </section>

      {/* ── BY PROJECT TYPE ────────────────────────────────────── */}
      <section id="project-approvals" className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5 scroll-mt-[88px]">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden /> Project Approvals</div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#0A0D14] dark:text-white mt-1">By Project Type</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60">Approval and engineering support tailored to your building type — only verified project types shown.</p>
            </div>
            <Link href="/project-approvals" className="hidden md:inline-flex text-xs font-semibold text-[#B48B2D] hover:underline underline-offset-4">View All Project Types →</Link>
          </div>

          <CarouselRow ariaLabel="Project types">
            {projectTypesList.map((p) => {
              const img = getProjectTypeImage(p.slug);
              return (
                <Link key={p.slug} href={p.href} className="snap-start shrink-0 w-[176px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/40 hover:shadow-lg transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">
                  <div className="h-[118px] relative overflow-hidden bg-[#E5E7EB] dark:bg-white/5">
                    <Image src={img.image} alt={img.alt} fill className="object-cover opacity-80 group-hover:scale-[1.04] transition-transform duration-500" sizes="176px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-60" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] font-semibold text-[#0A0D14] dark:text-white">{p.name}</span>
                      <span className="w-6 h-6 rounded-full bg-[#F3F4F6] dark:bg-white/10 flex items-center justify-center text-[11px] group-hover:bg-[#C9A544] group-hover:text-black transition-colors" aria-hidden>→</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] dark:text-white/50 mt-1 line-clamp-1">{p.desc}</p>
                  </div>
                </Link>
              );
            })}
          </CarouselRow>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <span className="text-[#6B7280] dark:text-white/50 font-semibold">Also supported via assessment:</span>
            {["Office", "Restaurant", "Clinic", "Villa", "Retail", "Mezzanine", "Pharmacy", "Salon"].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] text-[#0A0D14] dark:text-white/70">{t}</span>
            ))}
            <span className="text-[#6B7280] dark:text-white/40">— engineering + authority pathway mapped per project (DAEM lists generic; we map verified).</span>
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-white/40 mt-3">Images are visual illustrations; actual Goldland projects are shown in Featured Projects below.</p>
          <div className="md:hidden mt-3 text-right"><Link href="/project-approvals" className="text-xs font-semibold text-[#B48B2D]">View All Project Types →</Link></div>
        </div>
      </section>

      {/* ── OUR PROCESS ────────────────────────────────────────── */}
      <section className="py-8 md:py-10 bg-[#0A0D14] text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,165,68,0.6) 1px, transparent 1px)", backgroundSize: "22px 22px" }} aria-hidden />
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[18px] md:text-[20px] font-bold tracking-tight">Our Process</h2>
              <p className="text-sm text-white/60">A clear, structured process from project assessment to approval and completion.</p>
            </div>
            <Link href="#assessment" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A544]/30 text-[11px] font-semibold tracking-wide text-[#C9A544] hover:bg-[#C9A544] hover:text-black transition-colors self-start md:self-auto">Learn More About Our Process →</Link>
          </div>
          <ProcessTimeline />
          <p className="text-[11px] text-white/35 mt-6">We coordinate toward approval — no guaranteed outcomes. Language: assess, design, submit, respond, approve, handover.</p>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ──────────────────────────────────── */}
      <section className="py-10 md:py-12 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[18px] md:text-[20px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Featured Projects</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60">Real projects. Real approvals. Real results — only actual Goldland projects displayed.</p>
            </div>
            <Link href="/projects" className="hidden md:inline-flex text-xs font-semibold text-[#B48B2D] hover:underline underline-offset-4">View All Projects →</Link>
          </div>

          {featured.length ? (
            <CarouselRow ariaLabel="Featured projects">
              {featured.map((f) => (
                <Link key={f.slug} href={`/projects/${f.slug}`} className="snap-start shrink-0 w-[190px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/40 hover:shadow-lg transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">
                  <div className="h-[124px] relative overflow-hidden bg-[#E5E7EB]">
                    <Image src="/images/a.png" alt={`${f.title} — ${f.loc}`} fill className="object-cover opacity-75 group-hover:scale-[1.04] transition-transform duration-500" sizes="190px" />
                  </div>
                  <div className="p-3">
                    <div className="text-[12px] font-bold leading-tight text-[#0A0D14] dark:text-white line-clamp-1">{f.title}</div>
                    <div className="text-[11px] text-[#6B7280] dark:text-white/55">{f.loc}</div>
                    <div className="text-[11px] text-[#6B7280] dark:text-white/45">{f.auth}</div>
                  </div>
                </Link>
              ))}
            </CarouselRow>
          ) : (
            <div className="rounded-xl border border-dashed border-black/15 dark:border-white/15 bg-[#FEFBF3] dark:bg-white/[0.02] p-8 text-center">
              <p className="text-sm font-semibold text-[#0A0D14] dark:text-white">No featured projects published yet — placeholder omitted.</p>
              <p className="text-[11px] text-[#6B7280] dark:text-white/50 mt-1">We never fill empty slots with fake case studies. Add projects in Admin → they appear here automatically.</p>
              <Link href="/projects" className="inline-flex mt-4 text-xs font-semibold text-[#B48B2D] hover:underline">View Projects →</Link>
            </div>
          )}
          <div className="md:hidden mt-3 text-right"><Link href="/projects" className="text-xs font-semibold text-[#B48B2D]">View All Projects →</Link></div>
        </div>
      </section>

      {/* ── TRUST / PROOF ──────────────────────────────────────── */}
      <section className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" aria-hidden /> Trust & Proof</div>
              <h2 className="text-[20px] font-bold tracking-tight text-[#0A0D14] dark:text-white mt-2">Evidence, not promises</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60 mt-2">Engineering capability, transparent process and verified project evidence — no inflated claims.</p>
              <Link href="/reviews" className="inline-flex mt-4 text-xs font-semibold text-[#B48B2D] hover:underline">View verified reviews →</Link>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4">
                <div className="text-[11px] tracking-wide uppercase font-bold text-[#6B7280] dark:text-white/50">Google Reviews</div>
                {verifiedReviews.length ? (
                  <>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9A544] text-[#C9A544]" aria-hidden />
                      ))}
                      <span className="text-[13px] font-bold text-[#0A0D14] dark:text-white ml-1">5.0</span>
                    </div>
                    <p className="text-[11px] text-[#0A0D14] dark:text-white/80 mt-2 line-clamp-3 italic">&quot;{verifiedReviews[0].content?.slice(0, 120)}&hellip;&quot;</p>
                    <p className="text-[11px] text-[#6B7280] dark:text-white/55 mt-1">— {verifiedReviews[0].reviewerName} · Verified</p>
                  </>
                ) : (
                  <>
                    <div className="text-[22px] font-bold text-[#0A0D14] dark:text-white mt-1">5.0 ★</div>
                    <p className="text-[11px] text-[#6B7280] dark:text-white/55 mt-1">Verified client feedback. We never fabricate ratings — see Google Business Profile for full list.</p>
                  </>
                )}
              </div>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4">
                <div className="text-[11px] tracking-wide uppercase font-bold text-[#6B7280] dark:text-white/50">Engineering-led</div>
                <div className="text-[13px] font-bold text-[#0A0D14] dark:text-white mt-1">Licensed documentation</div>
                <p className="text-[11px] text-[#6B7280] dark:text-white/55 mt-1">Drawings prepared for authority compliance — coordinated, stamped and submission-ready.</p>
              </div>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4">
                <div className="text-[11px] tracking-wide uppercase font-bold text-[#6B7280] dark:text-white/50">Approvals handled</div>
                <div className="text-[13px] font-bold text-[#0A0D14] dark:text-white mt-1">{authoritiesList.map((a) => a.name.split(" ")[0]).slice(0, 4).join(" • ") || "Approvals"}</div>
                <p className="text-[11px] text-[#6B7280] dark:text-white/55 mt-1">Jurisdiction-mapped pathway — mainland and free zones where verified.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-[#6B7280] dark:text-white/50">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03]"><ShieldCheck className="w-3 h-3 text-[#C9A544]" aria-hidden /> No guaranteed approvals — we coordinate, prepare and manage professionally.</span>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#070C1C] text-white border-t border-white/10">
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover object-right opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C1C] via-[#070C1C]/80 to-transparent" />
        </div>
        <div className="relative container mx-auto max-w-[1240px] px-4 md:px-6 py-10 md:py-12">
          <div className="max-w-[560px]">
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight">Ready to start your project?</h2>
            <p className="text-sm text-white/60 mt-2">Share your project details and let our team review the requirements.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#assessment" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C9A544] hover:bg-[#D9B96A] text-black text-[12px] font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Get an Approval Assessment →</Link>
              <a href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20would%20like%20an%20assessment%20for%20my%20project." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]"><span className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center"><MessageCircle className="w-3 h-3 text-white" aria-hidden /></span> WhatsApp an Engineer</a>
              <a href="tel:+971566321734" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 text-white/80 text-[12px] font-semibold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]"><Phone className="w-3.5 h-3.5" aria-hidden /> Call +971 56 632 1734</a>
            </div>
            <p className="text-[11px] text-white/40 mt-3">Also: <a href="tel:+97142292800" className="underline underline-offset-2 hover:text-white">+971 4 229 2800</a> • <a href="mailto:sales@goldlandcontracting.ae" className="underline underline-offset-2 hover:text-white">sales@goldlandcontracting.ae</a></p>
          </div>
          <div className="hidden lg:block absolute right-6 top-8 text-right text-[9px] tracking-[0.18em] uppercase text-white/30 leading-relaxed" aria-hidden>
            Engineering<br />Approvals<br />A Better Tomorrow
          </div>
        </div>
      </section>

      {/* ── ASSESSMENT ─────────────────────────────────────────── */}
      <section id="assessment" className="py-10 md:py-14 bg-[#FEFBF3] dark:bg-[#050A14] border-t border-black/5 dark:border-white/5 scroll-mt-[88px]">
        <div className="container mx-auto max-w-[900px] px-4 md:px-6">
          <AssessmentWizard />
          <p className="text-center text-[11px] text-[#6B7280] dark:text-white/40 mt-4">Your enquiry is tracked with <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">sourcePage=/services</code> + UTM for lead attribution.</p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-10 bg-white dark:bg-[#0A0D14] border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <h2 className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#0A0D14] dark:text-white mb-4">Common questions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <details className="group rounded-xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-4 open:bg-white dark:open:bg-white/[0.06]">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4 text-[#0A0D14] dark:text-white">Which authority do I need for my location? <span className="text-[#B48B2D] group-open:rotate-45 transition-transform" aria-hidden>+</span></summary>
              <p className="text-[#6B7280] dark:text-white/60 mt-2 leading-relaxed">It depends on jurisdiction — mainland (DM/DCD), DDA free zones, Trakhees, JAFZA, Dubai South etc. Use the finder or assessment and we map the exact pathway.</p>
            </details>
            <details className="group rounded-xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-4">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4 text-[#0A0D14] dark:text-white">How long does authority approval take? <span className="text-[#B48B2D] group-open:rotate-45 transition-transform" aria-hidden>+</span></summary>
              <p className="text-[#6B7280] dark:text-white/60 mt-2 leading-relaxed">Timelines vary by authority, project type and completeness of drawings. We provide a project-specific estimate after the initial assessment — no generic guarantees.</p>
            </details>
            <details className="group rounded-xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-4">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4 text-[#0A0D14] dark:text-white">Do you handle engineering and drawings? <span className="text-[#B48B2D] group-open:rotate-45 transition-transform" aria-hidden>+</span></summary>
              <p className="text-[#6B7280] dark:text-white/60 mt-2 leading-relaxed">Yes — architectural, structural and MEP (including HVAC/electrical/plumbing/fire) plus shop drawings and 3D/BIM where needed, all authority-compliant.</p>
            </details>
            <details className="group rounded-xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-4">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4 text-[#0A0D14] dark:text-white">What should I prepare before contacting Goldland? <span className="text-[#B48B2D] group-open:rotate-45 transition-transform" aria-hidden>+</span></summary>
              <p className="text-[#6B7280] dark:text-white/60 mt-2 leading-relaxed">Trade license / tenancy, affection plan or title, existing drawings if any, and a brief scope. We confirm the full checklist per authority after review.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
