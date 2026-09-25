'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  MPIProject, 
  BadgeItem, 
  CertificateData, 
  ReflectionSubmission,
  WorkshopProgress,
  RubricScore,
  ProjectStatus
} from '@/types';
import { 
  INITIAL_BADGES, 
  INITIAL_SAMPLE_PROJECTS, 
  WORKSHOP_MODULES,
  WORKSHOP_META 
} from '@/data/workshopData';
import { isFirebaseConfigured } from '@/lib/firebase';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // User & Auth
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchUserRole: (role: 'admin' | 'participant') => void;
  loginAsDemo: (role: 'admin' | 'participant') => void;
  logout: () => void;
  
  // Workshop Progress
  progress: WorkshopProgress;
  markModuleCompleted: (moduleId: string) => void;
  markActivityCompleted: (activityId: string, badgeCode?: string) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  savePreTest: (score: number) => void;
  savePostTest: (score: number) => void;
  saveReflections: (q1: string, q2: string, q3: string) => void;
  reflections: { q1: string; q2: string; q3: string };

  // Canvas & Storyboard
  canvasData: {
    teacherName: string;
    school: string;
    subject: string;
    grade: string;
    topic: string;
    learningObjective: string;
    learningProblem: string;
    interactiveActivity: string;
    assessmentForm: string;
  };
  saveCanvasData: (data: Partial<AppContextType['canvasData']>) => void;

  // MPI Projects
  projects: MPIProject[];
  userProject: MPIProject | null;
  createOrUpdateProject: (projectData: Partial<MPIProject>) => string;
  submitProjectForReview: (projectId: string, notes?: string) => void;
  reviewProject: (projectId: string, rubric: RubricScore, status: ProjectStatus, feedback: string) => void;
  deleteProject: (projectId: string) => void;

  // Badges & Certificates
  badges: BadgeItem[];
  unlockBadge: (badgeCode: string) => void;
  certificate: CertificateData | null;
  checkCertificateEligibility: () => boolean;
  generateCertificate: () => CertificateData;

  // PID Mode
  pidMode: boolean;
  togglePidMode: () => void;

  // Demo status
  isDemoMode: boolean;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_PARTICIPANT: UserProfile = {
  uid: 'user-sample-1',
  name: 'Budi Santoso, S.Pd.',
  email: 'budi.santoso@sdn1.sch.id',
  school: 'SD Negeri 1 Percobaan',
  role: 'participant',
  createdAt: '2026-09-24',
};

const DEFAULT_ADMIN: UserProfile = {
  uid: 'admin-1',
  name: 'Dr. Hendra Gunawan (Reviewer Utama)',
  email: 'admin@pidlab.id',
  school: 'Balai Pengembangan Teknologi Pendidikan',
  role: 'admin',
  createdAt: '2026-09-20',
};

const DEFAULT_CANVAS = {
  teacherName: 'Budi Santoso, S.Pd.',
  school: 'SD Negeri 1 Percobaan',
  subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
  grade: 'Kelas 4 SD',
  topic: 'Siklus Air & Presipitasi',
  learningObjective: 'Melalui eksplorasi simulasi interaktif di PID, siswa dapat mengurutkan 4 tahapan daur air secara tepat dan aktif.',
  learningProblem: 'Siswa sering pasif dan bingung membedakan antara evaporasi dan kondensasi pada gambar statis.',
  interactiveActivity: 'Aktivitas Drag & Drop ikon uap air dan awan di layar PID secara bergiliran serta mengaktifkan simulasi hujan.',
  assessmentForm: 'Kuis interaktif 5 soal di PID dengan umpan balik visual dan audio instan.',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

let toastCounter = 0;

function calculateProgressPercent(prog: {
  preTestCompleted: boolean;
  completedModules: string[];
  mpiCanvasCompleted: boolean;
  mpiProjectCreated: boolean;
  completedActivities: string[];
  mpiApproved: boolean;
  mpiProjectSubmitted: boolean;
  postTestCompleted: boolean;
  reflectionsSubmitted: boolean;
}): number {
  let pct = 0;
  if (prog.preTestCompleted) pct += 10;
  const m1_3 = ['modul-1', 'modul-2', 'modul-3'].filter(m => prog.completedModules.includes(m)).length;
  pct += Math.round((m1_3 / 3) * 25);
  if (prog.mpiCanvasCompleted || prog.completedModules.includes('modul-4')) pct += 15;
  if (prog.completedModules.includes('modul-5') || prog.mpiProjectCreated) pct += 15;
  if (prog.completedModules.includes('modul-6') || prog.completedActivities.includes('act-6')) pct += 15;
  if (prog.mpiApproved) pct += 10; else if (prog.mpiProjectSubmitted) pct += 5;
  if (prog.postTestCompleted && prog.reflectionsSubmitted) pct += 10;
  return Math.min(100, Math.max(0, pct));
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pid_current_user');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_PARTICIPANT;
  });

  const [pidMode, setPidMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('pid_mode_enabled') === 'true';
      } catch (e) {}
    }
    return false;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const isDemoMode = !isFirebaseConfigured;

  // Canvas State
  const [canvasData, setCanvasData] = useState(DEFAULT_CANVAS);

  // Reflections State
  const [reflections, setReflections] = useState({
    q1: 'Fitur Papan Tulis Digital (Whiteboard) dan kemampuan Drag & Drop multi-touch yang memungkinkan siswa maju bersamaan.',
    q2: 'Skenario demonstrasi simulasi interaktif sains di mana siswa dapat memanipulasi variabel siklus air secara langsung.',
    q3: 'Teknik pembuatan animasi interaktif berbasis web yang lebih dinamis serta integrasi dengan kuis penilaian otomatis.',
  });

  // Projects State
  const [projects, setProjects] = useState<MPIProject[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pid_projects');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_SAMPLE_PROJECTS;
  });

  // Badges State
  const [badges, setBadges] = useState<BadgeItem[]>(() => {
    return INITIAL_BADGES.map(b => {
      if (b.code === 'PID_EXPLORER' || b.code === 'PID_PRACTITIONER') {
        return { ...b, earned: true, earnedAt: '2026-09-24 10:15' };
      }
      return b;
    });
  });

  // Progress State
  const [progress, setProgress] = useState<WorkshopProgress>(() => {
    const base: WorkshopProgress = {
      userId: DEFAULT_PARTICIPANT.uid,
      completedModules: ['modul-0', 'modul-1', 'modul-2', 'modul-3'],
      completedActivities: ['act-0', 'act-1', 'act-2', 'act-3'],
      quizScores: { 'modul-0': 100, 'modul-1': 100, 'modul-2': 100 },
      preTestScore: 80,
      preTestCompleted: true,
      postTestScore: null,
      postTestCompleted: false,
      reflectionsSubmitted: false,
      lastVisitedPath: '/workshop/modul-4',
      mpiCanvasCompleted: true,
      mpiProjectCreated: true,
      mpiProjectSubmitted: true,
      mpiApproved: true,
      totalProgressPercent: 75,
      updatedAt: '2026-09-24T12:00:00.000Z',
    };
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pid_progress');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return base;
  });

  // Certificate State
  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  // Sync PID mode class to documentElement
  useEffect(() => {
    if (pidMode) {
      document.documentElement.classList.add('pid-mode');
    } else {
      document.documentElement.classList.remove('pid-mode');
    }
    try {
      localStorage.setItem('pid_mode_enabled', pidMode ? 'true' : 'false');
    } catch (e) {}
  }, [pidMode]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `t-${++toastCounter}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const togglePidMode = () => {
    setPidMode(prev => {
      const next = !prev;
      showToast(next ? '📺 Mode Layar Sentuh PID Diaktifkan' : '💻 Kembali ke Mode Standar Desktop', 'info');
      return next;
    });
  };

  const switchUserRole = (role: 'admin' | 'participant') => {
    if (role === 'admin') {
      setCurrentUser(DEFAULT_ADMIN);
      try { localStorage.setItem('pid_current_user', JSON.stringify(DEFAULT_ADMIN)); } catch (e) {}
      showToast('Beralih sebagai Admin & Reviewer Workshop', 'info');
    } else {
      setCurrentUser(DEFAULT_PARTICIPANT);
      try { localStorage.setItem('pid_current_user', JSON.stringify(DEFAULT_PARTICIPANT)); } catch (e) {}
      showToast('Beralih sebagai Peserta Workshop (Guru)', 'info');
    }
  };

  const loginAsDemo = (role: 'admin' | 'participant') => {
    switchUserRole(role);
  };

  const logout = () => {
    setCurrentUser(DEFAULT_PARTICIPANT);
    try { localStorage.removeItem('pid_current_user'); } catch (e) {}
    showToast('Berhasil keluar akun', 'info');
  };

  const unlockBadge = (badgeCode: string) => {
    setBadges(prev => 
      prev.map(b => {
        if (b.code === badgeCode && !b.earned) {
          showToast(`🏅 Lencana Baru Terbuka: ${b.title}!`, 'success');
          return { ...b, earned: true, earnedAt: new Date().toLocaleString('id-ID') };
        }
        return b;
      })
    );
  };

  const markModuleCompleted = (moduleId: string) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const nextModules = [...prev.completedModules, moduleId];
      const updated: WorkshopProgress = {
        ...prev,
        completedModules: nextModules,
        totalProgressPercent: calculateProgressPercent({
          ...prev,
          completedModules: nextModules,
        }),
        updatedAt: new Date().toISOString(),
      };
      try { localStorage.setItem('pid_progress', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Modul berhasil diselesaikan!', 'success');

    // Auto badge check
    if (moduleId === 'modul-2') {
      unlockBadge('PID_EXPLORER');
    } else if (moduleId === 'modul-3') {
      unlockBadge('PID_PRACTITIONER');
    } else if (moduleId === 'modul-4') {
      unlockBadge('MPI_DESIGNER');
    } else if (moduleId === 'modul-5') {
      unlockBadge('MPI_CREATOR');
    }
  };

  const markActivityCompleted = (activityId: string, badgeCode?: string) => {
    setProgress(prev => {
      if (prev.completedActivities.includes(activityId)) return prev;
      const nextActivities = [...prev.completedActivities, activityId];
      const updated: WorkshopProgress = {
        ...prev,
        completedActivities: nextActivities,
        totalProgressPercent: calculateProgressPercent({
          ...prev,
          completedActivities: nextActivities,
        }),
        updatedAt: new Date().toISOString(),
      };
      try { localStorage.setItem('pid_progress', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Aktivitas berhasil diselesaikan & tersimpan!', 'success');
    if (badgeCode) {
      unlockBadge(badgeCode);
    }
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        quizScores: { ...prev.quizScores, [quizId]: score },
        updatedAt: new Date().toISOString(),
      };
      try { localStorage.setItem('pid_progress', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const savePreTest = (score: number) => {
    setProgress(prev => {
      const nextModules = Array.from(new Set([...prev.completedModules, 'modul-0']));
      const nextActivities = Array.from(new Set([...prev.completedActivities, 'act-0']));
      const updated: WorkshopProgress = {
        ...prev,
        preTestScore: score,
        preTestCompleted: true,
        completedModules: nextModules,
        completedActivities: nextActivities,
        totalProgressPercent: calculateProgressPercent({
          ...prev,
          preTestCompleted: true,
          completedModules: nextModules,
          completedActivities: nextActivities,
        }),
        updatedAt: new Date().toISOString(),
      };
      try { localStorage.setItem('pid_progress', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast(`Pre-Test selesai! Skor Anda: ${score}`, 'success');
  };

  const savePostTest = (score: number) => {
    setProgress(prev => {
      const updated: WorkshopProgress = {
        ...prev,
        postTestScore: score,
        postTestCompleted: true,
        totalProgressPercent: calculateProgressPercent({
          ...prev,
          postTestCompleted: true,
        }),
        updatedAt: new Date().toISOString(),
      };
      try { localStorage.setItem('pid_progress', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast(`Post-Test selesai! Skor Anda: ${score}`, score >= 70 ? 'success' : 'warning');
    if (score >= 70 && progress.mpiApproved) {
      unlockBadge('PID_MPI_PRACTITIONER');
    }
  };

  const saveReflections = (q1: string, q2: string, q3: string) => {
    setReflections({ q1, q2, q3 });
    setProgress(prev => {
      const updated: WorkshopProgress = {
        ...prev,
        reflectionsSubmitted: true,
        totalProgressPercent: calculateProgressPercent({
          ...prev,
          reflectionsSubmitted: true,
        }),
        updatedAt: new Date().toISOString(),
      };
      try { localStorage.setItem('pid_progress', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Refleksi workshop berhasil dikirimkan!', 'success');
  };

  const saveCanvasData = (data: Partial<typeof DEFAULT_CANVAS>) => {
    setCanvasData(prev => {
      const updated = { ...prev, ...data };
      return updated;
    });
    setProgress(prev => ({
      ...prev,
      mpiCanvasCompleted: true,
      totalProgressPercent: calculateProgressPercent({
        ...prev,
        mpiCanvasCompleted: true,
      }),
    }));
    unlockBadge('MPI_DESIGNER');
    showToast('Data MPI Canvas tersimpan!', 'success');
  };

  const userProject = projects.find(p => p.ownerId === currentUser.uid) || projects[0] || null;

  const createOrUpdateProject = (projectData: Partial<MPIProject>): string => {
    const id = projectData.id || `proj-${Date.now()}`;
    setProjects(prev => {
      const existingIndex = prev.findIndex(p => p.id === id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          ...projectData,
          updatedAt: new Date().toISOString(),
        };
        try { localStorage.setItem('pid_projects', JSON.stringify(updated)); } catch (e) {}
        return updated;
      } else {
        const newProj: MPIProject = {
          id,
          ownerId: currentUser.uid,
          ownerName: currentUser.name,
          ownerSchool: currentUser.school,
          title: projectData.title || 'Media Pembelajaran PID Baru',
          subject: projectData.subject || 'IPAS',
          grade: projectData.grade || 'Kelas 4 SD',
          topic: projectData.topic || 'Topik Baru',
          learningObjective: projectData.learningObjective || '',
          learningProblem: projectData.learningProblem || '',
          interactiveActivity: projectData.interactiveActivity || '',
          assessmentForm: projectData.assessmentForm || '',
          description: projectData.description || '',
          mode: projectData.mode || 'ONLINE + OFFLINE',
          status: 'NOT_STARTED',
          score: null,
          rubric: {
            kesesuaianTujuan: 0,
            kualitasMateri: 0,
            interaktivitas: 0,
            keterbacaanPID: 0,
            keterpakaianTeknis: 0,
            total: 0,
          },
          feedback: '',
          pages: projectData.pages || [],
          version: 1,
          versionsHistory: [],
          testLabPassed: projectData.testLabPassed ?? false,
          checklistVerified: projectData.checklistVerified ?? false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const updated = [newProj, ...prev];
        try { localStorage.setItem('pid_projects', JSON.stringify(updated)); } catch (e) {}
        return updated;
      }
    });

    setProgress(prev => ({ ...prev, mpiProjectCreated: true }));
    showToast('Proyek MPI berhasil disimpan!', 'success');
    return id;
  };

  const submitProjectForReview = (projectId: string, notes?: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id === projectId) {
          const nextVersion = p.version + (p.status === 'REVISION' ? 1 : 0);
          const historyEntry = {
            versionNumber: p.version,
            submittedAt: new Date().toLocaleString('id-ID'),
            title: p.title,
            notes: notes || 'Pengajuan berkas proyek 1 Guru 1 MPI',
            pagesCount: p.pages.length,
            status: 'SUBMITTED' as const,
            feedback: p.feedback,
          };

          return {
            ...p,
            status: 'SUBMITTED' as const,
            version: nextVersion,
            versionsHistory: [historyEntry, ...p.versionsHistory],
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      try { localStorage.setItem('pid_projects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    setProgress(prev => ({ ...prev, mpiProjectSubmitted: true }));
    showToast('Proyek berhasil dikirimkan ke Reviewer Workshop!', 'success');
  };

  const reviewProject = (projectId: string, rubric: RubricScore, status: ProjectStatus, feedback: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            rubric,
            score: rubric.total,
            status,
            feedback,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      try { localStorage.setItem('pid_projects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    if (status === 'APPROVED') {
      setProgress(prev => ({ ...prev, mpiApproved: true }));
      unlockBadge('PID_MPI_PRACTITIONER');
      showToast('Proyek MPI disetujui reviewer! Selamat!', 'success');
    } else if (status === 'REVISION') {
      setProgress(prev => ({ ...prev, mpiApproved: false }));
      showToast('Status proyek: Membutuhkan Perbaikan/Revisi', 'warning');
    }
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== projectId);
      try { localStorage.setItem('pid_projects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Proyek dihapus', 'info');
  };

  const checkCertificateEligibility = (): boolean => {
    return (
      progress.preTestCompleted &&
      progress.completedModules.length >= 6 &&
      (progress.mpiApproved || userProject?.status === 'APPROVED') &&
      (progress.postTestScore !== null && progress.postTestScore >= 70)
    );
  };

  const generateCertificate = (): CertificateData => {
    const cert: CertificateData = {
      id: `cert-${currentUser.uid}`,
      certificateNumber: `PID-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.uid,
      userName: currentUser.name,
      userSchool: currentUser.school,
      workshopTitle: WORKSHOP_META.title + ' — ' + WORKSHOP_META.subtitle,
      durationText: WORKSHOP_META.durationLabel,
      issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      narasumber: WORKSHOP_META.narasumber,
      instansi: WORKSHOP_META.instansi,
      verified: true,
      verificationUrl: `https://pidlab.id/verify/PID-2026-0012`,
    };
    setCertificate(cert);
    showToast('Sertifikat kelulusan berhasil diterbitkan!', 'success');
    return cert;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        loginAsDemo,
        logout,
        progress,
        markModuleCompleted,
        markActivityCompleted,
        saveQuizScore,
        savePreTest,
        savePostTest,
        saveReflections,
        reflections,
        canvasData,
        saveCanvasData,
        projects,
        userProject,
        createOrUpdateProject,
        submitProjectForReview,
        reviewProject,
        deleteProject,
        badges,
        unlockBadge,
        certificate,
        checkCertificateEligibility,
        generateCertificate,
        pidMode,
        togglePidMode,
        isDemoMode,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
