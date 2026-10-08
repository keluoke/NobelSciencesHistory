import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Radio } from 'lucide-react';

export const GravitationalWavesSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [m1, setM1] = useState<number>(36); // Solar masses M_sun
  const [m2, setM2] = useState<number>(29); // Solar masses M_sun
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [orbitRadius, setOrbitRadius] = useState<number>(55); // Separation
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play synthesized LIGO chirp sound using Web Audio API
  const playChirpSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Chirp frequency ramps from 40Hz up to 260Hz in 0.6 seconds
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(45, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch {
      // Audio might be blocked by browser autoplay policy
    }
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    let waveOffset = 0;
    const waveformHistory: number[] = new Array(80).fill(0);

    const centerX = 190;
    const centerY = canvas.height / 2;

    const render = () => {
      if (isPlaying) {
        // As orbit shrinks, orbital frequency omega increases dramatically (Kepler's 3rd law)
        const omega = 0.08 * Math.pow(60 / Math.max(15, orbitRadius), 1.5);
        angle += omega;
        waveOffset += 1.8;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Spacetime Grid with gravitational wave distortion ripples
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < 380; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 8) {
          const dist = Math.hypot(x - centerX, y - centerY);
          const ripple = Math.sin(dist * 0.1 - waveOffset) * (80 / (dist + 30));
          const distortedX = x + (ripple * (x - centerX)) / (dist + 1);
          if (y === 0) ctx.moveTo(distortedX, y);
          else ctx.lineTo(distortedX, y);
        }
        ctx.stroke();
      }

      // Gravitational Wave expanding ripples (quadrupole wave)
      for (let r = (waveOffset * 3) % 40; r < 240; r += 40) {
        const alpha = Math.max(0, 0.35 - r / 260);
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Draw Binary Black Holes
      const r1 = (orbitRadius * m2) / (m1 + m2);
      const r2 = (orbitRadius * m1) / (m1 + m2);

      const bh1X = centerX + Math.cos(angle) * r1;
      const bh1Y = centerY + Math.sin(angle) * r1;

      const bh2X = centerX - Math.cos(angle) * r2;
      const bh2Y = centerY - Math.sin(angle) * r2;

      // Draw BH1
      const size1 = Math.max(7, Math.sqrt(m1) * 1.8);
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(bh1X, bh1Y, size1, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Draw BH2
      const size2 = Math.max(6, Math.sqrt(m2) * 1.8);
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(bh2X, bh2Y, size2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Orbital dashed path
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, r1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, centerY, r2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Right Side: Virtual LIGO Interferometer & Chirp Oscilloscope
      const ligoStartX = 400;

      // Divider line
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(380, 20);
      ctx.lineTo(380, canvas.height - 20);
      ctx.stroke();

      // Title
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText('LIGO 4km 激光干涉仪臂长形变', ligoStartX, 32);

      // Virtual LIGO L-Shape representation
      const cornerX = ligoStartX + 50;
      const cornerY = 120;
      const armLength = 70;

      // Gravitational wave deformation factor h
      const currentStrain = Math.sin(angle * 2) * (18 / Math.max(15, orbitRadius));
      const armXLength = armLength + currentStrain * 8;
      const armYLength = armLength - currentStrain * 8;

      // X-Arm (Horizontal)
      ctx.strokeStyle = currentStrain > 0 ? '#38bdf8' : '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cornerX, cornerY);
      ctx.lineTo(cornerX + armXLength, cornerY);
      ctx.stroke();

      // Y-Arm (Vertical)
      ctx.strokeStyle = currentStrain < 0 ? '#38bdf8' : '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cornerX, cornerY);
      ctx.lineTo(cornerX, cornerY - armYLength);
      ctx.stroke();

      // Laser Beam Splitter mirror
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(cornerX, cornerY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Labels on arms
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText(`ΔLx/L: ${(currentStrain * 0.1).toFixed(2)}×10⁻²¹`, cornerX + 10, cornerY + 16);
      ctx.fillText(`ΔLy/L: ${(-currentStrain * 0.1).toFixed(2)}×10⁻²¹`, cornerX - 65, cornerY - 30);

      // 4. Chirp Waveform Chart at bottom right
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(ligoStartX, 175, 230, 160);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(ligoStartX, 175, 230, 160);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('引力波应变时序图 h(t) [Chirp]', ligoStartX + 8, 192);

      // Record current strain into history
      if (isPlaying) {
        waveformHistory.shift();
        waveformHistory.push(currentStrain);
      }

      // Draw waveform trace
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const waveMidY = 255;
      for (let i = 0; i < waveformHistory.length; i++) {
        const px = ligoStartX + 10 + (i / waveformHistory.length) * 210;
        const py = waveMidY - waveformHistory[i] * 6;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [m1, m2, orbitRadius, isPlaying]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400" />
            LIGO 双黑洞碰撞与引力波涟漪模拟 (2017 诺贝尔奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            时空度规微扰横波探测：四公里干涉臂上测出仅相当于质子直径万分之一的时空伸缩
          </p>
        </div>

        {/* Audio Chirp Button */}
        <button
          onClick={() => {
            playChirpSound();
            setSoundEnabled(true);
          }}
          className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Volume2 className="w-3.5 h-3.5" />
          试听宇宙“啁啾 (Chirp)”引力波声
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Canvas Stage */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950 border border-slate-800 relative">
          <canvas
            ref={canvasRef}
            width={650}
            height={380}
            className="w-full max-w-full rounded-lg"
          />

          {/* Interactive footer notification */}
          <div className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="text-slate-300">
                双黑洞公转辐射能量，轨道迅速衰减！并在最后千分之一秒发出特征“啁啾”升频高音。
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title={isPlaying ? '暂停' : '继续'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setOrbitRadius(55);
                  setIsMerged(false);
                }}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="重置初始轨道"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Parameter Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              天体物理碰撞参数
            </h5>

            {/* Black hole 1 mass */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">主黑洞质量 (M1)</span>
                <span className="font-code text-purple-400 font-semibold">{m1} M☉ (太阳质量)</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={m1}
                onChange={(e) => setM1(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* Black hole 2 mass */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">次黑洞质量 (M2)</span>
                <span className="font-code text-cyan-400 font-semibold">{m2} M☉ (太阳质量)</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={m2}
                onChange={(e) => setM2(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Orbital separation slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">双星轨道分离间距</span>
                <span className="font-code text-amber-400 font-semibold">{orbitRadius} km</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                value={orbitRadius}
                onChange={(e) => setOrbitRadius(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-code mt-0.5">
                <span>15km (终极并合)</span>
                <span>80km (旋进早期)</span>
              </div>
            </div>

            {/* Trigger merger shortcut button */}
            <button
              onClick={() => {
                setOrbitRadius(18);
                playChirpSound();
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              模拟最终瞬间撞击并合 (Ringdown)
            </button>
          </div>

          {/* Historical Legacy */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-purple-400 font-medium">GW150914：时空百年交响曲</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              2015年9月14日，人类首次截获两个分别为36和29倍太阳质量黑洞在13亿年前碰撞的引力波。
              在并合瞬间，约有3个太阳质量的物质在不到0.1秒内全额转化为引力波辐射，其峰值功率超过了当时可观测宇宙中所有恒星发光功率总和的几十倍！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
