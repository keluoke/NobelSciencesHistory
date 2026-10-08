import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, AlertTriangle, RotateCcw, Play, Pause, Activity } from 'lucide-react';

export const MrnaVaccineSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [usePseudouridine, setUsePseudouridine] = useState<boolean>(true); // Kariko's discovery
  const [dosage, setDosage] = useState<number>(30); // in micrograms (e.g. 30ug for Pfizer)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [antibodyCount, setAntibodyCount] = useState<number>(0);
  const [antigenCount, setAntigenCount] = useState<number>(0);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellX = 300;
      const cellY = 190;
      const cellR = 140;

      // 1. Draw Host Human Cell (Muscle or Dendritic Cell)
      ctx.save();
      ctx.fillStyle = usePseudouridine ? 'rgba(30, 58, 138, 0.25)' : 'rgba(153, 27, 27, 0.25)';
      ctx.strokeStyle = usePseudouridine ? '#3b82f6' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cellX, cellY, cellR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('人类宿主细胞膜 (HOST CELL)', cellX - 60, cellY - cellR + 18);
      ctx.restore();

      // 2. Draw Ribosome Factory inside cytoplasm
      const riboX = cellX - 20;
      const riboY = cellY + 20;

      ctx.fillStyle = '#818cf8';
      ctx.beginPath();
      ctx.arc(riboX, riboY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(riboX, riboY - 14, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '9px sans-serif';
      ctx.fillText('核糖体', riboX - 13, riboY - 20);

      // 3. Draw mRNA Strand feeding through ribosome
      ctx.strokeStyle = usePseudouridine ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = cellX - 90; x < cellX + 60; x += 5) {
        const y = riboY + Math.sin(time * 2 + x * 0.1) * 8;
        if (x === cellX - 90) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // If NOT modified: TLR receptors attack and destroy mRNA!
      if (!usePseudouridine) {
        // Red warning glow and immune attack particles
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('⚠️ TLR7/8 触发细胞自毁炎症！mRNA 被立即降解', cellX - 120, cellY - 40);

        // Flash destructive crosses
        for (let i = 0; i < 5; i++) {
          const sparkX = cellX - 70 + i * 25;
          const sparkY = riboY + Math.sin(time + i) * 15;
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sparkX - 6, sparkY - 6);
          ctx.lineTo(sparkX + 6, sparkY + 6);
          ctx.moveTo(sparkX + 6, sparkY - 6);
          ctx.lineTo(sparkX - 6, sparkY + 6);
          ctx.stroke();
        }
      } else {
        // Successful translation of Spike Antigens (刺突蛋白)
        if (isPlaying && Math.random() < 0.15) {
          setAntigenCount((prev) => Math.min(prev + 1, 40));
        }

        // Draw Spikes protruding on cell surface
        for (let a = 0; a < Math.PI * 2; a += 0.5) {
          const sx = cellX + Math.cos(a + time * 0.2) * (cellR + 8);
          const sy = cellY + Math.sin(a + time * 0.2) * (cellR + 8);

          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(sx, sy, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // 4. Draw Neutralizing Antibodies (Y-shaped) produced by B-cells
        if (isPlaying && antigenCount > 10 && Math.random() < 0.2) {
          setAntibodyCount((prev) => Math.min(prev + 1, 80));
        }

        // Floating Y-shaped antibodies outside cell
        const abPositions = [
          { x: 80, y: 80 },
          { x: 120, y: 260 },
          { x: 520, y: 80 },
          { x: 550, y: 260 },
          { x: 480, y: 310 },
          { x: 100, y: 160 }
        ];

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;

        for (const pos of abPositions) {
          const swayX = pos.x + Math.sin(time + pos.y) * 8;
          const swayY = pos.y + Math.cos(time + pos.x) * 8;

          // Draw 'Y' shape
          ctx.beginPath();
          ctx.moveTo(swayX, swayY);
          ctx.lineTo(swayX, swayY + 12);
          ctx.moveTo(swayX, swayY);
          ctx.lineTo(swayX - 7, swayY - 8);
          ctx.moveTo(swayX, swayY);
          ctx.lineTo(swayX + 7, swayY - 8);
          ctx.stroke();
        }

        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('特异性中和抗体 (IgG Antibodies)', 470, 50);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [usePseudouridine, dosage, isPlaying, antigenCount]);

  const handleReset = () => {
    setAntibodyCount(0);
    setAntigenCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            mRNA 疫苗修饰与人体免疫应答模拟 (2023 诺贝尔生理学或医学奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            考里科与韦斯曼的核心突破：假尿嘧啶 (Ψ) 替换如何绕过致命先天炎症，安全翻译刺突抗原并激发体液免疫
          </p>
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-4 text-xs font-code">
          <div className="text-right">
            <div className="text-slate-400">刺突蛋白抗原表达</div>
            <div className={`font-semibold ${usePseudouridine ? 'text-pink-400' : 'text-slate-500'}`}>
              {usePseudouridine ? `${antigenCount * 25} pg/mL` : '0 (被降解)'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-400">中和抗体滴度</div>
            <div className={`font-semibold ${usePseudouridine ? 'text-cyan-400' : 'text-rose-500'}`}>
              {usePseudouridine ? `${antibodyCount * 45} BAU/mL` : '0 (免疫失败)'}
            </div>
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
            height={360}
            className="w-full max-w-full rounded-lg"
          />

          {/* Interactive footer alert */}
          <div className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {usePseudouridine ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">
                    假尿嘧啶 (Ψ) 修饰生效：mRNA 不被当作外来病毒降解，核糖体高效翻译，B细胞产生大量保护性抗体！
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300 font-medium">
                    天然尿嘧啶警告：触发严重先天免疫 Toll 样受体排异反应，外源 mRNA 遭破坏，无法产生免疫保护。
                  </span>
                </>
              )}
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
                title="重置模拟"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Controls Deck */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              mRNA 疫苗分子设计控制台
            </h5>

            {/* Base modification switch */}
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">核苷酸碱基类型选择</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setUsePseudouridine(true);
                    handleReset();
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    usePseudouridine
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/40 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-emerald-300">假尿嘧啶 (Ψ)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">考里科诺奖发明·安全有效</div>
                </button>

                <button
                  onClick={() => {
                    setUsePseudouridine(false);
                    handleReset();
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    !usePseudouridine
                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/40 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-rose-300">天然未经修饰 (U)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">诱发剧烈排异炎症自毁</div>
                </button>
              </div>
            </div>

            {/* Dose Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">接种疫苗剂量 (Dosage)</span>
                <span className="font-code text-cyan-400 font-semibold">{dosage} μg</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={dosage}
                onChange={(e) => setDosage(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-code mt-0.5">
                <span>10 μg (轻量)</span>
                <span>30 μg (常规标准)</span>
                <span>100 μg (高抗体)</span>
              </div>
            </div>
          </div>

          {/* Scientific significance */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-rose-400 font-medium">为何这不仅是抗疫疫苗？</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              考里科的修饰突破不仅终结了全球新冠大流行，更将 mRNA 升华为了人类通用的体内“蛋白质分子打印机”：只需更改编码序列，即可针对个性化黑色素瘤、胰腺癌肿瘤抗原甚至罕见遗传病定制体内药物生产。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
