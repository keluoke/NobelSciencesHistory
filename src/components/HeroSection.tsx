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
  const disciplines: { id: PrizeDiscipline | 'all'; label: string; icon: React.ElementType; color: string; badge: string }[] = [
    { id: 'all', label: '全部三大自然科学奖', icon: Sparkles, color: 'text-amber-300', badge: 'bg-slate-800 text-white' },
    { id: 'physics', label: '物理学奖', icon: Atom, color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'chemistry', label: '化学奖', icon: FlaskConical, color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { id: 'medicine', label: '生理学或医学奖', icon: Dna, color: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  ];

  return (
    <section className="relative pt-10 pb-8 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-rose-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Top kicker */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1901 — 2024 诺贝尔自然科学奖百年全景图谱</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display text-balance">
            物理 · 化学 · 生理学或医学奖历史解读
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto text-balance">
            从量子跃迁、引力波时空涟漪，到CRISPR基因魔剪、mRNA疫苗分子修饰与AlphaFold人工智能预测蛋白质折叠。
            跨越三大科学领域，用互动时间轴与动态实验沙盒再现重塑人类文明的重大突破。
          </p>

          {/* Primary Discipline Filter Pills (Functional Buttons) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {disciplines.map((d) => {
              const Icon = d.icon;
              const isActive = selectedDiscipline === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => onSelectDiscipline(d.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-md scale-105'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : d.color}`} />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索科学家（爱因斯坦、居里夫人、屠呦呦、考里科）、年份或关键词..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  清空
                </button>
              )}
            </div>
          </div>

          {/* Quick interactive sandbox buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              经典实验交互模拟入口：
            </span>
            <button
              onClick={() => onOpenLabWithId('dna_crispr')}
              className="px-2.5 py-1 rounded-md bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 transition-colors"
            >
              2020 CRISPR基因剪刀
            </button>
            <button
              onClick={() => onOpenLabWithId('mrna_vaccine')}
              className="px-2.5 py-1 rounded-md bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 transition-colors"
            >
              2023 mRNA疫苗修饰
            </button>
            <button
              onClick={() => onOpenLabWithId('protein_folding')}
              className="px-2.5 py-1 rounded-md bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 transition-colors"
            >
              2024 AlphaFold蛋白质折叠
            </button>
            <button
              onClick={() => onOpenLabWithId('photoelectric')}
              className="px-2.5 py-1 rounded-md bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 transition-colors"
            >
              1921 光电效应
            </button>
            <button
              onClick={() => onOpenLabWithId('gravitational_waves')}
              className="px-2.5 py-1 rounded-md bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 transition-colors"
            >
              2017 LIGO引力波
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
