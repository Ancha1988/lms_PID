'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { WORKSHOP_MODULES, WORKSHOP_META } from '@/data/workshopData';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Tv, 
  Cpu, 
  PenTool, 
  Code2, 
  FlaskConical,
  Compass
} from 'lucide-react';

export default function WorkshopListPage() {
  const { progress } = useApp();

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'ORIENTASI': return 'bg-purple-900/50 text-purple-300 border-purple-500/40';
      case 'KENALI': return 'bg-blue-900/50 text-sky-300 border-blue-500/40';
      case 'EKSPLORASI': return 'bg-cyan-900/50 text-cyan-300 border-cyan-500/40';
      case 'PAHAMI': return 'bg-teal-900/50 text-teal-300 border-teal-500/40';
      case 'RANCANG': return 'bg-amber-900/50 text-amber-300 border-amber-500/40';
      case 'BUAT': return 'bg-orange-900/50 text-orange-300 border-orange-500/40';
      case 'UJI': return 'bg-emerald-900/50 text-emerald-300 border-emerald-500/40';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getModuleIcon = (slug: string) => {
    switch (slug) {
      case 'orientasi': return Compass;
      case 'modul-1': return Tv;
      case 'modul-2': return Cpu;
      case 'modul-3': return BookOpen;
      case 'modul-4': return PenTool;
      case 'modul-5': return Code2;
      case 'modul-6': return FlaskConical;
      default: return BookOpen;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              KURIKULUM RESMI WORKSHOP (150 MENIT)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Daftar Modul PID Learning Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Alur berjenjang dari pengenalan perangkat, eksplorasi gestur sentuh, perancangan pedagogis, hingga produksi MPI siap pakai.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
              Total Durasi: <strong className="text-white">150 Menit (2,5 Jam)</strong>
            </div>
          </div>
        </div>

        {/* Modules List Grid */}
        <div className="space-y-4">
          {WORKSHOP_MODULES.map((mod, index) => {
            const Icon = getModuleIcon(mod.slug);
            const isCompleted = progress.completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-[#1C2541]/90 border-emerald-500/40 shadow-md'
                    : 'bg-[#1C2541] border-slate-700/80 hover:border-slate-600 shadow-xl'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Icon & Info */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-md ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-br from-blue-600 to-sky-500 text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getStageColor(mod.stage)}`}>
                          TAHAP {mod.stage}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{mod.estimatedTime}</span>
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selesai</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: CTA button */}
                  <div className="flex items-center justify-end flex-shrink-0 pt-2 md:pt-0">
                    <Link
                      href={`/workshop/${mod.slug}`}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                          : 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:opacity-90 shadow-blue-500/20'
                      }`}
                    >
                      <span>{isCompleted ? 'Pelajari Kembali' : 'Mulai Modul'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
