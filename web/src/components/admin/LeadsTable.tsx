"use client";

import React, { useState } from "react";
import { X, Search, ChevronDown, Calendar, Eye, Mail, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

export default function LeadsTable({ leads }: { leads: any[] }) {
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  // Helper to determine Project Type badge color
  const getProjectTypeBadge = (type: string | undefined | null) => {
    if (!type) return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    const lower = type.toLowerCase();
    if (lower.includes('mezzanine')) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (lower.includes('office')) return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    if (lower.includes('warehouse')) return "bg-[#C9A544]/10 text-[#C9A544] border-[#C9A544]/20";
    if (lower.includes('restaurant')) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (lower.includes('villa')) return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    if (lower.includes('retail')) return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    if (lower.includes('industrial')) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  // Helper to determine Status badge color
  const getStatusBadge = (status: string | undefined | null) => {
    if (!status || status === 'New') return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (status === 'In Progress') return "bg-[#C9A544]/10 text-[#C9A544] border-[#C9A544]/20";
    if (status === 'Converted') return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === 'Closed') return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-2 pl-4">
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-0 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, email, project type..." 
              className="w-full bg-transparent border-none pl-8 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#0A101C] border border-white/10 rounded-lg px-4 py-2 cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-sm text-gray-300">All Project Types</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-2 bg-[#0A101C] border border-white/10 rounded-lg px-4 py-2 cursor-pointer hover:border-white/20 transition-colors">
              <span className="text-sm text-gray-300">All Statuses</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-2 bg-[#0A101C] border border-white/10 rounded-lg px-4 py-2 cursor-pointer hover:border-white/20 transition-colors">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-300">Select Date Range</span>
            </div>
            <button className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 bg-white/5 rounded-lg border border-white/10 transition-colors">
              Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left border-collapse bg-[#111827]/30 backdrop-blur-sm">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-white/20 bg-white/5 focus:ring-[#C9A544] text-[#C9A544]" /></th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide">Date</th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide">Client Name</th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide">Contact</th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide">Project Type</th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide">Details</th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide">Status</th>
                <th className="p-4 font-semibold text-gray-400 text-xs tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.length === 0 && (
                <tr><td colSpan={8} className="p-8 text-center text-gray-500">No leads found yet.</td></tr>
              )}
              {leads.map(lead => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-white/[0.03] transition-colors group"
                >
                  <td className="p-4 text-center"><input type="checkbox" className="rounded border-white/20 bg-white/5 focus:ring-[#C9A544] text-[#C9A544]" /></td>
                  <td className="p-4 text-sm text-gray-400 font-mono text-[11px]">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 text-sm font-medium text-white">{lead.name}</td>
                  <td className="p-4 text-sm">
                    <div className="text-gray-300 font-medium truncate max-w-[200px]">{lead.email}</div>
                    {lead.phone && <div className="text-gray-500 text-[11px] mt-0.5">{lead.phone}</div>}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide border ${getProjectTypeBadge(lead.projectType)}`}>
                      {lead.projectType || 'General'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 max-w-[250px] truncate" title={lead.projectDetails || ''}>
                    {lead.projectDetails || 'No additional details...'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide border ${getStatusBadge(lead.status)}`}>
                      {lead.status || 'New'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedLead(lead)} className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <a href={`mailto:${lead.email}`} className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <button className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-gray-500">Showing 1 to {leads.length} of {leads.length} leads</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-500 transition-colors cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#C9A544]/10 border border-[#C9A544]/20 text-[#C9A544] font-medium text-xs">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white font-medium text-xs transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer">
              <span className="text-xs text-gray-400">10 / page</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Lead Details */}
      {selectedLead && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
          <div 
            className="bg-[#0A101C] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Lead Details</h3>
                <p className="text-xs text-gray-500 mt-1">Submitted on {new Date(selectedLead.createdAt).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.02] p-5 rounded-xl border border-white/5">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Client Info</h4>
                  <p className="font-semibold text-lg text-white mb-2">{selectedLead.name}</p>
                  <a href={`mailto:${selectedLead.email}`} className="text-[#C9A544] hover:underline block mb-1 text-sm">{selectedLead.email}</a>
                  {selectedLead.phone && <a href={`tel:${selectedLead.phone}`} className="text-gray-400 hover:text-white transition-colors block text-sm">{selectedLead.phone}</a>}
                </div>
                
                <div className="bg-white/[0.02] p-5 rounded-xl border border-white/5">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Project Classification</h4>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-400"><span className="font-semibold text-gray-300 w-20 inline-block">Type:</span> {selectedLead.projectType || 'N/A'}</p>
                    <p className="text-gray-400"><span className="font-semibold text-gray-300 w-20 inline-block">Service:</span> {selectedLead.service || 'N/A'}</p>
                    <p className="text-gray-400"><span className="font-semibold text-gray-300 w-20 inline-block">Authority:</span> {selectedLead.authority || 'N/A'}</p>
                    <p className="text-gray-400"><span className="font-semibold text-gray-300 w-20 inline-block">Location:</span> {selectedLead.projectLocation || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Message / Details</h4>
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                  {selectedLead.projectDetails || "No additional details provided by the client."}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Status:</span>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide border ${getStatusBadge(selectedLead.status)}`}>
                    {selectedLead.status || 'New'}
                  </span>
                </div>
                
                {/* Simulated action buttons */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                    Edit Status
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#F4E4A6] hover:to-[#D4AF37] border border-[#C9A544] text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(201,165,68,0.1)]">
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
