'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Home, 
  BookOpen, 
  FlaskConical, 
  Sparkles, 
  FolderGit2, 
  BarChart3, 
  Award, 
  FileCheck2, 
  User, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck,
  Compass,
  Cpu,
  Tv,
  PenTool,
  Code2
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isOpenMobile, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { progress, currentUser, pidMode } = useApp();
  const [workshopExpanded, setWorkshopExpanded] = useState(true);

  const workshopSubItems = [
    { name: 'Orientasi', path: '/workshop/orientasi', icon: Compass, id: 'modul-0' },
    { name: 'Modul 1 — Mengenal PID', path: '/workshop/modul-1', icon: Tv, id: 'modul-1' },
    { name: 'Modul 2 — Eksplorasi PID', path: '/workshop/modul-2', icon: Cpu, id: 'modul-2' },
    { name: 'Modul 3 — PID dalam Pembelajaran', path: '/workshop/modul-3', icon: BookOpen, id: 'modul-3' },
    { name: 'Modul 4 — Merancang MPI', path: '/workshop/modul-4', icon: PenTool, id: 'modul-4' },
    { name: 'Modul 5 — Membuat MPI', path: '/workshop/modul-5', icon: Code2, id: 'modul-5' },
  ];

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { 
      name: 'Workshop', 
      path: '/workshop', 
      icon: BookOpen, 
      hasSubmenu: true 
    },
    { name: 'Uji MPI', path: '/workshop/modul-6', icon: FlaskConical },
    { name: 'MPI Builder', path: '/mpi-builder', icon: Sparkles, highlight: true },
    { name: 'Proyek Saya', path: '/project', icon: FolderGit2 },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
    { name: 'Badge', path: '/badges', icon: Award },
    { name: 'Sertifikat', path: '/certificate', icon: FileCheck2 },
    { name: 'Profil', path: '/profile', icon: User },
  ];

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/') return pathname === '/';
    return pathname.startsWith(itemPath);
  };

  const isSubActive = (itemPath: string) => pathname === itemPath;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      <aside className={`
        fixed lg:sticky top-16 z-40 lg:z-30 h-[calc(100vh-4rem)] w-72 bg-[#0E172F] border-r border-slate-800/90
        flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="p-4 space-y-1.5">
          {/* Quick Progress Mini-Card */}
          <div className="p-3.5 mb-3 rounded-2xl bg-gradient-to-br from-blue-900/40 via-slate-800/40 to-slate-900/60 border border-blue-500/20 shadow-sm">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-blue-300">Progress Workshop</span>
              <span className="font-extrabold text-white text-sm">{progress.totalProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progress.totalProgressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
              {progress.completedModules.length} dari 7 tahap selesai
            </p>
          </div>

          {/* Admin shortcut if user is admin */}
          {currentUser.role === 'admin' && (
            <div className="mb-2">
              <Link
                href="/admin"
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition ${
                  pathname.startsWith('/admin')
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-purple-950/40 text-purple-200 hover:bg-purple-900/60 border border-purple-500/30'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <span>Panel Admin & Reviewer</span>
              </Link>
            </div>
          )}

          {/* Nav items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.path);

            if (item.hasSubmenu) {
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center">
                    <Link
                      href={item.path}
                      onClick={onCloseMobile}
                      className={`flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                        active
                          ? 'bg-blue-600/20 text-blue-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => setWorkshopExpanded(!workshopExpanded)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg"
                      aria-label="Toggle submenu"
                    >
                      {workshopExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Submenu */}
                  {workshopExpanded && (
                    <div className="pl-6 pr-1 space-y-1 border-l-2 border-slate-800 ml-5 my-1">
                      {workshopSubItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const subActive = isSubActive(sub.path);
                        const isDone = progress.completedModules.includes(sub.id);

                        return (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            onClick={onCloseMobile}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                              subActive
                                ? 'bg-blue-600 text-white font-bold shadow-sm'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <SubIcon className={`w-3.5 h-3.5 flex-shrink-0 ${subActive ? 'text-white' : 'text-slate-500'}`} />
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {isDone && (
                              <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${subActive ? 'text-white' : 'text-emerald-400'}`} />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : item.highlight
                    ? 'bg-gradient-to-r from-amber-500/10 to-blue-500/10 text-amber-300 hover:bg-slate-800 border border-amber-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    BARU
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 text-xs font-bold">
              SD
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{currentUser.school}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
