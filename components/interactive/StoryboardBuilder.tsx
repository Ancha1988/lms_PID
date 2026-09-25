'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StoryboardPage, PageType } from '@/types';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  MoveUp, 
  MoveDown, 
  CheckCircle2, 
  Edit3, 
  Save, 
  ChevronRight,
  Tv
} from 'lucide-react';

const PAGE_TYPES: PageType[] = [
  'Opening',
  'Tujuan',
  'Materi',
  'Gambar',
  'Video',
  'Audio',
  'Aktivitas',
  'Drag & Drop',
  'Matching',
  'Multiple Choice',
  'True/False',
  'Refleksi',
  'Penutup',
];

const INITIAL_STORYBOARD: StoryboardPage[] = [
  { id: 'sb-1', pageNumber: 1, type: 'Opening', title: '01 OPENING: Judul Media & Tombol Mulai', content: 'Tampilan pembuka yang memikat anak SD, nama guru, kelas, dan tombol sentuh besar "MULAI".', interactionType: 'Tap tombol Mulai' },
  { id: 'sb-2', pageNumber: 2, type: 'Tujuan', title: '02 TUJUAN: Indikator Pembelajaran', content: 'Tujuan pembelajaran disajikan dengan bahasa ramah anak dan ikon visual.', interactionType: 'Tap ikon untuk mendengar narasi' },
  { id: 'sb-3', pageNumber: 3, type: 'Materi', title: '03 MATERI: Konsep Kunci Bertahap', content: 'Materi esensial disajikan per paragraf singkat dengan gambar kontras tinggi.', interactionType: 'Swipe atau Tap Selanjutnya' },
  { id: 'sb-4', pageNumber: 4, type: 'Aktivitas', title: '04 EKSPLORASI: Simulasi Interaktif', content: 'Siswa memanipulasi variabel visual untuk mengamati reaksi konsep secara langsung.', interactionType: 'Sentuh Hotspot / Slider simulasi' },
  { id: 'sb-5', pageNumber: 5, type: 'Drag & Drop', title: '05 AKTIVITAS: Tantangan Kinestetik Sentuh', content: 'Dua siswa berkolaborasi menyeret objek ke zona yang tepat di layar PID.', interactionType: 'Drag & Drop multi-touch' },
  { id: 'sb-6', pageNumber: 6, type: 'Matching', title: '06 LATIHAN: Penguatan Pemahaman', content: 'Menghubungkan istilah dengan contoh konkret sehari-hari.', interactionType: 'Tarik garis sentuh / Match' },
  { id: 'sb-7', pageNumber: 7, type: 'Multiple Choice', title: '07 KUIS: Asesmen Cepat Bermakna', content: '3-5 soal kuis dengan efek suara ceria dan skor instan.', interactionType: 'Tap pilihan jawaban A/B/C/D' },
  { id: 'sb-8', pageNumber: 8, type: 'Refleksi', title: '08 REFLEKSI: Emotikon & Kesimpulan', content: 'Siswa memilih emotikon perasaan belajar hari ini dan rangkuman bersama guru.', interactionType: 'Tap emotikon bintang/senyum' },
];

export default function StoryboardBuilder() {
  const { showToast } = useApp();
  const [pages, setPages] = useState<StoryboardPage[]>(INITIAL_STORYBOARD);
  const [editingIndex, setEditingIndex] = useState<number | null>(0);

  const handleAddPage = () => {
    const newPageNum = pages.length + 1;
    const newPage: StoryboardPage = {
      id: `sb-${Date.now()}`,
      pageNumber: newPageNum,
      type: 'Aktivitas',
      title: `${String(newPageNum).padStart(2, '0')} Halaman Baru: Aktivitas Tambahan`,
      content: 'Deskripsi materi atau aktivitas yang akan ditampilkan pada slide ini.',
      interactionType: 'Tap interaksi sentuh',
    };
    setPages(prev => [...prev, newPage]);
    setEditingIndex(pages.length);
    showToast('Halaman baru ditambahkan ke Storyboard', 'info');
  };

  const handleDeletePage = (index: number) => {
    if (pages.length <= 3) {
      showToast('Storyboard minimal memiliki 3 halaman dasar', 'warning');
      return;
    }
    const updated = pages.filter((_, i) => i !== index).map((p, i) => ({
      ...p,
      pageNumber: i + 1,
    }));
    setPages(updated);
    setEditingIndex(Math.min(editingIndex ?? 0, updated.length - 1));
    showToast('Halaman dihapus dari Storyboard', 'info');
  };

  const handleUpdatePage = (index: number, field: keyof StoryboardPage, value: any) => {
    setPages(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const activePage = editingIndex !== null ? pages[editingIndex] : null;

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            <span>Storyboard Builder: Alur 8 Halaman Media PID</span>
          </h4>
          <p className="text-xs text-slate-300">
            Rangkaian halaman media dari pembuka, pemantik, materi, interaksi, hingga refleksi akhir.
          </p>
        </div>

        <button
          onClick={handleAddPage}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Halaman</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Slides List */}
        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {pages.map((p, index) => {
            const isSelected = editingIndex === index;

            return (
              <div
                key={p.id}
                onClick={() => setEditingIndex(index)}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-400 ring-2 ring-blue-400/40 text-white'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-sky-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                    {p.pageNumber}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-bold truncate">{p.title}</p>
                    <span className="text-[10px] text-blue-300 font-semibold px-1.5 py-0.5 rounded bg-blue-900/60 inline-block">
                      {p.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(index);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                    title="Hapus Halaman"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Slide Editor */}
        {activePage && editingIndex !== null ? (
          <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400">
                Mengedit Halaman #{activePage.pageNumber}
              </span>
              <span className="text-xs text-slate-400">
                Tipe Interaksi: {activePage.type}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Halaman:
                </label>
                <input
                  type="text"
                  value={activePage.title}
                  onChange={(e) => handleUpdatePage(editingIndex, 'title', e.target.value)}
                  className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tipe Halaman:
                </label>
                <select
                  value={activePage.type}
                  onChange={(e) => handleUpdatePage(editingIndex, 'type', e.target.value as PageType)}
                  className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {PAGE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Deskripsi Konten & Teks yang Ditampilkan pada Layar PID:
              </label>
              <textarea
                rows={4}
                value={activePage.content}
                onChange={(e) => handleUpdatePage(editingIndex, 'content', e.target.value)}
                className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Bentuk Interaksi Sentuh (Touch / Drag / Tap / Matching):
              </label>
              <input
                type="text"
                value={activePage.interactionType}
                onChange={(e) => handleUpdatePage(editingIndex, 'interactionType', e.target.value)}
                placeholder="Contoh: Drag & drop potongan gambar ke diagram"
                className="w-full bg-[#1C2541] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Perubahan tersimpan otomatis</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 p-8 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
            Pilih halaman di sisi kiri untuk mulai mengedit detail slide.
          </div>
        )}
      </div>
    </div>
  );
}
