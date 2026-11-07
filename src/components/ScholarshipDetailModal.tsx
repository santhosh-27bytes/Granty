import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  CheckSquare, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ListOrdered, 
  Award, 
  Clock, 
  Building2, 
  MapPin, 
  Sparkles,
  Info,
  Check,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { calculateScholarshipMatch } from '../utils/matching';
import { formatDateReadable, getDaysRemaining } from '../utils/formatters';
import { TrackingStage } from '../types';

export const ScholarshipDetailModal: React.FC = () => {
  const { 
    selectedScholarship, 
    closeScholarshipDetails,
    profile,
    toggleSaveScholarship,
    isScholarshipSaved,
    addToTracker,
    isScholarshipTracked,
    trackedApplications,
    toggleDocumentReady
  } = useGrantly();

  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'steps'>('overview');
  const [selectedInitialStage, setSelectedInitialStage] = useState<TrackingStage>('preparing_documents');

  if (!selectedScholarship) return null;

  const isSaved = isScholarshipSaved(selectedScholarship.id);
  const isTracked = isScholarshipTracked(selectedScholarship.id);
  const existingTrack = trackedApplications.find(t => t.scholarshipId === selectedScholarship.id);
  const match = calculateScholarshipMatch(selectedScholarship, profile);
  const deadlineInfo = getDaysRemaining(selectedScholarship.deadline);

  const handleAddToTracker = () => {
    addToTracker(selectedScholarship, selectedInitialStage);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scholarship-detail-title"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedScholarship.governmentLevel === 'central' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Central Government Scheme
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    {selectedScholarship.state} State Government
                  </span>
                )}

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {match.matchPercentage}% Profile Match
                </span>
              </div>

              {/* Title */}
              <h2 id="scholarship-detail-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedScholarship.title}
              </h2>

              {/* Provider */}
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{selectedScholarship.provider}</span>
              </p>
            </div>

            {/* Actions: Save & Close */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => toggleSaveScholarship(selectedScholarship.id)}
                title={isSaved ? 'Remove from saved' : 'Save scholarship'}
                className={`p-2 rounded-lg border transition ${
                  isSaved
                    ? 'border-amber-300 bg-amber-50 text-amber-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
              </button>

              <button
                type="button"
                onClick={closeScholarshipDetails}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Key Facts Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Grant Support</span>
              <span className="font-bold text-slate-900 text-sm">{selectedScholarship.awardAmount}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Deadline</span>
              <span className={`font-semibold text-sm ${deadlineInfo.isUrgent ? 'text-rose-600' : 'text-slate-900'}`}>
                {deadlineInfo.label}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Official Portal</span>
              <span className="font-semibold text-slate-800 truncate block">{selectedScholarship.officialPortalName}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Last Verified</span>
              <span className="font-semibold text-slate-700">{formatDateReadable(selectedScholarship.lastCheckedDate)}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 shrink-0 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Benefits', icon: Award },
            { id: 'eligibility', label: 'Eligibility Checklist', icon: CheckCircle2 },
            { id: 'documents', label: 'Required Documents', icon: FileText },
            { id: 'steps', label: 'Application Steps', icon: ListOrdered }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap min-h-[44px] ${
                  isActive
                    ? 'border-blue-600 text-blue-700 bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: OVERVIEW & BENEFITS */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  About this Scheme
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {selectedScholarship.description}
                </p>
              </div>

              {/* Benefits Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Financial Support Breakdown
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedScholarship.benefits.tuitionFee && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block mb-0.5">Tuition Support</span>
                      <span className="text-slate-600">{selectedScholarship.benefits.tuitionFee}</span>
                    </div>
                  )}

                  {selectedScholarship.benefits.maintenanceAllowance && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block mb-0.5">Living / Maintenance Allowance</span>
                      <span className="text-slate-600">{selectedScholarship.benefits.maintenanceAllowance}</span>
                    </div>
                  )}

                  {selectedScholarship.benefits.bookGrant && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block mb-0.5">Book & Equipment Grant</span>
                      <span className="text-slate-600">{selectedScholarship.benefits.bookGrant}</span>
                    </div>
                  )}

                  {selectedScholarship.benefits.specialGrant && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block mb-0.5">Special / Contingency Grant</span>
                      <span className="text-slate-600">{selectedScholarship.benefits.specialGrant}</span>
                    </div>
                  )}

                  {selectedScholarship.benefits.other && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                      <span className="font-semibold text-slate-900 block mb-0.5">Payment Method & Disbursal</span>
                      <span className="text-slate-600">{selectedScholarship.benefits.other}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Categories & Keywords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScholarship.tags.map(t => (
                    <span key={t} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY CHECKLIST */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Your Eligibility Match Score</div>
                  <div className="text-[11px] text-slate-600">Calculated against {profile.name}'s profile</div>
                </div>
                <span className="text-sm font-extrabold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                  {match.matchPercentage}% Matched
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Domicile Check */}
                <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-semibold text-slate-900">State / Domicile Criterion</div>
                    <p className="text-slate-600">
                      {selectedScholarship.governmentLevel === 'central'
                        ? 'Open across all Indian States and Union Territories.'
                        : `Applicant must be resident / studying in ${selectedScholarship.state}.`}
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Your location: {profile.stateOfResidence || 'All India'} (Eligible)</span>
                    </div>
                  </div>
                </div>

                {/* Level & Field Check */}
                <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="font-semibold text-slate-900">Education Level & Field of Study</div>
                    <p className="text-slate-600">
                      Levels: {selectedScholarship.educationLevels.join(', ')} • Fields: {selectedScholarship.fieldsOfStudy.join(', ')}
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Your course: {profile.educationLevel} ({profile.fieldOfStudy})</span>
                    </div>
                  </div>
                </div>

                {/* Income Check */}
                {selectedScholarship.eligibilityRules.maxAnnualIncome && (
                  <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                      <Info className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="font-semibold text-slate-900">Annual Family Income Ceiling</div>
                      <p className="text-slate-600">
                        Must not exceed ₹{(selectedScholarship.eligibilityRules.maxAnnualIncome / 100000).toFixed(1)} Lakhs per annum.
                      </p>
                      {profile.annualFamilyIncome ? (
                        <div className={`text-[11px] font-semibold flex items-center gap-1 ${
                          profile.annualFamilyIncome <= selectedScholarship.eligibilityRules.maxAnnualIncome ? 'text-emerald-700' : 'text-rose-600'
                        }`}>
                          {profile.annualFamilyIncome <= selectedScholarship.eligibilityRules.maxAnnualIncome ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Your Income: ₹{(profile.annualFamilyIncome / 100000).toFixed(1)} Lakhs (Satisfied)</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Exceeds limit (Your profile: ₹{(profile.annualFamilyIncome / 100000).toFixed(1)}L)</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] font-semibold text-slate-500">
                          Income not specified in profile
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Special Conditions */}
                {selectedScholarship.eligibilityRules.specialCondition && (
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="font-semibold text-slate-900">Special Scheme Requirement</div>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedScholarship.eligibilityRules.specialCondition}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
                Prepare clear PDF scans (under 200KB) of each required document before applying on the official portal.
              </div>

              <div className="space-y-2">
                {selectedScholarship.requiredDocuments.map((doc, idx) => {
                  const isReady = existingTrack?.documentsReady.includes(doc);
                  return (
                    <div 
                      key={idx}
                      onClick={() => existingTrack && toggleDocumentReady(existingTrack.id, doc)}
                      className={`p-3 rounded-xl border transition flex items-center justify-between ${
                        isReady 
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                      } ${existingTrack ? 'cursor-pointer' : ''}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                          isReady ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-400'
                        }`}>
                          {isReady ? '✓' : idx + 1}
                        </div>
                        <span className="font-medium">{doc}</span>
                      </div>

                      {existingTrack && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          {isReady ? 'Ready' : 'Click to tick'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {!existingTrack && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleAddToTracker}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    + Add to Application Tracker to track your documents checklist
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: APPLICATION PROCESS */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <p className="text-slate-500 text-[11px]">
                Follow these official sequential stages to ensure approval by institute and nodal authorities:
              </p>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                {selectedScholarship.applicationSteps.map((step) => (
                  <div key={step.stepNumber} className="relative space-y-1">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {step.stepNumber}
                    </span>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900">{step.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Toolbar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tracker status or Add Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isTracked ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tracking in Pipeline</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleAddToTracker}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
              >
                + Add to Tracker
              </button>
            )}
          </div>

          {/* Apply Official Portal Links */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={selectedScholarship.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 min-h-[42px] rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition flex items-center justify-center"
            >
              Official Guidelines
            </a>

            <a
              href={selectedScholarship.officialApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 min-h-[42px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
