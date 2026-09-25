export type UserRole = 'admin' | 'participant';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  school: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
}

export type MPIMode = 'ONLINE' | 'OFFLINE' | 'ONLINE + OFFLINE';
export type ProjectStatus = 'NOT_STARTED' | 'SUBMITTED' | 'UNDER_REVIEW' | 'REVISION' | 'APPROVED';

export interface RubricScore {
  kesesuaianTujuan: number; // max 25
  kualitasMateri: number;   // max 20
  interaktivitas: number;   // max 25
  keterbacaanPID: number;   // max 15
  keterpakaianTeknis: number; // max 15
  total: number;            // max 100
}

export type PageType = 
  | 'Opening' 
  | 'Tujuan' 
  | 'Materi' 
  | 'Gambar' 
  | 'Video' 
  | 'Audio' 
  | 'Aktivitas' 
  | 'Drag & Drop' 
  | 'Matching' 
  | 'Multiple Choice' 
  | 'True/False' 
  | 'Refleksi' 
  | 'Penutup';

export interface StoryboardPage {
  id: string;
  pageNumber: number;
  type: PageType;
  title: string;
  content: string;
  visualPrompt?: string;
  interactionType: string;
  mediaUrl?: string;
}

export interface MPIVersion {
  versionNumber: number;
  submittedAt: string;
  title: string;
  notes: string;
  fileUrl?: string;
  pagesCount: number;
  status: ProjectStatus;
  feedback?: string;
}

export interface MPIProject {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerSchool: string;
  title: string;
  subject: string;
  grade: string;
  topic: string;
  learningObjective: string;
  learningProblem: string;
  interactiveActivity: string;
  assessmentForm: string;
  description: string;
  mode: MPIMode;
  status: ProjectStatus;
  score: number | null;
  rubric: RubricScore;
  feedback: string;
  pages: StoryboardPage[];
  version: number;
  versionsHistory: MPIVersion[];
  testLabPassed: boolean;
  checklistVerified: boolean;
  fileUrl?: string;
  offlineZipReady?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'multiple_answer';
  options: string[];
  correctAnswer: number | number[] | boolean;
  explanation: string;
  pidTip?: string;
}

export interface ModuleQuiz {
  id: string;
  title: string;
  passingScore: number; // default 70
  questions: QuizQuestion[];
}

export interface ModuleActivity {
  id: string;
  title: string;
  instruction: string;
  type: 'matching' | 'simulator' | 'whiteboard' | 'selection' | 'checklist' | 'canvas' | 'quiz';
  rewardBadge?: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;
  interactiveType?: 'hotspot' | 'gestures' | 'whiteboard' | 'scenarios' | 'canvas' | 'builder' | 'testlab';
}

export interface WorkshopModule {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  estimatedTime: string;
  stage: 'ORIENTASI' | 'KENALI' | 'EKSPLORASI' | 'PAHAMI' | 'RANCANG' | 'BUAT' | 'UJI';
  description: string;
  lessons: Lesson[];
  activity: ModuleActivity;
  quiz?: ModuleQuiz;
  published: boolean;
}

export interface BadgeItem {
  id: string;
  code: 'PID_EXPLORER' | 'PID_PRACTITIONER' | 'MPI_DESIGNER' | 'MPI_CREATOR' | 'PID_MPI_PRACTITIONER';
  title: string;
  icon: string;
  description: string;
  requirement: string;
  earned: boolean;
  earnedAt?: string;
}

export interface CertificateData {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  userSchool: string;
  workshopTitle: string;
  durationText: string;
  issueDate: string;
  narasumber: string;
  instansi: string;
  verified: boolean;
  verificationUrl?: string;
}

export interface ReflectionSubmission {
  userId: string;
  q1: string; // Fitur PID paling bermanfaat
  q2: string; // Apa yang ingin diterapkan di kelas
  q3: string; // Apa yang masih perlu dipelajari
  submittedAt: string;
}

export interface WorkshopProgress {
  userId: string;
  completedModules: string[];
  completedActivities: string[];
  quizScores: Record<string, number>;
  preTestScore: number | null;
  preTestCompleted: boolean;
  postTestScore: number | null;
  postTestCompleted: boolean;
  reflectionsSubmitted: boolean;
  lastVisitedPath: string;
  mpiCanvasCompleted: boolean;
  mpiProjectCreated: boolean;
  mpiProjectSubmitted: boolean;
  mpiApproved: boolean;
  totalProgressPercent: number;
  updatedAt: string;
}
