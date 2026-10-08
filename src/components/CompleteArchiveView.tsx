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
    <div className="space-y-8">
      {/* Top QA Guide: Answering the user's questions prominently */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-lg">
        <div
          onClick={() => setShowCriteriaGuide(!showCriteriaGuide)}
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>为什么有些年份是空的？“重大”的标准是什么？</span>
                <span className="text-xs font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  诺奖百年历史档案解密指南
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                点击展开/收起：详解空缺年份原因（一战、二战与章程第4条）及成果重大性三级评判准则
              </p>
            </div>
          </div>

          <button className="text-slate-400 p-1">
            {showCriteriaGuide ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Collapsible Content */}
        {showCriteriaGuide && (
          <div className="p-6 pt-0 border-t border-slate-800/60 space-y-6 mt-2">
            {/* 1. Why are some years vacant? */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                一、为什么有些年份没有颁发诺贝尔奖？（历史空缺解密）
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                在诺贝尔奖自 1901 年以来的历史上，并非每一年都授奖。主要包含三大历史原因：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {VACANT_YEARS_HISTORICAL_ANALYSIS.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-white">{item.period}</div>
                    <div className="text-[11px] font-medium text-rose-400">{item.affected}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. What are the milestone criteria? */}
            <div className="space-y-3 pt-3 border-t border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                二、本应用中“重大里程碑 (Milestone Level)”的科学评判标准
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CRITERIA_EXPLANATIONS.map((c) => (
                  <div key={c.level} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{c.title}</span>
                      <span className="text-[10px] font-code font-semibold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                      <strong>代表成果：</strong>
                      <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-500">
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
      <div className="space-y-4">
        {/* Controls Toolbar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">
              百年历届完整编年全景档案 (1901 — 2024)
            </h3>
            <p className="text-xs text-slate-400">
              包含全部授奖年份、获奖者全名单及历史空缺年份的完整记录
            </p>
          </div>

          {/* Filter Segmented Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Discipline Filter */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {(['all', 'physics', 'chemistry', 'medicine'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiscipline(d)}
                  className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                    selectedDiscipline === d
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d === 'all' ? '全部三大奖' : DISCIPLINE_LABELS[d]?.short}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  statusFilter === 'all' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setStatusFilter('awarded_only')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  statusFilter === 'awarded_only' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'
                }`}
              >
                已授奖
              </button>
              <button
                onClick={() => setStatusFilter('vacant_only')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  statusFilter === 'vacant_only' ? 'bg-rose-500/20 text-rose-300 font-medium' : 'text-slate-400'
                }`}
              >
                历史空缺年
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Result Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="在全部编年史中检索年份或人名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            检索出 <span className="font-code text-amber-300 font-bold">{filteredRecords.length}</span> 条编年历史条目
          </div>
        </div>

        {/* Records Table / List */}
        <div className="space-y-2.5">
          {filteredRecords.map((record, idx) => {
            const disc = DISCIPLINE_LABELS[record.discipline];
            const matchingDeepAward = record.deepAwardId
              ? NOBEL_AWARDS.find(a => a.id === record.deepAwardId)
              : null;

            if (!record.isAwarded) {
              // Unawarded vacant year card
              return (
                <div
                  key={`${record.year}-${record.discipline}-${idx}`}
                  className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-code font-bold text-rose-400 text-sm">
                      {record.year}
                    </span>
                    <span className="px-1.5 py-0.5 rounded border border-rose-500/30 text-rose-300 text-[10px] font-semibold">
                      {disc?.short}
                    </span>
                    <div>
                      <span className="font-bold text-rose-200">{record.discoveryTitle}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {record.unawardedReason}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                    章程第4条保留
                  </span>
                </div>
              );
            }

            // Awarded year card
            return (
              <div
                key={`${record.year}-${record.discipline}-${idx}`}
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="font-code font-bold text-amber-400 text-sm">
                      {record.year}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${disc?.badge}`}>
                      {disc?.short}
                    </span>
                    {record.milestoneLevel === 1 && (
                      <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.2 rounded border border-amber-500/30">
                        ★ 范式更替
                      </span>
                    )}
                    <span className="text-slate-400 font-medium">
                      {record.laureates.join('、')}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-white font-display">
                    {record.discoveryTitle}
                  </h5>

                  <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                    {record.citationBrief}
                  </p>
                </div>

                {/* If matching deep detailed award exists, provide deep dive button */}
                {matchingDeepAward && (
                  <button
                    onClick={() => onSelectAward(matchingDeepAward)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 hover:text-amber-200 border border-amber-400/30 text-xs font-semibold flex items-center gap-1 transition-colors self-start sm:self-center"
                  >
                    <span>深度档案与实验沙盒</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
