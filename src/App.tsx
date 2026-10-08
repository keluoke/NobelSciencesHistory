/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TimelineView } from './components/TimelineView';
import { GalleryView } from './components/GalleryView';
import { CompleteArchiveView } from './components/CompleteArchiveView';
import { LineageView } from './components/LineageView';
import { QuizView } from './components/QuizView';
import { AwardDetailModal } from './components/AwardDetailModal';
import { SimulationLabModal } from './components/simulations/SimulationLabModal';
import { NOBEL_AWARDS } from './data/nobelData';
import { NobelAward, HistoricalEra, PrizeDiscipline, SimulationId } from './types';

export default function App() {
  // Navigation & View states
  const [activeView, setActiveView] = useState<'timeline' | 'gallery' | 'complete' | 'lineage' | 'quiz'>('timeline');

  // Discipline, search and filter states
  const [selectedDiscipline, setSelectedDiscipline] = useState<PrizeDiscipline | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<HistoricalEra | 'all'>('all');

  // Modals state
  const [inspectingAward, setInspectingAward] = useState<NobelAward | null>(null);
  const [labModalOpen, setLabModalOpen] = useState<boolean>(false);
  const [activeSimId, setActiveSimId] = useState<SimulationId>('dna_crispr');

  // Filter awards based on discipline, era, and search query
  const filteredAwards = useMemo(() => {
    return NOBEL_AWARDS.filter((award) => {
      // Discipline filter
      if (selectedDiscipline !== 'all' && award.discipline !== selectedDiscipline) {
        return false;
      }

      // Era filter
      if (selectedEra !== 'all' && award.era !== selectedEra) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchYear = award.year.toString().includes(query);
        const matchTitle = award.discoveryTitle.toLowerCase().includes(query);
        const matchSummary = award.summary.toLowerCase().includes(query);
        const matchLaureates = award.laureates.some(
          (l) =>
            l.name.toLowerCase().includes(query) ||
            (l.nativeName && l.nativeName.toLowerCase().includes(query)) ||
            l.country.toLowerCase().includes(query)
        );
        const matchTags = award.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchYear && !matchTitle && !matchSummary && !matchLaureates && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDiscipline, selectedEra, searchQuery]);

  const handleOpenSimulation = (simId: SimulationId) => {
    setActiveSimId(simId);
    setLabModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Bar Header */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenLab={() => {
          setActiveSimId('dna_crispr');
          setLabModalOpen(true);
        }}
      />

      {/* Hero Section with Discipline Switcher */}
      <HeroSection
        selectedDiscipline={selectedDiscipline}
        onSelectDiscipline={setSelectedDiscipline}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenLabWithId={handleOpenSimulation}
        totalAwardsCount={NOBEL_AWARDS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeView === 'timeline' && (
          <TimelineView
            awards={filteredAwards}
            selectedEra={selectedEra}
            onSelectEra={setSelectedEra}
            selectedDiscipline={selectedDiscipline}
            onSelectDiscipline={setSelectedDiscipline}
            onSelectAward={setInspectingAward}
            onOpenSimulation={handleOpenSimulation}
          />
        )}

        {activeView === 'complete' && (
          <CompleteArchiveView onSelectAward={setInspectingAward} />
        )}

        {activeView === 'gallery' && (
          <GalleryView
            awards={filteredAwards}
            onSelectAward={setInspectingAward}
            onOpenSimulation={handleOpenSimulation}
          />
        )}

        {activeView === 'lineage' && (
          <LineageView onSelectAward={setInspectingAward} />
        )}

        {activeView === 'quiz' && (
          <QuizView onSelectAward={setInspectingAward} />
        )}
      </main>

      {/* Detail Modal */}
      {inspectingAward && (
        <AwardDetailModal
          award={inspectingAward}
          onClose={() => setInspectingAward(null)}
          onOpenSimulation={(simId) => {
            setInspectingAward(null);
            handleOpenSimulation(simId);
          }}
        />
      )}

      {/* Interactive Simulation Lab Modal */}
      {labModalOpen && (
        <SimulationLabModal
          initialSimId={activeSimId}
          onClose={() => setLabModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-amber-300">NobelSciences</span>
            <span aria-hidden="true">·</span>
            <span>物理 · 化学 · 生理学或医学奖百年科学史探索全景</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>官方档案权威考证 · 交互实验模拟沙盒 · 跨学科思想脉络</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
