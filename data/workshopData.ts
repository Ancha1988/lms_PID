import { WorkshopModule, QuizQuestion, BadgeItem } from '@/types';

export const WORKSHOP_META = {
  title: 'PID LEARNING LAB',
  subtitle: 'Workshop Pemanfaatan Papan Interaktif Digital sebagai Media Pembelajaran SD',
  tagline: 'Kenali • Eksplorasi • Rancang • Buat • Uji',
  totalDurationMinutes: 150,
  durationLabel: '2,5 Jam (150 Menit)',
  narasumber: 'Dr. Hendra Gunawan, M.Pd. & Tim Inovasi EdTech',
  instansi: 'Balai Pengembangan Teknologi Pendidikan & Disdikbud',
};

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'badge-1',
    code: 'PID_EXPLORER',
    title: 'PID Explorer',
    icon: '🧭',
    description: 'Tuntas menjelajahi Modul 1 & Modul 2 serta menguasai anatomi dan navigasi dasar PID.',
    requirement: 'Selesaikan Modul 1 & 2 serta misi Whiteboard',
    earned: false,
  },
  {
    id: 'badge-2',
    code: 'PID_PRACTITIONER',
    title: 'PID Practitioner',
    icon: '⚡',
    description: 'Mampu mensimulasikan skenario pembelajaran interaktif berbasis 5 model interaksi SD.',
    requirement: 'Selesaikan aktivitas Modul 3',
    earned: false,
  },
  {
    id: 'badge-3',
    code: 'MPI_DESIGNER',
    title: 'MPI Designer',
    icon: '📐',
    description: 'Berhasil merumuskan rancangan pedagogis lengkap pada lembar MPI Canvas & Storyboard.',
    requirement: 'Isi lengkap MPI Canvas pada Modul 4',
    earned: false,
  },
  {
    id: 'badge-4',
    code: 'MPI_CREATOR',
    title: 'MPI Creator',
    icon: '🎨',
    description: 'Menciptakan media pembelajaran interaktif (MPI) melalui MPI Builder dan lolos Test Lab.',
    requirement: 'Generate atau buat MPI di Modul 5 dan lolos Test Lab',
    earned: false,
  },
  {
    id: 'badge-5',
    code: 'PID_MPI_PRACTITIONER',
    title: 'PID-MPI Practitioner',
    icon: '🏆',
    description: 'Gelar kehormatan workshop: Proyek 1 Guru 1 MPI telah disetujui reviewer dengan nilai di atas passing grade.',
    requirement: 'Proyek Akhir disetujui reviewer dan lulus post-test',
    earned: false,
  },
];

export const PRETEST_QUESTIONS: QuizQuestion[] = [
  {
    id: 'pre-1',
    question: 'Apa perbedaan mendasar yang paling membedakan Papan Interaktif Digital (PID / Interactive Flat Panel) dengan kombinasi proyektor LCD konvensional?',
    type: 'multiple_choice',
    options: [
      'PID hanya berfungsi jika disambungkan ke komputer server sekolah',
      'PID memiliki sensor sentuh multi-touch langsung di layar, sistem operasi mandiri, dan kualitas visual jernih tanpa bayangan tubuh',
      'PID membutuhkan ruangan yang gelap gulita agar teks terbaca siswa',
      'PID tidak mendukung pemutaran suara maupun video'
    ],
    correctAnswer: 1,
    explanation: 'PID (Interactive Flat Panel) memiliki teknologi sensor sentuh terintegrasi (seringkali 20-40 titik sentuh), OS mandiri (Android/Windows), kecerahan tinggi tanpa silau, dan bebas dari bayangan guru saat berdiri di depan layar.',
    pidTip: 'Saat mengajar di PID, Anda bebas berdiri di depan layar tanpa khawatir bayangan menutupi materi.'
  },
  {
    id: 'pre-2',
    question: 'Dalam konteks pembelajaran SD, manakah peran utama Media Pembelajaran Interaktif (MPI) yang tepat?',
    type: 'multiple_choice',
    options: [
      'Sebagai pengganti penuh kehadiran guru di dalam kelas',
      'Sebagai sarana membuat siswa SD aktif berinteraksi, berpikir kritis, memanipulasi objek belajar, dan berkolaborasi',
      'Sebagai pajangan slide presentasi teks panjang yang dibacakan bergiliran',
      'Sebagai alat pemutaran film kartun selama jam pelajaran berlangsung'
    ],
    correctAnswer: 1,
    explanation: 'MPI dirancang agar siswa tidak pasif menonton (passive viewer), melainkan aktif melakukan interaksi manipulatif langsung pada konsep pembelajaran.',
    pidTip: 'Rancanglah aktivitas di mana 2-3 siswa dapat maju bersamaan untuk menyelesaikan tantangan di PID.'
  },
  {
    id: 'pre-3',
    question: 'Fitur standar PID apa yang paling efektif dimanfaatkan guru SD untuk melakukan coretan penjelas, melingkari kata kunci, dan menyimpan catatan papan tulis secara digital?',
    type: 'multiple_choice',
    options: [
      'Digital Interactive Whiteboard & Annotation Tool',
      'Factory Reset Utility',
      'Bluetooth Discovery Scanner',
      'Airplane Mode Switcher'
    ],
    correctAnswer: 0,
    explanation: 'Interactive Whiteboard dan Annotation Tool memungkinkan anotasi di atas materi apa pun (PDF, Browser, Video) dan dapat diekspor langsung dalam format gambar/PDF.',
    pidTip: 'Gunakan pena stylus PID dengan dua warna berbeda untuk membedakan materi inti dan pertanyaan siswa.'
  },
  {
    id: 'pre-4',
    question: 'Ketika merancang MPI untuk digunakan pada layar PID ukuran 65 - 86 inci di kelas SD, pertimbangan visual apa yang paling krusial?',
    type: 'multiple_choice',
    options: [
      'Gunakan teks kecil sebanyak mungkin agar slide memuat seluruh isi buku paket',
      'Tombol sentuh dibuat minimal 44x44 pixel (touch target besar), kontras warna tinggi, dan ditempatkan pada jangkauan tinggi badan anak SD',
      'Letakkan tombol navigasi penting di sudut paling atas yang hanya bisa dicapai guru dengan kursi',
      'Gunakan animasi berkedip cepat tanpa jeda'
    ],
    correctAnswer: 1,
    explanation: 'Ketinggian layar PID dan ukuran tombol harus disesuaikan dengan antropometri fisik siswa SD (ergonomi touch target) serta visibilitas bagi anak di bangku belakang.',
    pidTip: 'Posisikan tombol interaksi utama di 1/3 bagian bawah layar PID.'
  },
  {
    id: 'pre-5',
    question: 'Mengapa MPI yang ideal untuk SD harus mampu dijalankan secara OFFLINE (luring) selain secara ONLINE?',
    type: 'multiple_choice',
    options: [
      'Karena PID dilarang terhubung ke jaringan internet apa pun',
      'Untuk mengantisipasi kendala koneksi internet sekolah yang tidak stabil sehingga proses belajar tidak terhenti',
      'Agar siswa tidak bisa melihat layar proyektor',
      'Karena file offline menghasilkan resolusi warna monokrom'
    ],
    correctAnswer: 1,
    explanation: 'Banyak sekolah dasar mengalami fluktuasi koneksi internet. Paket MPI offline (berbasis HTML/Web/Package) memastikan pembelajaran tetap lancar kapan pun dibutuhkan via flashdisk USB.',
    pidTip: 'Simpan file MPI offline di folder khusus atau Flashdisk USB yang selalu siap colok di port USB depan PID.'
  }
];

export const POSTTEST_QUESTIONS: QuizQuestion[] = [
  ...PRETEST_QUESTIONS,
  {
    id: 'post-6',
    question: 'Alur pedagogis "Learning → Practice → Challenge → Product → Assessment" diterapkan di PID Learning Lab dengan tujuan:',
    type: 'multiple_choice',
    options: [
      'Memastikan guru tidak sekadar membaca teori, melainkan mengalami langsung hingga menghasilkan 1 produk MPI siap pakai',
      'Membuat waktu pelatihan terasa lebih panjang dan melelahkan',
      'Membatasi kreativitas guru agar sesuai format tunggal yang kaku',
      'Menggantikan silabus kurikulum nasional'
    ],
    correctAnswer: 0,
    explanation: 'Pendekatan hands-on berorientasi produk menjamin setiap peserta workshop pulang membawa karya nyata yang siap diaplikasikan di kelasnya masing-masing.',
  },
  {
    id: 'post-7',
    question: 'Dalam lembar MPI Canvas, bagian manakah yang berfungsi sebagai panduan utama agar materi tidak melebar dari sasaran kurikulum?',
    type: 'multiple_choice',
    options: [
      'Tujuan Pembelajaran (Learning Objective)',
      'Nama Vendor Perangkat Keras',
      'Harga Paket Data Internet',
      'Warna Casing Belakang Layar'
    ],
    correctAnswer: 0,
    explanation: 'Tujuan pembelajaran yang dirumuskan secara jelas (ABCD) menjadi jangkar bagi seluruh interaktivitas dan asesmen dalam MPI.',
  },
  {
    id: 'post-8',
    question: 'Teknik interaksi PID manakah yang paling cocok untuk materi klasifikasi "Hewan Herbivora vs Karnivora" di kelas IPAS SD?',
    type: 'multiple_choice',
    options: [
      'Drag and Drop (menyeret gambar hewan ke dalam keranjang pengelompokan yang tepat)',
      'Membaca teks narasi sepanjang 5 halaman tanpa gambar',
      'Menonton video berdurasi 45 menit tanpa jeda',
      'Menekan tombol refresh browser terus-menerus'
    ],
    correctAnswer: 0,
    explanation: 'Aktivitas Drag & Drop di layar sentuh PID melibatkan motorik kinestetik siswa dan memberikan umpan balik visual instan atas pemahaman klasifikasi.',
  },
  {
    id: 'post-9',
    question: 'Ketika melakukan pengujian teknis pada tahap "PID MPI Test Lab", item checklist apa saja yang wajib dipastikan lolos?',
    type: 'multiple_choice',
    options: [
      'Keterbacaan visual, respon sentuh tombol/interaksi, keselarasan pedagogis, dan kompatibilitas online/offline',
      'Hanya warna latar belakang yang harus berwarna abu-abu',
      'Hanya kecepatan mengetik teks deskripsi',
      'Jumlah slide minimal harus 100 slide'
    ],
    correctAnswer: 0,
    explanation: 'Empat pilar uji PID Test Lab mencakup Aspek Visual, Aspek Interaksi Touch, Aspek Pembelajaran, dan Aspek Teknis (online & offline).',
  },
  {
    id: 'post-10',
    question: 'Bagaimana peran kecerdasan buatan (AI Co-Designer) yang tepat dalam pengembangan MPI oleh guru?',
    type: 'multiple_choice',
    options: [
      'AI sebagai co-designer membantu inspirasi ide dan struktur, sementara guru tetap sebagai instructional designer pemegang keputusan pedagogis',
      'AI menggantikan seluruh peran guru dan menentukan materi tanpa persetujuan guru',
      'AI hanya boleh digunakan untuk membuat gambar kartun lucu saja',
      'AI tidak boleh digunakan sama sekali dalam pendidikan SD'
    ],
    correctAnswer: 0,
    explanation: 'Guru memiliki pemahaman konteks psikologis peserta didiknya di kelas, sehingga AI diposisikan sebagai mitra pembantu (co-designer) yang mempercepat kerja kreatif guru.',
  }
];

export const WORKSHOP_MODULES: WorkshopModule[] = [
  {
    id: 'modul-0',
    slug: 'orientasi',
    number: 0,
    title: 'Orientasi & Pre-Test',
    subtitle: 'Selamat Datang di PID Learning Lab',
    durationMinutes: 10,
    estimatedTime: '10 Menit',
    stage: 'ORIENTASI',
    description: 'Kenali tujuan pelatihan, peta alur 2.5 jam, target produk akhir "1 Guru 1 MPI", dan ukur pemahaman awal Anda melalui pre-test.',
    lessons: [
      {
        id: 'les-0-1',
        title: 'Tujuan & Target Produk Akhir',
        durationMinutes: 3,
        content: `Selamat datang para guru hebat di **PID Learning Lab**!

Pelatihan berdurasi **2,5 jam (150 menit)** ini didesain khusus bagi guru Sekolah Dasar untuk mentransformasikan papan interaktif digital di kelas dari sekadar *"layar tontonan"* menjadi **"panggung interaksi siswa"**.

### Target Konkret Anda Hari Ini:
Menghasilkan **1 Media Pembelajaran Interaktif (MPI)** yang:

1. **Kontekstual**: Dirancang spesifik untuk materi ajar kelas Anda di SD.
2. **Interaktif Nyata**: Memiliki interaksi sentuh aktif *(Touch, Drag & Drop, Matching, dan Kuis)*.
3. **Fleksibel**: Dapat dioperasikan secara **Online** maupun **Offline (USB Flashdisk)** di layar PID.
4. **Terstandarisasi**: Terverifikasi melalui rubrik penilaian standar EdTech.`,
      },
      {
        id: 'les-0-2',
        title: 'Alur Workshop (Learning Journey)',
        durationMinutes: 3,
        content: `Berikut 6 tahapan yang akan Anda lalui secara berjenjang:

1. **KENALI (Modul 1)**: Memahami anatomi fisik PID, sensor sentuh, dan keunggulan pedagogisnya dibanding proyektor.
2. **COBA (Modul 2)**: Eksplorasi navigasi OS PID, gestur sentuh, dan fitur whiteboard interaktif.
3. **PAHAMI (Modul 3)**: Membedah 5 skenario pembelajaran SD berbasis sentuhan dan merumuskan topik interaktif.
4. **RANCANG (Modul 4)**: Menyusun konsep pedagogis di lembar **MPI Canvas** dan **Storyboard Builder**.
5. **BUAT (Modul 5)**: Memproduksi MPI nyata via **MPI Builder** 5 langkah dengan dukungan **AI Co-Designer**.
6. **UJI & SERTIFIKASI (Modul 6 & Proyek)**: Menguji di **PID Test Lab**, mengumpulkan proyek akhir, mendapatkan penilaian rubrik, dan menerbitkan **Sertifikat resmi 2,5 Jam**.`,
      },
      {
        id: 'les-0-3',
        title: 'Panduan Navigasi & PID Mode',
        durationMinutes: 4,
        content: `Aplikasi LMS ini dilengkapi fitur khusus **PID Mode**:

- **Layar Sentuh Ramah Jari**: Jika Anda membuka LMS ini langsung di layar besar PID sekolah Anda, aktifkan tombol **"PID Mode"** di pojok kanan atas layar.
- **Ukuran Tombol Membesar**: Ukuran tombol, teks panduan, dan area interaksi akan otomatis membesar menjadi target sentuh jari yang sangat nyaman *(minimal 52px)*.
- **Navigasi Konsisten**: Anda dapat berpindah modul menggunakan tombol navigasi di bagian bawah setiap halaman.`,
      }
    ],
    activity: {
      id: 'act-0',
      title: 'Mengerjakan Pre-Test Pengenalan PID',
      instruction: 'Jawablah 5 butir soal pre-test berikut. Hasil pre-test tidak menentukan kelulusan, melainkan memetakan pengetahuan awal Anda sebelum memulai workshop.',
      type: 'quiz',
    },
    published: true,
  },
  {
    id: 'modul-1',
    slug: 'modul-1',
    number: 1,
    title: 'Modul 1 — Mengenal PID',
    subtitle: 'Anatomi, Fungsi, dan Keunggulan Interaktivitas Layar Sentuh',
    durationMinutes: 20,
    estimatedTime: '20 Menit',
    stage: 'KENALI',
    description: 'Membedah perangkat keras Papan Interaktif Digital (Interactive Flat Panel), mengenali port penting, sensor multi-touch, dan perbedaannya dengan proyektor biasa.',
    lessons: [
      {
        id: 'les-1-1',
        title: 'Apa itu Papan Interaktif Digital (PID)?',
        durationMinutes: 7,
        content: `Papan Interaktif Digital (sering disebut *Interactive Flat Panel / IFP*) adalah layar tampilan cerdas berukuran besar (umumnya 65", 75", atau 86") yang menggabungkan kemampuan komputasi, visual, audio, dan sensor sentuh mutakhir:

- **Layar Ultra HD 4K**: Panel resolusi tinggi dengan kaca tempered anti-silau *(anti-glare)* berkekuatan 7H Mohs yang jernih dan tahan goresan kuku atau alat tulis anak SD.
- **Sensor Sentuh Presisi Tinggi**: Sensor inframerah multi-touch hingga **20–40 titik sentuh simultan**.
- **Sistem Operasi Bawaan**: Didukung dual OS *(Android terintegrasi dan modul OPS Windows opsional)*.
- **Sistem Audio & Multimedia Lengkap**: Pengeras suara stereo bertenaga tinggi, mikrofon array, dan kamera terintegrasi.

### Mengapa Proyektor Tidak Lagi Cukup untuk Siswa SD Masa Kini?

1. **Bebas Bayangan Tubuh (No Shadow Barrier)**: Pada proyektor, saat siswa maju ke depan layar, bayangan tubuhnya menutupi materi proyektor. Pada PID, cahaya bersumber langsung dari dalam panel *(LED backlit)*, sehingga bebas bayangan sama sekali!
2. **Keterbacaan Siang Hari (High Brightness)**: PID memiliki kecerahan hingga **400–500 nits**, tulisan materi tetap sangat jelas dan kontras meski lampu kelas menyala dan tirai jendela terbuka.
3. **Respon Sentuh Langsung (Direct Touch Interaction)**: Siswa dapat menyentuh objek belajar layaknya tablet raksasa yang ramah anak, bukan sekadar penonton pasif.`,
      },
      {
        id: 'les-1-2',
        title: 'Eksplorasi Komponen Fisik PID',
        durationMinutes: 8,
        content: `Klik titik hotspot pada gambar simulasi PID di tab **Praktik & Interaktivitas** untuk mengenali setiap komponen fisik penting:

- **Port USB Depan**: Untuk mencolokkan flashdisk MPI luring guru secara cepat tanpa harus merogoh bagian belakang layar.
- **Port HDMI & Touch Out**: Menghubungkan laptop guru jika ingin menampilkan layar eksternal dengan kontrol sentuh bolak-balik.
- **Sensor Infrared Touch Bezel**: Rangkaian inframerah di sekeliling bingkai yang mendeteksi sentuhan jari maupun stylus pasif.
- **Tombol Power & Kontrol Cepat**: Menyalakan, mematikan layar *(eco mode)*, mengatur volume suara, dan memunculkan menu beranda.`,
        interactiveType: 'hotspot'
      }
    ],
    activity: {
      id: 'act-1',
      title: 'Aktivitas: Kenali PID Anda (Matching Component)',
      instruction: 'Cocokkan setiap komponen PID di sisi kiri dengan fungsinya yang paling tepat di sisi kanan untuk menguji pemahaman Anda.',
      type: 'matching',
    },
    published: true,
  },
  {
    id: 'modul-2',
    slug: 'modul-2',
    number: 2,
    title: 'Modul 2 — Eksplorasi Fitur PID',
    subtitle: 'Misi Navigasi, Gestur Sentuh, & Papan Tulis Digital',
    durationMinutes: 20,
    estimatedTime: '20 Menit',
    stage: 'EKSPLORASI',
    description: 'Praktik langsung mengendalikan PID: 3 Misi interaktif navigasi sistem, penguasaan gestur multi-touch, dan simulasi whiteboard digital.',
    lessons: [
      {
        id: 'les-2-1',
        title: 'Misi 1: Navigasi Antarmuka Sistem PID',
        durationMinutes: 5,
        content: `Setiap PID memiliki menu navigasi mengambang *(Floating Navigation Bar)* yang dapat diakses dari sisi kiri atau kanan layar:

- **Home Button**: Kembali ke layar utama tempat kumpulan aplikasi pembelajaran.
- **Back Button**: Kembali ke satu layar sebelumnya.
- **Recent Apps**: Melihat aplikasi yang sedang berjalan untuk beralih secara cepat.
- **Volume & Brightness**: Pengaturan cepat tanpa harus masuk ke menu pengaturan rumit.
- **Annotation Overlay Tool**: Mengaktifkan pena digital di atas aplikasi apa pun yang sedang terbuka.`,
        interactiveType: 'gestures'
      },
      {
        id: 'les-2-2',
        title: 'Misi 2: Penguasaan Gestur Sentuh',
        durationMinutes: 5,
        content: `Kenali 5 gestur sentuh utama yang sering digunakan siswa SD di layar PID:

1. **Tap (Ketukan Tunggal)**: Memilih opsi jawaban atau menekan tombol navigasi.
2. **Double Tap (Ketukan Ganda)**: Membuka berkas media atau memperbesar gambar penting.
3. **Swipe (Usap Kiri/Kanan/Atas)**: Membalik halaman buku digital atau slide materi.
4. **Drag & Drop (Seret & Lepas)**: Memindahkan objek pembelajaran ke zona sasaran *(misal: menyusun tahapan siklus air)*.
5. **Pinch to Zoom (Cubit Dua Jari)**: Memperbesar peta geografi atau diagram organ tubuh manusia.`,
      },
      {
        id: 'les-2-3',
        title: 'Misi 3: Whiteboard Digital & Anotasi',
        durationMinutes: 10,
        content: `Papan tulis bawaan PID memungkinkan guru dan siswa menulis menggunakan jari atau stylus digital.

### Tantangan Praktik:
Coba gunakan kanvas simulasi whiteboard digital pada tab **Praktik & Interaktivitas**:

1. **Pilih Warna Pena**: Tersedia Biru, Kuning, Hijau, Merah, dan Putih.
2. **Tuliskan Catatan**: Tuliskan nama Anda dan satu tujuan materi kelas Anda.
3. **Eksplorasi Penghapus**: Coba fitur penghapus *(Eraser)* atau bersihkan papan *(Clear Board)*.
4. **Klaim Lencana**: Klik tombol **"☑ SAYA SUDAH MENCOBA"** untuk mengklaim lencana prestasi **PID Explorer**!`,
        interactiveType: 'whiteboard'
      }
    ],
    activity: {
      id: 'act-2',
      title: 'Misi Praktik Whiteboard & Gestur',
      instruction: 'Selesaikan simulasi coretan di Whiteboard PID Lab dan centang verifikasi praktik mandiri Anda.',
      type: 'whiteboard',
      rewardBadge: 'PID_EXPLORER'
    },
    published: true,
  },
  {
    id: 'modul-3',
    slug: 'modul-3',
    number: 3,
    title: 'Modul 3 — PID dalam Pembelajaran SD',
    subtitle: '5 Skenario Pedagogis Interaktif & Desain Topik Berbasis Sentuhan',
    durationMinutes: 15,
    estimatedTime: '15 Menit',
    stage: 'PAHAMI',
    description: 'Pelajari 5 skenario implementasi di ruang kelas SD: Presentasi, Demonstrasi, Eksplorasi, Kolaborasi, dan Asesmen Cepat.',
    lessons: [
      {
        id: 'les-3-1',
        title: '5 Skenario Pembelajaran Interaktif di SD',
        durationMinutes: 8,
        content: `Berikut 5 pola pemanfaatan PID yang disesuaikan dengan psikologi perkembangan siswa SD:

### 1. Skenario Presentasi Interaktif (Interactive Presentation)
Bukan sekadar guru berceramah satu arah. Guru menyajikan diagram rumpang dan menunjuk siswa untuk menekan **hotspot penjelas** secara aktif.

### 2. Skenario Demonstrasi Simulasi (Interactive Demonstration)
Guru memperagakan fenomena sains yang sulit dilihat kasat mata *(misal: peredaran darah manusia, gerhana matahari, atau aliran arus listrik)* menggunakan simulasi sentuh dinamis.

### 3. Skenario Eksplorasi Terbimbing (Guided Exploration)
Siswa secara bergiliran maju ke depan untuk memanipulasi variabel dalam simulasi *(misal: mengubah sudut bidang miring dan melihat laju benda)*.

### 4. Skenario Kolaborasi Multi-User (Collaborative Interaction)
Karena PID mendukung hingga **20 titik sentuh simultan**, 2 hingga 4 siswa dapat mengerjakan kuis pasangan atau menyusun teka-teki peta bersamaan di layar.

### 5. Skenario Asesmen Formatif Cepat (Quick Interactive Check)
Di akhir sesi pembelajaran, kuis interaktif disajikan di layar untuk mengetahui tingkat ketuntasan belajar secara visual dan menyenangkan.`,
        interactiveType: 'scenarios'
      }
    ],
    activity: {
      id: 'act-3',
      title: 'Aktivitas: Perencanaan Topik & Skenario Interaktif SD',
      instruction: 'Pilih mata pelajaran SD yang Anda ampu, tentukan 1 topik spesifik, dan tentukan skenario interaktivitas PID yang akan Anda kembangkan.',
      type: 'selection',
      rewardBadge: 'PID_PRACTITIONER'
    },
    published: true,
  },
  {
    id: 'modul-4',
    slug: 'modul-4',
    number: 4,
    title: 'Modul 4 — Merancang MPI (MPI Canvas & Storyboard)',
    subtitle: 'Prinsip Desain Instruksional & Storyboard Builder',
    durationMinutes: 15,
    estimatedTime: '15 Menit',
    stage: 'RANCANG',
    description: 'Rancang arsitektur media pembelajaran interaktif Anda menggunakan lembar kerja MPI Canvas interaktif dan susun 8 slide storyboard alur materi.',
    lessons: [
      {
        id: 'les-4-1',
        title: 'Prinsip Utama MPI: Siswa Melakukan Sesuatu',
        durationMinutes: 5,
        content: `> **"MPI bukan sekadar memindahkan teks buku cetak ke layar besar. MPI yang baik membuat tangan dan pikiran siswa bergerak!"**

### Aturan Emas Desain MPI untuk Layar PID SD:

1. **Rule of 30 Seconds**: Setiap maksimal **30–45 detik**, harus ada elemen yang dapat diklik, diseret, atau direspon oleh siswa.
2. **Besar & Ramah Jari (Touch-Target >= 44px)**: Tombol aksi utama tidak boleh berukuran kecil agar siswa tidak salah sentuh.
3. **Umpan Balik Instan (Immediate Audio-Visual Feedback)**: Jika siswa salah memilih atau menyeret, berikan efek visual atau suara ramah tanpa membuat anak merasa diadili.
4. **Navigasi Konsisten**: Tombol **"Lanjut"**, **"Kembali"**, dan **"Beranda"** selalu berada di posisi yang konsisten di setiap slide.`,
      },
      {
        id: 'les-4-2',
        title: 'Lembar Kerja MPI Canvas',
        durationMinutes: 10,
        content: `**MPI Canvas** adalah instrumen 1 halaman yang merangkum rancangan pembelajaran Anda sebelum diproduksi menjadi media digital:

1. **Identitas Guru & Sekolah**: Profil pengembang media.
2. **Mata Pelajaran & Kelas SD**: Target sasaran kurikulum.
3. **Topik Materi Pokok**: Materi esensial yang diajarkan.
4. **Rumusan Tujuan Pembelajaran (ABCD)**: Audience, Behavior, Condition, Degree.
5. **Masalah Pembelajaran**: Miskonsepsi atau kesulitan konkret siswa di kelas.
6. **Aktivitas Interaktif Utama**: Apa yang disentuh/digerakkan siswa di PID.
7. **Bentuk Asesmen & Evaluasi**: Format cek pemahaman siswa.`,
        interactiveType: 'canvas'
      }
    ],
    activity: {
      id: 'act-4',
      title: 'Menyusun MPI Canvas & Storyboard 8 Halaman',
      instruction: 'Isi lengkap form MPI Canvas dan sesuaikan urutan 8 halaman storyboard Anda. Data tersimpan otomatis ke profil workshop Anda.',
      type: 'canvas',
      rewardBadge: 'MPI_DESIGNER'
    },
    published: true,
  },
  {
    id: 'modul-5',
    slug: 'modul-5',
    number: 5,
    title: 'Modul 5 — Membuat MPI (MPI Builder & Mode Offline)',
    subtitle: '3 Jalur Produksi & Wizard Generator MPI 5 Langkah',
    durationMinutes: 45,
    estimatedTime: '45 Menit',
    stage: 'BUAT',
    description: 'Tahap inti produksi MPI! Gunakan MPI Builder terintegrasi dengan bantuan AI Co-Designer untuk menghasilkan paket MPI interaktif online dan offline.',
    lessons: [
      {
        id: 'les-5-1',
        title: '3 Pilihan Jalur Pembuatan MPI',
        durationMinutes: 10,
        content: `Guru dapat memilih jalur produksi yang paling sesuai dengan tingkat kenyamanan teknologinya:

### JALUR 1: Pemula (Slide Interaktif)
- **Aplikasi Rekomendasi**: Microsoft PowerPoint, Canva for Education, Google Slides.
- **Kunci Interaktivitas**: Memanfaatkan fitur **Action Button**, **Hyperlink antar slide**, dan **Animasi Trigger**.
- **Kelebihan**: Sangat familiar dan mudah dibuat oleh guru SD.

### JALUR 2: Interaktif Lanjutan (App-Based)
- **Aplikasi Rekomendasi**: Genially, BookWidgets, Quizizz Interactive Lessons, Wordwall.
- **Kunci Interaktivitas**: Mini-games drag & drop, roda putar acak nama siswa, dan kuis papan peringkat tim.
- **Kelebihan**: Visual kaya animasi, langsung dapat dibuka via browser PID.

### JALUR 3: Web-Based MPI (Paket Mandiri Online + Offline)
- **Teknologi**: Paket Web HTML5 + CSS + JavaScript *(Dibuat via MPI Builder LMS ini!)*.
- **Kunci Interaktivitas**: Bekerja **100% responsif pada layar sentuh PID**, tidak memerlukan kuota internet jika disimpan di flashdisk USB, dan bebas lisensi.
- **Kelebihan**: Bebas ketergantungan jaringan internet sekolah!`,
      },
      {
        id: 'les-5-2',
        title: 'Struktur Paket MPI Offline',
        durationMinutes: 10,
        content: `Agar media pembelajaran Anda dapat dioperasikan secara **offline di PID** tanpa koneksi internet sama sekali, struktur paket yang dihasilkan adalah:

\`\`\`text
MPI-KelasSD/
├── index.html       <- Berkas utama, cukup klik dua kali di PID
├── style.css        <- Pengaturan tata letak dan tombol sentuh ramah PID
├── script.js        <- Logika interaktivitas sentuh & skor audio
└── PETUNJUK_PID.txt <- Panduan colok Flashdisk USB ke layar PID
\`\`\`

Fitur **"DOWNLOAD OFFLINE PACKAGE"** pada **MPI Builder** akan membungkus seluruh berkas ini dalam satu file ZIP yang siap diekstrak langsung ke Flashdisk Anda!`,
        interactiveType: 'builder'
      }
    ],
    activity: {
      id: 'act-5',
      title: 'Praktik Pembuatan MPI dengan MPI Builder',
      instruction: 'Buka MPI Builder, ikuti 5 langkah wizard pembuatan media, preview interaktivitasnya, dan generate paket MPI Anda.',
      type: 'simulator',
      rewardBadge: 'MPI_CREATOR'
    },
    published: true,
  },
  {
    id: 'modul-6',
    slug: 'modul-6',
    number: 6,
    title: 'Modul 6 — Uji MPI & Evaluasi Akhir',
    subtitle: 'PID MPI Test Lab, Pengumpulan Proyek, & Post-Test',
    durationMinutes: 25,
    estimatedTime: '25 Menit',
    stage: 'UJI',
    description: 'Uji coba ketahanan MPI Anda pada simulator PID Test Lab, kumpulkan proyek "1 Guru 1 MPI", kerjakan post-test, dan selesaikan refleksi akhir.',
    lessons: [
      {
        id: 'les-6-1',
        title: 'Uji Kelayakan di PID MPI Test Lab',
        durationMinutes: 10,
        content: `Sebelum media pembelajaran Anda diserahkan kepada reviewer workshop dan digunakan bersama anak-anak di kelas, Anda wajib melakukan audit mandiri melalui **4 dimensi pengujian**:

1. **Uji Visual**: Apakah tulisan terbaca jelas dari jarak 4 meter di sudut ruang kelas? Apakah kontras warna tajam?
2. **Uji Interaksi**: Apakah seluruh tombol dan zona drop merespon sentuhan jari dengan akurat?
3. **Uji Pembelajaran**: Apakah instruksi mudah dipahami oleh tingkat usia siswa SD target Anda?
4. **Uji Teknis**: Apakah paket offline dapat dibuka secara mandiri melalui flashdisk tanpa internet?`,
        interactiveType: 'testlab'
      },
      {
        id: 'les-6-2',
        title: 'Rubrik Penilaian Proyek 1 Guru 1 MPI',
        durationMinutes: 5,
        content: `Reviewer workshop akan memberikan penilaian objektif dengan total 100 poin berdasarkan rubrik berikut:

| Aspek Penilaian | Bobot | Kriteria Utama |
|---|---|---|
| **1. Kesesuaian Tujuan Pembelajaran** | **25 Poin** | Materi dan alur interaksi selaras dengan capaian kurikulum SD. |
| **2. Kualitas & Ketepatan Materi** | **20 Poin** | Konten materi bebas dari miskonsepsi dan ramah anak. |
| **3. Interaktivitas Bermakna di PID** | **25 Poin** | Siswa terlibat aktif memanipulasi objek di layar. |
| **4. Keterbacaan & Ergonomi PID** | **15 Poin** | Ukuran touch target memadai (>=44px), visual kontras tinggi. |
| **5. Keterpakaian Teknis (Online/Offline)** | **15 Poin** | Berjalan lancar tanpa error, navigasi konsisten. |
| **TOTAL** | **100 Poin** | **Passing Grade Kelulusan: 70 Poin** |`,
      }
    ],
    activity: {
      id: 'act-6',
      title: 'Checklist Uji Lab & Pengumpulan Proyek Akhir',
      instruction: 'Jalankan pengujian di PID Test Lab, centang checklist verifikasi, kumpulkan berkas/link proyek MPI Anda, dan selesaikan refleksi serta post-test.',
      type: 'checklist',
      rewardBadge: 'PID_MPI_PRACTITIONER'
    },
    published: true,
  }
];

export const INITIAL_SAMPLE_PROJECTS = [
  {
    id: 'proj-demo-1',
    ownerId: 'user-sample-1',
    ownerName: 'Budi Santoso, S.Pd.',
    ownerSchool: 'SD Negeri 1 Percobaan',
    title: 'Petualangan Daur Air & Siklus Hujan Interaktif',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    grade: 'Kelas 4 SD',
    topic: 'Siklus Air & Pelestarian Sumber Air Bersih',
    learningObjective: 'Melalui simulasi interaktif di layar PID, siswa kelas 4 dapat mengurutkan 4 tahapan daur air (evaporasi, kondensasi, presipitasi, infiltrasi) secara tepat.',
    learningProblem: 'Siswa sering keliru membedakan antara evaporasi dan kondensasi saat hanya membaca bagan 2D di buku paket.',
    interactiveActivity: 'Siswa maju ke depan PID untuk menyeret ikon awan, matahari, dan tetesan air ke dalam diagram siklus air, serta menguji kecepatan infiltrasi air tanah.',
    assessmentForm: 'Kuis interaktif 5 soal pilihan ganda di layar PID dengan skor otomatis.',
    description: 'Media pembelajaran interaktif berbasis web HTML5 yang ramah sentuhan PID. Dilengkapi animasi daur air, tombol kontrol interaktif di bagian bawah layar, dan mode luring.',
    mode: 'ONLINE + OFFLINE' as const,
    status: 'APPROVED' as const,
    score: 92,
    rubric: {
      kesesuaianTujuan: 24,
      kualitasMateri: 19,
      interaktivitas: 24,
      keterbacaanPID: 13,
      keterpakaianTeknis: 12,
      total: 92,
    },
    feedback: 'Karya luar biasa Pak Budi! Penempatan tombol di 1/3 bawah layar sangat ramah untuk siswa kelas 4 SD. Aktivitas drag-and-drop daur air sangat kinestetik.',
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        type: 'Opening' as const,
        title: 'Petualangan Daur Air Interaktif',
        content: 'Selamat Datang di Lab Air Digital! Sentuh tombol MULAI untuk memulai petualangan sains.',
        interactionType: 'Tap tombol Mulai besar di tengah',
        visualPrompt: 'Ilustrasi cerah awan tersenyum dan rintik air jernih'
      },
      {
        id: 'p2',
        pageNumber: 2,
        type: 'Tujuan' as const,
        title: 'Tujuan Belajar Hari Ini',
        content: '1. Mengidentifikasi proses evaporasi\n2. Memahami kondensasi\n3. Menjelaskan terjadinya hujan',
        interactionType: 'Tap setiap butir untuk mendengar narasi suara',
      },
      {
        id: 'p3',
        pageNumber: 3,
        type: 'Materi' as const,
        title: 'Apa itu Evaporasi?',
        content: 'Panas sinar matahari memanaskan air di danau, sungai, dan laut sehingga menguap ke udara.',
        interactionType: 'Sentuh ikon matahari untuk menaikkan suhu air',
      },
      {
        id: 'p4',
        pageNumber: 4,
        type: 'Aktivitas' as const,
        title: 'Susun Siklus Air',
        content: 'Seret kotak nama proses ke posisi yang tepat pada diagram siklus air!',
        interactionType: 'Drag & Drop sentuh',
      },
      {
        id: 'p5',
        pageNumber: 5,
        type: 'Multiple Choice' as const,
        title: 'Kuis Singkat: Awan Terbentuk dari...',
        content: 'Ketika uap air naik dan mendingin, ia berubah menjadi titik-titik air melalui proses:',
        interactionType: 'Tap opsi jawaban benar di layar PID',
      },
    ],
    version: 2,
    versionsHistory: [
      {
        versionNumber: 1,
        submittedAt: '2026-09-24 09:30',
        title: 'Draft Awal Siklus Air',
        notes: 'Versi awal sebelum pengujian responsivitas offline',
        pagesCount: 4,
        status: 'REVISION' as const,
        feedback: 'Teks soal pada halaman kuis perlu diperbesar agar terbaca oleh siswa di bangku belakang.',
      },
      {
        versionNumber: 2,
        submittedAt: '2026-09-24 11:15',
        title: 'Perbaikan Ukuran Huruf & Penambahan Suara',
        notes: 'Sudah diuji coba di PID Test Lab dan lulus seluruh aspek checklist',
        pagesCount: 5,
        status: 'APPROVED' as const,
        feedback: 'Karya luar biasa Pak Budi! Penempatan tombol di 1/3 bawah layar sangat ramah untuk siswa kelas 4 SD.',
      }
    ],
    testLabPassed: true,
    checklistVerified: true,
    createdAt: '2026-09-24 09:30',
    updatedAt: '2026-09-24 11:15',
  },
  {
    id: 'proj-demo-2',
    ownerId: 'user-sample-2',
    ownerName: 'Siti Rahmawati, S.Pd.',
    ownerSchool: 'SDIT Bina Insani Mandiri',
    title: 'Eksplorasi Pecahan Sederhana Pizza & Cokelat',
    subject: 'Matematika',
    grade: 'Kelas 3 SD',
    topic: 'Pecahan Senilai (1/2, 1/3, 1/4)',
    learningObjective: 'Siswa mampu memotong dan membandingkan pecahan senilai secara visual melalui manipulasi potongan pizza interaktif di PID.',
    learningProblem: 'Siswa kesulitan memahami konsep 1/4 lebih kecil dari 1/2.',
    interactiveActivity: 'Siswa memotong pizza digital menggunakan sentuhan jari (swipe slice) dan mencocokkan nilai pecahan ke piring yang sesuai.',
    assessmentForm: 'Tantangan memasangkan potongan pizza dengan lambang pecahan.',
    description: 'Media pecahan ramah sentuhan PID yang membuat matematika menjadi konkret dan lezat.',
    mode: 'ONLINE' as const,
    status: 'UNDER_REVIEW' as const,
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
    pages: [
      {
        id: 'p2-1',
        pageNumber: 1,
        type: 'Opening' as const,
        title: 'Dapur Pecahan Ceria',
        content: 'Ayo belajar pecahan sambil bermain memotong pizza lezat!',
        interactionType: 'Tap tombol Buka Dapur',
      },
      {
        id: 'p2-2',
        pageNumber: 2,
        type: 'Aktivitas' as const,
        title: 'Bagi Pizza Jadi 4 Bagian',
        content: 'Gunakan jarimu untuk menarik garis potong melintang di atas pizza!',
        interactionType: 'Swipe potongan pisau digital',
      }
    ],
    version: 1,
    versionsHistory: [
      {
        versionNumber: 1,
        submittedAt: '2026-09-24 10:45',
        title: 'Pengumpulan Awal Dapur Pecahan',
        notes: 'Mohon masukan untuk ukuran tombol potong pizza.',
        pagesCount: 2,
        status: 'UNDER_REVIEW' as const,
      }
    ],
    testLabPassed: true,
    checklistVerified: true,
    createdAt: '2026-09-24 10:45',
    updatedAt: '2026-09-24 10:45',
  }
];

export const INITIAL_REFLECTIONS = {
  q1: 'Apa fitur PID yang paling bermanfaat bagi pembelajaran di kelas Anda?',
  q2: 'Skenario interaktif apa yang paling ingin segera Anda terapkan bersama siswa SD Anda?',
  q3: 'Keterampilan atau materi lanjutan apa yang masih ingin Anda pelajari lebih dalam seputar EdTech dan PID?',
};
