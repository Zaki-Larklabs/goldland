import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { authorities, projects, leads, services, reviews, guides, seoRecords, redirects } from "@/lib/db/schema";
import { createAuthority, deleteAuthority, seedDefaultAuthorities, createService, deleteService, createProject, deleteProject, createReview, deleteReview } from "./actions";
import { upsertSeo, deleteSeo, upsertRedirect, deleteRedirect } from "./actions-seo";
import { upsertBlog, deleteBlog } from "./actions-blog";
import { upsertContent, resetContent } from "./actions-content";
import { getContentAdminList } from "@/lib/content/getContent";
import { desc } from "drizzle-orm";
import LeadsTable from "@/components/admin/LeadsTable";
import { SeoPortalForm } from "@/components/admin/SeoPortalForm";
import { getSiteRoutes, getFlatSiteRoutes } from "@/lib/seo/routes";
import { logout } from "../login/actions";
import { AutoLogout } from "@/components/admin/AutoLogout";
import { RealtimeLeadToaster } from "@/components/ui/RealtimeLeadToaster";
import { 
  Search, Bell, ChevronDown, LayoutDashboard, 
  Download, FileText, Building2, Wrench, Star, 
  MessageSquare, Sparkles, Users, Settings, Plus,
  TrendingUp, Clock, CheckCircle2, User, Globe, BookOpen, ArrowRightLeft, Type
} from "lucide-react";

export const dynamic = "force-dynamic";

// ── Admin design system (visual only — no behavior lives here) ──
const TAB_META: Record<string, { title: string; desc: string }> = {
  dashboard: { title: "Dashboard", desc: "Overview of site activity." },
  leads: { title: "Lead Management", desc: "View and manage project inquiries." },
  authorities: { title: "Authority Management", desc: "Manage the list of Dubai authorities." },
  projects: { title: "Projects", desc: "Manage featured projects." },
  services: { title: "Services", desc: "Manage services displayed on /services." },
  reviews: { title: "Reviews", desc: "Manage verified reviews." },
  blog: { title: "Blog Management", desc: "Create, edit and publish blogs with ISR + Article schema." },
  seo: { title: "SEO Portal", desc: "Dynamically manage SEO meta, keywords, OG images, canonicals & sitemaps." },
  texts: { title: "Site Texts", desc: "Edit website frontend copy directly — hero, trust bar, CTAs. Saves go live instantly." },
  redirects: { title: "Redirects", desc: "Manage 301/302 redirects (DB-driven)." },
};

function AdminNavLink({ href, icon: Icon, label, active, badge }: { href: string; icon: any; label: string; active: boolean; badge?: number }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all border ${
        active
          ? "bg-[#C9A544]/[0.08] text-white border-[#C9A544]/25 shadow-[inset_2px_0_0_#C9A544]"
          : "text-gray-400 hover:bg-white/[0.04] hover:text-white border-transparent"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon className={`w-5 h-5 stroke-[1.5] transition-colors ${active ? "text-[#C9A544]" : "text-gray-500 group-hover:text-gray-300"}`} />
        <span className="text-sm font-medium">{label}</span>
      </span>
      {typeof badge === "number" && badge > 0 && (
        <span className="bg-[#C9A544] text-black text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">{badge}</span>
      )}
    </Link>
  );
}

// Shared visual tokens — class strings only, applied to identical markup/actions.
const ui = {
  card: "bg-[#101828]/90 backdrop-blur-sm border border-white/[0.07] rounded-2xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]",
  formBox: "p-5 md:p-6 bg-white/[0.03] border border-white/10 rounded-xl",
  formTitle: "font-bold text-white flex items-center gap-2",
  formSub: "text-xs text-gray-500 mt-1 mb-5",
  input:
    "w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9A544] focus:border-[#C9A544]/60 transition text-sm",
  label: "block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 bg-[#C9A544] text-black font-bold py-2.5 px-6 rounded-lg hover:bg-[#D9B96A] active:scale-[0.98] transition text-sm shadow-[0_8px_24px_-8px_rgba(201,165,68,0.5)]",
  btnGhost:
    "inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-gray-200",
  tableWrap: "overflow-x-auto rounded-xl border border-white/10 bg-black/20",
  th: "p-3.5 font-semibold text-gray-400 text-xs tracking-wide uppercase",
  emptyRow: "p-10 text-center",
  emptyTitle: "font-semibold text-gray-300 text-sm",
  emptySub: "text-xs text-gray-500 mt-1.5",
};

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ tab?: string; edit?: string; q?: string; editId?: string }> }) {
  const { tab = 'leads', edit, q = '', editId } = await searchParams; // Defaulting to leads as per design
  const editingSeo = edit ? (await (async () => { try { const { eq } = await import("drizzle-orm"); const rows = await db.select().from(seoRecords).where(eq(seoRecords.route, edit)).limit(1); return rows[0] ?? null; } catch { return null; } })()) as any : null;
  
  // Resilient reads — a single missing column/table must never 500 the whole console.
  async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try { return await fn(); } catch (e) { console.error("[admin] DB query failed:", e); return fallback; }
  }

  const allAuthorities = await safeQuery(() => db.select().from(authorities), [] as typeof authorities.$inferSelect[]);
  const allProjects = await safeQuery(() => db.select().from(projects), [] as typeof projects.$inferSelect[]);
  const allLeads = await safeQuery(() => db.select().from(leads).orderBy(desc(leads.createdAt)), [] as typeof leads.$inferSelect[]);
  let allServices: any[] = []; try { allServices = await db.select().from(services); } catch {}
  let allReviews: any[] = []; try { allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt)); } catch {}
  let allGuides: any[] = []; try { allGuides = await db.select().from(guides).orderBy(desc(guides.updatedAt)); } catch {}
  let allSeo: any[] = []; try { allSeo = await db.select().from(seoRecords).orderBy(desc(seoRecords.updatedAt)); } catch {}
  let allRedirects: any[] = []; try { allRedirects = await db.select().from(redirects); } catch {}
  // Live website route inventory for the SEO portal picker (static pages + DB slugs)
  let siteRouteGroups: { label: string; routes: string[] }[] = [];
  let siteRouteList: string[] = [];
  try { siteRouteGroups = await getSiteRoutes(); siteRouteList = Array.from(new Set(siteRouteGroups.flatMap((g) => g.routes))); }
  catch { try { siteRouteList = await getFlatSiteRoutes(); } catch { siteRouteList = []; } }
  const coveredRoutes = new Set(allSeo.map((s: any) => s.route));
  // Site Texts (CMS) — registry merged with DB rows; filter via ?q=
  let contentList: any[] = []; try { contentList = await getContentAdminList(); } catch {}
  const query = q.trim().toLowerCase();
  const filteredContent = query
    ? contentList.filter((b: any) => `${b.label} ${b.page} ${b.key} ${b.value}`.toLowerCase().includes(query))
    : contentList;
  // Project edit-prefill (?tab=projects&editId=...)
  const editProject = tab === 'projects' && editId ? (await (async () => { try { const { eq } = await import("drizzle-orm"); const rows = await db.select().from(projects).where(eq(projects.id, editId)).limit(1); return rows[0] ?? null; } catch { return null; } })()) as any : null;

  // Calculate some dummy stats for the cards (in a real app, these would be precise DB queries)
  const newThisWeek = allLeads.filter(l => new Date(l.createdAt!) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const inProgress = allLeads.filter(l => l.status === 'In Progress').length;
  const converted = allLeads.filter(l => l.status === 'Converted').length;
  const meta = TAB_META[tab] ?? TAB_META.authorities;

  return (
    <div className="flex h-screen bg-[#0A101C] text-gray-200 font-sans overflow-hidden selection:bg-[#C9A544]/30 selection:text-white">
      <AutoLogout />
      <RealtimeLeadToaster />

      {/* FIXED LEFT SIDEBAR (desktop) */}
      <aside className="w-[260px] h-full hidden lg:flex flex-col border-r border-white/[0.06] bg-[#050B14]/95 relative z-20 shrink-0">
        <div className="px-6 py-5 border-b border-white/[0.06] mb-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">
            <img src="/images/goldland-logo.png" alt="Goldland" className="h-8 w-auto brightness-0 invert" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9A544] uppercase leading-tight">Admin<br />Console</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 px-3">Main</h3>
            <nav className="space-y-1" aria-label="Admin sections">
              <AdminNavLink href="?tab=dashboard" icon={LayoutDashboard} label="Dashboard" active={tab === 'dashboard'} />
              <AdminNavLink href="?tab=leads" icon={Download} label="Leads" active={tab === 'leads'} badge={allLeads.length} />
              <AdminNavLink href="?tab=authorities" icon={Building2} label="Authorities" active={tab === 'authorities'} />
              <AdminNavLink href="?tab=projects" icon={FileText} label="Projects" active={tab === 'projects'} />
              <AdminNavLink href="?tab=services" icon={Wrench} label="Services" active={tab === 'services'} />
              <AdminNavLink href="?tab=reviews" icon={Star} label="Reviews" active={tab === 'reviews'} />
              <AdminNavLink href="?tab=blog" icon={BookOpen} label="Blog" active={tab === 'blog'} />
              <AdminNavLink href="?tab=seo" icon={Globe} label="SEO Portal" active={tab === 'seo'} />
              <AdminNavLink href="?tab=texts" icon={Type} label="Site Texts" active={tab === 'texts'} />
              <AdminNavLink href="?tab=redirects" icon={ArrowRightLeft} label="Redirects" active={tab === 'redirects'} />
            </nav>
          </div>

          <div className="mb-6">
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 px-3">System</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <Users className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Users</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <Settings className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </nav>
          </div>
          
          {/* Promotional Card Bottom */}
          <div className="relative mt-8 rounded-xl overflow-hidden border border-[#C9A544]/20 mx-1 mb-6">
            <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" style={{ filter: 'brightness(0.35) saturate(1.2)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060F] via-transparent to-transparent" />
            <div className="relative p-5 z-10 flex flex-col justify-end min-h-[140px]">
              <h4 className="text-lg font-bold font-display leading-tight mb-4 text-white">Building<br/>A Better<br/>Tomorrow</h4>
              <div className="w-6 h-0.5 bg-[#C9A544] mb-3" />
              <p className="text-[8px] tracking-widest text-gray-400 uppercase font-mono">Goldland Contracting L.L.C<br/>Dubai, UAE</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Faint Architectural Background for entire right side */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/blueprint-bg.jpg')] bg-cover bg-top opacity-[0.03] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A101C]/80 to-[#0A101C]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A101C] via-transparent to-transparent" />
        </div>

        {/* TOP HEADER */}
        <header className="min-h-20 border-b border-white/[0.06] flex items-center justify-between gap-4 px-4 md:px-8 py-3 relative z-20 bg-[#0A101C]/85 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="lg:hidden shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">
              <img src="/images/goldland-logo.png" alt="Goldland" className="h-7 w-auto brightness-0 invert" />
            </Link>
            <div className="hidden md:block flex-1 max-w-xl relative w-[320px] xl:w-[420px]">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search leads, clients, projects..."
                aria-label="Search admin"
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-11 pr-12 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9A544]/60 focus:border-[#C9A544]/40 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] text-gray-400 font-mono">/</div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            <button className="hidden sm:block text-gray-400 hover:text-white transition-colors rounded-lg p-1.5 hover:bg-white/5" aria-label="Appearance">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </button>
            <button className="hidden sm:block text-gray-400 hover:text-white transition-colors relative rounded-lg p-1.5 hover:bg-white/5" aria-label="Notifications">
              <Bell className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0A101C]" />
            </button>
            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
            
            {/* User Profile Dropdown */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A544]/30 to-[#C9A544]/10 border border-[#C9A544]/30 flex items-center justify-center text-xs font-bold text-[#E7C877] tracking-wider shrink-0">
                MZ
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white group-hover:text-[#C9A544] transition-colors leading-tight">Mohammed Asjad</p>
                <p className="text-[10px] text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="hidden md:block w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>

            {/* Actual logout form hidden in dropdown, we just use a quick logout button here for functionality until a real dropdown component is added */}
            <form action={async () => { "use server"; await logout(); }}>
              <button type="submit" className="text-[11px] font-semibold border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white text-gray-400 transition-colors">Logout</button>
            </form>
          </div>
        </header>

        {/* MOBILE SECTION SWITCHER (same ?tab links, no JS) */}
        <nav aria-label="Admin sections" className="lg:hidden relative z-20 border-b border-white/[0.06] bg-[#0A101C]/90 backdrop-blur-md px-4 py-2.5 flex gap-2 overflow-x-auto">
          {[["dashboard","Dashboard"],["leads","Leads"],["authorities","Authorities"],["projects","Projects"],["services","Services"],["reviews","Reviews"],["blog","Blog"],["seo","SEO"],["texts","Texts"],["redirects","Redirects"]].map(([key, label]) => (
            <Link
              key={key}
              href={`?tab=${key}`}
              aria-current={tab === key ? "page" : undefined}
              className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${tab === key ? "bg-[#C9A544] text-black border-[#C9A544]" : "border-white/10 text-gray-400 hover:text-white hover:border-white/25"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto relative z-20 custom-scrollbar">
          <div className="p-8 pb-20 max-w-[1600px] mx-auto">
            
            {/* Content Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5 mb-8 relative">
              <div className="min-w-0">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Link href="/admin" className="hover:text-white transition-colors">Home</Link>
                  <span aria-hidden>&gt;</span>
                  <span className="text-gray-300" aria-current="page">{meta.title}</span>
                </nav>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-tight">
                  {meta.title}
                </h1>
                <p className="text-sm text-gray-400 max-w-xl">
                  {meta.desc}
                </p>
              </div>

              <div className="hidden xl:block absolute right-40 top-0 text-right pointer-events-none">
                 <div className="text-[9px] text-gray-500 tracking-[0.2em] font-mono space-y-1">
                    <p>ENGINEERING</p>
                    <p>APPROVALS</p>
                    <p>BUILDING TOMORROW</p>
                 </div>
                 <div className="w-6 h-[1px] bg-[#C9A544] ml-auto mt-2" />
              </div>

              <div className="flex items-center gap-3 z-10 shrink-0">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors text-gray-200">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#F4E4A6] hover:to-[#D4AF37] text-black border border-[#C9A544] rounded-xl text-sm font-bold transition-all shadow-[0_8px_24px_-8px_rgba(201,165,68,0.5)]">
                  <Plus className="w-4 h-4" />
                  Add {tab === 'leads' ? 'Lead' : 'Authority'}
                </button>
              </div>
            </div>

            {/* Statistic Cards (Only show on Leads tab for now) */}
            {tab === 'leads' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <div className="relative overflow-hidden bg-[#101828]/80 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-5 flex items-center justify-between hover:border-[#C9A544]/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A544] to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A544]/10 border border-[#C9A544]/20 flex items-center justify-center text-[#C9A544] shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1 tabular-nums">{allLeads.length}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">Total Leads</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between self-stretch py-0.5">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400"><TrendingUp className="w-3 h-3"/> +20%</span>
                    <span className="text-[10px] text-gray-600">vs last month</span>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#101828]/80 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-5 flex items-center justify-between hover:border-orange-500/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1 tabular-nums">{newThisWeek}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">New This Week</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between self-stretch py-0.5">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400"><TrendingUp className="w-3 h-3"/> +100%</span>
                    <span className="text-[10px] text-gray-600">vs last week</span>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#101828]/80 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-5 flex items-center justify-between hover:border-blue-500/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1 tabular-nums">{inProgress}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">In Progress</p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#101828]/80 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-5 flex items-center justify-between hover:border-emerald-500/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1 tabular-nums">{converted}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">Converted</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT */}
            {tab === 'leads' && (
              <LeadsTable leads={allLeads} />
            )}

            {tab === 'authorities' && (
              <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-8">
                  {/* Reused Authority UI but restyled for new layout... */}
                  <form action={async () => { "use server"; await seedDefaultAuthorities(); }} className="mb-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-300">Missing Default Authorities?</h3>
                    <p className="text-sm text-blue-400/80 mt-1">Populate the database with standard Dubai authorities (DDA, DCD, DM, etc.)</p>
                  </div>
                  <button type="submit" className="bg-blue-500/20 border border-blue-500/50 text-blue-300 font-semibold py-2 px-6 rounded-lg hover:bg-blue-500/30 transition shadow-sm whitespace-nowrap">
                    🌱 Seed Data
                  </button>
                </form>
                
                <form action={async (fd) => { "use server"; await createAuthority(fd); }} className="mb-10 p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-white mb-4">Add New Authority</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input name="name" placeholder="Name (e.g. Dubai Police)" required className="bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9A544] focus:border-[#C9A544] transition" />
                    <input name="slug" placeholder="Slug (e.g. dubai-police)" required className="bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9A544] focus:border-[#C9A544] transition" />
                    <input name="jurisdiction" placeholder="Jurisdiction" className="bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9A544] focus:border-[#C9A544] transition" />
                  </div>
                  <button type="submit" className="bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black font-bold py-2.5 px-6 rounded-lg hover:from-[#F4E4A6] hover:to-[#D4AF37] transition shadow-sm">
                    Add Authority
                  </button>
                </form>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left border-collapse bg-transparent">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="p-4 font-semibold text-gray-300 text-sm tracking-wide">Name</th>
                        <th className="p-4 font-semibold text-gray-300 text-sm tracking-wide">Slug</th>
                        <th className="p-4 font-semibold text-gray-300 text-sm tracking-wide">Jurisdiction</th>
                        <th className="p-4 font-semibold text-gray-300 text-sm tracking-wide text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {allAuthorities.length === 0 && (
                        <tr><td colSpan={4} className="p-8 text-center text-gray-400">No authorities found in the database.</td></tr>
                      )}
                      {allAuthorities.map(auth => (
                        <tr key={auth.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-4 font-medium text-white">{auth.name}</td>
                          <td className="p-4 text-sm text-gray-400 font-mono">{auth.slug}</td>
                          <td className="p-4 text-sm text-gray-400">{auth.jurisdiction || '-'}</td>
                          <td className="p-4 text-right">
                            <form action={async () => { "use server"; await deleteAuthority(auth.id); }}>
                              <button type="submit" className="text-red-400 font-medium hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition text-sm opacity-0 group-hover:opacity-100 focus:opacity-100">
                                Delete
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {tab === 'services' && (
              <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
                <form action={async (fd)=>{ "use server"; await createService(fd); }} className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-white mb-4">Add Service</h3>
                  <div className="grid md:grid-cols-4 gap-3">
                    <input name="name" placeholder="Name" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                    <input name="slug" placeholder="slug" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                    <input name="category" placeholder="Category" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                    <input name="description" placeholder="Description" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                  </div>
                  <button type="submit" className="mt-4 bg-[#C9A544] text-black font-bold py-2 px-6 rounded-lg">Add Service</button>
                </form>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left"><thead><tr className="bg-white/5 border-b border-white/10"><th className="p-3 text-gray-300 text-sm">Name</th><th className="p-3 text-gray-300 text-sm">Slug</th><th className="p-3 text-gray-300 text-sm">Category</th><th className="p-3 text-right text-gray-300 text-sm">Action</th></tr></thead><tbody className="divide-y divide-white/5">{allServices.map((s:any)=>(<tr key={s.id} className="hover:bg-white/[0.02] group"><td className="p-3 text-white text-sm">{s.name}</td><td className="p-3 text-gray-400 font-mono text-xs">{s.slug}</td><td className="p-3 text-gray-400 text-xs">{s.category}</td><td className="p-3 text-right"><form action={async ()=>{ "use server"; await deleteService(s.id);}}><button className="text-red-400 text-xs hover:underline">Delete</button></form></td></tr>))}{allServices.length===0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500 text-sm">No services.</td></tr>}</tbody></table>
                </div>
              </div>
            )}
            {tab === 'projects' && (
              <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-white">{editProject ? "Edit Project" : "Add Project"} <span className="text-xs font-normal text-gray-500">— with cover image, description & category</span></h3>
                  {editProject && <Link href="?tab=projects" className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white shrink-0">✕ Cancel edit</Link>}
                </div>
                <p className="text-xs text-gray-500 mb-5">Published here → appears on <a href="/projects" target="_blank" className="text-[#C9A544] hover:underline">/projects</a>, homepage sections and sitemap. Cover image: paste an image URL (same pattern as blog covers). For direct file hosting, create a public <code className="font-mono text-gray-400">project-images</code> bucket in Supabase Storage, then paste its public URL here.</p>
                <form action={async (fd)=>{ "use server"; await createProject(fd); }} className="mb-8 p-5 md:p-6 bg-white/[0.03] border border-white/10 rounded-xl">
                  {editProject && <input type="hidden" name="id" value={editProject.id} />}
                  <div className="grid md:grid-cols-4 gap-3">
                    <input name="title" placeholder="Title *" required defaultValue={editProject?.title ?? ""} className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                    <input name="slug" placeholder="slug *" required defaultValue={editProject?.slug ?? ""} className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                    <input name="location" placeholder="Location e.g. Business Bay, Dubai" defaultValue={editProject?.location ?? ""} className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                    <input name="approvalStatus" placeholder="Status e.g. Completed" defaultValue={editProject?.approvalStatus ?? ""} className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                    <input name="category" placeholder="Category e.g. Fit-Out, Warehouse" defaultValue={editProject?.category ?? ""} className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                    <input name="coverImage" placeholder="Cover image URL https://…" defaultValue={editProject?.coverImage ?? ""} className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm md:col-span-3 focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                  </div>
                  <textarea name="description" placeholder="Project description (shows on the detail page hero)" rows={3} defaultValue={editProject?.description ?? ""} className="mt-3 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                  <button type="submit" className="mt-4 bg-[#C9A544] text-black font-bold py-2.5 px-8 rounded-lg hover:bg-[#D9B96A] text-sm">{editProject ? "Update Project →" : "Add Project →"}</button>
                </form>
                <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-left"><thead><tr className="bg-white/5 border-b border-white/10"><th className="p-3 text-gray-300 text-xs">Title</th><th className="p-3 text-gray-300 text-xs">Slug</th><th className="p-3 text-gray-300 text-xs">Location</th><th className="p-3 text-gray-300 text-xs">Media</th><th className="p-3 text-right text-gray-300 text-xs">Action</th></tr></thead><tbody className="divide-y divide-white/5">{allProjects.map((p:any)=>(<tr key={p.id} className="hover:bg-white/[0.02]"><td className="p-3 text-white text-sm max-w-[220px] truncate" title={p.title}>{p.title}</td><td className="p-3 text-gray-400 font-mono text-xs">/projects/{p.slug}</td><td className="p-3 text-gray-400 text-xs">{p.location||"-"}</td><td className="p-3 text-xs">{p.coverImage ? <a href={p.coverImage} target="_blank" className="text-[#C9A544] hover:underline">image ↗</a> : <span className="text-gray-600">—</span>}</td><td className="p-3 text-right whitespace-nowrap"><a href={`/projects/${p.slug}`} target="_blank" className="text-[#C9A544] text-xs hover:underline mr-3">View</a><Link href={`?tab=projects&editId=${p.id}`} className="text-blue-400 text-xs hover:underline mr-3">Edit</Link><form action={async ()=>{ "use server"; await deleteProject(p.id);}} className="inline"><button className="text-red-400 text-xs hover:underline">Delete</button></form></td></tr>))}{allProjects.length===0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500 text-sm">No projects yet — add your first one above.</td></tr>}</tbody></table></div>
              </div>
            )}
            {tab === 'reviews' && (
              <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
                <form action={async (fd)=>{ "use server"; await createReview(fd); }} className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-white mb-4">Add Review</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <input name="reviewerName" placeholder="Reviewer Name" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                    <input name="rating" placeholder="Rating 1-5" type="number" min="1" max="5" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                    <input name="content" placeholder="Review content" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                  </div>
                  <button type="submit" className="mt-4 bg-[#C9A544] text-black font-bold py-2 px-6 rounded-lg">Add Review</button>
                </form>
                <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-left"><thead><tr className="bg-white/5 border-b border-white/10"><th className="p-3 text-gray-300 text-sm">Reviewer</th><th className="p-3 text-gray-300 text-sm">Rating</th><th className="p-3 text-gray-300 text-sm">Content</th><th className="p-3 text-right text-gray-300 text-sm">Action</th></tr></thead><tbody className="divide-y divide-white/5">{allReviews.map((r:any)=>(<tr key={r.id}><td className="p-3 text-white text-sm">{r.reviewerName}</td><td className="p-3 text-[#C9A544] text-sm">{r.rating}★</td><td className="p-3 text-gray-400 text-xs max-w-[320px] truncate">{r.content}</td><td className="p-3 text-right"><form action={async ()=>{ "use server"; await deleteReview(r.id);}}><button className="text-red-400 text-xs hover:underline">Delete</button></form></td></tr>))}{allReviews.length===0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500 text-sm">No reviews.</td></tr>}</tbody></table></div>
              </div>
            )}
            {tab === 'seo' && (
              <div className="space-y-6">
                <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-white">SEO Portal — Dynamic Meta Manager</h3>
                    {editingSeo && <Link href="?tab=seo" className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white">✕ Cancel edit</Link>}
                  </div>
                  <p className="text-xs text-gray-500 mb-6">{editingSeo ? <>Editing <code className="text-[#C9A544] font-mono">{editingSeo.route}</code> — saving overwrites it live.</> : <>Pick a live website route below (or type a new one), add title, description, keywords, H1/H2 — saving updates that page&apos;s SEO instantly with no deploy. <span className="text-gray-400">{coveredRoutes.size} of {siteRouteList.length} live routes have overrides.</span></>}</p>
                  <SeoPortalForm
                    action={async (fd)=>{ "use server"; await upsertSeo(fd); }}
                    initial={editingSeo ? { route: editingSeo.route, title: editingSeo.title ?? "", description: editingSeo.description ?? "", keywords: editingSeo.keywords ?? "", h1: editingSeo.h1 ?? "", h2: editingSeo.h2 ?? "", ogImage: editingSeo.ogImage ?? "", canonical: editingSeo.canonical ?? "", robots: editingSeo.robots ?? "", noindex: !!editingSeo.noindex } : undefined}
                    key={editingSeo?.route ?? "new"}
                    routes={siteRouteList}
                    covered={Array.from(coveredRoutes)}
                  />
                </div>
                <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
                  <h4 className="font-bold text-white mb-4">Current SEO Records ({allSeo.length}) — click Edit to modify, changes go live instantly</h4>
                  <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-left"><thead><tr className="bg-white/5 border-b border-white/10"><th className="p-3 text-gray-300 text-xs">Route</th><th className="p-3 text-gray-300 text-xs">Title</th><th className="p-3 text-gray-300 text-xs">Keywords</th><th className="p-3 text-gray-300 text-xs">Status</th><th className="p-3 text-right text-gray-300 text-xs">Action</th></tr></thead><tbody className="divide-y divide-white/5">{allSeo.map((s:any)=>(<tr key={s.id} className="hover:bg-white/[0.02]"><td className="p-3 font-mono text-xs text-[#C9A544]"><a href={s.route} target="_blank" className="hover:underline" title="View live page">{s.route} ↗</a></td><td className="p-3 text-white text-xs max-w-[220px] truncate" title={s.description}>{s.title}</td><td className="p-3 text-gray-400 text-[11px] max-w-[200px] truncate" title={s.keywords}>{s.keywords || "—"}</td><td className="p-3 text-xs"><span className={`px-2 py-1 rounded text-[10px] font-bold border ${s.noindex ? "bg-red-500/10 text-red-400 border-red-500/20":"bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>{s.noindex?"NOINDEX":"INDEX"}</span></td><td className="p-3 text-right whitespace-nowrap"><Link href={`?tab=seo&edit=${encodeURIComponent(s.route)}`} className="text-[#C9A544] text-xs hover:underline mr-3">Edit</Link><form action={async ()=>{ "use server"; await deleteSeo(s.route);}} className="inline"><button className="text-red-400 text-xs hover:underline">Delete</button></form></td></tr>))}{allSeo.length===0 && <tr><td colSpan={5} className="p-6 text-center text-gray-500 text-sm">No SEO overrides yet. Use the quick-route chips above — e.g. <code className="font-mono text-[#C9A544]">/</code>, <code className="font-mono text-[#C9A544]">/blog</code>, <code className="font-mono text-[#C9A544]">/services</code> — it will override that page&apos;s meta site-wide.</td></tr>}</tbody></table></div>
                  <div className="mt-4 flex gap-3 text-xs"><a href="/sitemap.xml" target="_blank" className="text-[#C9A544] hover:underline">View sitemap.xml →</a><a href="/robots.txt" target="_blank" className="text-[#C9A544] hover:underline">View robots.txt →</a><a href="/blog" target="_blank" className="text-[#C9A544] hover:underline">View /blog →</a></div>
                </div>
              </div>
            )}
            {tab === 'blog' && (
              <div className="space-y-6">
                <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
                  <h3 className="font-bold text-white mb-2">Create / Update Blog Post</h3>
                  <p className="text-xs text-gray-500 mb-4">Published posts appear on <a href="/blog" target="_blank" className="text-[#C9A544] hover:underline">/blog</a>, <a href="/guides" target="_blank" className="text-[#C9A544] hover:underline">/guides</a> and in sitemap.xml. Use the same slug to update an existing post. Tags double as SEO keywords.</p>
                  <form action={async (fd)=>{ "use server"; await upsertBlog(fd); }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input name="title" placeholder="Title *" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                      <input name="slug" placeholder="slug e.g. dewa-approval-guide" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 font-mono text-sm" />
                      <input name="category" placeholder="Category e.g. Authority Approvals" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                      <input name="coverImage" placeholder="Cover Image URL" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                      <select name="status" className="bg-[#0A101C] border border-white/10 text-white p-3 rounded-lg"><option value="draft">draft</option><option value="published">published</option></select>
                      <input name="tags" placeholder="Tags / keywords, comma separated" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500" />
                      <input name="excerpt" placeholder="Excerpt (shows on /blog cards + meta description fallback)" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 md:col-span-2" />
                    </div>
                    <textarea name="content" placeholder="HTML content (rich text — supports HTML tags)" rows={6} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 font-mono text-xs" />
                    <button type="submit" className="bg-[#C9A544] text-black font-bold py-2.5 px-8 rounded-lg hover:bg-[#D9B96A]">Save Blog →</button>
                  </form>
                  <p className="text-[11px] text-gray-500 mt-3">Tip: Use HTML like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;. Cover image shown on /blog/[slug] hero. Published posts appear on both /blog and /guides. ISR 1h.</p>
                </div>
                <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
                  <h4 className="font-bold text-white mb-4">All Posts ({allGuides.length})</h4>
                  <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-left"><thead><tr className="bg-white/5 border-b border-white/10"><th className="p-3 text-gray-300 text-xs">Title</th><th className="p-3 text-gray-300 text-xs">Slug</th><th className="p-3 text-gray-300 text-xs">Status</th><th className="p-3 text-right text-gray-300 text-xs">Action</th></tr></thead><tbody className="divide-y divide-white/5">{allGuides.map((g:any)=>(<tr key={g.id} className="hover:bg-white/[0.02]"><td className="p-3 text-white text-xs max-w-[240px] truncate">{g.title}</td><td className="p-3 font-mono text-xs text-gray-400">/blog/{g.slug}</td><td className="p-3"><span className={`px-2 py-1 rounded text-[10px] font-bold border ${g.status==="published"?"bg-emerald-500/10 text-emerald-400 border-emerald-500/20":"bg-gray-500/10 text-gray-400 border-white/10"}`}>{g.status}</span></td><td className="p-3 text-right flex justify-end gap-2"><a href={`/blog/${g.slug}`} target="_blank" className="text-[#C9A544] text-xs hover:underline">View</a><form action={async ()=>{ "use server"; await deleteBlog(g.id);}}><button className="text-red-400 text-xs hover:underline">Delete</button></form></td></tr>))}{allGuides.length===0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500 text-sm">No posts yet.</td></tr>}</tbody></table></div>
                </div>
              </div>
            )}
            {tab === 'redirects' && (
              <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-8 space-y-6">
                <form action={async (fd)=>{ "use server"; await upsertRedirect(fd); }} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-white mb-4">Add Redirect (DB-driven, works via middleware)</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <input name="source" placeholder="source e.g. /old-services-page" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 font-mono text-sm" />
                    <input name="destination" placeholder="destination e.g. /services" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 font-mono text-sm" />
                    <select name="statusCode" className="bg-[#0A101C] border border-white/10 text-white p-3 rounded-lg"><option value="301">301 Permanent</option><option value="302">302 Temporary</option><option value="308">308</option></select>
                  </div>
                  <button type="submit" className="mt-4 bg-[#C9A544] text-black font-bold py-2 px-6 rounded-lg">Save Redirect</button>
                </form>
                <div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-left"><thead><tr className="bg-white/5 border-b border-white/10"><th className="p-3 text-gray-300 text-xs">Source</th><th className="p-3 text-gray-300 text-xs">Destination</th><th className="p-3 text-gray-300 text-xs">Code</th><th className="p-3 text-right text-gray-300 text-xs">Action</th></tr></thead><tbody className="divide-y divide-white/5">{allRedirects.map((r:any)=>(<tr key={r.id}><td className="p-3 font-mono text-xs text-white">{r.source}</td><td className="p-3 font-mono text-xs text-[#C9A544]">{r.destination}</td><td className="p-3 text-xs text-gray-400">{r.statusCode}</td><td className="p-3 text-right"><form action={async ()=>{ "use server"; await deleteRedirect(r.id);}}><button className="text-red-400 text-xs hover:underline">Delete</button></form></td></tr>))}{allRedirects.length===0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500 text-sm">No redirects.</td></tr>}</tbody></table></div>
                <p className="text-[11px] text-gray-500">Note: next.config.ts redirects currently static (1 entry). For full DB-driven redirects add middleware lookup — schema ready.</p>
              </div>
            )}
            {tab === 'texts' && (
              <div className="space-y-6">
                <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8">
                  <h3 className="font-bold text-white">Site Texts — Frontend Copy Manager</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-6">Every text below appears verbatim on the website. Edit + Save to update the live page instantly (no deploy). <span className="text-gray-400">“Default” = built-in copy; “Custom” = your override.</span></p>
                  <form action="/admin" method="get" className="flex flex-col sm:flex-row gap-2 mb-6">
                    <input type="hidden" name="tab" value="texts" />
                    <input name="q" defaultValue={q} placeholder="Filter texts, e.g. hero, trust, cta…" className="flex-1 bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Filter</button>
                      {q && <Link href="?tab=texts" className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 text-sm px-4 py-2.5 rounded-lg">Clear</Link>}
                    </div>
                  </form>
                  <div className="space-y-4">
                    {filteredContent.map((b: any) => (
                      <form key={`${b.page}::${b.key}`} action={async (fd)=>{ "use server"; await upsertContent(fd); }} className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                        <input type="hidden" name="page" value={b.page} />
                        <input type="hidden" name="key" value={b.key} />
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-white">{b.label}</p>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold border ${b.isDefault ? "bg-gray-500/10 text-gray-400 border-white/10" : "bg-[#C9A544]/10 text-[#C9A544] border-[#C9A544]/25"}`}>{b.isDefault ? "DEFAULT" : "CUSTOM · LIVE"}</span>
                        </div>
                        <p className="font-mono text-[11px] text-gray-500 mb-3">{b.page} › {b.key}{b.updatedAt ? ` · updated ${new Date(b.updatedAt).toLocaleString()}` : ""}</p>
                        <textarea name="value" defaultValue={b.value} rows={3} required className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]" />
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button type="submit" className="bg-[#C9A544] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#D9B96A] text-sm">Save → live instantly</button>
                          {!b.isDefault && <button type="submit" formAction={async ()=>{ "use server"; await resetContent(b.page, b.key); }} className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-lg">Reset to default</button>}
                        </div>
                      </form>
                    ))}
                    {filteredContent.length === 0 && <p className="p-8 text-center text-sm text-gray-500 border border-dashed border-white/10 rounded-xl">No texts match “{q}”. <Link href="?tab=texts" className="text-[#C9A544] hover:underline">Clear filter</Link></p>}
                  </div>
                </div>
                <div className="bg-[#111827]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8">
                  <h4 className="font-bold text-white mb-1">Add Custom Text Block</h4>
                  <p className="text-xs text-gray-500 mb-5">For developer-registered keys only — new keys need a code slot first. Ask engineering before adding.</p>
                  <form action={async (fd)=>{ "use server"; await upsertContent(fd); }} className="grid md:grid-cols-4 gap-3">
                    <input name="page" placeholder="page e.g. home" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm font-mono" />
                    <input name="key" placeholder="key e.g. hero_sub" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm font-mono" />
                    <input name="label" placeholder="Label (optional)" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm" />
                    <input name="value" placeholder="Value *" required className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm" />
                    <button type="submit" className="md:col-span-4 bg-[#C9A544] text-black font-bold py-2.5 px-6 rounded-lg hover:bg-[#D9B96A] text-sm w-fit">Add Block →</button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

    </div>
  );
}
