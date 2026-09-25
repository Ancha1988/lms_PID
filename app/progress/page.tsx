'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { WORKSHOP_MODULES } from '@/data/workshopData';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Award, 
  FileCheck2, 
  FolderGit2, 
  Sparkles, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function ProgressPage() {
  const { progress, userProject, badges } = useApp();

  const preScore = progress.preTestScore ?? 0;
  const postScore = progress.postTestScore ?? 0;
  const delta = postScore - preScore;

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              MONITORING EVALUASI WORKSHOP
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Progress & Capaian Pembelajaran
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Pantau kemajuan menyeluruh Anda berdasarkan penyelesaian modul, aktivitas sentuh, kuis, dan status proyek 1 Guru 1 MPI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-blue-950/80 border border-blue-500/40 text-sky-300 font-bold text-xs sm:text-sm">
              Total Progress: {progress.totalProgressPercent}%
            </div>
          </div>
        </div>

        {/* Big Progress Bar Card */}
        <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              AKUMULASI KELULUSAN WORKSHOP
            </span>
            <span className="text-2xl font-black text-white">{progress.totalProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-4 p-0.5 border border-slate-700/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${progress.totalProgressPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            *Dihitung berdasarkan pembukaan modul, tuntasnya misi sentuh, skor kuis, perancangan MPI Canvas, dan persetujuan proyek akhir.
          </p>
        </div>

        {/* Pre-Test vs Post-Test Comparison (Section 45 specification) */}
        <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Perkembangan Kompetensi: Pre-Test vs Post-Test
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Passing Grade: 70%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pre-Test Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 block">PRE-TEST (SEBELUM WORKSHOP)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-200">
                  {progress.preTestScore !== null ? `${progress.preTestScore}%` : 'Belum'}
                </span>
                <span className="text-xs text-slate-400">Pemahaman Awal</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-slate-600 rounded-full" 
                  style={{ width: `${preScore}%` }} 
                />
              </div>
            </div>

            {/* Post-Test Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">POST-TEST (SETELAH WORKSHOP)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">
                  {progress.postTestScore !== null ? `${progress.postTestScore}%` : 'Belum Diisi'}
                </span>
                {progress.postTestScore !== null && delta > 0 && (
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
                    +{delta}% Peningkatan
                  </span>
                )}
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${postScore}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Breakdown Table */}
        <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-sky-400" />
            <span>Matriks Penyelesaian Tahapan Workshop</span>
          </h3>

          <div className="divide-y divide-slate-800 text-xs">
            {WORKSHOP_MODULES.map((m) => {
              const isDone = progress.completedModules.includes(m.id);
              const quizScore = progress.quizScores[m.id];

              return (
                <div key={m.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isDone ? '✓' : m.number}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{m.title}</p>
                      <p className="text-slate-400">{m.subtitle} ({m.estimatedTime})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${
                      isDone 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {isDone ? 'COMPLETED' : 'IN_PROGRESS'}
                    </span>

                    <Link
                      href={`/workshop/${m.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                    >
                      Buka Modul
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
