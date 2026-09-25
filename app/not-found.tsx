import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-sky-400 flex items-center justify-center text-3xl mb-4 font-bold">
        404
      </div>
      <h2 className="text-2xl font-black mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-sm text-slate-400 max-w-md mb-6">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
