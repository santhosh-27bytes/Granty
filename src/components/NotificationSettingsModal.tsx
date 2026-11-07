import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Mail, 
  Smartphone, 
  Calendar, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Check,
  Clock,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';

// Accessible modern toggle switch component
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

export const NotificationSettingsModal: React.FC = () => {
  const { 
    isNotificationSettingsOpen, 
    setIsNotificationSettingsOpen,
    notificationSettings,
    updateNotificationSettings,
    addNotification,
    profile
  } = useGrantly();

  const [emailDigestPreview, setEmailDigestPreview] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  if (!isNotificationSettingsOpen) return null;

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

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      setIsNotificationSettingsOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-settings-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center border border-blue-100">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 id="notification-settings-title" className="text-base font-bold text-slate-900">
                Notification & Alert Preferences
              </h3>
              <p className="text-xs text-slate-500">
                Rule-based reminders for Central & State government scholarship timelines
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationSettingsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            aria-label="Close notification preferences"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto grow">
          
          {/* SECTION 1: DELIVERY CHANNELS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                Delivery Channels
              </h4>
              <span className="text-[11px] text-slate-600 font-semibold">
                Select where you want to be notified
              </span>
            </div>

            {/* In-App Alerts Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition flex items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">In-App Notification Center</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.2 rounded-full border border-blue-100">
                      Standard
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Live alerts in the Grantly header bell for application milestones and changes.
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={notificationSettings.inApp}
                onChange={(checked) => updateNotificationSettings({ inApp: checked })}
                label="Toggle In-App Notifications"
              />
            </div>

            {/* Email Notifications Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition space-y-3 shadow-2xs">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100 mt-0.5">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Email Notifications & Digests</span>
                      {notificationSettings.email && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.2 rounded-full border border-emerald-100">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Weekly digest of matching schemes and critical reminders before portals close.
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.email}
                  onChange={(checked) => updateNotificationSettings({ email: checked })}
                  label="Toggle Email Notifications"
                />
              </div>

              {/* Email config expansion */}
              {notificationSettings.email && (
                <div className="pt-3 border-t border-slate-100 space-y-2.5 animate-in fade-in">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Recipient Student Email
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
                      <span>{testSent ? 'Sent!' : 'Send Test'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailDigestPreview(!emailDigestPreview)}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition shrink-0"
                    >
                      {emailDigestPreview ? 'Hide Preview' : 'Preview'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Web Push Notifications Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition flex items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Desktop & Browser Push</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.2 rounded-full border border-slate-200">
                      Browser
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Real-time desktop banners for immediate deadline countdowns and portal openings.
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Rule-Based Triggers
              </h4>
              <span className="text-[11px] text-slate-600 font-semibold">
                Select trigger conditions
              </span>
            </div>

            <div className="space-y-2">
              {/* Trigger 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    New Matching Schemes Added
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Notify when central or state bodies publish schemes that fit your course and state.
                  </p>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.notifyOnMatchingAdded}
                  onChange={(checked) => updateNotificationSettings({ notifyOnMatchingAdded: checked })}
                  label="Notify on new matching schemes"
                />
              </div>

              {/* Trigger 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    Application Window Opens
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Alert the moment an upcoming saved scholarship begins accepting online applications.
                  </p>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.notifyOnAppOpen}
                  onChange={(checked) => updateNotificationSettings({ notifyOnAppOpen: checked })}
                  label="Notify when applications open"
                />
              </div>

              {/* Trigger 3: Deadline Reminders */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      Deadline Approaching Warnings
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Send proactive countdown reminders before government portal submission windows close.
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
                      Send alerts when time remaining is:
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

          {/* Email Digest Preview Card */}
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

              {/* Realistic Email Mock */}
              <div className="bg-white rounded-xl border border-indigo-100 p-4 space-y-3 text-xs shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      G
                    </div>
                    <span>Grantly Official Notifications</span>
                  </div>
                  <span className="text-[10px] text-slate-600">Today, 9:00 AM</span>
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

                <div className="text-[10px] text-slate-600 text-center pt-1 border-t border-slate-100">
                  Automated notification governed by student notification preferences.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-600 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved to local session</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setIsNotificationSettingsOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-white transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 min-h-[40px] text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs flex items-center gap-1.5"
            >
              {saveToast ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Notification Rules</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
