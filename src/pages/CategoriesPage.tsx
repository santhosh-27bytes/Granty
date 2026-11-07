import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { EDUCATION_LEVEL_LABELS } from '../data/scholarships';
import { getCategoriesForLevel, doesScholarshipMatchCategory } from '../data/categories';
import { EducationLevel } from '../types';

export const CategoriesPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { scholarships, profile } = useGrantly();

  const currentLevelId = (levelId || 'undergraduate') as EducationLevel | 'all';
  const levelTitle = EDUCATION_LEVEL_LABELS[currentLevelId] || 'All Education Levels';

  // Retrieve level-specific academic streams/categories
  const categoriesData = useMemo(() => {
    return getCategoriesForLevel(currentLevelId);
  }, [currentLevelId]);

  // Count scholarships for this level + category
  const getCountForStream = (streamId: string) => {
    return scholarships.filter((s) => {
      // Level check
      if (currentLevelId !== 'all') {
        const matchesLevel = s.educationLevels.includes('all') || s.educationLevels.includes(currentLevelId);
        if (!matchesLevel) return false;
      }
      // Stream/category check
      return doesScholarshipMatchCategory(s, currentLevelId, streamId);
    }).length;
  };

  const handleSelectCategory = (categoryId: string) => {
    // Navigate to step 3: scholarships list
    navigate(`/scholarships/${currentLevelId}/${encodeURIComponent(categoryId)}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Breadcrumb & Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{levelTitle}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600">Select Category / Stream</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Step 2 of 3: Academic Classification</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentLevelId.startsWith('school_') ? 'Select School Stream / Classification' : 'Select Category of Education'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Showing streams and classifications for <strong className="text-slate-900">{levelTitle}</strong>. Pick your academic discipline to view matching Central & State Government scholarships.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition self-start sm:self-auto shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Education Level</span>
          </Link>
        </div>
      </div>

      {/* Grid of Categories (Step 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoriesData.map((item) => {
          const Icon = item.icon;
          const count = getCountForStream(item.id);
          const isUserCategory = profile.fieldOfStudy === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectCategory(item.id)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 shadow-2xs hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group relative"
            >
              {isUserCategory && (
                <span className="absolute top-4 right-4 text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Your Current Stream
                </span>
              )}

              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 line-clamp-2">
                  <span className="font-semibold text-slate-500">Includes: </span>
                  {item.examples}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  {count} {count === 1 ? 'Scholarship' : 'Scholarships'}
                </span>

                <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Scholarships</span>
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

export default CategoriesPage;
