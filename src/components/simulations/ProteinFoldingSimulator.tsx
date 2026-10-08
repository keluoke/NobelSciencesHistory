import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RotateCcw, Play, Layers } from 'lucide-react';

interface ProteinPreset {
  name: string;
  nameEn: string;
  residues: number;
  type: string;
  plddt: number;
}

const PRESETS: ProteinPreset[] = [
  { name: '人胰岛素 A/B 链', nameEn: 'Human Insulin', residues: 51, type: '双硫键交联微型激素', plddt: 95.8 },
  { name: '人类泛素蛋白', nameEn: 'Ubiquitin', residues: 76, type: '经典 β-折叠包夹 α-螺旋', plddt: 97.2 },
  { name: '绿色荧光蛋白 (GFP)', nameEn: 'Green Fluorescent Protein', residues: 238, type: '11链 β-桶状圆柱发色结构', plddt: 93.4 },
  { name: '贝克实验室从头设计酶', nameEn: 'De Novo Designed Enzyme', residues: 110, type: '自然界不存在的全新人工催化构型', plddt: 98.6 },
];

export const ProteinFoldingSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedPreset, setSelectedPreset] = useState<ProteinPreset>(PRESETS[0]);
  const [foldingProgress, setFoldingProgress] = useState<number>(0.8); // 0 (unfolded) to 1.0 (native)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = 230;
      const centerY = canvas.height / 2;

      // Draw Folding Energy Funnel Landscape in background (subtle)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      for (let r = 30; r < 180; r += 30) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 30, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw amino acid residue nodes & polypeptide backbone
      const numNodes = 26;
      const nodes: { x: number; y: number; type: 'helix' | 'sheet' | 'loop' }[] = [];

      for (let i = 0; i < numNodes; i++) {
        // Linear stretched coordinates (unfolded)
        const unrolledX = centerX - 180 + i * 14;
        const unrolledY = centerY + Math.sin(i * 0.6 + time) * 20;

        // Folded 3D native coordinates (folded into compact globular structure)
        const phi = (i / numNodes) * Math.PI * 4 + time * 0.3;
        const radius = 25 + Math.sin(i * 1.5) * 45;
        const foldedX = centerX + Math.cos(phi) * radius;
        const foldedY = centerY + Math.sin(phi) * (radius * 0.75);

        // Interpolate based on foldingProgress
        const curX = unrolledX * (1 - foldingProgress) + foldedX * foldingProgress;
        const curY = unrolledY * (1 - foldingProgress) + foldedY * foldingProgress;

        const resType = i % 3 === 0 ? 'helix' : i % 3 === 1 ? 'sheet' : 'loop';
        nodes.push({ x: curX, y: curY, type: resType });
      }

      // Draw polypeptide peptide backbone curve
      ctx.strokeStyle = foldingProgress > 0.7 ? '#38bdf8' : '#94a3b8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        if (i === 0) ctx.moveTo(nodes[i].x, nodes[i].y);
        else ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.stroke();

      // Secondary structure helices ribbons (gold/pink)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let color = '#38bdf8';
        if (node.type === 'helix') color = '#eab308'; // α-helix (gold)
        else if (node.type === 'sheet') color = '#ec4899'; // β-sheet (pink)

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Right Side: AlphaFold Attention Heatmap (Evoformer Contact Map)
      const mapX = 430;
      const mapY = 50;
      const mapSize = 180;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(mapX, mapY, mapSize, mapSize);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(mapX, mapY, mapSize, mapSize);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px sans-serif';
      ctx.fillText('AlphaFold Evoformer 空间接触矩阵', mapX, mapY - 12);

      // Draw contact matrix pixels
      const gridSize = 12;
      for (let x = 0; x < mapSize; x += gridSize) {
        for (let y = 0; y < mapSize; y += gridSize) {
          const dist = Math.abs(x - y);
          const hasContact = dist < 25 || ((x * y) % 37 < 12 && foldingProgress > 0.5);

          if (hasContact) {
            ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + (foldingProgress * 0.5)})`;
          } else {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
          }
          ctx.fillRect(mapX + x, mapY + y, gridSize - 1, gridSize - 1);
        }
      }

      // Legend under contact map
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText(`pLDDT 置信得分: ${(selectedPreset.plddt * foldingProgress).toFixed(1)} / 100`, mapX, mapY + mapSize + 18);
      ctx.fillText(`吉布斯自由能 ΔG: ${(-18.4 * foldingProgress).toFixed(1)} kcal/mol`, mapX, mapY + mapSize + 32);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [selectedPreset, foldingProgress]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            AlphaFold 蛋白质折叠与三维构型预测模拟 (2024 诺贝尔化学奖)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            哈萨比斯、江珀与贝克的革命：深度学习求解50年安芬森假说难题，从一维序列瞬时折叠出原子级立体分子机器
          </p>
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-4 text-xs font-code">
          <div className="text-right">
            <div className="text-slate-400">空间构型状态</div>
            <div className="text-indigo-400 font-semibold">
              {foldingProgress < 0.3 ? '变性无规卷曲' : foldingProgress < 0.75 ? '二级结构塌缩中' : '天然稳定超三级折叠'}
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

          {/* Interactive footer notification */}
          <div className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-slate-300">
                黄色：α-螺旋结构域；粉色：β-折叠片；蓝色：亲水肽键骨架回环。
              </span>
            </div>

            <button
              onClick={() => setFoldingProgress(0.95)}
              className="px-2.5 py-1 rounded bg-indigo-600/80 hover:bg-indigo-500 text-white text-[11px] font-medium transition-colors"
            >
              一键折叠至天然态
            </button>
          </div>
        </div>

        {/* Right: Controls Deck */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              蛋白质模型与折叠控制
            </h5>

            {/* Presets */}
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">目标蛋白质库</label>
              <div className="space-y-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setSelectedPreset(p);
                      setFoldingProgress(0.85);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                      selectedPreset.name === p.name
                        ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300'
                        : 'bg-slate-800/60 border-slate-700/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{p.name}</div>
                      <div className="text-[10px] opacity-75">{p.type}</div>
                    </div>
                    <div className="text-right text-[11px] font-code text-cyan-300">
                      {p.residues} aa
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Folding progress slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">自由能最小化折叠进程</span>
                <span className="font-code text-indigo-400 font-semibold">{Math.round(foldingProgress * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={foldingProgress}
                onChange={(e) => setFoldingProgress(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-code mt-0.5">
                <span>0% (一维线性无规肽链)</span>
                <span>100% (AlphaFold原子构型)</span>
              </div>
            </div>
          </div>

          {/* Scientific significance */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-indigo-400 font-medium">从结构生物学到计算创造</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              安芬森在1972年假定：蛋白质的三维构型完全由其一维氨基酸序列决定。半个世纪后，AlphaFold与RoseTTAFold借助神经网络彻底攻克了这一圣杯，使人类不仅能预测已知生命，更能从零创造出降解微塑料的全新人造酶！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
