import React, { useState } from 'react';
import { X, Atom, Zap, Eye, Radio, Sparkles, Scissors, ShieldCheck } from 'lucide-react';
import { PhotoelectricSimulator } from './PhotoelectricSimulator';
import { BohrAtomSimulator } from './BohrAtomSimulator';
import { DoubleSlitSimulator } from './DoubleSlitSimulator';
import { GravitationalWavesSimulator } from './GravitationalWavesSimulator';
import { HiggsLhcSimulator } from './HiggsLhcSimulator';
import { DnaCrisprSimulator } from './DnaCrisprSimulator';
import { MrnaVaccineSimulator } from './MrnaVaccineSimulator';
import { ProteinFoldingSimulator } from './ProteinFoldingSimulator';
import { SimulationId } from '../../types';

interface Props {
  initialSimId?: SimulationId;
  onClose: () => void;
}

export const SimulationLabModal: React.FC<Props> = ({ initialSimId = 'photoelectric', onClose }) => {
  const [activeTab, setActiveTab] = useState<SimulationId>(initialSimId);

  const tabs: { id: SimulationId; label: string; icon: React.ElementType; sub: string; tag: string; tagColor: string }[] = [
    { id: 'photoelectric', label: '1921 光电效应', icon: Zap, sub: '光量子与逸出功', tag: '物理', tagColor: 'text-amber-400' },
    { id: 'bohr_atom', label: '1922 玻尔原子', icon: Sparkles, sub: '能级与氢原子光谱', tag: '物理', tagColor: 'text-amber-400' },
    { id: 'double_slit', label: '1929 物质波干涉', icon: Eye, sub: '单粒子波粒二象性', tag: '物理', tagColor: 'text-amber-400' },
    { id: 'lhc_higgs', label: '2013 希格斯粒子', icon: Atom, sub: '125GeV对撞沉淀', tag: '物理', tagColor: 'text-amber-400' },
    { id: 'gravitational_waves', label: '2017 引力波LIGO', icon: Radio, sub: '双黑洞时空涟漪', tag: '物理', tagColor: 'text-amber-400' },
    { id: 'dna_crispr', label: '2020 CRISPR剪刀', icon: Scissors, sub: 'Cas9双螺旋定点剪切', tag: '化学', tagColor: 'text-emerald-400' },
    { id: 'protein_folding', label: '2024 AlphaFold', icon: Sparkles, sub: 'AI从头折叠分子机器', tag: '化学', tagColor: 'text-emerald-400' },
    { id: 'mrna_vaccine', label: '2023 mRNA疫苗', icon: ShieldCheck, sub: '假尿嘧啶修饰免疫应答', tag: '医学', tagColor: 'text-rose-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                诺贝尔三大科学奖重大实验 · 互动模拟沙盒实验室
              </h3>
              <p className="text-xs text-slate-400">
                可调参数的真实物理学、分子生物化学与现代医学微观动态沙盒
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="关闭窗口"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-3 pb-1 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span>{tab.label}</span>
                      <span className={`text-[9px] ${tab.tagColor}`}>[{tab.tag}]</span>
                    </div>
                    <div className="text-[10px] opacity-70 font-normal">{tab.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulator body */}
        <div className="p-6">
          {activeTab === 'photoelectric' && <PhotoelectricSimulator />}
          {activeTab === 'bohr_atom' && <BohrAtomSimulator />}
          {activeTab === 'double_slit' && <DoubleSlitSimulator />}
          {activeTab === 'gravitational_waves' && <GravitationalWavesSimulator />}
          {activeTab === 'lhc_higgs' && <HiggsLhcSimulator />}
          {activeTab === 'dna_crispr' && <DnaCrisprSimulator />}
          {activeTab === 'mrna_vaccine' && <MrnaVaccineSimulator />}
          {activeTab === 'protein_folding' && <ProteinFoldingSimulator />}
        </div>
      </div>
    </div>
  );
};
