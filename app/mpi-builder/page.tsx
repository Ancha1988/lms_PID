'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { generateOfflineMpiZip } from '@/lib/offlinePackage';
import { StoryboardPage, MPIMode, MPIProject } from '@/types';
import { 
  Sparkles, 
  Tv, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Send, 
  Eye, 
  Lightbulb, 
  Loader2, 
  RotateCcw,
  CheckSquare,
  Globe,
  HardDrive,
  RefreshCw,
  FolderPlus
} from 'lucide-react';
import Link from 'next/link';

const SUBJECT_LIST = [
  'IPAS (Ilmu Pengetahuan Alam & Sosial)',
  'Matematika',
  'Bahasa Indonesia',
  'Pendidikan Pancasila',
  'Seni Budaya',
  'PJOK (Pendidikan Jasmani & Kesehatan)',
];

const GRADE_LIST = [
  'Kelas 1 SD (Fase A)',
  'Kelas 2 SD (Fase A)',
  'Kelas 3 SD (Fase B)',
  'Kelas 4 SD (Fase B)',
  'Kelas 5 SD (Fase C)',
  'Kelas 6 SD (Fase C)',
];

const STRUCTURE_OPTIONS = [
  { id: 'Opening', label: '01 Opening (Judul Menarik & Tombol Mulai Ramah Anak)' },
  { id: 'Tujuan', label: '02 Tujuan Pembelajaran (Bahasa Ramah Anak)' },
  { id: 'Materi', label: '03 Materi Pokok (Visual Kontras Tinggi)' },
  { id: 'Aktivitas', label: '04 Aktivitas Simulasi Sentuh PID' },
  { id: 'Latihan', label: '05 Latihan / Tantangan Berpasangan' },
  { id: 'Kuis', label: '06 Kuis Cek Pemahaman Berhadiah Skor' },
  { id: 'Refleksi', label: '07 Refleksi Emotikon & Kesimpulan' },
];

const INTERACTION_OPTIONS = [
  { id: 'Klik', label: 'Ketukan Tunggal (Tap Hotspot / Tombol Besar)' },
  { id: 'Drag & Drop', label: 'Drag & Drop (Menyeret Objek ke Wadah/Diagram)' },
  { id: 'Matching', label: 'Matching (Menghubungkan Pasangan Gambar & Kata)' },
  { id: 'Multiple Choice', label: 'Pilihan Ganda Touchscreen (A/B/C/D)' },
  { id: 'True/False', label: 'Benar / Salah (True / False)' },
  { id: 'Refleksi', label: 'Pemilihan Emotikon Refleksi' },
];

export default function MpiBuilderPage() {
  const { 
    currentUser, 
    createOrUpdateProject, 
    markActivityCompleted, 
    showToast,
    canvasData
  } = useApp();

  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState(canvasData.subject || SUBJECT_LIST[0]);
  const [grade, setGrade] = useState(canvasData.grade || GRADE_LIST[3]);
  const [topic, setTopic] = useState(canvasData.topic || 'Siklus Air & Pelestarian Sumber Air Bersih');
  const [objective, setObjective] = useState(
    canvasData.learningObjective || 
    'Melalui simulasi interaktif di layar PID, siswa kelas 4 dapat mengurutkan 4 tahapan daur air secara tepat dan antusias.'
  );
  const [selectedStructures, setSelectedStructures] = useState<string[]>([
    'Opening', 'Tujuan', 'Materi', 'Aktivitas', 'Latihan', 'Kuis', 'Refleksi'
  ]);
  const [selectedInteractions, setSelectedInteractions] = useState<string[]>([
    'Klik', 'Drag & Drop', 'Multiple Choice', 'Refleksi'
  ]);
  const [mode, setMode] = useState<MPIMode>('ONLINE + OFFLINE');

  // Generated Project State
  const [generatedProject, setGeneratedProject] = useState<MPIProject | null>(null);
  const [activePreviewSlide, setActivePreviewSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // AI Co-Designer State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const toggleStructure = (id: string) => {
    setSelectedStructures(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleInteraction = (id: string) => {
    setSelectedInteractions(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const callAiCoDesigner = async (action: string) => {
    setIsAiLoading(true);
    setAiResponse(null);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          subject,
          grade,
          topic,
          objective,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiResponse(data.text || data.data);
      }
    } catch (e) {
      console.error(e);
      showToast('Gagal memanggil AI Co-Designer', 'error');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Create storyboard pages based on chosen options
      const generatedPages: StoryboardPage[] = selectedStructures.map((s, idx) => {
        let pType: StoryboardPage['type'] = 'Materi';
        let pTitle = `${s} - ${topic}`;
        let pContent = `Materi dan aktivitas interaktif untuk topik ${topic} pada layar PID.`;
        let pInteraction = selectedInteractions[idx % selectedInteractions.length] || 'Klik';

        if (s === 'Opening') {
          pType = 'Opening';
          pTitle = topic;
          pContent = `Selamat Datang di Pembelajaran Interaktif ${subject}! Sentuh tombol MULAI di bawah untuk belajar bersama di depan layar PID.`;
          pInteraction = 'Tap tombol Mulai';
        } else if (s === 'Tujuan') {
          pType = 'Tujuan';
          pTitle = 'Tujuan Pembelajaran Hari Ini';
          pContent = objective;
          pInteraction = 'Tap ikon untuk mendengar audio';
        } else if (s === 'Aktivitas') {
          pType = 'Aktivitas';
          pTitle = `Simulasi Interaktif ${topic}`;
          pContent = `Ajak 2 siswa maju ke depan layar PID untuk mencoba memanipulasi elemen interaktif sesuai panduan guru.`;
          pInteraction = 'Drag & Drop atau Ketukan sentuh berpasangan';
        } else if (s === 'Kuis') {
          pType = 'Multiple Choice';
          pTitle = `Kuis Cek Pemahaman: ${topic}`;
          pContent = `Manakah pernyataan yang paling tepat mengenai konsep ${topic}? Pilih jawabanmu langsung di layar PID!`;
          pInteraction = 'Tap pilihan jawaban A/B/C/D';
        } else if (s === 'Refleksi') {
          pType = 'Refleksi';
          pTitle = 'Refleksi Belajar Hari Ini';
          pContent = 'Bagaimana perasaanmu setelah belajar menggunakan Papan Interaktif Digital hari ini? Sentuh emotikon di bawah!';
          pInteraction = 'Tap emotikon senang / bintang';
        }

        return {
          id: `page-${idx + 1}`,
          pageNumber: idx + 1,
          type: pType,
          title: pTitle,
          content: pContent,
          interactionType: pInteraction,
        };
      });

      const newProj: MPIProject = {
        id: `proj-builder-${Date.now()}`,
        ownerId: currentUser.uid,
        ownerName: currentUser.name,
        ownerSchool: currentUser.school,
        title: `MPI ${topic} (${grade})`,
        subject,
        grade,
        topic,
        learningObjective: objective,
        learningProblem: canvasData.learningProblem || 'Siswa membutuhkan visualisasi konkret di PID.',
        interactiveActivity: canvasData.interactiveActivity || 'Aktivitas kinestetik sentuh di layar PID.',
        assessmentForm: 'Kuis interaktif pilihan ganda di PID.',
        description: `Media Pembelajaran Interaktif (MPI) untuk ${grade} materi ${topic}. Dibuat menggunakan PID Learning Lab Builder dengan dukungan mode ${mode}.`,
        mode,
        status: 'NOT_STARTED',
        score: null,
        rubric: {
          kesesuaianTujuan: 0,
          kualitasMateri: 0,
          interaktivitas: 0,
          keterbacaanPID: 0,
          keterpakaianTeknis: 0,
          total: 0,
        },
        feedback: '',
        pages: generatedPages,
        version: 1,
        versionsHistory: [],
        testLabPassed: true,
        checklistVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setGeneratedProject(newProj);
      setIsGenerating(false);
      markActivityCompleted('act-5', 'MPI_CREATOR');
      showToast('✨ Paket MPI Berhasil Dibuat!', 'success');
    }, 800);
  };

  const handleDownloadZip = async () => {
    if (!generatedProject) return;
    setIsDownloadingZip(true);
    try {
      const blob = await generateOfflineMpiZip(generatedProject);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MPI_${generatedProject.topic.replace(/[^a-zA-Z0-9]/g, '_')}_Offline.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('📦 Paket Offline ZIP Berhasil Diunduh! Siap dicopy ke Flashdisk PID', 'success');
    } catch (e) {
      console.error(e);
      showToast('Gagal membungkus paket ZIP offline', 'error');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleSaveToMyProjects = () => {
    if (!generatedProject) return;
    createOrUpdateProject(generatedProject);
    showToast('Proyek berhasil dimasukkan ke menu "Proyek Saya"', 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold tracking-wider uppercase">
                ✨ FITUR UTAMA
              </span>
              <span className="text-xs text-slate-400">Modul 5 — Pembuatan MPI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              MPI BUILDER (Interactive Media Generator)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Wizard 5 langkah untuk merancang dan memproduksi Media Pembelajaran Interaktif siap pakai di Papan Interaktif Digital secara Online maupun Offline.
            </p>
          </div>

          {/* AI Co-Designer helper badge */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>AI sebagai co-designer, guru tetap instructional designer.</span>
          </div>
        </div>

        {/* Wizard Stepper Progress Bar */}
        <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 shadow-xl">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center text-xs font-bold">
            {[
              { num: 1, title: 'Identitas' },
              { num: 2, title: 'Tujuan' },
              { num: 3, title: 'Struktur' },
              { num: 4, title: 'Interaksi' },
              { num: 5, title: 'Mode & Buat' },
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;

              return (
                <button
                  key={s.num}
                  onClick={() => setStep(s.num)}
                  className={`py-2 px-1 rounded-xl transition flex flex-col items-center gap-1 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : isPast
                      ? 'bg-slate-900 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900/60 text-slate-500'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-white text-blue-600' : isPast ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isPast ? '✓' : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Co-Designer Floating Recommendation Drawer / Bar */}
        <div className="bg-purple-950/40 border border-purple-500/30 rounded-2xl p-4 text-white space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-200">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bantuan AI Co-Designer untuk MPI Anda:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => callAiCoDesigner('generate-objective')}
                disabled={isAiLoading}
                className="px-3 py-1.5 rounded-lg bg-purple-800/80 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Lightbulb className="w-3 h-3 text-amber-300" />}
                <span>Bantu Rumuskan Tujuan</span>
              </button>
              <button
                type="button"
                onClick={() => callAiCoDesigner('generate-activity')}
                disabled={isAiLoading}
                className="px-3 py-1.5 rounded-lg bg-purple-800/80 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Tv className="w-3 h-3 text-sky-300" />}
                <span>Ide Aktivitas Sentuh PID</span>
              </button>
              <button
                type="button"
                onClick={() => callAiCoDesigner('generate-quiz')}
                disabled={isAiLoading}
                className="px-3 py-1.5 rounded-lg bg-purple-800/80 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-emerald-300" />}
                <span>Inspirasi Soal Kuis</span>
              </button>
            </div>
          </div>

          {aiResponse && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-700/60 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
              {aiResponse}
            </div>
          )}
        </div>

        {/* Wizard Form Cards */}
        <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
          {/* STEP 1 — IDENTITAS */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="pb-3 border-b border-slate-700/60">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">LANGKAH 1 DARI 5</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Identitas Kurikulum & Sasaran Kelas
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Mata Pelajaran:
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {SUBJECT_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Tingkat Kelas SD:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {GRADE_LIST.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Topik Spesifik Media:
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Operasi Pecahan Senilai Pizza, Daur Air, Siklus Hidup Hewan..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <span>Lanjut: Langkah 2 (Tujuan)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — TUJUAN */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="pb-3 border-b border-slate-700/60">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">LANGKAH 2 DARI 5</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Rumusan Tujuan Pembelajaran (ABCD)
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Tujuan Pembelajaran Berorientasi Interaktif:
                </label>
                <textarea
                  rows={4}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Rumuskan tujuan pembelajaran yang jelas dan melibatkan interaksi PID..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <span>Lanjut: Langkah 3 (Struktur)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — STRUKTUR */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="pb-3 border-b border-slate-700/60">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">LANGKAH 3 DARI 5</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Pilih Struktur Halaman Media Pembelajaran
                </h3>
                <p className="text-xs text-slate-300">
                  Centang modul halaman yang ingin Anda masukkan ke dalam paket media PID:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STRUCTURE_OPTIONS.map((opt) => {
                  const isChecked = selectedStructures.includes(opt.id);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleStructure(opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                        isChecked
                          ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 rounded accent-blue-600 pointer-events-none"
                      />
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <span>Lanjut: Langkah 4 (Interaksi)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — INTERAKSI */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="pb-3 border-b border-slate-700/60">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">LANGKAH 4 DARI 5</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Tentukan Tipe Interaksi Sentuh pada Layar PID
                </h3>
                <p className="text-xs text-slate-300">
                  Pilih bentuk manipulasi objek yang dapat dilakukan siswa saat maju ke depan PID:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERACTION_OPTIONS.map((opt) => {
                  const isChecked = selectedInteractions.includes(opt.id);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleInteraction(opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-500 text-white font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 text-amber-500 rounded accent-amber-500 pointer-events-none"
                      />
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <span>Lanjut: Langkah 5 (Mode & Generate)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 — MODE & GENERATE */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="pb-3 border-b border-slate-700/60">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">LANGKAH 5 DARI 5</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Pilih Mode Distribusi & Generate Paket MPI
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'ONLINE',
                    title: '🌐 ONLINE',
                    desc: 'Dapat dibuka melalui link browser PID sekolah yang terhubung internet.',
                    icon: Globe,
                  },
                  {
                    id: 'OFFLINE',
                    title: '💾 OFFLINE',
                    desc: 'Paket HTML5 mandiri untuk flashdisk USB, tanpa perlu koneksi internet.',
                    icon: HardDrive,
                  },
                  {
                    id: 'ONLINE + OFFLINE',
                    title: '🔄 ONLINE + OFFLINE',
                    desc: 'Kombinasi fleksibel: siap tayang di web sekaligus disimpan di flashdisk.',
                    icon: RefreshCw,
                  },
                ].map((m) => {
                  const isSelected = mode === m.id;
                  const Icon = m.icon;

                  return (
                    <div
                      key={m.id}
                      onClick={() => setMode(m.id as MPIMode)}
                      className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-900/40 border-blue-400 ring-2 ring-blue-500/30'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                          <h4 className="font-bold text-sm text-white">{m.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                      </div>
                      <div className="mt-3 text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isSelected ? 'Dipilih' : 'Pilih'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Generate Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/30 active:scale-95 transition flex items-center justify-center gap-3 mx-auto"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sedang Merakit Paket Media Interaktif PID...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      <span>✨ GENERATE MPI SEKARANG</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview & Export Container (Appears after Generation) */}
        {generatedProject && (
          <div className="bg-[#1C2541] border border-blue-500/60 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-3">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    ✓ HASIL GENERATE BERHASIL
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Mode: {generatedProject.mode}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {generatedProject.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {generatedProject.subject} • {generatedProject.grade}
                </p>
              </div>

              {/* Download & Submit buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleDownloadZip}
                  disabled={isDownloadingZip}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
                >
                  {isDownloadingZip ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  <span>DOWNLOAD OFFLINE PACKAGE (.ZIP)</span>
                </button>

                <button
                  onClick={handleSaveToMyProjects}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Simpan ke Proyek Saya</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Preview Screen */}
            <div className="rounded-2xl border-4 border-slate-700 bg-slate-950 p-4 sm:p-6 shadow-inner space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 font-bold text-sky-400">
                  <Tv className="w-4 h-4" />
                  <span>PID VIRTUAL RUNNER - PREVIEW AKTIF</span>
                </span>
                <span>
                  Halaman {activePreviewSlide + 1} dari {generatedProject.pages.length}
                </span>
              </div>

              {/* Slide Display */}
              {generatedProject.pages[activePreviewSlide] && (
                <div className="min-h-[260px] rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border-2 border-blue-500/40 p-6 flex flex-col justify-between text-center">
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                      {generatedProject.pages[activePreviewSlide].type} • Halaman {activePreviewSlide + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {generatedProject.pages[activePreviewSlide].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                      {generatedProject.pages[activePreviewSlide].content}
                    </p>
                  </div>

                  {/* Interactive Box */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 max-w-md mx-auto my-3 w-full">
                    <div className="text-xs font-bold text-amber-300 mb-2">
                      👉 Interaksi Sentuh: {generatedProject.pages[activePreviewSlide].interactionType}
                    </div>
                    <button
                      onClick={() => showToast('✨ Sentuhan terdeteksi! Umpan balik visual PID aktif.', 'success')}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm active:scale-95 transition"
                    >
                      Sentuh untuk Simulasi Siswa
                    </button>
                  </div>

                  {/* Navigation Buttons inside Runner */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setActivePreviewSlide(prev => Math.max(0, prev - 1))}
                      disabled={activePreviewSlide === 0}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-semibold"
                    >
                      ← Slide Sebelumnya
                    </button>
                    <div className="flex gap-1">
                      {generatedProject.pages.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setActivePreviewSlide(i)}
                          className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                            i === activePreviewSlide ? 'bg-blue-500 scale-125' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setActivePreviewSlide(prev => Math.min(generatedProject.pages.length - 1, prev + 1))}
                      disabled={activePreviewSlide === generatedProject.pages.length - 1}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-semibold"
                    >
                      Slide Berikutnya →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Offline Package Structure Explanation */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4" />
                <span>Isi Paket Berkas Offline (Hasil Ekspor ZIP):</span>
              </div>
              <div className="font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800 text-sky-300">
                <div>📁 MPI_{generatedProject.topic.replace(/[^a-zA-Z0-9]/g, '_')}_Offline/</div>
                <div className="pl-4">├── 📄 index.html (Halaman utama media web)</div>
                <div className="pl-4">├── 🎨 style.css (Tata letak & tombol sentuh ramah PID)</div>
                <div className="pl-4">├── ⚙️ script.js (Logika interaksi & skor audio synthesizer)</div>
                <div className="pl-4">└── 📝 PETUNJUK_PID_OFFLINE.txt (Panduan colok Flashdisk USB)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
