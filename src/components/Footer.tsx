import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 mt-auto">
      
      {/* 1. Official Government Trust Bar */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  Official Government Direct Application Standard
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified Government Sources
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-2xl">
                All scholarship applications are processed directly on official Central & State Government portals. Grantly is free, ad-free, and never asks for application fees or sensitive credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Client-Side Local Storage Privacy</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid (2 Columns: Brand & Mission + Student Journey) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Column 1: Brand & Core Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 tracking-tight">Grantly</span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded ml-1.5 border border-blue-200">
                  GovTech Companion
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              An institutional scholarship discovery and application tracking companion designed for Indian students. We simplify discovery across Central Ministries and State Higher Education portals.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                No registration fee or middleman charges
              </span>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1 pt-2">
              Built with care for aspiring scholars <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* Column 2: 6-Step Student Journey */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              The Grantly Student Journey
            </h5>
            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <span>Set Domicile & Education Level</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <span>Select Central / State Government Scope</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <span>Filter by Academic Category & Stream</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                <span>Review Eligibility & Apply Directly on Official Portal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">5</span>
                <span>Bookmark & Set Proactive Deadline Reminders</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">6</span>
                <span className="font-bold text-slate-900">Track Application Pipeline & DBT Progress</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Row: Copyright, Local Session Note */}
        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Grantly Platform. Dedicated to accessible student higher education.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Official Government Domain Direct Application Only</span>
            <span>•</span>
            <span>Zero Data Selling</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
