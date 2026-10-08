import React, { useState } from 'react';
import { X, Volume2, VolumeX, Atom, Sparkles, BookOpen, Wrench, Cpu, HelpCircle, ArrowRight } from 'lucide-react';
import { NobelAward, SimulationId } from '../types';
import { CATEGORY_LABELS, DISCIPLINE_LABELS } from '../data/nobelData';

interface Props {
  award: NobelAward;
  onClose: () => void;
  onOpenSimulation: (simId: SimulationId) => void;
}

export const AwardDetailModal: React.FC<Props> = ({ award, onClose, onOpenSimulation }) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const catInfo = CATEGORY_LABELS[award.category];
  const discInfo = DISCIPLINE_LABELS[award.discipline];

  // Web Speech API text-to-speech
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('您的浏览器暂不支持语音合成。');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${award.year}年${discInfo?.label || '诺贝尔奖'}。${award.discoveryTitle}。获奖者：${award.laureates.map(l => l.name).join('、')}。官方颁奖词：${award.citationZh}。重大意义：${award.summary}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-code text-amber-400">
              {award.year}
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${discInfo?.badge}`}>
              {discInfo?.label}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${catInfo?.bgBadge || 'text-slate-300'}`}>
              {catInfo?.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSpeaking
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title={isSpeaking ? '停止朗读' : '朗读颁奖词与原理解读'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
              <span className="hidden sm:inline">{isSpeaking ? '停止朗读' : '语音导览'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Title & One-line Summary */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {award.discoveryTitle}
            </h2>
            <p className="mt-2 text-sm text-amber-200/90 leading-relaxed bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              {award.summary}
            </p>
          </div>

          {/* Laureates Row */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              获奖科学家 (LAUREATES)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {award.laureates.map((l, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-slate-800 border border-amber-500/30 flex items-center justify-center font-display text-amber-300 font-bold shrink-0 text-sm">
                    {l.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{l.name}</div>
                    {l.nativeName && (
                      <div className="text-[11px] text-slate-400 truncate">{l.nativeName}</div>
                    )}
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {l.country} · {l.birthDeath}
                    </div>
                    {l.affiliation && (
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{l.affiliation}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Nobel Citation */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>官方授奖词 (NOBEL CITATION)</span>
            </div>
            <p className="text-sm text-slate-200 italic font-serif leading-relaxed">
              “{award.citationZh}”
            </p>
            <p className="text-xs text-slate-500 italic font-serif">
              “{award.citationEn}”
            </p>
          </div>

          {/* Interactive Simulation Sandbox CTA if available */}
          {award.interactiveSimulationId && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-slate-900 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Atom className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    该重大发现配有可调参数的真实实验模拟沙盒！
                  </h4>
                  <p className="text-xs text-slate-400">
                    立刻进入交互沙盒，动手调节微观/宏观参数并观测实验反应。
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (award.interactiveSimulationId) {
                    onOpenSimulation(award.interactiveSimulationId);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>启动专属实验模拟</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 4 Deep Historical & Scientific Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Historical Impasse */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>时代背景与前夜困境</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {award.historicalContext}
              </p>
            </div>

            {/* 2. Experimental Breakthrough */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>突破性巧思与实验装置</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {award.breakthroughMethod}
              </p>
            </div>

            {/* 3. Key Formula & Theoretical Meaning */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <Atom className="w-4 h-4 text-emerald-400" />
                <span>核心原理与理论机制</span>
              </div>
              {award.keyFormula ? (
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-code text-sm text-amber-300 text-center">
                    {award.keyFormula.latex}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">{award.keyFormula.label}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {award.keyFormula.explanation}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">奠定了现代科学坚实的研究范式与生命/物质理解。</p>
              )}
            </div>

            {/* 4. Modern Technological Application */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>改变世界的现代技术赋能</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {award.modernApplication}
              </p>
            </div>
          </div>

          {/* Historical Anecdote / Trivia */}
          {award.trivia && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>历史趣闻与群星轶事</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {award.trivia}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
