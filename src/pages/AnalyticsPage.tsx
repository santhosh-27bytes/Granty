import React from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useGrantly } from '../context/GrantlyContext';
import { formatCurrencyINR } from '../utils/formatters';

const STAGE_COLORS: Record<string, string> = {
  interested: '#3b82f6',
  preparing_documents: '#f59e0b',
  submitted: '#6366f1',
  awaiting_decision: '#a855f7',
  awarded: '#10b981',
  not_selected: '#94a3b8'
};

const STAGE_LABELS: Record<string, string> = {
  interested: 'Interested',
  preparing_documents: 'Preparing Docs',
  submitted: 'Submitted',
  awaiting_decision: 'Awaiting Decision',
  awarded: 'Awarded',
  not_selected: 'Not Selected'
};

export const AnalyticsPage: React.FC = () => {
  const { trackedApplications, scholarships, profile } = useGrantly();

  // 1. Pipeline stages distribution data for Pie Chart
  const stageCounts: Record<string, number> = {
    interested: 0,
    preparing_documents: 0,
    submitted: 0,
    awaiting_decision: 0,
    awarded: 0,
    not_selected: 0
  };

  trackedApplications.forEach(t => {
    stageCounts[t.stage] = (stageCounts[t.stage] || 0) + 1;
  });

  const pieData = Object.entries(stageCounts)
    .filter(([_, count]) => count > 0)
    .map(([stage, count]) => ({
      name: STAGE_LABELS[stage] || stage,
      value: count,
      color: STAGE_COLORS[stage] || '#3b82f6'
    }));

  // Fallback demo data if tracker is empty
  const displayPieData = pieData.length > 0 ? pieData : [
    { name: 'Interested', value: 2, color: STAGE_COLORS.interested },
    { name: 'Preparing Docs', value: 1, color: STAGE_COLORS.preparing_documents },
    { name: 'Submitted', value: 1, color: STAGE_COLORS.submitted }
  ];

  // 2. Central vs State Scheme availability & tracked data
  const centralCount = scholarships.filter(s => s.governmentLevel === 'central').length;
  const stateCount = scholarships.filter(s => s.governmentLevel === 'state').length;

  const govLevelData = [
    {
      category: 'Available in Grantly',
      Central: centralCount,
      State: stateCount
    },
    {
      category: 'In Your Pipeline',
      Central: trackedApplications.filter(t => t.governmentLevel === 'central').length,
      State: trackedApplications.filter(t => t.governmentLevel === 'state').length
    }
  ];

  // 3. Financial Potential by Stage (Bar Chart)
  const financialByStage = [
    {
      stage: 'Interested',
      amount: trackedApplications.filter(t => t.stage === 'interested').reduce((sum, t) => sum + (t.awardValueNumber || 0), 0)
    },
    {
      stage: 'Preparing Docs',
      amount: trackedApplications.filter(t => t.stage === 'preparing_documents').reduce((sum, t) => sum + (t.awardValueNumber || 0), 0)
    },
    {
      stage: 'Submitted',
      amount: trackedApplications.filter(t => t.stage === 'submitted').reduce((sum, t) => sum + (t.awardValueNumber || 0), 0)
    },
    {
      stage: 'Under Review',
      amount: trackedApplications.filter(t => t.stage === 'awaiting_decision').reduce((sum, t) => sum + (t.awardValueNumber || 0), 0)
    },
    {
      stage: 'Awarded',
      amount: trackedApplications.filter(t => t.stage === 'awarded').reduce((sum, t) => sum + (t.awardValueNumber || 0), 0)
    }
  ];

  const totalTrackedValue = trackedApplications.reduce((sum, t) => sum + (t.awardValueNumber || 0), 0);
  const totalAwardedValue = trackedApplications.filter(t => t.stage === 'awarded').reduce((sum, t) => sum + (t.awardValueNumber || 0), 0);

  // 4. Document readiness score across all tracked applications
  const totalDocsRequired = trackedApplications.reduce((sum, t) => sum + t.totalDocuments.length, 0);
  const totalDocsReady = trackedApplications.reduce((sum, t) => sum + t.documentsReady.length, 0);
  const docReadinessPercentage = totalDocsRequired > 0 ? Math.round((totalDocsReady / totalDocsRequired) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Application Analytics & Funding Summary
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Visual metrics tracking your application velocity, government scheme distribution, and potential award value.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Pipeline Value
          </span>
          <div className="text-2xl font-black text-slate-900">
            {formatCurrencyINR(totalTrackedValue)}
          </div>
          <p className="text-[11px] text-blue-600 font-semibold">
            Across {trackedApplications.length} tracked schemes
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Confirmed Awards
          </span>
          <div className="text-2xl font-black text-emerald-600">
            {formatCurrencyINR(totalAwardedValue)}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            {trackedApplications.filter(t => t.stage === 'awarded').length} scholarships secured
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Overall Document Readiness
          </span>
          <div className="text-2xl font-black text-indigo-700">
            {docReadinessPercentage}%
          </div>
          <p className="text-[11px] text-indigo-600 font-semibold">
            {totalDocsReady} of {totalDocsRequired} required documents prepared
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Government Coverage
          </span>
          <div className="text-2xl font-black text-purple-700">
            {profile.discoveryPreference === 'both' ? 'Central & State' : profile.discoveryPreference.toUpperCase()}
          </div>
          <p className="text-[11px] text-purple-600 font-semibold">
            Targeting {profile.stateOfResidence || 'All India'}
          </p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Pipeline Breakdown (Pie / Donut) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-blue-600" />
              Applications by Stage
            </h3>
            <span className="text-xs text-slate-500 font-medium">Pipeline Status</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {displayPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Count']} 
                  contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Central vs State Government Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Central vs State Government Distribution
            </h3>
            <span className="text-xs text-slate-500 font-medium">Scheme Breakdown</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={govLevelData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: any) => [`${val} Schemes`, '']}
                  contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
                />
                <Bar dataKey="Central" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="State" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Financial Value by Stage */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Potential Grant Support by Pipeline Stage (₹ INR)
            </h3>
            <span className="text-xs text-slate-500 font-medium">Funding Progression</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialByStage} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <XAxis dataKey="stage" tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis 
                  tick={{ fontSize: 11 }} 
                  tickFormatter={(val) => `₹${val >= 100000 ? `${val / 100000}L` : `${val / 1000}k`}`}
                />
                <Tooltip 
                  formatter={(val: any) => [formatCurrencyINR(val), 'Value']}
                  contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Helpful Action Checklist */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Scholar Guidance: 3 Actions to Maximize Government Acceptance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-2xl space-y-1.5 border border-white/10">
            <span className="font-bold text-amber-300 block">1. Aadhaar-NPCI Bank Seeding</span>
            <p className="text-slate-300 leading-relaxed">
              Verify with your bank that your savings account is active on the NPCI mapper for Direct Benefit Transfer (DBT).
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl space-y-1.5 border border-white/10">
            <span className="font-bold text-amber-300 block">2. Income Certificate Renewal</span>
            <p className="text-slate-300 leading-relaxed">
              Most state schemes require revenue income certificates issued within the current financial year.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl space-y-1.5 border border-white/10">
            <span className="font-bold text-amber-300 block">3. Institute Nodal Verification</span>
            <p className="text-slate-300 leading-relaxed">
              Immediately inform your college scholarship office after submitting online on NSP or State portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
