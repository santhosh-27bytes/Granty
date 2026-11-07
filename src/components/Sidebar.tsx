import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Bookmark, 
  CheckSquare, 
  BarChart3, 
  User, 
  Bell, 
  LayoutDashboard,
  LogOut,
  MapPin,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { calculateProfileCompletion } from '../utils/matching';
import { EDUCATION_LEVEL_LABELS } from '../data/scholarships';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { 
    logout,
    profile, 
    savedScholarshipIds, 
    trackedApplications, 
    unreadNotificationCount,
    setIsNotificationDrawerOpen
  } = useGrantly();

  const completion = calculateProfileCompletion(profile);

  const navLinks = [
    { to: '/', label: 'Education Levels', icon: LayoutDashboard },
    { 
      to: '/tracker', 
      label: 'Application Tracker', 
      icon: CheckSquare, 
      count: trackedApplications.length 
    },
    { 
      to: '/saved', 
      label: 'Saved Scholarships', 
      icon: Bookmark, 
      count: savedScholarshipIds.length 
    },
    { to: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { 
      to: '/profile', 
      label: 'User Info & Criteria', 
      icon: User,
      badge: `${completion.percentage}%`
    }
  ];

  return (
    <aside 
      className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-teal-950 text-teal-100 flex-col justify-between border-r border-teal-900/60 z-30 shadow-xl select-none"
      aria-label="Desktop Primary Navigation"
    >
      {/* Top Branding Section */}
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-teal-900/60 bg-teal-950/80">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-teal-950 font-black shadow-md shadow-teal-500/20 group-hover:bg-teal-400 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold text-white tracking-tight">Grantly</span>
                <span className="text-[10px] font-bold text-teal-300 bg-teal-900/80 px-1.5 py-0.5 rounded border border-teal-800">
                  GovTech
                </span>
              </div>
              <p className="text-[10px] text-teal-300/80 font-medium leading-none">
                Official Scholarship Discovery
              </p>
            </div>
          </Link>
        </div>

        {/* Notification Alert Trigger */}
        <div className="px-4 pt-4">
          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-teal-900/50 hover:bg-teal-900 text-teal-100 border border-teal-850 transition text-xs font-semibold group"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative p-1 bg-teal-800/80 rounded-lg text-teal-300 group-hover:text-white">
                <Bell className="w-3.5 h-3.5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-teal-950" />
                )}
              </div>
              <span>Notifications & Alerts</span>
            </div>
            {unreadNotificationCount > 0 ? (
              <span className="text-[10px] font-bold bg-teal-500 text-teal-950 px-2 py-0.5 rounded-full">
                {unreadNotificationCount} new
              </span>
            ) : (
              <span className="text-[10px] text-teal-400 font-medium">All clear</span>
            )}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-3 pt-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-teal-400/80">
            Navigation Menu
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-950/40 ring-1 ring-teal-400/40'
                      : 'text-teal-200/90 hover:bg-teal-900/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-teal-400'}`} />
                    <span>{link.label}</span>
                  </div>

                  {link.count !== undefined && link.count > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-teal-900'
                          : 'bg-teal-900 text-teal-200 border border-teal-800'
                      }`}
                    >
                      {link.count}
                    </span>
                  )}

                  {link.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-teal-900'
                          : 'bg-teal-900 text-teal-300 border border-teal-800'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Student Active Scope Card */}
        <div className="px-4 pt-6">
          <div className="p-3 rounded-xl bg-teal-900/30 border border-teal-900/70 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-teal-300 font-bold text-[11px]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Active Domicile</span>
              </span>
              <span className="text-[10px] text-teal-200 bg-teal-900/80 px-1.5 py-0.5 rounded">
                {profile.discoveryPreference === 'both' ? 'Central & State' : profile.discoveryPreference.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-teal-100 font-medium">
              {profile.stateOfResidence || 'All India'} • {EDUCATION_LEVEL_LABELS[profile.educationLevel]}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-4 border-t border-teal-900/60 bg-teal-950/90">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/profile"
            className="flex items-center gap-3 min-w-0 group hover:opacity-90 transition flex-1"
            title="Open full profile"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-teal-600 shadow-xs">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate leading-tight group-hover:text-teal-200 transition">
                {profile.name || 'Student Account'}
              </div>
              <div className="text-[10px] text-teal-300/80 truncate">
                {profile.email || 'student@grantly.edu'}
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={logout}
            title="Sign Out"
            className="p-2 rounded-lg text-teal-400 hover:text-rose-300 hover:bg-rose-950/40 transition shrink-0"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
