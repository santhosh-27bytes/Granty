import React, { useState } from 'react';
import { 
  X, 
  User, 
  BookOpen, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Building2,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Percent,
  IndianRupee
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { INDIAN_STATES, EDUCATION_LEVEL_LABELS } from '../data/scholarships';
import { getCategoriesForLevel } from '../data/categories';
import { EducationLevel, SocialCategory, StudentProfile } from '../types';
import { calculateProfileCompletion } from '../utils/matching';
import { Link } from 'react-router-dom';

export const ProfileModal: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    resetProfileToDemo, 
    clearProfileToGuest, 
    isProfileModalOpen, 
    setIsProfileModalOpen 
  } = useGrantly();

  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [activeTab, setActiveTab] = useState<'academic' | 'eligibility' | 'scope'>('academic');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync internal state if profile updates externally
  React.useEffect(() => {
    setFormData(profile);
  }, [profile, isProfileModalOpen]);

  if (!isProfileModalOpen) return null;

  const completion = calculateProfileCompletion(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsProfileModalOpen(false);
    }, 600);
  };

  const handleInputChange = <K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        {/* Header - Clean Minimalist */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold text-base flex items-center justify-center border border-blue-100">
              {formData.name ? formData.name.charAt(0).toUpperCase() : <User className="w-5 h-5 text-blue-600" />}
            </div>
            <div>
              <h3 id="profile-modal-title" className="text-base font-bold text-slate-900">
                Student Profile & Eligibility
              </h3>
              <p className="text-xs text-slate-500">
                Configure your criteria for automatic Central & State scholarship matching
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              onClick={() => setIsProfileModalOpen(false)}
              className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-medium px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition"
              title="Open full page profile"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Completeness Ribbon */}
        <div className="px-6 py-2.5 bg-slate-50/80 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Profile Match Strength: <strong className="text-slate-900">{completion.percentage}%</strong>
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              completion.percentage >= 80 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {completion.percentage >= 80 ? 'Optimal Matching' : 'Basic Match Mode'}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                completion.percentage >= 80 ? 'bg-emerald-500' : completion.percentage >= 50 ? 'bg-blue-600' : 'bg-amber-500'
              }`}
              style={{ width: `${completion.percentage}%` }}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'academic'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic & Location</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('eligibility')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'eligibility'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Eligibility & Income</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scope')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'scope'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Government Scope</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto grow">
          
          {/* TAB 1: ACADEMIC & LOCATION */}
          {activeTab === 'academic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="student@example.edu.in"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    State of Residence (Domicile)
                  </label>
                  <select
                    value={formData.stateOfResidence}
                    onChange={(e) => handleInputChange('stateOfResidence', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select your Home / Domicile State</option>
                    {INDIAN_STATES.filter(s => s !== 'All India').map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Determines state-sponsored schemes you can claim.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    State of Study (College Location)
                  </label>
                  <select
                    value={formData.stateOfStudy || formData.stateOfResidence}
                    onChange={(e) => handleInputChange('stateOfStudy', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Same as Residence, or Select College State</option>
                    {INDIAN_STATES.filter(s => s !== 'All India').map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Where your university or institution is located.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Education Level
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => {
                      const newLevel = e.target.value as EducationLevel;
                      handleInputChange('educationLevel', newLevel);
                      const available = getCategoriesForLevel(newLevel);
                      if (available.length > 0 && !available.some(c => c.id === formData.fieldOfStudy)) {
                        handleInputChange('fieldOfStudy', available[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Object.entries(EDUCATION_LEVEL_LABELS)
                      .filter(([k]) => k !== 'all')
                      .map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {formData.educationLevel.startsWith('school_') ? 'School Stream / Classification' : 'Field / Stream of Study'}
                  </label>
                  <select
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {getCategoriesForLevel(formData.educationLevel).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course / Degree Name
                  </label>
                  <input
                    type="text"
                    value={formData.courseName || ''}
                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Year
                  </label>
                  <select
                    value={formData.currentYear || '1st Year'}
                    onChange={(e) => handleInputChange('currentYear', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="1st Year">1st Year / Fresh Admission</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year / Final Year</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY & INCOME */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
                    Annual Family Income (INR)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.annualFamilyIncome ?? ''}
                    onChange={(e) => handleInputChange('annualFamilyIncome', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 250000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {[150000, 250000, 450000, 800000].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleInputChange('annualFamilyIncome', amt)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition ${
                          formData.annualFamilyIncome === amt
                            ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        ₹{(amt / 100000).toFixed(1)} Lakh
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Social Category / Reservation
                  </label>
                  <select
                    value={formData.socialCategory || ''}
                    onChange={(e) => handleInputChange('socialCategory', (e.target.value || undefined) as SocialCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Not Disclosed / General</option>
                    <option value="General">General / Open Category</option>
                    <option value="OBC">OBC (Other Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                    <option value="Minority">Minority Community</option>
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Required for reserved caste & community schemes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender || ''}
                    onChange={(e) => handleInputChange('gender', (e.target.value || undefined) as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female (Qualifies for Pragati, Pudhumai Penn, etc.)</option>
                    <option value="male">Male</option>
                    <option value="other">Other / Transgender</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-slate-500" />
                    Last Qualifying Exam Marks (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.academicScorePercentage ?? ''}
                    onChange={(e) => handleInputChange('academicScorePercentage', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 85.5"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              {/* Special affirmative criteria */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-slate-700 mb-2">
                  Special Affirmative Criteria
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition ${
                    formData.isPersonWithDisability ? 'bg-blue-50/60 border-blue-200 text-blue-900 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={!!formData.isPersonWithDisability}
                      onChange={(e) => handleInputChange('isPersonWithDisability', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>PwD / Divyangjan</span>
                  </label>

                  <label className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition ${
                    formData.isSingleGirlChild ? 'bg-blue-50/60 border-blue-200 text-blue-900 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={!!formData.isSingleGirlChild}
                      onChange={(e) => handleInputChange('isSingleGirlChild', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Single Girl Child</span>
                  </label>

                  <label className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition ${
                    formData.isFirstGenGraduate ? 'bg-blue-50/60 border-blue-200 text-blue-900 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={!!formData.isFirstGenGraduate}
                      onChange={(e) => handleInputChange('isFirstGenGraduate', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>First Gen Graduate</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GOVERNMENT SCOPE */}
          {activeTab === 'scope' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Discovery Feed Filter Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('discoveryPreference', 'central')}
                    className={`p-4 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${
                      formData.discoveryPreference === 'central'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">Central Government</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">All-India Ministries & Statutory Bodies (AICTE, UGC, MoE)</div>
                    </div>
                    {formData.discoveryPreference === 'central' && (
                      <span className="text-[10px] text-blue-700 font-semibold">Active Selection</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('discoveryPreference', 'state')}
                    className={`p-4 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${
                      formData.discoveryPreference === 'state'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">State Government</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Schemes for {formData.stateOfResidence || 'your domicile state'}</div>
                    </div>
                    {formData.discoveryPreference === 'state' && (
                      <span className="text-[10px] text-blue-700 font-semibold">Active Selection</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('discoveryPreference', 'both')}
                    className={`p-4 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${
                      formData.discoveryPreference === 'both'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">Both Schemes</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Recommended to maximize available financial assistance</div>
                    </div>
                    {formData.discoveryPreference === 'both' && (
                      <span className="text-[10px] text-blue-700 font-semibold">Active Selection</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Demo switch controls */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800">Quick Test Profiles</span>
                  <p className="text-[11px] text-slate-500">Easily test different student demographics</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetProfileToDemo();
                      setFormData(profile);
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Priya (Demo)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearProfileToGuest();
                      setFormData(profile);
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 transition"
                  >
                    Clear Guest
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Saved automatically to local session
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 min-h-[40px] text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs flex items-center gap-1.5"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Preferences</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
