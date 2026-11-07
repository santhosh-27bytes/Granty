import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  Scholarship, 
  TrackedApplication, 
  TrackingStage, 
  NotificationItem, 
  NotificationSettings,
  GovernmentLevel,
  EducationLevel
} from '../types';
import { SCHOLARSHIPS_DATA, INITIAL_STUDENT_PROFILE } from '../data/scholarships';
import confetti from 'canvas-confetti';

interface FilterState {
  searchQuery: string;
  governmentLevel: 'all' | GovernmentLevel;
  selectedState: string;
  educationLevel: EducationLevel;
  fieldOfStudy: string;
  status: 'all' | 'open' | 'upcoming' | 'closed';
  minAmount: number;
  category: string;
  sortBy: 'deadline' | 'amount_desc' | 'match_score' | 'alphabetical';
}

interface GrantlyContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  login: (email: string, password?: string) => boolean;
  register: (profileData: Partial<StudentProfile>) => void;
  logout: () => void;

  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  resetProfileToDemo: () => void;
  clearProfileToGuest: () => void;

  scholarships: Scholarship[];
  
  savedScholarshipIds: string[];
  toggleSaveScholarship: (scholarshipId: string) => void;
  isScholarshipSaved: (scholarshipId: string) => boolean;

  trackedApplications: TrackedApplication[];
  addToTracker: (scholarship: Scholarship, initialStage?: TrackingStage) => void;
  updateTrackedStage: (trackId: string, newStage: TrackingStage, note?: string) => void;
  updateTrackedApplication: (trackId: string, updates: Partial<TrackedApplication>) => void;
  toggleDocumentReady: (trackId: string, documentName: string) => void;
  removeFromTracker: (trackId: string) => void;
  isScholarshipTracked: (scholarshipId: string) => boolean;

  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;

  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;

  // Modals & Drawers
  selectedScholarship: Scholarship | null;
  openScholarshipDetails: (scholarship: Scholarship) => void;
  closeScholarshipDetails: () => void;

  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  isNotificationSettingsOpen: boolean;
  setIsNotificationSettingsOpen: (open: boolean) => void;

  isLiveLookupModalOpen: boolean;
  selectedTrackForLiveLookup: TrackedApplication | null;
  openLiveLookupModal: (track: TrackedApplication) => void;
  closeLiveLookupModal: () => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  governmentLevel: 'all',
  selectedState: 'Karnataka',
  educationLevel: 'all',
  fieldOfStudy: 'Any / All Streams',
  status: 'all',
  minAmount: 0,
  category: 'all',
  sortBy: 'match_score'
};

const defaultNotificationSettings: NotificationSettings = {
  inApp: true,
  email: true,
  emailAddress: 'priya.sharma@example.edu.in',
  push: false,
  notifyOnMatchingAdded: true,
  notifyOnAppOpen: true,
  notifyOnDeadlineApproaching: true,
  deadlineReminderDays: [7, 3, 1]
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Matching Scholarship Added',
    message: 'AICTE Pragati Scholarship for Girl Students matches your profile (98% match). Applications close Dec 31, 2026.',
    type: 'matching_added',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    scholarshipId: 'central-aicte-pragati',
    read: false,
    actionUrl: '/discover'
  },
  {
    id: 'notif-2',
    title: 'Deadline Approaching Reminder',
    message: 'Karnataka State SSP Post-Matric Scholarship deadline is in 23 days (Nov 30, 2026). Check required documents.',
    type: 'deadline_approaching',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    scholarshipId: 'state-karnataka-ssp',
    read: false,
    actionUrl: '/tracker'
  },
  {
    id: 'notif-3',
    title: 'Application Status Update',
    message: 'Institute Verification completed for your Central Sector Scheme application.',
    type: 'status_update',
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    scholarshipId: 'central-csss-moe',
    read: true,
    actionUrl: '/tracker'
  }
];

const INITIAL_TRACKED_APPLICATIONS: TrackedApplication[] = [
  {
    id: 'track-01',
    scholarshipId: 'central-csss-moe',
    scholarshipTitle: 'Central Sector Scheme of Scholarships (CSSS)',
    provider: 'Department of Higher Education, Ministry of Education',
    awardAmount: '₹12,000 - ₹20,000 / year',
    awardValueNumber: 20000,
    governmentLevel: 'central',
    stage: 'submitted',
    applicationIdNumber: 'NSP2026-KA-883921',
    portalName: 'National Scholarship Portal (NSP)',
    officialTrackingUrl: 'https://scholarships.gov.in',
    supportsLiveLookup: true,
    appliedDate: '2026-10-14',
    deadline: '2026-12-15',
    expectedDecisionDate: '2027-02-15',
    documentsReady: [
      'Aadhaar Card copy',
      'Class 12th Board Marksheet with Roll No.',
      'Income Certificate issued by Revenue Authority (Tahsildar / SDO)',
      'Bonafide Student Certificate issued by Head of Institution'
    ],
    totalDocuments: [
      'Aadhaar Card copy',
      'Class 12th Board Marksheet with Roll No.',
      'Income Certificate issued by Revenue Authority (Tahsildar / SDO)',
      'Bonafide Student Certificate issued by Head of Institution',
      'Active Bank Passbook copy with IFSC and Aadhaar seeding proof',
      'College Admission Fee Receipt'
    ],
    notes: 'Submitted online via college portal. Principal signed bonafide on Oct 12.',
    timeline: [
      {
        timestamp: '2026-10-05T10:00:00Z',
        stage: 'interested',
        note: 'Discovered on Grantly and shortlisted based on 86.4% Class 12 board marks'
      },
      {
        timestamp: '2026-10-09T14:30:00Z',
        stage: 'preparing_documents',
        note: 'Procured Tahsildar income certificate and college bonafide'
      },
      {
        timestamp: '2026-10-14T11:20:00Z',
        stage: 'submitted',
        note: 'Application successfully uploaded with OTR ID NSP2026-KA-883921'
      }
    ],
    liveVerificationStatus: {
      isVerified: true,
      lastChecked: '2026-11-06T09:15:00Z',
      currentOfficialStage: 'District Nodal Officer (DNO) Verification',
      remarks: 'Institute verification verified with 100% attendance match. Forwarded to DNO.',
      officerVerification: 'College Nodal Officer: Approved (18-Oct-2026)',
      bankValidation: 'Aadhaar NPCI Mapping: Active (Canara Bank)'
    }
  },
  {
    id: 'track-02',
    scholarshipId: 'central-aicte-pragati',
    scholarshipTitle: 'AICTE Pragati Scholarship for Girl Students',
    provider: 'All India Council for Technical Education (AICTE)',
    awardAmount: '₹50,000 / year',
    awardValueNumber: 50000,
    governmentLevel: 'central',
    stage: 'preparing_documents',
    portalName: 'National Scholarship Portal (NSP)',
    officialTrackingUrl: 'https://scholarships.gov.in',
    supportsLiveLookup: true,
    deadline: '2026-12-31',
    expectedDecisionDate: '2027-03-01',
    documentsReady: [
      'Class 10th and 12th Marksheets',
      'AICTE Approved Institution Admission Letter / Allotment Letter',
      'Tuition Fee receipt paid to the institution'
    ],
    totalDocuments: [
      'Class 10th and 12th Marksheets',
      'AICTE Approved Institution Admission Letter / Allotment Letter',
      'Tuition Fee receipt paid to the institution',
      'Annual Family Income Certificate issued by competent authority (below ₹8 Lakh)',
      'Aadhaar seeded bank account passbook copy',
      'Declaration by parents stating not more than two girl children are availing the scheme'
    ],
    notes: 'Parental declaration notarized. Need final signature from Dean by next Monday.',
    timeline: [
      {
        timestamp: '2026-10-20T16:00:00Z',
        stage: 'interested',
        note: 'Recommended for Engineering women scholars'
      },
      {
        timestamp: '2026-10-25T11:00:00Z',
        stage: 'preparing_documents',
        note: 'Tuition fee receipt downloaded from university ERP'
      }
    ]
  },
  {
    id: 'track-03',
    scholarshipId: 'state-karnataka-ssp',
    scholarshipTitle: 'Karnataka SSP Post-Matric & Vidyasiri Scholarship',
    provider: 'Social Welfare Department, Govt of Karnataka',
    awardAmount: '₹15,000 - ₹50,000 / year',
    awardValueNumber: 35000,
    governmentLevel: 'state',
    state: 'Karnataka',
    stage: 'interested',
    portalName: 'Karnataka SSP Post-Matric Portal',
    officialTrackingUrl: 'https://ssp.postmatric.karnataka.gov.in',
    supportsLiveLookup: true,
    deadline: '2026-11-30',
    documentsReady: [
      'Karnataka Kutumba Software Family ID',
      'Student College Registration Number / SATS ID / USN'
    ],
    totalDocuments: [
      'Karnataka Kutumba Software Family ID',
      'RD Number for Caste & Income Certificate (from Nadakacheri)',
      'Student College Registration Number / SATS ID / USN',
      'Aadhaar Number with NPCI Seeding Confirmation',
      'College Admission / Fee Receipt'
    ],
    notes: 'Need to retrieve Nadakacheri 15-digit RD number from Bangalore One center.',
    timeline: [
      {
        timestamp: '2026-11-01T09:30:00Z',
        stage: 'interested',
        note: 'Added from State Government recommendations'
      }
    ]
  }
];

const GrantlyContext = createContext<GrantlyContextType | undefined>(undefined);

export const GrantlyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('grantly_is_authenticated');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('grantly_is_authenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // 1. Profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('grantly_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STUDENT_PROFILE;
      }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('grantly_student_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const resetProfileToDemo = () => {
    setProfile(INITIAL_STUDENT_PROFILE);
  };

  const clearProfileToGuest = () => {
    setProfile({
      id: 'usr-guest-' + Date.now(),
      name: 'Guest Student',
      email: '',
      stateOfResidence: '',
      stateOfStudy: '',
      educationLevel: 'undergraduate',
      fieldOfStudy: 'Engineering & Technology',
      courseName: '',
      currentYear: '1st Year',
      discoveryPreference: 'both',
      preferredStates: []
    });
  };

  const login = (email: string, _password?: string) => {
    setIsAuthenticated(true);
    // If logging in with demo email, load demo profile
    if (email.includes('priya') || email.includes('student')) {
      setProfile(INITIAL_STUDENT_PROFILE);
    } else {
      setProfile(prev => ({
        ...prev,
        email: email,
        name: prev.name || email.split('@')[0]
      }));
    }
    return true;
  };

  const register = (profileData: Partial<StudentProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...profileData,
      id: 'usr-' + Date.now()
    }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.location.hash = '#/';
  };

  // 2. Saved scholarships
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('grantly_saved_ids');
    return saved ? JSON.parse(saved) : ['central-csss-moe', 'central-aicte-pragati', 'state-karnataka-ssp'];
  });

  useEffect(() => {
    localStorage.setItem('grantly_saved_ids', JSON.stringify(savedScholarshipIds));
  }, [savedScholarshipIds]);

  const toggleSaveScholarship = (scholarshipId: string) => {
    setSavedScholarshipIds(prev => {
      const exists = prev.includes(scholarshipId);
      if (exists) {
        return prev.filter(id => id !== scholarshipId);
      } else {
        const sch = SCHOLARSHIPS_DATA.find(s => s.id === scholarshipId);
        if (sch) {
          addNotification({
            title: 'Scholarship Bookmarked',
            message: `Saved "${sch.title}". You will receive deadline updates.`,
            type: 'system',
            scholarshipId: sch.id,
            actionUrl: '/saved'
          });
        }
        return [...prev, scholarshipId];
      }
    });
  };

  const isScholarshipSaved = (scholarshipId: string) => {
    return savedScholarshipIds.includes(scholarshipId);
  };

  // 3. Tracked applications
  const [trackedApplications, setTrackedApplications] = useState<TrackedApplication[]>(() => {
    const saved = localStorage.getItem('grantly_tracked_applications');
    return saved ? JSON.parse(saved) : INITIAL_TRACKED_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('grantly_tracked_applications', JSON.stringify(trackedApplications));
  }, [trackedApplications]);

  const addToTracker = (scholarship: Scholarship, initialStage: TrackingStage = 'interested') => {
    const existing = trackedApplications.find(t => t.scholarshipId === scholarship.id);
    if (existing) {
      return;
    }

    const newTrack: TrackedApplication = {
      id: 'track-' + Date.now(),
      scholarshipId: scholarship.id,
      scholarshipTitle: scholarship.title,
      provider: scholarship.provider,
      awardAmount: scholarship.awardAmount,
      awardValueNumber: scholarship.awardValueNumber,
      governmentLevel: scholarship.governmentLevel,
      state: scholarship.state,
      stage: initialStage,
      portalName: scholarship.officialPortalName,
      officialTrackingUrl: scholarship.officialApplyUrl,
      supportsLiveLookup: scholarship.supportsLiveLookup,
      deadline: scholarship.deadline,
      documentsReady: [],
      totalDocuments: scholarship.requiredDocuments,
      notes: `Started tracking via Grantly on ${new Date().toLocaleDateString()}`,
      timeline: [
        {
          timestamp: new Date().toISOString(),
          stage: initialStage,
          note: `Added to tracking under stage: ${initialStage.replace('_', ' ')}`
        }
      ]
    };

    setTrackedApplications(prev => [newTrack, ...prev]);

    addNotification({
      title: 'Added to Application Tracker',
      message: `Now tracking "${scholarship.title}" under ${initialStage.replace('_', ' ')}. Keep track of documents & deadlines.`,
      type: 'status_update',
      scholarshipId: scholarship.id,
      actionUrl: '/tracker'
    });
  };

  const updateTrackedStage = (trackId: string, newStage: TrackingStage, note?: string) => {
    setTrackedApplications(prev => prev.map(t => {
      if (t.id === trackId) {
        if (newStage === 'awarded') {
          // Trigger celebratory confetti!
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // Ignore if confetti fails
          }
        }

        const stageLabel = newStage.replace('_', ' ').toUpperCase();
        return {
          ...t,
          stage: newStage,
          timeline: [
            ...t.timeline,
            {
              timestamp: new Date().toISOString(),
              stage: newStage,
              note: note || `Status changed to ${stageLabel}`
            }
          ]
        };
      }
      return t;
    }));
  };

  const updateTrackedApplication = (trackId: string, updates: Partial<TrackedApplication>) => {
    setTrackedApplications(prev => prev.map(t => t.id === trackId ? { ...t, ...updates } : t));
  };

  const toggleDocumentReady = (trackId: string, documentName: string) => {
    setTrackedApplications(prev => prev.map(t => {
      if (t.id === trackId) {
        const isReady = t.documentsReady.includes(documentName);
        const newReady = isReady
          ? t.documentsReady.filter(d => d !== documentName)
          : [...t.documentsReady, documentName];
        return {
          ...t,
          documentsReady: newReady
        };
      }
      return t;
    }));
  };

  const removeFromTracker = (trackId: string) => {
    setTrackedApplications(prev => prev.filter(t => t.id !== trackId));
  };

  const isScholarshipTracked = (scholarshipId: string) => {
    return trackedApplications.some(t => t.scholarshipId === scholarshipId);
  };

  // 4. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('grantly_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('grantly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: 'notif-' + Date.now(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newItem, ...prev]);
  };

  // 5. Notification Settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('grantly_notification_settings');
    return saved ? JSON.parse(saved) : defaultNotificationSettings;
  });

  useEffect(() => {
    localStorage.setItem('grantly_notification_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  // 6. Filter State
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // 7. Modals
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);

  const [isLiveLookupModalOpen, setIsLiveLookupModalOpen] = useState(false);
  const [selectedTrackForLiveLookup, setSelectedTrackForLiveLookup] = useState<TrackedApplication | null>(null);

  const openScholarshipDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const closeScholarshipDetails = () => {
    setSelectedScholarship(null);
  };

  const openLiveLookupModal = (track: TrackedApplication) => {
    setSelectedTrackForLiveLookup(track);
    setIsLiveLookupModalOpen(true);
  };

  const closeLiveLookupModal = () => {
    setSelectedTrackForLiveLookup(null);
    setIsLiveLookupModalOpen(false);
  };

  return (
    <GrantlyContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,

        profile,
        updateProfile,
        resetProfileToDemo,
        clearProfileToGuest,

        scholarships: SCHOLARSHIPS_DATA,

        savedScholarshipIds,
        toggleSaveScholarship,
        isScholarshipSaved,

        trackedApplications,
        addToTracker,
        updateTrackedStage,
        updateTrackedApplication,
        toggleDocumentReady,
        removeFromTracker,
        isScholarshipTracked,

        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,
        addNotification,

        notificationSettings,
        updateNotificationSettings,

        filters,
        updateFilter,
        resetFilters,

        selectedScholarship,
        openScholarshipDetails,
        closeScholarshipDetails,

        isProfileModalOpen,
        setIsProfileModalOpen,

        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,

        isNotificationSettingsOpen,
        setIsNotificationSettingsOpen,

        isLiveLookupModalOpen,
        selectedTrackForLiveLookup,
        openLiveLookupModal,
        closeLiveLookupModal
      }}
    >
      {children}
    </GrantlyContext.Provider>
  );
};

export const useGrantly = () => {
  const context = useContext(GrantlyContext);
  if (!context) {
    throw new Error('useGrantly must be used within a GrantlyProvider');
  }
  return context;
};
