import React, { useEffect, useRef, useState } from 'react';
import { Scissors, RotateCcw, Check, Zap } from 'lucide-react';

interface BasePair {
  top: 'A' | 'T' | 'G' | 'C';
  bottom: 'A' | 'T' | 'G' | 'C';
}

const DEFAULT_SEQUENCE: BasePair[] = [
  { top: 'A', bottom: 'T' },
  { top: 'T', bottom: 'A' },
  { top: 'G', bottom: 'C' },
  { top: 'C', bottom: 'G' },
  { top: 'A', bottom: 'T' },
  { top: 'G', bottom: 'C' },
  { top: 'G', bottom: 'C' }, // target cut zone (around 6-9)
  { top: 'C', bottom: 'G' },
  { top: 'T', bottom: 'A' },
  { top: 'A', bottom: 'T' },
  { top: 'C', bottom: 'G' },
  { top: 'G', bottom: 'C' },
  { top: 'T', bottom: 'A' },
  { top: 'A', bottom: 'T' },
];

export const DnaCrisprSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [sequence, setSequence] = useState<BasePair[]>(DEFAULT_SEQUENCE);
  const [step, setStep] = useState<'idle' | 'targeting' | 'cleaved' | 'repaired'>('idle');
  const [repairMode, setRepairMode] = useState<'nhej' | 'hdr'>('hdr');

  const cutIndex = 7; // Cut between 6 and 7

  // Trigger CRISPR cut action
  const handleCut = () => {
    setStep('targeting');
    setTimeout(() => {
      setStep('cleaved');
    }, 900);
  };

  // Trigger repair action
  const handleRepair = () => {
    if (repairMode === 'hdr') {
      // Precise insertion of corrected sequence
      const newSeq = [...sequence];
      newSeq[cutIndex] = { top: 'G', bottom: 'C' };
      newSeq[cutIndex + 1] = { top: 'C', bottom: 'G' };
      setSequence(newSeq);
    } else {
      // NHEJ introduces random knockout deletion
      const newSeq = [...sequence];
      newSeq.splice(cutIndex, 1);
      setSequence(newSeq);
    }
    setStep('repaired');
  };

  const handleReset = () => {
    setSequence(DEFAULT_SEQUENCE);
    setStep('idle');
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let waveTime = 0;

    const baseColors: Record<string, string> = {
      A: '#ef4444', // Red
      T: '#38bdf8', // Cyan
      G: '#10b981', // Emerald
      C: '#f59e0b', // Amber
    };

    const render = () => {
      waveTime += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const startX = 50;
      const spacing = (canvas.width - 100) / sequence.length;

      // Draw Double Helix Backbones
      ctx.lineWidth = 3;

      // Top strand backbone
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      for (let i = 0; i < sequence.length; i++) {
        const x = startX + i * spacing;
        const wave = Math.sin(waveTime + i * 0.5) * 12;
        const y = centerY - 50 + wave;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Bottom strand backbone
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      for (let i = 0; i < sequence.length; i++) {
        const x = startX + i * spacing;
        const wave = -Math.sin(waveTime + i * 0.5) * 12;
        const y = centerY + 50 + wave;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw base pairs and hydrogen bond rungs
      for (let i = 0; i < sequence.length; i++) {
        const bp = sequence[i];
        const x = startX + i * spacing;
        const topY = centerY - 50 + Math.sin(waveTime + i * 0.5) * 12;
        const botY = centerY + 50 - Math.sin(waveTime + i * 0.5) * 12;

        const isCutSite = (i === cutIndex || i === cutIndex - 1) && step === 'cleaved';

        // Hydrogen bonds line
        if (!isCutSite) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(x, topY + 14);
          ctx.lineTo(x, botY - 14);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Top Base Node
        ctx.fillStyle = baseColors[bp.top];
        ctx.beginPath();
        ctx.arc(x, topY, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bp.top, x, topY);

        // Bottom Base Node
        ctx.fillStyle = baseColors[bp.bottom];
        ctx.beginPath();
        ctx.arc(x, botY, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(bp.bottom, x, botY);
      }

      // Draw Cas9 Enzyme Complex
      if (step === 'targeting' || step === 'cleaved') {
        const targetX = startX + cutIndex * spacing;
        ctx.save();

        // Cas9 protein bubble
        ctx.fillStyle = 'rgba(236, 72, 153, 0.25)';
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(targetX - 70, centerY - 80, 140, 160, 24);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f472b6';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.fillText('Cas9 核酸内切酶', targetX, centerY - 65);

        // Guide RNA ribbon
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(targetX - 50, centerY - 25);
        ctx.lineTo(targetX + 50, centerY - 25);
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('sgRNA 识别引导链', targetX, centerY - 12);

        // Cleavage sparks if cleaved
        if (step === 'cleaved') {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(targetX - 10, centerY - 15);
          ctx.lineTo(targetX + 10, centerY + 15);
          ctx.moveTo(targetX + 10, centerY - 15);
          ctx.lineTo(targetX - 10, centerY + 15);
          ctx.stroke();

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText('⚡ 双链断裂 (DSB)', targetX, centerY + 65);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [sequence, step]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Scissors className="w-4 h-4 text-emerald-400" />
            CRISPR-Cas9 基因编辑与 DNA 双螺旋模拟 (2020/1962 诺贝尔奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            沃森-克里克双螺旋碱基互补（A=T, G≡C）与向导RNA引导Cas9分子手术刀定点剪切
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 text-xs font-code">
          <div className="text-right">
            <div className="text-slate-400">当前分子阶段</div>
            <div className="text-emerald-400 font-semibold">
              {step === 'idle' && '双螺旋完整构型'}
              {step === 'targeting' && 'Cas9-sgRNA 靶向结合中'}
              {step === 'cleaved' && 'DNA 双链已被切断'}
              {step === 'repaired' && '完成定点基因修复/敲除'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Canvas */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950 border border-slate-800 relative">
          <canvas
            ref={canvasRef}
            width={650}
            height={360}
            className="w-full max-w-full rounded-lg"
          />

          {/* Interactive footer notification */}
          <div className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${step === 'repaired' ? 'bg-emerald-400' : 'bg-pink-400 animate-pulse'}`} />
              <span className="text-slate-300">
                {step === 'idle' && 'DNA 双链在细胞核内稳定转录，等待 CRISPR 分子复合物结合。'}
                {step === 'targeting' && 'sgRNA 正与目标 DNA 链进行 20nt 碱基互补配对核对！'}
                {step === 'cleaved' && 'Cas9 内切酶结构域激发，造成磷酸二酯键水解断裂。'}
                {step === 'repaired' && (repairMode === 'hdr' ? '利用供体模板完成无缝精准基因敲入！' : 'NHEJ 造成移码突变，成功失活目标致病基因！')}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="重置DNA序列"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Controls Deck */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              基因手术控制台
            </h5>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                disabled={step !== 'idle'}
                onClick={handleCut}
                className="w-full py-2.5 px-3 rounded-lg bg-pink-600 hover:bg-pink-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>释放 Cas9 执行分子定点剪切</span>
              </button>

              <button
                disabled={step !== 'cleaved'}
                onClick={handleRepair}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>引导细胞修复机制 (Repair)</span>
              </button>
            </div>

            {/* Repair Pathway Selector */}
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">修复通路选择</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setRepairMode('hdr')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    repairMode === 'hdr'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800/60 border-slate-700/40 text-slate-400'
                  }`}
                >
                  <div className="font-semibold">同源重组 (HDR)</div>
                  <div className="text-[10px] opacity-75 mt-0.5">供体模板精准替换</div>
                </button>
                <button
                  onClick={() => setRepairMode('nhej')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    repairMode === 'nhej'
                      ? 'bg-pink-500/20 border-pink-500/50 text-pink-300'
                      : 'bg-slate-800/60 border-slate-700/40 text-slate-400'
                  }`}
                >
                  <div className="font-semibold">末端连接 (NHEJ)</div>
                  <div className="text-[10px] opacity-75 mt-0.5">突变失活敲除基因</div>
                </button>
              </div>
            </div>

            {/* Base Color Legend */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-1.5">碱基图例 (互补配对)</div>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-code">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-slate-200">A (腺嘌呤)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-slate-200">T (胸腺嘧啶)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-200">G (鸟嘌呤)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-slate-200">C (胞嘧啶)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific significance */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-emerald-400 font-medium">从细菌免疫到人类基因重写</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              道德纳与沙尔庞捷证明，只需简单更换长度仅20个核苷酸的sgRNA，Cas9就能如同巡航导弹一般命中人类30亿个碱基中的任意靶点，开启了地中海贫血与遗传缺陷的根治曙光。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
