"use client";

import React, { useState } from "react";

const QUICK_ROUTES = [
  "/", "/about", "/services", "/authority-approvals", "/projects",
  "/blog", "/guides", "/project-types", "/project-approvals",
  "/contact", "/faqs", "/team", "/reviews", "/credentials",
];

export function SeoPortalForm({
  action,
  initial,
  routes = [],
  covered = [],
}: {
  action: (fd: FormData) => void;
  initial?: { route?: string; title?: string; description?: string; keywords?: string; h1?: string; h2?: string; ogImage?: string; canonical?: string; robots?: string; noindex?: boolean };
  routes?: string[];
  covered?: string[];
}) {
  const [route, setRoute] = useState(initial?.route ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [keywords, setKeywords] = useState(initial?.keywords ?? "");
  const [h1, setH1] = useState(initial?.h1 ?? "");
  const [h2, setH2] = useState(initial?.h2 ?? "");

  const titleLen = title.length;
  const descLen = description.length;
  const titleOk = titleLen > 0 && titleLen <= 60;
  const descOk = descLen > 0 && descLen <= 160;
  const kwCount = keywords.split(",").map((k) => k.trim()).filter(Boolean).length;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form action={action} className="space-y-4">
        <div>
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider" htmlFor="seo-route">Route *</label>
            {routes.length > 0 && (
              <span className="text-[11px] font-mono text-gray-500">{routes.length} live routes · {covered.length} with overrides</span>
            )}
          </div>
          <input
            id="seo-route"
            name="route" value={route} onChange={(e) => setRoute(e.target.value)}
            placeholder="/  or  /services  or  /blog/my-post" required
            list="seo-route-list" autoComplete="off"
            className="mt-1 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]"
          />
          <datalist id="seo-route-list">
            {routes.map((r) => (
              <option key={r} value={r}>{covered.includes(r) ? "● has override" : "○ default meta"}</option>
            ))}
          </datalist>
          {route && routes.length > 0 && !routes.includes(route) && (
            <p className="text-[11px] text-amber-400 mt-1.5">“{route}” isn&apos;t in the live route list — it will still save, but double-check the spelling.</p>
          )}
          {route && covered.includes(route) && (
            <p className="text-[11px] text-emerald-400 mt-1.5">This route already has an override — saving updates the live page instantly.</p>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {QUICK_ROUTES.map((r) => (
              <button key={r} type="button" onClick={() => setRoute(r)}
                className={`px-2 py-1 rounded-md font-mono text-[11px] border transition-colors ${route === r ? "bg-[#C9A544] text-black border-[#C9A544]" : "border-white/10 text-gray-400 hover:border-[#C9A544]/40 hover:text-white"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Meta Title *</label>
            <span className={`text-[11px] font-mono ${titleOk ? "text-emerald-400" : "text-amber-400"}`}>{titleLen}/60</span>
          </div>
          <input
            name="title" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Meta Title (≤60 chars)" required
            className="mt-1 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9A544]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Meta Description *</label>
            <span className={`text-[11px] font-mono ${descOk ? "text-emerald-400" : "text-amber-400"}`}>{descLen}/160</span>
          </div>
          <textarea
            name="description" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Meta Description (155–160 chars)" rows={3} required
            className="mt-1 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A544]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Keywords</label>
            <span className="text-[11px] font-mono text-gray-500">{kwCount} keywords</span>
          </div>
          <input
            name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)}
            placeholder="dubai authority approvals, dda approval, dewa noc"
            className="mt-1 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9A544]"
          />
        </div>
        <div className="rounded-xl border border-[#C9A544]/30 bg-[#C9A544]/[0.04] p-4 space-y-4">
          <p className="text-[11px] uppercase tracking-widest text-[#C9A544] font-semibold">On-page headings — overrides the live H1/H2</p>
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">H1 override</label>
              <span className="text-[11px] font-mono text-gray-500">{h1.length} chars</span>
            </div>
            <input
              name="h1" value={h1} onChange={(e) => setH1(e.target.value)}
              placeholder="Leave empty to keep the page's default H1"
              className="mt-1 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9A544]"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">H2 override</label>
              <span className="text-[11px] font-mono text-gray-500">{h2.length} chars</span>
            </div>
            <input
              name="h2" value={h2} onChange={(e) => setH2(e.target.value)}
              placeholder="Leave empty to keep the page's default H2"
              className="mt-1 w-full bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C9A544]"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="ogImage" defaultValue={initial?.ogImage ?? ""} placeholder="OG Image URL (https://…)" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm" />
          <input name="canonical" defaultValue={initial?.canonical ?? ""} placeholder="Canonical URL (optional)" className="bg-white/5 border border-white/10 text-white p-3 rounded-lg placeholder:text-gray-500 text-sm" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-300"><input type="checkbox" name="noindex" defaultChecked={initial?.noindex} className="rounded accent-[#C9A544]" /> Noindex (hide from sitemap)</label>
          <input name="robots" defaultValue={initial?.robots ?? ""} placeholder="robots e.g. index,follow" className="bg-white/5 border border-white/10 text-white p-2 rounded-lg placeholder:text-gray-500 text-xs flex-1" />
        </div>
        <button type="submit" className="bg-[#C9A544] text-black font-bold py-2.5 px-8 rounded-lg hover:bg-[#D9B96A] transition-colors">Save SEO → affects live site instantly</button>
      </form>

      {/* Live Google SERP preview */}
      <div className="space-y-4">
        <div className="rounded-xl border border-white/10 bg-white p-5">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-3">Google preview — live</p>
          <p className="text-sm text-[#202124]">goldlandcontracting.ae <span className="text-gray-500">{route || "/your-route"}</span></p>
          <p className="text-xl text-[#1a0dab] hover:underline leading-snug mt-1">{title || "Your meta title appears here"}</p>
          <p className="text-sm text-[#4d5156] mt-1 line-clamp-2">{description || "Your meta description appears here. Keep it under 160 characters so it doesn't get truncated in search results."}</p>
          {kwCount > 0 && <p className="text-[11px] text-gray-400 mt-2 font-mono">{keywords}</p>}
        </div>
        <div className="rounded-xl border border-white/10 bg-[#070C1C] p-5">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-3">On-page preview — live H1/H2</p>
          <p className="text-2xl font-bold text-white leading-tight">{h1 || "Page's default H1 stays"}</p>
          <p className="text-sm text-white/60 mt-1">{h2 || "Page's default H2 stays"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-xs space-y-2">
          <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">SEO health — live checks</p>
          <div className={`flex items-center gap-2 ${titleOk ? "text-emerald-400" : "text-amber-400"}`}><span>{titleOk ? "✓" : "!"}</span> Title {titleLen}/60 {titleLen > 60 ? "(too long — will truncate)" : titleLen === 0 ? "(required)" : "(good)"}</div>
          <div className={`flex items-center gap-2 ${descOk ? "text-emerald-400" : "text-amber-400"}`}><span>{descOk ? "✓" : "!"}</span> Description {descLen}/160 {descLen > 160 ? "(too long)" : descLen === 0 ? "(required)" : descLen < 120 ? "(a bit short — aim 140-160)" : "(good)"}</div>
          <div className={`flex items-center gap-2 ${kwCount > 0 && kwCount <= 10 ? "text-emerald-400" : "text-gray-500"}`}><span>{kwCount > 0 ? "✓" : "○"}</span> {kwCount} keywords {kwCount > 10 ? "(many — keep top 5-10)" : "(comma-separated)"}</div>
          <p className="text-gray-500 pt-1">Saving writes to <code className="text-[#C9A544]">seo_records</code> and revalidates the route + sitemap. No deploy needed.</p>
        </div>
      </div>
    </div>
  );
}
