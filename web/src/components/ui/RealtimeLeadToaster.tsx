"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

export function RealtimeLeadToaster() {
  const [lead, setLead] = useState<any | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel('leads-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
          setLead(payload.new);
          // Auto-hide after 8 seconds
          setTimeout(() => setLead(null), 8000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-24 right-4 md:right-8 z-[9999] bg-[#070C1C] border border-[#C9A544]/50 shadow-[0_8px_30px_rgba(201,165,68,0.2)] rounded-xl p-4 w-80 max-w-[90vw] backdrop-blur-md"
        >
          <div className="flex items-start gap-3">
            <div className="bg-[#C9A544]/20 p-2 rounded-full mt-1">
              <Bell className="w-5 h-5 text-[#C9A544] animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">New Lead Alert!</h4>
              <p className="text-gray-300 text-sm font-semibold">{lead.name}</p>
              {lead.projectType && (
                <div className="inline-block px-2 py-1 bg-white/10 rounded text-xs text-gray-300 mt-2">
                  {lead.projectType}
                </div>
              )}
            </div>
            <button onClick={() => setLead(null)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
