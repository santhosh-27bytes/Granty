import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Bookmark, 
  BarChart3, 
  User 
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { trackedApplications, savedScholarshipIds } = useGrantly();

  const navItems = [
    { to: '/', label: 'Levels', icon: LayoutDashboard },
    { 
      to: '/tracker', 
      label: 'Tracker', 
      icon: CheckSquare, 
      count: trackedApplications.length 
    },
    { 
      to: '/saved', 
      label: 'Saved', 
      icon: Bookmark, 
      count: savedScholarshipIds.length 
    },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1 flex items-center justify-around select-none"
      aria-label="Mobile Bottom Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.to || 
          (item.to === '/' && (location.pathname.startsWith('/categories') || location.pathname.startsWith('/scholarships')));

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`min-w-[56px] min-h-[48px] flex flex-col items-center justify-center relative rounded-xl transition-all duration-150 px-2 py-1 ${
              isActive 
                ? 'text-teal-700 font-bold' 
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 text-teal-600' : ''}`} />
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {item.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-teal-600" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
