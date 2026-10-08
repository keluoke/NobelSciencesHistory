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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            诺贝尔自然科学奖 · 跨学科科学思维挑战
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            检验您对物理、化学与生理学/医学重大发现、历史灵感与科学机制的理解
          </p>
        </div>

        {/* Score & Reset */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400">当前得分：</span>
            <span className="font-code font-bold text-amber-400 text-sm">
              {score} / {total}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="重新测验"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        {/* Progress header */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-code text-amber-400 font-semibold">
              第 {currentIdx + 1} 题 / 共 {total} 题
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${discInfo?.badge}`}>
              {discInfo?.short}
            </span>
          </div>
          <span className="text-slate-500">{q.title}</span>
        </div>

        {/* Question Text */}
        <h4 className="text-lg font-bold text-white leading-relaxed">
          {q.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {q.options.map((opt, optIdx) => {
            const isChosen = currentSelection === optIdx;
            const isCorrect = optIdx === q.correctIndex;

            let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700';

            if (hasAnsweredCurrent) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 font-medium';
              } else if (isChosen && !isCorrect) {
                optionStyle = 'bg-rose-950/40 border-rose-500/70 text-rose-200';
              } else {
                optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-3.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-code text-[11px] font-semibold shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {hasAnsweredCurrent && (
                  <div className="shrink-0 ml-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isChosen ? (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation callout if answered */}
        {hasAnsweredCurrent && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              {currentSelection === q.correctIndex ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 回答正确！
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> 回答错误
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {q.explanation}
            </p>

            {relatedAward && (
              <button
                onClick={() => onSelectAward(relatedAward)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium mt-1 transition-colors"
              >
                <span>查阅 {relatedAward.year} 年《{relatedAward.discoveryTitle}》详细诺奖档案</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs text-slate-200 transition-colors"
          >
            上一题
          </button>

          <button
            disabled={currentIdx === total - 1}
            onClick={() => setCurrentIdx((prev) => Math.min(total - 1, prev + 1))}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-950 transition-colors"
          >
            下一题
          </button>
        </div>
      </div>
    </div>
  );
};
