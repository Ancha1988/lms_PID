'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { 
  Tv, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  FlaskConical, 
  Award, 
  FileCheck2, 
  FolderGit2, 
  Layers, 
  Clock, 
  Play,
  Monitor,
  AlertCircle
} from 'lucide-react';
import { WORKSHOP_MODULES, WORKSHOP_META } from '@/data/workshopData';

export default function DashboardPage() {
  const { 
    currentUser, 
    progress, 
    userProject, 
    badges, 
    pidMode, 
    togglePidMode,
    isDemoMode
  } = useApp();

  // Determine last incomplete module for the "▶ LANJUTKAN PEMBELAJARAN" primary button
  const nextModule = WORKSHOP_MODULES.find(m => !progress.completedModules.includes(m.id)) || WORKSHOP_MODULES[4];

  const earnedBadgesCount = badges.filter(b => b.earned).length;

  const journeySteps = [
    { title: 'Orientasi', desc: 'Pre-Test & Konsep', done: progress.preTestCompleted, path: '/workshop/orientasi' },
    { title: 'Kenali PID', desc: 'Anatomi & Port', done: progress.completedModules.includes('modul-1'), path: '/workshop/modul-1' },
    { title: 'Eksplorasi', desc: 'Whiteboard & Gestur', done: progress.completedModules.includes('modul-2'), path: '/workshop/modul-2' },
    { title: 'Pahami', desc: '5 Skenario SD', done: progress.completedModules.includes('modul-3'), path: '/workshop/modul-3' },
    { title: 'Rancang', desc: 'MPI Canvas & Storyboard', done: progress.completedModules.includes('modul-4') || progress.mpiCanvasCompleted, path: '/workshop/modul-4' },
    { title: 'Buat MPI', desc: 'Generator 5 Langkah', done: progress.completedModules.includes('modul-5') || progress.mpiProjectCreated, path: '/workshop/modul-5' },
    { title: 'Uji & Hasil', desc: 'Test Lab & Sertifikat', done: progress.mpiApproved, path: '/workshop/modul-6' },
  ];

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Welcome Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1C2541] via-[#1E3A8A]/60 to-[#0B132B] border border-blue-500/30 shadow-2xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-xs font-bold text-sky-200">
              <Tv className="w-3.5 h-3.5 text-sky-400" />
              <span>{WORKSHOP_META.title} • Durasi 2,5 Jam (150 Menit)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Selamat datang, {currentUser.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Lanjutkan perjalanan Anda menjadi kreator media pembelajaran interaktif (MPI) untuk ruang kelas Sekolah Dasar.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href={`/workshop/${nextModule.slug}`}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/20 active:scale-95 transition flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>▶ LANJUTKAN PEMBELAJARAN</span>
                <span className="text-xs font-normal opacity-80">({nextModule.title.split('—')[0]})</span>
              </Link>

              <Link
                href="/mpi-builder"
                className="px-5 py-3 rounded-2xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-sky-200 font-bold text-sm transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Buka MPI Builder</span>
              </Link>
            </div>
          </div>

          {/* Mini Info Card right */}
          <div className="relative z-10 hidden xl:flex flex-col gap-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-700/80 text-xs w-64">
            <div className="flex items-center justify-between text-slate-400">
              <span>Target Produk:</span>
              <span className="text-amber-300 font-bold">1 Guru 1 MPI</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Mode Dukungan:</span>
              <span className="text-sky-300 font-bold">Online & Offline (USB)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Sertifikat Resmi:</span>
              <span className="text-emerald-300 font-bold">2,5 Jam Pelatihan</span>
            </div>
          </div>
        </div>

        {/* Progress Card (Section 7 specification) */}
        <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                PROGRES KESELURUHAN WORKSHOP
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {progress.totalProgressPercent}%
                </h2>
                <span className="text-xs sm:text-sm text-slate-400">
                  {progress.completedModules.length} dari 7 tahap selesai
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-500/30 font-semibold">
                Status: {progress.totalProgressPercent >= 70 ? 'Sangat Baik' : 'Sedang Berjalan'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950/80 rounded-full h-3.5 p-0.5 border border-slate-700/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-amber-400 rounded-full transition-all duration-700 shadow-sm shadow-blue-500/50"
              style={{ width: `${progress.totalProgressPercent}%` }}
            />
          </div>
        </div>

        {/* 4 Statistics Cards (Section 7 specification) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Modul */}
          <div className="p-5 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>MODUL</span>
              <BookOpen className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {progress.completedModules.length}/6
            </div>
            <p className="text-[11px] text-slate-400">
              {6 - progress.completedModules.filter(m => m !== 'modul-0').length} modul tersisa
            </p>
          </div>

          {/* Card 2: Kuis */}
          <div className="p-5 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>KUIS & TES</span>
              <FileCheck2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {Object.keys(progress.quizScores).length}/5
            </div>
            <p className="text-[11px] text-slate-400">
              Rata-rata: 92% pemahaman
            </p>
          </div>

          {/* Card 3: Praktik */}
          <div className="p-5 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>PRAKTIK SENTUH</span>
              <FlaskConical className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {progress.completedActivities.length}/4
            </div>
            <p className="text-[11px] text-slate-400">
              Whiteboard, Matching, Test Lab
            </p>
          </div>

          {/* Card 4: Proyek */}
          <div className="p-5 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>PROYEK MPI</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {userProject ? '1' : '0'}
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold">
              {userProject ? `Status: ${userProject.status}` : 'Belum dibuat'}
            </p>
          </div>
        </div>

        {/* Visual Learning Journey Timeline */}
        <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <span>Alur Perjalanan Pembelajaran (Learning Journey)</span>
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Kenali ➔ Coba ➔ Rancang ➔ Buat ➔ Uji ➔ Hasilkan
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {journeySteps.map((step, idx) => (
              <Link
                key={step.title}
                href={step.path}
                className={`p-3 rounded-xl border text-center transition flex flex-col justify-between ${
                  step.done
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.done ? '✓' : idx + 1}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate">{step.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{step.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Project Summary & Quick Access */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Project Card */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Produk Akhir: 1 Guru 1 MPI
                </h3>
              </div>
              <Link
                href="/project"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <span>Kelola Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {userProject ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                      {userProject.subject} • {userProject.grade}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                      {userProject.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                      {userProject.learningObjective}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-xl text-xs font-extrabold ${
                      userProject.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : userProject.status === 'REVISION'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {userProject.status}
                    </span>
                    {userProject.score !== null && (
                      <div className="text-xs font-bold text-white mt-1">
                        Skor: <span className="text-emerald-400">{userProject.score}/100</span>
                      </div>
                    )}
                  </div>
                </div>

                {userProject.feedback && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-amber-300">Catatan Reviewer:</strong> {userProject.feedback}
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/mpi-builder"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition"
                  >
                    Buka di MPI Builder
                  </Link>
                  <Link
                    href="/workshop/modul-6"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
                  >
                    Uji di Test Lab
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <p className="text-sm text-slate-400">Anda belum memiliki proyek MPI.</p>
                <Link
                  href="/mpi-builder"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>+ Buat MPI Pertama Anda</span>
                </Link>
              </div>
            )}
          </div>

          {/* Badges & Certificate Widget */}
          <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Lencana Anda</h3>
                </div>
                <Link href="/badges" className="text-xs text-sky-400 hover:text-sky-300">
                  Lihat Semua
                </Link>
              </div>

              <div className="py-3 flex items-center justify-around">
                {badges.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    className={`flex flex-col items-center gap-1 ${b.earned ? 'opacity-100' : 'opacity-30 grayscale'}`}
                    title={b.title}
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <span className="text-[10px] text-slate-300 font-medium truncate max-w-[54px] text-center">
                      {b.title.split(' ')[1] || b.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate status mini banner */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Sertifikat Workshop</span>
                </span>
                <span className="text-[10px] text-slate-400">2,5 Jam</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {progress.totalProgressPercent >= 100
                  ? 'Selamat! Sertifikat resmi Anda telah siap diunduh.'
                  : 'Sertifikat akan tersedia setelah seluruh modul dan proyek disetujui.'}
              </p>
              <Link
                href="/certificate"
                className="block text-center w-full py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-sky-300 font-bold text-xs transition"
              >
                Cek Status Sertifikat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
