'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, RotateCcw, Award, ArrowRight, HelpCircle } from 'lucide-react';

interface Pair {
  id: string;
  component: string;
  functionDesc: string;
}

const PAIRS: Pair[] = [
  {
    id: 'p1',
    component: 'Sensor Multi-Touch Infrared',
    functionDesc: 'Mendeteksi sentuhan banyak jari atau stylus secara simultan di sekeliling bingkai layar tanpa memerlukan tekanan keras'
  },
  {
    id: 'p2',
    component: 'Port USB 3.0 Bezel Depan',
    functionDesc: 'Memungkinkan guru mencolokkan flashdisk berkas MPI offline secara langsung tanpa perlu merogoh belakang perangkat'
  },
  {
    id: 'p3',
    component: 'Kaca Tempered Anti-Glare 7H',
    functionDesc: 'Mencegah pantulan cahaya lampu kelas dan melindungi panel dari goresan fisik kuku atau alat tulis siswa'
  },
  {
    id: 'p4',
    component: 'Dual Stereo Front Speakers',
    functionDesc: 'Menyampaikan narasi audio, musik, dan efek suara interaktif secara lantang langsung ke arah tempat duduk siswa'
  },
  {
    id: 'p5',
    component: 'Floating Annotation Bar',
    functionDesc: 'Menyediakan pena digital cepat untuk mencorat-coret penjelasan di atas materi apa pun yang sedang tayang'
  }
];

export default function ComponentMatching() {
  const { markActivityCompleted } = useApp();
  const [selectedComp, setSelectedComp] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Shuffle definitions
  const [shuffledFuncs] = useState(() => {
    return [...PAIRS].sort(() => Math.random() - 0.5);
  });

  const handleCompClick = (compId: string) => {
    if (isSubmitted) return;
    setSelectedComp(compId);
  };

  const handleFuncClick = (funcId: string) => {
    if (isSubmitted || !selectedComp) return;
    setMatches(prev => ({
      ...prev,
      [selectedComp]: funcId
    }));
    setSelectedComp(null);
  };

  const handleReset = () => {
    setMatches({});
    setIsSubmitted(false);
    setSelectedComp(null);
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    PAIRS.forEach(p => {
      if (matches[p.id] === p.id) {
        correctCount++;
      }
    });

    if (correctCount >= 4) {
      markActivityCompleted('act-1');
    }
  };

  const correctCount = PAIRS.filter(p => matches[p.id] === p.id).length;
  const isAllAnswered = Object.keys(matches).length === PAIRS.length;

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Aktivitas Mencocokkan: Komponen PID ➔ Fungsi Tepat</span>
          </h4>
          <p className="text-xs text-slate-300">
            Klik nama komponen di sisi kiri, kemudian klik fungsi yang sesuai di sisi kanan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Kolom Komponen */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-sky-400">
            1. Pilih Komponen PID:
          </h5>
          <div className="space-y-2.5">
            {PAIRS.map((item) => {
              const isSelected = selectedComp === item.id;
              const hasMatch = Boolean(matches[item.id]);
              const isCorrect = isSubmitted && matches[item.id] === item.id;
              const isWrong = isSubmitted && matches[item.id] !== item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleCompClick(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-2 ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : isWrong
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                      : isSelected
                      ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400/50 scale-[1.02]'
                      : hasMatch
                      ? 'bg-slate-800/90 border-blue-500/50 text-blue-200'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{item.component}</span>
                  {hasMatch && !isSubmitted && (
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                      Terhubung
                    </span>
                  )}
                  {isSubmitted && (
                    <span>{isCorrect ? '✅' : '❌'}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kolom Fungsi */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            2. Pasangkan ke Fungsinya:
          </h5>
          <div className="space-y-2.5">
            {shuffledFuncs.map((item) => {
              const matchedCompKey = Object.keys(matches).find(k => matches[k] === item.id);
              const matchedComp = PAIRS.find(p => p.id === matchedCompKey);

              return (
                <button
                  key={item.id}
                  onClick={() => handleFuncClick(item.id)}
                  disabled={isSubmitted || !selectedComp}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex flex-col gap-1.5 ${
                    !selectedComp && !matchedCompKey
                      ? 'bg-slate-900/50 border-slate-800 text-slate-400 cursor-not-allowed'
                      : selectedComp
                      ? 'bg-slate-900 border-amber-500/50 text-slate-200 hover:bg-amber-500/10 cursor-pointer'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="leading-relaxed">{item.functionDesc}</p>
                  {matchedComp && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded self-start">
                      <ArrowRight className="w-3 h-3" />
                      <span>{matchedComp.component}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          {isSubmitted ? (
            <span className="font-bold text-amber-300">
              Hasil: {correctCount} dari {PAIRS.length} Pasangan Benar!
            </span>
          ) : (
            <span>
              Terpasang: {Object.keys(matches).length} dari {PAIRS.length}
            </span>
          )}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={!isAllAnswered}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-md ${
              isAllAnswered
                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:opacity-90'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Periksa Jawaban Saya
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {correctCount >= 4 ? (
              <span className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Aktivitas Modul 1 Tuntas!</span>
              </span>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold"
              >
                Coba Lagi untuk Menyempurnakan
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
