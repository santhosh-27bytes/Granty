import React, { useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  X, 
  RotateCcw,
  User,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGrantly } from '../context/GrantlyContext';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { INDIAN_STATES, EDUCATION_LEVEL_LABELS, FIELD_OPTIONS } from '../data/scholarships';
import { calculateScholarshipMatch, calculateProfileCompletion } from '../utils/matching';
import { EducationLevel } from '../types';

export const DiscoverPage: React.FC = () => {
  const { 
    scholarships, 
    profile, 
    filters, 
    updateFilter, 
    resetFilters
  } = useGrantly();

  const completion = calculateProfileCompletion(profile);

  // Filter & Sort Logic
  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter((s) => {
        // 1. Search Query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = s.title.toLowerCase().includes(q);
          const matchProvider = s.provider.toLowerCase().includes(q);
          const matchTags = s.tags.some(t => t.toLowerCase().includes(q));
          const matchState = s.state ? s.state.toLowerCase().includes(q) : false;
          if (!matchTitle && !matchProvider && !matchTags && !matchState) return false;
        }

        // 2. Government Level Filter
        if (filters.governmentLevel !== 'all') {
          if (s.governmentLevel !== filters.governmentLevel) return false;
        }

        // 3. State Filter (applies if state scheme or user filtered state)
        if (filters.governmentLevel === 'state' && filters.selectedState && filters.selectedState !== 'All India') {
          if (s.state !== filters.selectedState) return false;
        }

        // 4. Education Level Filter
        if (filters.educationLevel !== 'all') {
          const hasEdu = s.educationLevels.includes('all') || s.educationLevels.includes(filters.educationLevel);
          if (!hasEdu) return false;
        }

        // 5. Field of Study
        if (filters.fieldOfStudy !== 'Any / All Streams') {
          const hasField = s.fieldsOfStudy.includes('Any / All Streams') || s.fieldsOfStudy.includes(filters.fieldOfStudy);
          if (!hasField) return false;
        }

        // 6. Status
        if (filters.status !== 'all') {
          if (s.status !== filters.status) return false;
        }

        // 7. Amount
        if (filters.minAmount > 0) {
          if (s.awardValueNumber < filters.minAmount) return false;
        }

        // 8. Category
        if (filters.category !== 'all') {
          if (s.eligibilityRules.allowedCategories && s.eligibilityRules.allowedCategories.length > 0) {
            if (!s.eligibilityRules.allowedCategories.includes(filters.category as any)) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'match_score') {
          const matchA = calculateScholarshipMatch(a, profile).matchPercentage;
          const matchB = calculateScholarshipMatch(b, profile).matchPercentage;
          return matchB - matchA;
        }
        if (filters.sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (filters.sortBy === 'amount_desc') {
          return b.awardValueNumber - a.awardValueNumber;
        }
        if (filters.sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [scholarships, profile, filters]);

  const hasActiveFilters = 
    filters.searchQuery !== '' || 
    filters.governmentLevel !== 'all' || 
    filters.educationLevel !== 'all' || 
    filters.fieldOfStudy !== 'Any / All Streams' || 
    filters.status !== 'all' || 
    filters.minAmount > 0 || 
    filters.category !== 'all';

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-blue-800/40">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-3.5 py-1 rounded-full text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Empowering 2026-2027 Academic Scholars
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Government Scholarships <br className="hidden sm:inline" />
            Tailored to Your Ambition
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Filter Central and State Government education funding schemes, understand verified eligibility rules, and track applications on official portals in one unified workspace.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                placeholder="Search by scholarship title, ministry, stream (e.g. AICTE, NSP, B.Tech, Girl)..."
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 text-sm shadow-xl placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 border border-white/20"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => updateFilter('searchQuery', '')}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Discover Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Profile Completion Callout Banner if needed */}
        {completion.percentage < 80 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Your profile is {completion.percentage}% complete
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  Add details like your family income slab and category to unlock instant verification for reservation and means-tested grants.
                </p>
              </div>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <span>Complete Profile Details</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </Link>
          </div>
        )}

        {/* Filter Controls Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
          {/* Top Row: Government Scope & State Selector */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            {/* Government Level Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                Scope:
              </span>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => updateFilter('governmentLevel', 'all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    filters.governmentLevel === 'all'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Schemes ({scholarships.length})
                </button>
                <button
                  onClick={() => updateFilter('governmentLevel', 'central')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    filters.governmentLevel === 'central'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Central Govt
                </button>
                <button
                  onClick={() => updateFilter('governmentLevel', 'state')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    filters.governmentLevel === 'state'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  State Govt
                </button>
              </div>
            </div>

            {/* State Dropdown (when relevant) */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                State:
              </label>
              <select
                value={filters.selectedState}
                onChange={(e) => updateFilter('selectedState', e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Education Level */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Education Level
              </label>
              <select
                value={filters.educationLevel}
                onChange={(e) => updateFilter('educationLevel', e.target.value as EducationLevel)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(EDUCATION_LEVEL_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>{label}</option>
                ))}
              </select>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Field of Study
              </label>
              <select
                value={filters.fieldOfStudy}
                onChange={(e) => updateFilter('fieldOfStudy', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {FIELD_OPTIONS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Application Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilter('status', e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses (Open, Upcoming, Closed)</option>
                <option value="open">🟢 Applications Open Now</option>
                <option value="upcoming">🟡 Upcoming Next Quarter</option>
                <option value="closed">⚪ Closed</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-blue-600" />
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="match_score">Highest Profile Match %</option>
                <option value="deadline">Deadline Approaching Soonest</option>
                <option value="amount_desc">Highest Award Amount</option>
                <option value="alphabetical">Title (A to Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Bar & Results Count */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">
                Showing {filteredScholarships.length} of {scholarships.length} opportunities
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 ml-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset all filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span>Matching against:</span>
              <span className="font-semibold text-slate-800">
                {profile.name} ({profile.stateOfResidence || 'All India'}, {EDUCATION_LEVEL_LABELS[profile.educationLevel] || 'UG'})
              </span>
            </div>
          </div>
        </div>

        {/* Scholarship Listings Grid */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching scholarships found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your filter criteria or switching from a specific state to "All Schemes".
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
