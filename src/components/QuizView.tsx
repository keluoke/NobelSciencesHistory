import React, { useState } from 'react';
import { NOBEL_QUIZZES } from '../data/quizData';
import { NOBEL_AWARDS, DISCIPLINE_LABELS } from '../data/nobelData';
import { NobelAward } from '../types';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface Props {
  onSelectAward: (award: NobelAward) => void;
}

export const QuizView: React.FC<Props> = ({ onSelectAward }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<string, boolean>>({});

  const q = NOBEL_QUIZZES[currentIdx];
  const total = NOBEL_QUIZZES.length;

  const currentSelection = selectedAnswers[q.id];
  const hasAnsweredCurrent = isSubmitted[q.id];

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers({ ...selectedAnswers, [q.id]: idx });
    setIsSubmitted({ ...isSubmitted, [q.id]: true });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted({});
    setCurrentIdx(0);
  };

  const score = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const question = NOBEL_QUIZZES.find((item) => item.id === qId);
    if (question && selectedAnswers[qId] === question.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const relatedAward = NOBEL_AWARDS.find(
    (a) => a.year === q.relatedYear && a.discipline === q.relatedDiscipline
  );

  const discInfo = DISCIPLINE_LABELS[q.discipline];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header Card */}
      <div className="p-7 rounded-3xl apple-glass flex items-center justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 font-display tracking-tight">
            <Award className="w-7 h-7 text-amber-400" />
            诺贝尔自然科学奖 · 跨学科科学思维挑战
          </h3>
          <p className="text-base text-neutral-300 mt-1.5 font-normal">
            检验您对物理、化学与生理学/医学重大发现、历史灵感与科学机制的深度理解
          </p>
        </div>

        {/* Score & Reset */}
        <div className="flex items-center gap-5">
          <div className="text-right">
            <span className="text-xs sm:text-sm text-neutral-400 block font-medium">当前得分</span>
            <span className="font-code font-black text-amber-400 text-3xl">
              {score} <span className="text-base font-normal text-neutral-500">/ {total}</span>
            </span>
          </div>
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="重新测验"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Question Card - Apple Card Style */}
      <div className="p-8 sm:p-12 rounded-3xl apple-glass space-y-9">
        {/* Progress header */}
        <div className="flex items-center justify-between text-base text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="font-code text-amber-400 font-bold text-lg">
              第 {currentIdx + 1} 题 / 共 {total} 题
            </span>
            <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full border ${discInfo?.badge}`}>
              {discInfo?.short}
            </span>
          </div>
          <span className="text-neutral-300 font-medium text-base">{q.title}</span>
        </div>

        {/* Question Text (Enlarged) */}
        <h4 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed font-display tracking-tight">
          {q.question}
        </h4>

        {/* Options */}
        <div className="space-y-4">
          {q.options.map((opt, optIdx) => {
            const isChosen = currentSelection === optIdx;
            const isCorrect = optIdx === q.correctIndex;

            let optionStyle = 'bg-black/60 border-white/[0.1] text-neutral-200 hover:bg-white/10 hover:border-white/30';

            if (hasAnsweredCurrent) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/60 border-emerald-500/90 text-emerald-100 font-semibold';
              } else if (isChosen && !isCorrect) {
                optionStyle = 'bg-rose-950/60 border-rose-500/90 text-rose-100';
              } else {
                optionStyle = 'bg-black/30 border-white/5 text-neutral-500 opacity-50';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-6 rounded-3xl border text-base sm:text-lg text-left transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-center gap-4.5">
                  <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-code text-sm font-bold shrink-0 text-white">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="font-normal leading-relaxed">{opt}</span>
                </div>

                {hasAnsweredCurrent && (
                  <div className="shrink-0 ml-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : isChosen ? (
                      <XCircle className="w-6 h-6 text-rose-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation callout if answered */}
        {hasAnsweredCurrent && (
          <div className="p-7 rounded-3xl bg-black/70 border border-white/[0.15] space-y-3.5">
            <div className="flex items-center gap-2 text-base font-bold">
              {currentSelection === q.correctIndex ? (
                <span className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> 回答完全正确！
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-2">
                  <XCircle className="w-6 h-6" /> 回答错误
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
              {q.explanation}
            </p>

            {relatedAward && (
              <button
                onClick={() => onSelectAward(relatedAward)}
                className="text-base text-amber-400 hover:text-amber-300 flex items-center gap-2 font-semibold mt-3 transition-colors cursor-pointer"
              >
                <span>查阅 {relatedAward.year} 年《{relatedAward.discoveryTitle}》详细诺奖档案</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.1]">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className="apple-pill-btn px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-base font-medium text-white transition-colors cursor-pointer"
          >
            上一题
          </button>

          <button
            disabled={currentIdx === total - 1}
            onClick={() => setCurrentIdx((prev) => Math.min(total - 1, prev + 1))}
            className="apple-pill-btn px-8 py-3 rounded-full bg-white hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none text-base font-bold text-black transition-colors cursor-pointer shadow-lg shadow-white/10"
          >
            下一题
          </button>
        </div>
      </div>
    </div>
  );
};
