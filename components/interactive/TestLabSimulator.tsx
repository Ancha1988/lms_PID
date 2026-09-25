'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Sparkles, 
  Tv, 
  FileCheck2, 
  RotateCcw,
  Volume2
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'Visual' | 'Interaksi' | 'Pembelajaran' | 'Teknis';
  label: string;
  desc: string;
}

const CHECKLIST: ChecklistItem[] = [
  // Visual
  { id: 'v1', category: 'Visual', label: 'Teks Terbaca Jarak Jauh', desc: 'Ukuran huruf minimal 24pt, kontras tinggi, terbaca dari bangku belakang.' },
  { id: 'v2', category: 'Visual', label: 'Gambar Jelas & Proporsional', desc: 'Resolusi gambar tajam, tidak pecah di layar 4K PID.' },
  { id: 'v3', category: 'Visual', label: 'Tombol Mudah Disentuh (>=44px)', desc: 'Area tombol besar, tidak terlalu rapat, ramah jari anak SD.' },
  // Interaksi
  { id: 'i1', category: 'Interaksi', label: 'Sensor Sentuh (Touch) Bekerja Akurat', desc: 'Respon ketukan seketika tanpa jeda lag.' },
  { id: 'i2', category: 'Interaksi', label: 'Navigasi Antar Halaman Konsisten', desc: 'Tombol Sebelumnya, Berikutnya, dan Home selalu berada di posisi tetap.' },
  { id: 'i3', category: 'Interaksi', label: 'Aktivitas Manipulatif Berfungsi', desc: 'Fitur drag & drop atau matching dapat dimainkan lancar.' },
  { id: 'i4', category: 'Interaksi', label: 'Kuis Memberikan Umpan Balik', desc: 'Muncul efek visual/audio saat jawaban benar atau salah.' },
  // Pembelajaran
  { id: 'p1', category: 'Pembelajaran', label: 'Sesuai Tujuan Pembelajaran (ABCD)', desc: 'Materi tidak menyimpang dari capaian kurikulum SD.' },
  { id: 'p2', category: 'Pembelajaran', label: 'Siswa Aktif (Bukan Hanya Menonton)', desc: 'Ada tindakan konkret yang dilakukan anak di layar PID.' },
  { id: 'p3', category: 'Pembelajaran', label: 'Tersedia Asesmen Formatif', desc: 'Ada sarana cek pemahaman di akhir sesi.' },
  // Teknis
  { id: 't1', category: 'Teknis', label: 'Mode Online Berhasil Diakses', desc: 'Dapat dibuka via browser PID melalui URL atau hosting.' },
  { id: 't2', category: 'Teknis', label: 'Mode Offline (USB Flashdisk) Berhasil', desc: 'File index.html dapat dibuka luring tanpa koneksi internet.' },
];

export default function TestLabSimulator() {
  const { userProject, markActivityCompleted, showToast } = useApp();
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'v1', 'v2', 'v3', 'i1', 'i2', 'i4', 'p1', 'p2', 'p3', 't1', 't2'
  ]);
  const [simSlide, setSimSlide] = useState(1);
  const [testResult, setTestResult] = useState<'PASS' | 'NEED_REVISION'>('PASS');

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCompleteLab = () => {
    if (checkedIds.length < 10) {
      setTestResult('NEED_REVISION');
      showToast('Masih ada indikator penting yang belum dicentang. Status: NEED REVISION', 'warning');
      return;
    }
    setTestResult('PASS');
    markActivityCompleted('act-6', 'PID_MPI_PRACTITIONER');
    showToast('Selamat! MPI Anda Lolos Audit PID Test Lab (PASS)!', 'success');
  };

  const categories = ['Visual', 'Interaksi', 'Pembelajaran', 'Teknis'] as const;

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <span>PID MPI Test Lab: Audit 4 Dimensi Kelayakan</span>
          </h4>
          <p className="text-xs text-slate-300">
            Lakukan simulasi pengujian menyeluruh sebelum media pembelajaran Anda diserahkan untuk dinilai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 ${
            testResult === 'PASS' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {testResult === 'PASS' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>STATUS TEST LAB: {testResult}</span>
          </span>
        </div>
      </div>

      {/* Simulator Frame */}
      <div className="rounded-2xl border-4 border-slate-700 bg-slate-950 p-4 sm:p-6 shadow-inner space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5 font-bold text-sky-400">
            <Tv className="w-4 h-4" />
            <span>PID VIRTUAL SCREEN RUNNER (3840 x 2160 ULTRA HD)</span>
          </span>
          <span>Slide {simSlide} dari 3</span>
        </div>

        {/* Live Simulation Card */}
        <div className="w-full min-h-[220px] rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border-2 border-blue-500/40 p-6 flex flex-col justify-between text-center relative overflow-hidden">
          {simSlide === 1 && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                01 OPENING
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {userProject?.title || 'Petualangan Daur Air & Siklus Hujan'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Sentuh tombol mulai di bawah untuk memulai pembelajaran interaktif bersama siswa SD.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSimSlide(2)}
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base shadow-lg shadow-blue-600/40 transition active:scale-95"
                >
                  ▶ SENTUH UNTUK MEMULAI
                </button>
              </div>
            </div>
          )}

          {simSlide === 2 && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                02 AKTIVITAS SENTUH
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Tantangan Interaktif: Seret Awan ke Pegunungan
              </h3>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 max-w-md mx-auto flex items-center justify-around">
                <div className="text-xs font-bold text-sky-300 bg-sky-950 p-3 rounded-lg border border-sky-600 animate-pulse">
                  ☁️ Uap Air & Awan
                </div>
                <div className="text-slate-500">➔ ➔ ➔</div>
                <div className="text-xs font-bold text-emerald-300 bg-emerald-950 p-3 rounded-lg border border-emerald-600">
                  ⛰️ Puncak Bukit Hujan
                </div>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setSimSlide(1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  ← Halaman 1
                </button>
                <button
                  onClick={() => setSimSlide(3)}
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Lanjut ke Kuis →
                </button>
              </div>
            </div>
          )}

          {simSlide === 3 && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                03 KUIS ASESMEN
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Proses uap air berubah menjadi rintik hujan disebut:
              </h3>
              <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                <button 
                  onClick={() => showToast('Benar! Presipitasi (Hujan) 🎉', 'success')}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-emerald-900/60 border border-slate-700 text-xs font-bold text-slate-200"
                >
                  A. Presipitasi ✅
                </button>
                <button 
                  onClick={() => showToast('Coba lagi ya!', 'warning')}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 border border-slate-700 text-xs font-bold text-slate-200"
                >
                  B. Pembekuan
                </button>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSimSlide(1)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs"
                >
                  Ulangi Simulasi ↺
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 Dimension Checklist */}
      <div className="space-y-4">
        <h5 className="text-sm font-bold text-white flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-sky-400" />
          <span>Daftar Checklist Mandiri Guru:</span>
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const items = CHECKLIST.filter(c => c.category === cat);

            return (
              <div key={cat} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <h6 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1.5">
                  Dimensi {cat}
                </h6>
                <div className="space-y-2">
                  {items.map((item) => {
                    const isChecked = checkedIds.includes(item.id);

                    return (
                      <label
                        key={item.id}
                        className="flex items-start gap-2.5 cursor-pointer text-xs p-1.5 rounded hover:bg-slate-800/60 transition"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.id)}
                          className="mt-0.5 w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-0 accent-blue-600 cursor-pointer"
                        />
                        <div>
                          <p className={`font-bold ${isChecked ? 'text-slate-100' : 'text-slate-400'}`}>
                            {item.label}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          Terverifikasi: <strong>{checkedIds.length}</strong> dari {CHECKLIST.length} Indikator Uji
        </div>

        <button
          onClick={handleCompleteLab}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Selesaikan Pengujian Lab (Verifikasi PASS)</span>
        </button>
      </div>
    </div>
  );
}
