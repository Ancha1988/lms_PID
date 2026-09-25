'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  Loader2, 
  Lightbulb,
  FileText
} from 'lucide-react';

export default function MpiCanvasEditor() {
  const { canvasData, saveCanvasData, markActivityCompleted, currentUser } = useApp();
  const [formData, setFormData] = useState({
    ...canvasData,
    teacherName: canvasData.teacherName || currentUser.name,
    school: canvasData.school || currentUser.school,
  });
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCanvasData(formData);
    markActivityCompleted('act-4', 'MPI_DESIGNER');
  };

  const requestAiObjective = async () => {
    setIsLoadingAi(true);
    setAiSuggestions(null);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-objective',
          subject: formData.subject,
          grade: formData.grade,
          topic: formData.topic,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiSuggestions(data.text || data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const applyAiText = (text: string) => {
    handleChange('learningObjective', text);
    setAiSuggestions(null);
  };

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <PenTool className="w-5 h-5 text-amber-400" />
            <span>Lembar Kerja: MPI Canvas (Instructional Blueprint)</span>
          </h4>
          <p className="text-xs text-slate-300">
            Fondasi pedagogis media pembelajaran interaktif Anda sebelum masuk ke tahap produksi visual.
          </p>
        </div>

        <button
          type="button"
          onClick={requestAiObjective}
          disabled={isLoadingAi}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition"
        >
          {isLoadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
          <span>{isLoadingAi ? 'AI Co-Designer Merumuskan...' : 'AI Co-Designer: Inspirasi Tujuan'}</span>
        </button>
      </div>

      {/* AI Suggestions Box */}
      {aiSuggestions && (
        <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/50 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-200">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Rekomendasi Rumusan Tujuan Interaktif dari AI Co-Designer:</span>
          </div>
          <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-purple-900">
            {aiSuggestions}
          </div>
          <p className="text-[11px] text-slate-400 italic">
            *AI sebagai co-designer, guru tetap sebagai instructional designer pemegang keputusan akhir.
          </p>
        </div>
      )}

      {/* 9 Form Fields */}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">1. Nama Guru:</label>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) => handleChange('teacherName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">2. Sekolah / Satuan Pendidikan:</label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => handleChange('school', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">3. Mata Pelajaran:</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">4. Kelas SD:</label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => handleChange('grade', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">5. Topik Materi:</label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            6. Rumusan Tujuan Pembelajaran (ABCD - Berorientasi Interaktif PID):
          </label>
          <textarea
            rows={2}
            value={formData.learningObjective}
            onChange={(e) => handleChange('learningObjective', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            7. Masalah Pembelajaran yang Ingin Diatasi di Kelas:
          </label>
          <textarea
            rows={2}
            value={formData.learningProblem}
            onChange={(e) => handleChange('learningProblem', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              8. Aktivitas Interaktif Sentuh di PID:
            </label>
            <textarea
              rows={3}
              value={formData.interactiveActivity}
              onChange={(e) => handleChange('interactiveActivity', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              9. Bentuk Asesmen / Evaluasi di PID:
            </label>
            <textarea
              rows={3}
              value={formData.assessmentForm}
              onChange={(e) => handleChange('assessmentForm', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/60">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Otomatis disimpan & disinkronkan ke Storyboard</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Rancangan MPI Canvas</span>
          </button>
        </div>
      </form>
    </div>
  );
}
