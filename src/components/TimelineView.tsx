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
    <div className="space-y-8">
      {/* Era Segmented Control */}
      <div>
        <div className="text-xs font-semibold text-slate-400 mb-2">历史纪元阶段</div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {eras.map((era) => {
            const isActive = selectedEra === era;
            const label = era === 'all' ? '全部纪元 (1901 - 至今)' : ERA_LABELS[era]?.title;
            const range = era === 'all' ? '120+ 年' : ERA_LABELS[era]?.range;
            return (
              <button
                key={era}
                onClick={() => onSelectEra(era)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{label}</span>
                <span className="text-[10px] ml-1.5 opacity-70">({range})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Awards Count Status & Guidance */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span>展示 <span className="font-code text-amber-300 font-semibold">{awards.length}</span> 项深度精选重大科学发现</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-amber-400/90 hidden sm:inline">
            查看包含战争空缺停发年等百年完整编年？可在顶部导航切换至【历届总录 (1901-2024)】
          </span>
        </div>
        <div className="text-slate-500">点击卡片可查看深度背景、实验与公式解析</div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
        {awards.map((award) => {
          const cat = CATEGORY_LABELS[award.category];
          const disc = DISCIPLINE_LABELS[award.discipline];

          return (
            <div key={award.id} className="relative group">
              {/* Year Marker on Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center">
                <span className="hidden sm:block absolute -left-28 w-24 text-right font-code text-sm font-bold text-amber-400 tracking-wider">
                  {award.year}
                </span>

                {/* Timeline dot */}
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-slate-950 transition-all ${
                  award.milestoneLevel === 1
                    ? 'bg-amber-400 group-hover:scale-125 ring-4 ring-amber-500/20'
                    : 'bg-slate-400 group-hover:bg-amber-300'
                }`} />
              </div>

              {/* Award Content Card */}
              <div
                onClick={() => onSelectAward(award)}
                className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-slate-950/50 group/card"
              >
                {/* Mobile Year Badge + Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="sm:hidden font-code font-bold text-amber-400 text-sm">
                      {award.year}
                    </span>
                    <span className="sm:hidden" aria-hidden="true">·</span>

                    {/* Discipline indicator */}
                    <span className={`text-[11px] font-semibold ${disc?.color || 'text-slate-300'}`}>
                      {disc?.short}
                    </span>
                    <span aria-hidden="true">·</span>

                    <span className={cat?.color || 'text-slate-300'}>{cat?.label}</span>
                    <span aria-hidden="true">·</span>
                    <span>{award.laureates.map(l => l.name).join('、')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {award.interactiveSimulationId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (award.interactiveSimulationId) {
                            onOpenSimulation(award.interactiveSimulationId);
                          }
                        }}
                        className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                      >
                        <Atom className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>交互模拟沙盒</span>
                      </button>
                    )}
                    <span className="text-slate-500 group-hover/card:text-amber-400 transition-colors flex items-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Discovery Title */}
                <h3 className="text-lg font-bold text-white group-hover/card:text-amber-300 transition-colors font-display">
                  {award.discoveryTitle}
                </h3>

                {/* Summary */}
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {award.summary}
                </p>

                {/* Key Formula teaser if available */}
                {award.keyFormula && (
                  <div className="mt-3 inline-block px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-xs font-code text-cyan-300">
                    {award.keyFormula.latex}
                  </div>
                )}

                {/* Tags unboxed */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  {award.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      <span>#{tag}</span>
                      {i < award.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
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
