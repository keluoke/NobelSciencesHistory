import React, { useState } from 'react';
import { LINEAGE_NODES } from '../data/lineageData';
import { NOBEL_AWARDS, CATEGORY_LABELS, DISCIPLINE_LABELS } from '../data/nobelData';
import { NobelAward } from '../types';
import { GitBranch, ArrowRight, CornerDownRight } from 'lucide-react';

interface Props {
  onSelectAward: (award: NobelAward) => void;
}

export const LineageView: React.FC<Props> = ({ onSelectAward }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('1962-watson-crick-dna');

  const selectedNode = LINEAGE_NODES.find((n) => n.id === selectedNodeId) || LINEAGE_NODES[0];

  // Upstream inspirations
  const ancestors = LINEAGE_NODES.filter((n) => selectedNode.dependsOn.includes(n.id));

  // Downstream influences
  const descendants = LINEAGE_NODES.filter((n) => n.dependsOn.includes(selectedNode.id));

  const matchingAward = NOBEL_AWARDS.find((a) => a.id === selectedNode.id);

  return (
    <div className="space-y-8">
      {/* Intro Header - Apple style */}
      <div className="p-7 rounded-3xl bg-[#1C1C1E]/70 border border-white/[0.12] backdrop-blur-2xl flex flex-wrap items-center justify-between gap-5">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 font-display tracking-tight">
            <GitBranch className="w-7 h-7 text-cyan-400" />
            自然科学跨学科思想演进与传承谱系
          </h3>
          <p className="text-base text-neutral-300 mt-1.5 font-normal">
            物理高能光学探针 → 结构化学杂化轨道 → 分子生物学DNA双螺旋与mRNA疫苗：跨越百年的巨人传承接力
          </p>
        </div>
        <div className="text-base text-neutral-300 bg-white/[0.06] px-5 py-2 rounded-full border border-white/[0.1]">
          当前选中：<span className="font-bold text-amber-300">{selectedNode.label}</span>
        </div>
      </div>

      {/* Main Grid: Interactive Network Column & Inspector Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Chain Nodes Ribbon */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
            三大科学核心理论传承接力链
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LINEAGE_NODES.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isAncestor = selectedNode.dependsOn.includes(node.id);
              const isDescendant = node.dependsOn.includes(selectedNode.id);
              const cat = CATEGORY_LABELS[node.category];
              const disc = DISCIPLINE_LABELS[node.discipline];

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400/80 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-400/40'
                      : isAncestor
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-neutral-200'
                      : isDescendant
                      ? 'bg-purple-950/40 border-purple-500/50 text-neutral-200'
                      : 'apple-card text-neutral-300 border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm sm:text-base mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-code font-black text-amber-400 text-lg">{node.year}</span>
                      <span className={`text-xs sm:text-sm font-bold ${disc?.color}`}>[{disc?.short}]</span>
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold ${cat?.color || 'text-neutral-400'}`}>
                      {cat?.label}
                    </span>
                  </div>

                  <div className="text-lg font-bold text-white font-display truncate">
                    {node.name}
                  </div>
                  <div className="text-base text-neutral-300 mt-1.5 line-clamp-1 font-normal">
                    {node.label}
                  </div>

                  {isAncestor && (
                    <span className="inline-block mt-3 text-xs sm:text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full font-semibold">
                      ↑ 思想源头奠基
                    </span>
                  )}
                  {isDescendant && (
                    <span className="inline-block mt-3 text-xs sm:text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full font-semibold">
                      ↓ 启发后世分支
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Heritage Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl apple-glass space-y-7">
            <div>
              <div className="flex items-center justify-between text-base text-neutral-400">
                <span className="font-code text-amber-400 font-black text-3xl">{selectedNode.year} 年</span>
                <span className="text-lg font-bold text-white">{selectedNode.name}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2.5 tracking-tight">
                {selectedNode.label}
              </h4>
              <p className="text-base text-neutral-200 leading-relaxed mt-4 p-5 rounded-2xl bg-black/70 border border-white/[0.12] font-normal">
                {selectedNode.impactSummary}
              </p>
            </div>

            {/* Direct Predecessors / Upstream */}
            <div className="space-y-3.5">
              <div className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <CornerDownRight className="w-5 h-5" />
                前置理论奠基与思想渊源 ({ancestors.length})
              </div>
              {ancestors.length === 0 ? (
                <div className="text-sm text-neutral-400 italic p-4 rounded-2xl bg-black/50">
                  近代实验科学原始突破之基石
                </div>
              ) : (
                <div className="space-y-2.5">
                  {ancestors.map((anc) => (
                    <div
                      key={anc.id}
                      onClick={() => setSelectedNodeId(anc.id)}
                      className="p-4 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/[0.1] text-base flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="text-neutral-200 font-medium">
                        {anc.year} · {anc.name} ({anc.label})
                      </span>
                      <ArrowRight className="w-4.5 h-4.5 text-cyan-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Successors / Downstream */}
            <div className="space-y-3.5">
              <div className="text-base font-bold text-purple-400 flex items-center gap-2">
                <CornerDownRight className="w-5 h-5" />
                衍生启发后世的重大理论飞跃 ({descendants.length})
              </div>
              {descendants.length === 0 ? (
                <div className="text-sm text-neutral-400 italic p-4 rounded-2xl bg-black/50">
                  当前处于学科前沿进行时
                </div>
              ) : (
                <div className="space-y-2.5">
                  {descendants.map((desc) => (
                    <div
                      key={desc.id}
                      onClick={() => setSelectedNodeId(desc.id)}
                      className="p-4 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/[0.1] text-base flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="text-neutral-200 font-medium">
                        {desc.year} · {desc.name} ({desc.label})
                      </span>
                      <ArrowRight className="w-4.5 h-4.5 text-purple-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Jump to Award Detail Button */}
            {matchingAward && (
              <button
                onClick={() => onSelectAward(matchingAward)}
                className="apple-pill-btn w-full py-4 px-6 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 cursor-pointer"
              >
                <span>阅读 {matchingAward.year} 年《{matchingAward.discoveryTitle}》完整档案</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
