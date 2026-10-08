import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Zap, Target } from 'lucide-react';

interface ParticleTrack {
  x: number;
  y: number;
  angle: number;
  length: number;
  maxLength: number;
  color: string;
  type: 'higgs_decay' | 'jet' | 'photon';
}

export const HiggsLhcSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [beamEnergyTeV, setBeamEnergyTeV] = useState<number>(13.0); // 13 TeV
  const [totalEvents, setTotalEvents] = useState<number>(120);
  const [higgsCount, setHiggsCount] = useState<number>(18);

  const tracksRef = useRef<ParticleTrack[]>([]);
  const binsRef = useRef<number[]>(new Array(30).fill(0));

  // Initialize initial histogram data with typical background + nascent bump at 125 GeV (index 12-14)
  useEffect(() => {
    const bins = new Array(30).fill(0);
    // Background: smoothly falling exponential
    for (let i = 0; i < 30; i++) {
      const mass = 100 + i * 2; // 100 to 160 GeV
      const bg = Math.round(35 * Math.exp(-(mass - 100) / 30) + Math.random() * 3);
      bins[i] = bg;
    }
    // Higgs signal bump at 125 GeV (bin 12 and 13)
    bins[12] += 12;
    bins[13] += 18;
    bins[14] += 8;
    binsRef.current = bins;
  }, []);

  // Fire collision burst
  const triggerBurst = () => {
    // Generate tracks from origin
    const newTracks: ParticleTrack[] = [];
    const isHiggsEvent = Math.random() < 0.28;

    // Background jets
    const numJets = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < numJets; i++) {
      newTracks.push({
        x: 160,
        y: 190,
        angle: Math.random() * Math.PI * 2,
        length: 0,
        maxLength: 50 + Math.random() * 80,
        color: '#f97316',
        type: 'jet'
      });
    }

    if (isHiggsEvent) {
      // Golden 4-lepton or 2-photon decay tracks
      for (let i = 0; i < 4; i++) {
        newTracks.push({
          x: 160,
          y: 190,
          angle: (i * Math.PI) / 2 + (Math.random() - 0.5) * 0.4,
          length: 0,
          maxLength: 110 + Math.random() * 30,
          color: '#38bdf8',
          type: 'higgs_decay'
        });
      }
      // Add event to 124-126 GeV bins
      binsRef.current[12] += 1;
      binsRef.current[13] += 2;
      binsRef.current[14] += 1;
      setHiggsCount((prev) => prev + 1);
    } else {
      // Background event in random bin
      const randomBin = Math.floor(Math.random() * 30);
      binsRef.current[randomBin] += 1;
    }

    setTotalEvents((prev) => prev + 1);
    tracksRef.current = newTracks;
  };

  // Reset data
  const handleReset = () => {
    binsRef.current = new Array(30).fill(0);
    setTotalEvents(0);
    setHiggsCount(0);
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const originX = 160;
    const originY = canvas.height / 2;

    const render = () => {
      frame++;
      if (isPlaying && frame % 18 === 0) {
        triggerBurst();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Cylindrical LHC Detector Cross-section (Left)
      const detectorR = 130;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(originX, originY, detectorR, 0, Math.PI * 2);
      ctx.stroke();

      // Tracker & Muon Spectrometer concentric layers
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.beginPath();
      ctx.arc(originX, originY, 40, 0, Math.PI * 2);
      ctx.arc(originX, originY, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Incoming proton beam pipes (Horizontal)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, originY);
      ctx.lineTo(originX, originY);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.beginPath();
      ctx.moveTo(310, originY);
      ctx.lineTo(originX, originY);
      ctx.stroke();

      // Central collision point glow
      ctx.save();
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(originX, originY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('LHC 质子碰撞点 (√s = 13 TeV)', originX - 70, canvas.height - 15);

      // Animate active particle tracks
      for (const track of tracksRef.current) {
        if (track.length < track.maxLength) {
          track.length += 6;
        }

        ctx.strokeStyle = track.color;
        ctx.lineWidth = track.type === 'higgs_decay' ? 2.5 : 1.2;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        const endX = originX + Math.cos(track.angle) * track.length;
        const endY = originY + Math.sin(track.angle) * track.length;
        ctx.lineTo(endX, endY);
        ctx.stroke();

        if (track.type === 'higgs_decay' && track.length >= track.maxLength) {
          // Muon detector hit dot
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(endX, endY, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Right Side: Invariant Mass Spectrum Histogram (m_4l / m_γγ)
      const histX = 340;
      const histY = 40;
      const histW = 290;
      const histH = 260;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(histX, histY, histW, histH);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(histX, histY, histW, histH);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText('四轻子/双光子不变质量谱 (Invariant Mass)', histX + 10, histY + 20);

      // Grid lines inside histogram
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      for (let y = histY + 40; y < histY + histH; y += 40) {
        ctx.beginPath();
        ctx.moveTo(histX, y);
        ctx.lineTo(histX + histW, y);
        ctx.stroke();
      }

      // Draw Histogram Bars
      const bins = binsRef.current;
      const maxVal = Math.max(30, ...bins);
      const binWidth = (histW - 40) / bins.length;

      for (let i = 0; i < bins.length; i++) {
        const count = bins[i];
        const barHeight = (count / maxVal) * (histH - 60);
        const bx = histX + 25 + i * binWidth;
        const by = histY + histH - 25 - barHeight;

        // Highlight Higgs resonance peak (around 125 GeV, index 12-14)
        if (i >= 12 && i <= 14) {
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = '#64748b';
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(bx, by, binWidth - 1, barHeight);
        ctx.shadowBlur = 0;
      }

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText('100', histX + 22, histY + histH - 10);
      ctx.fillText('125 GeV (希格斯粒子)', histX + 90, histY + histH - 10);
      ctx.fillText('160', histX + histW - 25, histY + histH - 10);

      // Marker arrow on 125 GeV peak
      const peakX = histX + 25 + 13 * binWidth;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(peakX, histY + 45);
      ctx.lineTo(peakX, histY + 70);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText('125.09 GeV/c²', peakX - 35, histY + 40);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            LHC 粒子对撞与希格斯玻色子沉淀模拟 (2013 诺贝尔奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            基本粒子质量起源与标准模型终章：在 125 GeV 不变质量处见证 5σ 极显著共振峰隆起
          </p>
        </div>

        {/* Live Event Stats */}
        <div className="flex items-center gap-4 text-xs font-code">
          <div className="text-right">
            <div className="text-slate-400">总对撞事件</div>
            <div className="text-slate-200 font-semibold">{totalEvents}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">黄金通道四轻子事件</div>
            <div className="text-cyan-400 font-semibold">{higgsCount}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">统计置信度</div>
            <div className="text-emerald-400 font-semibold">5.2 σ (确凿发现)</div>
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

          {/* Controls Footer */}
          <div className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300">
                实时对撞中：青色径迹为希格斯粒子衰变为四个轻子（电子/μ子）的特征信号。
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerBurst()}
                className="px-2 py-1 rounded-md bg-amber-600/80 hover:bg-amber-500 text-white font-medium flex items-center gap-1"
              >
                <Target className="w-3 h-3" />
                单次激发对撞
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title={isPlaying ? '暂停自动对撞' : '继续自动对撞'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="清空直方图"
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
              加速器束流参数
            </h5>

            {/* Beam Energy */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">质心对撞能量 (√s)</span>
                <span className="font-code text-amber-400 font-semibold">{beamEnergyTeV.toFixed(1)} TeV</span>
              </div>
              <input
                type="range"
                min="7.0"
                max="14.0"
                step="0.5"
                value={beamEnergyTeV}
                onChange={(e) => setBeamEnergyTeV(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-code mt-0.5">
                <span>7.0 TeV (2010年首次)</span>
                <span>13.6 TeV (当前高亮度)</span>
              </div>
            </div>

            {/* Decay channels explanation */}
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">主要黄金探测通道</label>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 flex justify-between items-center">
                  <span className="text-slate-200">H → ZZ* → 4ℓ (四轻子)</span>
                  <span className="text-cyan-300 font-code">信噪比最高</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 flex justify-between items-center">
                  <span className="text-slate-200">H → γγ (双高能光子)</span>
                  <span className="text-purple-300 font-code">分支比大</span>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Legacy */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-amber-400 font-medium">质量究竟从何而来？</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              在极早期炽热宇宙中，所有粒子都以光速飞驰且没有静止质量。
              随着宇宙冷却，希格斯场发生自发对称性破缺，真空跌入能量非零的基态。
              粒子穿行在如同“糖浆”一般的希格斯场中受到阻滞阻抗，宏观上便表现为具有惯性质量！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
