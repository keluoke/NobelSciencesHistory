import React, { useState } from 'react';
import { NobelAward, SimulationId } from '../types';
import { CATEGORY_LABELS, DISCIPLINE_LABELS } from '../data/nobelData';
import { Atom, ArrowUpRight, Award } from 'lucide-react';

interface Props {
  awards: NobelAward[];
  onSelectAward: (award: NobelAward) => void;
  onOpenSimulation: (simId: SimulationId) => void;
}

export const GalleryView: React.FC<Props> = ({
  awards,
  onSelectAward,
  onOpenSimulation
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | 'milestone_only'>('all');

  const filtered = awards.filter((a) => {
    if (levelFilter === 'milestone_only') return a.milestoneLevel === 1;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            诺贝尔自然科学奖 · 重大发现展厅矩阵
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            涵盖物理、化学、生理学或医学三大领域群星与划时代突破
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setLevelFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              levelFilter === 'all'
                ? 'bg-amber-400 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            全部精选 ({awards.length})
          </button>
          <button
            onClick={() => setLevelFilter('milestone_only')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              levelFilter === 'milestone_only'
                ? 'bg-amber-400 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            仅范式革命级 (★)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((award) => {
          const cat = CATEGORY_LABELS[award.category];
          const disc = DISCIPLINE_LABELS[award.discipline];

          return (
            <div
              key={award.id}
              onClick={() => onSelectAward(award)}
              className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-slate-950/60"
            >
              <div>
                {/* Top card metadata */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-code font-bold text-amber-400 text-sm">
                      {award.year} 年
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${disc?.badge}`}>
                      {disc?.short}
                    </span>
                  </div>
                  <span className={`text-[11px] font-medium ${cat?.color || 'text-slate-300'}`}>
                    {cat?.label}
                  </span>
                </div>

                {/* Discovery Title */}
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-display line-clamp-2">
                  {award.discoveryTitle}
                </h4>

                {/* Laureates */}
                <div className="text-xs text-slate-400 mt-1.5 truncate">
                  {award.laureates.map(l => l.name).join('、')}
                </div>

                {/* Summary */}
                <p className="mt-3 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {award.summary}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {award.interactiveSimulationId ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (award.interactiveSimulationId) {
                        onOpenSimulation(award.interactiveSimulationId);
                      }
                    }}
                    className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                  >
                    <Atom className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>交互模拟沙盒</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    {award.laureates[0]?.country}
                  </span>
                )}

                <span className="text-slate-400 group-hover:text-amber-300 flex items-center gap-0.5 text-xs">
                  <span>深度解读</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
