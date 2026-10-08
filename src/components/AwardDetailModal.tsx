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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0D0D12] border border-white/15 shadow-2xl flex flex-col">
        {/* Sticky Header - Apple Glass style */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-6 bg-[#0E0E14]/90 backdrop-blur-3xl border-b border-white/[0.12]">
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl font-black font-code text-amber-400 tracking-tight">
              {award.year}
            </span>
            <div className="h-7 w-px bg-white/20" />
            <span className={`text-sm sm:text-base font-bold px-3.5 py-1 rounded-full border ${discInfo?.badge}`}>
              {discInfo?.label}
            </span>
            <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border ${catInfo?.bgBadge || 'text-neutral-300'}`}>
              {catInfo?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSpeech}
              className={`apple-pill-btn px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
              title={isSpeaking ? '停止朗读' : '朗读官方颁奖词与原理解读'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-black" /> : <Volume2 className="w-4 h-4 text-white" />}
              <span>{isSpeaking ? '停止朗读' : '语音导览'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-3 rounded-full bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-10 space-y-9">
          {/* Main Title & One-line Summary */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
              {award.discoveryTitle}
            </h2>
            <div className="mt-5 p-6 rounded-3xl bg-amber-500/[0.08] border border-amber-500/25 text-lg sm:text-xl text-amber-100 leading-relaxed font-normal shadow-inner">
              {award.summary}
            </div>
          </div>

          {/* Laureates Row */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
              获奖科学家 (LAUREATES)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {award.laureates.map((l, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-black/60 border border-white/[0.1] flex items-start gap-4 hover:border-white/20 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-white/5 border border-amber-400/30 flex items-center justify-center font-display text-amber-300 font-black shrink-0 text-lg shadow-sm">
                    {l.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white truncate">{l.name}</div>
                    {l.nativeName && (
                      <div className="text-xs sm:text-sm text-neutral-400 truncate mt-0.5">{l.nativeName}</div>
                    )}
                    <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">
                      {l.country} · {l.birthDeath}
                    </div>
                    {l.affiliation && (
                      <div className="text-xs text-neutral-400 truncate mt-0.5">{l.affiliation}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Nobel Citation */}
          <div className="p-7 sm:p-8 rounded-3xl bg-black/70 border border-white/[0.12] space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4.5 h-4.5" />
              <span>官方授奖词 (NOBEL CITATION)</span>
            </div>
            <p className="text-lg sm:text-xl text-white italic font-serif leading-relaxed">
              “{award.citationZh}”
            </p>
            <p className="text-sm sm:text-base text-neutral-400 italic font-serif leading-relaxed">
              “{award.citationEn}”
            </p>
          </div>

          {/* Interactive Simulation Sandbox CTA if available */}
          {award.interactiveSimulationId && (
            <div className="p-7 rounded-3xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 border border-amber-400/35 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Atom className="w-7 h-7 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    该重大发现配有可调参数的真实实验模拟沙盒！
                  </h4>
                  <p className="text-base text-neutral-300 mt-1">
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
                className="apple-pill-btn px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-sm sm:text-base flex items-center gap-2 transition-all shadow-xl shadow-white/10 cursor-pointer"
              >
                <span>启动专属实验模拟</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}

          {/* 4 Deep Historical & Scientific Sections - Enlarged font sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Historical Impasse */}
            <div className="p-6 rounded-3xl bg-black/60 border border-white/[0.1] space-y-3">
              <div className="flex items-center gap-2.5 text-base font-bold text-amber-300">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>时代背景与前夜困境</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed font-normal">
                {award.historicalContext}
              </p>
            </div>

            {/* 2. Experimental Breakthrough */}
            <div className="p-6 rounded-3xl bg-black/60 border border-white/[0.1] space-y-3">
              <div className="flex items-center gap-2.5 text-base font-bold text-cyan-300">
                <Wrench className="w-5 h-5 text-cyan-400" />
                <span>突破性巧思与实验装置</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed font-normal">
                {award.breakthroughMethod}
              </p>
            </div>

            {/* 3. Key Formula & Theoretical Meaning */}
            <div className="p-6 rounded-3xl bg-black/60 border border-white/[0.1] space-y-3">
              <div className="flex items-center gap-2.5 text-base font-bold text-emerald-300">
                <Atom className="w-5 h-5 text-emerald-400" />
                <span>核心原理与理论机制</span>
              </div>
              {award.keyFormula ? (
                <div className="space-y-2.5">
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-white/[0.12] font-code text-lg text-amber-300 text-center shadow-inner">
                    {award.keyFormula.latex}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400 font-semibold">{award.keyFormula.label}</div>
                  <p className="text-base text-neutral-200 leading-relaxed font-normal">
                    {award.keyFormula.explanation}
                  </p>
                </div>
              ) : (
                <p className="text-base text-neutral-300 leading-relaxed font-normal">奠定了现代科学坚实的研究范式与生命/物质理解。</p>
              )}
            </div>

            {/* 4. Modern Technological Application */}
            <div className="p-6 rounded-3xl bg-black/60 border border-white/[0.1] space-y-3">
              <div className="flex items-center gap-2.5 text-base font-bold text-purple-300">
                <Cpu className="w-5 h-5 text-purple-400" />
                <span>改变世界的现代技术赋能</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed font-normal">
                {award.modernApplication}
              </p>
            </div>
          </div>

          {/* Historical Anecdote / Trivia */}
          {award.trivia && (
            <div className="p-6 rounded-3xl bg-black/70 border border-white/[0.12] space-y-2.5">
              <div className="flex items-center gap-2.5 text-base text-rose-400 font-bold">
                <HelpCircle className="w-5 h-5" />
                <span>历史趣闻与群星轶事</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed font-normal">
                {award.trivia}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
