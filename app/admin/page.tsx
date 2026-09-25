'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { MPIProject, ProjectStatus, RubricScore } from '@/types';
import { WORKSHOP_MODULES } from '@/data/workshopData';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Eye, 
  Edit3, 
  Send, 
  Sliders,
  FileCheck2,
  Tv,
  Download,
  X,
  Plus
} from 'lucide-react';

export default function AdminPage() {
  const { 
    currentUser, 
    projects, 
    reviewProject, 
    showToast,
    switchUserRole 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedProjectForGrading, setSelectedProjectForGrading] = useState<MPIProject | null>(null);

  // Rubric Scoring form inside modal
  const [rubric, setRubric] = useState<RubricScore>({
    kesesuaianTujuan: 24,
    kualitasMateri: 19,
    interaktivitas: 24,
    keterbacaanPID: 13,
    keterpakaianTeknis: 13,
    total: 93,
  });
  const [reviewStatus, setReviewStatus] = useState<ProjectStatus>('APPROVED');
  const [reviewFeedback, setReviewFeedback] = useState('Karya sangat interaktif dan ramah layar PID!');

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.ownerSchool.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate admin stats (Section 29)
  const totalPeserta = 28;
  const totalModul = WORKSHOP_MODULES.length;
  const totalMPI = projects.length;
  const mpiDisetujui = projects.filter(p => p.status === 'APPROVED').length;
  const mpiPerluRevisi = projects.filter(p => p.status === 'REVISION').length;
  const rataRataProgress = '78%';

  const openGradingModal = (proj: MPIProject) => {
    setSelectedProjectForGrading(proj);
    if (proj.rubric && proj.rubric.total > 0) {
      setRubric(proj.rubric);
      setReviewStatus(proj.status);
      setReviewFeedback(proj.feedback || '');
    } else {
      setRubric({
        kesesuaianTujuan: 22,
        kualitasMateri: 18,
        interaktivitas: 22,
        keterbacaanPID: 13,
        keterpakaianTeknis: 13,
        total: 88,
      });
      setReviewStatus('APPROVED');
      setReviewFeedback('Rancangan media sangat baik dan memenuhi standar pembelajaran SD.');
    }
  };

  const handleRubricSlider = (key: keyof Omit<RubricScore, 'total'>, val: number) => {
    setRubric(prev => {
      const updated = { ...prev, [key]: val };
      updated.total = (
        updated.kesesuaianTujuan +
        updated.kualitasMateri +
        updated.interaktivitas +
        updated.keterbacaanPID +
        updated.keterpakaianTeknis
      );
      return updated;
    });
  };

  const handleSaveReview = () => {
    if (!selectedProjectForGrading) return;
    reviewProject(
      selectedProjectForGrading.id,
      rubric,
      reviewStatus,
      reviewFeedback
    );
    setSelectedProjectForGrading(null);
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              PORTAL REVIEWER & PENGELOLA WORKSHOP
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Dashboard Fasilitator & Asesmen MPI
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Kelola daftar peserta guru, lakukan review rubrik 100 poin untuk proyek media interaktif, dan validasi kelulusan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin: {currentUser.name}</span>
            </span>
          </div>
        </div>

        {/* 6 Statistics Cards (Section 29 specification) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-md space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">TOTAL PESERTA</span>
            <div className="text-2xl font-black text-white">{totalPeserta}</div>
            <p className="text-[10px] text-sky-400">Guru SD Terdaftar</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-md space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">TOTAL MODUL</span>
            <div className="text-2xl font-black text-white">{totalModul}</div>
            <p className="text-[10px] text-slate-400">Tahap Terstruktur</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-md space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">TOTAL MPI</span>
            <div className="text-2xl font-black text-white">{totalMPI}</div>
            <p className="text-[10px] text-amber-400">Media Diajukan</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-md space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 uppercase">MPI DISETUJUI</span>
            <div className="text-2xl font-black text-emerald-400">{mpiDisetujui}</div>
            <p className="text-[10px] text-emerald-400">Lolos Passing Grade</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-md space-y-1">
            <span className="text-[11px] font-bold text-rose-400 uppercase">PERLU REVISI</span>
            <div className="text-2xl font-black text-rose-400">{mpiPerluRevisi}</div>
            <p className="text-[10px] text-rose-400">Butuh Perbaikan</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-md space-y-1">
            <span className="text-[11px] font-bold text-sky-400 uppercase">RATA PROGRESS</span>
            <div className="text-2xl font-black text-sky-400">{rataRataProgress}</div>
            <p className="text-[10px] text-sky-400">Ketuntasan Kelas</p>
          </div>
        </div>

        {/* Project Submissions & Grading Section */}
        <div className="p-6 rounded-2xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Pengumpulan Media Pembelajaran Interaktif (1 Guru 1 MPI)</span>
              </h3>
              <p className="text-xs text-slate-300">
                Lakukan review berbasis 5 aspek rubrik penilaian standar workshop.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari guru / judul..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REVISION">Revision</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Guru & Sekolah</th>
                  <th className="p-3">Judul Media & Mapel</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Versi</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Nilai</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-3">
                      <div className="font-bold text-white text-sm">{p.ownerName}</div>
                      <div className="text-[11px] text-slate-400">{p.ownerSchool}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-white truncate max-w-xs">{p.title}</div>
                      <div className="text-[11px] text-blue-300">{p.subject} • {p.grade}</div>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-400">
                      {p.mode}
                    </td>
                    <td className="p-3 font-mono font-bold text-sky-400">
                      v{p.version}
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : p.status === 'REVISION'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-white">
                      {p.score !== null ? `${p.score}/100` : '-'}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => openGradingModal(p)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 ml-auto shadow"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Nilai Rubrik</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Grading Rubric (Section 23 specification) */}
        {selectedProjectForGrading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
            <div className="bg-[#1C2541] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-5 my-8">
              <div className="flex items-start justify-between pb-3 border-b border-slate-700">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    INSTRUMEN RUBRIK PENILAIAN (TOTAL 100 POIN)
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedProjectForGrading.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Oleh: {selectedProjectForGrading.ownerName} ({selectedProjectForGrading.ownerSchool})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProjectForGrading(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 5 Rubric Sliders */}
              <div className="space-y-4 text-xs">
                {/* Aspek 1 */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span>1. Kesesuaian Tujuan Pembelajaran (Bobot: 25)</span>
                    <span className="text-amber-400 text-sm font-mono">{rubric.kesesuaianTujuan} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={rubric.kesesuaianTujuan}
                    onChange={(e) => handleRubricSlider('kesesuaianTujuan', parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Aspek 2 */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span>2. Kualitas & Ketepatan Materi (Bobot: 20)</span>
                    <span className="text-amber-400 text-sm font-mono">{rubric.kualitasMateri} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={rubric.kualitasMateri}
                    onChange={(e) => handleRubricSlider('kualitasMateri', parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Aspek 3 */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span>3. Interaktivitas Bermakna di PID (Bobot: 25)</span>
                    <span className="text-amber-400 text-sm font-mono">{rubric.interaktivitas} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={rubric.interaktivitas}
                    onChange={(e) => handleRubricSlider('interaktivitas', parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Aspek 4 */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span>4. Keterbacaan & Ergonomi PID (Bobot: 15)</span>
                    <span className="text-amber-400 text-sm font-mono">{rubric.keterbacaanPID} / 15</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={rubric.keterbacaanPID}
                    onChange={(e) => handleRubricSlider('keterbacaanPID', parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Aspek 5 */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span>5. Keterpakaian Teknis Online/Offline (Bobot: 15)</span>
                    <span className="text-amber-400 text-sm font-mono">{rubric.keterpakaianTeknis} / 15</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={rubric.keterpakaianTeknis}
                    onChange={(e) => handleRubricSlider('keterpakaianTeknis', parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Total Score & Status */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400">Total Skor Rubrik:</span>
                  <div className="text-3xl font-black text-amber-400">
                    {rubric.total} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewStatus('APPROVED')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      reviewStatus === 'APPROVED'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SETUJUI (APPROVED)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatus('REVISION')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      reviewStatus === 'REVISION'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>PERLU REVISI</span>
                  </button>
                </div>
              </div>

              {/* Feedback text */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Komentar & Catatan Perbaikan Reviewer:
                </label>
                <textarea
                  rows={3}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="Tuliskan catatan apresiasi atau perbaikan untuk peserta..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProjectForGrading(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveReview}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Simpan Penilaian Rubrik</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
