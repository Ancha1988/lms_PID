import JSZip from 'jszip';
import { MPIProject } from '@/types';

export async function generateOfflineMpiZip(project: MPIProject): Promise<Blob> {
  const zip = new JSZip();

  const pagesJson = JSON.stringify(project.pages, null, 2);

  const indexHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${escapeHtml(project.title)} - PID Learning Lab Offline</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="pid-body">
  <div class="screen-container">
    <header class="app-header">
      <div class="title-wrap">
        <span class="badge-offline">MODE OFFLINE PID</span>
        <h1 id="app-title">${escapeHtml(project.title)}</h1>
      </div>
      <div class="header-meta">
        <span>${escapeHtml(project.subject)} • ${escapeHtml(project.grade)}</span>
        <button id="btn-fullscreen" class="btn-icon" title="Layar Penuh">⛶</button>
      </div>
    </header>

    <main class="slide-viewport">
      <div id="slide-card" class="slide-card">
        <!-- Dynamic slide content will be rendered here -->
      </div>
    </main>

    <footer class="app-footer">
      <button id="btn-prev" class="nav-btn btn-prev">← Halaman Sebelumnya</button>
      <div class="page-indicator">
        <span id="page-num">1</span> dari <span id="page-total">1</span>
      </div>
      <button id="btn-next" class="nav-btn btn-next">Halaman Berikutnya →</button>
    </footer>
  </div>

  <script>
    const PROJECT_DATA = {
      title: ${JSON.stringify(project.title)},
      subject: ${JSON.stringify(project.subject)},
      grade: ${JSON.stringify(project.grade)},
      topic: ${JSON.stringify(project.topic)},
      objective: ${JSON.stringify(project.learningObjective)},
      pages: ${pagesJson}
    };
  </script>
  <script src="script.js"></script>
</body>
</html>`;

  const styleCss = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

body.pid-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: #0b132b;
  color: #f8fafc;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.screen-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 16px;
  max-width: 1400px;
  margin: 0 auto;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1c2541;
  padding: 14px 24px;
  border-radius: 16px;
  border: 1px solid #334155;
}

.badge-offline {
  display: inline-block;
  background: #f59e0b;
  color: #0b132b;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 99px;
  margin-bottom: 4px;
}

#app-title {
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
  color: #93c5fd;
}

.btn-icon {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  overflow: hidden;
}

.slide-card {
  background: #ffffff;
  color: #0f172a;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 32px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border: 4px solid #1e40af;
}

.slide-type-tag {
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  padding: 6px 14px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 12px;
  border: 1px solid #bfdbfe;
}

.slide-title {
  font-size: 32px;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 16px;
  line-height: 1.2;
}

.slide-content {
  font-size: 22px;
  line-height: 1.6;
  color: #334155;
  white-space: pre-line;
  flex: 1;
}

.interaction-box {
  background: #f8fafc;
  border: 2px dashed #3b82f6;
  border-radius: 16px;
  padding: 24px;
  margin-top: 20px;
  text-align: center;
}

.interaction-prompt {
  font-size: 20px;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 16px;
}

.touch-btn-action {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 16px 36px;
  font-size: 22px;
  font-weight: 700;
  border-radius: 14px;
  cursor: pointer;
  min-height: 60px;
  transition: transform 0.1s, background 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.touch-btn-action:active {
  transform: scale(0.96);
  background: #1d4ed8;
}

.quiz-option-btn {
  display: block;
  width: 100%;
  text-align: left;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  padding: 18px 24px;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quiz-option-btn.correct {
  background: #dcfce7;
  border-color: #22c55e;
  color: #15803d;
}

.quiz-option-btn.wrong {
  background: #fee2e2;
  border-color: #ef4444;
  color: #b91c1c;
}

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1c2541;
  padding: 12px 24px;
  border-radius: 16px;
  border: 1px solid #334155;
  min-height: 72px;
}

.nav-btn {
  background: #2563eb;
  color: #ffffff;
  border: none;
  font-size: 20px;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 12px;
  cursor: pointer;
  min-height: 52px;
  min-width: 180px;
}

.nav-btn:disabled {
  background: #475569;
  opacity: 0.5;
  cursor: not-allowed;
}

.page-indicator {
  font-size: 20px;
  font-weight: 700;
  color: #f8fafc;
}`;

  const scriptJs = `let currentIndex = 0;
const pages = PROJECT_DATA.pages || [];

const slideCard = document.getElementById('slide-card');
const pageNumEl = document.getElementById('page-num');
const pageTotalEl = document.getElementById('page-total');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnFullscreen = document.getElementById('btn-fullscreen');

pageTotalEl.textContent = pages.length;

function playTouchBeep(freq = 440, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {}
}

function renderSlide(index) {
  if (!pages[index]) return;
  const page = pages[index];
  pageNumEl.textContent = index + 1;
  
  btnPrev.disabled = index === 0;
  btnNext.disabled = index === pages.length - 1;

  let interactionHtml = '';
  if (page.type === 'Multiple Choice' || page.type === 'Kuis') {
    interactionHtml = \`
      <div class="interaction-box">
        <div class="interaction-prompt">⚡ Tantangan Sentuh: Pilih Jawaban yang Tepat</div>
        <button class="quiz-option-btn" onclick="handleAnswer(this, true)">A. Jawaban Sesuai Konsep Pembelajaran</button>
        <button class="quiz-option-btn" onclick="handleAnswer(this, false)">B. Pilihan Pengecoh 1</button>
        <button class="quiz-option-btn" onclick="handleAnswer(this, false)">C. Pilihan Pengecoh 2</button>
      </div>
    \`;
  } else if (page.type === 'Aktivitas' || page.type === 'Drag & Drop') {
    interactionHtml = \`
      <div class="interaction-box">
        <div class="interaction-prompt">\${page.interactionType || 'Sentuh tombol di bawah untuk mencoba simulasi!'}</div>
        <button class="touch-btn-action" onclick="handleActionTap(this)">👉 SENTUH UNTUK INTERAKSI</button>
        <div id="action-feedback" style="margin-top: 12px; font-size: 18px; font-weight: bold; color: #16a34a; display: none;">
          ✨ Hebat! Objek berhasil diaktifkan di layar PID!
        </div>
      </div>
    \`;
  } else {
    interactionHtml = \`
      <div class="interaction-box">
        <div class="interaction-prompt">Sentuh tombol interaktif di bawah:</div>
        <button class="touch-btn-action" onclick="handleActionTap(this)">🌟 Eksplorasi Bersama di PID</button>
      </div>
    \`;
  }

  slideCard.innerHTML = \`
    <div>
      <span class="slide-type-tag">\${page.type || 'Materi'} • Halaman \${index + 1}</span>
      <h2 class="slide-title">\${page.title}</h2>
    </div>
    <div class="slide-content">\${page.content}</div>
    \${interactionHtml}
  \`;
}

window.handleAnswer = function(btn, isCorrect) {
  if (isCorrect) {
    playTouchBeep(587, 'triangle');
    btn.classList.add('correct');
    btn.innerHTML += ' ✅ (Benar!)';
  } else {
    playTouchBeep(220, 'sawtooth');
    btn.classList.add('wrong');
    btn.innerHTML += ' ❌ (Coba Lagi)';
  }
};

window.handleActionTap = function(btn) {
  playTouchBeep(523, 'sine');
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
  const fb = document.getElementById('action-feedback');
  if (fb) fb.style.display = 'block';
};

btnPrev.addEventListener('click', () => {
  if (currentIndex > 0) {
    playTouchBeep(350);
    currentIndex--;
    renderSlide(currentIndex);
  }
});

btnNext.addEventListener('click', () => {
  if (currentIndex < pages.length - 1) {
    playTouchBeep(440);
    currentIndex++;
    renderSlide(currentIndex);
  }
});

btnFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

// Render initial
renderSlide(0);`;

  const readmeTxt = `=====================================================
PETUNJUK PENGGUNAAN MEDIA PEMBELAJARAN INTERAKTIF (MPI)
PADA PAPAN INTERAKTIF DIGITAL (PID) SECARA LURING (OFFLINE)
=====================================================

Karya: ${project.ownerName}
Sekolah: ${project.ownerSchool}
Judul: ${project.title}
Mata Pelajaran: ${project.subject} (${project.grade})

CARA MENJALANKAN DI PID KELAS TANPA INTERNET:
1. Ekstrak file ZIP ini ke komputer atau langsung ke Flashdisk USB Anda.
2. Colokkan Flashdisk ke port USB depan Papan Interaktif Digital (PID).
3. Buka File Manager di PID Anda.
4. Klik dua kali pada file "index.html".
5. Browser bawaan PID akan membuka media secara otomatis.
6. Tekan tombol layar penuh (⛶) di pojok kanan atas untuk pengalaman sentuh maksimal.

TIPS UNTUK GURU SD:
- Ajak 1-3 siswa maju ke layar PID untuk menekan tombol aksi bersama.
- Tombol sentuh telah didesain dengan ukuran besar (>48px) agar ramah sentuhan tangan anak SD.
- File ini tidak memerlukan koneksi internet, akun login, atau biaya langganan apa pun.

Dibuat di PID Learning Lab - Balai Pengembangan Media Pembelajaran.`;

  zip.file('index.html', indexHtml);
  zip.file('style.css', styleCss);
  zip.file('script.js', scriptJs);
  zip.file('PETUNJUK_PID_OFFLINE.txt', readmeTxt);

  const content = await zip.generateAsync({ type: 'blob' });
  return content;
}

function escapeHtml(str: string) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
