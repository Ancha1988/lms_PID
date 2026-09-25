'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/types';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface QuizEngineProps {
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
  passingScore?: number;
  onComplete: (score: number, passed: boolean) => void;
  isPreTest?: boolean;
}

export default function QuizEngine({
  title,
  subtitle,
  questions,
  passingScore = 70,
  onComplete,
  isPreTest = false,
}: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const finishQuiz = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQ) * 100);
    const passed = isPreTest ? true : score >= passingScore;
    onComplete(score, passed);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setShowExplanation(false);
  };

  // Stats calculation
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });
  const finalScore = Math.round((correctCount / totalQ) * 100);
  const isPassed = isPreTest ? true : finalScore >= passingScore;

  if (isSubmitted) {
    return (
      <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-6 shadow-xl text-center space-y-6">
        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-xl ${
          isPassed 
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30' 
            : 'bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-rose-500/30'
        }`}>
          {isPassed ? '🏆' : '💪'}
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {isPreTest ? 'HASIL PRE-TEST EVALUASI AWAL' : 'HASIL KUIS INTERAKTIF'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Skor Anda: <span className={isPassed ? 'text-emerald-400' : 'text-amber-400'}>{finalScore}%</span>
          </h3>
          <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
            {isPreTest
              ? 'Terima kasih telah menuntaskan pre-test! Pemahaman awal ini menjadi acuan untuk melihat perkembangan belajar Anda setelah seluruh materi selesai.'
              : isPassed
              ? `Luar biasa! Anda melampaui passing grade (${passingScore}%) dan siap melangkah ke tahap pembelajaran berikutnya.`
              : `Skor Anda belum mencapai ambang kelulusan minimal (${passingScore}%). Silakan pelajari kembali materi dan coba lagi!`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-slate-400">Total Soal</span>
            <p className="text-lg font-bold text-white">{totalQ}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-emerald-400">Benar</span>
            <p className="text-lg font-bold text-emerald-400">{correctCount}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-rose-400">Salah</span>
            <p className="text-lg font-bold text-rose-400">{totalQ - correctCount}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-amber-400">Status</span>
            <p className="text-lg font-bold text-amber-400">{isPassed ? 'LULUS' : 'RETRY'}</p>
          </div>
        </div>

        {/* Detailed answer review */}
        <div className="space-y-4 max-w-2xl mx-auto text-left pt-4 border-t border-slate-700/60">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Pembahasan Kunci & Penjelasan Pedagogis:</span>
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-300">
                      #{idx + 1}. {q.question}
                    </span>
                    <span className="text-xs">{isCorrect ? '✅' : '❌'}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <div>Pilihan Anda: <span className="font-semibold text-white">{q.options[userAns] ?? 'Belum dijawab'}</span></div>
                    {!isCorrect && (
                      <div className="text-emerald-400 mt-1">
                        Kunci Jawaban: <span className="font-semibold">{q.options[q.correctAnswer as number]}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-blue-200/90 bg-blue-950/50 p-2.5 rounded-lg border border-blue-900">
                    <strong>Penjelasan:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          {!isPassed && !isPreTest && (
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi (Try Again)</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const selectedOpt = selectedAnswers[currentIndex];
  const isLastQuestion = currentIndex === totalQ - 1;

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {isPreTest ? 'PRE-TEST EVALUASI AWAL' : 'KUIS EVALUASI FORMATIF'}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
            {title}
          </h4>
          {subtitle && <p className="text-xs text-slate-300">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">
            Soal {currentIndex + 1} dari {totalQ}
          </span>
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {currentQ.pidTip && (
          <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-500/30 flex items-start gap-2.5 text-xs text-sky-200">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Tips PID:</strong> {currentQ.pidTip}
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400/40 shadow-md'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{opt}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'border-white bg-white text-blue-600' : 'border-slate-600'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold"
        >
          ← Sebelumnya
        </button>

        <button
          onClick={handleNext}
          disabled={selectedOpt === undefined}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 ${
            selectedOpt !== undefined
              ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:opacity-90'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>{isLastQuestion ? 'Selesai & Kumpulkan' : 'Lanjut Soal Berikutnya'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
