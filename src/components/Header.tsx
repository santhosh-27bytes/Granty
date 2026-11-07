import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Bookmark, 
  CheckSquare, 
  BarChart3, 
  Bell, 
  Menu, 
  X, 
  LayoutDashboard,
  LogOut,
  User,
  ChevronRight
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { calculateProfileCompletion } from '../utils/matching';

export const Header: React.FC = () => {
  const location = useLocation();
  const { 
    logout,
    profile, 
    savedScholarshipIds, 
    trackedApplications, 
    unreadNotificationCount,
    setIsNotificationDrawerOpen
  } = useGrantly();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const completion = calculateProfileCompletion(profile);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
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
    { to: '/analytics', label: 'Analytics & Reports', icon: BarChart3 }
  ];

  const isProfileActive = location.pathname === '/profile';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-slate-900 tracking-tight">Grantly</span>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                Official Grants
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
              Central & State Scholarship Discovery
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.count !== undefined && link.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions: Notification, User Profile Button with Icon & Name, Logout */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            aria-label="View notifications"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          {/* User Profile Button on Top with Icon and Name -> Touching navigates to User Info (/profile) */}
          <Link
            to="/profile"
            title="Go to User Info & Profile"
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition group min-h-[38px] ${
              isProfileActive
                ? 'border-blue-600 bg-blue-50/90 text-blue-900 ring-1 ring-blue-500'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 bg-white'
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs group-hover:bg-blue-700 transition shrink-0">
              {profile.name ? profile.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition truncate max-w-[85px] sm:max-w-[130px]">
                {profile.name || 'User Profile'}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:block">
                {profile.stateOfResidence || 'All India'} • {completion.percentage}%
              </span>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            title="Sign out of current account"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition hidden sm:flex items-center justify-center"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{link.label}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded-full font-bold">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile User Profile Section Card */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 hover:bg-blue-100 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {profile.name || 'User Profile'}
                  </div>
                  <div className="text-[10px] text-blue-700">
                    {profile.stateOfResidence || 'All India'} • {completion.percentage}% complete
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-500" />
            </Link>

            <div className="flex justify-end pt-1">
              <button
                onClick={logout}
                className="text-rose-600 hover:underline font-semibold text-xs flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
