'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { generateOfflineMpiZip } from '@/lib/offlinePackage';
import { 
  FolderGit2, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  History,
  FileCheck2,
  Tv,
  HelpCircle,
  Loader2,
  Send
} from 'lucide-react';

export default function ProjectPage() {
  const { 
    userProject, 
    submitProjectForReview, 
    createOrUpdateProject, 
    currentUser, 
    showToast 
  } = useApp();

  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Final Project Checklist (Section 44)
  const [checklist, setChecklist] = useState({
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
    c6: true,
    c7: true,
    c8: true,
  });

  const toggleCheck = (k: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const isAllChecked = Object.values(checklist).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProject) {
      showToast('Belum ada media MPI yang dirancang. Buka MPI Builder terlebih dahulu.', 'warning');
      return;
    }
    if (!isAllChecked) {
      showToast('Harap lengkapi seluruh 8 poin Final Checklist sebelum mengirim proyek.', 'warning');
      return;
    }
    submitProjectForReview(userProject.id, revisionNotes || 'Pengajuan berkas proyek akhir 1 Guru 1 MPI');
    setShowRevisionForm(false);
  };

  const handleDownloadOfflineZip = async () => {
    if (!userProject) return;
    setIsDownloading(true);
    try {
      const blob = await generateOfflineMpiZip(userProject);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MPI_${userProject.title.replace(/[^a-zA-Z0-9]/g, '_')}_Offline.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Paket Offline ZIP siap digunakan di PID!', 'success');
    } catch (e) {
      console.error(e);
      showToast('Gagal membungkus paket ZIP', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              PRODUK UTAMA WORKSHOP (150 MENIT)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Proyek Saya: 1 Guru 1 MPI
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Kumpulkan Media Pembelajaran Interaktif (MPI) Anda untuk mendapatkan asesmen reviewer dan verifikasi penerbitan sertifikat resmi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/mpi-builder"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Buka MPI Builder</span>
            </Link>
          </div>
        </div>

        {/* Project Card */}
        {userProject ? (
          <div className="space-y-6">
            {/* Status Banner */}
            <div className={`p-6 rounded-2xl border shadow-xl flex flex-wrap items-center justify-between gap-4 ${
              userProject.status === 'APPROVED'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : userProject.status === 'REVISION'
                ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                : userProject.status === 'SUBMITTED' || userProject.status === 'UNDER_REVIEW'
                ? 'bg-blue-950/60 border-blue-500/60 text-sky-200'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md ${
                  userProject.status === 'APPROVED'
                    ? 'bg-emerald-500 text-slate-950'
                    : userProject.status === 'REVISION'
                    ? 'bg-rose-500 text-white'
                    : 'bg-blue-600 text-white'
                }`}>
                  {userProject.status === 'APPROVED' ? '🏆' : userProject.status === 'REVISION' ? '⚠️' : '📤'}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    STATUS PROYEK SAAT INI:
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {userProject.status === 'APPROVED' && 'PRODUK DISETUJUI REVIEWER (APPROVED)'}
                    {userProject.status === 'REVISION' && 'MPI PERLU DIPERBAIKI (REVISION)'}
                    {userProject.status === 'SUBMITTED' && 'TELAH DIKUMPULKAN — MENUNGGU REVIEW'}
                    {userProject.status === 'UNDER_REVIEW' && 'SEDANG DINILAI REVIEWER'}
                    {userProject.status === 'NOT_STARTED' && 'BELUM DIKUMPULKAN'}
                  </h3>
                  <p className="text-xs opacity-90 mt-0.5">
                    Versi Saat Ini: <strong>v{userProject.version}</strong> • Terakhir diperbarui: {userProject.updatedAt?.split('T')[0] || 'Hari ini'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {userProject.score !== null && (
                  <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">NILAI TOTAL</span>
                    <span className="text-2xl font-black text-amber-400">{userProject.score}/100</span>
                  </div>
                )}

                <button
                  onClick={handleDownloadOfflineZip}
                  disabled={isDownloading}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition"
                >
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-sky-400" />}
                  <span>Unduh Paket Offline (.ZIP)</span>
                </button>
              </div>
            </div>

            {/* Reviewer Feedback Box (Section 24) */}
            {userProject.feedback && (
              <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Umpan Balik & Catatan Reviewer:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-amber-900/50">
                  {userProject.feedback}
                </p>
              </div>
            )}

            {/* Rubric Breakdown (Section 23) */}
            {userProject.rubric && userProject.score !== null && (
              <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  <span>Rincian Rubrik Penilaian (Total 100 Poin)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">1. Kesesuaian Tujuan (Maks 25)</span>
                    <span className="text-lg font-bold text-emerald-400">{userProject.rubric.kesesuaianTujuan} Poin</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">2. Kualitas Materi (Maks 20)</span>
                    <span className="text-lg font-bold text-emerald-400">{userProject.rubric.kualitasMateri} Poin</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">3. Interaktivitas PID (Maks 25)</span>
                    <span className="text-lg font-bold text-emerald-400">{userProject.rubric.interaktivitas} Poin</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">4. Keterbacaan Layar (Maks 15)</span>
                    <span className="text-lg font-bold text-emerald-400">{userProject.rubric.keterbacaanPID} Poin</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">5. Keterpakaian Teknis (Maks 15)</span>
                    <span className="text-lg font-bold text-emerald-400">{userProject.rubric.keterpakaianTeknis} Poin</span>
                  </div>
                </div>
              </div>
            )}

            {/* Project Details Grid */}
            <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Identitas & Deskripsi Media Interaktif</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block">Mata Pelajaran & Kelas:</span>
                  <span className="text-white font-bold text-sm mt-0.5 block">{userProject.subject} • {userProject.grade}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block">Topik Pembelajaran:</span>
                  <span className="text-white font-bold text-sm mt-0.5 block">{userProject.topic}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block">Mode Distribusi:</span>
                  <span className="text-sky-300 font-bold text-sm mt-0.5 block">{userProject.mode}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p><strong>Tujuan Pembelajaran:</strong> {userProject.learningObjective}</p>
                <p><strong>Deskripsi Media:</strong> {userProject.description}</p>
                <p><strong>Jumlah Halaman Storyboard:</strong> {userProject.pages.length} Halaman Siap Tayang</p>
              </div>
            </div>

            {/* Version History (Section 24 specification: Version 1, Version 2, etc.) */}
            {userProject.versionsHistory && userProject.versionsHistory.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-sky-400" />
                  <span>Riwayat Versi Proyek (Version History)</span>
                </h4>

                <div className="space-y-2.5">
                  {userProject.versionsHistory.map((v) => (
                    <div
                      key={v.versionNumber}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded bg-blue-900/60 text-sky-300 font-mono font-bold">
                          v{v.versionNumber}
                        </span>
                        <div>
                          <p className="font-bold text-white">{v.title}</p>
                          <p className="text-slate-400 text-[11px]">{v.notes}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>{v.submittedAt}</span>
                        <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">{v.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Project 8-Point Checklist (Section 44) & Submit Action */}
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-5">
              <div className="pb-3 border-b border-slate-700/60">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  FINAL PROJECT CHECKLIST
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  Checklist Verifikasi Pra-Pengumpulan
                </h4>
                <p className="text-xs text-slate-300">
                  Pastikan seluruh 8 syarat di bawah ini telah Anda uji dan penuhi:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'c1', text: 'Saya sudah menentukan tujuan pembelajaran (ABCD)' },
                  { k: 'c2', text: 'MPI memiliki materi esensial terstruktur' },
                  { k: 'c3', text: 'MPI memiliki aktivitas interaktif (bukan pasif)' },
                  { k: 'c4', text: 'MPI memiliki latihan/kuis evaluasi cepat' },
                  { k: 'c5', text: 'Tombol navigasi berfungsi konsisten' },
                  { k: 'c6', text: 'MPI dapat digunakan dan disentuh pada PID' },
                  { k: 'c7', text: 'Saya sudah menguji kelayakan di Test Lab' },
                  { k: 'c8', text: 'Saya sudah memilih mode online/offline' },
                ].map((item) => {
                  const key = item.k as keyof typeof checklist;
                  const checked = checklist[key];

                  return (
                    <label
                      key={item.k}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCheck(key)}
                        className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                      />
                      <span className={checked ? 'text-slate-200 font-semibold' : 'text-slate-400'}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Revision / Submission Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Catatan Pengajuan / Perbaikan untuk Reviewer (Opsional):
                </label>
                <textarea
                  rows={2}
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="Tuliskan catatan perbaikan atau petunjuk khusus untuk penguji..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  {isAllChecked ? '✓ 8/8 Checklist Lengkap' : 'Lengkapi semua checklist untuk submit'}
                </div>

                <button
                  type="submit"
                  disabled={!isAllChecked}
                  className={`px-8 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 transition active:scale-95 ${
                    isAllChecked
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:opacity-90 shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {userProject.status === 'REVISION' ? 'KIRIMKAN REVISI PROYEK' : 'SUBMIT PROJECT (KIRIM PENILAIAN)'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-[#1C2541] border border-slate-700 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/20 text-sky-400 flex items-center justify-center text-3xl mx-auto">
              📂
            </div>
            <h3 className="text-xl font-bold text-white">Anda belum memiliki proyek MPI.</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Gunakan wizard MPI Builder untuk merancang media pembelajaran interaktif Anda dalam 5 langkah praktis.
            </p>
            <div className="pt-2">
              <Link
                href="/mpi-builder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>+ Buat MPI Pertama Anda</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
