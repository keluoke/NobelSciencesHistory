import React, { useState } from 'react';
import { COMPLETE_ARCHIVE_DATA, CRITERIA_EXPLANATIONS, VACANT_YEARS_HISTORICAL_ANALYSIS } from '../data/completeArchiveData';
import { DISCIPLINE_LABELS, NOBEL_AWARDS } from '../data/nobelData';
import { PrizeDiscipline, NobelAward } from '../types';
import { HelpCircle, AlertCircle, Search, ArrowUpRight, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Props {
  onSelectAward: (award: NobelAward) => void;
}

export const CompleteArchiveView: React.FC<Props> = ({ onSelectAward }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<PrizeDiscipline | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'awarded_only' | 'vacant_only'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCriteriaGuide, setShowCriteriaGuide] = useState<boolean>(true);

  // Filter list
  const filteredRecords = COMPLETE_ARCHIVE_DATA.filter((record) => {
    if (selectedDiscipline !== 'all' && record.discipline !== selectedDiscipline) {
      return false;
    }

    if (statusFilter === 'awarded_only' && !record.isAwarded) {
      return false;
    }
    if (statusFilter === 'vacant_only' && record.isAwarded) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchYear = record.year.toString().includes(q);
      const matchTitle = record.discoveryTitle.toLowerCase().includes(q);
      const matchBrief = record.citationBrief.toLowerCase().includes(q);
      const matchLaureates = record.laureates.some(l => l.toLowerCase().includes(q));
      if (!matchYear && !matchTitle && !matchBrief && !matchLaureates) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-10">
      {/* Top QA Guide: Apple-styled frosted card */}
      <div className="apple-glass rounded-3xl overflow-hidden border border-white/10">
        <div
          onClick={() => setShowCriteriaGuide(!showCriteriaGuide)}
          className="p-6 sm:p-7 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-300/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-center gap-3 font-display">
                <span>为什么有些年份是空的？“重大”的标准是什么？</span>
                <span className="text-xs font-semibold text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
                  诺奖百年历史档案解密
                </span>
              </h3>
              <p className="text-sm text-neutral-300 mt-1">
                点击展开或收起：详解空缺年份原因（一战、二战与章程第4条）及成果重大性三级评判准则
              </p>
            </div>
          </div>

          <button className="text-neutral-400 p-2 hover:text-white">
            {showCriteriaGuide ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>

        {/* Collapsible Content */}
        {showCriteriaGuide && (
          <div className="p-7 pt-2 border-t border-white/10 space-y-8">
            {/* 1. Why are some years vacant? */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-amber-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                一、为什么有些年份没有颁发诺贝尔奖？（历史空缺解密）
              </h4>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                在诺贝尔奖自 1901 年以来的历史上，并非每一年都授奖。主要包含三大历史原因：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {VACANT_YEARS_HISTORICAL_ANALYSIS.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                    <div className="text-sm font-bold text-white">{item.period}</div>
                    <div className="text-xs font-semibold text-rose-400">{item.affected}</div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. What are the milestone criteria? */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-wide text-emerald-400 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                二、本应用中“重大里程碑 (Milestone Level)”的科学评判标准
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CRITERIA_EXPLANATIONS.map((c) => (
                  <div key={c.level} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{c.title}</span>
                      <span className="text-xs font-code font-semibold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="text-xs text-neutral-400 pt-2 border-t border-white/10">
                      <strong className="text-neutral-300">代表成果：</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-neutral-400">
                        {c.examples.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Complete Historical Database Section */}
      <div className="space-y-6">
        {/* Controls Toolbar - macOS / Apple style */}
        <div className="p-7 rounded-3xl bg-[#1C1C1E]/70 border border-white/[0.12] backdrop-blur-2xl flex flex-wrap items-center justify-between gap-5">
          <div>
            <h3 className="text-2xl font-bold text-white font-display tracking-tight">
              百年历届完整编年全景档案 (1901 — 2024)
            </h3>
            <p className="text-base text-neutral-300 mt-1.5 font-normal">
              包含全部授奖年份、获奖者全名单及历史空缺年份的官方档案权威记录
            </p>
          </div>

          {/* Filter Segmented Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Discipline Filter */}
            <div className="flex bg-black/80 p-1.5 rounded-full border border-white/[0.12] text-sm">
              {(['all', 'physics', 'chemistry', 'medicine'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiscipline(d)}
                  className={`px-4.5 py-2 rounded-full transition-all font-semibold cursor-pointer ${
                    selectedDiscipline === d
                      ? 'bg-white text-black shadow-lg scale-102'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {d === 'all' ? '全部三大奖' : DISCIPLINE_LABELS[d]?.short}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex bg-black/80 p-1.5 rounded-full border border-white/[0.12] text-sm">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-full transition-all font-semibold cursor-pointer ${
                  statusFilter === 'all' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setStatusFilter('awarded_only')}
                className={`px-4 py-2 rounded-full transition-all font-semibold cursor-pointer ${
                  statusFilter === 'awarded_only' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
                }`}
              >
                已授奖
              </button>
              <button
                onClick={() => setStatusFilter('vacant_only')}
                className={`px-4 py-2 rounded-full transition-all font-semibold cursor-pointer ${
                  statusFilter === 'vacant_only' ? 'bg-rose-500 text-white shadow-lg' : 'text-neutral-400 hover:text-white'
                }`}
              >
                历史空缺年
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Result Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-base text-neutral-400">
          <div className="relative w-full sm:w-[420px]">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="在全部编年史中检索年份或人名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#1C1C1E]/80 border border-white/[0.12] text-base text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 shadow-inner"
            />
          </div>

          <div className="text-neutral-300 font-medium text-base">
            检索出 <span className="font-code text-amber-400 font-bold text-lg">{filteredRecords.length}</span> 条编年历史条目
          </div>
        </div>

        {/* Records Table / List */}
        <div className="space-y-4">
          {filteredRecords.map((record, idx) => {
            const disc = DISCIPLINE_LABELS[record.discipline];
            const matchingDeepAward = record.deepAwardId
              ? NOBEL_AWARDS.find(a => a.id === record.deepAwardId)
              : null;

            if (!record.isAwarded) {
              // Unawarded vacant year card - Apple warning callout
              return (
                <div
                  key={`${record.year}-${record.discipline}-${idx}`}
                  className="p-6 sm:p-7 rounded-3xl bg-rose-950/25 border border-rose-500/35 flex flex-wrap items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-code font-black text-rose-400 text-2xl sm:text-3xl">
                      {record.year}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-bold">
                      {disc?.short}
                    </span>
                    <div>
                      <span className="font-bold text-rose-200 text-lg sm:text-xl">{record.discoveryTitle}</span>
                      <p className="text-sm sm:text-base text-neutral-300 mt-1 leading-relaxed font-normal">
                        {record.unawardedReason}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-rose-300 bg-rose-500/20 px-3.5 py-1.5 rounded-full border border-rose-500/30 font-semibold">
                    根据章程保留
                  </span>
                </div>
              );
            }

            // Awarded year card
            return (
              <div
                key={`${record.year}-${record.discipline}-${idx}`}
                className="apple-card p-6 sm:p-7 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-white/[0.08]"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                    <span className="font-code font-black text-amber-400 text-2xl sm:text-3xl">
                      {record.year}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full border ${disc?.badge}`}>
                      {disc?.short}
                    </span>
                    {record.milestoneLevel === 1 && (
                      <span className="text-xs sm:text-sm font-semibold text-amber-300 bg-amber-500/15 px-3 py-0.5 rounded-full border border-amber-500/30">
                        ★ 范式更替
                      </span>
                    )}
                    <span className="text-neutral-200 font-semibold text-base sm:text-lg">
                      {record.laureates.join('、')}
                    </span>
                  </div>

                  <h5 className="text-lg sm:text-xl font-bold text-white font-display">
                    {record.discoveryTitle}
                  </h5>

                  <p className="text-base text-neutral-300 leading-relaxed max-w-4xl font-normal">
                    {record.citationBrief}
                  </p>
                </div>

                {matchingDeepAward && (
                  <button
                    onClick={() => onSelectAward(matchingDeepAward)}
                    className="apple-pill-btn shrink-0 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black text-sm font-bold flex items-center gap-2 transition-all shadow-md self-start sm:self-center cursor-pointer"
                  >
                    <span>深度档案与实验沙盒</span>
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
