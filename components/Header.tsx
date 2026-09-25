'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Tv, 
  Monitor, 
  ShieldCheck, 
  User, 
  Sparkles, 
  AlertCircle, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Layers,
  Award
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ onToggleMobileMenu, isMobileMenuOpen }: HeaderProps) {
  const { 
    currentUser, 
    switchUserRole, 
    pidMode, 
    togglePidMode, 
    isDemoMode,
    progress,
    logout 
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B132B] border-b border-slate-800/80 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                <Tv className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-wide bg-gradient-to-r from-white via-sky-100 to-blue-200 bg-clip-text text-transparent">
                    PID LEARNING LAB
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300">
                    SD LMS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block font-medium truncate max-w-[280px]">
                  Workshop Papan Interaktif Digital SD (2,5 Jam)
                </p>
              </div>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demo Mode Badge */}
            {isDemoMode && (
              <button
                onClick={() => setShowDemoModal(true)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition cursor-pointer"
                title="Klik untuk informasi mode demo"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>DEMO MODE</span>
              </button>
            )}

            {/* PID Mode Toggle Button */}
            <button
              onClick={togglePidMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                pidMode
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 ring-2 ring-amber-400 shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
              title="Aktifkan mode sentuh ramah layar besar PID"
            >
              <Monitor className={`w-4 h-4 ${pidMode ? 'text-slate-950 animate-pulse' : 'text-sky-400'}`} />
              <span className="hidden sm:inline">PID Mode:</span>
              <span className="uppercase">{pidMode ? 'AKTIF' : 'OFF'}</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1C2541] border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm transition"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentUser.role === 'admin' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {currentUser.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-semibold text-xs text-white leading-tight truncate max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-sky-400 font-medium capitalize">
                    {currentUser.role === 'admin' ? 'Reviewer / Admin' : 'Guru SD'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#1C2541] border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-700/60">
                    <p className="text-xs text-slate-400">Masuk sebagai:</p>
                    <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser.school}</p>
                  </div>

                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        switchUserRole('participant');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                        currentUser.role === 'participant'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Role: Guru Peserta</span>
                      </div>
                      {currentUser.role === 'participant' && <span className="text-[10px] font-bold">Aktif</span>}
                    </button>

                    <button
                      onClick={() => {
                        switchUserRole('admin');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                        currentUser.role === 'admin'
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Role: Admin / Reviewer</span>
                      </div>
                      {currentUser.role === 'admin' && <span className="text-[10px] font-bold">Aktif</span>}
                    </button>
                  </div>

                  <div className="border-t border-slate-700/60 p-2">
                    <Link
                      href={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setShowRoleDropdown(false)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-sky-400 hover:bg-slate-800"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{currentUser.role === 'admin' ? 'Buka Portal Admin' : 'Dashboard Peserta'}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowRoleDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-slate-800"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Demo Mode Modal Info */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1C2541] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-300">Status: DEMO MODE Aktif</h3>
                <p className="text-xs text-slate-300">Pemberitahuan Sistem Sesuai Standar Workshop</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
              <p>
                <strong className="text-amber-200">Firebase belum dikonfigurasi.</strong> Hubungkan Firebase untuk mengaktifkan autentikasi awan, penyimpanan data terpusat, upload berkas ke cloud storage, progress multi-device, dan validasi sertifikat online.
              </p>
              <p className="text-xs text-slate-400">
                Aplikasi saat ini berjalan dalam <strong>Mode Simulasi Interaktif Penuh (Full Interactive Demo)</strong>. Seluruh interaksi, kuis, generator MPI, dan test lab tetap dapat Anda coba dan unduh paket offline-nya secara langsung!
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition"
              >
                Saya Mengerti, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
