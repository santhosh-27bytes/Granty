export type GovernmentLevel = 'central' | 'state';

export type EducationLevel = 
  | 'school_secondary'       // Class 9-10
  | 'school_higher_sec'      // Class 11-12
  | 'undergraduate'          // B.Tech, MBBS, B.Sc, B.Com, BA, etc.
  | 'postgraduate'           // M.Tech, M.Sc, MBA, MA, etc.
  | 'doctoral'               // Ph.D, Post-Doc
  | 'diploma'                // Polytechnic & Diploma
  | 'all';

export type FieldOfStudy =
  | 'Engineering & Technology'
  | 'Medical & Health Sciences'
  | 'Pure & Applied Sciences'
  | 'Commerce & Management'
  | 'Humanities & Social Sciences'
  | 'Law & Legal Studies'
  | 'Agriculture & Allied Sciences'
  | 'Vocational & Polytechnic'
  | 'Any / All Streams';

export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority';

export type ScholarshipStatus = 'open' | 'upcoming' | 'closed';

export type TrackingStage = 
  | 'interested'
  | 'preparing_documents'
  | 'submitted'
  | 'awaiting_decision'
  | 'awarded'
  | 'not_selected';

export interface EligibilityRules {
  minPercentage?: number;
  maxAnnualIncome?: number; // in INR
  allowedCategories?: SocialCategory[];
  allowedGenders?: ('female' | 'male' | 'all')[];
  allowedEducationLevels?: EducationLevel[];
  allowedStates?: string[]; // 'All India' or specific states
  allowedFields?: string[];
  disabilityOnly?: boolean;
  singleGirlChildOnly?: boolean;
  firstGenGraduateOnly?: boolean;
  specialCondition?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string; // e.g. Ministry of Education, Karnataka Social Welfare
  governmentLevel: GovernmentLevel;
  state?: string; // Applicable state if state government
  educationLevels: EducationLevel[];
  fieldsOfStudy: string[];
  awardAmount: string; // e.g. "₹50,000 / year"
  awardValueNumber: number; // numeric approximation for sorting and charts
  benefits: {
    tuitionFee?: string;
    maintenanceAllowance?: string;
    bookGrant?: string;
    specialGrant?: string;
    other?: string;
  };
  deadline: string; // YYYY-MM-DD
  status: ScholarshipStatus;
  eligibilityRules: EligibilityRules;
  requiredDocuments: string[];
  applicationSteps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  officialApplyUrl: string;
  officialPortalName: string;
  officialNotificationUrl: string;
  lastCheckedDate: string; // ISO date
  tags: string[];
  description: string;
  supportsLiveLookup?: boolean;
  portalLookupCode?: string; // e.g. 'NSP', 'MAHADBT', 'SSP_KA'
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  stateOfResidence: string;
  stateOfStudy: string;
  educationLevel: EducationLevel;
  fieldOfStudy: string;
  courseName: string;
  currentYear: string;
  // Optional profile fields for granular eligibility
  socialCategory?: SocialCategory;
  annualFamilyIncome?: number; // e.g. 200000
  gender?: 'female' | 'male' | 'other';
  isPersonWithDisability?: boolean;
  disabilityPercentage?: number;
  academicScorePercentage?: number; // e.g. 85.5
  isSingleGirlChild?: boolean;
  isFirstGenGraduate?: boolean;
  // Discovery preferences
  discoveryPreference: 'central' | 'state' | 'both';
  preferredStates: string[];
}

export interface TrackedApplication {
  id: string; // unique tracking ID
  scholarshipId: string;
  scholarshipTitle: string;
  provider: string;
  awardAmount: string;
  awardValueNumber: number;
  governmentLevel: GovernmentLevel;
  state?: string;
  stage: TrackingStage;
  applicationIdNumber?: string;
  portalName: string;
  officialTrackingUrl?: string;
  supportsLiveLookup?: boolean;
  appliedDate?: string;
  deadline: string;
  expectedDecisionDate?: string;
  documentsReady: string[];
  totalDocuments: string[];
  notes?: string;
  timeline: {
    timestamp: string;
    stage: TrackingStage;
    note: string;
  }[];
  liveVerificationStatus?: {
    isVerified: boolean;
    lastChecked: string;
    currentOfficialStage: string;
    remarks: string;
    officerVerification: string;
    bankValidation: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'matching_added' | 'application_opened' | 'deadline_approaching' | 'status_update' | 'system';
  timestamp: string;
  scholarshipId?: string;
  read: boolean;
  actionUrl?: string;
}

export interface NotificationSettings {
  inApp: boolean;
  email: boolean;
  emailAddress: string;
  push: boolean;
  notifyOnMatchingAdded: boolean;
  notifyOnAppOpen: boolean;
  notifyOnDeadlineApproaching: boolean;
  deadlineReminderDays: number[]; // e.g. [7, 3, 1]
}

export interface MatchAnalysis {
  matchPercentage: number;
  isEligible: boolean;
  reasons: string[];
  missingDetails: string[];
  cautionNotes: string[];
}
