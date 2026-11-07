import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  Search, 
  RotateCcw, 
  X, 
  ShieldCheck, 
  MapPin, 
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { INDIAN_STATES, EDUCATION_LEVEL_LABELS } from '../data/scholarships';
import { doesScholarshipMatchCategory } from '../data/categories';
import { EducationLevel } from '../types';
import { calculateScholarshipMatch } from '../utils/matching';

export const ScholarshipsListPage: React.FC = () => {
  const { levelId, categoryId } = useParams<{ levelId: string; categoryId: string }>();
  const { 
    scholarships, 
    profile, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useGrantly();

  const currentLevelId = (levelId || 'undergraduate') as EducationLevel | 'all';
  const currentCategory = categoryId ? decodeURIComponent(categoryId) : 'Any / All Streams';
  const levelTitle = EDUCATION_LEVEL_LABELS[currentLevelId] || 'All Education Levels';

  // Filter scholarships strictly for this level and category + filter bar
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      // 1. Level match
      if (currentLevelId !== 'all') {
        const matchesLevel = s.educationLevels.includes('all') || s.educationLevels.includes(currentLevelId);
        if (!matchesLevel) return false;
      }

      // 2. Category match
      if (currentCategory !== 'Any / All Streams') {
        const matchesCat = doesScholarshipMatchCategory(s, currentLevelId, currentCategory);
        if (!matchesCat) return false;
      }

      // 3. Search input
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const inTitle = s.title.toLowerCase().includes(q);
        const inProvider = s.provider.toLowerCase().includes(q);
        const inTags = s.tags.some(t => t.toLowerCase().includes(q));
        const inState = s.state ? s.state.toLowerCase().includes(q) : false;
        if (!inTitle && !inProvider && !inTags && !inState) return false;
      }

      // 4. Government Scope
      if (filters.governmentLevel !== 'all') {
        if (s.governmentLevel !== filters.governmentLevel) return false;
      }

      // 5. State filter
      if (filters.governmentLevel === 'state' && filters.selectedState && filters.selectedState !== 'All India') {
        if (s.state !== filters.selectedState) return false;
      }

      // 6. Application status
      if (filters.status !== 'all') {
        if (s.status !== filters.status) return false;
      }

      // 7. Social category
      if (filters.category !== 'all') {
        if (s.eligibilityRules.allowedCategories && s.eligibilityRules.allowedCategories.length > 0) {
          if (!s.eligibilityRules.allowedCategories.includes(filters.category as any)) return false;
        }
      }

      return true;
    }).sort((a, b) => {
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
      return a.title.localeCompare(b.title);
    });
  }, [scholarships, profile, currentLevelId, currentCategory, filters]);

  const hasActiveFilters = 
    filters.searchQuery !== '' || 
    filters.governmentLevel !== 'all' || 
    filters.status !== 'all' || 
    filters.category !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5" />
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/categories/${currentLevelId}`} className="hover:text-blue-600 transition">
          {levelTitle}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-700 font-bold">{currentCategory}</span>
      </div>

      {/* Top Header with Context & Back Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Step 3 of 3: Verified Scholarships</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentCategory === 'Any / All Streams' ? 'General Scholarships' : currentCategory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Showing opportunities for <strong className="text-slate-800">{levelTitle}</strong> • Verified official requirements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/categories/${currentLevelId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition shadow-2xs min-h-[42px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Category</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition shadow-2xs min-h-[42px]"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Change Level</span>
          </Link>
        </div>
      </div>

      {/* STICKY HEADER FILTER OPTIONS BAR */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              placeholder="Search in this category..."
              className="w-full pl-9 pr-8 py-2.5 min-h-[42px] text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Government Level Toggle */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 min-h-[42px] items-center">
              <button
                type="button"
                onClick={() => updateFilter('governmentLevel', 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filters.governmentLevel === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Schemes
              </button>
              <button
                type="button"
                onClick={() => updateFilter('governmentLevel', 'central')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filters.governmentLevel === 'central'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Central
              </button>
              <button
                type="button"
                onClick={() => updateFilter('governmentLevel', 'state')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filters.governmentLevel === 'state'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                State
              </button>
            </div>

            {/* State Select */}
            <select
              value={filters.selectedState}
              onChange={(e) => updateFilter('selectedState', e.target.value)}
              className="px-3 py-2.5 min-h-[42px] text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* Status Select */}
            <select
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value as any)}
              className="px-3 py-2.5 min-h-[42px] text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Status: All</option>
              <option value="open">Open Applications</option>
              <option value="upcoming">Opening Soon</option>
              <option value="closed">Closed</option>
            </select>

            {/* Category Select */}
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="px-3 py-2.5 min-h-[42px] text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Reservation: All</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
              <option value="Minority">Minority</option>
            </select>

            {/* Sort Select */}
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as any)}
              className="px-3 py-2.5 min-h-[42px] text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="match_score">Highest Match</option>
              <option value="deadline">Approaching Deadline</option>
              <option value="amount_desc">Highest Award</option>
              <option value="alphabetical">Title (A-Z)</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 ml-1 px-2 py-2 min-h-[42px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Feedback */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Found <strong className="text-slate-900 font-bold">{filteredScholarships.length}</strong> matching scholarship schemes
        </div>
        <div className="text-[11px] text-slate-400">
          Targeting: {profile.name} ({profile.stateOfResidence || 'All India'})
        </div>
      </div>

      {/* Grid of Scholarships */}
      {filteredScholarships.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <h4 className="text-sm font-bold text-slate-800">
            No scholarships found matching this exact filter combination
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your state, category, or application status filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      )}

    </div>
  );
};
