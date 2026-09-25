'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Tv, UserPlus, ArrowRight, Sparkles } from 'lucide-react';
import { WORKSHOP_META } from '@/data/workshopData';

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentUser, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !school) {
      showToast('Harap lengkapi semua kolom pendaftaran', 'warning');
      return;
    }

    const newUser = {
      uid: `user-${Date.now()}`,
      name,
      email,
      school,
      role: 'participant' as const,
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(newUser);
    try {
      localStorage.setItem('pid_current_user', JSON.stringify(newUser));
    } catch (e) {}

    showToast('Pendaftaran peserta berhasil! Selamat datang di PID Learning Lab.', 'success');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0B132B] flex flex-col justify-center items-center p-4 sm:p-6 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-500/30">
            <Tv className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Pendaftaran Peserta
          </h1>
          <p className="text-xs sm:text-sm text-sky-200/80 font-medium">
            PID Learning Lab — Pelatihan Guru SD 2,5 Jam
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleRegister} className="p-6 sm:p-8 rounded-3xl bg-[#1C2541] border border-slate-700/80 shadow-2xl space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nama Lengkap & Gelar (untuk Sertifikat Resmi):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Rahayu Wulandari, S.Pd."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Sekolah / Satuan Pendidikan:
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Contoh: SD Negeri 2 Cibubur"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Alamat Email Aktif:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahayu@sdn2.sch.id"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Kata Sandi:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar & Masuk Workshop</span>
          </button>

          <div className="text-center pt-2 text-xs text-slate-400">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="text-sky-400 hover:underline font-bold">
              Masuk di sini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
