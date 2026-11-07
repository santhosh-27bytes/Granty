import { Scholarship, StudentProfile, MatchAnalysis } from '../types';

export function calculateScholarshipMatch(
  scholarship: Scholarship,
  profile: Partial<StudentProfile> | null
): MatchAnalysis {
  if (!profile) {
    return {
      matchPercentage: 70,
      isEligible: true,
      reasons: ['Complete your profile to see tailored match percentage and eligibility verification.'],
      missingDetails: ['Profile not completed'],
      cautionNotes: []
    };
  }

  let totalWeight = 0;
  let earnedScore = 0;
  const reasons: string[] = [];
  const missingDetails: string[] = [];
  const cautionNotes: string[] = [];
  let hardIneligible = false;

  // 1. Government Level & State Check (Weight: 25)
  totalWeight += 25;
  if (scholarship.governmentLevel === 'central') {
    earnedScore += 25;
    reasons.push('Central Govt Scheme open to all eligible Indian citizens');
  } else {
    // State scheme
    const studentResidence = profile.stateOfResidence || '';
    const studentStudy = profile.stateOfStudy || '';
    const preferredStates = profile.preferredStates || [];
    const isStateMatch = 
      scholarship.state === studentResidence || 
      scholarship.state === studentStudy ||
      preferredStates.includes(scholarship.state || '');

    if (isStateMatch) {
      earnedScore += 25;
      reasons.push(`Directly matches your ${scholarship.state} domicile/study state`);
    } else if (studentResidence || studentStudy) {
      hardIneligible = true;
      cautionNotes.push(`Restricted to ${scholarship.state} residents (your profile: ${studentResidence || 'Different state'})`);
    } else {
      earnedScore += 10;
      missingDetails.push(`Provide your domicile state to verify if you qualify for ${scholarship.state}`);
    }
  }

  // 2. Education Level Check (Weight: 25)
  totalWeight += 25;
  if (profile.educationLevel) {
    const isEduMatch = scholarship.educationLevels.includes('all') || scholarship.educationLevels.includes(profile.educationLevel);
    if (isEduMatch) {
      earnedScore += 25;
      reasons.push(`Supports your current education level`);
    } else {
      hardIneligible = true;
      cautionNotes.push(`Designed for ${scholarship.educationLevels.join(', ')} students`);
    }
  } else {
    earnedScore += 12;
    missingDetails.push('Add your Education Level (e.g. Undergraduate / School)');
  }

  // 3. Field / Stream Check (Weight: 20)
  totalWeight += 20;
  if (profile.fieldOfStudy) {
    const isFieldMatch = 
      scholarship.fieldsOfStudy.includes('Any / All Streams') ||
      scholarship.fieldsOfStudy.includes(profile.fieldOfStudy) ||
      (scholarship.eligibilityRules.allowedFields && scholarship.eligibilityRules.allowedFields.includes(profile.fieldOfStudy));

    if (isFieldMatch) {
      earnedScore += 20;
      reasons.push(`Covers ${profile.fieldOfStudy} courses`);
    } else {
      earnedScore += 5;
      cautionNotes.push(`Focused on: ${scholarship.fieldsOfStudy.join(', ')}`);
    }
  } else {
    earnedScore += 10;
    missingDetails.push('Add your Course/Field of Study to verify course-specific grants');
  }

  // 4. Gender Specific Rules (Weight: 10)
  const allowedGenders = scholarship.eligibilityRules.allowedGenders;
  if (allowedGenders && allowedGenders.length > 0 && !allowedGenders.includes('all')) {
    totalWeight += 10;
    if (profile.gender) {
      if (allowedGenders.includes(profile.gender as any)) {
        earnedScore += 10;
        reasons.push(`Specially earmarked for female scholars`);
      } else {
        hardIneligible = true;
        cautionNotes.push(`Reserved exclusively for female applicants`);
      }
    } else {
      missingDetails.push(`Scholarship is for ${allowedGenders.join('/')} applicants`);
    }
  }

  // 5. Disability Specific Rules (Weight: 10)
  if (scholarship.eligibilityRules.disabilityOnly) {
    totalWeight += 10;
    if (profile.isPersonWithDisability) {
      earnedScore += 10;
      reasons.push('Meets Divyangjan / Specially-abled criteria');
    } else if (profile.isPersonWithDisability === false) {
      hardIneligible = true;
      cautionNotes.push('Requires 40%+ benchmark disability certificate');
    } else {
      missingDetails.push('Add disability status if seeking Divyangjan assistance');
    }
  }

  // 6. Income Ceiling Rules (Weight: 10)
  if (scholarship.eligibilityRules.maxAnnualIncome) {
    totalWeight += 10;
    const maxIncome = scholarship.eligibilityRules.maxAnnualIncome;
    if (profile.annualFamilyIncome !== undefined && profile.annualFamilyIncome !== null) {
      if (profile.annualFamilyIncome <= maxIncome) {
        earnedScore += 10;
        reasons.push(`Income within ceiling of ₹${(maxIncome / 100000).toFixed(1)} Lakhs/year`);
      } else {
        cautionNotes.push(`Annual income must be below ₹${(maxIncome / 100000).toFixed(1)} Lakhs (Current: ₹${(profile.annualFamilyIncome / 100000).toFixed(1)}L)`);
        earnedScore += 2;
      }
    } else {
      missingDetails.push(`Requires family income under ₹${(maxIncome / 100000).toFixed(1)} Lakh/yr (not set)`);
      earnedScore += 5;
    }
  }

  // 7. Academic Percentage Check (Weight: 10)
  if (scholarship.eligibilityRules.minPercentage) {
    totalWeight += 10;
    const minPercent = scholarship.eligibilityRules.minPercentage;
    if (profile.academicScorePercentage !== undefined) {
      if (profile.academicScorePercentage >= minPercent) {
        earnedScore += 10;
        reasons.push(`Exceeds required academic cutoff of ${minPercent}% (You have ${profile.academicScorePercentage}%)`);
      } else {
        cautionNotes.push(`Requires minimum ${minPercent}% marks in qualifying examination`);
        earnedScore += 2;
      }
    } else {
      missingDetails.push(`Requires minimum ${minPercent}% marks in prior examination`);
      earnedScore += 5;
    }
  }

  // 8. Social Category Check
  if (scholarship.eligibilityRules.allowedCategories && scholarship.eligibilityRules.allowedCategories.length > 0) {
    totalWeight += 10;
    const cats = scholarship.eligibilityRules.allowedCategories;
    if (profile.socialCategory) {
      if (cats.includes(profile.socialCategory)) {
        earnedScore += 10;
        reasons.push(`Eligible under ${profile.socialCategory} reservation category`);
      } else {
        cautionNotes.push(`Category required: ${cats.join(', ')}`);
        earnedScore += 2;
      }
    } else {
      missingDetails.push(`Category specific scheme (${cats.join('/')})`);
      earnedScore += 5;
    }
  }

  const rawPercent = Math.round((earnedScore / totalWeight) * 100);
  const finalPercent = hardIneligible ? Math.min(rawPercent, 25) : Math.max(rawPercent, 35);

  return {
    matchPercentage: finalPercent,
    isEligible: !hardIneligible && finalPercent >= 60,
    reasons: reasons.slice(0, 3),
    missingDetails,
    cautionNotes
  };
}

export function calculateProfileCompletion(profile: Partial<StudentProfile> | null): {
  percentage: number;
  completedFields: string[];
  missingFields: string[];
} {
  if (!profile) return { percentage: 0, completedFields: [], missingFields: ['Name', 'State', 'Education Level', 'Course'] };

  const checks = [
    { name: 'State of Residence', value: !!profile.stateOfResidence, weight: 15 },
    { name: 'Education Level', value: !!profile.educationLevel, weight: 15 },
    { name: 'Field of Study / Course', value: !!profile.fieldOfStudy, weight: 15 },
    { name: 'Course Name', value: !!profile.courseName, weight: 10 },
    { name: 'Family Income', value: profile.annualFamilyIncome !== undefined && profile.annualFamilyIncome !== null, weight: 15 },
    { name: 'Social Category', value: !!profile.socialCategory, weight: 10 },
    { name: 'Gender', value: !!profile.gender, weight: 10 },
    { name: 'Academic Score', value: profile.academicScorePercentage !== undefined && profile.academicScorePercentage > 0, weight: 10 }
  ];

  let completedWeight = 0;
  const completedFields: string[] = [];
  const missingFields: string[] = [];

  checks.forEach(c => {
    if (c.value) {
      completedWeight += c.weight;
      completedFields.push(c.name);
    } else {
      missingFields.push(c.name);
    }
  });

  return {
    percentage: Math.min(100, completedWeight),
    completedFields,
    missingFields
  };
}
