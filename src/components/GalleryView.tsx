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
    <div className="space-y-8">
      {/* Header bar - Apple frosted container */}
      <div className="p-7 rounded-3xl bg-[#1C1C1E]/70 border border-white/[0.12] backdrop-blur-2xl flex flex-wrap items-center justify-between gap-5">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 font-display tracking-tight">
            <Award className="w-7 h-7 text-amber-400" />
            重大科学发现 · 殿堂展厅矩阵
          </h3>
          <p className="text-base text-neutral-300 mt-1.5 font-normal">
            涵盖物理、化学、生理学或医学三大领域群星与划时代突破
          </p>
        </div>

        {/* Filter buttons - Apple pill style */}
        <div className="flex items-center gap-2 p-1.5 bg-black/80 rounded-full border border-white/[0.12] text-sm sm:text-base">
          <button
            onClick={() => setLevelFilter('all')}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all cursor-pointer ${
              levelFilter === 'all'
                ? 'bg-white text-black shadow-lg scale-102'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            全部精选 ({awards.length})
          </button>
          <button
            onClick={() => setLevelFilter('milestone_only')}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all cursor-pointer ${
              levelFilter === 'milestone_only'
                ? 'bg-white text-black shadow-lg scale-102'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            仅范式革命级 (★)
          </button>
        </div>
      </div>

      {/* Grid - Apple Bento Card layout with larger text */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((award) => {
          const cat = CATEGORY_LABELS[award.category];
          const disc = DISCIPLINE_LABELS[award.discipline];

          return (
            <div
              key={award.id}
              onClick={() => onSelectAward(award)}
              className="apple-card p-8 rounded-3xl flex flex-col justify-between group cursor-pointer border border-white/[0.09] hover:border-white/30"
            >
              <div>
                {/* Top card metadata */}
                <div className="flex items-center justify-between text-sm sm:text-base text-neutral-400 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-code font-black text-amber-400 text-xl">
                      {award.year}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full border ${disc?.badge}`}>
                      {disc?.short}
                    </span>
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold ${cat?.color || 'text-neutral-300'}`}>
                    {cat?.label}
                  </span>
                </div>

                {/* Discovery Title (Larger font, bold, Apple style) */}
                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors font-display tracking-tight leading-snug line-clamp-2">
                  {award.discoveryTitle}
                </h4>

                {/* Laureates */}
                <div className="text-base font-semibold text-neutral-200 mt-2.5 truncate">
                  {award.laureates.map(l => l.name).join('、')}
                </div>

                {/* Summary (Enlarged and relaxed line-height) */}
                <p className="mt-4 text-base text-neutral-300 line-clamp-3 leading-relaxed font-normal">
                  {award.summary}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-7 pt-4 border-t border-white/[0.1] flex items-center justify-between text-sm sm:text-base">
                {award.interactiveSimulationId ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (award.interactiveSimulationId) {
                        onOpenSimulation(award.interactiveSimulationId);
                      }
                    }}
                    className="apple-pill-btn text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-110 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Atom className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>交互实验沙盒</span>
                  </button>
                ) : (
                  <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                    {award.laureates[0]?.country}
                  </span>
                )}

                <span className="text-sm sm:text-base font-semibold text-neutral-300 group-hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>深度解读</span>
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
