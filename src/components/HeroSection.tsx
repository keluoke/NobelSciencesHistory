import React from 'react';
import { Search, Sparkles, Compass, Atom, FlaskConical, Dna } from 'lucide-react';
import { PrizeDiscipline, SimulationId } from '../types';

interface Props {
  selectedDiscipline: PrizeDiscipline | 'all';
  onSelectDiscipline: (disc: PrizeDiscipline | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenLabWithId: (id: SimulationId) => void;
  totalAwardsCount: number;
}

export const HeroSection: React.FC<Props> = ({
  selectedDiscipline,
  onSelectDiscipline,
  searchQuery,
  onSearchChange,
  onOpenLabWithId,
  totalAwardsCount
}) => {
  const disciplines: { id: PrizeDiscipline | 'all'; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'all', label: '全部三大自然科学奖', icon: Sparkles, color: 'text-amber-300' },
    { id: 'physics', label: '物理学奖', icon: Atom, color: 'text-amber-400' },
    { id: 'chemistry', label: '化学奖', icon: FlaskConical, color: 'text-emerald-400' },
    { id: 'medicine', label: '生理学或医学奖', icon: Dna, color: 'text-rose-400' },
  ];

  return (
    <section className="relative pt-20 pb-18 border-b border-white/[0.08] bg-gradient-to-b from-[#08080C] via-[#000000] to-[#000000] overflow-hidden">
      {/* Apple-style smooth specular ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] bg-gradient-to-b from-amber-400/[0.12] via-violet-500/[0.06] to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top Tagline */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-sm font-medium text-neutral-200 backdrop-blur-2xl shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
            <span>1901 — 2024 · 诺贝尔自然科学奖百年全景图谱</span>
          </div>

          {/* Grand Apple Keynote Title (Enlarged) */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-display text-balance leading-[1.04]">
            探索物理 · 化学 · 医学的
            <span className="block mt-2 apple-gradient-text font-black">
              人类理性远征
            </span>
          </h1>

          {/* Subtitle (Larger, elegant line height, crisp text) */}
          <p className="text-xl sm:text-2xl text-neutral-300 font-normal leading-relaxed max-w-3xl mx-auto text-balance">
            从量子跃迁、引力波时空涟漪，到CRISPR基因剪刀与AlphaFold蛋白质折叠。
            以沉浸式时间轴与可交互物理实验沙盒，立体呈现重塑现代人类文明的伟大发现。
          </p>

          {/* macOS / iOS Style Segmented Control (Pill Bar) */}
          <div className="pt-2 flex justify-center">
            <div className="p-1.5 bg-[#1C1C1E]/90 rounded-full border border-white/[0.14] backdrop-blur-2xl flex flex-wrap items-center justify-center gap-1.5 shadow-2xl">
              {disciplines.map((d) => {
                const Icon = d.icon;
                const isActive = selectedDiscipline === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => onSelectDiscipline(d.id)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-lg scale-102'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-black' : d.color}`} />
                    <span>{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apple-style Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="搜索科学家（爱因斯坦、居里夫人、屠呦呦、考里科）、年份或重大发现..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-14 pr-16 py-4.5 rounded-2xl bg-[#1C1C1E]/75 border border-white/[0.12] text-base sm:text-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 backdrop-blur-2xl transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/10 rounded-full cursor-pointer transition-colors"
                >
                  清除
                </button>
              )}
            </div>
          </div>

          {/* Quick Simulation Entrances (Frosted Glass Chips) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-sm sm:text-[15px] text-neutral-400">
            <span className="flex items-center gap-2 text-neutral-300 font-medium mr-1 text-sm sm:text-base">
              <Compass className="w-4.5 h-4.5 text-amber-400" />
              经典实验沙盒快捷通道：
            </span>
            <button
              onClick={() => onOpenLabWithId('dna_crispr')}
              className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-emerald-300 border border-emerald-500/30 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
            >
              2020 CRISPR基因剪刀
            </button>
            <button
              onClick={() => onOpenLabWithId('mrna_vaccine')}
              className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-rose-300 border border-rose-500/30 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
            >
              2023 mRNA疫苗修饰
            </button>
            <button
              onClick={() => onOpenLabWithId('protein_folding')}
              className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-indigo-300 border border-indigo-500/30 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
            >
              2024 AlphaFold折叠
            </button>
            <button
              onClick={() => onOpenLabWithId('photoelectric')}
              className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-amber-300 border border-amber-500/30 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
            >
              1921 光电效应
            </button>
            <button
              onClick={() => onOpenLabWithId('gravitational_waves')}
              className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-purple-300 border border-purple-500/30 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
            >
              2017 LIGO引力波
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
