'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  PenTool, 
  Eraser, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  Palette,
  Maximize2
} from 'lucide-react';

export default function WhiteboardCanvas() {
  const { markActivityCompleted, badges } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#38BDF8'); // Sky blue default
  const [lineWidth, setLineWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const colors = [
    { label: 'Sky Blue', value: '#38BDF8' },
    { label: 'Gold Amber', value: '#F59E0B' },
    { label: 'Emerald Green', value: '#10B981' },
    { label: 'Crimson Red', value: '#EF4444' },
    { label: 'White Chalk', value: '#FFFFFF' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Background color
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines for whiteboard feel
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    for (let x = 40; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 40; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = isEraser ? '#0F172A' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Re-draw grid
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    for (let x = 40; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 40; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    setHasDrawn(false);
  };

  const handleVerify = () => {
    setIsVerified(true);
    markActivityCompleted('act-2', 'PID_EXPLORER');
  };

  return (
    <div className="bg-[#1C2541] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <PenTool className="w-5 h-5 text-amber-400" />
            <span>Simulasi Papan Tulis Digital (PID Whiteboard)</span>
          </h4>
          <p className="text-xs text-slate-300">
            <strong>Instruksi Praktik:</strong> Tuliskan nama Anda dan 1 tujuan pembelajaran SD menggunakan stylus/jari di kanvas bawah.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Colors */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  setColor(c.value);
                  setIsEraser(false);
                }}
                style={{ backgroundColor: c.value }}
                className={`w-6 h-6 rounded-full border transition ${
                  color === c.value && !isEraser
                    ? 'ring-2 ring-white scale-110'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                title={c.label}
              />
            ))}
          </div>

          {/* Stroke size */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setLineWidth(3)}
              className={`px-2 py-1 text-xs font-bold rounded ${lineWidth === 3 ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Halus
            </button>
            <button
              onClick={() => setLineWidth(6)}
              className={`px-2 py-1 text-xs font-bold rounded ${lineWidth === 6 ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Sedang
            </button>
            <button
              onClick={() => setLineWidth(12)}
              className={`px-2 py-1 text-xs font-bold rounded ${lineWidth === 12 ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Tebal
            </button>
          </div>

          {/* Eraser */}
          <button
            onClick={() => setIsEraser(!isEraser)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition ${
              isEraser 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Penghapus"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden sm:inline">Penghapus</span>
          </button>

          {/* Clear */}
          <button
            onClick={clearCanvas}
            className="p-2 rounded-xl bg-slate-900 text-rose-400 border border-slate-700 hover:bg-rose-950/40 text-xs font-semibold"
            title="Bersihkan Papan Tulis"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HTML5 Canvas area */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl border-4 border-slate-700 overflow-hidden shadow-inner cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block"
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-500 text-xs sm:text-sm">
            <PenTool className="w-8 h-8 mb-2 text-slate-600 animate-bounce" />
            <p>Sentuh / klik dan geser di sini untuk mulai menulis di Whiteboard PID...</p>
            <p className="text-[11px] text-slate-600 mt-1">Mendukung stylus pen dan sentuhan multi-touch</p>
          </div>
        )}
      </div>

      {/* Verification Checkpoint Action */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Reward: Membuka Lencana <strong>PID Explorer</strong></span>
        </div>

        {!isVerified ? (
          <button
            onClick={handleVerify}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm shadow-lg flex items-center gap-2 active:scale-95 transition"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>☑ SAYA SUDAH MENCOBA</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>🏅 PID Explorer Unlocked! Misi Modul 2 Tuntas</span>
          </div>
        )}
      </div>
    </div>
  );
}
