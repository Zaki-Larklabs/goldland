"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  MessageSquare,
  ShieldCheck,
  Send,
  Phone,
  Headset,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useDragControls } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

// ── ENHANCED MARKDOWN RENDERER ────────────────────────────────────────────
function renderMarkdown(raw: string): string {
  if (!raw) return "";
  raw = raw.replace(/\[\[NAVIGATE:[^\]]+\]\]/g, "").trim();
  if (!raw) return "";
  let s = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  s = s.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_m, _lang, code) => {
    const esc = (code as string).trim();
    return `<pre class="md-pre"><code>${esc}</code></pre>`;
  });
  s = s.replace(/^&gt;\s?(.+)$/gm, '<blockquote class="bl">$1</blockquote>');
  s = s.replace(/^### (.+)$/gm, '<h4 class="md-h4">$1</h4>');
  s = s.replace(/^## (.+)$/gm, '<h3 class="md-h3">$1</h3>');
  s = s.replace(/^# (.+)$/gm, '<h2 class="md-h2">$1</h2>');
  s = s.replace(/^---+$/gm, '<hr class="md-hr" />');
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(?<!\w)\*(.+?)\*(?!\w)/g, "<em>$1</em>");
  s = s.replace(/`([^`]+)`/g, '<code class="md-code">$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/^\d+\.\s+(.+)$/gm, '<li class="md-oli">$1</li>');
  s = s.replace(/^[-*]\s+(.+)$/gm, '<li class="md-uli"><span class="md-bullet">▸</span><span>$1</span></li>');
  s = s.replace(/(?:<li class="md-oli">.*?<\/li>\s*\n?)+/g, (m) => `<ol class="md-ol">${m}</ol>`);
  s = s.replace(/(?:<li class="md-uli">.*?<\/li>\s*\n?)+/g, (m) => `<ul class="md-ul">${m}</ul>`);
  const blocks = s.split(/\n{2,}/);
  const htmlBlocks = blocks.map((b) => {
    const t = b.trim();
    if (!t) return "";
    if (/^<(h[2-4]|ul|ol|blockquote|pre|hr)/.test(t)) return t;
    return `<p>${t.replace(/\n/g, "<br/>")}</p>`;
  });
  return `<div class="md-root">${htmlBlocks.join("")}</div>`;
}

function extractNavigate(content: string): string | null {
  const m = content.match(/\[\[NAVIGATE:([^\]]+)\]\]/);
  return m ? m[1].trim() : null;
}

const INIT: ChatMessage = {
  id: "init",
  role: "assistant",
  content:
    "Hi! I'm **AIRA**, Goldland's AI Assistant 🚀\n\nI'm your expert guide for:\n- **Dubai Authority Approvals** (DM, DDA, DCD, Trakhees, DEWA, JAFZA)\n- **Engineering & MEP Services**\n- **Fit-Out & Project Management**\n- **Free Project Assessments**\n\nAsk me anything about approvals, timelines, or requirements!",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dragControls = useDragControls();

  const [messages, setMessages] = useState<ChatMessage[]>([INIT]);
  const [myInput, setMyInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showContactTooltip, setShowContactTooltip] = useState(false);

  // ── INDEPENDENT FLOATABLE POSITIONS (do not move together) ─────────────
  // Default positions are set immediately so FABs are visible on first render
  const defaultChatPos = () => typeof window !== "undefined"
    ? { x: window.innerWidth - 72 - 16, y: window.innerHeight - 72 - 16 }
    : { x: 9999, y: 9999 }; // will be corrected on mount

  const defaultContactPos = () => typeof window !== "undefined"
    ? { x: window.innerWidth - 72 - 16, y: window.innerHeight - 72 - 84 }
    : { x: 9999, y: 9999 };

  const [chatPos, setChatPos] = useState<{ x: number; y: number }>(() => defaultChatPos());
  const [contactPos, setContactPos] = useState<{ x: number; y: number }>(() => defaultContactPos());
  const [posReady, setPosReady] = useState(false);
  const chatDrag = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: false });
  const contactDrag = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: false });

  const clamp = useCallback((x: number, y: number, h: number) => {
    const pad = 16;
    const w = 56;
    const maxX = (typeof window !== "undefined" ? window.innerWidth : 1920) - w - pad;
    const maxY = (typeof window !== "undefined" ? window.innerHeight : 1080) - h - pad;
    return { x: Math.max(pad, Math.min(maxX, x)), y: Math.max(pad, Math.min(maxY, y)) };
  }, []);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const savedChat = localStorage.getItem("goldland_chat_pos");
    const savedContact = localStorage.getItem("goldland_contact_pos");

    const defaultChat = { x: vw - 72 - 16, y: vh - 72 - 16 };
    const defaultContact = { x: vw - 72 - 16, y: vh - 72 - 84 };

    if (savedChat) {
      try {
        const p = JSON.parse(savedChat);
        if (typeof p.x === "number" && typeof p.y === "number") setChatPos(clamp(p.x, p.y, 56));
        else setChatPos(clamp(defaultChat.x, defaultChat.y, 56));
      } catch { setChatPos(clamp(defaultChat.x, defaultChat.y, 56)); }
    } else {
      setChatPos(clamp(defaultChat.x, defaultChat.y, 56));
    }

    if (savedContact) {
      try {
        const p = JSON.parse(savedContact);
        if (typeof p.x === "number" && typeof p.y === "number") setContactPos(clamp(p.x, p.y, 140));
        else setContactPos(clamp(defaultContact.x, defaultContact.y, 140));
      } catch { setContactPos(clamp(defaultContact.x, defaultContact.y, 140)); }
    } else {
      setContactPos(clamp(defaultContact.x, defaultContact.y, 140));
    }

    setPosReady(true);
    
    // Show tooltip shortly after mount
    const timer = setTimeout(() => setShowTooltip(true), 1500);
    
    // Aggressively pop out the AIRA tooltip every 5 seconds
    const intervalId = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 5000);
    
    setTimeout(() => setShowContactTooltip(true), 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [clamp]);



  useEffect(() => { if (posReady) localStorage.setItem("goldland_chat_pos", JSON.stringify(chatPos)); }, [chatPos, posReady]);
  useEffect(() => { if (posReady) localStorage.setItem("goldland_contact_pos", JSON.stringify(contactPos)); }, [contactPos, posReady]);

  const onChatPointerDown = useCallback((e: React.PointerEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    
    chatDrag.current = { dragging: true, startX: clientX, startY: clientY, origX: chatPos.x, origY: chatPos.y, moved: false };
    
    const onMove = (ev: PointerEvent) => {
      if (!chatDrag.current.dragging) return;
      const dx = ev.clientX - chatDrag.current.startX;
      const dy = ev.clientY - chatDrag.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        chatDrag.current.moved = true;
      }
      setChatPos(clamp(chatDrag.current.origX + dx, chatDrag.current.origY + dy, 56));
    };
    const onUp = (ev: PointerEvent) => {
      chatDrag.current.dragging = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      setTimeout(() => (chatDrag.current.moved = false), 180);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }, [chatPos, clamp]);

  const onContactPointerDown = useCallback((e: React.PointerEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    
    contactDrag.current = { dragging: true, startX: clientX, startY: clientY, origX: contactPos.x, origY: contactPos.y, moved: false };
    
    const onMove = (ev: PointerEvent) => {
      if (!contactDrag.current.dragging) return;
      const dx = ev.clientX - contactDrag.current.startX;
      const dy = ev.clientY - contactDrag.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        contactDrag.current.moved = true;
      }
      setContactPos(clamp(contactDrag.current.origX + dx, contactDrag.current.origY + dy, 140));
    };
    const onUp = (ev: PointerEvent) => {
      contactDrag.current.dragging = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      setTimeout(() => (contactDrag.current.moved = false), 180);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }, [contactPos, clamp]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scroll = (force = false) => {
    if (messages.length <= 1) return; // Do not auto-scroll the initial greeting so the user can read from the top
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: force ? "auto" : "smooth" }), 50);
  };

  useEffect(() => { if (isOpen) { setTimeout(() => inputRef.current?.focus(), 150); scroll(true); } }, [isOpen]);
  useEffect(() => { scroll(); }, [messages]);

  const getSuggestions = () => {
    const p = (pathname || "/").toLowerCase();
    if (p.includes("dda") || p.includes("media-city") || p.includes("internet-city"))
      return ["DDA documents required?", "DDA approval timeline?", "Get a free DDA assessment"];
    if (p.includes("dubai-municipality") || p.includes("warehouse"))
      return ["DM warehouse approval?", "Do I need DCD for a mezzanine?", "Get a free assessment"];
    if (p.includes("dcd") || p.includes("fire")) return ["DCD fire safety process?", "Sprinkler NOC requirements?", "Take me to /contact"];
    if (p.includes("services")) return ["What services do you offer?", "MEP engineering?", "Fit-out contracting?"];
    return ["What is DDA approval?", "I need a mezzanine permit", "Warehouse approval process", "Get a free quote"];
  };

  const handleNavigate = useCallback((path: string) => {
    try {
      if (!path.startsWith("/")) return;
      setTimeout(() => { router.push(path); setIsOpen(false); }, 900);
    } catch {}
  }, [router]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const navIntent = text.toLowerCase().match(/(?:go to|take me to|open|navigate to|show me|redirect to|visit|where is)\s+(\/[a-z0-9\-\/]*|contact|about|team|services|projects|authority approvals?|project approvals?|guides?|faqs?|reviews?|credentials?|home|homepage|dda|dcd|trakhees|jafza|dubai municipality|dm|design engineering)/i);
    setChatError(null);
    setIsLoading(true);
    const userMsg: ChatMessage = { id: `u_${Date.now()}`, role: "user", content: text };
    const aId = `a_${Date.now() + 1}`;
    const history = [...messages.filter((m) => m.id !== "init"), userMsg];
    setMessages((prev) => [...prev, userMsg, { id: aId, role: "assistant", content: "", streaming: true }]);
    scroll();
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({ messages: history.map((m) => ({ role: m.role, content: m.content })), pathname, sessionContext: {} }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => (m.id === aId ? { ...m, content: acc } : m)));
        if (acc.length % 48 < 16) scroll();
      }
      setMessages((prev) => prev.map((m) => (m.id === aId ? { ...m, streaming: false } : m)));
      scroll();
      const navPath = extractNavigate(acc);
      if (navPath) handleNavigate(navPath);
      else if (navIntent) {
        const hint = navIntent[1].toLowerCase().trim();
        const map: Record<string, string> = {
          contact: "/contact", about: "/about", team: "/team", services: "/services",
          "design engineering": "/services/design-engineering", "design-engineering": "/services/design-engineering",
          projects: "/projects", "project approvals": "/project-approvals", "project-approvals": "/project-approvals",
          "authority approvals": "/authority-approvals", "authority-approvals": "/authority-approvals",
          guides: "/guides", guide: "/guides", faqs: "/faqs", faq: "/faqs", reviews: "/reviews", review: "/reviews",
          credentials: "/credentials", credential: "/credentials", home: "/", homepage: "/",
          dda: "/authority-approvals/dda", "dubai municipality": "/authority-approvals/dubai-municipality", dm: "/authority-approvals/dubai-municipality",
          dcd: "/authority-approvals/dcd", trakhees: "/authority-approvals/trakhees", jafza: "/authority-approvals/trakhees",
        };
        // Try direct path first
        let target: string | undefined;
        if (hint.startsWith("/")) target = hint;
        else target = map[hint] ?? Object.entries(map).find(([k]) => hint.includes(k))?.[1];
        if (!target && hint.includes("dda")) target = "/authority-approvals/dda";
        if (!target && (hint.includes("dubai municipality") || hint.includes(" dm "))) target = "/authority-approvals/dubai-municipality";
        if (target) {
          setMessages((prev) => prev.map((m) => (m.id === aId ? { ...m, content: acc + `\n\n[[NAVIGATE:${target}]]` } : m)));
          handleNavigate(target);
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error("Chat:", err);
      setChatError("Connection hiccup — please try again.");
      setMessages((prev) => prev.filter((m) => m.id !== aId));
    } finally { setIsLoading(false); scroll(); }
  }, [messages, isLoading, pathname, handleNavigate]);

  const handleSend = () => {
    const t = myInput.trim();
    if (!t) return;
    setMyInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    sendMessage(t);
  };

  return (
    <>
      {/* ── INDEPENDENTLY DRAGGABLE: CHAT FAB (gold) ── */}
      <div
        style={{ left: chatPos.x, top: chatPos.y, position: "fixed", opacity: posReady ? 1 : 0 }}
        className="z-[9999] select-none touch-none transition-opacity duration-200"
      >
        <button
          onPointerDown={onChatPointerDown}
          draggable={false}
          onClick={() => { 
            if (chatDrag.current.moved) return; 
            if (!isOpen) trackEvent("chat_open");
            setIsOpen((v) => !v); 
          }}
          className="w-14 h-14 bg-gradient-to-br from-brass to-[#b9973a] hover:from-[#d4b45a] hover:to-brass text-ink rounded-full shadow-[0_0_22px_rgba(201,165,68,0.55),0_8px_24px_rgba(0,0,0,0.22)] hover:scale-[1.04] active:scale-95 transition-all flex items-center justify-center relative group border border-white/20 cursor-grab active:cursor-grabbing"
          aria-label="Toggle Chat"
          title="Click to chat"
        >
          <MessageSquare className={`w-6 h-6 absolute transition-all duration-200 ${isOpen ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0 group-hover:animate-pulse"}`} />
          <X className={`w-6 h-6 absolute transition-all duration-200 ${isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"}`} />
          {!isOpen && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-ink animate-pulse shadow" />}
          {!isOpen && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping opacity-40" />}
        </button>

        {/* ── TOOLTIP ── */}
        {!isOpen && showTooltip && (
          <div 
            className={`absolute top-1/2 -translate-y-1/2 w-max max-w-[280px] bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3c] text-white p-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-[#C9A544]/40 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-500 pointer-events-auto ${
              chatPos.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 1000) 
                ? 'right-full mr-4 slide-in-from-right-4' 
                : 'left-full ml-4 slide-in-from-left-4'
            }`}
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#C9A544] shadow-[0_0_15px_rgba(201,165,68,0.5)] relative overflow-hidden flex-shrink-0">
              <Image src="/images/aira-avatar.jpeg" alt="AIRA" fill className="object-cover" />
            </div>
            <div className="flex flex-col pr-4">
              <span className="font-bold text-[14px] flex items-center gap-1.5 leading-tight drop-shadow-sm" style={{ color: "#ffffff" }}>
                Hi, I'm AIRA! <span className="animate-bounce">👋</span>
              </span>
              <span className="text-[12px] mt-1.5 font-medium leading-tight drop-shadow-sm" style={{ color: "#e2e8f0" }}>If you need any help, just let me know!</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="absolute -top-2 -right-2 p-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full transition-colors shadow-md z-10"
              style={{ color: "#ffffff" }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {/* Pointer triangle */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2a2a3c] rotate-45 border-[#C9A544]/40 ${
              chatPos.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 1000)
                ? '-right-1.5 border-r border-t'
                : '-left-1.5 border-l border-b'
            }`} />
          </div>
        )}
      </div>

      {/* ── INDEPENDENTLY DRAGGABLE: CONTACT STACK (phone/whatsapp/sparkle) ── */}
      <div
        style={{ left: contactPos.x, top: contactPos.y, position: "fixed", opacity: posReady ? 1 : 0 }}
        className="z-[9999] select-none touch-none transition-opacity duration-200"
      >
        <div
          onPointerDown={onContactPointerDown}
          className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing"
          title="Drag contact icons — independent from chat"
        >
          {/* grip hint */}
          <div className="w-6 h-1.5 rounded-full bg-white/20 border border-white/10 mb-0.5 hidden sm:block" />
          <div className="relative flex flex-col items-center gap-3">
            <button
              onClick={() => { if (contactDrag.current.moved) return; setIsContactOpen((v) => !v); }}
              onPointerDown={(e) => e.stopPropagation()}
              draggable={false}
              className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.35)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center relative z-20 border border-white/10"
              aria-label="Contact Options"
            >
              <Headset className={`w-4 h-4 sm:w-5 sm:h-5 absolute transition-all duration-200 ${isContactOpen ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"}`} />
              <X className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-200 ${isContactOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"}`} />
            </button>

            {/* ── CONTACT TOOLTIP (Aggressive) ── */}
            {!isContactOpen && showContactTooltip && (
              <div 
                className={`absolute top-0 w-max max-w-[200px] bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3c] text-white px-4 py-2.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-[#7c3aed]/40 flex items-center gap-3 animate-in fade-in zoom-in-90 slide-in-from-bottom-4 duration-300 pointer-events-auto ${
                  contactPos.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 1000) 
                    ? 'right-full mr-4' 
                    : 'left-full ml-4'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-[13px] flex items-center gap-1.5 leading-tight text-white drop-shadow-sm">
                    Connect with us! <span className="animate-bounce">👋</span>
                  </span>
                  <span className="text-[11px] text-gray-300 font-medium">WhatsApp or Phone</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowContactTooltip(false); }}
                  className="absolute -top-2 -right-2 p-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full transition-colors shadow-sm"
                >
                  <X className="w-3 h-3 text-gray-300" />
                </button>
                {/* Pointer triangle */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2a2a3c] rotate-45 border-[#7c3aed]/40 ${
                  contactPos.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 1000)
                    ? '-right-1.5 border-r border-t'
                    : '-left-1.5 border-l border-b'
                }`} />
              </div>
            )}

            <a href={`https://wa.me/971566321734?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدماتكم. Hello, I am looking for assistance with Goldland's services and approvals.")}`} target="_blank" rel="noopener noreferrer"
              draggable={false}
              onClick={(e) => {
                if (contactDrag.current.moved) { e.preventDefault(); return; }
                trackEvent("whatsapp_click", { source: "floating_stack" });
              }}
              className={`absolute bottom-[54px] w-10 h-10 sm:w-11 sm:h-11 bg-[#25D366] text-white rounded-full shadow-[0_8px_20px_rgba(37,211,102,0.35)] flex items-center justify-center transition-all duration-300 hover:bg-[#20bd5a] ${isContactOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none translate-y-4"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            </a>
            <a href="tel:+971566321734" 
              draggable={false}
              onClick={(e) => {
                if (contactDrag.current.moved) { e.preventDefault(); return; }
                trackEvent("phone_click", { source: "floating_stack" });
              }}
              className={`absolute bottom-[102px] w-10 h-10 sm:w-11 sm:h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all duration-300 delay-75 ${isContactOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none translate-y-8"}`}>
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── CHAT WINDOW — floating on desktop, full screen on mobile ── */}
      {isOpen && (
        <motion.div 
          drag={typeof window !== 'undefined' && window.innerWidth >= 640}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[440px] md:w-[460px] h-[100dvh] sm:h-[min(720px,78vh)] sm:max-h-[82vh] bg-white dark:bg-[#0e0e0e] sm:rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border-0 sm:border border-gray-200 dark:border-white/[0.08] flex flex-col z-[10000] overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          <div 
            onPointerDown={(e) => typeof window !== 'undefined' && window.innerWidth >= 640 && dragControls.start(e)}
            className="px-4 py-3.5 bg-gradient-to-r from-brass via-[#c9a544] to-[#b9973a] flex justify-between items-center shrink-0 relative overflow-hidden sm:cursor-grab sm:active:cursor-grabbing select-none touch-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 relative">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 shadow-inner relative overflow-hidden">
                <Image src="/images/aira-avatar.jpeg" alt="AIRA" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-ink font-heading leading-tight flex items-center gap-1.5 text-[15px]">AIRA <Sparkles className="w-3.5 h-3.5 text-ink/60" /></h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full shadow-sm ${isLoading ? "bg-amber-700 animate-pulse" : "bg-green-600 animate-pulse"}`} />
                  <p className="text-ink/75 text-xs font-medium tracking-wide">{isLoading ? "Retrieving..." : "Online · RAG Ready"}</p>
                </div>
              </div>
            </div>
            <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setIsOpen(false)} className="text-ink/60 hover:text-ink p-2 rounded-full hover:bg-white/20 transition-colors relative" aria-label="Close"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50/80 to-white dark:from-[#0e0e0e] dark:to-[#0d0d0d] scrollbar-thin">
            {messages.map((msg) => {
              const nav = msg.role === "assistant" ? extractNavigate(msg.content) : null;
              const displayContent = msg.role === "assistant" ? msg.content.replace(/\[\[NAVIGATE:[^\]]+\]\]/g, "").trim() : msg.content;
              return (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[88%] items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brass to-[#b9973a] flex items-center justify-center shrink-0 mb-0.5 shadow-sm border border-white/20">
                        <MessageSquare className="w-3.5 h-3.5 text-ink" />
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 text-[13.5px] leading-[1.55] shadow-sm ${msg.role === "user" ? "bg-ink dark:bg-gradient-to-br dark:from-brass dark:to-[#b9973a] text-white dark:text-ink rounded-br-md font-medium" : "bg-white dark:bg-[#1c1c1c] text-[#0f172a] dark:text-[#f8fafc] [&_*]:text-[#0f172a] dark:[&_*]:text-[#f8fafc] border border-gray-100 dark:border-white/[0.08] rounded-bl-md"}`}>
                      {msg.role === "assistant" ? (
                        displayContent ? (
                          <>
                            <div className="md-wrap" dangerouslySetInnerHTML={{ __html: renderMarkdown(displayContent) }} />
                            {/* Citation/Source indicator */}
                            <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-white/[0.05] flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                              <span>Verified from Goldland RAG</span>
                            </div>
                            {nav && <button onClick={() => handleNavigate(nav)} className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-brass/10 dark:bg-white/10 text-brass dark:text-brass-lt rounded-lg text-xs font-semibold hover:bg-brass/20 dark:hover:bg-white/20 transition-all border border-brass/30 dark:border-white/[0.1]">Go to {nav} <ArrowRight className="w-3.5 h-3.5" /></button>}
                          </>
                        ) : (
                          <div className="flex gap-1.5 py-1">{[0,150,300].map((d) => <span key={d} className="w-2 h-2 bg-brass rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}</div>
                        )
                      ) : <span className="whitespace-pre-wrap break-words">{msg.content}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            {chatError && <div className="px-3 py-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />{chatError}</div>}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && !isLoading && (
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
              {getSuggestions().map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} disabled={isLoading} className="whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#1c1c1c] text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-brass hover:text-ink hover:bg-brass/10 dark:hover:text-brass rounded-full transition-all font-medium disabled:opacity-40 shadow-sm">
                  <ChevronRight className="w-3 h-3 opacity-40" />{s}
                </button>
              ))}
            </div>
          )}

          <div className="px-3 pt-2.5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-3 border-t border-gray-100 dark:border-white/[0.06] shrink-0 bg-white/90 dark:bg-[#0e0e0e]/90 backdrop-blur">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea ref={inputRef} value={myInput} rows={1} disabled={isLoading}
                  onChange={(e) => { setMyInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Ask about approvals, timelines, docs…"
                  className="w-full min-h-[46px] max-h-[120px] bg-gray-50 dark:bg-[#1c1c1c] text-ink dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-brass resize-none transition-all placeholder:text-gray-400" />
              </div>
              <button type="button" onClick={handleSend} disabled={isLoading || !myInput.trim()} className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brass to-[#b9973a] hover:from-[#d4b45a] hover:to-brass text-ink rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 self-end" aria-label="Send"><Send className="w-4 h-4" /></button>
            </div>
            <p className="text-center mt-2.5 text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.14em] font-medium flex items-center justify-center gap-1.5"><span className="w-1 h-1 bg-green-600 rounded-full animate-pulse" /> AIRA RAG AI · GOLDLAND POWERED</p>
          </div>
        </motion.div>
      )}


    </>
  );
}
