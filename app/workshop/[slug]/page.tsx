'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { WORKSHOP_MODULES, PRETEST_QUESTIONS, POSTTEST_QUESTIONS } from '@/data/workshopData';
import PidHotspot from '@/components/interactive/PidHotspot';
import ComponentMatching from '@/components/interactive/ComponentMatching';
import GesturesMissions from '@/components/interactive/GesturesMissions';
import WhiteboardCanvas from '@/components/interactive/WhiteboardCanvas';
import ScenarioPlanner from '@/components/interactive/ScenarioPlanner';
import MpiCanvasEditor from '@/components/interactive/MpiCanvasEditor';
import StoryboardBuilder from '@/components/interactive/StoryboardBuilder';
import TestLabSimulator from '@/components/interactive/TestLabSimulator';
import QuizEngine from '@/components/interactive/QuizEngine';
import MarkdownContent from '@/components/MarkdownContent';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  FileCheck2, 
  HelpCircle,
  Tv,
  ExternalLink
} from 'lucide-react';

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { 
    progress, 
    markModuleCompleted, 
    savePreTest, 
    savePostTest,
    saveReflections,
    reflections,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'materi' | 'aktivitas' | 'evaluasi'>('materi');

  // Reflection form state for Modul 6
  const [r1, setR1] = useState(reflections.q1);
  const [r2, setR2] = useState(reflections.q2);
  const [r3, setR3] = useState(reflections.q3);
  const [reflectionsSaved, setReflectionsSaved] = useState(progress.reflectionsSubmitted);

  const currentModuleIndex = WORKSHOP_MODULES.findIndex(m => m.slug === slug);
  const currentModule = WORKSHOP_MODULES[currentModuleIndex] || WORKSHOP_MODULES[0];

  const prevModule = currentModuleIndex > 0 ? WORKSHOP_MODULES[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex < WORKSHOP_MODULES.length - 1 ? WORKSHOP_MODULES[currentModuleIndex + 1] : null;

  const isCompleted = progress.completedModules.includes(currentModule.id);

  const handleMarkComplete = () => {
    markModuleCompleted(currentModule.id);
    if (nextModule) {
      router.push(`/workshop/${nextModule.slug}`);
    } else {
      router.push('/project');
    }
  };

  const handleSaveReflections = (e: React.FormEvent) => {
    e.preventDefault();
    saveReflections(r1, r2, r3);
    setReflectionsSaved(true);
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition">Dashboard</Link>
          <span>/</span>
          <Link href="/workshop" className="hover:text-white transition">Workshop</Link>
          <span>/</span>
          <span className="text-sky-300 font-semibold truncate">{currentModule.title}</span>
        </nav>

        {/* Module Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1C2541] to-[#0E172F] border border-slate-700/80 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-900/60 text-sky-300 border border-blue-500/30 text-xs font-extrabold uppercase">
                TAHAP {currentModule.stage}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimasi: {currentModule.estimatedTime}</span>
              </span>
            </div>

            {isCompleted && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Modul Ini Telah Tuntas</span>
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {currentModule.title}
            </h1>
            <p className="text-sm sm:text-base text-sky-200/80 font-medium mt-1">
              {currentModule.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
              {currentModule.description}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'materi'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Materi Pembelajaran</span>
            </button>

            <button
              onClick={() => setActiveTab('aktivitas')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'aktivitas'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Praktik & Interaktivitas</span>
            </button>

            {slug === 'orientasi' && (
              <button
                onClick={() => setActiveTab('evaluasi')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  activeTab === 'evaluasi'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>3. Pre-Test</span>
              </button>
            )}

            {slug === 'modul-6' && (
              <button
                onClick={() => setActiveTab('evaluasi')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  activeTab === 'evaluasi'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>3. Post-Test & Refleksi</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Materi Content */}
        {activeTab === 'materi' && (
          <div className="space-y-6 animate-in fade-in">
            {currentModule.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {lesson.title}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {lesson.durationMinutes} Menit
                  </span>
                </div>

                {/* Markdown text representation */}
                <MarkdownContent content={lesson.content} />
              </div>
            ))}

            <div className="text-center pt-2">
              <button
                onClick={() => setActiveTab('aktivitas')}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
              >
                <span>Lanjut ke Aktivitas Interaktif</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Activity */}
        {activeTab === 'aktivitas' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Dynamic Interactive Component per Module */}
            {slug === 'orientasi' && (
              <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700 space-y-4 text-center">
                <h3 className="text-lg font-bold text-white">Aktivitas Modul Orientasi</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Silakan lanjutkan ke tab <strong>Pre-Test</strong> untuk mengukur pemahaman awal Anda seputar konsep Papan Interaktif Digital.
                </p>
                <button
                  onClick={() => setActiveTab('evaluasi')}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Buka Pre-Test Sekarang →
                </button>
              </div>
            )}

            {slug === 'modul-1' && (
              <>
                <PidHotspot />
                <ComponentMatching />
              </>
            )}

            {slug === 'modul-2' && (
              <>
                <GesturesMissions />
                <WhiteboardCanvas />
              </>
            )}

            {slug === 'modul-3' && (
              <ScenarioPlanner />
            )}

            {slug === 'modul-4' && (
              <>
                <MpiCanvasEditor />
                <StoryboardBuilder />
              </>
            )}

            {slug === 'modul-5' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#1C2541] border border-slate-700 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <Tv className="w-5 h-5 text-amber-400" />
                      <span>Studio Pembuatan: MPI Builder Terintegrasi</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Gunakan MPI Builder 5 langkah untuk merakit media pembelajaran Anda dan menghasilkan paket offline ZIP siap simpan ke flashdisk USB.
                    </p>
                  </div>

                  <Link
                    href="/mpi-builder"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 active:scale-95 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>BUKA MPI BUILDER SEKARANG</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {slug === 'modul-6' && (
              <TestLabSimulator />
            )}
          </div>
        )}

        {/* Tab 3: Evaluation (Pre-Test in Modul 0, Post-Test in Modul 6) */}
        {activeTab === 'evaluasi' && (
          <div className="space-y-6 animate-in fade-in">
            {slug === 'orientasi' && (
              <QuizEngine
                title="Pre-Test Pengenalan Papan Interaktif Digital"
                subtitle="5 Butir Soal Objektif • Tidak Menentukan Kelulusan"
                questions={PRETEST_QUESTIONS}
                isPreTest={true}
                onComplete={(score) => {
                  savePreTest(score);
                }}
              />
            )}

            {slug === 'modul-6' && (
              <div className="space-y-6">
                <QuizEngine
                  title="Post-Test Kelulusan Workshop PID Learning Lab"
                  subtitle="10 Butir Soal Pemahaman Komprehensif • Passing Grade: 70"
                  questions={POSTTEST_QUESTIONS}
                  passingScore={70}
                  onComplete={(score) => {
                    savePostTest(score);
                  }}
                />

                {/* Refleksi Workshop 3 Pertanyaan */}
                <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="pb-2 border-b border-slate-700/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      REFLEKSI PEMBELAJARAN
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Lembar Refleksi Akhir Workshop
                    </h3>
                    <p className="text-xs text-slate-300">
                      Tuliskan tanggapan dan refleksi Anda selama mengikuti 2,5 jam pelatihan di PID Learning Lab.
                    </p>
                  </div>

                  <form onSubmit={handleSaveReflections} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        1. Apa fitur PID yang paling bermanfaat bagi pembelajaran di kelas Anda?
                      </label>
                      <textarea
                        rows={3}
                        value={r1}
                        onChange={(e) => setR1(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        2. Skenario interaktif apa yang paling ingin segera Anda terapkan bersama siswa SD Anda?
                      </label>
                      <textarea
                        rows={3}
                        value={r2}
                        onChange={(e) => setR2(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        3. Apa yang masih perlu Anda pelajari lebih lanjut seputar PID dan media digital?
                      </label>
                      <textarea
                        rows={3}
                        value={r3}
                        onChange={(e) => setR3(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {reflectionsSaved ? '✓ Refleksi tersimpan ke Firestore' : 'Wajib diisi untuk klaim sertifikat'}
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md transition"
                      >
                        Kirim Refleksi Akhir
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation & Mark Complete (Section 39 specification) */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            {prevModule ? (
              <Link
                href={`/workshop/${prevModule.slug}`}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Sebelumnya: {prevModule.title.split('—')[0]}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkComplete}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 active:scale-95 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>✓ Tandai Selesai & Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
