import React from 'react';
import { Sparkles, Atom } from 'lucide-react';

interface Props {
  activeView: 'timeline' | 'gallery' | 'complete' | 'lineage' | 'quiz';
  onSelectView: (view: 'timeline' | 'gallery' | 'complete' | 'lineage' | 'quiz') => void;
  onOpenLab: () => void;
}

export const Header: React.FC<Props> = ({ activeView, onSelectView, onOpenLab }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000]/80 backdrop-blur-3xl border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => onSelectView('timeline')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display hover:opacity-90 transition-opacity flex items-center gap-3 cursor-pointer group"
        >
          <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-100 flex items-center justify-center text-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <Atom className="w-5 h-5 text-black stroke-[2.4]" />
          </span>
          <span className="tracking-tight text-white font-extrabold text-xl sm:text-2xl">NobelSciences</span>
        </button>

        {/* Zone 2: Apple style navigation links (Clear, legible 15px font, spacious gaps) */}
        <nav className="hidden lg:flex items-center gap-9 text-[15px] font-medium text-neutral-300">
          <button
            onClick={() => onSelectView('timeline')}
            className={`transition-all py-1.5 cursor-pointer ${
              activeView === 'timeline'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            全景时间轴
          </button>
          <button
            onClick={() => onSelectView('complete')}
            className={`transition-all py-1.5 cursor-pointer ${
              activeView === 'complete'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            历届总录 (1901-2024)
          </button>
          <button
            onClick={() => onSelectView('gallery')}
            className={`transition-all py-1.5 cursor-pointer ${
              activeView === 'gallery'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            重大发现展厅
          </button>
          <button
            onClick={() => onSelectView('lineage')}
            className={`transition-all py-1.5 cursor-pointer ${
              activeView === 'lineage'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            思想演进脉络
          </button>
          <button
            onClick={() => onSelectView('quiz')}
            className={`transition-all py-1.5 cursor-pointer ${
              activeView === 'quiz'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            诺奖科学挑战
          </button>
        </nav>

        {/* Zone 3: Primary action - Apple style frosted pill button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLab}
            className="apple-pill-btn px-5 py-2.5 text-sm sm:text-[15px] font-semibold text-black bg-white hover:bg-neutral-100 rounded-full transition-all whitespace-nowrap shadow-lg shadow-white/10 flex items-center gap-2 cursor-pointer border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-black fill-black" />
            <span>进入实验沙盒</span>
          </button>
        </div>
      </div>
    </header>
  );
};
