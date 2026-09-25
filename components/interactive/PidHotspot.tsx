'use client';

import React, { useState } from 'react';
import { 
  Tv, 
  Volume2, 
  Video, 
  Usb, 
  Layers, 
  Power, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  X 
} from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  top: string;
  left: string;
  description: string;
  teachingTip: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'screen',
    name: 'Panel Layar 4K Anti-Glare (Tempered Glass 7H)',
    category: 'Tampilan & Ketahanan',
    icon: Tv,
    top: '40%',
    left: '50%',
    description: 'Layar beresolusi Ultra HD 3840x2160 dengan lapisan kaca anti-pantulan (anti-glare) berkekuatan 7H Mohs. Aman dari goresan kuku atau benturan ringan anak SD, serta tetap sangat jernih dilihat dari sudut 178 derajat.',
    teachingTip: 'Bebas dari bayangan tubuh saat guru berdiri di depan layar, berbeda dengan proyektor lampu konvensional.'
  },
  {
    id: 'touch',
    name: 'Infrared Multi-Touch Sensor (20-40 Titik)',
    category: 'Sensor Sentuh',
    icon: Layers,
    top: '15%',
    left: '25%',
    description: 'Sensor inframerah berkecepatan tinggi tertanam di sekeliling bezel layar. Mampu mendeteksi sentuhan jari, stylus, atau objek tumpul tanpa memerlukan tekanan berat.',
    teachingTip: 'Memungkinkan 2 hingga 4 siswa maju bersamaan ke depan kelas untuk mengerjakan kuis atau menyusun teka-teki kelompok.'
  },
  {
    id: 'speaker',
    name: 'Dual High-Power Front Speakers',
    category: 'Audio',
    icon: Volume2,
    top: '82%',
    left: '20%',
    description: 'Pengeras suara stereo berdaya 2x15 Watt yang mengarah langsung ke depan ruang kelas. Menghasilkan vokal narasi dan audio pembelajaran yang jernih terdengar hingga baris meja paling belakang.',
    teachingTip: 'Manfaatkan efek suara ceria pada tombol MPI untuk memberikan umpan balik kepuasan auditori saat siswa berhasil menjawab kuis.'
  },
  {
    id: 'camera',
    name: 'Integrated 4K AI Camera & Mic Array',
    category: 'Multimedia & Komunikasi',
    icon: Video,
    top: '8%',
    left: '50%',
    description: 'Kamera bersudut lebar di bezel atas dilengkapi mikrofon peredam bising (noise-cancelling). Memudahkan pembelajaran jarak jauh, webinar, atau merekam praktik mengajar guru.',
    teachingTip: 'Bisa digunakan untuk mengamati dan menampilkan eksperimen sains siswa di meja depan ke seluruh kelas.'
  },
  {
    id: 'usb',
    name: 'Port USB 3.0 Depan (Plug & Play Flashdisk)',
    category: 'Konektivitas',
    icon: Usb,
    top: '82%',
    left: '80%',
    description: 'Port USB berkecepatan tinggi tepat di bezel depan. Guru cukup menancapkan flashdisk berisi file MPI luring (offline) tanpa perlu membungkuk mencari port di belakang perangkat.',
    teachingTip: 'Simpan file index.html paket MPI offline Anda di root flashdisk untuk akses instan satu ketukan di kelas.'
  },
  {
    id: 'power',
    name: 'Tombol Daya, Eco-Mode & Kontrol Cepat',
    category: 'Kontrol Fisik',
    icon: Power,
    top: '82%',
    left: '92%',
    description: 'Tombol fisik untuk menyalakan/mematikan layar seketika (tanpa mematikan sistem OS), pengatur volume cepat, serta tombol kembali ke Beranda sistem PID.',
    teachingTip: 'Gunakan tombol Eco/Screen Off saat Anda ingin siswa fokus sejenak pada penjelasan lisan Anda tanpa terdistraksi cahaya layar.'
  },
];

export default function PidHotspot() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [visited, setVisited] = useState<string[]>(['screen']);

  const handleSelect = (spot: Hotspot) => {
    setActiveHotspot(spot);
    if (!visited.includes(spot.id)) {
      setVisited(prev => [...prev, spot.id]);
    }
  };

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-sky-400" />
            <span>Simulasi Anatomi Papan Interaktif Digital (PID)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Ketuk titik hotspot kuning di bawah untuk membedah komponen fisik dan fungsinya.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{visited.length} dari {HOTSPOTS.length} Komponen Teridentifikasi</span>
        </div>
      </div>

      {/* Visual PID Screen Representation */}
      <div className="relative w-full aspect-[16/9] max-h-[420px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-2xl border-4 border-slate-700 p-4 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Top Camera Bar */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[10px] text-slate-400 font-mono">4K AI Camera & Mic Array</span>
        </div>

        {/* Screen Bezel & Display area */}
        <div className="flex-1 w-full rounded-xl bg-gradient-to-br from-[#0B132B] to-[#1E3A8A] border-2 border-blue-500/30 flex items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          <div className="relative z-10 max-w-md">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/30 text-sky-200 text-xs font-bold mb-2">
              LAYAR INTERAKTIF 75 INCI (3840 x 2160)
            </span>
            <p className="text-sm sm:text-base font-semibold text-white">
              Pusat Eksplorasi & Kolaborasi Siswa SD
            </p>
            <p className="text-xs text-blue-200/80 mt-1">
              Sentuh titik berkedip untuk mempelajari fungsi setiap port dan sensor
            </p>
          </div>

          {/* Hotspot buttons positioned across the interactive board */}
          {HOTSPOTS.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            const isRead = visited.includes(spot.id);

            return (
              <button
                key={spot.id}
                onClick={() => handleSelect(spot)}
                style={{ top: spot.top, left: spot.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 transition-transform ${
                  isSelected ? 'scale-125' : 'hover:scale-110'
                }`}
                aria-label={spot.name}
              >
                <div className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-xs shadow-lg transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110'
                    : isRead
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                    : 'bg-amber-500 text-slate-950 ring-2 ring-white animate-pulse'
                }`}>
                  <spot.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="hidden sm:block absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-950/90 text-slate-200 border border-slate-700 pointer-events-none shadow-md">
                  {spot.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Speaker Bar & Ports */}
        <div className="mt-3 flex items-center justify-between px-2 pt-2 border-t border-slate-700/80 text-[11px] text-slate-400 font-mono">
          <span>STEREO AUDIO BAR (L)</span>
          <span className="text-blue-400 font-bold">PID HARDWARE ARCHITECTURE</span>
          <span>FRONT USB 3.0 / POWER (R)</span>
        </div>
      </div>

      {/* Detail info card for selected hotspot */}
      {activeHotspot && (
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-blue-500/40 text-white animate-in fade-in slide-in-from-bottom-2 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-sky-400 flex-shrink-0">
                <activeHotspot.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {activeHotspot.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {activeHotspot.name}
                </h4>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeHotspot.description}
          </p>

          <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-start gap-2.5 text-xs text-sky-200">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Tips Pembelajaran di SD:</strong>{' '}
              {activeHotspot.teachingTip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
