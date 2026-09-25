import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import ToastContainer from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'PID Learning Lab - Workshop Papan Interaktif Digital SD',
  description: 'LMS Workshop Pemanfaatan Papan Interaktif Digital sebagai Media Pembelajaran SD. Kenali • Eksplorasi • Rancang • Buat • Uji.',
  openGraph: {
    title: 'PID Learning Lab - Workshop Papan Interaktif Digital SD',
    description: 'Kenali • Eksplorasi • Rancang • Buat • Uji media pembelajaran interaktif untuk layar sentuh PID SD.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PID Learning Lab - Workshop Papan Interaktif Digital SD',
    description: 'Kenali • Eksplorasi • Rancang • Buat • Uji media pembelajaran interaktif untuk layar sentuh PID SD.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0B132B] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
