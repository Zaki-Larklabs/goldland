import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { authorities, projects, leads } from "@/lib/db/schema";
import { createAuthority, deleteAuthority, seedDefaultAuthorities } from "./actions";
import { desc } from "drizzle-orm";
import LeadsTable from "@/components/admin/LeadsTable";
import { logout } from "../login/actions";
import { AutoLogout } from "@/components/admin/AutoLogout";
import { 
  Search, Bell, ChevronDown, LayoutDashboard, 
  Download, FileText, Building2, Wrench, Star, 
  MessageSquare, Sparkles, Users, Settings, Plus,
  TrendingUp, Clock, CheckCircle2, User
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab = 'leads' } = await searchParams; // Defaulting to leads as per design
  
  const allAuthorities = await db.select().from(authorities);
  const allProjects = await db.select().from(projects);
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  // Calculate some dummy stats for the cards (in a real app, these would be precise DB queries)
  const newThisWeek = allLeads.filter(l => new Date(l.createdAt!) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const inProgress = allLeads.filter(l => l.status === 'In Progress').length;
  const converted = allLeads.filter(l => l.status === 'Converted').length;

  return (
    <div className="flex h-screen bg-[#0A101C] text-gray-200 font-sans overflow-hidden selection:bg-[#C9A544]/30 selection:text-white">
      <AutoLogout />

      {/* FIXED LEFT SIDEBAR */}
      <aside className="w-[280px] h-full flex flex-col border-r border-white/5 bg-[#050B14] relative z-20 shrink-0">
        <div className="p-6 border-b border-white/5 mb-4">
          <Link href="/">
            <img src="/images/goldland-logo.png" alt="Goldland" className="h-8 w-auto brightness-0 invert" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3 px-3">Main</h3>
            <nav className="space-y-1">
              <Link href="?tab=dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${tab === 'dashboard' ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <LayoutDashboard className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link href="?tab=leads" className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${tab === 'leads' ? 'bg-[#C9A544]/10 text-white border border-[#C9A544]/20 shadow-[inset_2px_0_0_#C9A544]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 stroke-[1.5] rotate-180" />
                  <span className="text-sm font-medium">Leads</span>
                </div>
                {allLeads.length > 0 && (
                  <span className="bg-[#C9A544] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{allLeads.length}</span>
                )}
              </Link>
              <Link href="?tab=authorities" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${tab === 'authorities' ? 'bg-[#C9A544]/10 text-white border border-[#C9A544]/20 shadow-[inset_2px_0_0_#C9A544]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                <Building2 className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Authorities</span>
              </Link>
              <Link href="?tab=projects" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${tab === 'projects' ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <FileText className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Projects</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <Wrench className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Services</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <Star className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Reviews</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">Content</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
                <span className="text-sm font-medium">AI Assistant</span>
              </Link>
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
          <div className="relative mt-8 rounded-xl overflow-hidden border border-white/10 mx-3 mb-6">
            <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" style={{ filter: 'brightness(0.4) saturate(1.2)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060F] to-transparent" />
            <div className="relative p-5 z-10 flex flex-col justify-end min-h-[140px]">
              <h4 className="text-lg font-bold font-display leading-tight mb-4">Building<br/>A Better<br/>Tomorrow</h4>
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
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 relative z-20 bg-[#0A101C]/80 backdrop-blur-md">
          <div className="flex-1 max-w-xl relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search leads, clients, projects..." 
              className="w-full bg-white/[0.02] border border-white/5 rounded-lg pl-11 pr-12 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] text-gray-400 font-mono">/</div>
          </div>

          <div className="flex items-center gap-6 ml-8">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#0A101C]" />
            </button>
            <div className="w-[1px] h-8 bg-white/10" />
            
            {/* User Profile Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-semibold text-white tracking-wider">
                MZ
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white group-hover:text-[#C9A544] transition-colors">Mohammed Asjad</p>
                <p className="text-[10px] text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>
            
            {/* Actual logout form hidden in dropdown, we just use a quick logout button here for functionality until a real dropdown component is added */}
            <form action={async () => { "use server"; await logout(); }}>
              <button type="submit" className="text-[10px] border border-white/10 px-2 py-1 rounded hover:bg-white/10 text-gray-400 transition-colors">Logout</button>
            </form>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto relative z-20 custom-scrollbar">
          <div className="p-8 pb-20 max-w-[1600px] mx-auto">
            
            {/* Content Header */}
            <div className="flex justify-between items-start mb-8 relative">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                  <span>&gt;</span>
                  <span className="text-gray-300">Leads</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">
                  {tab === 'leads' ? 'Lead Management' : 'Authority Management'}
                </h1>
                <p className="text-sm text-gray-400">
                  {tab === 'leads' ? 'View and manage project inquiries and service requests from your website.' : 'Manage the list of Dubai authorities available on the website.'}
                </p>
              </div>

              <div className="hidden lg:block absolute right-40 top-0 text-right">
                 <div className="text-[9px] text-gray-500 tracking-[0.2em] font-mono space-y-1">
                    <p>ENGINEERING</p>
                    <p>APPROVALS</p>
                    <p>BUILDING TOMORROW</p>
                 </div>
                 <div className="w-6 h-[1px] bg-[#C9A544] ml-auto mt-2" />
              </div>

              <div className="flex items-center gap-3 z-10">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#F4E4A6] hover:to-[#D4AF37] text-black border border-[#C9A544] rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(201,165,68,0.1)]">
                  <Plus className="w-4 h-4" />
                  Add {tab === 'leads' ? 'Lead' : 'Authority'}
                </button>
              </div>
            </div>

            {/* Statistic Cards (Only show on Leads tab for now) */}
            {tab === 'leads' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#C9A544]/10 border border-[#C9A544]/20 flex items-center justify-center text-[#C9A544]">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1">{allLeads.length}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">Total Leads</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between h-full">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mb-4"><TrendingUp className="w-3 h-3"/> +20%</span>
                    <span className="text-[10px] text-gray-600">vs last month</span>
                  </div>
                </div>

                <div className="bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1">{newThisWeek}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">New This Week</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between h-full">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mb-4"><TrendingUp className="w-3 h-3"/> +100%</span>
                    <span className="text-[10px] text-gray-600">vs last week</span>
                  </div>
                </div>

                <div className="bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1">{inProgress}</h3>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">In Progress</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-none mb-1">{converted}</h3>
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

          </div>
        </main>
      </div>

    </div>
  );
}
