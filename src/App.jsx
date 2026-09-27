import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Edit3, 
  ArrowRight,
  Database,
  Zap
} from 'lucide-react';

// Safely retrieve environment variables across Vite, Process, and Window
const getEnvVar = (key) => {
  let val = '';
  try {
    if (key === 'VITE_SUPABASE_URL') {
      val = import.meta.env.VITE_SUPABASE_URL;
    } else if (key === 'VITE_SUPABASE_ANON_KEY') {
      val = import.meta.env.VITE_SUPABASE_ANON_KEY;
    }
  } catch (e) {
    // import.meta not supported in non-Vite environments
  }
  if (val) return val;
  if (typeof window !== 'undefined' && window[key]) return window[key];
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

const SURVEY_DATA = {
  title: "VEXA EARLY ACCESS & APPLICANT FORM",
  intro: {
    welcomeTitle: "Shape the Future of Professional Networking",
    text: "We are developing a new way for professionals, entrepreneurs, businesses, and organizations to connect and exchange contact information. Instead of relying on traditional paper business cards, Vexa uses digital profiles, NFC technology, and smart networking tools to make connections easier to create, manage, and follow up. We are currently looking for people interested in testing Vexa and helping us shape the product before launch.",
    estTime: "3–5 minutes",
    note: "Your responses will help us understand how people currently network and what would make a digital networking platform genuinely useful."
  },
  sections: [
    {
      id: "sec_1",
      number: 1,
      title: "SECTION 1 — ABOUT YOU",
      description: "First, we'd like to understand a little about you and your professional background.",
      questions: [
        { id: "email", qNum: 1, text: "Email", type: "email", required: true, placeholder: "name@company.com" },
        { id: "full_name", qNum: 2, text: "Full Name", type: "text", required: true, placeholder: "Alex Morgan" },
        { id: "email_address", qNum: 3, text: "Email Address", type: "email", required: true, placeholder: "Confirm preferred primary email" },
        { id: "phone_number", qNum: 4, text: "Phone Number", type: "tel", required: true, placeholder: "+1 (555) 000-0000" },
        { 
          id: "description", 
          qNum: 5, 
          text: "What best describes you?", 
          type: "radio", 
          required: true,
          options: [
            "Entrepreneur / Business Owner",
            "Employee / Professional",
            "Freelancer",
            "Student",
            "Sales / Business Development",
            "Marketing Professional",
            "Consultant",
            "Event Organizer",
            "Company / Organization Representative",
            "Other"
          ]
        },
        { id: "industry", qNum: 6, text: "What industry or field are you in?", type: "text", required: true, placeholder: "e.g. Technology, Finance, Healthcare" },
        { id: "job_title", qNum: 7, text: "What is your current job title or role?", type: "text", required: false, placeholder: "e.g. Senior Product Manager" }
      ]
    },
    {
      id: "sec_2",
      number: 2,
      title: "SECTION 2 — YOUR NETWORKING HABITS",
      description: "We'd like to understand how you currently meet and exchange information with professional contacts.",
      questions: [
        {
          id: "networking_frequency",
          qNum: 8,
          text: "How often do you meet new professional contacts?",
          type: "radio",
          required: true,
          options: [
            "Daily",
            "Several times a week",
            "Weekly",
            "Several times a month",
            "Occasionally",
            "Rarely"
          ]
        },
        {
          id: "networking_locations",
          qNum: 9,
          text: "Where do you usually meet new professional contacts?",
          type: "checkbox",
          required: true,
          options: [
            "Business events",
            "Conferences",
            "Networking events",
            "Trade shows / exhibitions",
            "Workplace",
            "Universities / career events",
            "Social events",
            "Online",
            "Referrals",
            "Other"
          ]
        },
        {
          id: "contact_sharing_methods",
          qNum: 10,
          text: "How do you currently share your contact information?",
          type: "checkbox",
          required: true,
          options: [
            "Physical business cards",
            "Phone number",
            "WhatsApp",
            "QR code",
            "LinkedIn",
            "Email",
            "Digital business card",
            "Website / portfolio",
            "Other"
          ]
        },
        {
          id: "physical_business_card_frequency",
          qNum: 11,
          text: "How often do you use physical business cards?",
          type: "radio",
          required: true,
          options: [
            "Very frequently",
            "Frequently",
            "Sometimes",
            "Rarely",
            "Never"
          ]
        },
        {
          id: "contact_follow_up_behavior",
          qNum: 12,
          text: "What usually happens to the contacts you meet at networking events?",
          type: "radio",
          required: true,
          options: [
            "I save them immediately",
            "I save them later",
            "I connect with them on social media",
            "I keep their business card",
            "I usually forget to save them",
            "I often lose track of them",
            "Other"
          ]
        }
      ]
    },
    {
      id: "sec_3",
      number: 3,
      title: "SECTION 3 — THE NETWORKING PROBLEM",
      description: "We want to understand the challenges people experience after meeting new contacts.",
      questions: [
        {
          id: "networking_problems",
          qNum: 13,
          text: "What problems do you experience when networking?",
          type: "checkbox",
          required: false,
          options: [
            "Carrying physical business cards",
            "Running out of business cards",
            "Losing business cards",
            "Contact information becoming outdated",
            "Manually entering contacts into my phone",
            "Forgetting who I met",
            "Forgetting where I met someone",
            "Difficulty following up",
            "Having too many contacts to manage",
            "Finding the right contact later",
            "I don't experience any major problems",
            "Other"
          ]
        }
      ]
    },
    {
      id: "sec_4",
      number: 4,
      title: "SECTION 4 — INTRODUCING VEXA",
      introConcept: "Imagine this:\nInstead of giving someone a traditional paper business card, you have a digital professional profile connected to an NFC card.\nWhen you meet someone, they simply tap their phone against your NFC card. Your digital profile opens instantly, allowing them to view your contact information, social links, website and other professional details.\nThey can then choose to connect with you. Both people can exchange their contact information, and the connection can be saved digitally.\nVexa could also allow you to remember where you met someone, add notes about the connection and receive follow-up reminders.\nThe goal is to make professional networking easier before, during and after the initial introduction.",
      questions: [
        {
          id: "concept_usefulness",
          qNum: 14,
          text: "How useful would this concept be to you?",
          type: "scale_1_5",
          required: true,
          minLabel: "1 — Not useful at all",
          maxLabel: "5 — Extremely useful"
        },
        {
          id: "valuable_features",
          qNum: 15,
          text: "Which parts of Vexa would be most valuable to you?",
          type: "checkbox",
          required: true,
          options: [
            "NFC contact sharing",
            "QR code sharing",
            "Digital professional profile",
            "Two-way contact exchange",
            "Automatically saving new connections",
            "Networking history",
            "Remembering where I met someone",
            "Adding notes about connections",
            "Follow-up reminders",
            "AI-generated follow-up messages",
            "Networking analytics",
            "Lead management",
            "Event networking",
            "Company/team management",
            "Other"
          ]
        },
        {
          id: "nfc_card_interest",
          qNum: 16,
          text: "Would you use an NFC card to share your professional information?",
          type: "radio",
          required: true,
          options: [
            "Definitely",
            "Probably",
            "Maybe",
            "Probably not",
            "Definitely not"
          ]
        },
        {
          id: "nfc_vs_paper_preference",
          qNum: 17,
          text: "Would you prefer this method of sharing your information over a traditional paper business card?",
          type: "radio",
          required: false,
          options: [
            "Definitely yes",
            "Probably yes",
            "Not sure",
            "Probably no",
            "Definitely no"
          ]
        }
      ]
    },
    {
      id: "sec_5",
      number: 5,
      title: "SECTION 5 — BUSINESS & PROFESSIONAL USE",
      description: "Let us know how you envision using Vexa in your team or organization.",
      questions: [
        {
          id: "business_use",
          qNum: 18,
          text: "Would you use this platform for your business or professional work?",
          type: "radio",
          required: true,
          options: [
            "Yes",
            "No",
            "Maybe",
            "I would need to learn more"
          ]
        },
        {
          id: "team_profiles",
          qNum: 19,
          text: "If you work with a team, would you be interested in giving employees their own digital networking profiles?",
          type: "radio",
          required: false,
          options: [
            "Yes",
            "No",
            "Maybe",
            "Not applicable — I don't work with a team"
          ]
        }
      ]
    },
    {
      id: "sec_6",
      number: 6,
      title: "SECTION 6 — CONCERNS & TRUST",
      description: "We take trust, security, and usability seriously.",
      questions: [
        {
          id: "concerns",
          qNum: 20,
          text: "What concerns would you have about using an NFC networking platform?",
          type: "checkbox",
          required: false,
          options: [
            "Privacy",
            "Security",
            "Cost",
            "Data protection",
            "People not knowing how to use NFC",
            "Phone compatibility",
            "Internet connectivity",
            "Sharing my contact information",
            "Receiving unwanted messages",
            "I don't have any concerns",
            "Other"
          ]
        },
        {
          id: "trust_factors",
          qNum: 21,
          text: "What would make you trust a platform like this?",
          type: "textarea",
          required: false,
          placeholder: "Share what security certifications, policies, or brand qualities matter most..."
        }
      ]
    },
    {
      id: "sec_7",
      number: 7,
      title: "SECTION 7 — EARLY ACCESS",
      description: "Help us shape the Vexa experience before official release.",
      questions: [
        {
          id: "early_access_interest",
          qNum: 22,
          text: "Would you be interested in testing Vexa before public launch?",
          type: "radio",
          required: true,
          options: [
            "Yes",
            "No",
            "Maybe"
          ]
        }
      ]
    },
    {
      id: "sec_8",
      number: 8,
      title: "SECTION 8 — EARLY TESTER DETAILS",
      description: "Customize your participation preferences as a beta tester.",
      isConditional: true,
      questions: [
        {
          id: "testing_interests",
          qNum: 23,
          text: "What would you be interested in testing?",
          type: "checkbox",
          required: true,
          options: [
            "NFC card",
            "Digital profile",
            "Contact exchange",
            "Networking dashboard",
            "Connection history",
            "Follow-up features",
            "Business features",
            "Event networking",
            "All of the above"
          ]
        },
        {
          id: "testing_participation",
          qNum: 24,
          text: "How would you prefer to participate in the testing?",
          type: "radio",
          required: false,
          options: [
            "Test the NFC card",
            "Test the digital profile",
            "Test the contact exchange",
            "Give product feedback",
            "Participate in interviews",
            "Test Vexa at an event",
            "Report bugs or problems",
            "All of the above"
          ]
        }
      ]
    },
    {
      id: "sec_9",
      number: 9,
      title: "SECTION 9 — FINAL FEEDBACK",
      description: "Final thoughts to help us build a product you'll love.",
      questions: [
        {
          id: "need_feature",
          qNum: 25,
          text: "What feature would make you say, \"I actually need this\"?",
          type: "textarea",
          required: false,
          placeholder: "Describe the killer feature or workflow..."
        },
        {
          id: "additional_feedback",
          qNum: 26,
          text: "Is there anything else you'd like us to know about Vexa?",
          type: "textarea",
          required: false,
          placeholder: "Any additional thoughts or questions for our team..."
        }
      ]
    }
  ]
};

export default function App() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const activeSections = useMemo(() => {
    const q22Answer = formData['early_access_interest'];
    if (q22Answer === 'No') {
      return SURVEY_DATA.sections.filter(sec => sec.id !== 'sec_8');
    }
    return SURVEY_DATA.sections;
  }, [formData]);

  useEffect(() => {
    if (formData['early_access_interest'] === 'No') {
      if (formData['testing_interests'] || formData['testing_participation']) {
        setFormData(prev => {
          const nextData = { ...prev };
          delete nextData['testing_interests'];
          delete nextData['testing_participation'];
          return nextData;
        });
      }
    }
  }, [formData]);

  const currentSection = activeSections[currentSectionIdx] || activeSections[0];

  const handleTextChange = (qId, value) => {
    setFormData(prev => ({ ...prev, [qId]: value }));
    if (errors[qId]) {
      setErrors(prev => ({ ...prev, [qId]: null }));
    }
  };

  const handleRadioChange = (qId, option) => {
    setFormData(prev => ({ ...prev, [qId]: option }));
    if (errors[qId]) {
      setErrors(prev => ({ ...prev, [qId]: null }));
    }
  };

  const handleCheckboxChange = (qId, option) => {
    const current = formData[qId] || [];
    let updated;
    if (current.includes(option)) {
      updated = current.filter(item => item !== option);
    } else {
      updated = [...current, option];
    }
    setFormData(prev => ({ ...prev, [qId]: updated }));
    if (errors[qId]) {
      setErrors(prev => ({ ...prev, [qId]: null }));
    }
  };

  const validateCurrentSection = () => {
    const sectionErrors = {};
    let isValid = true;

    currentSection.questions.forEach(q => {
      if (q.required) {
        const val = formData[q.id];
        if (q.type === 'checkbox') {
          if (!val || !Array.isArray(val) || val.length === 0) {
            sectionErrors[q.id] = "Please select at least one option.";
            isValid = false;
          }
        } else if (q.type === 'email') {
          if (!val || typeof val !== 'string' || !val.trim()) {
            sectionErrors[q.id] = "This field is required.";
            isValid = false;
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
            sectionErrors[q.id] = "Please enter a valid email address.";
            isValid = false;
          }
        } else {
          if (!val || (typeof val === 'string' && !val.trim())) {
            sectionErrors[q.id] = "This field is required.";
            isValid = false;
          }
        }
      }
    });

    setErrors(sectionErrors);
    return isValid;
  };

  const handleNextSection = () => {
    if (!validateCurrentSection()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentSectionIdx < activeSections.length - 1) {
      setCurrentSectionIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIdx > 0) {
      setCurrentSectionIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('welcome');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    const responseId = 'VEXA-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const timestamp = new Date().toISOString();

    const recordPayload = {
      response_id: responseId,
      submitted_at: timestamp,
      email: formData.email || null,
      full_name: formData.full_name || null,
      email_address: formData.email_address || null,
      phone_number: formData.phone_number || null,
      description: formData.description || null,
      industry: formData.industry || null,
      job_title: formData.job_title || null,
      networking_frequency: formData.networking_frequency || null,
      networking_locations: formData.networking_locations || [],
      contact_sharing_methods: formData.contact_sharing_methods || [],
      physical_business_card_frequency: formData.physical_business_card_frequency || null,
      contact_follow_up_behavior: formData.contact_follow_up_behavior || null,
      networking_problems: formData.networking_problems || [],
      concept_usefulness: formData.concept_usefulness ? Number(formData.concept_usefulness) : null,
      valuable_features: formData.valuable_features || [],
      nfc_card_interest: formData.nfc_card_interest || null,
      nfc_vs_paper_preference: formData.nfc_vs_paper_preference || null,
      business_use: formData.business_use || null,
      team_profiles: formData.team_profiles || null,
      concerns: formData.concerns || [],
      trust_factors: formData.trust_factors || null,
      early_access_interest: formData.early_access_interest || null,
      testing_interests: formData.testing_interests || [],
      testing_participation: formData.testing_participation || null,
      need_feature: formData.need_feature || null,
      additional_feedback: formData.additional_feedback || null,
      raw_data: formData
    };

    try {
      if (supabaseUrl && supabaseAnonKey) {
        // Native REST API fetch call to Supabase directly
        const response = await fetch(`${supabaseUrl}/rest/v1/survey_responses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(recordPayload)
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || `Supabase error (status ${response.status})`);
        }
      } else {
        // Fallback to Express backend server endpoint
        const response = await fetch('http://localhost:5000/api/survey/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recordPayload)
        });

        if (!response.ok) {
          throw new Error(`Backend server error (status ${response.status})`);
        }
      }

      setSubmissionResult({
        id: responseId,
        time: timestamp
      });
      setCurrentStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "Failed to submit response. Please check your network or database connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestionInput = (q) => {
    const errorMsg = errors[q.id];

    switch (q.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div className="mt-2">
            <input
              type={q.type}
              value={formData[q.id] || ''}
              onChange={(e) => handleTextChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              className={`w-full px-4 py-3.5 rounded-xl border bg-slate-900/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errorMsg 
                  ? 'border-rose-500/80 focus:ring-rose-500/30' 
                  : 'border-slate-800 focus:border-cyan-500/80 focus:ring-cyan-500/20'
              }`}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="mt-2">
            <textarea
              rows={4}
              value={formData[q.id] || ''}
              onChange={(e) => handleTextChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              className={`w-full px-4 py-3.5 rounded-xl border bg-slate-900/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errorMsg 
                  ? 'border-rose-500/80 focus:ring-rose-500/30' 
                  : 'border-slate-800 focus:border-cyan-500/80 focus:ring-cyan-500/20'
              }`}
            />
          </div>
        );

      case 'radio':
        return (
          <div className="mt-3 space-y-2.5">
            {q.options.map((opt, idx) => {
              const isSelected = formData[q.id] === opt;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleRadioChange(q.id, opt)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-950/20 text-cyan-100 shadow-md shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                      : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-medium pr-3">{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700 group-hover:border-slate-500'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'checkbox':
        const selectedArr = formData[q.id] || [];
        return (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {q.options.map((opt, idx) => {
              const isSelected = selectedArr.includes(opt);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleCheckboxChange(q.id, opt)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                    isSelected
                      ? 'border-cyan-500/90 bg-cyan-950/25 text-cyan-100 shadow-sm ring-1 ring-cyan-500/30'
                      : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700 group-hover:border-slate-500'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                  </div>
                  <span className="text-sm font-medium leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>
        );

      case 'scale_1_5':
        const currentVal = formData[q.id];
        return (
          <div className="mt-4">
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = currentVal === num || currentVal === String(num);
                return (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handleRadioChange(q.id, num)}
                    className={`py-4 rounded-xl border font-bold text-lg flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-slate-400 px-1 font-medium">
              <span>{q.minLabel}</span>
              <span>{q.maxLabel}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      {/* Top Header / Branding Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider text-slate-100">VEXA</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 ml-2 px-2 py-0.5 rounded-full">Early Access</span>
            </div>
          </div>

          {(supabaseUrl && supabaseAnonKey) ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full font-medium">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Local Server Mode</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        
        {/* ================= SCREEN 1: WELCOME ================= */}
        {currentStep === 'welcome' && (
          <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Product Survey</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 tracking-tight leading-tight mb-4">
              {SURVEY_DATA.intro.welcomeTitle}
            </h1>

            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {SURVEY_DATA.intro.text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Time</div>
                  <div className="text-sm font-semibold text-slate-200">{SURVEY_DATA.intro.estTime}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Data Protection</div>
                  <div className="text-sm font-semibold text-slate-200">Strictly Confidential & Secure</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic mb-8 border-l-2 border-slate-700 pl-3">
              "{SURVEY_DATA.intro.note}"
            </p>

            <button
              onClick={() => setCurrentStep('survey')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Start Survey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ================= SCREEN 2: SURVEY QUESTIONNAIRE ================= */}
        {currentStep === 'survey' && (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
                <span className="uppercase tracking-wider text-cyan-400">{currentSection.title}</span>
                <span>Section {currentSectionIdx + 1} of {activeSections.length}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSectionIdx + 1) / activeSections.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Section Card */}
            <div className="bg-slate-900/40 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
              {currentSection.description && (
                <p className="text-sm text-slate-300 border-b border-slate-800/80 pb-4 mb-6">
                  {currentSection.description}
                </p>
              )}

              {/* Section 4 Concept Highlight */}
              {currentSection.introConcept && (
                <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-slate-200 text-sm leading-relaxed mb-8 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>The Vexa Concept</span>
                  </div>
                  {currentSection.introConcept.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-8">
                {currentSection.questions.map((q) => (
                  <div key={q.id} className="space-y-2">
                    <label className="block text-base font-semibold text-slate-100">
                      <span className="text-cyan-400 mr-2">Q{q.qNum}.</span>
                      {q.text}
                      {q.required ? (
                        <span className="text-rose-400 ml-1" title="Required">*</span>
                      ) : (
                        <span className="text-xs text-slate-500 font-normal ml-2">(Optional)</span>
                      )}
                    </label>

                    {renderQuestionInput(q)}

                    {errors[q.id] && (
                      <div className="flex items-center gap-1.5 text-rose-400 text-xs mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors[q.id]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handlePrevSection}
                  className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextSection}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-colors"
                >
                  <span>{currentSectionIdx === activeSections.length - 1 ? 'Review Answers' : 'Next Section'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCREEN 3: REVIEW ANSWERS ================= */}
        {currentStep === 'review' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Review Your Answers</h2>
                  <p className="text-xs text-slate-400 mt-1">Please confirm your responses before final submission.</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentSectionIdx(0);
                    setCurrentStep('survey');
                  }}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit All</span>
                </button>
              </div>

              <div className="space-y-6 divide-y divide-slate-800/80">
                {activeSections.map((sec) => (
                  <div key={sec.id} className="pt-6 first:pt-0 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">{sec.title}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {sec.questions.map((q) => {
                        const val = formData[q.id];
                        let displayVal = "Not answered";
                        if (Array.isArray(val)) {
                          displayVal = val.length > 0 ? val.join(', ') : "None selected";
                        } else if (val) {
                          displayVal = String(val);
                        }

                        return (
                          <div key={q.id} className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3.5">
                            <div className="text-xs text-slate-400 font-medium mb-1">Q{q.qNum}. {q.text}</div>
                            <div className="text-sm font-semibold text-slate-200 break-words">{displayVal}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {submitError && (
                <div className="mt-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSectionIdx(activeSections.length - 1);
                    setCurrentStep('survey');
                  }}
                  className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-sm flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Survey</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Response</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCREEN 4: THANK YOU / SUCCESS ================= */}
        {currentStep === 'success' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/10">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
              Thank you for helping shape Vexa.
            </h1>

            <p className="text-slate-300 text-base max-w-md mx-auto mb-6">
              Your response has been saved directly to our database.
            </p>

            {submissionResult && (
              <div className="inline-block bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 text-xs text-slate-400 mb-8">
                <div>Response ID: <span className="font-mono text-cyan-400 font-semibold">{submissionResult.id}</span></div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setFormData({});
                  setErrors({});
                  setCurrentSectionIdx(0);
                  setCurrentStep('welcome');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-colors"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}