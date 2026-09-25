'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Tv, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  LogIn,
  AlertCircle
} from 'lucide-react';
import { WORKSHOP_META } from '@/data/workshopData';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemo, setCurrentUser, isDemoMode, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Masukkan alamat email', 'warning');
      return;
    }
    const isAdmin = email.includes('admin');
    setCurrentUser({
      uid: `user-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      school: 'SD Percontohan',
      role: isAdmin ? 'admin' : 'participant',
      createdAt: new Date().toISOString(),
    });
    showToast(`Berhasil masuk sebagai ${isAdmin ? 'Admin' : 'Guru SD'}`, 'success');
    router.push(isAdmin ? '/admin' : '/');
  };

  return (
    <div className="min-h-screen bg-[#0B132B] flex flex-col justify-center items-center p-4 sm:p-6 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-500/30">
            <Tv className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            PID LEARNING LAB
          </h1>
          <p className="text-xs sm:text-sm text-sky-200/80 font-medium">
            Workshop Pemanfaatan Papan Interaktif Digital SD (2,5 Jam)
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-[11px] font-bold text-sky-300">
            {WORKSHOP_META.tagline}
          </div>
        </div>

        {/* Demo 1-Click Fast Login Section */}
        <div className="p-5 rounded-3xl bg-[#1C2541] border border-slate-700/80 shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Akses Cepat (Demo Workshop):</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">1-Klik Langsung Masuk</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => {
                loginAsDemo('participant');
                router.push('/');
              }}
              className="w-full p-3.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-white">Masuk sebagai Guru Peserta</p>
                  <p className="text-[11px] text-sky-300">Budi Santoso, S.Pd. (SDN 1 Percobaan)</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => {
                loginAsDemo('admin');
                router.push('/admin');
              }}
              className="w-full p-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-white">Masuk sebagai Admin & Reviewer</p>
                  <p className="text-[11px] text-purple-300">Dr. Hendra Gunawan (Balai EdTech)</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="p-6 rounded-3xl bg-[#1C2541] border border-slate-700/80 shadow-2xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Atau Masuk dengan Email & Password:
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Alamat Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama.guru@sekolah.sch.id"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
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
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Akun</span>
          </button>

          <div className="text-center pt-2 text-xs text-slate-400">
            Belum memiliki akun?{' '}
            <Link href="/register" className="text-sky-400 hover:underline font-bold">
              Daftar Peserta Baru
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
