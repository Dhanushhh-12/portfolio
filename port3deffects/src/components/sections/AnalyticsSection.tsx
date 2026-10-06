import React, { useState, useRef } from 'react';
import { ANALYTICS_METRICS } from '../../data/portfolioData';
import { BarChart3, TrendingUp, Users, DollarSign, Activity } from '../ui/icons';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';

export const AnalyticsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'revenue' | 'users' | 'growth' | 'performance'>('revenue');
  const analyticsRef = useRef<HTMLElement>(null);

  const tools = [
    { name: "SQL", category: "Relational Queries & Joins" },
    { name: "Python", category: "Pandas & Data Manipulation" },
    { name: "Excel", category: "Formulas & Pivot Tables" },
    { name: "Power BI", category: "Business Intelligence & Dashboards" },
    { name: "Tableau", category: "Visual Data Storytelling" },
    { name: "Statistics", category: "Distributions & Hypotheses" },
    { name: "Data Visualization", category: "Chart Selection & Aesthetics" }
  ];

  // Demo datasets for the visual chart
  const chartData = {
    revenue: [
      { label: "Jan", val: 35, full: "$35k" },
      { label: "Feb", val: 42, full: "$42k" },
      { label: "Mar", val: 58, full: "$58k" },
      { label: "Apr", val: 51, full: "$51k" },
      { label: "May", val: 68, full: "$68k" },
      { label: "Jun", val: 74, full: "$74k" },
      { label: "Jul", val: 92, full: "$92k" },
      { label: "Aug", val: 88, full: "$88k" },
    ],
    users: [
      { label: "Jan", val: 28, full: "2.8k" },
      { label: "Feb", val: 36, full: "3.6k" },
      { label: "Mar", val: 49, full: "4.9k" },
      { label: "Apr", val: 62, full: "6.2k" },
      { label: "May", val: 78, full: "7.8k" },
      { label: "Jun", val: 85, full: "8.5k" },
      { label: "Jul", val: 104, full: "10.4k" },
      { label: "Aug", val: 124, full: "12.4k" },
    ],
    growth: [
      { label: "Jan", val: 12, full: "+12%" },
      { label: "Feb", val: 18, full: "+18%" },
      { label: "Mar", val: 15, full: "+15%" },
      { label: "Apr", val: 24, full: "+24%" },
      { label: "May", val: 28, full: "+28%" },
      { label: "Jun", val: 22, full: "+22%" },
      { label: "Jul", val: 34, full: "+34%" },
      { label: "Aug", val: 38, full: "+38%" },
    ],
    performance: [
      { label: "Jan", val: 82, full: "82ms" },
      { label: "Feb", val: 78, full: "78ms" },
      { label: "Mar", val: 70, full: "70ms" },
      { label: "Apr", val: 65, full: "65ms" },
      { label: "May", val: 54, full: "54ms" },
      { label: "Jun", val: 49, full: "49ms" },
      { label: "Jul", val: 42, full: "42ms" },
      { label: "Aug", val: 39, full: "39ms" },
    ]
  };

  const currentChart = chartData[activeTab];
  const maxVal = Math.max(...currentChart.map(d => d.val));

  useGSAP(() => {
    if (prefersReducedMotion() || !analyticsRef.current) return;

    // Header reveal
    gsap.fromTo(
      '.analytics-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: analyticsRef.current.querySelector('.analytics-header'),
          start: 'top 85%',
        },
      }
    );

    // Tools strip stagger
    gsap.fromTo(
      '.analytics-tool-pill',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: analyticsRef.current.querySelector('.analytics-tools-grid'),
          start: 'top 85%',
        },
      }
    );

    // Dashboard card reveal
    gsap.fromTo(
      '.analytics-dashboard-card',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: analyticsRef.current.querySelector('.analytics-dashboard-card'),
          start: 'top 80%',
        },
      }
    );

    // 4 KPI Metric cards
    gsap.fromTo(
      '.kpi-metric-card',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: analyticsRef.current.querySelector('.kpi-metrics-grid'),
          start: 'top 85%',
        },
      }
    );

    // Chart bars scaleY grow
    gsap.fromTo(
      '.chart-bar-element',
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: analyticsRef.current.querySelector('.chart-bars-container'),
          start: 'top 85%',
        },
      }
    );
  }, { scope: analyticsRef, dependencies: [activeTab] });

  return (
    <section ref={analyticsRef} id="analytics" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header (36-48px, weight 700) */}
      <div className="analytics-header space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Data Analytics Capability</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
          From Code to <span className="text-gradient-cyan">Insights</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#555555] font-normal leading-relaxed max-w-3xl pt-2">
          Alongside development, I'm building my expertise in Data Analytics — using programming, databases and visualization tools to transform raw information into meaningful insights.
        </p>
      </div>

      {/* Analytical Toolset Strip */}
      <div className="analytics-tools-grid grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="analytics-tool-pill p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#0284C7]/50 shadow-sm transition-all text-center group"
          >
            <span className="block font-bold text-sm text-[#111111] group-hover:text-[#0284C7] transition-colors">
              {tool.name}
            </span>
            <span className="text-[10px] font-mono text-[#777777] block mt-0.5 truncate">
              {tool.category}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Sample Analytics Dashboard Container */}
      <div className="analytics-dashboard-card dev-card p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm relative overflow-hidden">
        
        {/* Top Control Bar: Disclaimers & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E7EB] gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
              <h3 className="font-bold text-lg text-[#111111]">
                Sample Telemetry & Analytics Engine
              </h3>
            </div>
            <span className="text-xs font-mono text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded border border-[#0284C7]/20 mt-1.5 inline-block">
              [Demo / Sample Data Simulation]
            </span>
          </div>

          {/* Metric Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
            {[
              { id: 'revenue', label: 'Revenue', icon: <DollarSign className="w-3.5 h-3.5" /> },
              { id: 'users', label: 'Users', icon: <Users className="w-3.5 h-3.5" /> },
              { id: 'growth', label: 'Growth', icon: <TrendingUp className="w-3.5 h-3.5" /> },
              { id: 'performance', label: 'Latency', icon: <Activity className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0284C7] text-white font-semibold shadow-sm'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Simulated KPI Metric Cards */}
        <div className="kpi-metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ANALYTICS_METRICS.map((metric, i) => (
            <div
              key={i}
              className="kpi-metric-card p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#777777]">
                <span>{metric.title}</span>
                <span className={`text-[11px] font-bold ${metric.positive ? 'text-[#16A34A]' : 'text-[#0284C7]'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                {metric.value}
              </div>
              <div className="text-[10px] font-mono text-[#777777] pt-0.5">
                {metric.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Simulated Chart: Interactive Bars */}
        <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#555555]">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Simulated Monthly Trends ({activeTab.toUpperCase()})</span>
            </span>
            <span>Normalized Index: 0–100</span>
          </div>

          {/* Bar Chart Presentation */}
          <div className="chart-bars-container h-44 sm:h-52 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2 border-b border-[#E5E7EB]">
            {currentChart.map((bar, bi) => {
              const heightPct = Math.round((bar.val / maxVal) * 100);
              return (
                <div key={bi} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-[#0284C7] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.full}
                  </span>
                  <div
                    className="chart-bar-element w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-[#0284C7]/30 to-[#0284C7] group-hover:from-[#0284C7]/50 group-hover:to-[#0369A1] transition-colors duration-200"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[11px] font-mono text-[#555555] mt-1">
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] pt-1">
            <span>Query pipeline: SQL aggregate &gt; Pandas DataFrame &gt; Normalized View</span>
            <span className="text-[#0284C7] font-medium">Demonstration Interface</span>
          </div>
        </div>

      </div>

    </section>
  );
};
