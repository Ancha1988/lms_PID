'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  HelpCircle,
  Presentation,
  Compass,
  Users2,
  ListChecks,
  MonitorPlay
} from 'lucide-react';

const SCENARIOS = [
  {
    id: 's1',
    title: 'A. Presentasi Interaktif',
    icon: Presentation,
    desc: 'Guru menyajikan materi dengan visual memukau, mengajak siswa menekan hotspot interaktif untuk mengungkap konsep kunci.',
  },
  {
    id: 's2',
    title: 'B. Demonstrasi Simulasi',
    icon: MonitorPlay,
    desc: 'Guru memperagakan fenomena abstrak (misal: gravitasi, gerak lempeng bumi, atau operasi hitung) secara dinamis.',
  },
  {
    id: 's3',
    title: 'C. Eksplorasi Terbimbing',
    icon: Compass,
    desc: 'Siswa maju mencoba simulasi secara mandiri untuk menemukan pola dan hipotesis pembelajaran.',
  },
  {
    id: 's4',
    title: 'D. Kolaborasi Multi-Touch',
    icon: Users2,
    desc: 'Dua sampai empat anak berkolaborasi menyusun peta, mengelompokkan hewan, atau memecahkan teka-teki bersamaan di layar.',
  },
  {
    id: 's5',
    title: 'E. Asesmen Cepat Bermakna',
    icon: ListChecks,
    desc: 'Kuis interaktif gamifikasi dengan umpan balik visual dan audio instan untuk cek ketuntasan kelas.',
  },
];

const SUBJECTS = [
  'IPAS (Ilmu Pengetahuan Alam & Sosial)',
  'Matematika',
  'Bahasa Indonesia',
  'Pendidikan Pancasila',
  'Seni Budaya',
  'PJOK (Pendidikan Jasmani & Kesehatan)',
];

export default function ScenarioPlanner() {
  const { markActivityCompleted, showToast } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [selectedScenario, setSelectedScenario] = useState('C. Eksplorasi Terbimbing');
  const [topicName, setTopicName] = useState('Daur Air dan Siklus Presipitasi');
  const [interactiveIdea, setInteractiveIdea] = useState(
    'Siswa maju berpasangan di layar sentuh PID untuk menyeret ikon uap air dan awan menuju ketinggian atmosfer, lalu mengamati pembentukan titik embun secara simulatif.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    markActivityCompleted('act-3', 'PID_PRACTITIONER');
    showToast('Rancangan Skenario Pembelajaran Berhasil Disimpan!', 'success');
  };

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div>
        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          <span>5 Skenario Interaktivitas PID di Kelas SD</span>
        </h4>
        <p className="text-xs text-slate-300">
          Kenali 5 pola integrasi pedagogis sentuhan dan rancang 1 aktivitas interaktif untuk kelas Anda.
        </p>
      </div>

      {/* 5 Scenario Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SCENARIOS.map((sc) => {
          const Icon = sc.icon;
          const isSelected = selectedScenario.startsWith(sc.title.split('.')[0]);

          return (
            <div
              key={sc.id}
              onClick={() => setSelectedScenario(sc.title)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-900/40 border-blue-400 ring-2 ring-blue-500/30 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-sky-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-white">{sc.title}</h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{sc.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Activity Form */}
      <form onSubmit={handleSave} className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-4">
        <h5 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Aktivitas: Rancang Skenario Interaktif untuk Kelas Anda</span>
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Pilih Mata Pelajaran SD:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Pola Skenario Utama:
            </label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {SCENARIOS.map((sc) => (
                <option key={sc.id} value={sc.title}>{sc.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Topik Pembelajaran:
          </label>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="Contoh: Pecahan Senilai, Daur Hidup Kupu-kupu, dsb."
            className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Deskripsi Aktivitas Sentuh di Layar PID (Apa yang dilakukan siswa?):
          </label>
          <textarea
            rows={3}
            value={interactiveIdea}
            onChange={(e) => setInteractiveIdea(e.target.value)}
            className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isSaved ? '✓ Tersimpan di Firestore/Profil Workshop Anda' : 'Data otomatis disimpan'}
          </span>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Skenario Pembelajaran</span>
          </button>
        </div>
      </form>
    </div>
  );
}
