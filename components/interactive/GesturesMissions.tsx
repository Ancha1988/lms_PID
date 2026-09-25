'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  MousePointerClick, 
  Move, 
  ZoomIn, 
  Sliders, 
  Volume2, 
  SunMedium, 
  Home, 
  RotateCcw 
} from 'lucide-react';

export default function GesturesMissions() {
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [dragProgress, setDragProgress] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [sliderVol, setSliderVol] = useState(65);

  const markMission = (id: string) => {
    if (!completedMissions.includes(id)) {
      setCompletedMissions(prev => [...prev, id]);
    }
  };

  const handleTap = () => {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 2) {
      markMission('m1-tap');
    }
  };

  const handleDragDrop = () => {
    setDragProgress(true);
    markMission('m2-drag');
  };

  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setZoomLevel(val);
    if (val >= 1.6 || val <= 0.7) {
      markMission('m3-zoom');
    }
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderVol(parseInt(e.target.value));
    markMission('m4-sys');
  };

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-400" />
            <span>Misi Interaktif: Simulasi Gestur & Navigasi PID</span>
          </h4>
          <p className="text-xs text-slate-300">
            Cobalah 4 gestur sentuh berikut layaknya Anda berdiri langsung di hadapan layar sentuh PID.
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-300">
          {completedMissions.length} dari 4 Misi Gestur Berhasil
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Misi 1: Tap & Double Tap */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedMissions.includes('m1-tap')
            ? 'bg-slate-900/90 border-emerald-500/60'
            : 'bg-slate-900/70 border-slate-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <MousePointerClick className="w-4 h-4" />
              <span>Misi 1: Tap & Double Tap</span>
            </span>
            {completedMissions.includes('m1-tap') && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Ketuk tombol di bawah 2 kali secara cepat untuk mensimulasikan pembukaan berkas di PID.
          </p>
          <div className="flex items-center justify-center py-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <button
              onClick={handleTap}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-sm shadow-md active:scale-95 transition"
            >
              👉 Ketuk Saya ({tapCount}/2)
            </button>
          </div>
        </div>

        {/* Misi 2: Drag and Drop */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedMissions.includes('m2-drag')
            ? 'bg-slate-900/90 border-emerald-500/60'
            : 'bg-slate-900/70 border-slate-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Move className="w-4 h-4" />
              <span>Misi 2: Drag & Drop (Sentuh & Geser)</span>
            </span>
            {completedMissions.includes('m2-drag') && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Seret atau klik ikon kartu ke dalam zona target hijau.
          </p>
          <div className="flex items-center justify-around py-3 bg-slate-950/60 rounded-xl border border-slate-800">
            {!dragProgress ? (
              <button
                onClick={handleDragDrop}
                className="px-4 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow cursor-grab active:cursor-grabbing hover:scale-105 transition"
              >
                📦 Objek Materi (Klik/Seret)
              </button>
            ) : (
              <span className="text-xs text-slate-500 line-through">Objek Awal</span>
            )}
            <div className={`p-3 rounded-xl border-2 border-dashed flex items-center justify-center text-xs font-bold transition ${
              dragProgress 
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300' 
                : 'border-slate-600 text-slate-400'
            }`}>
              {dragProgress ? '✅ Objek Berhasil Masuk Zona Target!' : '🎯 Zona Drop Sasaran'}
            </div>
          </div>
        </div>

        {/* Misi 3: Zoom In / Pinch */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedMissions.includes('m3-zoom')
            ? 'bg-slate-900/90 border-emerald-500/60'
            : 'bg-slate-900/70 border-slate-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4" />
              <span>Misi 3: Zooming & Skala Tampilan</span>
            </span>
            {completedMissions.includes('m3-zoom') && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Geser skala pembesaran di bawah (mensimulasikan gestur cubit 2 jari pada diagram PID).
          </p>
          <div className="py-2 bg-slate-950/60 rounded-xl border border-slate-800 px-4 space-y-2 text-center">
            <div className="h-14 flex items-center justify-center overflow-hidden">
              <span 
                className="font-extrabold text-blue-400 transition-transform duration-150 inline-block"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                🔬 DIAGRAM SEL TUMBUHAN
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.0"
              step="0.1"
              value={zoomLevel}
              onChange={handleZoom}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400 font-mono">Skala: {Math.round(zoomLevel * 100)}%</div>
          </div>
        </div>

        {/* Misi 4: Quick Nav & Volume Slider */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedMissions.includes('m4-sys')
            ? 'bg-slate-900/90 border-emerald-500/60'
            : 'bg-slate-900/70 border-slate-700'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" />
              <span>Misi 4: Menu Cepat Volume & Brightness PID</span>
            </span>
            {completedMissions.includes('m4-sys') && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Sesuaikan volume suara PID untuk mendukung audio video pembelajaran.
          </p>
          <div className="py-3 bg-slate-950/60 rounded-xl border border-slate-800 px-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1"><Volume2 className="w-3.5 h-3.5 text-teal-400" /> Audio PID</span>
              <span className="font-mono font-bold text-teal-300">{sliderVol}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVol}
              onChange={handleSlider}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
