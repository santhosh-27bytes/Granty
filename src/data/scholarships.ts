import { Scholarship } from '../types';

export const INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const EDUCATION_LEVEL_LABELS: Record<string, string> = {
  all: 'All Education Levels',
  school_secondary: 'Secondary School (Class 9-10)',
  school_higher_sec: 'Higher Secondary (Class 11-12)',
  undergraduate: 'Undergraduate (UG / B.Tech / MBBS / B.Sc / BA)',
  postgraduate: 'Postgraduate (PG / M.Tech / M.Sc / MBA)',
  doctoral: 'Doctoral / Ph.D / Research',
  diploma: 'Polytechnic & Diploma'
};

export const FIELD_OPTIONS = [
  'Engineering & Technology',
  'Medical & Health Sciences',
  'Pure & Applied Sciences',
  'Commerce & Management',
  'Humanities & Social Sciences',
  'Law & Legal Studies',
  'Agriculture & Allied Sciences',
  'Vocational & Polytechnic',
  'Any / All Streams'
];

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'central-csss-moe',
    title: 'Central Sector Scheme of Scholarships for College and University Students (CSSS)',
    provider: 'Department of Higher Education, Ministry of Education (MoE), Govt of India',
    governmentLevel: 'central',
    educationLevels: ['undergraduate', 'postgraduate'],
    fieldsOfStudy: ['Any / All Streams', 'Engineering & Technology', 'Medical & Health Sciences', 'Pure & Applied Sciences', 'Commerce & Management', 'Humanities & Social Sciences'],
    awardAmount: '₹12,000 - ₹20,000 / year',
    awardValueNumber: 20000,
    benefits: {
      tuitionFee: '₹12,000 per annum for first 3 years of degree level courses',
      maintenanceAllowance: '₹20,000 per annum for 4th & 5th year / postgraduate level',
      other: 'Disbursed directly into student Aadhaar-seeded bank account via PFMS DBT'
    },
    deadline: '2026-12-15',
    status: 'open',
    eligibilityRules: {
      minPercentage: 80,
      maxAnnualIncome: 450000,
      allowedEducationLevels: ['undergraduate', 'postgraduate'],
      allowedStates: ['All India'],
      specialCondition: 'Above 80th percentile of successful candidates in the relevant stream from respective Class 12 Board'
    },
    requiredDocuments: [
      'Aadhaar Card copy',
      'Class 12th Board Marksheet with Roll No.',
      'Income Certificate issued by Revenue Authority (Tahsildar / SDO)',
      'Bonafide Student Certificate issued by Head of Institution',
      'Active Bank Passbook copy with IFSC and Aadhaar seeding proof',
      'College Admission Fee Receipt'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'One-Time Registration (OTR) on NSP',
        description: 'Create an OTR account on the National Scholarship Portal (NSP) using your Aadhaar and mobile number.'
      },
      {
        stepNumber: 2,
        title: 'Fill Application Details',
        description: 'Provide Class 12 board credentials, college admission details, and verify parental income documentation.'
      },
      {
        stepNumber: 3,
        title: 'Institute Verification (Level 1)',
        description: 'Your college/university Nodal Officer verifies your physical admission and records on the portal.'
      },
      {
        stepNumber: 4,
        title: 'State Nodal Officer Merit Generation (Level 2)',
        description: 'State Education Board generates merit quota list based on 80th percentile cutoff.'
      },
      {
        stepNumber: 5,
        title: 'Direct Benefit Transfer (PFMS)',
        description: 'Amount credited directly into your Aadhaar-linked savings account via PFMS.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://www.education.gov.in/scholarships-education-loan-0',
    lastCheckedDate: '2026-11-05',
    tags: ['Merit-based', 'All Streams', 'Direct Bank Transfer', 'Central Govt'],
    description: 'A prestigious national scholarship aimed at supporting economically weaker students scoring above the 80th percentile in Class 12 to pursue regular undergraduate and postgraduate degrees.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'central-aicte-pragati',
    title: 'AICTE Pragati Scholarship for Girl Students',
    provider: 'All India Council for Technical Education (AICTE), Ministry of Education',
    governmentLevel: 'central',
    educationLevels: ['undergraduate', 'diploma'],
    fieldsOfStudy: ['Engineering & Technology', 'Vocational & Polytechnic'],
    awardAmount: '₹50,000 / year',
    awardValueNumber: 50000,
    benefits: {
      tuitionFee: 'Up to ₹50,000 per annum towards college fee',
      bookGrant: 'Includes allowance for purchase of books, equipment, laptops and software',
      other: 'Awarded for maximum 4 years for Degree or 3 years for Diploma'
    },
    deadline: '2026-12-31',
    status: 'open',
    eligibilityRules: {
      allowedGenders: ['female'],
      maxAnnualIncome: 800000,
      allowedEducationLevels: ['undergraduate', 'diploma'],
      allowedFields: ['Engineering & Technology', 'Vocational & Polytechnic'],
      allowedStates: ['All India'],
      specialCondition: 'Admitted to 1st year of Degree/Diploma course or 2nd year through lateral entry in an AICTE approved institution. Max 2 girls per family.'
    },
    requiredDocuments: [
      'Class 10th and 12th Marksheets',
      'AICTE Approved Institution Admission Letter / Allotment Letter',
      'Tuition Fee receipt paid to the institution',
      'Annual Family Income Certificate issued by competent authority (below ₹8 Lakh)',
      'Aadhaar seeded bank account passbook copy',
      'Declaration by parents stating not more than two girl children are availing the scheme'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'NSP Registration',
        description: 'Register on NSP portal with Aadhaar authentication and choose AICTE Pragati Scheme.'
      },
      {
        stepNumber: 2,
        title: 'Upload Certificates',
        description: 'Upload valid income certificate, college fee receipt, and AICTE seat allotment.'
      },
      {
        stepNumber: 3,
        title: 'Institution Online Scrutiny',
        description: 'The college Principal/Nodal officer verifies enrollment in an AICTE-approved engineering branch.'
      },
      {
        stepNumber: 4,
        title: 'AICTE Approval & Payment',
        description: 'Final merit release by AICTE and disbursement of ₹50,000 directly to the student.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://www.aicte-india.org/schemes/students-development-schemes/pragati',
    lastCheckedDate: '2026-11-04',
    tags: ['Women in STEM', 'Engineering', 'AICTE', 'Central Govt'],
    description: 'Empowers meritorious young women admitted into technical Degree and Diploma programmes across India with ₹50,000 per year towards tuition and learning equipment.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'central-aicte-saksham',
    title: 'AICTE Saksham Scholarship Scheme for Specially-Abled Students',
    provider: 'All India Council for Technical Education (AICTE)',
    governmentLevel: 'central',
    educationLevels: ['undergraduate', 'diploma'],
    fieldsOfStudy: ['Engineering & Technology', 'Vocational & Polytechnic'],
    awardAmount: '₹50,000 / year',
    awardValueNumber: 50000,
    benefits: {
      tuitionFee: '₹50,000 per annum for every year of study',
      specialGrant: 'Support for assistive devices, software, and study aids'
    },
    deadline: '2026-12-31',
    status: 'open',
    eligibilityRules: {
      disabilityOnly: true,
      maxAnnualIncome: 800000,
      allowedEducationLevels: ['undergraduate', 'diploma'],
      allowedFields: ['Engineering & Technology', 'Vocational & Polytechnic'],
      allowedStates: ['All India'],
      specialCondition: 'Specially-abled students having disability of not less than 40% admitted to AICTE approved technical institution'
    },
    requiredDocuments: [
      'Disability Certificate issued by Competent Medical Authority (min 40% disability)',
      'Admission proof in AICTE approved college',
      'Family Income Certificate (below ₹8 LPA)',
      'Class 10 & 12 / ITI Marksheet',
      'Bank Account Passbook with Aadhaar linkage'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Portal Signup',
        description: 'Submit application via National Scholarship Portal under AICTE Saksham tab.'
      },
      {
        stepNumber: 2,
        title: 'Disability & Admission Verification',
        description: 'Institution verifies medical board certificate and course registration.'
      },
      {
        stepNumber: 3,
        title: 'Grant Allocation',
        description: 'Direct disbursement of ₹50,000 annual scholarship into bank account.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://www.aicte-india.org/schemes/students-development-schemes/saksham',
    lastCheckedDate: '2026-11-06',
    tags: ['PwD / Divyangjan', 'Technical Education', 'Central Govt'],
    description: 'Financial assistance designed to encourage differently-abled students with 40%+ disability to complete technical education without financial hurdles.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'central-pmrf-research',
    title: 'Prime Minister’s Research Fellowship (PMRF)',
    provider: 'Ministry of Education, National Coordinating Institute (IIT Madras / IIT Delhi)',
    governmentLevel: 'central',
    educationLevels: ['doctoral'],
    fieldsOfStudy: ['Engineering & Technology', 'Pure & Applied Sciences', 'Agriculture & Allied Sciences'],
    awardAmount: '₹70,000 - ₹80,000 / month + ₹2 Lakh Grant/year',
    awardValueNumber: 1160000,
    benefits: {
      maintenanceAllowance: '₹70,000/mo for 1st-2nd yr, ₹75,000/mo for 3rd yr, ₹80,000/mo for 4th-5th yr',
      specialGrant: 'Research Contingency grant of ₹2,00,000 per year (total ₹10 Lakhs over 5 years)'
    },
    deadline: '2027-01-20',
    status: 'upcoming',
    eligibilityRules: {
      minPercentage: 80,
      allowedEducationLevels: ['doctoral'],
      allowedFields: ['Engineering & Technology', 'Pure & Applied Sciences', 'Agriculture & Allied Sciences'],
      allowedStates: ['All India'],
      specialCondition: 'CGPA of at least 8.0 or qualifying GATE score; admitted into Ph.D. program in PMRF granting institutions (IITs, IISc, IISERs, select Central Universities).'
    },
    requiredDocuments: [
      'Undergraduate and Postgraduate Transcripts & Degree Certificates',
      'Valid GATE / UGC-CSIR NET Scorecard (if applicable)',
      'Detailed Research Proposal / Statement of Purpose (SOP)',
      'Nomination Letter from Host Doctoral Institution Nodal Officer',
      'Letters of Recommendation from Academic Advisors'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Institutional Nomination',
        description: 'Host PhD institution nominates eligible doctoral candidates under Direct Entry or Lateral Entry channel.'
      },
      {
        stepNumber: 2,
        title: 'Project Proposal Review',
        description: 'National Discipline Expert Committee evaluates the research abstract and publications.'
      },
      {
        stepNumber: 3,
        title: 'National Selection & Onboarding',
        description: 'Selected fellows receive prime ministerial fellowship orders and research allocation.'
      }
    ],
    officialApplyUrl: 'https://www.pmrf.in',
    officialPortalName: 'PMRF National Portal',
    officialNotificationUrl: 'https://www.pmrf.in/guidelines',
    lastCheckedDate: '2026-11-03',
    tags: ['Ph.D Fellowship', 'High Value', 'Research', 'Central Govt'],
    description: 'Premier national doctoral fellowship for high-impact science and technology research at premier institutes with monthly stipend up to ₹80,000 and ₹2L annual research contingency.',
    supportsLiveLookup: false
  },
  {
    id: 'central-inspire-she',
    title: 'INSPIRE Scholarship for Higher Education (SHE)',
    provider: 'Department of Science and Technology (DST), Govt. of India',
    governmentLevel: 'central',
    educationLevels: ['undergraduate', 'postgraduate'],
    fieldsOfStudy: ['Pure & Applied Sciences'],
    awardAmount: '₹80,000 / year (₹60,000 cash + ₹20,000 project mentorship)',
    awardValueNumber: 80000,
    benefits: {
      tuitionFee: '₹60,000 per annum paid directly to scholar (@ ₹5,000 per month)',
      specialGrant: '₹20,000 per annum mentorship grant for summer research project at recognized research lab'
    },
    deadline: '2026-12-10',
    status: 'open',
    eligibilityRules: {
      minPercentage: 85,
      allowedEducationLevels: ['undergraduate', 'postgraduate'],
      allowedFields: ['Pure & Applied Sciences'],
      allowedStates: ['All India'],
      specialCondition: 'Top 1% in Class 12 board exam and enrolled in B.Sc. / B.S. / Int. M.Sc. in Natural & Basic Sciences or top ranks in JEE/NEET/KVPY/NISER.'
    },
    requiredDocuments: [
      'Class 12th Board Marksheet showing Top 1% ranking',
      'Endorsement Certificate from College/University Principal',
      'SBI Bank Account Details (Aadhaar linked)',
      'Caste/Community Certificate (if applicable)',
      'Summer Project Report (for subsequent year renewal)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'INSPIRE Online Portal Registration',
        description: 'Create student account on the DST INSPIRE web portal using registered email.'
      },
      {
        stepNumber: 2,
        title: 'Upload Endorsement Form',
        description: 'Have college Principal sign the official endorsement form certifying enrollment in pure sciences.'
      },
      {
        stepNumber: 3,
        title: 'Merit Assessment & Sanction Order',
        description: 'DST releases provisional offer letter followed by DBT disbursement.'
      }
    ],
    officialApplyUrl: 'https://online-inspire.gov.in',
    officialPortalName: 'DST INSPIRE Portal',
    officialNotificationUrl: 'https://online-inspire.gov.in/Announcement',
    lastCheckedDate: '2026-11-06',
    tags: ['Basic Sciences', 'Research Mentorship', 'DST', 'Central Govt'],
    description: 'Designed to attract talented young minds to study natural and basic sciences at university level, providing ₹80,000 per year including summer research project grants.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'central-post-matric-sc',
    title: 'Centrally Sponsored Post Matric Scholarship for SC Students',
    provider: 'Ministry of Social Justice and Empowerment (MSJE), Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_higher_sec', 'undergraduate', 'postgraduate', 'doctoral', 'diploma'],
    fieldsOfStudy: ['Any / All Streams'],
    awardAmount: 'Full Tuition Fee Reimbursement + up to ₹13,500 / year Maintenance',
    awardValueNumber: 65000,
    benefits: {
      tuitionFee: '100% compulsory non-refundable fees reimbursed as approved by State Fee Regulatory Committee',
      maintenanceAllowance: 'Monthly maintenance allowance up to ₹13,500/year based on course category',
      bookGrant: 'Special book and study material grants for professional courses'
    },
    deadline: '2027-01-15',
    status: 'open',
    eligibilityRules: {
      allowedCategories: ['SC'],
      maxAnnualIncome: 250000,
      allowedEducationLevels: ['school_higher_sec', 'undergraduate', 'postgraduate', 'doctoral', 'diploma'],
      allowedStates: ['All India'],
      specialCondition: 'Belonging to Scheduled Caste (SC) with total parental income from all sources not exceeding ₹2,50,000 per annum.'
    },
    requiredDocuments: [
      'Caste Certificate authenticated by competent Tahsildar / Sub-Divisional Officer',
      'Annual Income Certificate with QR verification',
      'Previous qualifying examination marksheet',
      'College Fee Structure & Admission Receipt',
      'Aadhaar-NPCI mapped Bank Passbook copy'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'NSP / State Portal Registration',
        description: 'Apply on NSP or through your state social welfare portal mapped with Central DBT.'
      },
      {
        stepNumber: 2,
        title: 'Aadhaar Demographic & Income Verification',
        description: 'Real-time API check against state caste and income database.'
      },
      {
        stepNumber: 3,
        title: 'Central 60% & State 40% Share Release',
        description: 'Fund shared between Central and State govts and credited directly to student bank.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://socialjustice.gov.in/schemes/post-matric-scholarship-sc',
    lastCheckedDate: '2026-11-05',
    tags: ['SC Welfare', 'Tuition Reimbursement', 'Social Justice', 'Central Govt'],
    description: 'Flagship social welfare scheme covering entire compulsory non-refundable tuition fees and generous monthly maintenance for SC students pursuing post-matriculation studies.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'state-karnataka-ssp',
    title: 'State Scholarship Portal (SSP) Post-Matric Scholarship & Vidyasiri',
    provider: 'Social Welfare & Backward Classes Welfare Dept, Govt of Karnataka',
    governmentLevel: 'state',
    state: 'Karnataka',
    educationLevels: ['undergraduate', 'postgraduate', 'diploma'],
    fieldsOfStudy: ['Any / All Streams', 'Engineering & Technology', 'Medical & Health Sciences', 'Pure & Applied Sciences'],
    awardAmount: '₹15,000 - ₹50,000 / year (Fee Waiver + ₹1,500/mo Hostel / Food)',
    awardValueNumber: 35000,
    benefits: {
      tuitionFee: 'Direct College Fee reimbursement as determined by KEA / CET / PGCET',
      maintenanceAllowance: 'Vidyasiri monthly food and accommodation allowance of ₹1,500/month for non-hostelites',
      other: 'Special incentive for distinction holders'
    },
    deadline: '2026-11-30',
    status: 'open',
    eligibilityRules: {
      allowedStates: ['Karnataka'],
      allowedCategories: ['SC', 'ST', 'OBC', 'EWS', 'Minority'],
      maxAnnualIncome: 250000,
      allowedEducationLevels: ['undergraduate', 'postgraduate', 'diploma'],
      specialCondition: 'Resident/Domicile of Karnataka studying in recognized colleges in Karnataka. Must have Kutumba ID.'
    },
    requiredDocuments: [
      'Karnataka Kutumba Software Family ID',
      'RD Number for Caste & Income Certificate (from Nadakacheri)',
      'Student College Registration Number / SATS ID / USN',
      'Aadhaar Number with NPCI Seeding Confirmation',
      'College Admission / Fee Receipt'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Create SSP Student Account with Kutumba ID',
        description: 'Sign in to Karnataka SSP Post-Matric using your Kutumba ID and Aadhaar number.'
      },
      {
        stepNumber: 2,
        title: 'Fetch Caste & Income from Nadakacheri',
        description: 'Enter your 15-digit RD number; data is automatically fetched without uploading physical papers.'
      },
      {
        stepNumber: 3,
        title: 'College E-Attestation',
        description: 'Submit your USN/Roll No for e-Attestation officer verification at your college.'
      },
      {
        stepNumber: 4,
        title: 'Direct Benefit Credit (K2 System)',
        description: 'State treasury credits maintenance and fee directly through Khajane II portal.'
      }
    ],
    officialApplyUrl: 'https://ssp.postmatric.karnataka.gov.in',
    officialPortalName: 'Karnataka SSP Post-Matric Portal',
    officialNotificationUrl: 'https://sw.kar.nic.in',
    lastCheckedDate: '2026-11-06',
    tags: ['Karnataka State', 'Vidyasiri', 'OBC/SC/ST/Minority', 'Kutumba Integrated'],
    description: 'Comprehensive Karnataka state scholarship seamlessly connected to Kutumba and Nadakacheri systems, covering fee concession and Vidyasiri food/accommodation allowances.',
    supportsLiveLookup: true,
    portalLookupCode: 'SSP_KA'
  },
  {
    id: 'state-mahadbt-shahu-maharaj',
    title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)',
    provider: 'Directorate of Higher Education (DHE), Govt of Maharashtra',
    governmentLevel: 'state',
    state: 'Maharashtra',
    educationLevels: ['undergraduate', 'postgraduate', 'diploma'],
    fieldsOfStudy: ['Engineering & Technology', 'Medical & Health Sciences', 'Commerce & Management', 'Pure & Applied Sciences', 'Law & Legal Studies'],
    awardAmount: '50% to 100% Tuition & Exam Fee Concession',
    awardValueNumber: 48000,
    benefits: {
      tuitionFee: '50% of tuition fee for CAP admitted students (100% for government institutions)',
      other: 'Exam fees reimbursed directly to the educational institution'
    },
    deadline: '2026-12-25',
    status: 'open',
    eligibilityRules: {
      allowedStates: ['Maharashtra'],
      maxAnnualIncome: 800000,
      allowedEducationLevels: ['undergraduate', 'postgraduate', 'diploma'],
      specialCondition: 'Resident of Maharashtra with Domicile Certificate, admitted through Centralized Admission Process (CAP), family income below ₹8 Lakh.'
    },
    requiredDocuments: [
      'Maharashtra State Domicile Certificate',
      'Tehsildar issued Income Certificate (previous financial year)',
      'CAP Allotment Letter for professional/higher courses',
      'Class 10th and 12th Marksheet',
      'Ration Card / Family Declaration (not more than 2 beneficiaries in family)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'MahaDBT Portal Login',
        description: 'Login on Aaple Sarkar MahaDBT with Aadhaar OTP authentication.'
      },
      {
        stepNumber: 2,
        title: 'Choose Directorate of Higher Education Scheme',
        description: 'Select Rajarshi Shahu Maharaj EBC scheme and fill CAP registration number.'
      },
      {
        stepNumber: 3,
        title: 'College Scrutiny & Joint Director Approval',
        description: 'Scrutiny by college desk followed by Regional Joint Director clearance.'
      },
      {
        stepNumber: 4,
        title: 'First & Second Installment Disbursal',
        description: 'Two equal installments credited to student and college accounts.'
      }
    ],
    officialApplyUrl: 'https://mahadbt.maharashtra.gov.in',
    officialPortalName: 'Aaple Sarkar MahaDBT Portal',
    officialNotificationUrl: 'https://dhe.maharashtra.gov.in',
    lastCheckedDate: '2026-11-04',
    tags: ['Maharashtra State', 'EBC Fee Concession', 'CAP Admitted', 'MahaDBT'],
    description: 'Maharashtra state scheme providing up to 50%-100% tuition and examination fee concession for economically backward category (EBC) students in recognized degree colleges.',
    supportsLiveLookup: true,
    portalLookupCode: 'MAHADBT'
  },
  {
    id: 'state-west-bengal-svmcm',
    title: 'Swami Vivekananda Merit-cum-Means Scholarship Scheme (SVMCM)',
    provider: 'Higher Education Department, Government of West Bengal',
    governmentLevel: 'state',
    state: 'West Bengal',
    educationLevels: ['school_higher_sec', 'undergraduate', 'postgraduate', 'doctoral', 'diploma'],
    fieldsOfStudy: ['Any / All Streams', 'Engineering & Technology', 'Medical & Health Sciences', 'Pure & Applied Sciences'],
    awardAmount: '₹12,000 - ₹60,000 / year (₹1,000 - ₹5,000 / month)',
    awardValueNumber: 30000,
    benefits: {
      maintenanceAllowance: 'UG Arts/Commerce: ₹1,000/mo; UG Science: ₹1,500/mo; Engineering: ₹5,000/mo; Medical: ₹5,000/mo',
      other: 'Special quota for Kanyashree (K3) girl applicants pursuing postgraduation'
    },
    deadline: '2026-12-15',
    status: 'open',
    eligibilityRules: {
      minPercentage: 60,
      maxAnnualIncome: 250000,
      allowedStates: ['West Bengal'],
      allowedEducationLevels: ['school_higher_sec', 'undergraduate', 'postgraduate', 'doctoral', 'diploma'],
      specialCondition: 'Permanent resident of West Bengal scoring at least 60% in Madhyamik / Higher Secondary / Graduation.'
    },
    requiredDocuments: [
      'Madhyamik / HS / Degree Exam Marksheet (both sides)',
      'Family Income Certificate issued by BDO / SDO / Joint BDO',
      'West Bengal Domicile proof (Aadhaar / Voter card / Ration card)',
      'Admission fee receipt of current course',
      'First page of Bank Passbook with IFSC and Account No.'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'SVMCM 4.0 Registration',
        description: 'Register with qualifying exam roll number and year of passing.'
      },
      {
        stepNumber: 2,
        title: 'Application Form Submission',
        description: 'Enter academic marks, institution details, and upload scanned documents.'
      },
      {
        stepNumber: 3,
        title: 'HOI (Head of Institution) Verification',
        description: 'Principal / Head of Institution verifies physical documents and approves online.'
      },
      {
        stepNumber: 4,
        title: 'DI / Directorate Approval & Fund Disbursement',
        description: 'Direct fund transfer via WB Treasury IFMS system.'
      }
    ],
    officialApplyUrl: 'https://svmcm.wbhed.gov.in',
    officialPortalName: 'West Bengal SVMCM 4.0 Portal',
    officialNotificationUrl: 'https://banglaruchchashiksha.wb.gov.in',
    lastCheckedDate: '2026-11-05',
    tags: ['West Bengal State', 'Merit-cum-Means', 'Kanyashree K3', 'Banglar Uchchashiksha'],
    description: 'Premier West Bengal merit-cum-means scholarship helping meritorious students from low-income families pursue higher secondary, college, medical, and engineering education.',
    supportsLiveLookup: false
  },
  {
    id: 'state-up-saksham-scholarship',
    title: 'Uttar Pradesh Post-Matric Scholarship & Fee Reimbursement Scheme',
    provider: 'Social Welfare & Backward Classes Dept, Govt of Uttar Pradesh',
    governmentLevel: 'state',
    state: 'Uttar Pradesh',
    educationLevels: ['school_higher_sec', 'undergraduate', 'postgraduate', 'diploma'],
    fieldsOfStudy: ['Any / All Streams'],
    awardAmount: 'Complete Fee Reimbursement + ₹9,000 - ₹25,000 Allowance',
    awardValueNumber: 38000,
    benefits: {
      tuitionFee: 'Full reimbursement of government-prescribed non-refundable college fees',
      maintenanceAllowance: 'Monthly scholarship allowance credited directly to Jan Dhan / savings account'
    },
    deadline: '2026-12-20',
    status: 'open',
    eligibilityRules: {
      allowedStates: ['Uttar Pradesh'],
      maxAnnualIncome: 250000, // ₹2.5L for SC/ST, ₹2.0L for General/OBC/Minority
      allowedEducationLevels: ['school_higher_sec', 'undergraduate', 'postgraduate', 'diploma'],
      specialCondition: 'Resident of Uttar Pradesh enrolled in UP government recognized degree/diploma institutions.'
    },
    requiredDocuments: [
      'UP Caste & Income Certificate (verified on Edistrict UP)',
      'Domicile Certificate of Uttar Pradesh',
      'Class 10th and 12th Roll numbers',
      'College Fee Receipt & Current Year Course Registration',
      'Bank Account linked to Aadhaar (NPCI active)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'UP Scholarship Portal Registration',
        description: 'Create student registration on scholarship.up.gov.in with high school details.'
      },
      {
        stepNumber: 2,
        title: 'DigiLocker Integration & E-KYC',
        description: 'Authenticate identity and certificates through DigiLocker linkage.'
      },
      {
        stepNumber: 3,
        title: 'Submit Hardcopy to College',
        description: 'Submit printed form along with self-attested documents to the college counter.'
      },
      {
        stepNumber: 4,
        title: 'District Scholarship Committee (DSC) Approval',
        description: 'District Social Welfare Officer verifies credentials for payment generation.'
      }
    ],
    officialApplyUrl: 'https://scholarship.up.gov.in',
    officialPortalName: 'UP Scholarship Saksham Portal',
    officialNotificationUrl: 'https://scholarship.up.gov.in/index.aspx',
    lastCheckedDate: '2026-11-06',
    tags: ['Uttar Pradesh State', 'Fee Reimbursement', 'DigiLocker Linked', 'All Categories'],
    description: 'Comprehensive financial support covering college tuition and monthly maintenance for students studying across Uttar Pradesh universities and technical colleges.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'state-tn-higher-ed-pudhumaipenn',
    title: 'Moovalur Ramamirtham Ammaiyar Higher Education Scheme (Pudhumai Penn)',
    provider: 'Social Welfare & Women Empowerment Department, Government of Tamil Nadu',
    governmentLevel: 'state',
    state: 'Tamil Nadu',
    educationLevels: ['undergraduate', 'diploma'],
    fieldsOfStudy: ['Any / All Streams', 'Engineering & Technology', 'Medical & Health Sciences', 'Commerce & Management', 'Pure & Applied Sciences'],
    awardAmount: '₹1,000 / month (₹12,000 / year direct cash deposit)',
    awardValueNumber: 12000,
    benefits: {
      maintenanceAllowance: '₹1,000 every month directly credited into the student’s bank account till course completion',
      other: 'Can be availed in addition to any other state or central tuition scholarships'
    },
    deadline: '2027-01-10',
    status: 'open',
    eligibilityRules: {
      allowedGenders: ['female'],
      allowedStates: ['Tamil Nadu'],
      allowedEducationLevels: ['undergraduate', 'diploma'],
      specialCondition: 'Girl students who have studied from Class 6 to Class 12 in Tamil Nadu Government schools and enrolled in higher education.'
    },
    requiredDocuments: [
      'EMIS Number of student (Class 6 to 12 Govt School study confirmation)',
      'College Bonafide Certificate with Course Admission Date',
      'Student Aadhaar Card copy',
      'Active Bank Account Details in scholar’s name'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Campus Special Camp Registration',
        description: 'College Nodal Officer registers girl students through the Penkalvi / Pudhumai Penn portal.'
      },
      {
        stepNumber: 2,
        title: 'School Education Dept EMIS Verification',
        description: 'Automatic verification of Classes 6-12 government school attendance records.'
      },
      {
        stepNumber: 3,
        title: 'Monthly Cash Credit',
        description: 'Monthly direct credit of ₹1,000 into Aadhaar-linked savings account on the 7th of every month.'
      }
    ],
    officialApplyUrl: 'https://www.penkalvi.tn.gov.in',
    officialPortalName: 'Pudhumai Penn Penkalvi Portal',
    officialNotificationUrl: 'https://cms.tn.gov.in',
    lastCheckedDate: '2026-11-02',
    tags: ['Tamil Nadu State', 'Girls Higher Education', 'Govt School Alumni', 'Monthly Stipend'],
    description: 'Transformative Tamil Nadu initiative encouraging female government school alumni to pursue higher education by transferring ₹1,000 every month directly into their bank accounts.',
    supportsLiveLookup: false
  },
  {
    id: 'state-delhi-merit-means',
    title: 'Delhi Merit-cum-Means Financial Assistance Scheme for Higher Education',
    provider: 'Higher Education Department, Government of NCT of Delhi',
    governmentLevel: 'state',
    state: 'Delhi',
    educationLevels: ['undergraduate', 'diploma'],
    fieldsOfStudy: ['Any / All Streams', 'Engineering & Technology', 'Law & Legal Studies', 'Commerce & Management'],
    awardAmount: 'Up to 100% Tuition Fee Waiver (₹25,000 - ₹1,00,000 / year)',
    awardValueNumber: 75000,
    benefits: {
      tuitionFee: '100% fee waiver for NFSA cardholders; 50% waiver for family income up to ₹2.5L; 25% waiver for income ₹2.5L - ₹6L'
    },
    deadline: '2026-12-05',
    status: 'open',
    eligibilityRules: {
      minPercentage: 60,
      maxAnnualIncome: 600000,
      allowedStates: ['Delhi'],
      allowedEducationLevels: ['undergraduate', 'diploma'],
      specialCondition: 'Pursuing undergraduate courses in Delhi State Universities (DTU, NSUT, IIITD, IP University, AUD, DSEU) with min 60% marks.'
    },
    requiredDocuments: [
      'National Food Security Card OR Tehsildar Income Certificate',
      'Mark sheets of previous academic qualifying examinations',
      'Admission proof in Delhi State Public University',
      'Delhi address residence proof (Voter ID / Aadhaar)',
      'Cancelled cheque / Bank passbook'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'E-District Delhi Portal Application',
        description: 'Login to edistrict.delhigovt.nic.in and choose Higher Education Merit-cum-Means.'
      },
      {
        stepNumber: 2,
        title: 'Institutional Scrutiny Committee',
        description: 'University financial aid committee inspects attendance, grades, and income documents.'
      },
      {
        stepNumber: 3,
        title: 'Sanction & Fee Reimbursement',
        description: 'Delhi Government disburses approved tuition fee percentage directly to student accounts.'
      }
    ],
    officialApplyUrl: 'https://edistrict.delhigovt.nic.in',
    officialPortalName: 'Delhi e-District Portal',
    officialNotificationUrl: 'https://delhi.gov.in/higher-education-schemes',
    lastCheckedDate: '2026-11-05',
    tags: ['Delhi State', 'DTU / NSUT / IPU', '100% Tuition Waiver', 'E-District'],
    description: 'Generous Delhi government scheme providing up to 100% tuition fee reimbursement for students studying in Delhi State Universities based on family income tiers.',
    supportsLiveLookup: false
  },
  {
    id: 'central-nmmss-school',
    title: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    provider: 'Department of School Education & Literacy, Ministry of Education, Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_secondary', 'school_higher_sec'],
    fieldsOfStudy: ['Any / All Streams'],
    awardAmount: '₹12,000 / year (₹1,000 / month from Class 9 to 12)',
    awardValueNumber: 12000,
    benefits: {
      maintenanceAllowance: '₹12,000 per annum paid in single or quarterly installments for Classes 9, 10, 11, and 12'
    },
    deadline: '2026-11-28',
    status: 'open',
    eligibilityRules: {
      minPercentage: 55,
      maxAnnualIncome: 350000,
      allowedEducationLevels: ['school_secondary', 'school_higher_sec'],
      allowedStates: ['All India'],
      specialCondition: 'Studying in Government, Local Body, and Government-aided schools with min 55% marks in Class 7 and cleared State Level NMMSS exam in Class 8.'
    },
    requiredDocuments: [
      'NMMSS State Examination Scorecard & Selection Letter',
      'Class 7th and 8th Marksheet',
      'Parental Income Certificate (under ₹3.5 Lakhs)',
      'School Principal Bonafide Certificate',
      'Student Aadhaar Card and linked Savings Bank Account'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Pass Class 8 State NMMSS Exam',
        description: 'Qualify the state-administered Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT).'
      },
      {
        stepNumber: 2,
        title: 'Apply for Fresh / Renewal on NSP',
        description: 'Selected students register on National Scholarship Portal with exam credentials.'
      },
      {
        stepNumber: 3,
        title: 'Annual Class 9-12 Continuation',
        description: 'Maintain 55% marks every academic year to receive continued ₹12,000 annual scholarship.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://dsel.education.gov.in/nmmss',
    lastCheckedDate: '2026-11-04',
    tags: ['Secondary School', 'Class 9-12', 'NMMSS Exam', 'Central Govt'],
    description: 'Prestigious national scholarship to prevent dropouts at Class 8 stage, rewarding 1,00,000 meritorious underprivileged school students nationwide with ₹12,000 per year.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'state-rajasthan-cm-higher-ed',
    title: 'Chief Minister Higher Education Scholarship Scheme (CMHES)',
    provider: 'Department of College Education, Government of Rajasthan',
    governmentLevel: 'state',
    state: 'Rajasthan',
    educationLevels: ['undergraduate', 'diploma'],
    fieldsOfStudy: ['Any / All Streams'],
    awardAmount: '₹5,000 - ₹10,000 / year (₹500 - ₹1,000 / month for 10 months)',
    awardValueNumber: 10000,
    benefits: {
      maintenanceAllowance: '₹5,000/yr for general scholars; ₹10,000/yr for differently-abled scholars'
    },
    deadline: '2026-12-30',
    status: 'open',
    eligibilityRules: {
      minPercentage: 60,
      maxAnnualIncome: 250000,
      allowedStates: ['Rajasthan'],
      allowedEducationLevels: ['undergraduate', 'diploma'],
      specialCondition: 'Rajasthan board Class 12 passed with min 60% marks and secured place in first 1,00,000 merit list.'
    },
    requiredDocuments: [
      'Rajasthan Jan Aadhaar Card',
      'Class 12th Rajasthan Board (RBSE) Marksheet',
      'College Admission Fee receipt',
      'Income Certificate (under ₹2.5 Lakh)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'SSO Rajasthan Portal Login',
        description: 'Login to sso.rajasthan.gov.in using Jan Aadhaar ID.'
      },
      {
        stepNumber: 2,
        title: 'Higher Education Scholarship Application',
        description: 'Select CMHES and auto-fetch academic and domicile credentials.'
      },
      {
        stepNumber: 3,
        title: 'Nodal College Approval',
        description: 'College officer certifies regular attendance and submits to Directorate.'
      }
    ],
    officialApplyUrl: 'https://hte.rajasthan.gov.in',
    officialPortalName: 'Rajasthan Higher Technical Education (HTE) Portal',
    officialNotificationUrl: 'https://hte.rajasthan.gov.in/dept/dce',
    lastCheckedDate: '2026-11-06',
    tags: ['Rajasthan State', 'Jan Aadhaar Linked', 'Undergraduate Support'],
    description: 'Rajasthan state government scheme supporting 1 lakh underprivileged students each year who pass Class 12 from RBSE to continue regular college education.',
    supportsLiveLookup: false
  },
  {
    id: 'central-cbse-single-girl-child',
    title: 'CBSE Merit Scholarship Scheme for Single Girl Child',
    provider: 'Central Board of Secondary Education (CBSE), Ministry of Education, Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_higher_sec'],
    fieldsOfStudy: ['Any / All Streams', 'Science (PCM / PCB)', 'Commerce Stream', 'Arts & Humanities Stream', 'Girls Education & Single Girl Child'],
    awardAmount: '₹6,000 / year (₹500 / month for Classes 11 & 12)',
    awardValueNumber: 6000,
    benefits: {
      maintenanceAllowance: '₹500 per month for two academic years (Classes 11 and 12)'
    },
    deadline: '2026-12-10',
    status: 'open',
    eligibilityRules: {
      minPercentage: 60,
      allowedEducationLevels: ['school_higher_sec'],
      allowedGenders: ['female'],
      allowedStates: ['All India'],
      singleGirlChildOnly: true,
      specialCondition: 'Single girl child of parents who secured 60% or more marks in CBSE Class 10 Board Examination and pursuing Class 11-12 in CBSE affiliated schools with tuition fees not exceeding ₹1,500/month.'
    },
    requiredDocuments: [
      'CBSE Class 10 Marksheet & Roll Number',
      'Affidavit sworn by parents on ₹50 stamp paper declaring Single Girl Child status',
      'School Principal Bonafide Verification Certificate',
      'Student Aadhaar Card & Bank Account Details'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'CBSE Online Portal Registration',
        description: 'Apply online on cbse.gov.in with Class 10 roll number and date of birth.'
      },
      {
        stepNumber: 2,
        title: 'Upload Notarized Affidavit',
        description: 'Upload scanned copy of Single Girl Child affidavit in prescribed format.'
      },
      {
        stepNumber: 3,
        title: 'School Verification',
        description: 'School principal validates tuition fee criteria and forwards digitally to CBSE.'
      }
    ],
    officialApplyUrl: 'https://cbse.gov.in/cbsenew/scholar.html',
    officialPortalName: 'CBSE Official Scholarship Portal',
    officialNotificationUrl: 'https://cbse.gov.in',
    lastCheckedDate: '2026-11-05',
    tags: ['Class 11-12', 'Single Girl Child', 'CBSE Board', 'Girls Education'],
    description: 'National initiative by CBSE to promote girls education and reward meritorious single girl children pursuing higher secondary studies in CBSE schools.',
    supportsLiveLookup: false
  },
  {
    id: 'central-begum-hazrat-mahal',
    title: 'Begum Hazrat Mahal National Scholarship for Minority Girls',
    provider: 'Maulana Azad Education Foundation, Ministry of Minority Affairs, Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_secondary', 'school_higher_sec'],
    fieldsOfStudy: ['Any / All Streams', 'Social Welfare Pre-Matric', 'Girls Education & Single Girl Child', 'General Secondary Curriculum'],
    awardAmount: '₹5,000 - ₹6,000 / year (₹5,000 for Class 9-10; ₹6,000 for Class 11-12)',
    awardValueNumber: 6000,
    benefits: {
      maintenanceAllowance: '₹5,000 per annum for Classes 9 & 10; ₹6,000 per annum for Classes 11 & 12 towards school fees, books and stationery'
    },
    deadline: '2026-12-20',
    status: 'open',
    eligibilityRules: {
      minPercentage: 50,
      maxAnnualIncome: 200000,
      allowedCategories: ['Minority'],
      allowedGenders: ['female'],
      allowedEducationLevels: ['school_secondary', 'school_higher_sec'],
      allowedStates: ['All India'],
      specialCondition: 'Girl students belonging to national minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) with at least 50% marks in previous class.'
    },
    requiredDocuments: [
      'Self-attested Marksheet of previous class',
      'Self-declaration of Minority Community certificate',
      'Income Certificate from competent revenue authority (SDO / Tehsildar)',
      'School Verification Certificate from Principal / Headmaster',
      'Student Aadhaar & Bank Passbook Copy'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Registration on National Scholarship Portal',
        description: 'Create OTR on scholarships.gov.in and select Begum Hazrat Mahal scheme.'
      },
      {
        stepNumber: 2,
        title: 'Upload School & Income Docs',
        description: 'Upload certified marksheet, minority self-declaration, and family income certificate.'
      },
      {
        stepNumber: 3,
        title: 'Direct Benefit Transfer (DBT)',
        description: 'Amount credited directly into student’s Aadhaar-linked account.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://www.minorityaffairs.gov.in',
    lastCheckedDate: '2026-11-04',
    tags: ['Minority Welfare', 'Girl Students', 'School Education', 'Class 9-12', 'NSP'],
    description: 'Central government scholarship supporting girl students belonging to notified minority communities studying in Classes 9 to 12 across India.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'central-pre-matric-sc',
    title: 'Centrally Sponsored Pre-Matric Scholarship for SC Students',
    provider: 'Department of Social Justice and Empowerment, Ministry of Social Justice & Empowerment, Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_secondary'],
    fieldsOfStudy: ['Any / All Streams', 'Social Welfare Pre-Matric', 'General Secondary Curriculum'],
    awardAmount: '₹3,500 - ₹7,000 / year + ₹1,000 Book & Ad-hoc Grant',
    awardValueNumber: 7000,
    benefits: {
      maintenanceAllowance: 'Day Scholars: ₹3,500/year; Hostellers: ₹7,000/year for 10 months',
      bookGrant: 'Additional ad-hoc grant of ₹1,000 per annum for study kits and books'
    },
    deadline: '2026-12-31',
    status: 'open',
    eligibilityRules: {
      allowedCategories: ['SC'],
      maxAnnualIncome: 250000,
      allowedEducationLevels: ['school_secondary'],
      allowedStates: ['All India'],
      specialCondition: 'Belonging to Scheduled Caste (SC) studying full-time in Classes 9 or 10 in a recognized government or government-aided school.'
    },
    requiredDocuments: [
      'Caste Certificate authenticated by competent Tahsildar / SDO',
      'Annual Parental Income Certificate (below ₹2.5 Lakh)',
      'Class 8th / 9th Marksheet',
      'School Admission Certificate & Bonafide Letter',
      'Bank Account Passbook seeded with Aadhaar'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'School / State Welfare Portal Submission',
        description: 'Apply through State Scholarship Portal or National Scholarship Portal via school.'
      },
      {
        stepNumber: 2,
        title: 'Institutional Verification',
        description: 'School verifies student enrollment, regular attendance and caste status.'
      },
      {
        stepNumber: 3,
        title: 'DBT PFMS Disbursement',
        description: 'State and Central share disbursed directly through Public Financial Management System.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://socialjustice.gov.in',
    lastCheckedDate: '2026-11-06',
    tags: ['Pre-Matric', 'Class 9-10', 'SC Students', 'Central Scheme', 'Social Welfare'],
    description: 'Central scheme to support education of SC children studying in Classes 9 and 10 to minimize dropouts and build strong foundations for higher education.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  },
  {
    id: 'central-dst-inspire-manak',
    title: 'DST INSPIRE Awards - MANAK (Million Minds Augmenting National Aspirations)',
    provider: 'Department of Science and Technology (DST) & National Innovation Foundation (NIF), Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_secondary', 'school_higher_sec'],
    fieldsOfStudy: ['Science (PCM / PCB)', 'National Merit & Talent Exams', 'Any / All Streams'],
    awardAmount: '₹10,000 Award + National Lab Mentorship & Prototype Funding',
    awardValueNumber: 10000,
    benefits: {
      maintenanceAllowance: '₹10,000 directly credited to selected students for building a working prototype of their original scientific invention',
      other: 'Opportunity to showcase at National Science Exhibition and visit premier institutes like IITs, IISc, and Rashtrapati Bhavan'
    },
    deadline: '2026-11-30',
    status: 'open',
    eligibilityRules: {
      allowedEducationLevels: ['school_secondary', 'school_higher_sec'],
      allowedStates: ['All India'],
      specialCondition: 'Students of Classes 6 to 10 and 11 to 12 (age 10-17 years) studying in any recognized school submitting an original innovative science or technological project.'
    },
    requiredDocuments: [
      'Original Science Innovation Idea / Concept Write-up (200-300 words)',
      'School Principal Recommendation & Nomination Letter',
      'Student Aadhaar Card & Bank Account Passbook',
      'Photograph of project sketch or initial prototype (optional)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'School-Level Competition',
        description: 'Schools organize intra-school ideas competition and nominate top 2-3 best student innovations.'
      },
      {
        stepNumber: 2,
        title: 'E-MIAS Portal Nomination',
        description: 'School principal registers and uploads nominations on online E-MIAS portal (inspireawards-dst.gov.in).'
      },
      {
        stepNumber: 3,
        title: 'NIF Shortlisting & DBT',
        description: 'National Innovation Foundation shortlists 1,00,000 students nationwide and transfers ₹10,000 for prototype building.'
      }
    ],
    officialApplyUrl: 'https://www.inspireawards-dst.gov.in',
    officialPortalName: 'INSPIRE Awards E-MIAS Portal',
    officialNotificationUrl: 'https://dst.gov.in',
    lastCheckedDate: '2026-11-05',
    tags: ['Science Talent', 'Innovation Award', 'Class 6-12', 'DST India', 'Prototype Funding'],
    description: 'Flagship programme by the Department of Science & Technology to foster a culture of creative thinking and innovative spirit among 1 million school children in India.',
    supportsLiveLookup: false
  },
  {
    id: 'central-pm-yasasvi-school',
    title: 'PM Young Achievers Scholarship Scheme for Vibrant India (PM-YASASVI)',
    provider: 'Department of Social Justice and Empowerment, Ministry of Social Justice & Empowerment, Govt of India',
    governmentLevel: 'central',
    educationLevels: ['school_secondary', 'school_higher_sec'],
    fieldsOfStudy: ['Any / All Streams', 'National Merit & Talent Exams', 'Social Welfare Pre-Matric', 'Science (PCM / PCB)', 'Commerce Stream', 'Arts & Humanities Stream'],
    awardAmount: '₹75,000 / year (Class 9-10) up to ₹1,25,000 / year (Class 11-12)',
    awardValueNumber: 125000,
    benefits: {
      tuitionFee: 'Covers full school tuition fees, hostel charges, books and stationery up to ₹75,000/yr for Class 9-10 and ₹1,25,000/yr for Class 11-12 in Top Class Schools'
    },
    deadline: '2026-12-25',
    status: 'open',
    eligibilityRules: {
      minPercentage: 60,
      maxAnnualIncome: 250000,
      allowedCategories: ['OBC', 'EWS'],
      allowedEducationLevels: ['school_secondary', 'school_higher_sec'],
      allowedStates: ['All India'],
      specialCondition: 'Students belonging to OBC, EBC, or DNT categories studying in Class 9 or Class 11 in designated Top-Class Schools across India.'
    },
    requiredDocuments: [
      'OBC / EBC / DNT Caste Certificate issued by competent revenue authority',
      'Annual Family Income Certificate (below ₹2.5 Lakh)',
      'Marksheet of Class 8 (for Class 9 entry) or Class 10 (for Class 11 entry)',
      'Bonafide Certificate from designated Top Class School',
      'Student Aadhaar Card & Aadhaar seeded Bank Account'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'NSP Portal Application',
        description: 'Register with OTR on scholarships.gov.in under PM-YASASVI Top Class School scheme.'
      },
      {
        stepNumber: 2,
        title: 'Merit Verification',
        description: 'State Nodal Officer and School Principal verify academic credentials and category.'
      },
      {
        stepNumber: 3,
        title: 'Direct Benefit Transfer (DBT)',
        description: 'Scholarship amount disbursed directly to student / school via PFMS DBT.'
      }
    ],
    officialApplyUrl: 'https://scholarships.gov.in',
    officialPortalName: 'National Scholarship Portal (NSP)',
    officialNotificationUrl: 'https://socialjustice.gov.in/schemes/pm-yasasvi',
    lastCheckedDate: '2026-11-06',
    tags: ['PM-YASASVI', 'OBC / EWS', 'Top Class Schools', 'Class 9-12', 'High Value'],
    description: 'High-value Central Government scholarship providing up to ₹1,25,000 per year for meritorious OBC, EBC and DNT students studying in identified top-tier schools nationwide.',
    supportsLiveLookup: true,
    portalLookupCode: 'NSP'
  }
];

export const INITIAL_STUDENT_PROFILE = {
  id: 'usr-student-01',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.edu.in',
  phone: '+91 98765 43210',
  stateOfResidence: 'Karnataka',
  stateOfStudy: 'Karnataka',
  educationLevel: 'undergraduate' as const,
  fieldOfStudy: 'Engineering & Technology',
  courseName: 'B.Tech in Computer Science & Engineering',
  currentYear: '2nd Year',
  socialCategory: 'OBC' as const,
  annualFamilyIncome: 220000,
  gender: 'female' as const,
  isPersonWithDisability: false,
  academicScorePercentage: 86.4,
  isSingleGirlChild: false,
  isFirstGenGraduate: true,
  discoveryPreference: 'both' as const,
  preferredStates: ['Karnataka']
};
