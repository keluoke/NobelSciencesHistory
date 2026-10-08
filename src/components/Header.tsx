import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  activeView: 'timeline' | 'gallery' | 'complete' | 'lineage' | 'quiz';
  onSelectView: (view: 'timeline' | 'gallery' | 'complete' | 'lineage' | 'quiz') => void;
  onOpenLab: () => void;
}

export const Header: React.FC<Props> = ({ activeView, onSelectView, onOpenLab }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectView('timeline')}
          className="text-lg font-bold tracking-tight text-white font-display hover:text-amber-200 transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-400 inline-block" />
          <span>NobelSciences</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectView('timeline')}
            className={`transition-colors hover:text-white ${
              activeView === 'timeline' ? 'text-amber-300 border-b border-amber-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            全景时间轴
          </button>
          <button
            onClick={() => onSelectView('complete')}
            className={`transition-colors hover:text-white ${
              activeView === 'complete' ? 'text-amber-300 border-b border-amber-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            历届总录 (1901-2024)
          </button>
          <button
            onClick={() => onSelectView('gallery')}
            className={`transition-colors hover:text-white ${
              activeView === 'gallery' ? 'text-amber-300 border-b border-amber-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            重大发现展厅
          </button>
          <button
            onClick={() => onSelectView('lineage')}
            className={`transition-colors hover:text-white ${
              activeView === 'lineage' ? 'text-amber-300 border-b border-amber-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            思想演进脉络
          </button>
          <button
            onClick={() => onSelectView('quiz')}
            className={`transition-colors hover:text-white ${
              activeView === 'quiz' ? 'text-amber-300 border-b border-amber-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            诺奖科学挑战
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLab}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-emerald-400 to-rose-400 hover:opacity-95 rounded-lg transition-opacity whitespace-nowrap shadow-sm shadow-amber-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>进入实验模拟沙盒</span>
          </button>
        </div>
      </div>
    </header>
  );
};
