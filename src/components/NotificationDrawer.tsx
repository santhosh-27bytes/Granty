import React from 'react';
import { 
  X, 
  Bell, 
  Check, 
  Trash2, 
  Sliders, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';
import { formatDateReadable } from '../utils/formatters';
import { Link } from 'react-router-dom';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    setIsNotificationSettingsOpen
  } = useGrantly();

  if (!isNotificationDrawerOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'matching_added':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'deadline_approaching':
        return <Clock className="w-4 h-4 text-rose-500" />;
      case 'status_update':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-label="Notification Center"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100">
              <Bell className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notification Center</h3>
              <p className="text-[11px] text-slate-500">
                {unreadNotificationCount} unread update{unreadNotificationCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setIsNotificationDrawerOpen(false);
                setIsNotificationSettingsOpen(true);
              }}
              title="Notification Settings & Preferences"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="Notification preferences"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="px-5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs shrink-0">
          <button
            onClick={markAllNotificationsAsRead}
            disabled={unreadNotificationCount === 0}
            className="text-blue-600 hover:text-blue-800 font-semibold disabled:opacity-40 disabled:hover:text-blue-600 flex items-center gap-1 transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
          <button
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className="text-slate-400 hover:text-rose-600 disabled:opacity-40 flex items-center gap-1 text-[11px] font-medium transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear list</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3 border border-blue-100">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">All caught up!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Grantly notifies you when new scholarships matching your criteria are added or when deadlines approach.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-xl border transition cursor-pointer relative ${
                  notif.read 
                    ? 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50' 
                    : 'bg-blue-50/40 border-blue-200 text-slate-900 shadow-2xs hover:bg-blue-50/70'
                }`}
              >
                {!notif.read && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-600" />
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="space-y-1 flex-1 pr-3">
                    <h5 className="text-xs font-bold leading-tight text-slate-900">
                      {notif.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        {formatDateReadable(notif.timestamp)}
                      </span>
                      {notif.actionUrl && (
                        <Link
                          to={notif.actionUrl}
                          onClick={() => setIsNotificationDrawerOpen(false)}
                          className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          View Details →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between shrink-0">
          <span>Rule-based automated triggers</span>
          <button
            onClick={() => {
              setIsNotificationDrawerOpen(false);
              setIsNotificationSettingsOpen(true);
            }}
            className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
