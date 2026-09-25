'use client';

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useApp } from '@/context/AppContext';
import { 
  User, 
  School, 
  Mail, 
  ShieldCheck, 
  Tv, 
  Monitor, 
  AlertCircle, 
  Save, 
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export default function ProfilePage() {
  const { 
    currentUser, 
    setCurrentUser, 
    switchUserRole, 
    pidMode, 
    togglePidMode, 
    isDemoMode, 
    showToast 
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [school, setSchool] = useState(currentUser.school);
  const [email, setEmail] = useState(currentUser.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      school,
      email,
    });
    try {
      localStorage.setItem('pid_current_user', JSON.stringify({ ...currentUser, name, school, email }));
    } catch (e) {}
    showToast('Profil pengguna berhasil diperbarui!', 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            PENGATURAN AKUN PESERTA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Profil Guru & Pengaturan
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Kelola data diri, sekolah tugas, preferensi tampilan PID, dan mode role workshop.
          </p>
        </div>

        {/* Profile Card */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-700/60">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg ${
              currentUser.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
            }`}>
              {name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <p className="text-xs text-slate-400">{school}</p>
              <div className="mt-1">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  currentUser.role === 'admin' 
                    ? 'bg-purple-900/60 text-purple-300 border border-purple-500/40' 
                    : 'bg-blue-900/60 text-blue-300 border border-blue-500/40'
                }`}>
                  Role: {currentUser.role === 'admin' ? 'Admin & Reviewer' : 'Guru Peserta SD'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Nama Lengkap & Gelar (untuk Sertifikat):
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Sekolah / Instansi Asal:
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Alamat Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </form>

        {/* App Settings Card */}
        <div className="p-6 rounded-3xl bg-[#1C2541] border border-slate-700/80 shadow-xl space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-sky-400" />
            <span>Pengaturan Layar & Antarmuka</span>
          </h3>

          {/* PID Mode Switch */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">PID Mode (Layar Sentuh 65-86&quot;)</span>
                {pidMode && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    AKTIF
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-lg">
                Memperbesar ukuran tombol aksi minimal 52px, memperjelas kontras, dan memperbesar tipografi agar nyaman disentuh jari saat dibuka di layar pintar kelas.
              </p>
            </div>

            <button
              onClick={togglePidMode}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                pidMode 
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {pidMode ? 'Nonaktifkan' : 'Aktifkan'}
            </button>
          </div>

          {/* Role Switcher Test */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-sm text-white">Beralih Mode Peran Workshop</span>
              <p className="text-xs text-slate-400 mt-1">
                Ganti peran antara Guru Peserta dan Admin / Reviewer Penilai untuk simulasi rubrik.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => switchUserRole('participant')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  currentUser.role === 'participant'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Guru Peserta
              </button>
              <button
                onClick={() => switchUserRole('admin')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Reviewer Admin
              </button>
            </div>
          </div>

          {/* Firebase Connection Status (Section 38 specification) */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-bold flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-sky-400" />
                <span>Penyimpanan Basis Data Cloud (Firebase)</span>
              </span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                !isDemoMode ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
              }`}>
                {!isDemoMode ? 'Firebase Aktif' : 'Mode Demo (Lokal)'}
              </span>
            </div>
            <p className="text-slate-400">
              {isDemoMode
                ? 'Firebase belum dikonfigurasi. Hubungkan Firebase untuk mengaktifkan autentikasi awan, sinkronisasi antar perangkat, dan hosting. Saat ini seluruh data tersimpan secara lokal dan siap diekspor ke ZIP.'
                : 'Terhubung ke Google Cloud Firebase Firestore & Auth.'}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
