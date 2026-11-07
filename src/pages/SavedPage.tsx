import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Calendar, 
  ArrowRight, 
  CheckSquare, 
  Sparkles, 
  Bell, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { getDaysRemaining } from '../utils/formatters';
import { Link } from 'react-router-dom';

export const SavedPage: React.FC = () => {
  const { 
    scholarships, 
    savedScholarshipIds, 
    toggleSaveScholarship, 
    addToTracker, 
    isScholarshipTracked, 
    openScholarshipDetails,
    setIsNotificationSettingsOpen
  } = useGrantly();

  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'upcoming' | 'closed'>('all');

  const savedScholarships = scholarships.filter(s => savedScholarshipIds.includes(s.id));
  const filteredSaved = savedScholarships.filter(s => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Bookmark className="w-5 h-5 fill-amber-700" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Saved Scholarships
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of bookmarks and set proactive deadline reminders before government windows close.
          </p>
        </div>

        {/* Action: Alert Preferences */}
        <button
          onClick={() => setIsNotificationSettingsOpen(true)}
          className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
        >
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Notification & Email Alerts</span>
        </button>
      </div>

      {/* Filter Tabs */}
      {savedScholarships.length > 0 && (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
          <span className="text-slate-500 font-semibold mr-1">Filter:</span>
          {(['all', 'open', 'upcoming', 'closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-bold transition capitalize ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? `All (${savedScholarships.length})` : st}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {savedScholarships.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No saved scholarships yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            When browsing Central and State government schemes, tap the bookmark icon on any opportunity to save it here for quick review.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
          >
            <span>Browse Discovery Feed</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSaved.map((scholarship) => {
            const isTracked = isScholarshipTracked(scholarship.id);
            const deadline = getDaysRemaining(scholarship.deadline);

            return (
              <div 
                key={scholarship.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-2xs hover:shadow-lg transition space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {scholarship.governmentLevel === 'central' ? 'Central Scheme' : `${scholarship.state} State`}
                    </span>
                    <button
                      onClick={() => toggleSaveScholarship(scholarship.id)}
                      title="Remove bookmark"
                      className="text-amber-500 hover:text-slate-400 transition p-1"
                    >
                      <Bookmark className="w-4 h-4 fill-amber-500" />
                    </button>
                  </div>

                  <h3 
                    onClick={() => openScholarshipDetails(scholarship)}
                    className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition line-clamp-2 leading-snug"
                  >
                    {scholarship.title}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 line-clamp-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{scholarship.provider}</span>
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Award</span>
                      <span className="font-extrabold text-blue-900">{scholarship.awardAmount}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Deadline</span>
                      <span className={`font-bold ${deadline.isUrgent ? 'text-rose-600 font-extrabold' : 'text-slate-700'}`}>
                        {deadline.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {isTracked ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
                      In Tracker
                    </span>
                  ) : (
                    <button
                      onClick={() => addToTracker(scholarship, 'preparing_documents')}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                      Track
                    </button>
                  )}

                  <button
                    onClick={() => openScholarshipDetails(scholarship)}
                    className="px-3.5 py-1.5 min-h-[38px] text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1 shadow-xs"
                  >
                    <span>View & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
