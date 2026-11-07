import { 
  Cpu, 
  Stethoscope, 
  Atom, 
  Briefcase, 
  Palette, 
  Scale, 
  Sprout, 
  Wrench, 
  Sparkles, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  GraduationCap,
  Layers,
  LucideIcon
} from 'lucide-react';
import { EducationLevel, Scholarship } from '../types';

export interface LevelCategoryCard {
  id: string;
  name: string;
  subtitle: string;
  examples: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  fieldAliases: string[];
}

// 1. Higher Secondary (Classes 11 & 12 / PUC / +2 / Intermediate)
export const HIGHER_SECONDARY_CATEGORIES: LevelCategoryCard[] = [
  {
    id: 'Science (PCM / PCB)',
    name: 'Science Stream (PCM / PCB / PCMB)',
    subtitle: 'Physics, Chemistry, Maths, Biology & CS',
    examples: 'Senior Secondary Science, Pre-Engineering & Medical, DST INSPIRE MANAK',
    icon: Atom,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50/70',
    fieldAliases: ['Science (PCM / PCB)', 'Pure & Applied Sciences', 'Medical & Health Sciences', 'Engineering & Technology', 'Any / All Streams']
  },
  {
    id: 'Commerce Stream',
    name: 'Commerce Stream',
    subtitle: 'Accountancy, Business Studies & Economics',
    examples: 'Class 11 & 12 Commerce, Accountancy, Business Studies, Math / Informatics Practices',
    icon: Briefcase,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/70',
    fieldAliases: ['Commerce Stream', 'Commerce & Management', 'Any / All Streams']
  },
  {
    id: 'Arts & Humanities Stream',
    name: 'Arts & Humanities Stream',
    subtitle: 'History, Political Science, Geography & Languages',
    examples: 'Class 11 & 12 Arts / Humanities, Psychology, Sociology, Literature, Languages',
    icon: Palette,
    color: 'text-amber-600',
    bg: 'bg-amber-50/70',
    fieldAliases: ['Arts & Humanities Stream', 'Humanities & Social Sciences', 'Any / All Streams']
  },
  {
    id: 'Vocational & Skill Stream',
    name: 'Vocational & Skill Courses (+2)',
    subtitle: 'NSQF Vocational Trades & Applied Skills',
    examples: 'Vocational Higher Secondary, IT/ITeS, Agriculture, Electronics, Automobile',
    icon: Wrench,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50/70',
    fieldAliases: ['Vocational & Skill Stream', 'Vocational & Polytechnic', 'Any / All Streams']
  },
  {
    id: 'Any / All Streams',
    name: 'All School Streams / General Schemes',
    subtitle: 'Open to All Class 11 & 12 Students',
    examples: 'Post-Matric SC/ST/OBC/Minority/EWS, Single Girl Child, PM-YASASVI, State Merit Schemes',
    icon: Sparkles,
    color: 'text-blue-600',
    bg: 'bg-blue-50/70',
    fieldAliases: ['Any / All Streams']
  }
];

// 2. Secondary School (Classes 9 & 10 / High School / Pre-Matric)
export const SECONDARY_SCHOOL_CATEGORIES: LevelCategoryCard[] = [
  {
    id: 'General Secondary Curriculum',
    name: 'General High School Curriculum',
    subtitle: 'All Standard Academic Subjects (Class 9 & 10)',
    examples: 'CBSE, ICSE, State Boards Class 9 & 10 regular academic curriculum',
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50/70',
    fieldAliases: ['General Secondary Curriculum', 'Any / All Streams']
  },
  {
    id: 'National Merit & Talent Exams',
    name: 'National Merit & Talent Examinations',
    subtitle: 'Merit-cum-Means & Science Talent Search',
    examples: 'National Means-cum-Merit Scholarship (NMMSS), DST INSPIRE MANAK, State Talent',
    icon: Award,
    color: 'text-amber-600',
    bg: 'bg-amber-50/70',
    fieldAliases: ['National Merit & Talent Exams', 'Any / All Streams']
  },
  {
    id: 'Social Welfare Pre-Matric',
    name: 'Pre-Matric Social Welfare Schemes',
    subtitle: 'SC, ST, OBC, Minority & EWS Assistance',
    examples: 'Pre-Matric Government Scholarships, State Social Welfare Department Schemes',
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/70',
    fieldAliases: ['Social Welfare Pre-Matric', 'Any / All Streams']
  },
  {
    id: 'Girls Education & Single Girl Child',
    name: "Girls' Education & Single Child Schemes",
    subtitle: 'Dedicated Incentives for School Girls',
    examples: 'CBSE Single Girl Child, Begum Hazrat Mahal National Scholarship, KGBV Schemes',
    icon: GraduationCap,
    color: 'text-rose-600',
    bg: 'bg-rose-50/70',
    fieldAliases: ['Girls Education & Single Girl Child', 'Any / All Streams']
  },
  {
    id: 'Pre-Vocational & Skill Subjects',
    name: 'Pre-Vocational & Skill Subjects',
    subtitle: 'NSQF Level 1 & 2 Skill Training',
    examples: 'Information Technology, Electronics, Agriculture, Handicrafts, Multi-Skilling',
    icon: Wrench,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50/70',
    fieldAliases: ['Pre-Vocational & Skill Subjects', 'Vocational & Polytechnic', 'Any / All Streams']
  },
  {
    id: 'Any / All Streams',
    name: 'All Pre-Matric Schemes',
    subtitle: 'Complete Secondary School Directory',
    examples: 'All schemes available to Class 9 & 10 students across India',
    icon: Sparkles,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    fieldAliases: ['Any / All Streams']
  }
];

// 3. Polytechnic & Diploma
export const DIPLOMA_CATEGORIES: LevelCategoryCard[] = [
  {
    id: 'Engineering & Technology',
    name: 'Polytechnic Engineering & Technology',
    subtitle: 'Mechanical, Civil, Electrical, CS, IT Diplomas',
    examples: 'State Board of Technical Education, AICTE Pragati & Saksham for Diploma',
    icon: Cpu,
    color: 'text-blue-600',
    bg: 'bg-blue-50/70',
    fieldAliases: ['Engineering & Technology', 'Vocational & Polytechnic', 'Any / All Streams']
  },
  {
    id: 'Medical & Health Sciences',
    name: 'Pharmacy & Paramedical Diplomas',
    subtitle: 'D.Pharm, Lab Technology, Nursing & Radiology',
    examples: 'Diploma in Pharmacy (D.Pharm), Medical Laboratory Technology (DMLT)',
    icon: Stethoscope,
    color: 'text-rose-600',
    bg: 'bg-rose-50/70',
    fieldAliases: ['Medical & Health Sciences', 'Any / All Streams']
  },
  {
    id: 'Commerce & Management',
    name: 'Commercial Practice & Modern Office',
    subtitle: 'Secretarial, Banking & Accounting Diplomas',
    examples: 'Diploma in Commercial Practice (DCP), Modern Office Management',
    icon: Briefcase,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/70',
    fieldAliases: ['Commerce & Management', 'Any / All Streams']
  },
  {
    id: 'Vocational & Polytechnic',
    name: 'Vocational Trades & ITI Diplomas',
    subtitle: 'Craftsman Training Schemes & Industrial Training',
    examples: 'ITI Electrician, Fitter, Welder, NSQF Advanced Vocational Diplomas',
    icon: Wrench,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50/70',
    fieldAliases: ['Vocational & Polytechnic', 'Any / All Streams']
  },
  {
    id: 'Any / All Streams',
    name: 'All Diploma & Polytechnic Schemes',
    subtitle: 'Open to All Diploma Students',
    examples: 'Post-Matric Fee Reimbursement, State Board Technical Education Waivers',
    icon: Sparkles,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    fieldAliases: ['Any / All Streams']
  }
];

// 4. Doctoral / Ph.D. Research
export const DOCTORAL_CATEGORIES: LevelCategoryCard[] = [
  {
    id: 'Engineering & Technology',
    name: 'Engineering, Technology & AI Research',
    subtitle: 'Computing, Deep Tech & Applied Engineering',
    examples: 'PMRF (Prime Minister’s Research Fellowship), AICTE Doctoral Fellowships',
    icon: Cpu,
    color: 'text-blue-600',
    bg: 'bg-blue-50/70',
    fieldAliases: ['Engineering & Technology', 'Any / All Streams']
  },
  {
    id: 'Pure & Applied Sciences',
    name: 'Sciences & Fundamental Research',
    subtitle: 'Physics, Chemistry, Math & Life Sciences',
    examples: 'CSIR-UGC NET JRF, DST INSPIRE Fellowship, DBT JRF',
    icon: Atom,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50/70',
    fieldAliases: ['Pure & Applied Sciences', 'Any / All Streams']
  },
  {
    id: 'Medical & Health Sciences',
    name: 'Medical & Clinical Research',
    subtitle: 'Biomedical, Pharmaceutical & Health Systems',
    examples: 'ICMR Junior Research Fellowship, AYUSH Ph.D. Fellowships',
    icon: Stethoscope,
    color: 'text-rose-600',
    bg: 'bg-rose-50/70',
    fieldAliases: ['Medical & Health Sciences', 'Any / All Streams']
  },
  {
    id: 'Humanities & Social Sciences',
    name: 'Humanities, Social Sciences & Policy',
    subtitle: 'Economics, History, Sociology & Public Policy',
    examples: 'UGC NET JRF, ICSSR Doctoral Fellowships, ICHR Grants',
    icon: Palette,
    color: 'text-amber-600',
    bg: 'bg-amber-50/70',
    fieldAliases: ['Humanities & Social Sciences', 'Any / All Streams']
  },
  {
    id: 'Agriculture & Allied Sciences',
    name: 'Agricultural & Environmental Research',
    subtitle: 'Agronomy, Climate, Forestry & Veterinary',
    examples: 'ICAR JRF/SRF, Agricultural Research Fellowships',
    icon: Sprout,
    color: 'text-green-600',
    bg: 'bg-green-50/70',
    fieldAliases: ['Agriculture & Allied Sciences', 'Any / All Streams']
  },
  {
    id: 'Any / All Streams',
    name: 'All Doctoral & Research Fellowships',
    subtitle: 'Open to All Ph.D. Scholars',
    examples: 'University Merit Research Grants, State Doctoral Fellowships',
    icon: Sparkles,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    fieldAliases: ['Any / All Streams']
  }
];

// 5. Higher Education / College Degrees (Undergraduate, Postgraduate, All)
export const HIGHER_ED_CATEGORIES: LevelCategoryCard[] = [
  {
    id: 'Engineering & Technology',
    name: 'Engineering & Technology',
    subtitle: 'Technical, Computing & Applied Engineering',
    examples: 'B.Tech, B.E., M.Tech, Computer Science, Mechanical, Civil, Electrical, AICTE Schemes',
    icon: Cpu,
    color: 'text-blue-600',
    bg: 'bg-blue-50/70',
    fieldAliases: ['Engineering & Technology', 'Any / All Streams']
  },
  {
    id: 'Medical & Health Sciences',
    name: 'Medical & Healthcare',
    subtitle: 'Clinical, Biomedical & Allied Health',
    examples: 'MBBS, BDS, B.Pharm, M.Pharm, Nursing, Physiotherapy, Biotechnology',
    icon: Stethoscope,
    color: 'text-rose-600',
    bg: 'bg-rose-50/70',
    fieldAliases: ['Medical & Health Sciences', 'Any / All Streams']
  },
  {
    id: 'Pure & Applied Sciences',
    name: 'Pure & Applied Sciences',
    subtitle: 'Natural, Physical & Mathematical Sciences',
    examples: 'Physics, Chemistry, Mathematics, Statistics, Biology, DST INSPIRE',
    icon: Atom,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50/70',
    fieldAliases: ['Pure & Applied Sciences', 'Any / All Streams']
  },
  {
    id: 'Commerce & Management',
    name: 'Commerce & Management',
    subtitle: 'Business, Banking, Finance & Economics',
    examples: 'B.Com, BBA, MBA, Economics, Accountancy, Financial Services',
    icon: Briefcase,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/70',
    fieldAliases: ['Commerce & Management', 'Any / All Streams']
  },
  {
    id: 'Humanities & Social Sciences',
    name: 'Humanities & Social Sciences',
    subtitle: 'Arts, Languages, Literature & Public Policy',
    examples: 'BA, MA, English, History, Political Science, Psychology, Sociology',
    icon: Palette,
    color: 'text-amber-600',
    bg: 'bg-amber-50/70',
    fieldAliases: ['Humanities & Social Sciences', 'Any / All Streams']
  },
  {
    id: 'Law & Legal Studies',
    name: 'Law & Legal Studies',
    subtitle: 'Jurisprudence, Corporate Law & Justice',
    examples: 'LL.B, LL.M, BA LL.B, BBA LL.B, Constitutional Law, Corporate Law',
    icon: Scale,
    color: 'text-purple-600',
    bg: 'bg-purple-50/70',
    fieldAliases: ['Law & Legal Studies', 'Any / All Streams']
  },
  {
    id: 'Agriculture & Allied Sciences',
    name: 'Agriculture & Allied Sciences',
    subtitle: 'Agronomy, Horticulture, Forestry & Veterinary',
    examples: 'B.Sc Agriculture, M.Sc Agriculture, Agricultural Engineering, Dairy Tech',
    icon: Sprout,
    color: 'text-green-600',
    bg: 'bg-green-50/70',
    fieldAliases: ['Agriculture & Allied Sciences', 'Any / All Streams']
  },
  {
    id: 'Vocational & Polytechnic',
    name: 'Vocational & Polytechnic',
    subtitle: 'Diploma Programs & Skill Development',
    examples: 'Polytechnic Engineering Diplomas, AICTE Saksham/Pragati, ITI',
    icon: Wrench,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50/70',
    fieldAliases: ['Vocational & Polytechnic', 'Any / All Streams']
  },
  {
    id: 'Any / All Streams',
    name: 'All Disciplines / General Schemes',
    subtitle: 'Open to Students Across All Fields',
    examples: 'Central Sector Scheme (CSSS), State Social Welfare Fee Concessions',
    icon: Sparkles,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    fieldAliases: ['Any / All Streams']
  }
];

// Helper to retrieve the appropriate category classification for an education level
export function getCategoriesForLevel(levelId: EducationLevel | 'all' | string): LevelCategoryCard[] {
  switch (levelId) {
    case 'school_secondary':
      return SECONDARY_SCHOOL_CATEGORIES;
    case 'school_higher_sec':
      return HIGHER_SECONDARY_CATEGORIES;
    case 'diploma':
      return DIPLOMA_CATEGORIES;
    case 'doctoral':
      return DOCTORAL_CATEGORIES;
    case 'undergraduate':
    case 'postgraduate':
    case 'all':
    default:
      return HIGHER_ED_CATEGORIES;
  }
}

// Check if a scholarship matches a selected category for an education level
export function doesScholarshipMatchCategory(
  scholarship: Scholarship,
  levelId: EducationLevel | 'all' | string,
  categoryId: string
): boolean {
  if (!categoryId || categoryId === 'Any / All Streams') return true;

  const categories = getCategoriesForLevel(levelId);
  const foundCard = categories.find(c => c.id === categoryId);

  // If card has defined aliases
  if (foundCard && foundCard.fieldAliases.length > 0) {
    // If the scholarship belongs to 'Any / All Streams', it always matches
    if (scholarship.fieldsOfStudy.includes('Any / All Streams')) return true;

    // Check if any alias matches the scholarship fields
    return foundCard.fieldAliases.some(alias => scholarship.fieldsOfStudy.includes(alias));
  }

  // Fallback direct check
  return (
    scholarship.fieldsOfStudy.includes('Any / All Streams') ||
    scholarship.fieldsOfStudy.includes(categoryId) ||
    (scholarship.eligibilityRules.allowedFields && scholarship.eligibilityRules.allowedFields.includes(categoryId)) ||
    false
  );
}
