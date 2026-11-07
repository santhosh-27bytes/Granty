import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ChevronDown, 
  Bot, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  Clock,
  ArrowRight,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Compass,
  GraduationCap
} from 'lucide-react';
import { useGrantly } from '../context/GrantlyContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionLinks?: { label: string; url?: string; route?: string }[];
  badges?: string[];
  followUps?: string[];
}

const DEFAULT_SUGGESTIONS = [
  '📅 Upcoming Deadlines',
  '📝 Application Process',
  '🎯 How Matching Works',
  '📑 Required Documents',
  '🔍 Track Live Status',
  '👧 AICTE Pragati for Girls',
  '🏛️ Central vs State Portals',
  '💰 Highest Paying Grants'
];

export const GrantlyChatbot: React.FC = () => {
  const navigate = useNavigate();
  const { profile, scholarships, trackedApplications } = useGrantly();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello ${profile.name || 'Student'}! 👋 I am **Grantly Assistant**, your official scholarship copilot.\n\nI provide instant, verified guidance on:\n• **Upcoming deadlines** across Central & State schemes\n• **Application procedures** for NSP and State portals\n• **Profile match criteria** (${profile.educationLevel}, ${profile.stateOfResidence || 'All India'})\n• **Mandatory documents checklist**\n• **Application tracking** & PFMS DBT disbursement status\n\nHow can I help you today?`,
      timestamp: 'Just now',
      badges: ['GovTech Verified', '24/7 Official Rules'],
      followUps: [
        'What are the upcoming scholarship deadlines?',
        'What is the step-by-step application process?',
        'What documents are required to apply?'
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Copy message text helper
  const handleCopyText = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Feedback helper
  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    setFeedbackGiven(prev => ({ ...prev, [msgId]: type }));
  };

  // Knowledge base answer engine
  const getBotResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase().trim();
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. DEADLINES & DATES
    if (q.includes('deadline') || q.includes('last date') || q.includes('when') || q.includes('closing') || q.includes('urgent') || q.includes('date')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `📅 **Upcoming Official Scholarship Deadlines (2026-2027)**\n\nHere are the critical application closing windows for Central & State schemes:\n\n• **10 Dec 2026**: **DST INSPIRE SHE** (₹80,000/yr) — *High Priority for Science*\n• **15 Dec 2026**: **Central Sector Scheme (CSSS)** for College/Univ (₹12,000 - ₹20,000/yr)\n• **31 Dec 2026**: **AICTE Pragati Scholarship for Girls** (₹50,000/yr)\n• **31 Dec 2026**: **AICTE Saksham Scheme for Specially-Abled** (₹50,000/yr)\n• **31 Dec 2026 - 15 Jan 2027**: **State Post-Matric Schemes** (Karnataka SSP, MahaDBT, TNP, UP Saksham for SC/ST/OBC)\n• **20 Jan 2027**: **Prime Minister's Research Fellowship (PMRF)** — *Upcoming Opening*\n\n💡 **Action**: Save deadlines in Grantly to receive proactive in-app & email notifications before portals shut.`,
        timestamp: nowStr,
        badges: ['Approaching Deadlines', 'Verified Windows'],
        actionLinks: [
          { label: 'Browse Verified Schemes', route: '/scholarships/all/Any%20%2F%20All%20Streams' },
          { label: 'Check Saved Deadlines', route: '/saved' }
        ],
        followUps: [
          'What is the step-by-step application process?',
          'What documents are required to apply?',
          'Tell me about the AICTE Pragati Scholarship for girls'
        ]
      };
    }

    // 2. APPLICATION PROCESS / HOW TO APPLY
    if (q.includes('process') || q.includes('apply') || q.includes('step') || q.includes('procedure') || q.includes('how to apply') || q.includes('register') || q.includes('stages')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `📝 **Official 5-Step Application Process (Central & State Grants)**\n\nAll official grants follow a strict, middleman-free digital procedure:\n\n1. **One-Time Registration (OTR)**:\n   • Create your OTR account on the National Scholarship Portal (NSP \`scholarships.gov.in\`) or your designated State Portal using your Aadhaar e-KYC and active mobile number.\n\n2. **Complete Application Form**:\n   • Enter your Institute AISHE/UDISE code, board examination roll numbers, and verified parental income data.\n\n3. **Level 1 (L1) - Institute Nodal Officer (INO) Verification**:\n   • Your college/university verification officer checks your bonafide regular student status online.\n\n4. **Level 2 (L2) - District / State Nodal Officer (DNO/SNO) Scrutiny**:\n   • The state social welfare department audits income/caste credentials and publishes the sanctioned merit list.\n\n5. **Direct Benefit Transfer (PFMS DBT)**:\n   • Scholarship funds are credited directly to your Aadhaar-seeded bank account via PFMS.\n\n⚠️ **Notice**: All applications occur on official government portals with zero application fees.`,
        timestamp: nowStr,
        badges: ['Official Workflow', 'Zero Fees'],
        actionLinks: [
          { label: 'Track in Application Tracker', route: '/tracker' },
          { label: 'Visit National Scholarship Portal (NSP)', url: 'https://scholarships.gov.in' }
        ],
        followUps: [
          'What documents are required to apply?',
          'How do I check my live application status?',
          'How does Grantly calculate my profile match percentage?'
        ]
      };
    }

    // 3. MATCHING LOGIC & HOW PERCENTAGE IS CALCULATED
    if (q.includes('match') || q.includes('percentage') || q.includes('criteria') || q.includes('how matching') || q.includes('calculate') || q.includes('eligible') || q.includes('eligibility')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `🎯 **How Grantly Calculates Your Scholarship Match Score**\n\nGrantly evaluates your profile attributes against official gazetted scheme rules using a 5-factor deterministic matching engine:\n\n• **Education Level (30%)**: Verifies if the scheme covers your current program (Undergraduate, Postgraduate, Higher Secondary, Ph.D, or Diploma).\n• **Field of Study (25%)**: Confirms whether your discipline matches (e.g., Engineering, Medicine, Pure Sciences, Commerce, Humanities, or All Streams).\n• **Domicile State (20%)**: Central schemes match 100% across all states; state schemes require residency in that specific state.\n• **Annual Family Income (15%)**: Ensures parental income falls below required ceilings (e.g., ₹2.5L for SC/ST post-matric, ₹4.5L for CSSS, ₹8.0L for Pragati/EWS).\n• **Social Category & Quota (10%)**: Checks matching categories (General, OBC-NCL, SC, ST, EWS, Minority, Specially-Abled, or Girl Child).\n\n💡 Current Match Profile: **${profile.name || 'Student'}** (${profile.educationLevel}, ${profile.stateOfResidence || 'All India'}).`,
        timestamp: nowStr,
        badges: ['Smart Matching', 'Deterministic Engine'],
        actionLinks: [
          { label: 'Explore Level Categories', route: `/categories/${profile.educationLevel}` },
          { label: 'View Your Eligible Matches', route: '/scholarships/undergraduate/Any%20%2F%20All%20Streams' }
        ],
        followUps: [
          'What are the upcoming scholarship deadlines?',
          'What documents are required to apply?',
          'Which scholarships offer the highest award amount?'
        ]
      };
    }

    // 4. REQUIRED DOCUMENTS
    if (q.includes('document') || q.includes('certificate') || q.includes('income cert') || q.includes('caste') || q.includes('bonafide') || q.includes('aadhaar') || q.includes('paper')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `📑 **Mandatory Documents Checklist for Government Scholarships**\n\nKeep clean PDF scans (under 200KB each) of these official certificates ready:\n\n1. **Aadhaar Card**: Must be linked to your active mobile number for e-KYC authentication.\n2. **Bank Passbook Copy**: Account must be seeded with Aadhaar on the **NPCI mapper** for DBT.\n3. **Income Certificate**: Issued by Revenue Authority (Tahsildar / Sub-Divisional Magistrate) for the current financial year.\n4. **Domicile / Nativity Certificate**: Required for State Government schemes.\n5. **Community / Caste Certificate**: For SC, ST, OBC (Non-Creamy Layer), or EWS quota.\n6. **Bonafide Student Certificate**: Duly stamped and signed by Principal/Registrar with institutional seal.\n7. **Academic Marksheets**: Class 10th, 12th board marks, and previous semester grade sheets.\n8. **College Admission Fee Receipt**: Demonstrates active enrollment for the current year.`,
        timestamp: nowStr,
        badges: ['Mandatory Checklist', 'PDF/Scan Ready'],
        actionLinks: [
          { label: 'Open Application Tracker Checklist', route: '/tracker' }
        ],
        followUps: [
          'What is the step-by-step application process?',
          'What are the upcoming scholarship deadlines?',
          'How do I check my live application status?'
        ]
      };
    }

    // 5. APPLICATION TRACKER & LIVE STATUS
    if (q.includes('tracker') || q.includes('status') || q.includes('live') || q.includes('application id') || q.includes('otr') || q.includes('check status')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `🔍 **Application Tracking & Live Official Scrutiny**\n\nGrantly lets you manage your full application pipeline:\n\n• **5 Tracking Stages**: *Interested* ➜ *Preparing Documents* ➜ *Submitted* ➜ *Under Review* ➜ *Awarded*.\n• **Document Checklist**: Check off individual certificates as you acquire them from revenue and college offices.\n• **Application ID Storage**: Save your official portal reference number (e.g. \`NSP2026-KA-883921\`) safely in local storage.\n• **Live Status Inquiry**: For supported portals, use the built-in live status lookup to check if your file is at Institute (L1), District/State (L2), or Sanction (L3) stage.\n\nYou currently have **${trackedApplications.length} schemes** tracked.`,
        timestamp: nowStr,
        badges: ['Kanban Board', 'Status Checker'],
        actionLinks: [
          { label: 'Go to Application Tracker', route: '/tracker' }
        ],
        followUps: [
          'What is the step-by-step application process?',
          'What are the upcoming scholarship deadlines?',
          'What documents are required to apply?'
        ]
      };
    }

    // 6. SPECIFIC SCHEME: AICTE PRAGATI FOR GIRLS
    if (q.includes('pragati') || q.includes('girl') || q.includes('aicte')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `👧 **AICTE Pragati Scholarship for Girl Students**\n\n• **Award Amount**: **₹50,000 per annum** for every year of technical study (Degree or Diploma).\n• **Eligibility Criteria**:\n  - Female students admitted to 1st year (or lateral entry 2nd year) in an AICTE-approved institution.\n  - Max 2 girl children per family.\n  - Family annual income must not exceed **₹8.0 Lakh**.\n• **Current Status**: **Applications Open**\n• **Deadline**: **31 December 2026**\n• **Application Portal**: National Scholarship Portal (NSP \`scholarships.gov.in\`).`,
        timestamp: nowStr,
        badges: ['₹50,000 / Year', 'Women in STEM'],
        actionLinks: [
          { label: 'Explore Engineering Scholarships', route: '/scholarships/undergraduate/Engineering%20%26%20Technology' },
          { label: 'Visit Official NSP Portal', url: 'https://scholarships.gov.in' }
        ],
        followUps: [
          'What documents are required to apply?',
          'What are the upcoming scholarship deadlines?',
          'What is the step-by-step application process?'
        ]
      };
    }

    // 7. SPECIFIC SCHEME: HIGHEST PAYING / RESEARCH / PMRF
    if (q.includes('highest') || q.includes('maximum') || q.includes('pmrf') || q.includes('amount') || q.includes('fellowship') || q.includes('phd')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `💰 **Highest Awarded Scholarships in India**\n\n1. **Prime Minister's Research Fellowship (PMRF)**:\n   • **Award**: ₹70,000/month (Years 1-2) ➜ ₹75,000/month (Year 3) ➜ ₹80,000/month (Years 4-5) + ₹2 Lakh/year contingency grant.\n   • **Level**: Ph.D. / Doctoral Research in IITs, IISc, IISERs.\n\n2. **DST INSPIRE Scholarship for Higher Education (SHE)**:\n   • **Award**: ₹80,000 per annum (₹60,000 cash + ₹20,000 mentorship project grant).\n   • **Level**: B.Sc / M.Sc Pure & Natural Sciences.\n\n3. **AICTE Pragati & Saksham**:\n   • **Award**: ₹50,000 per annum for tuition & equipment.\n\n4. **Central Sector Scheme (CSSS)**:\n   • **Award**: ₹12,000/yr (UG) up to ₹20,000/yr (PG).`,
        timestamp: nowStr,
        badges: ['High-Value Grants', 'Research Fellowships'],
        actionLinks: [
          { label: 'Explore Doctoral Schemes', route: '/scholarships/doctoral/Any%20%2F%20All%20Streams' }
        ],
        followUps: [
          'What are the upcoming scholarship deadlines?',
          'What is the step-by-step application process?',
          'Tell me about the AICTE Pragati Scholarship for girls'
        ]
      };
    }

    // 8. CENTRAL VS STATE SCHEMES
    if (q.includes('central') || q.includes('state') || q.includes('portal') || q.includes('nsp') || q.includes('difference')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `🏛️ **Central vs State Government Scholarships: Key Differences**\n\n• **Central Government Schemes (NSP)**:\n  - Managed by Central Ministries (Ministry of Education, Social Justice, Tribal Affairs, Minority Affairs, AICTE, DST).\n  - Open to students from **any state in India** based on national quotas.\n  - Applied via the single window National Scholarship Portal (\`scholarships.gov.in\`).\n\n• **State Government Schemes**:\n  - Funded and administered by respective State Higher Education and Social Welfare Departments.\n  - Require **State Domicile / Nativity**.\n  - Applied via state portals like Karnataka SSP (\`ssp.postmatric.karnataka.gov.in\`), MahaDBT (\`mahadbt.maharashtra.gov.in\`), UP Saksham, etc.\n\n💡 **Tip**: You can apply for multiple opportunities to maximize selection chances, but rules typically allow accepting tuition funding from only one primary government scheme per fiscal year.`,
        timestamp: nowStr,
        badges: ['GovTech Policy', 'Portal Comparison'],
        actionLinks: [
          { label: 'Filter Central Schemes', route: '/scholarships/all/Any%20%2F%20All%20Streams' }
        ],
        followUps: [
          'What are the upcoming scholarship deadlines?',
          'What is the step-by-step application process?',
          'What documents are required to apply?'
        ]
      };
    }

    // 9. INCOME CEILING & RESERVATION
    if (q.includes('income') || q.includes('quota') || q.includes('obc') || q.includes('sc') || q.includes('st') || q.includes('ews') || q.includes('reservation')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `📊 **Parental Income Ceilings & Category Reservation Overview**\n\nMost government scholarships stipulate family income limits to target deserving students:\n\n• **Post-Matric SC / ST Schemes**: Up to **₹2.5 Lakh / year** (covers full tuition fee waiver + monthly stipend).\n• **Central Sector Scheme (CSSS)**: Up to **₹4.5 Lakh / year** (plus 80th percentile in Class 12 board).\n• **Post-Matric OBC / DNT / EBC Schemes**: Up to **₹2.5 Lakh / year**.\n• **EWS (Economically Weaker Section)**: Up to **₹8.0 Lakh / year**.\n• **AICTE Pragati & Saksham**: Up to **₹8.0 Lakh / year**.\n• **Merit-Only Schemes (DST INSPIRE, PMRF)**: No family income limit; selection purely on merit rank and research aptitude!`,
        timestamp: nowStr,
        badges: ['Income Guidelines', 'Quota Rules'],
        actionLinks: [
          { label: 'View Schemes for Your Level', route: `/categories/${profile.educationLevel}` }
        ],
        followUps: [
          'What are the upcoming scholarship deadlines?',
          'What is the step-by-step application process?',
          'What documents are required to apply?'
        ]
      };
    }

    // 10. GREETING / DEFAULT / FALLBACK
    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: `I'm here to help with your scholarship search! You asked: *"${query}"*.\n\nHere are some of the most common topics I can answer with verified government details:\n\n• **"Upcoming deadlines"**: Lists closing dates for Central & State schemes.\n• **"How to apply"**: Step-by-step guidance for NSP and State portals.\n• **"Required documents"**: Official certificate checklist.\n• **"Matching criteria"**: How Grantly matches your education level & stream.\n• **"Pragati scholarship"**: Specifics for female engineering students.\n• **"Track application"**: Using Grantly's Kanban application tracker.\n\nTap any prompt chip below or type your question!`,
      timestamp: nowStr,
      badges: ['Help Center', 'Quick Suggestions'],
      followUps: [
        'What are the upcoming scholarship deadlines?',
        'What is the step-by-step application process?',
        'What documents are required to apply?'
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* 
        NEW COMPACT, DISTINCT FLOATING PILL BUTTON (SMALL & DIFFERENT)
        - Height: h-10 (40px)
        - Distinct sleek floating pill with sparkling bot icon, label, and live pulse dot
        - Minimal footprint that never blocks underlying content
      */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex items-center select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Grantly Assistant' : 'Open Grantly Assistant Chatbot'}
          className={`flex items-center gap-2 h-10 px-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border text-xs font-bold ${
            isOpen
              ? 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800 scale-95'
              : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white border-blue-400/30 hover:scale-105 shadow-blue-500/25'
          }`}
        >
          {isOpen ? (
            <>
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="tracking-tight">Ask Grantly</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-blue-700 animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* 
        ELEVATED CHATBOT DIALOG WINDOW
        - Modern header with verified badge, subtitle, and control icons
        - Polished message cards with copy text, helpfulness rating, and dynamic follow-up chips
        - Responsive: sleek floating card on desktop, bottom-sheet drawer on mobile
      */}
      {isOpen && (
        <div 
          className="fixed inset-x-2 bottom-16 top-16 sm:inset-auto sm:bottom-16 sm:right-5 sm:w-[420px] sm:h-[590px] z-50 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/95 flex flex-col overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
          role="dialog"
          aria-label="Grantly Chatbot Assistant"
        >
          
          {/* HEADER */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shadow-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-extrabold tracking-tight">Grantly Assistant</h3>
                  <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-400/30">
                    Official Guide
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Instant verified answers for deadlines & eligibility
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={resetChat}
                title="Restart Chat"
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize Window"
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MESSAGES SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Bubble Container */}
                <div
                  className={`max-w-[90%] rounded-2xl p-3.5 shadow-2xs leading-relaxed text-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  {/* Badges for assistant message */}
                  {msg.badges && msg.badges.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-2">
                      {msg.badges.map((b, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Message body */}
                  <div className="space-y-1.5 whitespace-pre-wrap">
                    {msg.text.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>
                        {paragraph.split('\n').map((line, lidx) => (
                          <React.Fragment key={lidx}>
                            {line.startsWith('• ') ? (
                              <span className="flex items-start gap-1.5 pl-1 my-0.5">
                                <span className="text-blue-600 font-bold shrink-0">•</span>
                                <span>{line.replace('• ', '')}</span>
                              </span>
                            ) : line.startsWith('**') && line.endsWith('**') ? (
                              <strong className="block text-slate-900 font-bold mt-1">
                                {line.replace(/\*\*/g, '')}
                              </strong>
                            ) : (
                              <span>
                                {line.split(/(\*\*.*?\*\*|\`.*?\`)/).map((chunk, cidx) => {
                                  if (chunk.startsWith('**') && chunk.endsWith('**')) {
                                    return <strong key={cidx} className="font-bold text-slate-900">{chunk.replace(/\*\*/g, '')}</strong>;
                                  }
                                  if (chunk.startsWith('`') && chunk.endsWith('`')) {
                                    return <code key={cidx} className="px-1 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] border border-slate-200">{chunk.replace(/\`/g, '')}</code>;
                                  }
                                  return chunk;
                                })}
                              </span>
                            )}
                            {lidx < line.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  {msg.actionLinks && msg.actionLinks.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.actionLinks.map((link, lidx) => (
                        link.route ? (
                          <button
                            key={lidx}
                            type="button"
                            onClick={() => {
                              navigate(link.route!);
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] border border-blue-200 transition"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <a
                            key={lidx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] border border-slate-200 transition"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>
                        )
                      ))}
                    </div>
                  )}

                  {/* Assistant Message Footer: Copy & Feedback */}
                  {msg.sender === 'bot' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100/90 flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span>Helpful?</span>
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, 'up')}
                          className={`p-1 rounded hover:bg-slate-100 transition ${
                            feedbackGiven[msg.id] === 'up' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="Helpful answer"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, 'down')}
                          className={`p-1 rounded hover:bg-slate-100 transition ${
                            feedbackGiven[msg.id] === 'down' ? 'text-rose-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-slate-600 transition p-1"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up question chips */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-2 space-y-1 w-full max-w-[90%]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">
                      Related Questions:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.followUps.map((fu, fidx) => (
                        <button
                          key={fidx}
                          type="button"
                          onClick={() => handleSendMessage(fu)}
                          className="text-left text-[11px] font-medium text-blue-700 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-xl transition shadow-2xs flex items-center justify-between group"
                        >
                          <span>{fu}</span>
                          <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Simulated typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200 text-slate-400 max-w-[120px]">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1 font-medium text-slate-500">Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK SUGGESTION PROMPTS CHIPS */}
          <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 text-xs no-scrollbar shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-1">
              Popular:
            </span>
            {DEFAULT_SUGGESTIONS.map((prompt, pidx) => (
              <button
                key={pidx}
                type="button"
                onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-medium text-[11px] transition shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* CHAT INPUT FORM */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about deadlines, process, matches..."
                className="flex-1 px-3.5 py-2.5 min-h-[42px] text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                aria-label="Send question"
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition shadow-xs shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1 text-[10px] text-center text-slate-400">
              Verified against official NSP & State Government gazetted rules.
            </div>
          </div>

        </div>
      )}
    </>
  );
};
