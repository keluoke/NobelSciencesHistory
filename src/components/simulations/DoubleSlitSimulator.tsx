import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Sliders, Eye } from 'lucide-react';

interface ParticleHit {
  y: number;
}

export const DoubleSlitSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [mode, setMode] = useState<'quantum_particles' | 'continuous_wave'>('quantum_particles');
  const [slitDistance, setSlitDistance] = useState<number>(40); // separation d (pixels/scale)
  const [wavelength, setWavelength] = useState<number>(500); // nm
  const [particleSpeedRate, setParticleSpeedRate] = useState<number>(5); // particles per frame
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [totalHits, setTotalHits] = useState<number>(0);

  const hitsRef = useRef<ParticleHit[]>([]);

  // Reset accumulator
  const handleReset = () => {
    hitsRef.current = [];
    setTotalHits(0);
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let wavePhase = 0;

    const sourceX = 40;
    const slitBarrierX = 220;
    const screenX = 540;
    const centerY = canvas.height / 2;

    const slit1Y = centerY - slitDistance / 2;
    const slit2Y = centerY + slitDistance / 2;

    // Intensity calculation formula at screen position y
    const getIntensity = (y: number) => {
      const dy = y - centerY;
      const k = (2 * Math.PI) / (wavelength * 0.08); // scaled wavenumber
      const r1 = Math.hypot(screenX - slitBarrierX, y - slit1Y);
      const r2 = Math.hypot(screenX - slitBarrierX, y - slit2Y);
      const phaseDiff = k * (r2 - r1);
      // Double slit interference: I = cos^2(delta/2) * diffraction envelope
      const cosTerm = Math.cos(phaseDiff / 2);
      const diffTerm = Math.exp(-Math.pow(dy / 100, 2)); // envelope
      return Math.pow(cosTerm, 2) * diffTerm;
    };

    const render = () => {
      if (isPlaying) {
        wavePhase += 0.12;

        if (mode === 'quantum_particles') {
          // Add discrete quantum hits sampled according to probability distribution
          for (let i = 0; i < particleSpeedRate; i++) {
            // Rejection sampling
            let sampleY = 0;
            let accepted = false;
            let attempts = 0;
            while (!accepted && attempts < 25) {
              const testY = centerY + (Math.random() - 0.5) * (canvas.height - 40);
              const prob = getIntensity(testY);
              if (Math.random() < prob) {
                sampleY = testY;
                accepted = true;
              }
              attempts++;
            }
            if (accepted) {
              hitsRef.current.push({ y: sampleY });
            }
          }
          setTotalHits(hitsRef.current.length);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Canvas background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // 1. Draw Particle/Wave Source (Left)
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(sourceX, centerY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(mode === 'quantum_particles' ? '单电子枪' : '相干光源', sourceX - 16, centerY + 24);

      // 2. Draw Waves from source to slit barrier
      if (mode === 'continuous_wave') {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1.5;
        for (let r = (wavePhase * 8) % 20; r < slitBarrierX - sourceX; r += 20) {
          ctx.beginPath();
          ctx.arc(sourceX, centerY, r, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();
        }

        // Draw overlapping circular wave ripples from each slit
        const maxR = screenX - slitBarrierX;
        ctx.lineWidth = 1.5;
        for (let r = (wavePhase * 8) % 20; r < maxR; r += 20) {
          // Slit 1 ripples
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
          ctx.beginPath();
          ctx.arc(slitBarrierX, slit1Y, r, -Math.PI / 2.3, Math.PI / 2.3);
          ctx.stroke();

          // Slit 2 ripples
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)';
          ctx.beginPath();
          ctx.arc(slitBarrierX, slit2Y, r, -Math.PI / 2.3, Math.PI / 2.3);
          ctx.stroke();
        }
      }

      // 3. Draw Slit Barrier Plate (中间双缝挡板)
      ctx.fillStyle = '#334155';
      const slitHalfWidth = 6;
      // Top section
      ctx.fillRect(slitBarrierX - 4, 0, 8, slit1Y - slitHalfWidth);
      // Middle block
      ctx.fillRect(slitBarrierX - 4, slit1Y + slitHalfWidth, 8, (slit2Y - slitHalfWidth) - (slit1Y + slitHalfWidth));
      // Bottom section
      ctx.fillRect(slitBarrierX - 4, slit2Y + slitHalfWidth, 8, canvas.height - (slit2Y + slitHalfWidth));

      // Labels for Slits
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px sans-serif';
      ctx.fillText('双缝屏 (d = ' + slitDistance + 'μm)', slitBarrierX - 45, 20);

      // 4. Draw Detection Screen (右侧感光荧光屏)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(screenX, 20, 14, canvas.height - 40);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(screenX, 20, 14, canvas.height - 40);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('接收屏', screenX - 5, 14);

      // If continuous wave mode: draw continuous fringe glow on screen & intensity profile curve
      if (mode === 'continuous_wave') {
        for (let y = 20; y < canvas.height - 20; y += 2) {
          const intensity = getIntensity(y);
          ctx.fillStyle = `rgba(56, 189, 248, ${intensity * 0.95})`;
          ctx.fillRect(screenX + 1, y, 12, 2);
        }

        // Draw intensity profile plot to the right of the screen
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let y = 20; y < canvas.height - 20; y += 3) {
          const intensity = getIntensity(y);
          const px = screenX + 25 + intensity * 60;
          if (y === 20) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText('I(y) 光强分布', screenX + 30, canvas.height - 24);
      } else {
        // Quantum Particles Mode: Draw accumulated dots on the screen
        const hits = hitsRef.current;
        const recentLimit = 2500;
        const visibleHits = hits.slice(-recentLimit);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (const h of visibleHits) {
          const dotX = screenX + 2 + Math.random() * 10;
          ctx.fillRect(dotX, h.y, 1.5, 1.5);
        }

        // Cumulative histogram bar to the right
        const numBins = 30;
        const binHeight = (canvas.height - 40) / numBins;
        const bins = new Array(numBins).fill(0);

        for (const h of visibleHits) {
          const binIdx = Math.floor((h.y - 20) / binHeight);
          if (binIdx >= 0 && binIdx < numBins) {
            bins[binIdx]++;
          }
        }

        const maxBin = Math.max(1, ...bins);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        for (let b = 0; b < numBins; b++) {
          const barWidth = (bins[b] / maxBin) * 65;
          ctx.fillRect(screenX + 22, 20 + b * binHeight, barWidth, binHeight - 1);
        }

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText('概率累积分布', screenX + 25, canvas.height - 24);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [mode, slitDistance, wavelength, particleSpeedRate, isPlaying]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            双缝干涉与量子波粒二象性模拟 (1929 德布罗意诺奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            单粒子逐个打靶与干涉条纹统计累积：展现微观物质波本性与概率波诠释
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700/60 text-xs">
            <button
              onClick={() => {
                setMode('quantum_particles');
                handleReset();
              }}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                mode === 'quantum_particles'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              量子单粒子累积
            </button>
            <button
              onClick={() => setMode('continuous_wave')}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                mode === 'continuous_wave'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              连续波干涉场
            </button>
          </div>
        </div>
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
              <span className="text-slate-400">
                {mode === 'quantum_particles' ? (
                  <span>
                    已累积探测粒子数：<strong className="font-code text-cyan-300">{totalHits}</strong> 个
                    （每个粒子以点粒子形态着屏，统计整体却严格展现干涉条纹！）
                  </span>
                ) : (
                  <span>波动模式：两相干子波叠加产生周期性明暗相间相长相消干涉区。</span>
                )}
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
                onClick={handleReset}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="清除屏幕打靶痕迹"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Parameter Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              干涉系统参数调节
            </h5>

            {/* Slit Distance d */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">双缝间距 (d)</span>
                <span className="font-code text-cyan-400 font-semibold">{slitDistance} μm</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="2"
                value={slitDistance}
                onChange={(e) => {
                  setSlitDistance(Number(e.target.value));
                  if (mode === 'quantum_particles') handleReset();
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                双缝间距越宽，屏幕上干涉明暗条纹越紧密 (Δy = λL/d)。
              </p>
            </div>

            {/* Wavelength */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">物质波/光波长 (λ)</span>
                <span className="font-code text-amber-400 font-semibold">{wavelength} nm</span>
              </div>
              <input
                type="range"
                min="350"
                max="750"
                step="25"
                value={wavelength}
                onChange={(e) => {
                  setWavelength(Number(e.target.value));
                  if (mode === 'quantum_particles') handleReset();
                }}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Particle emission rate */}
            {mode === 'quantum_particles' && (
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300">单粒子发射速率</span>
                  <span className="font-code text-emerald-400 font-semibold">{particleSpeedRate * 60} 颗/秒</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={particleSpeedRate}
                  onChange={(e) => setParticleSpeedRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Theoretical Core */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-cyan-400 font-medium">费曼：量子力学的唯一谜团</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              如果说电子是经典粒子，它只能穿过缝1或缝2，屏幕上应该是两条独立的隆起带。
              然而现实中，哪怕我们把电子枪调到极弱，每隔一小时只发射一个电子，无数个电子累积后依然形成了相干条纹！
              这证明：每个电子的概率波同时穿过了两道缝，并与“自己”发生了干涉。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
