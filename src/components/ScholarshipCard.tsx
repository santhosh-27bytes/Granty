import React from 'react';
import { 
  Building2, 
  Calendar, 
  Bookmark, 
  ArrowRight, 
  CheckSquare, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Scholarship } from '../types';
import { useGrantly } from '../context/GrantlyContext';
import { calculateScholarshipMatch } from '../utils/matching';
import { getDaysRemaining } from '../utils/formatters';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const { 
    profile, 
    toggleSaveScholarship, 
    isScholarshipSaved, 
    addToTracker, 
    isScholarshipTracked, 
    openScholarshipDetails 
  } = useGrantly();

  const isSaved = isScholarshipSaved(scholarship.id);
  const isTracked = isScholarshipTracked(scholarship.id);
  const match = calculateScholarshipMatch(scholarship, profile);
  const deadlineInfo = getDaysRemaining(scholarship.deadline);

  // Status badge helper
  const getStatusBadge = () => {
    switch (scholarship.status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Applications Open
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Clock className="w-3 h-3" />
            Opening Soon
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group shadow-2xs">
      
      {/* Top Meta: Provider, Status & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {getStatusBadge()}
            
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {scholarship.governmentLevel === 'central' ? 'Central Scheme' : `${scholarship.state} State`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleSaveScholarship(scholarship.id)}
            title={isSaved ? 'Remove from saved' : 'Save scholarship'}
            className={`p-2 rounded-xl transition min-w-[36px] min-h-[36px] flex items-center justify-center ${
              isSaved
                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark scholarship'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 
          onClick={() => openScholarshipDetails(scholarship)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {scholarship.title}
        </h3>

        {/* Provider subtitle */}
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 truncate">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{scholarship.provider}</span>
        </p>

        {/* Fast Scannable Key Information Grid */}
        <div className="mt-4 p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              Award Amount
            </span>
            <span className="font-extrabold text-blue-900 text-sm sm:text-base">
              {scholarship.awardAmount}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              Deadline
            </span>
            <span className={`font-bold text-xs sm:text-sm ${
              deadlineInfo.isUrgent ? 'text-rose-600 font-extrabold flex items-center gap-1' : 'text-slate-800'
            }`}>
              {deadlineInfo.isUrgent && <Clock className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0" />}
              <span>{deadlineInfo.label}</span>
            </span>
          </div>
        </div>

        {/* Profile Match Scannable Callout */}
        <div className="mt-3.5 flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-1.5 text-slate-600 truncate mr-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate text-[11px] font-medium text-slate-600">
              {match.reasons[0] || 'Matches your education level'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{match.matchPercentage}% Match</span>
          </span>
        </div>
      </div>

      {/* Action Footer with touch-friendly 44px buttons */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2.5">
        {isTracked ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-2 rounded-xl border border-blue-200">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span>In Tracker</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => addToTracker(scholarship, 'interested')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2.5 min-h-[42px] rounded-xl border border-slate-200 hover:bg-slate-100/70 transition flex items-center gap-1.5"
          >
            <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Track</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => openScholarshipDetails(scholarship)}
          className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 min-h-[42px] rounded-xl transition-all shadow-xs hover:shadow flex items-center gap-1.5 group/btn"
        >
          <span>View & Apply</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
