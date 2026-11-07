import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Clock, 
  FileText, 
  Send, 
  Award, 
  ExternalLink, 
  Sparkles, 
  Trash2, 
  Plus, 
  Search, 
  ShieldCheck, 
  Kanban,
  List,
  CheckCircle2,
  X,
  Check,
  ChevronRight,
  SlidersHorizontal,
  Calendar,
  Building2,
  FileCheck,
  Edit3
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { TrackingStage, TrackedApplication } from '../types';
import { formatCurrencyINR, getDaysRemaining, formatDateReadable } from '../utils/formatters';

const STAGES: { stage: TrackingStage; label: string; dotColor: string }[] = [
  { stage: 'interested', label: 'Interested', dotColor: 'bg-blue-500' },
  { stage: 'preparing_documents', label: 'Preparing Docs', dotColor: 'bg-amber-500' },
  { stage: 'submitted', label: 'Submitted', dotColor: 'bg-indigo-500' },
  { stage: 'awaiting_decision', label: 'Under Review', dotColor: 'bg-purple-500' },
  { stage: 'awarded', label: 'Decision', dotColor: 'bg-emerald-500' },
];

export const TrackerPage: React.FC = () => {
  const { 
    trackedApplications, 
    updateTrackedStage, 
    removeFromTracker, 
    openLiveLookupModal,
    updateTrackedApplication,
    toggleDocumentReady,
    openScholarshipDetails,
    scholarships
  } = useGrantly();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');

  // Selected application for the dedicated Management Drawer
  const [managingTrackId, setManagingTrackId] = useState<string | null>(null);
  const managingTrack = trackedApplications.find(t => t.id === managingTrackId) || null;

  // Edit fields for drawer
  const [notesInput, setNotesInput] = useState('');
  const [appIdInput, setAppIdInput] = useState('');

  const handleOpenManager = (track: TrackedApplication) => {
    setManagingTrackId(track.id);
    setNotesInput(track.notes || '');
    setAppIdInput(track.applicationIdNumber || '');
  };

  const handleSaveNotes = () => {
    if (managingTrackId) {
      updateTrackedApplication(managingTrackId, {
        notes: notesInput,
        applicationIdNumber: appIdInput
      });
    }
  };

  // Filtered applications
  const filteredTracks = useMemo(() => {
    return trackedApplications.filter(t => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.scholarshipTitle.toLowerCase().includes(q);
        const matchProvider = t.provider.toLowerCase().includes(q);
        const matchAppId = t.applicationIdNumber ? t.applicationIdNumber.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchProvider && !matchAppId) return false;
      }
      if (filterStage !== 'all' && t.stage !== filterStage) {
        if (filterStage === 'awarded' && t.stage === 'not_selected') return true;
        return false;
      }
      return true;
    });
  }, [trackedApplications, searchQuery, filterStage]);

  // Aggregate metrics
  const totalValue = trackedApplications.reduce((acc, t) => acc + (t.awardValueNumber || 0), 0);
  const submittedCount = trackedApplications.filter(t => ['submitted', 'awaiting_decision', 'awarded'].includes(t.stage)).length;
  const awardedCount = trackedApplications.filter(t => t.stage === 'awarded').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      
      {/* 1. TOP HEADER & METRICS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your scholarship submissions, document preparation, and official government portal decisions.
          </p>
        </div>

        {/* View Switcher & New Application */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>

          <Link
            to="/"
            className="px-3.5 py-2 min-h-[40px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Scholarship</span>
          </Link>
        </div>
      </div>

      {/* 2. REFINED SUMMARY METRICS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Pipeline
          </span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">
            {trackedApplications.length} Schemes
          </div>
          <span className="text-[11px] text-slate-500">Active applications</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Potential Value
          </span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">
            {formatCurrencyINR(totalValue)}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Estimated funding</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Portal Submissions
          </span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">
            {submittedCount} Completed
          </div>
          <span className="text-[11px] text-blue-700 font-medium">Submitted on portal</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Confirmed Awards
          </span>
          <div className="text-xl font-bold text-emerald-700 mt-0.5">
            {awardedCount} Awarded
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Sanctioned & disbursed</span>
        </div>
      </div>

      {/* 3. SEARCH & QUICK FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholarship title, provider, or Application ID..."
            className="w-full pl-8 pr-7 py-2 min-h-[40px] text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-400 font-medium hidden sm:inline">Stage:</span>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 min-h-[40px] text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Stages ({trackedApplications.length})</option>
            <option value="interested">Interested</option>
            <option value="preparing_documents">Preparing Documents</option>
            <option value="submitted">Submitted</option>
            <option value="awaiting_decision">Under Review</option>
            <option value="awarded">Awarded / Decision</option>
          </select>
        </div>
      </div>

      {/* 4. TRACKER CONTENT (BOARD OR TABLE) */}
      {trackedApplications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Your tracker is empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse verified Central and State Government scholarships and add eligible opportunities to your tracking pipeline.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[42px] rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-xs"
          >
            <span>Explore Scholarships</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : viewMode === 'kanban' ? (
        /* PROFESSIONAL KANBAN BOARD */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {STAGES.map((col) => {
            const columnItems = filteredTracks.filter(t => {
              if (col.stage === 'awarded') {
                return t.stage === 'awarded' || t.stage === 'not_selected';
              }
              return t.stage === col.stage;
            });

            return (
              <div 
                key={col.stage}
                className="bg-slate-100/70 rounded-xl p-3 border border-slate-200/90 flex flex-col space-y-3 min-h-[420px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span className="text-xs font-bold text-slate-800">{col.label}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {columnItems.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-2.5">
                  {columnItems.map((track) => {
                    const deadline = getDaysRemaining(track.deadline);
                    const originalSch = scholarships.find(s => s.id === track.scholarshipId);

                    return (
                      <div
                        key={track.id}
                        className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition space-y-2.5 group"
                      >
                        {/* Scope & Urgency */}
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-600">
                            {track.governmentLevel === 'central' ? 'Central Scheme' : `${track.state} State`}
                          </span>
                          <span className={`font-semibold ${deadline.isUrgent ? 'text-rose-600' : 'text-slate-500'}`}>
                            {deadline.label}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 
                          onClick={() => originalSch && openScholarshipDetails(originalSch)}
                          className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition cursor-pointer line-clamp-2 leading-snug"
                        >
                          {track.scholarshipTitle}
                        </h4>

                        {/* Award & Portal */}
                        <div className="text-xs">
                          <span className="font-bold text-slate-900">{track.awardAmount}</span>
                          <span className="text-slate-400 block text-[11px]">{track.portalName}</span>
                        </div>

                        {/* Badges: App ID, Docs, or Live Status */}
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                          {track.applicationIdNumber && (
                            <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium border border-slate-200">
                              {track.applicationIdNumber}
                            </span>
                          )}

                          {track.totalDocuments.length > 0 && (
                            <span className="bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                              {track.documentsReady.length}/{track.totalDocuments.length} docs ready
                            </span>
                          )}

                          {track.liveVerificationStatus && (
                            <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>

                        {/* Card Controls */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          {/* Stage Dropdown */}
                          <select
                            value={track.stage}
                            onChange={(e) => updateTrackedStage(track.id, e.target.value as TrackingStage)}
                            className="text-[11px] font-medium py-1 px-1.5 rounded border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none"
                          >
                            <option value="interested">Interested</option>
                            <option value="preparing_documents">Preparing</option>
                            <option value="submitted">Submitted</option>
                            <option value="awaiting_decision">Under Review</option>
                            <option value="awarded">Awarded 🎉</option>
                            <option value="not_selected">Not Selected</option>
                          </select>

                          {/* Manage Details Drawer Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenManager(track)}
                            className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold transition"
                          >
                            Manage →
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {columnItems.length === 0 && (
                    <div className="text-center py-8 text-[11px] text-slate-400">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* PROFESSIONAL HIGH-DENSITY TABLE VIEW */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Scheme & Provider</th>
                  <th className="py-3 px-4">Award Value</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Document Readiness</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTracks.map((track) => {
                  const originalSch = scholarships.find(s => s.id === track.scholarshipId);
                  return (
                    <tr key={track.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 max-w-sm">
                        <div 
                          onClick={() => originalSch && openScholarshipDetails(originalSch)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                        >
                          {track.scholarshipTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {track.provider.split(',')[0]} • {track.portalName}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {track.awardAmount}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={track.stage}
                          onChange={(e) => updateTrackedStage(track.id, e.target.value as TrackingStage)}
                          className="px-2 py-1 text-xs font-medium rounded border border-slate-200 bg-slate-50 text-slate-800"
                        >
                          <option value="interested">Interested</option>
                          <option value="preparing_documents">Preparing Documents</option>
                          <option value="submitted">Submitted</option>
                          <option value="awaiting_decision">Under Review</option>
                          <option value="awarded">Awarded 🎉</option>
                          <option value="not_selected">Not Selected</option>
                        </select>
                      </td>

                      <td className="py-3 px-4">
                        {track.applicationIdNumber ? (
                          <span className="font-mono text-[11px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                            {track.applicationIdNumber}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenManager(track)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            + Add ID
                          </button>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                        {track.documentsReady.length} of {track.totalDocuments.length} ready
                      </td>

                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenManager(track)}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        >
                          Manage
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromTracker(track.id)}
                          title="Delete from tracker"
                          className="p-1 text-slate-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. DEDICATED APPLICATION MANAGEMENT MODAL / DRAWER */}
      {managingTrack && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  {managingTrack.governmentLevel === 'central' ? 'Central Scheme' : `${managingTrack.state} State`} • {managingTrack.portalName}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {managingTrack.scholarshipTitle}
                </h3>
                <p className="text-xs text-slate-600">{managingTrack.awardAmount}</p>
              </div>

              <button
                type="button"
                onClick={() => setManagingTrackId(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
              
              {/* Application ID Section */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <label className="block text-xs font-semibold text-slate-800">
                  Official Portal Application ID / OTR Number
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={appIdInput}
                    onChange={(e) => setAppIdInput(e.target.value)}
                    placeholder="e.g. NSP2026-KA-883921"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 font-mono uppercase bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Official Live Status Verification */}
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Official Portal Scrutiny Status
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Query government portal gateway using your Application ID and verified credentials.
                    </p>
                  </div>

                  {managingTrack.supportsLiveLookup && (
                    <button
                      type="button"
                      onClick={() => openLiveLookupModal(managingTrack)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200 hover:bg-blue-100 transition whitespace-nowrap"
                    >
                      Check Live Status
                    </button>
                  )}
                </div>

                {managingTrack.liveVerificationStatus && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{managingTrack.liveVerificationStatus.currentOfficialStage}</span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      {managingTrack.liveVerificationStatus.remarks}
                    </p>
                  </div>
                )}
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-slate-600" />
                    Required Documents ({managingTrack.documentsReady.length} of {managingTrack.totalDocuments.length} ready)
                  </h4>
                </div>

                <div className="space-y-1.5">
                  {managingTrack.totalDocuments.map((doc, idx) => {
                    const isReady = managingTrack.documentsReady.includes(doc);
                    return (
                      <label
                        key={idx}
                        className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition ${
                          isReady ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isReady}
                            onChange={() => toggleDocumentReady(managingTrack.id, doc)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="font-medium text-[11px]">{doc}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {isReady ? 'Ready ✓' : 'Pending'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Personal Notes / Memo */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-800">
                  Personal Application Notes & Reminders
                </label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Visited Tahsildar office for income renewal on Oct 18..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <a
                href={managingTrack.officialTrackingUrl || 'https://scholarships.gov.in'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    removeFromTracker(managingTrack.id);
                    setManagingTrackId(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold transition"
                >
                  Remove from Tracker
                </button>
                <button
                  type="button"
                  onClick={() => setManagingTrackId(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
