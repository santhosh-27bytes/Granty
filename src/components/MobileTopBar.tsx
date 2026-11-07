import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Bell } from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';

export const MobileTopBar: React.FC = () => {
  const { 
    unreadNotificationCount, 
    setIsNotificationDrawerOpen 
  } = useGrantly();

  return (
    <header className="md:hidden sticky top-0 z-40 bg-teal-950 text-white h-14 px-4 flex items-center justify-between border-b border-teal-900 shadow-sm select-none">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-teal-950 font-bold shadow-xs">
          <GraduationCap className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-extrabold tracking-tight">Grantly</span>
          <span className="text-[10px] font-semibold text-teal-300 bg-teal-900 px-1.5 py-0.2 rounded border border-teal-800">
            GovTech
          </span>
        </div>
      </Link>

      {/* Right Controls: Notifications Only */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="relative p-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-900 transition"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-teal-950" />
          )}
        </button>
      </div>
    </header>
  );
};
