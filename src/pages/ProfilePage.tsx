import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  Save, 
  Building2, 
  Percent, 
  IndianRupee,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  Bell,
  Mail,
  Smartphone,
  Send,
  Check,
  X,
  Sliders,
  Clock
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { INDIAN_STATES, EDUCATION_LEVEL_LABELS } from '../data/scholarships';
import { getCategoriesForLevel } from '../data/categories';
import { EducationLevel, SocialCategory, StudentProfile } from '../types';
import { calculateProfileCompletion, calculateScholarshipMatch } from '../utils/matching';
import { Link } from 'react-router-dom';

// Accessible Toggle Switch Component
const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}> = ({ checked, onChange, label, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
      checked ? 'bg-blue-600' : 'bg-slate-200'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const ProfilePage: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    resetProfileToDemo, 
    clearProfileToGuest,
    scholarships,
    openScholarshipDetails,
    notificationSettings,
    updateNotificationSettings,
    addNotification
  } = useGrantly();

  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [saveToast, setSaveToast] = useState(false);
  const [activeSection, setActiveSection] = useState<'academic' | 'financial' | 'matches' | 'notifications'>('academic');
  const [emailDigestPreview, setEmailDigestPreview] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const handleSendTestDigest = () => {
    setTestSent(true);
    addNotification({
      title: 'Email Digest Dispatched',
      message: `A sample government scholarship alert was simulated and delivered to ${notificationSettings.emailAddress || profile.email || 'your email'}.`,
      type: 'system'
    });
    setTimeout(() => {
      setTestSent(false);
      setEmailDigestPreview(true);
    }, 500);
  };

  const handleToggleDeadlineDay = (day: number) => {
    const current = notificationSettings.deadlineReminderDays || [7, 3, 1];
    const exists = current.includes(day);
    const updated = exists 
      ? current.filter(d => d !== day) 
      : [...current, day].sort((a, b) => b - a);
    updateNotificationSettings({ deadlineReminderDays: updated });
  };

  // Sync if profile changes externally
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const completion = calculateProfileCompletion(formData);

  const handleInputChange = <K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Filter high matches
  const highMatches = scholarships
    .map(s => ({
      scholarship: s,
      match: calculateScholarshipMatch(s, formData)
    }))
    .filter(item => item.match.matchPercentage >= 70)
    .sort((a, b) => b.match.matchPercentage - a.match.matchPercentage);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      
      {/* Top Breadcrumb & Back Link */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600 transition flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Discovery Funnel</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600 font-bold">User Information & Criteria</span>
        </div>
        <Link to="/" className="text-blue-600 hover:underline hidden sm:inline font-semibold">
          Browse Education Levels →
        </Link>
      </div>

      {/* 1. TOP STUDENT IDENTITY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-xs">
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'S'}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {formData.name || 'Student Account'}
                </h1>
                <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {formData.stateOfResidence || 'All India'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{formData.email || 'student@example.edu.in'}</p>
              <div className="text-xs text-slate-600 font-medium pt-0.5">
                {EDUCATION_LEVEL_LABELS[formData.educationLevel]} • {formData.fieldOfStudy}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 min-h-[40px] text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saveToast ? 'Saved ✓' : 'Save Changes'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetProfileToDemo();
                setSaveToast(true);
                setTimeout(() => setSaveToast(false), 2000);
              }}
              className="px-3 py-2 min-h-[40px] text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              title="Reset to Priya Sharma demo data"
            >
              Reset Demo
            </button>
          </div>
        </div>

        {/* Completeness Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 flex-1 max-w-md">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Profile Match Strength
              </span>
              <span className="text-blue-700 font-bold">{completion.percentage}% Complete</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${completion.percentage}%` }}
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            {completion.missingFields.length > 0 
              ? `Add ${completion.missingFields.slice(0, 2).join(' & ')} to unlock more matches.`
              : 'All essential eligibility fields complete.'}
          </div>
        </div>
      </div>

      {/* 2. SECTION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSection('academic')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'academic'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic Information</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('financial')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'financial'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Eligibility, Income & Quota</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('matches')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'matches'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Eligible Matches ({highMatches.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('notifications')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'notifications'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Alert & Notification Rules</span>
        </button>
      </div>

      {/* 3. SECTION CONTENT */}
      {activeSection === 'academic' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Education & Course Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These details determine which Central Ministries and State Higher Education scholarships are applicable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                State of Residence (Domicile)
              </label>
              <select
                value={formData.stateOfResidence}
                onChange={(e) => handleInputChange('stateOfResidence', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="">Select Domicile State</option>
                {INDIAN_STATES.filter(s => s !== 'All India').map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                State of Study (College Location)
              </label>
              <select
                value={formData.stateOfStudy || formData.stateOfResidence}
                onChange={(e) => handleInputChange('stateOfStudy', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="">Same as Residence, or Select College State</option>
                {INDIAN_STATES.filter(s => s !== 'All India').map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {Object.entries(EDUCATION_LEVEL_LABELS)
                  .filter(([k]) => k !== 'all')
                  .map(([k, label]) => (
                    <option key={k} value={k}>{label}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                {formData.educationLevel.startsWith('school_') ? 'School Stream / Classification' : 'Field / Discipline of Study'}
              </label>
              <select
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {getCategoriesForLevel(formData.educationLevel).map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Specific Course Name
              </label>
              <input
                type="text"
                value={formData.courseName || ''}
                onChange={(e) => handleInputChange('courseName', e.target.value)}
                placeholder="e.g. B.Tech Computer Science, MBBS, B.Sc Physics"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Current Year of Study
              </label>
              <select
                value={formData.currentYear || '1st Year'}
                onChange={(e) => handleInputChange('currentYear', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="1st Year">1st Year / Fresh Admission</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year / Final Year</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {saveToast ? 'Changes Saved ✓' : 'Save Academic Details'}
            </button>
          </div>
        </form>
      )}

      {activeSection === 'financial' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Financial & Quota Attributes</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These attributes check means-tested scholarships, fee-waiver thresholds, and community quotas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Annual Family Income (INR)
              </label>
              <input
                type="number"
                step="10000"
                value={formData.annualFamilyIncome ?? ''}
                onChange={(e) => handleInputChange('annualFamilyIncome', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="250000"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{(amt / 100000).toFixed(1)}L
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Social Category / Community
              </label>
              <select
                value={formData.socialCategory || ''}
                onChange={(e) => handleInputChange('socialCategory', (e.target.value || undefined) as SocialCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="">General / Open</option>
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="Minority">Minority (Muslim, Christian, Sikh, Buddhist, Jain)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender || ''}
                onChange={(e) => handleInputChange('gender', (e.target.value || undefined) as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="female">Female (Required for AICTE Pragati, Pudhumai Penn)</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Qualifying Examination Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.academicScorePercentage ?? ''}
                onChange={(e) => handleInputChange('academicScorePercentage', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g. 86.4"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.isPersonWithDisability}
                onChange={(e) => handleInputChange('isPersonWithDisability', e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium text-slate-800">Specially-Abled (PwD)</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.isSingleGirlChild}
                onChange={(e) => handleInputChange('isSingleGirlChild', e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium text-slate-800">Single Girl Child</span>
            </label>

            <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={!!formData.isFirstGenGraduate}
                onChange={(e) => handleInputChange('isFirstGenGraduate', e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium text-slate-800">First-Gen Graduate</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {saveToast ? 'Changes Saved ✓' : 'Save Eligibility Details'}
            </button>
          </div>
        </form>
      )}

      {activeSection === 'matches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing scholarships with 70%+ match based on your saved attributes</span>
            <Link to="/" className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5">
              <span>View All Scholarships</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highMatches.map(({ scholarship, match }) => (
              <div
                key={scholarship.id}
                onClick={() => openScholarshipDetails(scholarship)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition shadow-2xs space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {scholarship.governmentLevel === 'central' ? 'Central Scheme' : `${scholarship.state} State`}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {match.matchPercentage}% Match
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                  {scholarship.title}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-900">{scholarship.awardAmount}</span>
                  <span className="text-blue-600 font-medium group-hover:underline flex items-center gap-0.5">
                    View & Apply →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATION PREFERENCES SECTION */}
      {activeSection === 'notifications' && (
        <div className="space-y-6">
          {/* Intro Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                Notification & Alert Preferences
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure how Grantly notifies you about upcoming application deadlines and new matching schemes.
              </p>
            </div>

            {/* SECTION 1: DELIVERY CHANNELS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  Active Channels
                </span>
                <span className="text-[11px] text-slate-400">Where you receive alerts</span>
              </div>

              {/* In-App */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">In-App Notification Center</span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.2 rounded-full border border-blue-100">
                        Default
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Badges and alerts in the Grantly top header bell menu.
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.inApp}
                  onChange={(checked) => updateNotificationSettings({ inApp: checked })}
                  label="Toggle In-App Notifications"
                />
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100 mt-0.5">
                      <Mail className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Email Notifications & Weekly Digest</span>
                        {notificationSettings.email && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.2 rounded-full border border-emerald-100">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Weekly summary of eligible scholarships and urgent deadline warnings.
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={notificationSettings.email}
                    onChange={(checked) => updateNotificationSettings({ email: checked })}
                    label="Toggle Email Notifications"
                  />
                </div>

                {notificationSettings.email && (
                  <div className="pt-3 border-t border-slate-100 space-y-2.5 animate-in fade-in">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Destination Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="email"
                          value={notificationSettings.emailAddress}
                          onChange={(e) => updateNotificationSettings({ emailAddress: e.target.value })}
                          placeholder="student@example.edu.in"
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendTestDigest}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition flex items-center gap-1.5 shrink-0"
                      >
                        {testSent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
                        <span>{testSent ? 'Sent!' : 'Send Test Digest'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmailDigestPreview(!emailDigestPreview)}
                        className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition shrink-0"
                      >
                        {emailDigestPreview ? 'Hide Preview' : 'Show Preview'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Browser Push */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                    <Smartphone className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Web Push Notifications</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.2 rounded-full border border-slate-200">
                        Browser
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Desktop reminders 24 hours before saved scheme windows close.
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.push}
                  onChange={(checked) => updateNotificationSettings({ push: checked })}
                  label="Toggle Browser Push Notifications"
                />
              </div>
            </div>

            {/* SECTION 2: TRIGGER RULES */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Notification Triggers (Rule-Based)
                </span>
                <span className="text-[11px] text-slate-400">Events that generate alerts</span>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      New Matching Schemes Added
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Receive an alert when new Central or State schemes matching your profile are listed.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={notificationSettings.notifyOnMatchingAdded}
                    onChange={(checked) => updateNotificationSettings({ notifyOnMatchingAdded: checked })}
                    label="Notify on new matching schemes"
                  />
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      Application Window Opens
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Alert immediately when official portals start accepting online forms for saved schemes.
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={notificationSettings.notifyOnAppOpen}
                    onChange={(checked) => updateNotificationSettings({ notifyOnAppOpen: checked })}
                    label="Notify when applications open"
                  />
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-900 block">
                        Deadline Countdown Alerts
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Proactive countdown warnings before government portals lock down submissions.
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={notificationSettings.notifyOnDeadlineApproaching}
                      onChange={(checked) => updateNotificationSettings({ notifyOnDeadlineApproaching: checked })}
                      label="Notify on deadline approaching"
                    />
                  </div>

                  {notificationSettings.notifyOnDeadlineApproaching && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <span className="text-[11px] font-semibold text-slate-600">
                        Send notifications when time remaining is:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[14, 7, 3, 1].map((day) => {
                          const isSelected = (notificationSettings.deadlineReminderDays || [7, 3, 1]).includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => handleToggleDeadlineDay(day)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {day === 1 ? '24 Hours' : `${day} Days`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Email Digest Preview */}
            {emailDigestPreview && (
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-950">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    Live Preview: Official Grantly Scholarship Alert
                  </span>
                  <button
                    type="button"
                    onClick={() => setEmailDigestPreview(false)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-indigo-100 p-4 space-y-3 text-xs shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        G
                      </div>
                      <span>Grantly Official Notifications</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Today, 9:00 AM</span>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div><strong>To:</strong> {notificationSettings.emailAddress || 'student@example.edu.in'}</div>
                    <div><strong>Subject:</strong> 🎯 Scholarship Alert: Upcoming deadlines for your profile</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">AICTE Pragati Scholarship for Girls</span>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        7 Days Left
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Award: ₹50,000 / year • Degree & Diploma in Engineering • MoE Portal
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
