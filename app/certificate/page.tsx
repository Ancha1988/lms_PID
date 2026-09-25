'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { WORKSHOP_META } from '@/data/workshopData';
import confetti from 'canvas-confetti';
import { 
  FileCheck2, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CertificatePage() {
  const { 
    currentUser, 
    progress, 
    userProject, 
    certificate, 
    generateCertificate, 
    checkCertificateEligibility 
  } = useApp();

  const isEligible = (
    progress.preTestCompleted &&
    progress.completedModules.length >= 6 &&
    (userProject?.status === 'APPROVED' || progress.mpiApproved)
  );

  const [activeCert, setActiveCert] = useState(() => {
    if (certificate) return certificate;
    if (progress.preTestCompleted && progress.completedModules.length >= 6 && (userProject?.status === 'APPROVED' || progress.mpiApproved)) {
      return {
        id: `cert-${currentUser.uid}`,
        certificateNumber: 'PID-2026-0012',
        userId: currentUser.uid,
        userName: currentUser.name,
        userSchool: currentUser.school,
        workshopTitle: WORKSHOP_META.title + ' — ' + WORKSHOP_META.subtitle,
        durationText: WORKSHOP_META.durationLabel,
        issueDate: '24 September 2026',
        narasumber: WORKSHOP_META.narasumber,
        instansi: WORKSHOP_META.instansi,
        verified: true,
        verificationUrl: 'https://pidlab.id/verify/PID-2026-0012',
      };
    }
    return null;
  });

  const handlePrint = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    window.print();
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16">
        {/* Header - Hidden during print */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              DOKUMEN RESMI KELULUSAN
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Sertifikat Workshop PID Learning Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Sertifikat resmi kompetensi workshop 2,5 Jam pemanfaatan papan interaktif digital sebagai media pembelajaran SD.
            </p>
          </div>

          {isEligible && (
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          )}
        </div>

        {/* Certificate View */}
        {isEligible ? (
          <div className="space-y-6">
            {/* The Certificate Frame */}
            <div className="cert-container relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-gradient-to-br from-amber-50/95 via-white to-amber-50/90 text-slate-900 rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-amber-600/80 flex flex-col justify-between overflow-hidden text-center select-none">
              {/* Inner Decorative Border */}
              <div className="absolute inset-3 border-2 border-amber-700/40 rounded-2xl pointer-events-none" />
              <div className="absolute inset-5 border border-dashed border-amber-500/30 rounded-xl pointer-events-none" />

              {/* Watermark Logo Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none text-[220px] font-black font-serif">
                PID
              </div>

              {/* Top Header */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-center gap-2 text-amber-800 font-extrabold text-xs tracking-widest uppercase">
                  <span>★ BALAI PENGEMBANGAN TEKNOLOGI PENDIDIKAN & DISDIKBUD ★</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-wide text-blue-950 uppercase pt-1">
                  SERTIFIKAT PELATIHAN
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 mx-auto rounded-full mt-1" />
                <p className="text-xs sm:text-sm font-mono text-slate-600 pt-1">
                  Nomor Sertifikat: <strong className="text-blue-900">{activeCert?.certificateNumber || 'PID-2026-0012'}</strong>
                </p>
              </div>

              {/* Recipient Section */}
              <div className="relative z-10 my-4 sm:my-6 space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 italic">
                  Diberikan dengan hormat kepada:
                </p>
                <h3 className="text-2xl sm:text-4xl font-serif font-black text-blue-950 border-b-2 border-slate-300 pb-2 inline-block px-8">
                  {currentUser.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-700 pt-1">
                  {currentUser.school}
                </p>
              </div>

              {/* Workshop Title & Statement */}
              <div className="relative z-10 space-y-2 max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Atas partisipasi aktif dan keberhasilan menyelesaikan seluruh tahapan pelatihan, perancangan, dan produksi media pembelajaran interaktif pada:
                </p>
                <div className="p-3 bg-blue-950/5 rounded-xl border border-blue-950/10">
                  <h4 className="text-sm sm:text-base font-extrabold text-blue-950 uppercase">
                    WORKSHOP PEMANFAATAN PAPAN INTERAKTIF DIGITAL (PID)
                    <br />
                    SEBAGAI MEDIA PEMBELAJARAN SD
                  </h4>
                  <p className="text-xs text-amber-800 font-bold mt-1">
                    Durasi Efektif Pelatihan: 2,5 Jam (150 Menit)
                  </p>
                </div>
              </div>

              {/* Signatures & Seal Bottom */}
              <div className="relative z-10 pt-6 flex items-end justify-between px-4 sm:px-8 text-xs">
                {/* Left: Date & Location */}
                <div className="text-left space-y-1">
                  <p className="text-slate-600">Diterbitkan pada:</p>
                  <p className="font-bold text-slate-900">
                    {activeCert?.issueDate || '24 September 2026'}
                  </p>
                  <div className="pt-2 text-[10px] text-slate-500 font-mono">
                    Verifikasi Online: pidlab.id/verify
                  </div>
                </div>

                {/* Center: Official Gold Seal */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-4 border-amber-300/80 shadow-lg flex items-center justify-center text-slate-950 font-serif font-black text-center text-[9px] uppercase leading-tight p-2">
                  RESMI
                  <br />
                  TERVERIFIKASI
                  <br />
                  LMS SD
                </div>

                {/* Right: Narasumber Signature */}
                <div className="text-right space-y-1">
                  <p className="text-slate-600">Narasumber & Fasilitator:</p>
                  <div className="font-serif italic text-lg sm:text-xl font-bold text-blue-950 pt-2">
                    {WORKSHOP_META.narasumber.split('&')[0]}
                  </div>
                  <div className="w-40 border-b border-slate-400 ml-auto" />
                  <p className="font-bold text-slate-800 text-[11px] pt-0.5">
                    Ketua Tim Inovasi EdTech SD
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State - Requirements Not Met Yet (Section 40 specification) */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#1C2541] border border-slate-700/80 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-4xl mx-auto">
              📜
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Sertifikat Belum Tersedia
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sertifikat akan otomatis tersedia setelah seluruh persyaratan workshop berikut terpenuhi:
              </p>
            </div>

            {/* Checklist items */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <span className={progress.preTestCompleted ? 'text-emerald-400' : 'text-slate-500'}>
                  {progress.preTestCompleted ? '✅' : '⚪'}
                </span>
                <span className={progress.preTestCompleted ? 'text-slate-200 font-semibold' : 'text-slate-400'}>
                  1. Menyelesaikan Pre-Test Evaluasi Awal
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={progress.completedModules.length >= 6 ? 'text-emerald-400' : 'text-slate-500'}>
                  {progress.completedModules.length >= 6 ? '✅' : '⚪'}
                </span>
                <span className={progress.completedModules.length >= 6 ? 'text-slate-200 font-semibold' : 'text-slate-400'}>
                  2. Menyelesaikan Seluruh Modul (1 sampai 6) ({progress.completedModules.length}/6 Selesai)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={userProject?.status === 'APPROVED' || progress.mpiApproved ? 'text-emerald-400' : 'text-slate-500'}>
                  {userProject?.status === 'APPROVED' || progress.mpiApproved ? '✅' : '⚪'}
                </span>
                <span className={userProject?.status === 'APPROVED' || progress.mpiApproved ? 'text-slate-200 font-semibold' : 'text-slate-400'}>
                  3. Mengumpulkan Proyek 1 Guru 1 MPI & Disetujui Reviewer
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/workshop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md transition"
              >
                <span>Lanjutkan Menyelesaikan Modul</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
