import React from 'react';
import { NobelAward, HistoricalEra, PrizeDiscipline, SimulationId } from '../types';
import { CATEGORY_LABELS, ERA_LABELS, DISCIPLINE_LABELS } from '../data/nobelData';
import { Atom, ArrowUpRight } from 'lucide-react';

interface Props {
  awards: NobelAward[];
  selectedEra: HistoricalEra | 'all';
  onSelectEra: (era: HistoricalEra | 'all') => void;
  selectedDiscipline: PrizeDiscipline | 'all';
  onSelectDiscipline: (disc: PrizeDiscipline | 'all') => void;
  onSelectAward: (award: NobelAward) => void;
  onOpenSimulation: (simId: SimulationId) => void;
}

export const TimelineView: React.FC<Props> = ({
  awards,
  selectedEra,
  onSelectEra,
  selectedDiscipline,
  onSelectDiscipline,
  onSelectAward,
  onOpenSimulation
}) => {
  const eras: (HistoricalEra | 'all')[] = ['all', '1901-1920', '1921-1945', '1946-1970', '1971-1999', '2000-now'];

  return (
    <div className="space-y-10">
      {/* Era Segmented Control - Apple style rounded-full horizontal bar */}
      <div className="space-y-3.5">
        <div className="text-sm font-bold tracking-wider text-neutral-400 uppercase">
          按历史纪元阶段浏览
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {eras.map((era) => {
            const isActive = selectedEra === era;
            const label = era === 'all' ? '全部纪元 (1901 - 至今)' : ERA_LABELS[era]?.title;
            const range = era === 'all' ? '120+ 年' : ERA_LABELS[era]?.range;
            return (
              <button
                key={era}
                onClick={() => onSelectEra(era)}
                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-xl shadow-white/10 scale-102'
                    : 'bg-[#1C1C1E]/80 text-neutral-300 hover:text-white border border-white/[0.12] hover:border-white/30 backdrop-blur-xl'
                }`}
              >
                <span>{label}</span>
                <span className="text-xs sm:text-sm ml-2 opacity-60">({range})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Awards Count Status & Guidance - Apple clean callout */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 text-base text-neutral-300">
        <div className="flex items-center gap-3">
          <span className="text-base sm:text-lg font-semibold text-white">
            展示 <span className="font-code text-amber-400 font-bold text-xl">{awards.length}</span> 项划时代里程碑成果
          </span>
          <span className="text-neutral-600 hidden md:inline">|</span>
          <span className="text-sm sm:text-base text-neutral-400 hidden md:inline">
            若需查阅包含一战/二战停发年份在内的 1901-2024 完整编年历史，请点击顶部【历届总录】
          </span>
        </div>
        <div className="text-xs sm:text-sm text-neutral-400 font-medium">
          点击任意成果卡片查看全屏深度科学档案与实验原理
        </div>
      </div>

      {/* Timeline Stream with large typography and Apple glass cards */}
      <div className="relative border-l-2 border-white/15 ml-4 sm:ml-40 space-y-14 pl-6 sm:pl-14">
        {awards.map((award) => {
          const cat = CATEGORY_LABELS[award.category];
          const disc = DISCIPLINE_LABELS[award.discipline];

          return (
            <div key={award.id} className="relative group">
              {/* Year Marker on Timeline Node */}
              <div className="absolute -left-[33px] sm:-left-[65px] top-4 flex items-center">
                {/* Desktop Big Year Label */}
                <span className="hidden sm:block absolute -left-36 w-32 text-right font-code text-3xl font-black text-amber-400 tracking-tight">
                  {award.year}
                </span>

                {/* Apple style glowing circular node */}
                <div className={`w-4.5 h-4.5 rounded-full border-2 border-black transition-all ${
                  award.milestoneLevel === 1
                    ? 'bg-amber-400 group-hover:scale-130 ring-4 ring-amber-400/30 shadow-lg shadow-amber-500/50'
                    : 'bg-neutral-400 group-hover:bg-amber-300'
                }`} />
              </div>

              {/* Award Content Card (Apple Card styling with generous padding and larger text) */}
              <div
                onClick={() => onSelectAward(award)}
                className="apple-card p-7 sm:p-9 rounded-3xl transition-all cursor-pointer group/card border border-white/[0.1] hover:border-white/30"
              >
                {/* Mobile Year Badge + Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base text-neutral-400 mb-3.5">
                  <div className="flex items-center gap-3">
                    <span className="sm:hidden font-code font-black text-amber-400 text-xl">
                      {award.year}
                    </span>
                    <span className="sm:hidden text-neutral-600" aria-hidden="true">·</span>

                    {/* Discipline Pill */}
                    <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full border ${disc?.badge}`}>
                      {disc?.label}
                    </span>

                    <span className={`font-semibold ${cat?.color || 'text-neutral-300'}`}>
                      {cat?.label}
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-200 font-medium">
                      {award.laureates.map(l => l.name).join('、')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {award.interactiveSimulationId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (award.interactiveSimulationId) {
                            onOpenSimulation(award.interactiveSimulationId);
                          }
                        }}
                        className="apple-pill-btn text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-110 px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Atom className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>交互实验沙盒</span>
                      </button>
                    )}

                    <span className="w-9 h-9 rounded-full bg-white/[0.08] group-hover/card:bg-white/20 flex items-center justify-center text-neutral-400 group-hover/card:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Discovery Title (Large, clear, authoritative) */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover/card:text-amber-200 transition-colors font-display tracking-tight leading-snug">
                  {award.discoveryTitle}
                </h3>

                {/* Summary (Enlarged to 17px for effortless readability) */}
                <p className="mt-3.5 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                  {award.summary}
                </p>

                {/* Key Formula teaser */}
                {award.keyFormula && (
                  <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-black/70 border border-white/[0.12] text-sm sm:text-base font-code text-cyan-300 shadow-inner">
                    {award.keyFormula.latex}
                  </div>
                )}

                {/* Tags */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-neutral-400 font-medium">
                  {award.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
