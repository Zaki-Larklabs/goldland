import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { LeadRepository } from '@/lib/ai/repositories/LeadRepository';
import { AuthorityRepository } from '@/lib/ai/repositories/AuthorityRepository';
import { ServiceRepository } from '@/lib/ai/repositories/ServiceRepository';

// ── Providers ─────────────────────────────────────────────────────────
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

// ── Rate limit ────────────────────────────────────────────────────────
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// ── EXPANDED GOLDLAND RAG KNOWLEDGE ──────────────────────────────────
const GOLDLAND_KNOWLEDGE = `Goldland Contracting LLC — Dubai's premier engineering, fit-out & authority approval consultancy. 10+ years, 500+ projects delivered across all 7 Emirates. HQ: Dubai. Licensed contractor + engineering consultancy.

══ SERVICES (full stack) ══
1) Authority Approvals — end-to-end NOC/permit submission & follow-up until final approval. We handle drawings, calculations, portal submissions, authority revisions, inspections until stamp.
2) Architectural Design — concept, 3D, authority-compliant 2D permit drawings (AutoCAD/Revit), as-built.
3) MEP Engineering — HVAC load calc (HAP), electrical load schedule + SLD, plumbing/drainage, fire fighting & fire alarm design.
4) Structural Engineering — steel mezzanine design, structural calcs, stability certificates.
5) Fit-Out Contracting — office, retail, F&B, clinic, warehouse, villa interior execution with authority-compliant materials.
6) Project Management — schedule, cost control, authority liaison.
7) Fire & Safety Compliance (DCD) — fire layout, evacuation, sprinkler hydraulics, emergency lighting.

══ AUTHORITIES — deep RAG ══

• DM (Dubai Municipality):
  Jurisdiction: ALL mainland Dubai (Business Bay mainland parts, Al Quoz, DIP, JLT mainland buildings, warehouses, villas).
  Use cases: warehouses, mezzanines, office fit-outs, villas, shops, clinics.
  Required docs: Affection Plan (from DLD), Trade License, Title Deed (owner) or Ejari + Tenancy Contract (tenant), Passport/EID, Architectural + MEP + Structural (if mezzanine), Landlord/master-developer NOC (Nakheel, Emaar). For food: HACCP.
  Process: Collect docs → site survey → prepare compliant drawings → DM BPS portal submission → DM comments (1-2 cycles) → fee payment → Final NOC → inspection.
  Timeline: 2-8 weeks (simple shop 2-3w, warehouse/mezzanine 3-6w, villa G+1 4-8w).

• DDA / TECOM (Dubai Development Authority):
  Jurisdiction: Dubai Media City, Internet City, Knowledge Park, Studio City, Production City, Design District (d3), Science Park, Dubiotech, Outsource City, Business Bay (TECOM towers).
  Required docs: Trade License (from DDA), Tenancy Contract (Ejari via DDA), Passport/EID, **Landlord NOC MANDATORY** from business centre/TECOM, Architectural + MEP drawings (AC, lighting, power, data, plumbing), structural if mezzanine.
  Process: Docs + Landlord NOC → design per DDA guidelines → DDA Asset Management portal submission → DDA engineer comments → revise & resubmit → Final Work Permit / NOC.
  Timeline: 2-4 weeks (office), 3-6 weeks (restaurant with grease trap/kitchen hood).
  NOTE: DDA ≠ Dubai Municipality. Landlord NOC is gate before portal.

• DCD (General Directorate of Civil Defence — Dubai Civil Defence):
  Jurisdiction: ALL Dubai — every fit-out, mezzanine, partition, shop, warehouse MUST have DCD NOC alongside DM or DDA.
  Required docs: Architectural fire layout (exit routes, fire rating), Fire fighting drawings (sprinkler head layout + hydraulic calcs per NFPA), Fire alarm drawings (detector/sounder layout, loop diagram, battery calcs), Material fire certificates.
  Process: Prepare DCD-compliant design → DCD e-services portal submission → DCD review → site inspection → Final DCD approval.
  Timeline: 2-3 weeks. Mezzanines ALWAYS need DCD.

• DEWA (Dubai Electricity & Water Authority):
  Scope: additional load, new meter, load increase, LV panel approval.
  Docs: Electrical load schedule, Single Line Diagram (SLD), DEWA application form, Trade License + Ejari.
  Process: DEWA eLMS submission → engineer comment → payment → approval.

• Trakhees / JAFZA / EHS (DP World):
  Jurisdiction: JAFZA, Dubai South, National Industries Park, DP World.
  Docs: JAFZA trade license/lease, Architectural + MEP + Structural drawings, Environmental statement if industrial.
  Process: JAFZA portal → Trakhees CED & EHS reviews → inspections → final NOC. Timeline: 3-5 weeks.

• OTHER UAE: RAKEZ, SAIF Zone, Dubai South, DAFZ, Abu Dhabi Municipality (ADM) — via partners.

══ PROJECT TYPES & WHEN EACH AUTHORITY APPLIES ══
- Warehouse + office inside: DM + DCD (mainland); Trakhees+EHS+DCD (JAFZA). Mezzanine steel → DM + DCD + structural calc (always).
- Office fit-out in Media City: DDA + DCD.
- Restaurant/café: DDA or DM + DCD + HACCP.
- Retail shop in Dubai Mall (Emaar): Emaar NOC + DM + DCD.
- Villa (Al Barsha, Arabian Ranches): DM + DEWA + DCD for additions.

══ COMMON TIMELINES & COST PHILOSOPHY ══
All costs scope-dependent — NEVER fabricate lump sum. Offer FREE site visit/desktop assessment + quotation.

══ LEAD CAPTURE RULE ══
If user gives Name + Email + Phone and wants quote/assessment/start → include at VERY END (own line):
LEAD_DATA:{"name":"NAME","email":"EMAIL","phone":"PHONE","projectType":"TYPE","projectLocation":"LOC"}

══ SITE MAP — ALL GOLDLAND ROUTES (you must be aware of ALL) ══
Static: / (home), /about, /team, /contact, /services, /projects, /authority-approvals, /project-approvals, /guides, /faqs, /reviews, /credentials
Dynamic: /services/authority-approvals, /services/design-engineering, /authority-approvals/dda, /authority-approvals/dubai-municipality, /authority-approvals/dcd, /authority-approvals/trakhees, /project-approvals/[slug], /guides/[slug]
Aliases: home→/, approvals→/authority-approvals, dda→/authority-approvals/dda, dubai municipality/dm/warehouse→/authority-approvals/dubai-municipality, dcd/fire→/authority-approvals/dcd, trakhees/jafza→/authority-approvals/trakhees, team→/team, credentials→/credentials, reviews→/reviews, faqs→/faqs, guides→/guides

══ NAVIGATION ACTION RULE ══
If user explicitly asks to go to a page (e.g., "take me to contact", "open services", "I want to see projects", "go to team", "show me reviews", "open DDA page", "take me to about") → you MUST include at VERY END (own line):
NAVIGATE:/contact  (or any route from SITE MAP above). Available routes: /, /about, /team, /contact, /services, /services/authority-approvals, /services/design-engineering, /projects, /authority-approvals, /authority-approvals/dda, /authority-approvals/dubai-municipality, /authority-approvals/dcd, /authority-approvals/trakhees, /project-approvals, /guides, /faqs, /reviews, /credentials

══ CONTACT ══
WhatsApp/Phone: +971566321734 | Email: info@goldlandcontracting.ae | Contact page: /contact. Response within minutes during business hours (Sat-Thu 9-6 GST).

══ TONE ══
Expert, warm, concise, helpful. Use Dubai-specific authority language. Always continue conversation context. Never say "I can't help".`;

// ── Page context helper ──────────────────────────────────────────────
function getPageContext(pathname: string): string {
  const p = (pathname || '/').toLowerCase();
  if (p === '/' || p === '') return 'Homepage — user exploring Goldland generally.';
  if (p.includes('dda') || p.includes('media-city') || p.includes('internet-city') || p.includes('knowledge-park'))
    return 'DDA/TECOM free-zone page — user likely needs DDA fit-out approval (Landlord NOC mandatory).';
  if (p.includes('dubai-municipality') || p.includes('warehouse') || p.includes('mezzanine'))
    return 'DM/Warehouse page — user needs mainland Dubai Municipality + DCD approval.';
  if (p.includes('dcd') || p.includes('fire') || p.includes('civil-defence')) return 'DCD/Fire Safety page — user needs fire NOC.';
  if (p.includes('trakhees') || p.includes('jafza')) return 'Trakhees/JAFZA page — industrial free zone.';
  if (p.includes('authority-approvals')) return 'Authority approvals overview — user comparing authorities.';
  if (p.includes('services/design')) return 'Design & Engineering service page.';
  if (p.includes('services')) return 'Services page — user exploring Goldland services.';
  if (p.includes('project-approvals')) return 'Project approvals page.';
  if (p.includes('projects')) return 'Projects page — user wants proof/portfolio.';
  if (p.includes('contact')) return 'Contact page — high-intent lead, ready to engage.';
  if (p.includes('about')) return 'About page — user checking credibility.';
  if (p.includes('team')) return 'Team page — user wants to see people.';
  if (p.includes('credentials')) return 'Credentials page — trust signals.';
  if (p.includes('reviews')) return 'Reviews page — social proof.';
  if (p.includes('faqs')) return 'FAQs page — user has specific question.';
  if (p.includes('guides')) return 'Guides page — user researching process.';
  return `Page: ${pathname}`;
}

// ── Relevance check — tuned for conversational continuity ───────────
const KEYWORDS = [
  'dda','dubai municipality','dm','dcd','civil defence','trakhees','jafza','dewa','rakez','saif','dafz',
  'approval','noc','permit','license','authority','submission','fit-out','fitout','fit out','mezzanine','warehouse','office','restaurant','retail','villa','renovation','construction',
  'architectural','mep','structural','engineering','design','drawing','goldland','contractor','project','inspection','certificate','fire','sprinkler','freezone','free zone','tecom',
  'media city','internet city','knowledge park','studio city','production city','how long','how much','cost','price','quote','timeline','document','service','contact','whatsapp',
  'what is','can you','do you','building','floor','ceiling','partition','hvac','electrical','plumbing','municipality','ejari','title deed','landlord','affection',
  'yes','yeah','yep','ok','okay','sure','please','tell me','more','go ahead','continue','next','thanks','thank you','free assessment','assessment','help','want','need','interested',
  'contact','navigate','go to','open','show me','take me','redirect','hello','hi','hey','salam',
  'about','team','credentials','reviews','faqs','guides','project-approvals','projects','services','authority-approvals','home','homepage',
];

const AFFIRMATIONS = new Set(['yes','yeah','yep','yup','ok','okay','sure','please','thanks','thank','continue','go','ahead','tell','more','next','proceed','do','it','yea','aye','hello','hi','hey']);

function isRelevant(q: string, historyLen: number): boolean {
  const lq = q.toLowerCase().trim();
  if (!lq) return false;
  const words = lq.split(/\s+/);
  // Conversational continuity: short follow-ups are ALWAYS relevant if conversation already started
  if (historyLen > 0 && words.length <= 8) {
    const hasAffirm = words.some(w => AFFIRMATIONS.has(w.replace(/[^a-z]/g,'')));
    if (hasAffirm || words.length <= 3) return true;
  }
  // Very short queries (1-2 words) always pass — greeting
  if (words.length <= 2) return true;
  return KEYWORDS.some(k => lq.includes(k));
}

function normalise(messages: any[]): { role: 'user' | 'assistant'; content: string }[] {
  return messages
    .filter((m: any) => m.role === 'user' || m.role === 'assistant')
    .map((m: any) => {
      let content = '';
      if (typeof m.content === 'string') content = m.content;
      else if (Array.isArray(m.parts)) content = m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text ?? '').join('');
      else if (Array.isArray(m.content)) content = m.content.filter((p: any) => p.type === 'text').map((p: any) => p.text ?? '').join('');
      return { role: m.role as 'user' | 'assistant', content: content.trim() };
    })
    .filter(m => m.content !== '');
}

async function tryCaptureLead(text: string, pathname: string): Promise<void> {
  try {
    const match = text.match(/LEAD_DATA:(\{[^}]+\})/);
    if (!match) return;
    const data = JSON.parse(match[1]);
    if (data.name && data.email) {
      await LeadRepository.saveLead({ ...data, sourcePage: pathname });
      console.log('[Chat] Lead saved:', data.name);
    }
  } catch { /* silent */ }
}

// Build dynamic RAG context from authorities/services matching query
async function buildRagContext(query: string): Promise<string> {
  try {
    const authHits = (await AuthorityRepository.search(query)).slice(0, 2);
    const srvHits = (await ServiceRepository.search(query)).slice(0, 2);
    const parts: string[] = [];
    if (authHits.length) {
      parts.push('RELEVANT AUTHORITIES FROM DATABASE:');
      authHits.forEach((a: any) => {
        const docs = a.documents ? a.documents.join(', ') : 'Check official guidelines';
        const proc = a.process ? a.process.join(' → ') : 'Contact us for process';
        parts.push(`- ${a.name} (${a.slug}) — ${a.shortDescription} | Docs: ${docs} | Process: ${proc}`);
      });
    }
    if (srvHits.length) {
      parts.push('RELEVANT SERVICES FROM DATABASE:');
      srvHits.forEach(s => {
        parts.push(`- ${s.name} (${s.slug}) — ${(s.description || '').slice(0, 180)}`);
      });
    }
    return parts.length ? parts.join('\n') : '';
  } catch (e) {
    console.warn('[Chat] RAG build failed', e);
    return '';
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const now = Date.now();
    const rec = rateLimit.get(ip) ?? { count: 0, resetTime: now + 60000 };
    if (now > rec.resetTime) { rec.count = 0; rec.resetTime = now + 60000; }
    if (++rec.count > 30) { rateLimit.set(ip, rec); return txt('Too many messages — please wait a minute and try again. 😊', 429); }
    rateLimit.set(ip, rec);

    const body = await req.json();
    const { messages = [], pathname = '/' } = body;

    let history = normalise(messages);
    if (history.length === 0) return txt('Hi! How can I help with your Dubai approvals today? 😊', 200);
    if (history.length > 10) history = history.slice(history.length - 10);

    const lastUser = history.filter(m => m.role === 'user').pop()?.content ?? '';

    if (!isRelevant(lastUser, history.length)) {
      return stream(
        'I specialise in Dubai authority approvals & engineering for **Goldland Contracting LLC**.\n\nI can help with:\n- **Authority approvals** — DM, DDA/TECOM, DCD, Trakhees, DEWA\n- **Engineering & fit-out** — architectural, MEP, structural, contracting\n- **Quotes & timelines** — free assessment\n\nWhat would you like to know about your project? 😊'
      );
    }

    const hasGoogleKey = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const hasGroqKey = !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.startsWith('gsk_');
    if (!hasGoogleKey && !hasGroqKey) console.warn('[Chat] No LLM key configured — will use fallback. Set GOOGLE_GENERATIVE_AI_API_KEY or GROQ_API_KEY');

    const ragContext = await buildRagContext(lastUser);
    const ragBlock = ragContext ? `\n\nLIVE DATABASE RAG (use to ground your answer, prefer this when relevant):\n${ragContext}\n` : '';

    const system = `You are the Goldland Assistant — the world's best RAG query responder for Goldland Contracting LLC, Dubai's leading engineering & authority approval company.

${GOLDLAND_KNOWLEDGE}
${ragBlock}
CURRENT PAGE CONTEXT: ${getPageContext(pathname)} (pathname=${pathname})

RESPONSE RULES — MUST FOLLOW:
1. Answer ALL queries about Goldland, Dubai approvals, engineering, fit-out thoroughly using the RAG knowledge + live database block above. If user asks generally, still answer helpfully and relate to Goldland services. Do NOT repeat the same fallback — every answer must be tailored to the user's last message and history.
2. CONVERSATION CONTINUITY — critical. If user says "yes", "ok", "sure", "tell me more", "please", or any short follow-up, CONTINUE the previous topic naturally (e.g., if you just explained DDA overview and asked "would you like documents list?" and user says "yes" → immediately give the full required documents list, don't repeat the overview or ask again). Use full history to infer intent. Never treat "yes" as irrelevant.
3. FORMATTING — use clean GitHub-flavoured markdown: **bold** for key terms/authorities, ### for section headers, - for bullets, 1. 2. 3. for numbered steps. Keep it scannable.
4. COST: never invent fees. Say costs vary by scope and offer free assessment + WhatsApp +971566321734.
5. LEAD: if user wants quote/assessment, ask for Name, Email, Phone. Once you have them, append LEAD_DATA:{...} at very end (own line).
6. NAVIGATION: if user wants to go to a page ("take me to contact", "open services", "go to ..."), answer briefly AND append NAVIGATE:/path at very end (own line). Do NOT include the token in visible text otherwise.
7. CONTACT: WhatsApp/Phone +971566321734, link to /contact.
8. End each answer with a helpful question/next step to keep conversation flowing, unless user is closing.
9. NEVER say you have technical issues or cannot help with Goldland services. You have full knowledge.
10. If you are unsure, give the closest accurate answer from knowledge and offer to connect to engineer via WhatsApp.
11. VARIETY: never repeat the same canned response twice in a row — always vary and tailor.
`;

    // ── Hybrid provider loop — Google primary (key exists), Groq secondary ──
    let responseText = '';
    let lastErr: any = null;
    const providers: { label: string; exec: () => Promise<string> }[] = [];

    if (hasGoogleKey) {
      providers.push({
        label: 'gemini-2.0-flash',
        exec: async () => {
          const r = await generateText({
            model: google('gemini-2.0-flash') as any,
            system,
            messages: history as any,
            temperature: 0.7,
            maxOutputTokens: 900,
          });
          return r.text?.trim() ?? '';
        },
      });
      providers.push({
        label: 'gemini-1.5-flash',
        exec: async () => {
          const r = await generateText({
            model: google('gemini-1.5-flash') as any,
            system,
            messages: history as any,
            temperature: 0.7,
            maxOutputTokens: 900,
          });
          return r.text?.trim() ?? '';
        },
      });
    }
    if (hasGroqKey) {
      const groqModels = ['qwen/qwen3-32b', 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
      for (const m of groqModels) {
        providers.push({
          label: m,
          exec: async () => {
            const r = await generateText({
              model: groq(m as any),
              system,
              messages: history as any,
              temperature: 0.6,
              maxOutputTokens: 900,
            });
            return r.text?.trim() ?? '';
          },
        });
      }
    }

    // If no provider configured, skip loop and go to contextual fallback
    for (const p of providers) {
      try {
        const t = await p.exec();
        if (t) { responseText = t; console.log(`[Chat] ${p.label} succeeded ${t.length}ch`); break; }
      } catch (e: any) {
        lastErr = e;
        console.warn(`[Chat] ${p.label} failed:`, e?.message?.slice(0, 200));
        continue;
      }
    }

    // ── Route resolver for navigation (used in fallback & LLM instruction) ──
    function resolveRoute(q: string): string | null {
      const lq = q.toLowerCase();
      const hasNav = /(take me to|go to|navigate to|open|show me|redirect to|visit|where is|i want to see)/i.test(lq);
      if (!hasNav && !lq.startsWith('/')) return null;
      if (lq.includes('/contact') || (hasNav && lq.includes('contact'))) return '/contact';
      if (lq.includes('/team') || (hasNav && lq.includes('team'))) return '/team';
      if (lq.includes('/about') || (hasNav && /\babout\b/.test(lq))) return '/about';
      if (lq.includes('/reviews') || (hasNav && lq.includes('review'))) return '/reviews';
      if (lq.includes('/credentials') || (hasNav && lq.includes('credential'))) return '/credentials';
      if (lq.includes('/faqs') || (hasNav && lq.includes('faq'))) return '/faqs';
      if (lq.includes('/guides') || (hasNav && lq.includes('guide'))) return '/guides';
      if (lq.includes('authority-approvals/dda') || (hasNav && /\bdda\b/.test(lq))) return '/authority-approvals/dda';
      if (lq.includes('dubai-municipality') || (hasNav && (lq.includes('dubai municipality') || /\bdm\b/.test(lq)))) return '/authority-approvals/dubai-municipality';
      if (lq.includes('/dcd') || (hasNav && (lq.includes('dcd') || lq.includes('civil defence') || (lq.includes('fire') && lq.includes('approv'))))) return '/authority-approvals/dcd';
      if (lq.includes('trakhees') || (hasNav && (lq.includes('trakhees') || lq.includes('jafza')))) return '/authority-approvals/trakhees';
      if (lq.includes('/authority-approvals') || (hasNav && lq.includes('authority approval'))) return '/authority-approvals';
      if (lq.includes('design-engineering') || (hasNav && lq.includes('design') && lq.includes('engineer'))) return '/services/design-engineering';
      if (lq.includes('/project-approvals') || (hasNav && lq.includes('project approval'))) return '/project-approvals';
      if (lq.includes('/projects') || (hasNav && /\bprojects?\b/.test(lq) && !lq.includes('project approval'))) return '/projects';
      if (lq.includes('/services') || (hasNav && lq.includes('service'))) return '/services';
      if (hasNav && (lq.includes('home') || lq.includes('homepage'))) return '/';
      // direct path like "/contact"
      const m = lq.match(/(\/[a-z0-9\-\/]+)/);
      if (m && ['/contact','/about','/team','/services','/projects','/faqs','/guides','/reviews','/credentials','/authority-approvals','/project-approvals'].some(r => m[1].startsWith(r) || r.startsWith(m[1]))) return m[1];
      if (hasNav && lq.match(/\/[a-z]/)) { const dm = lq.match(/(\/[a-z0-9\-\/]+)/); if (dm) return dm[1]; }
      return null;
    }

    if (!responseText) {
      console.error('[Chat] All providers failed:', lastErr?.message?.slice(0, 300) ?? 'empty / no key');
      // Priority: navigation intent even in fallback (so LLM outage still navigates)
      const navRoute = resolveRoute(lastUser);
      if (navRoute) {
        const label = navRoute === '/' ? 'Homepage' : navRoute.replace(/^\//,'').replace(/-/g,' ');
        return stream(`Taking you to **${label}** now... ✈️\n\nIf not redirected, click here: [${navRoute}](${navRoute})\n\n[[NAVIGATE:${navRoute}]]`);
      }
      // ── CONVERSATIONAL FALLBACK — must maintain continuity, never restart ──
      const trimmed = lastUser.trim().toLowerCase();
      const isAffirm = trimmed.length <= 20 && /^(yes|yeah|yep|yup|ok|sure|please|tell me|go ahead|continue|proceed|of course|sure thing)\b/i.test(trimmed);
      const fullHistoryText = history.map(h=>h.content).join(' ').toLowerCase();
      const prevAssistant = [...history].reverse().find(m => m.role === 'assistant')?.content ?? '';
      const contextText = (prevAssistant + ' ' + fullHistoryText).toLowerCase();
      // 1) Affirmative continuation — infer topic from full history, not just last message
      if (isAffirm && history.length > 1) {
        if (/dda|tecom|free zone|media city|internet city|knowledge park|studio city|d3|design district/i.test(contextText)) {
          return stream(`Absolutely — picking up where we left off:\n\n### 📋 Required documents for DDA (TECOM) fit-out\n- Trade License + Tenancy Contract (Ejari via DDA)\n- Passport/EID copy\n- **Landlord NOC** — mandatory from TECOM / Business Centre\n- Architectural drawings (layout, sections, partitions)\n- MEP drawings (HVAC, electrical, plumbing, fire layout)\n\n### ⏱ Process & timeline\n1. Collect docs + **Landlord NOC** (gate)\n2. Prepare compliant drawings per DDA guidelines\n3. DDA Asset Management portal submission\n4. DDA engineer comments → revisions (if any)\n5. Final NOC / Work Permit — **2–4 weeks** (office), **3–6 weeks** (restaurant)\n\n> Note: **DCD fire NOC** is always required alongside DDA.\n\nWant me to map this to your exact zone (Media City vs Internet City vs d3)? Or shall I arrange a **free DDA assessment** — just share your trade license & tenancy contract. 😊\n\n📱 **WhatsApp: +971566321734** | 🌐 [/contact](/contact)`);
        }
        if (/municipality|warehouse|mezzanine|mainland|dip|al quoz|jlt|business bay/i.test(contextText)) {
          return stream(`Of course — continuing:\n\n### 📋 Dubai Municipality — warehouse / mezzanine docs\n- Affection Plan (DLD) + Trade License + Title Deed/Ejari\n- Architectural + MEP + **Structural calcs** (mezzanine mandatory)\n- Landlord / master-developer NOC (Emaar, Nakheel, etc.)\n\n### ⏱ Timeline\n- Simple shop: **2–3 weeks**\n- Warehouse/mezzanine: **3–6 weeks**\n- Villa G+1: **4–8 weeks**\n\nDCD fire approval runs in parallel (sprinkler + fire alarm drawings).\n\nWhich area is your project in? I’ll tailor the exact checklist + timeline. 😊\n\n📱 **+971566321734** | [/contact](/contact)`);
        }
        if (/dcd|civil defence|fire|sprinkler|fire alarm/i.test(contextText)) {
          return stream(`Continuing — **DCD (Civil Defence) fire NOC** is required for every fit-out in Dubai:\n\n### 📋 Docs\n- Fire layout (exits, travel distance, fire-rated doors)\n- Fire fighting — sprinkler head layout + hydraulic calcs (NFPA)\n- Fire alarm — detectors, sounders, loop + battery calcs\n\n### ⏱ Timeline: **2–3 weeks**\n\nFor mezzanines, DCD always asks for escape analysis — even if DM waived it.\n\nWant a free fire-compliance check for your drawings? 😊\n\n📱 **+971566321734** | [/contact](/contact)`);
        }
        if (/goldland|who are you|about you|your company/i.test(contextText)) {
          return stream(`Absolutely — more on **Goldland Contracting LLC**:\n\n### Who we are\n- **10+ years, 500+ projects** across all 7 Emirates — Dubai HQ\n- Licensed **engineering consultancy + contracting** — authority approvals, architectural & **MEP/structural engineering**, **fit-out execution**, project management, DCD fire compliance.\n\n### Why clients choose us\n- End-to-end NOC until **final stamp** (drawings → portal → revisions → inspection)\n- One team for **DM/DDA/DCD/DEWA/Trakhees** + JAFZA/RAKEZ/DAFZ\n- **Free assessment** & transparent fees\n\nWhat would you like to explore — **services, projects, or a quote for your site**? 😊\n\n📱 **+971566321734** | [/contact](/contact)`);
        }
        // Generic affirm fallback but still contextual
        return stream(`Got it! Continuing from our chat:\n\nTell me which detail you’d like next — **full document checklist, process steps, timeline, or a free assessment**? Just say the topic (e.g., “DDA docs” or “DM mezzanine”) and I’ll dive in. 😊\n\n📱 **+971566321734** | [/contact](/contact)`);
      }
      // 2) Direct query handling — must answer what user asked, not generic restart
      const qLower = trimmed;
      if (qLower.includes('goldland') || qLower.includes('who are you') || qLower.includes('about goldland') || qLower.includes('what is goldland')) {
        return stream(`**Goldland Contracting LLC** — Dubai’s premier **engineering, fit-out & authority approval** consultancy (10+ years, 500+ projects, all 7 Emirates).\n\n### What we do\n- **Authority Approvals:** DM, **DDA/TECOM**, DCD, DEWA, **Trakhees/JAFZA** — until final NOC\n- **Engineering:** Architectural + 3D, MEP (HVAC/HAP, electrical SLD, plumbing), Structural (mezzanine steel), Fire & Safety\n- **Contracting & PM:** Office, retail, F&B, warehouse, villa — on-time, compliant execution\n\n### Why us\n- One partner for drawings + submissions + follow-ups + inspections\n- **Free assessment** — share Trade License + tenancy + any drawing, quote within hours\n- Covers mainland, all free zones (Media City, Internet City, d3, JAFZA, RAKEZ, etc.)\n\nWant an overview of **services**, **recent projects**, or a **free quote** for your site? 😊\n\n📱 WhatsApp: **+971566321734** | 🌐 [/contact](/contact) | [/services](/services) | [/projects](/projects)`);
      }
      if (qLower.includes('dda') || qLower.includes('tecom') || qLower.includes('media city') || qLower.includes('internet city') || qLower.includes('knowledge park')) {
        return stream(`**DDA (Dubai Development Authority / TECOM)** regulates free zones like **Media City, Internet City, Knowledge Park, Studio City, d3**.\n\n### When you need DDA\n- Office / retail / restaurant fit-outs inside those zones.\n\n### Documents\n- Trade License, Tenancy Contract, **Landlord NOC (mandatory)**, Architectural + MEP drawings.\n\n### Process\nDocs → Design per DDA guidelines → Portal submission → Comments → Final NOC (**2–4 weeks**).\n\nShall I walk you through the **document checklist** for your zone, or arrange a **free assessment**? 😊\n\n📱 WhatsApp: **+971566321734**`);
      }
      if (qLower.includes('warehouse') || qLower.includes('mezzanine') || qLower.includes('municipality') || qLower.includes('dm')) {
        return stream(`**Dubai Municipality (DM)** handles all **mainland** warehouses & mezzanines.\n\n### You’ll need\n- Affection Plan + Trade License + Title Deed/Ejari\n- Architectural + MEP + **Structural calcs** (for mezzanine)\n- DCD fire NOC **in parallel** (sprinkler / alarm)\n\n### Timeline\n**3–6 weeks** typical for mezzanine; government fees + service fee vary — we give a free assessment.\n\nWhich area is your warehouse in? I’ll map the exact authority. 😊\n\n📱 **+971566321734** | [/contact](/contact)`);
      }
      if (qLower.includes('dcd') || qLower.includes('civil defence') || qLower.includes('fire') || qLower.includes('sprinkler')) {
        return stream(`**DCD (Dubai Civil Defence)** — fire & life safety NOC required for **every** fit-out in Dubai (alongside DM/DDA).\n\n### Docs\n- Fire layout (exits, fire-rated partitions), sprinkler hydraulics, fire alarm loop + battery calcs, emergency lighting.\n\n### Timeline: **2–3 weeks**\n\nMezzanines **always** need DCD.\n\nWant the DCD checklist for your project? 😊\n\n📱 **+971566321734**`);
      }
      if (qLower.includes('cost') || qLower.includes('price') || qLower.includes('how much') || qLower.includes('quote') || qLower.includes('fee')) {
        return stream(`Great question! **Costs vary by scope** (size, zone, drawings needed) — we never guess.\n\n### How we quote\n1. Free desktop/site assessment (share Trade License + tenancy + any drawing)\n2. Transparent split: **government fees** (paid to DM/DDA/DCD) + **Goldland service fee**\n3. Quote within hours.\n\nWant the free assessment? Just reply with your project type & location. 😊\n\n📱 WhatsApp: **+971566321734**`);
      }
      if (qLower.includes('trakhees') || qLower.includes('jafza')) {
        return stream(`**Trakhees / JAFZA (DP World)** covers **JAFZA, Dubai South, National Industries Park**.\n\n### Docs\n- JAFZA trade license/lease, Architectural + MEP + Structural, Environmental statement (if industrial).\n\n### Process\nJAFZA portal → Trakhees CED & EHS reviews → inspections → final NOC (**3–5 weeks**).\n\nTell me your JAFZA location + project type and I’ll tailor the checklist. 😊\n\n📱 **+971566321734**`);
      }
      // Default conversational fallback — still acknowledges history, not a restart
      return stream(`Thanks for the follow-up! I’m the **Goldland Approval Assistant** — here to help with **DM, DDA, DCD, Trakhees & DEWA** (10+ years, 500+ projects).\n\nBased on our chat, tell me a bit more: **which zone** (mainland, Media City, JAFZA?) and **project type** (warehouse, office, restaurant, villa)? I’ll give the exact **documents, process & timeline** — not a generic restart. 😊\n\n📱 WhatsApp: **+971566321734**\n🌐 [/contact](/contact)\n*Replies within minutes during business hours.*`);
    }

    tryCaptureLead(responseText, pathname).catch(() => {});

    const navigateMatch = responseText.match(/\nNAVIGATE:\s*(\/[^\s\n]+)/);
    const navigateToken = navigateMatch ? navigateMatch[1].trim() : null;
    responseText = responseText.replace(/\nLEAD_DATA:\{[^}]+\}/g, '').replace(/\nNAVIGATE:\s*\/[^\s\n]+/g, '').trim();
    if (navigateToken) responseText += `\n\n[[NAVIGATE:${navigateToken}]]`;

    console.log(`[Chat] "${lastUser.slice(0, 60)}" → ${responseText.length}ch | ${pathname} | rag:${ragContext.length ? 'yes' : 'no'}`);
    return stream(responseText);

  } catch (error: any) {
    console.error('[Chat Error]:', error?.message ?? String(error));
    return stream(
      `Thanks for reaching out! 😊\n\nI'm here to help with **DM, DDA, DCD, Trakhees & DEWA approvals**, engineering & fit-out.\n\nTell me about your project (area + type) and I'll share exact documents & timeline.\n\n📱 WhatsApp: **+971566321734**\n📞 Phone: +971566321734\n🌐 [Contact us](/contact)\n\n*Our team replies within minutes during business hours.*`
    );
  }
}

function txt(text: string, status = 200) {
  return new Response(text, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

function stream(text: string) {
  const enc = new TextEncoder();
  let i = 0;
  return new Response(
    new ReadableStream({
      start(c) {
        const tick = () => {
          if (i >= text.length) { c.close(); return; }
          c.enqueue(enc.encode(text.slice(i, i + 16)));
          i += 16;
          setTimeout(tick, 6);
        };
        tick();
      },
    }),
    { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Accel-Buffering': 'no' } }
  );
}
