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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0E0E14] border border-white/[0.12] shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-[#0E0E14]/90 backdrop-blur-3xl border-b border-white/[0.1]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Atom className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
                诺贝尔三大科学奖重大实验 · 互动模拟沙盒实验室
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-normal">
                可调参数的真实物理学、分子生物化学与现代医学微观动态沙盒
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="关闭窗口"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-8 pt-4 pb-2 border-b border-white/[0.08] bg-black/50">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-102 font-bold'
                      : 'bg-white/[0.05] text-neutral-300 hover:text-white hover:bg-white/[0.1] border border-white/[0.08]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : tab.tagColor}`} />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-bold ${isActive ? 'text-neutral-700' : tab.tagColor}`}>[{tab.tag}]</span>
                    </div>
                    <div className={`text-[11px] font-normal ${isActive ? 'text-neutral-700' : 'text-neutral-400'}`}>{tab.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulator body */}
        <div className="p-8">
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
