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
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            自然科学跨学科思想演进与传承谱系 (Interdisciplinary Lineage)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            物理高能光学探针 → 结构化学共价杂化 → 分子生物学DNA遗传密码与mRNA疫苗：探索科学巨人间的传承接力
          </p>
        </div>
        <div className="text-xs text-slate-400">
          选中节点：<span className="font-bold text-amber-300">{selectedNode.label}</span>
        </div>
      </div>

      {/* Main Grid: Interactive Network Column & Inspector Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chain Nodes Ribbon */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            三大科学核心理论传承接力链
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                      : isAncestor
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-slate-200'
                      : isDescendant
                      ? 'bg-purple-950/30 border-purple-500/40 text-slate-200'
                      : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-code font-bold text-amber-400">{node.year}</span>
                      <span className={`text-[10px] font-semibold ${disc?.color}`}>[{disc?.short}]</span>
                    </div>
                    <span className={`text-[10px] ${cat?.color || 'text-slate-400'}`}>
                      {cat?.label}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white font-display truncate">
                    {node.name}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {node.label}
                  </div>

                  {isAncestor && (
                    <span className="inline-block mt-2 text-[10px] text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded">
                      ↑ 思想源头奠基
                    </span>
                  )}
                  {isDescendant && (
                    <span className="inline-block mt-2 text-[10px] text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded">
                      ↓ 启发后世分支
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Heritage Inspector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-code text-amber-400 font-bold text-base">{selectedNode.year} 年</span>
                <span>{selectedNode.name}</span>
              </div>
              <h4 className="text-xl font-bold text-white font-display mt-1">
                {selectedNode.label}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                {selectedNode.impactSummary}
              </p>
            </div>

            {/* Direct Predecessors / Upstream */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5" />
                前置理论奠基与思想渊源 ({ancestors.length})
              </div>
              {ancestors.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-2 rounded bg-slate-950/60">
                  近代实验科学原始突破之基石
                </div>
              ) : (
                <div className="space-y-1.5">
                  {ancestors.map((anc) => (
                    <div
                      key={anc.id}
                      onClick={() => setSelectedNodeId(anc.id)}
                      className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="text-slate-200 font-medium">
                        {anc.year} · {anc.name} ({anc.label})
                      </span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Successors / Downstream */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-purple-400 flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5" />
                衍生启发后世的重大理论飞跃 ({descendants.length})
              </div>
              {descendants.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-2 rounded bg-slate-950/60">
                  当前处于学科前沿进行时
                </div>
              ) : (
                <div className="space-y-1.5">
                  {descendants.map((desc) => (
                    <div
                      key={desc.id}
                      onClick={() => setSelectedNodeId(desc.id)}
                      className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="text-slate-200 font-medium">
                        {desc.year} · {desc.name} ({desc.label})
                      </span>
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Jump to Award Detail Button */}
            {matchingAward && (
              <button
                onClick={() => onSelectAward(matchingAward)}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>阅读 {matchingAward.year} 年《{matchingAward.discoveryTitle}》完整档案</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
