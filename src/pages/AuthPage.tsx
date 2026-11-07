import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Building2,
  Sparkles,
  ChevronRight,
  Loader2,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { INDIAN_STATES, EDUCATION_LEVEL_LABELS } from '../data/scholarships';
import { getCategoriesForLevel } from '../data/categories';
import { EducationLevel, SocialCategory } from '../types';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, resetProfileToDemo } = useGrantly();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  
  // Sign in state (prefilled with demo account for frictionless instant login)
  const [signInEmail, setSignInEmail] = useState('priya.sharma@example.edu.in');
  const [signInPassword, setSignInPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Register state
  const [regStep, setRegStep] = useState<1 | 2>(1);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regState, setRegState] = useState('Karnataka');
  const [regEduLevel, setRegEduLevel] = useState<EducationLevel>('undergraduate');
  const [regField, setRegField] = useState('Engineering & Technology');
  const [regCourseName, setRegCourseName] = useState('B.Tech in Computer Science');
  const [regCategory, setRegCategory] = useState<SocialCategory>('OBC');
  const [regIncome, setRegIncome] = useState<number>(250000);
  const [regGender, setRegGender] = useState<'female' | 'male' | 'other'>('female');

  // Handle Sign In submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const email = signInEmail.trim();
    const password = signInPassword.trim();

    if (!email) {
      setErrorMsg('Please enter your student email address.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address (e.g. priya.sharma@example.edu.in).');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Brief realistic verification delay then transition straight to Dashboard
    setTimeout(() => {
      login(email, password);
      // Guarantee URL hash is at root dashboard
      window.location.hash = '#/';
      navigate('/', { replace: true });
      setIsLoading(false);
    }, 300);
  };

  // Quick 1-click Demo profile login
  const handleQuickDemoLogin = (profileType: 'priya' | 'aarav' | 'ananya') => {
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      if (profileType === 'priya') {
        resetProfileToDemo();
        login('priya.sharma@example.edu.in', 'password123');
      } else if (profileType === 'aarav') {
        register({
          name: 'Aarav Patel',
          email: 'aarav.patel@gujaratuniv.edu.in',
          stateOfResidence: 'Gujarat',
          stateOfStudy: 'Gujarat',
          educationLevel: 'postgraduate',
          fieldOfStudy: 'Pure & Applied Sciences',
          courseName: 'M.Sc in Biotechnology',
          currentYear: '1st Year',
          socialCategory: 'General',
          annualFamilyIncome: 400000,
          gender: 'male',
          discoveryPreference: 'both',
          preferredStates: ['Gujarat']
        });
      } else {
        register({
          name: 'Ananya Sen',
          email: 'ananya.sen@wbboard.edu.in',
          stateOfResidence: 'West Bengal',
          stateOfStudy: 'West Bengal',
          educationLevel: 'school_higher_sec',
          fieldOfStudy: 'Any / All Streams',
          courseName: 'Higher Secondary (Science)',
          currentYear: 'Class 12',
          socialCategory: 'General',
          annualFamilyIncome: 180000,
          gender: 'female',
          discoveryPreference: 'both',
          preferredStates: ['West Bengal']
        });
      }

      // Guarantee immediate transition to dashboard
      window.location.hash = '#/';
      navigate('/', { replace: true });
      setIsLoading(false);
    }, 250);
  };

  // Handle Registration submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      setRegStep(1);
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setRegStep(1);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      register({
        name: regName.trim(),
        email: regEmail.trim(),
        stateOfResidence: regState,
        stateOfStudy: regState,
        educationLevel: regEduLevel,
        fieldOfStudy: regField,
        courseName: regCourseName || 'Degree Course',
        currentYear: '1st Year',
        socialCategory: regCategory,
        annualFamilyIncome: regIncome || 250000,
        gender: regGender,
        discoveryPreference: 'both',
        preferredStates: [regState]
      });

      // Direct transition to dashboard
      window.location.hash = '#/';
      navigate('/', { replace: true });
      setIsLoading(false);
    }, 350);
  };

  // Auto-fill demo credentials helper
  const handleAutoFillDemo = () => {
    setSignInEmail('priya.sharma@example.edu.in');
    setSignInPassword('password123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20 mb-1">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Grantly
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Find scholarships you can actually apply for
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-9 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
          
          {/* Segmented Auth Mode Switch */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register New Profile
            </button>
          </div>

          {/* Validation Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address or Student ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="student@example.edu.in"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoFillDemo}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Auto-fill Demo Credentials
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50/50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-xs transition shadow-xs hover:shadow flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in to Dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Quick 1-Click Demo Profiles */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <span>Or 1-Click Demo Login:</span>
                  <span className="text-blue-600 lowercase font-normal">no password needed</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleQuickDemoLogin('priya')}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                        <span>Priya Sharma</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">Demo User</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Undergraduate B.Tech • Karnataka • OBC</div>
                    </div>
                    <span className="text-xs text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">Login →</span>
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleQuickDemoLogin('aarav')}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-blue-700">Aarav Patel</div>
                      <div className="text-[11px] text-slate-500">Postgraduate M.Sc • Gujarat • General</div>
                    </div>
                    <span className="text-xs text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">Login →</span>
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleQuickDemoLogin('ananya')}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-blue-700">Ananya Sen</div>
                      <div className="text-[11px] text-slate-500">Higher Secondary Class 12 • West Bengal</div>
                    </div>
                    <span className="text-xs text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">Login →</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>Step {regStep} of 2</span>
                <span className="font-bold text-blue-600">
                  {regStep === 1 ? 'Personal Details' : 'Education & Category'}
                </span>
              </div>

              {regStep === 1 ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="rahul.verma@college.edu.in"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State of Residence (Domicile)
                    </label>
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      {INDIAN_STATES.filter(s => s !== 'All India').map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Create Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!regName.trim() || !regEmail.trim()) {
                        setErrorMsg('Please enter your name and email to proceed.');
                        return;
                      }
                      setErrorMsg('');
                      setRegStep(2);
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <span>Next: Education & Stream</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Education Level
                    </label>
                    <select
                      value={regEduLevel}
                      onChange={(e) => {
                        const newLevel = e.target.value as EducationLevel;
                        setRegEduLevel(newLevel);
                        const available = getCategoriesForLevel(newLevel);
                        if (available.length > 0 && !available.some(c => c.id === regField)) {
                          setRegField(available[0].id);
                        }
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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
                      {regEduLevel.startsWith('school_') ? 'School Stream / Classification' : 'Category / Field of Study'}
                    </label>
                    <select
                      value={regField}
                      onChange={(e) => setRegField(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      {getCategoriesForLevel(regEduLevel).map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Social Category
                      </label>
                      <select
                        value={regCategory}
                        onChange={(e) => setRegCategory(e.target.value as SocialCategory)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        <option value="General">General / Open</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="EWS">EWS</option>
                        <option value="Minority">Minority</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Annual Family Income (₹)
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={regIncome}
                      onChange={(e) => setRegIncome(Number(e.target.value))}
                      placeholder="250000"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-2/3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1 min-h-[44px]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <span>Open Dashboard</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

        </div>

        {/* Footer trust badge */}
        <div className="text-center mt-6 text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Independent, ad-free government scholarship assistance</span>
        </div>
      </div>
    </div>
  );
};
