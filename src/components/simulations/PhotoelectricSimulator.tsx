import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Info, Zap } from 'lucide-react';

interface Material {
  name: string;
  nameZh: string;
  workFunction: number; // in eV
}

const MATERIALS: Material[] = [
  { name: 'Potassium (K)', nameZh: '钾 (K)', workFunction: 2.20 },
  { name: 'Sodium (Na)', nameZh: '钠 (Na)', workFunction: 2.28 },
  { name: 'Zinc (Zn)', nameZh: '锌 (Zn)', workFunction: 4.30 },
  { name: 'Platinum (Pt)', nameZh: '铂 (Pt)', workFunction: 6.35 }
];

interface Particle {
  type: 'photon' | 'electron';
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  energy: number;
}

export const PhotoelectricSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [wavelength, setWavelength] = useState<number>(380); // nm (UV to visible)
  const [intensity, setIntensity] = useState<number>(60); // %
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIALS[1]); // Sodium
  const [reverseVoltage, setReverseVoltage] = useState<number>(0.5); // Volts
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Constants
  // E (eV) = 1239.84 / wavelength (nm)
  const photonEnergyEv = 1239.84 / wavelength;
  const maxKineticEnergy = Math.max(0, photonEnergyEv - selectedMaterial.workFunction);
  const stoppingVoltage = maxKineticEnergy; // in Volts
  const canEmit = photonEnergyEv >= selectedMaterial.workFunction;
  const willReachAnode = canEmit && reverseVoltage < stoppingVoltage;

  // Real-time current estimation
  const estimatedCurrent = willReachAnode
    ? Number(((intensity / 100) * (stoppingVoltage - reverseVoltage) * 2.4).toFixed(2))
    : 0;

  // Convert wavelength to RGB color
  const getWavelengthColor = (wl: number) => {
    if (wl < 380) return '#a855f7'; // UV / purple
    if (wl < 440) return '#6366f1'; // Indigo
    if (wl < 490) return '#06b6d4'; // Cyan
    if (wl < 550) return '#22c55e'; // Green
    if (wl < 590) return '#eab308'; // Yellow
    if (wl < 650) return '#f97316'; // Orange
    return '#ef4444'; // Red / IR
  };

  const currentColor = getWavelengthColor(wavelength);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let frameCount = 0;

    const cathodeX = 140;
    const anodeX = 520;
    const plateTop = 60;
    const plateBottom = 260;

    const render = () => {
      if (isPlaying) {
        frameCount++;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid lines (subtle lab style)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Glass Vacuum Tube Outline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 40, 500, 240, 30);
      ctx.stroke();

      // Label for Vacuum Chamber
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('真空石英管 (VACUUM TUBE)', 95, 58);

      // Draw Light Source at top-left
      ctx.save();
      ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(40, 100, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Light beam cone
      ctx.fillStyle = currentColor + '18';
      ctx.beginPath();
      ctx.moveTo(40, 100);
      ctx.lineTo(cathodeX, plateTop);
      ctx.lineTo(cathodeX, plateBottom);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Cathode (阴极靶材)
      ctx.fillStyle = '#475569';
      ctx.fillRect(cathodeX - 10, plateTop, 14, plateBottom - plateTop);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText('阴极靶材 (-)', cathodeX - 35, plateBottom + 18);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(selectedMaterial.nameZh, cathodeX - 25, plateBottom + 32);

      // Draw Anode (阳极收集极)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(anodeX, plateTop, 10, plateBottom - plateTop);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('阳极收集板 (+)', anodeX - 20, plateBottom + 18);

      // Electric field indicator between plates
      if (reverseVoltage > 0) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.setLineDash([4, 4]);
        for (let y = plateTop + 25; y < plateBottom; y += 40) {
          ctx.beginPath();
          ctx.moveTo(anodeX - 5, y);
          ctx.lineTo(cathodeX + 15, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Spawn incoming photons
      if (isPlaying && frameCount % Math.max(2, Math.floor(18 - (intensity / 100) * 14)) === 0) {
        const targetY = plateTop + 15 + Math.random() * (plateBottom - plateTop - 30);
        particles.push({
          type: 'photon',
          x: 40,
          y: 100,
          vx: (cathodeX - 40) / 32,
          vy: (targetY - 100) / 32,
          color: currentColor,
          energy: photonEnergyEv
        });
      }

      // Update & draw particles
      const remaining: Particle[] = [];
      for (const p of particles) {
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.type === 'photon') {
          // Draw photon wave packet
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Photon hits cathode
          if (p.x >= cathodeX - 5) {
            // Check if electron is emitted
            if (canEmit && Math.random() < 0.85) {
              const speed = Math.sqrt(maxKineticEnergy) * 1.8 + 1.2;
              const angle = (Math.random() - 0.5) * 0.9; // forward spread
              particles.push({
                type: 'electron',
                x: cathodeX + 6,
                y: p.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: '#38bdf8',
                energy: maxKineticEnergy
              });
            }
            continue; // Photon absorbed
          }
          if (p.x < canvas.width && p.y < canvas.height) {
            remaining.push(p);
          }
        } else if (p.type === 'electron') {
          // Electron under retarding electric field (reverse voltage slows down electrons)
          if (isPlaying) {
            const retardation = (reverseVoltage * 0.045);
            p.vx -= retardation;
          }

          // Draw electron (glowing cyan circle)
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // If electron hits anode
          if (p.x >= anodeX) {
            continue; // Reached anode, contributed to current
          }

          // If pushed back past cathode
          if (p.x < cathodeX) {
            continue;
          }

          if (p.y > plateTop - 10 && p.y < plateBottom + 10) {
            remaining.push(p);
          }
        }
      }

      particles = remaining;

      // Draw External Circuit Ammeter (电流表)
      const meterX = 330;
      const meterY = 325;
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(meterX, meterY, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ammeter dial needle
      const maxAngle = Math.PI * 0.7;
      const fraction = Math.min(1, estimatedCurrent / 8);
      const needleAngle = -Math.PI * 0.5 + (fraction - 0.5) * maxAngle;
      ctx.strokeStyle = estimatedCurrent > 0 ? '#10b981' : '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(meterX, meterY);
      ctx.lineTo(meterX + Math.cos(needleAngle) * 22, meterY + Math.sin(needleAngle) * 22);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('A', meterX - 4, meterY - 10);

      // Connecting wires
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cathodeX - 10, plateBottom - 20);
      ctx.lineTo(cathodeX - 10, meterY);
      ctx.lineTo(meterX - 28, meterY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(meterX + 28, meterY);
      ctx.lineTo(anodeX + 5, meterY);
      ctx.lineTo(anodeX + 5, plateBottom - 20);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [wavelength, intensity, selectedMaterial, reverseVoltage, isPlaying, canEmit, maxKineticEnergy, stoppingVoltage]);

  return (
    <div className="space-y-6">
      {/* Top Overview Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            爱因斯坦光电效应实景模拟 (1921 诺贝尔奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            单光子能量与金属逸出功对抗：揭示光的粒子性与量子化本质
          </p>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-4 text-xs font-code">
          <div className="text-right">
            <div className="text-slate-400">光子能量 hν</div>
            <div className="text-amber-400 font-semibold">{photonEnergyEv.toFixed(2)} eV</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">逸出功 W</div>
            <div className="text-slate-200 font-semibold">{selectedMaterial.workFunction.toFixed(2)} eV</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">电子初动能 Ek</div>
            <div className={`font-semibold ${canEmit ? 'text-cyan-400' : 'text-slate-500'}`}>
              {maxKineticEnergy.toFixed(2)} eV
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">回路电流计</div>
            <div className={`font-semibold ${estimatedCurrent > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
              {estimatedCurrent.toFixed(2)} μA
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Canvas Stage */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            width={660}
            height={370}
            className="w-full max-w-full rounded-lg"
          />

          {/* Condition Alert Box */}
          <div className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${canEmit ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-slate-300">
                {!canEmit ? (
                  <span className="text-rose-400 font-medium">
                    光子能量 ({photonEnergyEv.toFixed(2)}eV) &lt; 逸出功 ({selectedMaterial.workFunction}eV)：即使光强提升至100%，也无法激发任何光电子！
                  </span>
                ) : !willReachAnode ? (
                  <span className="text-amber-400 font-medium">
                    反向电压 ({reverseVoltage.toFixed(2)}V) &ge; 截止电压 ({stoppingVoltage.toFixed(2)}V)：光电子已被完全阻遏返回，光电流截断！
                  </span>
                ) : (
                  <span className="text-emerald-400 font-medium">
                    激发成功！光电子克服电场阻遏抵达阳极，回路测得稳定光电流。
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setWavelength(380);
                  setIntensity(60);
                  setReverseVoltage(0.5);
                }}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="重置参数"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Parameter Controls Deck */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              实验参数控制面板
            </h5>

            {/* Target Material Selection */}
            <div>
              <label className="text-xs text-slate-300 block mb-1.5">阴极金属靶材选择</label>
              <div className="grid grid-cols-2 gap-1.5">
                {MATERIALS.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMaterial(m)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      selectedMaterial.name === m.name
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/40'
                    }`}
                  >
                    <div>{m.nameZh}</div>
                    <div className="text-[10px] opacity-75 font-code">W = {m.workFunction} eV</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wavelength Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">入射光波长 (λ)</span>
                <span className="font-code text-cyan-400 font-semibold">{wavelength} nm</span>
              </div>
              <input
                type="range"
                min="200"
                max="750"
                step="5"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-code mt-0.5">
                <span>200nm (紫外UV)</span>
                <span>550nm (绿光)</span>
                <span>750nm (红光IR)</span>
              </div>
            </div>

            {/* Light Intensity Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">光源照射强度 (Intensity)</span>
                <span className="font-code text-amber-400 font-semibold">{intensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                光强决定单位时间射出光子数量（电流大小），不改变单个光子能量。
              </p>
            </div>

            {/* Reverse Voltage Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">反向阻遏电压 (U)</span>
                <span className="font-code text-rose-400 font-semibold">{reverseVoltage.toFixed(2)} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="5.0"
                step="0.05"
                value={reverseVoltage}
                onChange={(e) => setReverseVoltage(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-code mt-0.5">
                <span>0.00 V</span>
                <span>截止电压点: {stoppingVoltage.toFixed(2)} V</span>
                <span>5.00 V</span>
              </div>
            </div>
          </div>

          {/* Theoretical Breakthrough Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Info className="w-3.5 h-3.5" />
              爱因斯坦划时代思想突破
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              经典波动学说认为光能量随时间持续积累，预测“任何波长的强光照射足够久均能击出电子”。
              爱因斯坦大胆指出：光在空间中是一粒一粒局域的能量包（光子）。
              电子吸收光子是瞬时一对一发生的，若单光子能量不及逸出功，光强再大也无济于事！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
