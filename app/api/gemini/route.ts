import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { action, subject, grade, topic, objective, customPrompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback mock smart generation if API key is not yet set
      return NextResponse.json({
        success: true,
        isFallback: true,
        data: getFallbackContent(action, subject, grade, topic, objective),
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let systemInstruction = `Anda adalah Co-Designer EdTech & Spesialis Papan Interaktif Digital (PID) untuk Sekolah Dasar (SD). 
Prinsip utama: "AI sebagai co-designer, guru tetap sebagai instructional designer".
Format jawaban terstruktur, ramah guru SD, bahasa Indonesia edukatif yang jelas dan interaktif.`;

    let prompt = '';

    if (action === 'generate-objective') {
      prompt = `Buatkan 3 opsi Rumusan Tujuan Pembelajaran yang terukur (ABCD: Audience, Behavior, Condition, Degree) dan berorientasi interaktif untuk:
Mata Pelajaran: ${subject || 'IPAS'}
Kelas: ${grade || 'Kelas 4 SD'}
Topik: ${topic || 'Siklus Daur Hidup Hewan'}
Sertakan indikator interaktivitas yang cocok untuk Papan Interaktif Digital (PID touchscreen).`;
    } else if (action === 'generate-storyboard') {
      prompt = `Buatkan struktur Storyboard Media Pembelajaran Interaktif (MPI) 7-8 halaman untuk PID:
Mata Pelajaran: ${subject}
Kelas: ${grade}
Topik: ${topic}
Tujuan: ${objective}
Sertakan untuk tiap slide/halaman:
1. Tipe Halaman (Opening, Tujuan, Materi, Eksplorasi, Aktivitas Interaktif Touchscreen, Latihan, Kuis Interaktif, Refleksi)
2. Deskripsi Konten & Visual
3. Interaksi PID (Tap/Drag-drop/Drawing Whiteboard/Matching)
Format keluaran JSON yang rapi dengan array pages [{ pageNumber, type, title, visualPrompt, interactionType, content }]. Berikan hanya JSON valid.`;
    } else if (action === 'generate-quiz') {
      prompt = `Buatkan 3 soal kuis interaktif yang sangat cocok dimainkan siswa di depan Papan Interaktif Digital:
Mata Pelajaran: ${subject}
Kelas: ${grade}
Topik: ${topic}
Format keluaran JSON array:
[
  {
    "question": "teks pertanyaan menarik",
    "type": "multiple_choice",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correctAnswer": 0,
    "explanation": "penjelasan mendidik",
    "pidInteractiveTip": "Contoh: Minta siswa maju dan menyentuh pilihan yang tepat di layar PID"
  }
]
Hanya berikan JSON valid.`;
    } else if (action === 'generate-activity') {
      prompt = `Rancanglah 1 skenario aktivitas kolaboratif di depan Papan Interaktif Digital (PID) berdurasi 7-10 menit untuk:
Mata Pelajaran: ${subject}
Kelas: ${grade}
Topik: ${topic}
Sertakan: Nama Aktivitas, Aturan Main Touch/Whiteboard, Peran Siswa di depan layar, Peran Siswa di bangku, dan Panduan Guru.`;
    } else {
      prompt = customPrompt || `Berikan rekomendasi perancangan Media Pembelajaran Interaktif PID untuk topik ${topic} kelas ${grade}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    const responseText = response.text || '';
    return NextResponse.json({
      success: true,
      text: responseText,
    });
  } catch (error: unknown) {
    console.error('Gemini API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

function getFallbackContent(action: string, subject: string, grade: string, topic: string, objective: string) {
  const t = topic || 'Siklus Air';
  const s = subject || 'IPAS';
  const g = grade || 'Kelas 4 SD';

  if (action === 'generate-objective') {
    return [
      `1. Melalui eksplorasi simulasi interaktif di Papan Interaktif Digital (PID), siswa ${g} dapat mengidentifikasi 4 tahapan utama ${t} dengan ketepatan minimal 85%.`,
      `2. Melalui aktivitas drag-and-drop di layar PID secara bergiliran, siswa dapat menyusun urutan proses ${t} secara tepat dan komunikatif.`,
      `3. Setelah menyelesaikan kuis interaktif di PID, siswa dapat menganalisis peran penting ${t} dalam kehidupan sehari-hari secara kritis.`,
    ].join('\n\n');
  }

  if (action === 'generate-activity') {
    return `### Aktivitas Kolaboratif PID: "Detektif ${t}"
- **Format Interaksi**: 2 Siswa di layar PID (Touchscreen Whiteboard), siswa lain memberi petunjuk.
- **Langkah**:
  1. Guru menampilkan diagram rumpang di layar PID.
  2. Siswa pertama menyeret elemen (Drag & Drop) ke posisi yang tepat.
  3. Siswa kedua menggunakan stylus/jari untuk melingkari zona kunci.
  4. Seluruh kelas mengevaluasi bersama dengan tombol cek jawaban otomatis.
- **Catatan Pedagogis**: Menstimulasi keterlibatan aktif kinestetik dan visual siswa SD.`;
  }

  return `Rekomendasi Co-Designer untuk ${s} (${g}) - ${t}:
1. Gunakan warna kontras tinggi agar elemen interaktif mudah dibedakan oleh siswa dari jarak 3-5 meter di kelas.
2. Tempatkan tombol interaksi di zona bawah atau tengah layar PID agar mudah dijangkau tinggi badan siswa SD.
3. Berikan umpan balik suara ceria dan animasi bintang saat siswa berhasil menyelesaikan interaksi.`;
}
