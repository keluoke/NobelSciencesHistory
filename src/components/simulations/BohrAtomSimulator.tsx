import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface TransitionPreset {
  name: string;
  series: 'Balmer (可见光)' | 'Lyman (紫外区)' | 'Paschen (红外区)';
  from: number;
  to: number;
  wavelength: number; // nm
  colorHex: string;
  desc: string;
}

const PRESETS: TransitionPreset[] = [
  {
    name: 'Hα 谱线 (3 → 2)',
    series: 'Balmer (可见光)',
    from: 3,
    to: 2,
    wavelength: 656.3,
    colorHex: '#ef4444',
    desc: '深红色可见光谱线，氢原子巴耳末系最明亮特征谱线'
  },
  {
    name: 'Hβ 谱线 (4 → 2)',
    series: 'Balmer (可见光)',
    from: 4,
    to: 2,
    wavelength: 486.1,
    colorHex: '#06b6d4',
    desc: '青蓝色可见光谱线，恒星与星云光谱观测关键指标'
  },
  {
    name: 'Hγ 谱线 (5 → 2)',
    series: 'Balmer (可见光)',
    from: 5,
    to: 2,
    wavelength: 434.0,
    colorHex: '#818cf8',
    desc: '蓝紫色谱线，天体光谱化学成分定标'
  },
  {
    name: '莱曼α线 (2 → 1)',
    series: 'Lyman (紫外区)',
    from: 2,
    to: 1,
    wavelength: 121.6,
    colorHex: '#c084fc',
    desc: '远紫外区强发射线，宇宙早期氢气体森林探测'
  },
  {
    name: '帕邢α线 (4 → 3)',
    series: 'Paschen (红外区)',
    from: 4,
    to: 3,
    wavelength: 1875.1,
    colorHex: '#b91c1c',
    desc: '近红外辐射，穿透星际尘埃'
  }
];

export const BohrAtomSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [currentN, setCurrentN] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lastEmittedPhoton, setLastEmittedPhoton] = useState<{
    wl: number;
    color: string;
    deltaE: number;
    text: string;
  } | null>({
    wl: 656.3,
    color: '#ef4444',
    deltaE: 1.89,
    text: '从 n=3 跃迁至 n=2，辐射 Hα 红色光子'
  });

  // Calculate energy for level n
  const getEnergy = (n: number) => -13.6 / (n * n);

  // Trigger quantum jump
  const triggerTransition = (targetN: number) => {
    if (targetN === currentN) return;
    const initialN = currentN;
    setCurrentN(targetN);

    const ei = getEnergy(initialN);
    const ef = getEnergy(targetN);
    const deltaE = Math.abs(ei - ef);
    // λ = 1239.84 / ΔE
    const wl = 1239.84 / deltaE;

    let color = '#38bdf8';
    if (wl < 380) color = '#c084fc';
    else if (wl < 450) color = '#818cf8';
    else if (wl < 500) color = '#06b6d4';
    else if (wl < 580) color = '#22c55e';
    else if (wl < 620) color = '#eab308';
    else if (wl < 700) color = '#ef4444';
    else color = '#991b1b';

    setLastEmittedPhoton({
      wl: Number(wl.toFixed(1)),
      color,
      deltaE: Number(deltaE.toFixed(2)),
      text:
        initialN > targetN
          ? `能级回落 (${initialN} → ${targetN})：辐射出单光子 (ΔE = ${deltaE.toFixed(2)} eV)`
          : `受激跃迁 (${initialN} → ${targetN})：吸收光子能量 (ΔE = ${deltaE.toFixed(2)} eV)`
    });
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const orbitRadii = [0, 36, 68, 102, 138, 174]; // radii for n=1..5

    const render = () => {
      if (isPlaying) {
        // Higher orbits rotate slightly slower (Keplerian-like intuition)
        const speed = 0.05 / Math.sqrt(currentN);
        angle += speed;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Starfield / subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let r = 36; r <= 180; r += 34) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Orbits
      for (let n = 1; n <= 5; n++) {
        const r = orbitRadii[n];
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);

        if (n === currentN) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbit label
        ctx.fillStyle = n === currentN ? '#38bdf8' : 'rgba(148, 163, 184, 0.5)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(`n=${n} (${getEnergy(n).toFixed(2)}eV)`, centerX + r + 6, centerY + 3);
      }

      // Draw Nucleus (Proton +)
      ctx.save();
      const nucGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 16);
      nucGrad.addColorStop(0, '#f59e0b');
      nucGrad.addColorStop(1, '#b45309');
      ctx.fillStyle = nucGrad;
      ctx.shadowColor = '#d97706';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('+Ze', centerX - 10, centerY + 4);
      ctx.restore();

      // Draw Electron on orbit
      const activeRadius = orbitRadii[currentN];
      const ex = centerX + Math.cos(angle) * activeRadius;
      const ey = centerY + Math.sin(angle) * activeRadius;

      // Electron glow
      ctx.save();
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(ex, ey, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Electron trail
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, activeRadius, angle - 0.5, angle);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [currentN, isPlaying]);

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            玻尔原子定态与能级跃迁模拟 (1922 诺贝尔奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            角动量量子化 L = nħ 与跃迁辐射 ΔE = hν：解开氢原子分立谱线百年谜团
          </p>
        </div>

        {/* Live Orbit Status */}
        <div className="flex items-center gap-4 text-xs font-code">
          <div className="text-right">
            <div className="text-slate-400">当前主量子数</div>
            <div className="text-cyan-400 font-semibold text-sm">n = {currentN}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">结合能量 En</div>
            <div className="text-slate-200 font-semibold">{getEnergy(currentN).toFixed(2)} eV</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">玻尔轨道半径 rn</div>
            <div className="text-amber-400 font-semibold">{(0.053 * currentN * currentN).toFixed(3)} nm</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Canvas Stage */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950 border border-slate-800 relative">
          <canvas
            ref={canvasRef}
            width={640}
            height={400}
            className="w-full max-w-full rounded-lg"
          />

          {/* Real-time Hydrogen Spectral Bar */}
          <div className="w-full mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">氢原子巴耳末可见光谱带 (Balmer Visible Lines)</span>
              <span className="text-slate-500 font-code text-[11px]">400nm ~ 700nm</span>
            </div>

            {/* Spectrum Ribbon */}
            <div className="h-8 w-full rounded-md bg-gradient-to-r from-violet-950 via-blue-950 to-red-950 relative border border-slate-700/80 overflow-hidden">
              {/* Reference Balmer Spectral Lines */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_#ef4444]"
                style={{ left: '85%' }}
                title="Hα 656.3nm (3->2)"
              >
                <span className="absolute -bottom-4 -left-3 text-[9px] font-code text-red-400">656nm</span>
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                style={{ left: '42%' }}
                title="Hβ 486.1nm (4->2)"
              >
                <span className="absolute -bottom-4 -left-3 text-[9px] font-code text-cyan-300">486nm</span>
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-indigo-400 shadow-[0_0_8px_#818cf8]"
                style={{ left: '20%' }}
                title="Hγ 434.0nm (5->2)"
              >
                <span className="absolute -bottom-4 -left-3 text-[9px] font-code text-indigo-300">434nm</span>
              </div>
            </div>

            {/* Emission Notification Banner */}
            {lastEmittedPhoton && (
              <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lastEmittedPhoton.color, boxShadow: `0 0 6px ${lastEmittedPhoton.color}` }}
                  />
                  <span className="text-slate-200">{lastEmittedPhoton.text}</span>
                </div>
                <span className="font-code text-cyan-300">λ = {lastEmittedPhoton.wl} nm</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quantum Level Switcher & Presets */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                主量子数能级直选 (n)
              </h5>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title={isPlaying ? '暂停轨道旋转' : '继续旋转'}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => triggerTransition(1)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="回到基态"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Direct Orbit Buttons */}
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => triggerTransition(lvl)}
                  className={`py-2 px-1 rounded-lg text-xs font-code font-semibold transition-all ${
                    currentN === lvl
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/40'
                  }`}
                >
                  <div>n={lvl}</div>
                  <div className="text-[9px] font-normal opacity-75">{lvl === 1 ? '基态' : '激发'}</div>
                </button>
              ))}
            </div>

            {/* Famous Spectral Transition Presets */}
            <div>
              <label className="text-xs text-slate-300 block mb-2 font-medium">
                经典原子光谱线跃迁触发
              </label>
              <div className="space-y-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      // set to from level first if not there, then transition
                      setCurrentN(p.from);
                      setTimeout(() => triggerTransition(p.to), 200);
                    }}
                    className="w-full p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: p.colorHex }}
                        />
                        {p.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-code font-medium text-amber-300">{p.wavelength} nm</div>
                      <div className="text-[9px] text-slate-500">{p.series}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Significance */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-cyan-400 font-medium">玻尔模型的革命性妥协</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              玻尔引入“定态假设”：只要电子处在量子化轨道上就不向外辐射电磁波（直接推翻麦克斯韦经典电磁学）。
              只有在不同轨道之间发生跳跃跃迁时，才发射或吸收一个光子，成功完美推导出了经验性的里德伯光谱公式！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
