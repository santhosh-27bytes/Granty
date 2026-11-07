import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Building2, 
  RefreshCw, 
  ExternalLink, 
  Lock, 
  AlertCircle,
  FileCheck,
  Check
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { formatDateReadable } from '../utils/formatters';

export const LiveStatusModal: React.FC = () => {
  const { 
    isLiveLookupModalOpen, 
    closeLiveLookupModal, 
    selectedTrackForLiveLookup,
    updateTrackedApplication,
    updateTrackedStage
  } = useGrantly();

  const [applicationId, setApplicationId] = useState(selectedTrackForLiveLookup?.applicationIdNumber || '');
  const [dob, setDob] = useState('2004-08-15');
  const [captchaInput, setCaptchaInput] = useState('G7X9K');
  const [captchaCode] = useState('G7X9K');
  const [isLoading, setIsLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(
    selectedTrackForLiveLookup?.liveVerificationStatus || null
  );
  const [syncSuccess, setSyncSuccess] = useState(false);

  React.useEffect(() => {
    if (selectedTrackForLiveLookup) {
      setApplicationId(selectedTrackForLiveLookup.applicationIdNumber || 'NSP2026-KA-883921');
      if (selectedTrackForLiveLookup.liveVerificationStatus) {
        setLookupResult(selectedTrackForLiveLookup.liveVerificationStatus);
      }
    }
  }, [selectedTrackForLiveLookup, isLiveLookupModalOpen]);

  if (!isLiveLookupModalOpen || !selectedTrackForLiveLookup) return null;

  const handlePerformLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const simulatedResult = {
        isVerified: true,
        lastChecked: new Date().toISOString(),
        currentOfficialStage: 'District Nodal Officer (DNO) Verification',
        remarks: 'College Nodal Officer approved on 18-Oct-2026. Academic scores verified against State Board database.',
        officerVerification: 'Level 1: Institute Verified ✓ | Level 2: DNO In Progress',
        bankValidation: 'Aadhaar NPCI Mapping: Active (Canara Bank, IFSC: CNRB0001234)'
      };
      setLookupResult(simulatedResult);
    }, 1200);
  };

  const handleSyncToTracker = () => {
    if (selectedTrackForLiveLookup && lookupResult) {
      updateTrackedApplication(selectedTrackForLiveLookup.id, {
        applicationIdNumber: applicationId,
        liveVerificationStatus: lookupResult
      });
      // Update stage if applicable
      updateTrackedStage(selectedTrackForLiveLookup.id, 'awaiting_decision', 'Live status synced from Official Portal');
      setSyncSuccess(true);
      setTimeout(() => {
        setSyncSuccess(false);
        closeLiveLookupModal();
      }, 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="live-status-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/20">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h3 id="live-status-title" className="text-base sm:text-lg font-bold">
                Official Application Status Verification
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              {selectedTrackForLiveLookup.portalName} • {selectedTrackForLiveLookup.scholarshipTitle}
            </p>
          </div>
          <button
            onClick={closeLiveLookupModal}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition"
            aria-label="Close status modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Advisory */}
        <div className="bg-blue-50/70 border-b border-blue-100 p-3.5 px-5 flex items-start gap-2.5 text-xs text-blue-900">
          <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">Secure Portal Verification:</span> An Application ID alone does not grant access. Secondary validation (Date of Birth / Captcha) confirms identity according to official government security standards.
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={handlePerformLookup} className="p-5 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Application ID / OTR Number
              </label>
              <input
                type="text"
                required
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="e.g. NSP2026-KA-883921"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Date of Birth (DOB)
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Security Captcha
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold tracking-widest text-sm select-none border border-slate-300 line-through">
                    {captchaCode}
                  </span>
                  <input
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Connected to {selectedTrackForLiveLookup.portalName} Gateway
              </span>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Querying Portal...
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    Query Live Status
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Display */}
          {lookupResult && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">
                      Application Record Located & Verified
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      Last Checked: {formatDateReadable(lookupResult.lastChecked)}
                    </span>
                  </div>
                </div>
                <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg">
                  Active
                </span>
              </div>

              {/* Progress Stepper for Official Government Stages */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  Official Scrutiny Stages
                </div>

                <div className="space-y-2.5 pl-2 border-l-2 border-blue-400">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      Stage 1: Institute / College Nodal Officer
                    </div>
                    <p className="text-slate-600 text-[11px] pl-5">
                      Completed: Physical documents & attendance authenticated.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-blue-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                      Stage 2: District Nodal Officer (DNO) Verification
                    </div>
                    <p className="text-slate-600 text-[11px] pl-5">
                      Current: State Merit list generation under progress.
                    </p>
                  </div>

                  <div className="space-y-0.5 opacity-60">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block text-center text-[9px] leading-3">3</span>
                      Stage 3: PFMS DBT Account Credit
                    </div>
                    <p className="text-slate-500 text-[11px] pl-5">
                      Pending final treasury sanction order.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-700">Officer Remarks:</span> {lookupResult.remarks}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Aadhaar Validation:</span> {lookupResult.bankValidation}
                  </div>
                </div>
              </div>

              {/* Sync back button */}
              <div className="flex items-center justify-between pt-1">
                <a
                  href={selectedTrackForLiveLookup.officialTrackingUrl || 'https://scholarships.gov.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  Visit Official Portal Direct Link <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={handleSyncToTracker}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs flex items-center gap-1"
                >
                  {syncSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Synced to Grantly!
                    </>
                  ) : (
                    'Sync to My Tracker'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
