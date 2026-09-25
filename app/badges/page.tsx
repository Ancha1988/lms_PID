'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { Award, Sparkles, CheckCircle2, Lock, Share2 } from 'lucide-react';

export default function BadgesPage() {
  const { badges, showToast } = useApp();

  const handleShare = (badgeTitle: string) => {
    showToast(`Tautan lencana "${badgeTitle}" disalin ke clipboard!`, 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              SISTEM APRESIASI & PENGHARGAAN
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Lencana Prestasi (Badges)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Koleksi lencana digital kompetensi yang Anda raih selama menyelesaikan misi di PID Learning Lab.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>{badges.filter(b => b.earned).length} dari {badges.length} Terbuka</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((b) => {
            const isEarned = b.earned;

            return (
              <div
                key={b.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isEarned
                    ? 'bg-gradient-to-br from-[#1C2541] to-[#1E3A8A]/40 border-amber-500/50 shadow-xl'
                    : 'bg-[#1C2541]/40 border-slate-800 opacity-60'
                }`}
              >
                {/* Glow effect for earned badges */}
                {isEarned && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                      isEarned 
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/20 ring-4 ring-amber-400/20' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {b.icon}
                    </div>

                    {isEarned ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Diraih</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[11px] font-bold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Terkunci</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 space-y-2">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-amber-400/90">Syarat:</strong> {b.requirement}
                  </div>

                  {isEarned && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-emerald-400 font-mono">
                        Diperoleh: {b.earnedAt || 'Selesai'}
                      </span>
                      <button
                        onClick={() => handleShare(b.title)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Bagikan Lencana"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
