import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Layers, 
  Atom, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { EducationLevel } from '../types';

interface LevelOption {
  id: EducationLevel | 'all';
  title: string;
  subtitle: string;
  courses: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  accentBadge?: string;
}

const EDUCATION_LEVEL_OPTIONS: LevelOption[] = [
  {
    id: 'undergraduate',
    title: 'Undergraduate (UG)',
    subtitle: 'Bachelor Degrees & Professional Courses',
    courses: 'B.Tech, B.E., MBBS, B.Sc, B.Com, BA, BBA, BCA, LL.B',
    icon: GraduationCap,
    color: 'text-blue-600',
    bg: 'bg-blue-50/60',
    border: 'border-slate-200 hover:border-blue-400'
  },
  {
    id: 'postgraduate',
    title: 'Postgraduate (PG)',
    subtitle: 'Master Degrees & Higher Specializations',
    courses: 'M.Tech, M.Sc, MBA, MA, M.Com, MD, MS, LL.M',
    icon: BookOpen,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50/60',
    border: 'border-slate-200 hover:border-indigo-400'
  },
  {
    id: 'school_higher_sec',
    title: 'Higher Secondary (Classes 11 & 12)',
    subtitle: 'Junior College & Senior Secondary (10+2)',
    courses: 'PUC, Intermediate, Senior Secondary (Science, Commerce, Arts)',
    icon: Award,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/60',
    border: 'border-slate-200 hover:border-emerald-400'
  },
  {
    id: 'school_secondary',
    title: 'Secondary School (Classes 9 & 10)',
    subtitle: 'High School & Pre-Matric Schemes',
    courses: 'Class 9 & 10, National Means-cum-Merit (NMMSS)',
    icon: Layers,
    color: 'text-amber-600',
    bg: 'bg-amber-50/60',
    border: 'border-slate-200 hover:border-amber-400'
  },
  {
    id: 'doctoral',
    title: 'Doctoral / Ph.D. Research',
    subtitle: 'Doctoral Fellowships & Advanced Research',
    courses: 'Ph.D., Prime Minister’s Research Fellowship (PMRF), CSIR-UGC NET',
    icon: Atom,
    color: 'text-purple-600',
    bg: 'bg-purple-50/60',
    border: 'border-slate-200 hover:border-purple-400'
  },
  {
    id: 'diploma',
    title: 'Polytechnic & Diploma',
    subtitle: 'Technical Diploma & Vocational Trades',
    courses: 'Polytechnic Diploma, AICTE Saksham/Pragati, ITI Vocational',
    icon: Wrench,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50/60',
    border: 'border-slate-200 hover:border-cyan-400'
  },
  {
    id: 'all',
    title: 'All Education Levels',
    subtitle: 'Complete National Directory',
    courses: 'Browse all available Central and State Government schemes',
    icon: Sparkles,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-200 hover:border-slate-400'
  }
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { scholarships, profile } = useGrantly();

  // Count scholarships per education level
  const getScholarshipCount = (levelId: EducationLevel | 'all') => {
    return scholarships.filter(s => {
      if (levelId === 'all') return true;
      return s.educationLevels.includes('all') || s.educationLevels.includes(levelId);
    }).length;
  };

  const handleSelectLevel = (levelId: string) => {
    navigate(`/categories/${levelId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Clean Welcome Banner */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Step 1 of 3: Education Level</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Your Education Level
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
          Welcome, {profile.name}! Choose your current level of study below. Next, you will pick your discipline to find exact matching government scholarships.
        </p>
      </div>

      {/* Grid of Education Levels (Only Education Levels shown here, per user request) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EDUCATION_LEVEL_OPTIONS.map((item) => {
          const Icon = item.icon;
          const count = getScholarshipCount(item.id);
          const isUserDefault = profile.educationLevel === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectLevel(item.id)}
              className={`bg-white rounded-2xl border ${item.border} hover:border-blue-400 p-6 shadow-2xs hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group relative`}
            >
              {isUserDefault && (
                <span className="absolute top-4 right-4 text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Your Current Level
                </span>
              )}

              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 line-clamp-2">
                  <span className="font-semibold text-slate-500">Includes: </span>
                  {item.courses}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  {count} Schemes
                </span>

                <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Categories</span>
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
