import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Play,
  Info,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp,
  Target,
  BarChart3,
  Layers,
  Database,
  FileSpreadsheet,
  Cpu,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Menu,
  Copy,
  Check,
  RotateCcw,
  Shield,
  Send,
  Printer,
  FastForward,
  Loader2
} from 'lucide-react';

const PERSONAL_INFO = {
  name: 'Pugazhenthi M',
  preferredName: 'Pugazh',
  headline: 'MIS EXECUTIVE | WFM | RTQM | OPERATIONS & REPORTING',
  tagline: 'Turning operational data into meaningful insights through reporting, performance monitoring, and process improvement.',
  location: 'Coimbatore, Tamil Nadu, India',
  email: 'pugazhenthimurasolimaran@gmail.com',
  phone: '99438 25312',
  phoneFormatted: '+91 99438 25312',
  currentEmployer: 'HDB Financial Services',
  currentRole: 'MIS Executive',
  joinDate: '06 October 2026',
  careerInterests: 'Data Analytics, Power BI, Business Intelligence, and Reporting Analytics'
};

const EXPERIENCE_CARDS = [
  {
    id: 'hdb',
    role: 'MIS Executive',
    company: 'HDB Financial Services',
    period: '06 October 2026 – Present',
    isCurrent: true,
    location: 'Coimbatore, Tamil Nadu',
    summary: 'Supporting operational reporting, structured data management, performance tracking, and MIS reporting requirements.',
    responsibilities: [
      'Prepare and maintain Management Information System (MIS) daily and weekly reports.',
      'Organize and validate operational data streams to ensure reporting accuracy.',
      'Track relevant key performance indicators and assist with variance analysis.',
      'Support management reporting decks and facilitate data-driven operational reviews.',
      'Use Microsoft Excel formulas and pivot structures to organize and reconcile data.'
    ],
    tools: ['Microsoft Excel', 'Data Validation', 'MIS Dashboards', 'Operational Tracking'],
    accentGradient: 'from-red-950 via-neutral-900 to-black'
  },
  {
    id: 'hrh-rtqm',
    role: 'Real-Time Queue Manager (RTQM)',
    company: 'HRH Next Services Limited',
    period: 'July 2025 – May 2026',
    isCurrent: false,
    location: 'Coimbatore, Tamil Nadu',
    summary: 'Monitored real-time operations, queue health, agent performance, and service-level adherence.',
    responsibilities: [
      'Monitored real-time queue conditions, call volumes, and agent operational availability.',
      'Tracked service-level agreements (SLAs), schedule adherence, occupancy, and agent productivity.',
      'Coordinated proactively with team leaders to address operational gaps during surges.',
      'Supported workforce management (WFM) floor activities and operational reporting.',
      'Maintained Excel-based real-time deviation trackers and intraday interval reports.'
    ],
    tools: ['RTQM', 'WFM Support', 'SLA / AHT Monitoring', 'Excel Trackers', 'Adherence Governance'],
    accentGradient: 'from-amber-950 via-neutral-900 to-black'
  },
  {
    id: 'hrh-csa',
    role: 'Customer Support Associate',
    company: 'HRH Next Services Limited',
    period: 'July 2024 – July 2025',
    isCurrent: false,
    location: 'Coimbatore, Tamil Nadu',
    summary: 'Handled customer interactions in an NBFC collections process while maintaining service quality and performance standards.',
    responsibilities: [
      'Managed inbound and outbound customer communication regarding loan portfolio accounts.',
      'Communicated professionally regarding outstanding payments and account resolutions.',
      'Supported customer issue resolution while adhering strictly to process quality guidelines.',
      'Achieved quality benchmarks that led to recognition as Monthly Call Quality Topper.'
    ],
    tools: ['Customer Communication', 'NBFC Collections', 'Quality Adherence', 'Account Resolution'],
    accentGradient: 'from-neutral-900 via-zinc-900 to-black'
  },
  {
    id: 'iwesabe',
    role: 'Social Media Optimizer',
    company: 'iWesabe Technologies',
    period: 'June 2023 – December 2025',
    isCurrent: false,
    location: 'Hybrid / Remote',
    summary: 'Supported digital marketing through content creation, social media publishing, and creative design.',
    responsibilities: [
      'Created social media content, promotional creatives, and digital engagement assets.',
      'Scheduled and published planned content across LinkedIn, Instagram, and web channels.',
      'Supported audience engagement optimization and monthly digital reach reviews.',
      'Assisted with video editing and promotional creative design for marketing campaigns.'
    ],
    tools: ['Content Optimization', 'Digital Design', 'Social Media Publishing', 'Creative Workflows'],
    accentGradient: 'from-blue-950 via-neutral-900 to-black'
  }
];

const ACHIEVEMENTS = [
  {
    id: 'ach-1',
    title: '3-Time Monthly Call Quality Topper',
    organization: 'HRH Next Services Limited',
    category: 'Quality Excellence',
    description: 'Recognized across three distinct operating months for exemplary call auditing scores, compliance, and dispute resolution standards.',
    icon: Award,
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/20'
  },
  {
    id: 'ach-2',
    title: '2-Time Performance Topper of the Month',
    organization: 'HRH Next Services Limited',
    category: 'Throughput & Discipline',
    description: 'Awarded top monthly performer in recognition of consistent target achievement, low wrap variance, and schedule adherence.',
    icon: Target,
    badgeColor: 'text-[#E50914] border-red-500/30 bg-red-950/20'
  },
  {
    id: 'ach-3',
    title: 'Promoted to RTQM',
    organization: 'HRH Next Services Limited',
    category: 'Career Advancement',
    description: 'Promoted from front-line customer operations to real-time operations monitoring and WFM queue management in recognition of consistent performance.',
    icon: TrendingUp,
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20'
  }
];

const SKILL_CATEGORIES = [
  {
    id: 'mis-reporting',
    name: 'MIS & Reporting',
    description: 'Core competencies in day-to-day data consolidation, validation, and structured management reports.',
    skills: [
      { name: 'MIS Reporting', level: 'Experienced', note: 'Daily, weekly, and monthly operational summaries' },
      { name: 'Data Organization', level: 'Experienced', note: 'Standardizing raw imports and cross-checking records' },
      { name: 'Operational Reports', level: 'Experienced', note: 'Throughput scorecards and shift variance logs' },
      { name: 'Performance Tracking', level: 'Experienced', note: 'Target vs. actual tracking and exception flagging' },
      { name: 'Excel-Based Reporting', level: 'Experienced', note: 'Automated pivot views and standardized templates' }
    ]
  },
  {
    id: 'excel-analysis',
    name: 'Excel & Data Analysis',
    description: 'Practical spreadsheet engineering for reliable reporting and operational insights.',
    skills: [
      { name: 'Microsoft Excel', level: 'Intermediate', note: 'Formula arrays, formatting, and data preparation' },
      { name: 'Pivot Tables', level: 'Intermediate', note: 'Multi-level grouping, slicers, and calculated summaries' },
      { name: 'Data Validation', level: 'Intermediate', note: 'List restrictions, audit checks, and error mitigation' },
      { name: 'Reporting Templates', level: 'Intermediate', note: 'Standardized layouts for management review' },
      { name: 'Basic Data Analysis', level: 'Intermediate', note: 'Trend decomposition and operational gap diagnosis' }
    ]
  },
  {
    id: 'wfm-rtqm',
    name: 'WFM & RTQM',
    description: 'Floor telemetry, queue health balancing, and schedule compliance governance.',
    skills: [
      { name: 'Real-Time Queue Monitoring', level: 'Experienced', note: 'Inbound volume pacing and interval monitoring' },
      { name: 'SLA Monitoring', level: 'Experienced', note: 'Tracking response thresholds and surge protocols' },
      { name: 'Schedule Adherence', level: 'Experienced', note: 'Login, break, and wrap-up deviation analysis' },
      { name: 'Occupancy Monitoring', level: 'Experienced', note: 'Evaluating productive time vs. idle wait intervals' },
      { name: 'Agent Productivity Tracking', level: 'Experienced', note: 'Unit throughput and transaction velocity' },
      { name: 'Operations Coordination', level: 'Experienced', note: 'Facilitating floor actions with squad supervisors' }
    ]
  },
  {
    id: 'technical-tools',
    name: 'Technical Skills',
    description: 'Foundational computing, web standards, and workflow tools.',
    skills: [
      { name: 'CRM & Call Monitoring Tools', level: 'Experienced', note: 'Dialer interfaces, logging, and QA audit panels' },
      { name: 'HTML & CSS', level: 'Foundational', note: 'Semantic structure, styling, and web fundamentals' },
      { name: 'Social Media Platforms', level: 'Experienced', note: 'Publishing pipelines, scheduling, and analytics' },
      { name: 'Video Editing & Creative Design', level: 'Intermediate', note: 'Visual assets, campaign graphics, and post-production' }
    ]
  },
  {
    id: 'career-roadmap',
    name: 'Career Development',
    description: 'Active learning trajectory focused on enterprise business intelligence and data analytics.',
    skills: [
      { name: 'Power BI', level: 'Learning Roadmap', note: 'Data modeling, Power Query transformations, and interactive visuals' },
      { name: 'SQL', level: 'Planned Learning', note: 'Relational querying, aggregations, and data extraction' },
      { name: 'Advanced Excel', level: 'Development Goal', note: 'Dynamic arrays, nested lookups, and workflow automation' },
      { name: 'Data Analytics & Storytelling', level: 'Career Direction', note: 'Synthesizing operational data into clear business narratives' }
    ]
  }
];

const PROJECTS_DATA = [
  {
    id: 'proj-1',
    title: 'Agent Productivity Dashboard',
    category: 'MIS / Operations Analytics',
    status: 'Sample Demonstration Concept',
    heroTag: 'Throughput & Adherence Suite',
    description: 'A sample dashboard concept to analyze agent productivity, attendance, adherence, and operational performance.',
    problem: 'Operations supervisors frequently lack an aggregated intraday view of agent output, leading to unaddressed productivity lags until post-shift reviews.',
    objective: 'Demonstrate a centralized monitoring concept that correlates scheduled hours with completed tasks and flag low adherence intervals.',
    sampleMetrics: [
      { label: 'Total Agents Monitored', value: '32 Active', detail: 'Across 3 operational shifts' },
      { label: 'Productive Hours', value: '248.5 hrs', detail: 'Consolidated shift volume' },
      { label: 'Schedule Adherence', value: '92.4%', detail: 'Sample standard: 90% benchmark' },
      { label: 'Avg Occupancy', value: '83.1%', detail: 'Healthy floor utilization zone' }
    ],
    features: [
      'Comparative productivity tracking by agent pod.',
      'Schedule adherence heatmaps highlighting unscheduled downtime.',
      'Intraday throughput variance against expected targets.',
      'Agent-by-agent drill-down with clear sample demonstration disclaimer.'
    ],
    tools: ['Microsoft Excel Concept', 'Pivot Charts', 'Data Validation', 'Synthetic Metrics'],
    gradient: 'from-red-950 via-neutral-900 to-black'
  },
  {
    id: 'proj-2',
    title: 'SLA Monitoring Dashboard',
    category: 'WFM / RTQM',
    status: 'Sample Demonstration Concept',
    heroTag: 'Queue Telemetry & Response Monitor',
    description: 'A demonstration dashboard concept for monitoring service levels, queue performance, and operational trends.',
    problem: 'Sudden call volume surges or concurrent break overlaps can cause rapid SLA breaches if queue pacing is not monitored in 15-minute intervals.',
    objective: 'Showcase real-time interval monitoring models that calculate service level attainment against 85/20 contractual targets.',
    sampleMetrics: [
      { label: 'SLA Achievement', value: '88.6%', detail: 'Target: >85% in 20 seconds' },
      { label: 'Calls Offered / Handled', value: '1,420 / 1,385', detail: '97.5% call answer rate' },
      { label: 'Abandoned Call Rate', value: '2.5%', detail: 'Well within standard <5% threshold' },
      { label: 'Average Handling Time', value: '262s', detail: 'Talk + Hold + After-Call Work' }
    ],
    features: [
      '15-minute interval SLA tracking with threshold breach indicators.',
      'Offered vs. answered volume curve visualization.',
      'Intraday abandoned call spike correlation.',
      'Recommended real-time re-allocation guidance for floor supervisors.'
    ],
    tools: ['RTQM Methodology', 'Interval Tracking', 'Excel Logic', 'WFM Diagnostics'],
    gradient: 'from-cyan-950 via-neutral-900 to-black'
  },
  {
    id: 'proj-3',
    title: 'Monthly MIS Reporting System',
    category: 'Excel / Reporting',
    status: 'Practical Reporting Concept',
    heroTag: 'Structured Reporting Framework',
    description: 'A practical reporting project concept demonstrating structured data, summary tables, PivotTables, and monthly performance analysis.',
    problem: 'Multiple raw spreadsheet extracts from disparate branch pods lead to formula breakages, duplicate entries, and extensive preparation time.',
    objective: 'Illustrate structured data templates with defensive validation, automated pivot summarization, and monthly variance reporting.',
    sampleMetrics: [
      { label: 'Raw Records Handled', value: '12,500+', detail: 'Synthesized monthly volume' },
      { label: 'Report Assembly Cadence', value: 'Daily & MTD', detail: 'Standardized executive views' },
      { label: 'Data Quality Audits', value: 'Zero Dupes', detail: 'Automated validation checks' },
      { label: 'Variance Tracking', value: 'MTD vs Plan', detail: 'Automated conditional flags' }
    ],
    features: [
      'Structured table schemas with dynamic named references.',
      'Automated PivotTable summary decks by branch and operational pod.',
      'Defensive formula design (SUMIFS, COUNTIFS, XLOOKUP) preventing #N/A breaks.',
      'Executive summary cards tailored for operational management reviews.'
    ],
    tools: ['Advanced Excel', 'PivotTables', 'Structured Ranges', 'Data Cleansing'],
    gradient: 'from-amber-950 via-neutral-900 to-black'
  },
  {
    id: 'proj-4',
    title: 'Power BI Business Intelligence Dashboard',
    category: 'Power BI / Data Analytics',
    status: 'Planned Learning Demonstration',
    heroTag: 'Modern BI Exploration Track',
    description: 'A planned learning project to transform structured operational data into an interactive business intelligence dashboard.',
    problem: 'Static reporting spreadsheets cannot offer the fluid cross-filtering, slicer exploration, and multi-dimensional drill-downs needed for fast visual discovery.',
    objective: 'Outline the architecture for transitioning Excel MIS reports into Power BI with clean Star Schemas and intuitive user interaction.',
    sampleMetrics: [
      { label: 'Planned Visuals', value: '6 Views', detail: 'KPI cards, trend lines, matrices' },
      { label: 'Target Model', value: 'Star Schema', detail: '1 Fact table with 3 Dimensions' },
      { label: 'Core DAX Measures', value: '12 Planned', detail: 'SLA %, Rolling Output, MoM growth' },
      { label: 'Data Refresh', value: 'Single-Click', detail: 'Automated Power Query pipeline' }
    ],
    features: [
      'Interactive team and date slicers for instant data segmentation.',
      'Time-intelligence DAX measures comparing current vs. previous periods.',
      'Decomposition trees to inspect the root drivers of performance variance.',
      'Clean streaming platform-inspired dark visual hierarchy.'
    ],
    tools: ['Power BI (In Progress)', 'Power Query', 'DAX Fundamentals', 'Data Modeling'],
    gradient: 'from-blue-950 via-neutral-900 to-black'
  }
];

const EDUCATION_DATA = [
  {
    degree: 'MBA — Corporate Management',
    institution: 'Alagappa University',
    mode: 'Distance Education',
    period: '2025 – 2027',
    status: 'Pursuing',
    details: 'Focusing on strategic operations management, corporate governance, organizational leadership, and managerial finance.'
  },
  {
    degree: 'B.Sc. — Computer Science',
    institution: 'Suguna College of Arts and Science',
    mode: 'Full Time',
    period: '2021 – 2024',
    status: 'Completed',
    details: 'Grounding in programming fundamentals, database structures, computing logic, and software problem-solving.'
  }
];

const CinematicIntro = ({ onComplete, prefersReducedMotion }) => {
  const [phase, setPhase] = useState(1);
  const fullNameLetters = useMemo(() => PERSONAL_INFO.name.toUpperCase().split(''), []);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setPhase(2);
    }, 650);

    const t2 = setTimeout(() => {
      setPhase(3);
    }, 2100);

    const t3 = setTimeout(() => {
      onComplete();
    }, 3200);

    const safety = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(safety);
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    <motion.aside
      key="cinematic-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Cinematic Introduction"
      className="fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: phase >= 2 ? [1, 1.4, 1.2] : 0.8,
            opacity: phase >= 2 ? [0.25, 0.55, 0.4] : 0.1,
          }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="w-[450px] sm:w-[680px] h-[450px] sm:h-[680px] bg-[#E50914] rounded-full blur-[140px] sm:blur-[190px] opacity-40"
        />

        {phase >= 2 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.9, 0.4] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute h-[2px] w-full max-w-4xl bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_24px_rgba(229,9,20,0.9)]"
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, filter: 'blur(10px)' }}
          animate={{
            opacity: 1,
            scale: phase === 3 ? 1.08 : 1,
            filter: 'blur(0px)',
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#E50914] to-[#99040c] flex items-center justify-center shadow-[0_0_50px_rgba(229,9,20,0.7)] border border-red-500/40">
            <span className="text-3xl sm:text-5xl font-black tracking-tighter text-white drop-shadow-md">
              PM
            </span>
          </div>

          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(229,9,20,0.4)',
                '0 0 45px rgba(229,9,20,0.8)',
                '0 0 25px rgba(229,9,20,0.5)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
          />
        </motion.div>

        <div className="overflow-hidden flex items-center justify-center space-x-[2px] sm:space-x-1.5 h-10 sm:h-14">
          {phase >= 2 &&
            fullNameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.035,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-wider text-white ${
                  char === ' ' ? 'w-2 sm:w-3' : ''
                }`}
              >
                {char}
              </motion.span>
            ))}
        </div>

        <div className="overflow-hidden mt-3 h-8">
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="text-[10px] sm:text-xs md:text-sm font-mono tracking-widest sm:tracking-[0.25em] text-neutral-300 uppercase font-semibold"
            >
              MIS EXECUTIVE <span className="text-[#E50914] px-1">•</span> WFM{' '}
              <span className="text-[#E50914] px-1">•</span> RTQM{' '}
              <span className="text-[#E50914] px-1">•</span> OPERATIONS & REPORTING
            </motion.p>
          )}
        </div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#E50914] border border-white/20 hover:border-transparent text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-lg"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5 fill-current" />
      </motion.button>
    </motion.aside>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillCategory, setActiveSkillCategory] = useState('mis-reporting');
  const [expandedExperiences, setExpandedExperiences] = useState({ hdb: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState({ submitted: false, error: '' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [emailCopied, setEmailCopied] = useState(false);

  // Intro Sequence State with Session Persistence
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('pm_portfolio_intro_shown');
    } catch {
      return true;
    }
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('pm_portfolio_intro_shown', 'true');
    } catch {
      // Ignore storage errors in restricted private contexts
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'experience', 'achievements', 'skills', 'projects', 'education', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 80;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showIntro) {
          handleIntroComplete();
          return;
        }
        if (searchOpen) setSearchOpen(false);
        if (resumeOpen) setResumeOpen(false);
        if (selectedProject) setSelectedProject(null);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
      if (e.key === '/' && !searchOpen && !selectedProject && !resumeOpen && !showIntro && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, resumeOpen, selectedProject, mobileMenuOpen, showIntro, handleIntroComplete]);

  useEffect(() => {
    if (showIntro || selectedProject || resumeOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro, selectedProject, resumeOpen, searchOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PROJECTS_DATA.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tools.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const toggleExperience = (id) => {
    setExpandedExperiences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2400);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setContactStatus({ submitted: false, error: 'Please enter your name, email, and message.' });
      return;
    }

    setIsSubmitting(true);
    setContactStatus({ submitted: false, error: '' });

    // Paste your Google Apps Script Web App Deployment URL here
    const GOOGLE_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzP3XhGybive12uG8O_z6-3cNUoHYAGLBvOuCmeF0OadY5F-AK0TOj59hegaUMiWtsYyA/exec';

    try {
      await fetch(GOOGLE_SCRIPT_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry from ' + formData.name,
          message: formData.message
        })
      });

      setContactStatus({ submitted: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setContactStatus({ submitted: false, error: 'Could not transmit message. Please try again or reach out directly via email.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans selection:bg-[#E50914] selection:text-white relative">
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro
            onComplete={handleIntroComplete}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: showIntro ? -80 : 0, opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          navScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-md p-1"
              aria-label="Pugazhenthi M Home"
            >
              <div className="w-9 h-9 rounded bg-[#E50914] flex items-center justify-center font-black tracking-tighter text-white shadow-[0_0_15px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform">
                PM
              </div>
              <div className="text-left">
                <span className="text-base font-black tracking-tight text-white block leading-tight">
                  PUGAZH<span className="text-[#E50914]">.</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block">
                  MIS & Operations
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold tracking-wider uppercase">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Experience', id: 'experience' },
                { label: 'Achievements', id: 'achievements' },
                { label: 'Skills', id: 'skills' },
                { label: 'Projects', id: 'projects' },
                { label: 'Education', id: 'education' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`transition-colors cursor-pointer relative py-1 focus:outline-none focus:text-white ${
                    activeSection === item.id ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E50914] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              aria-label="Search portfolio"
              title="Search projects and skills (Press /)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-neutral-700 hover:border-white text-neutral-200 hover:text-white bg-[#141414] hover:bg-neutral-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded bg-[#E50914] hover:bg-[#b80710] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              <span>Connect</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-[#0c0c0c] border-b border-neutral-800 px-6 py-5 space-y-3 overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 text-sm font-medium">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'A Little About Me', id: 'about' },
                  { label: 'Professional Experience', id: 'experience' },
                  { label: 'Key Achievements', id: 'achievements' },
                  { label: 'Skills & Competencies', id: 'skills' },
                  { label: 'My Project Lab', id: 'projects' },
                  { label: 'Education', id: 'education' },
                  { label: 'Contact Me', id: 'contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-600" />
                  </button>
                ))}
                <div className="pt-3 border-t border-neutral-800 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setResumeOpen(true);
                    }}
                    className="flex-1 py-2.5 px-3 rounded bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-[#E50914]" />
                    View Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo('contact')}
                    className="flex-1 py-2.5 px-3 rounded bg-[#E50914] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Contact Me
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <section
        id="home"
        className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#080808] z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
          <motion.div
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-[#E50914] rounded-full blur-[170px] pointer-events-none"
          />
          <div className="absolute bottom-12 right-0 w-[480px] h-[480px] bg-cyan-950 rounded-full blur-[200px] opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 35 : 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-800/40 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-red-200 uppercase">
                CURRENT ROLE: MIS EXECUTIVE @ HDB FINANCIAL SERVICES (Joined 06 Oct 2026)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none mb-3">
              PUGAZHENTHI M
            </h1>

            <p className="text-sm sm:text-lg font-bold tracking-widest text-[#E50914] uppercase mb-4">
              MIS Executive <span className="text-neutral-600 px-1">•</span> WFM <span className="text-neutral-600 px-1">•</span> RTQM <span className="text-neutral-600 px-1">•</span> Operations & Reporting
            </p>

            <blockquote className="text-lg sm:text-2xl font-light text-neutral-200 border-l-2 border-[#E50914] pl-4 italic mb-8 leading-snug">
              "{PERSONAL_INFO.tagline}"
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={() => scrollTo('experience')}
                className="px-6 py-3.5 rounded bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_4px_25px_rgba(229,9,20,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Explore My Portfolio</span>
              </button>

              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="px-6 py-3.5 rounded bg-[#181818] hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-neutral-700 hover:border-neutral-400 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#E50914]" />
                <span>View My Resume</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-neutral-800 hover:border-neutral-600 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-[#121212] p-3 rounded border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Current Role</span>
                <span className="text-white font-bold block truncate">{PERSONAL_INFO.currentRole}</span>
              </div>
              <div className="bg-[#121212] p-3 rounded border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Organization</span>
                <span className="text-white font-bold block truncate">{PERSONAL_INFO.currentEmployer}</span>
              </div>
              <div className="bg-[#121212] p-3 rounded border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Joined</span>
                <span className="text-[#E50914] font-bold block truncate">{PERSONAL_INFO.joinDate}</span>
              </div>
              <div className="bg-[#121212] p-3 rounded border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase block">Location</span>
                <span className="text-white font-bold block truncate">Coimbatore, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 bg-[#0e0e0e] border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
              A LITTLE ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
              From Front-Line Operations to Business Reporting
            </h2>
            <div className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                I'm a performance-oriented professional with experience across MIS reporting, Real-Time Queue Management,
                Workforce Management support, customer support, and operations monitoring.
              </p>
              <p>
                My professional journey has helped me develop a strong understanding of operational metrics, service-level
                performance, agent productivity, reporting accuracy, and process improvement.
              </p>
              <p>
                Currently working as an MIS Executive at <strong>HDB Financial Services</strong>, I'm focused on strengthening
                my reporting and analytical skills while building toward a career in Data Analytics and Business Intelligence.
                I'm also pursuing an MBA in Corporate Management through distance education at Alagappa University.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'MIS Reporting',
                focus: 'Data Organization & Integrity',
                desc: 'Consolidating daily operational logs, formula reconciliation, and management summaries.',
                icon: FileSpreadsheet,
                accent: 'border-red-900/40 text-[#E50914]'
              },
              {
                title: 'Operational Analytics',
                focus: 'Performance & Variance',
                desc: 'Tracking throughput trends, shrinkage indicators, and intraday target deltas.',
                icon: TrendingUp,
                accent: 'border-amber-900/40 text-amber-400'
              },
              {
                title: 'WFM & RTQM',
                focus: 'Queue Health & Adherence',
                desc: 'Intraday SLA protection, agent occupancy governance, and floor escalation balance.',
                icon: Target,
                accent: 'border-cyan-900/40 text-cyan-400'
              },
              {
                title: 'Data Analytics Aspirations',
                focus: 'Power BI & BI Roadmap',
                desc: 'Actively mastering DAX modeling, Power Query transformations, and visual storytelling.',
                icon: Database,
                accent: 'border-blue-900/40 text-blue-400'
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#161616] p-5 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${card.accent}`} />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Domain
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1">{card.focus}</p>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
                CAREER TIMELINE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Professional Experience
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              A chronological progression demonstrating hands-on operational leadership and reporting discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERIENCE_CARDS.map((exp, index) => {
              const isExpanded = !!expandedExperiences[exp.id];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className={`bg-[#141414] border rounded-xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between ${
                    exp.isCurrent ? 'border-red-800/80 shadow-[0_0_20px_rgba(229,9,20,0.15)]' : 'border-neutral-800'
                  }`}
                >
                  <div className={`p-6 bg-gradient-to-br ${exp.accentGradient} border-b border-neutral-800`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {exp.isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E50914] text-white text-[10px] font-mono font-bold tracking-wider uppercase mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Current Role
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded bg-black/50 text-neutral-400 text-[10px] font-mono tracking-wider uppercase mb-2 border border-white/10">
                            Previous Position
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-white tracking-tight">{exp.role}</h3>
                        <p className="text-xs sm:text-sm font-semibold text-neutral-300 mt-0.5">{exp.company}</p>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400 text-right shrink-0 bg-black/40 px-2 py-1 rounded border border-white/5">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 mt-4 leading-relaxed italic">
                      "{exp.summary}"
                    </p>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                          Key Responsibilities:
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExperience(exp.id)}
                          className="text-xs font-semibold text-[#E50914] hover:text-red-400 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Collapse' : 'Expand Details'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-2 text-xs text-neutral-300 leading-relaxed overflow-hidden"
                          >
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </motion.ul>
                        ) : (
                          <p className="text-xs text-neutral-500 line-clamp-2">
                            {exp.responsibilities.join(' • ')}
                          </p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-wrap gap-1.5">
                      {exp.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono bg-[#1d1d1d] text-neutral-300 px-2.5 py-1 rounded border border-neutral-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20 bg-[#0e0e0e] border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
              HONORS & RECOGNITION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Key Achievements
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2">
              Recognized for sustained call interaction quality, operational throughput, and real-time floor monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#161616] border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg border ${ach.badgeColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
                        {ach.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1">{ach.organization}</p>

                    <p className="text-xs text-neutral-300 mt-4 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Verified Career Milestone</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
                COMPETENCY MATRIX
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Skills & Technical Capabilities
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              Honest capability designations: Experienced, Intermediate, and Planned Learning roadmaps without arbitrary percentages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-4 mb-8">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveSkillCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeSkillCategory === cat.id
                    ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                    : 'bg-[#141414] text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {(() => {
            const currentCat = SKILL_CATEGORIES.find((c) => c.id === activeSkillCategory) || SKILL_CATEGORIES[0];
            return (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCat.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#121212] border border-neutral-800 rounded-xl p-6 sm:p-8"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">{currentCat.name}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">{currentCat.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentCat.skills.map((skill) => {
                      const isLearning = skill.level.includes('Learning') || skill.level.includes('Planned') || skill.level.includes('Goal') || skill.level.includes('Direction');
                      return (
                        <div
                          key={skill.name}
                          className="bg-[#181818] p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                                isLearning
                                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50'
                                  : skill.level === 'Experienced'
                                  ? 'bg-red-950/60 text-red-300 border border-red-800/50'
                                  : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                              }`}
                            >
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 leading-relaxed">{skill.note}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })()}
        </div>
      </section>

      <section id="projects" className="py-20 bg-[#0d0d0d] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
                PRACTICAL CONCEPTS & ANALYTICS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                My Project Lab
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              Practical projects built around reporting, operations, and business insights. Clearly identified sample demonstrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS_DATA.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setSelectedProject(proj)}
                className="bg-[#161616] hover:bg-[#1e1e1e] border border-neutral-800 hover:border-[#E50914] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xl hover:shadow-[0_12px_30px_rgba(229,9,20,0.25)]"
              >
                <div className={`p-6 bg-gradient-to-br ${proj.gradient} border-b border-neutral-800 relative`}>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 text-red-400 border border-red-950 font-bold">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {proj.sampleMetrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="bg-[#111111] p-2.5 rounded border border-neutral-800">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">{m.label}</span>
                        <span className="text-sm font-bold text-white block mt-0.5">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tools.map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-300 group-hover:text-white">
                      <span>View Case Study & Metrics</span>
                      <ChevronRight className="w-4 h-4 text-[#E50914] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
              ACADEMIC BACKGROUND
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Education & Qualifications
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2">
              Combining corporate management theory with computer science analytical foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_DATA.map((edu, idx) => (
              <div
                key={idx}
                className="bg-[#141414] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#E50914] uppercase tracking-wider font-bold">
                      {edu.period}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-neutral-300 font-semibold mt-0.5">{edu.institution}</p>
                  <p className="text-[11px] font-mono text-neutral-500 mt-1">{edu.mode}</p>

                  <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                    {edu.details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <GraduationCap className="w-4 h-4 text-[#E50914]" />
                  <span>Verified Academic Credential</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gradient-to-b from-[#080808] via-[#140809] to-[#080808] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914]">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
              LET'S CONNECT
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Interested in reporting, operations, business intelligence, or data analytics opportunities? 
              Feel free to connect with me.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#141414] p-5 rounded-xl border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Direct Email</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs sm:text-sm font-bold text-white hover:text-red-400 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-3 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400 font-mono text-[11px]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#141414] p-5 rounded-xl border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Phone Contact</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-bold text-white hover:text-red-400 transition-colors"
                >
                  {PERSONAL_INFO.phoneFormatted}
                </a>
              </div>

              <div className="bg-[#141414] p-5 rounded-xl border border-neutral-800">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Location</span>
                <p className="text-sm font-bold text-white">{PERSONAL_INFO.location}</p>
                <span className="text-[11px] font-mono text-neutral-400 mt-1 block">Open to Relocation / Hybrid</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20regarding%20MIS%20&%20Operations`}
                  className="w-full py-3 px-4 rounded bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="w-full py-2.5 px-4 rounded bg-[#1c1c1c] hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700 transition-all"
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>Call: {PERSONAL_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 bg-[#141414] p-6 sm:p-8 rounded-xl border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2">Send a Direct Inquiry</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill in the details below. Messages are recorded straight to my Google Sheet and alert my inbox instantly.
              </p>

              {contactStatus.error && (
                <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded">
                  {contactStatus.error}
                </div>
              )}

              {contactStatus.submitted && (
                <div className="mb-4 p-3 bg-green-950/60 border border-green-800 text-green-200 text-xs rounded flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Thank you! Your inquiry has been logged and sent directly to my inbox.</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#1e1e1e] text-white text-xs px-3.5 py-2.5 rounded border border-neutral-700 focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#1e1e1e] text-white text-xs px-3.5 py-2.5 rounded border border-neutral-700 focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="MIS Opportunity / Operations Discussion"
                    className="w-full bg-[#1e1e1e] text-white text-xs px-3.5 py-2.5 rounded border border-neutral-700 focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can I assist your reporting and operational analytics needs?"
                    className="w-full bg-[#1e1e1e] text-white text-xs px-3.5 py-2.5 rounded border border-neutral-700 focus:outline-none focus:border-[#E50914] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded bg-[#E50914] hover:bg-[#b80710] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-10 border-t border-neutral-900 text-xs text-neutral-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#E50914] flex items-center justify-center text-white font-black text-xs">
                PM
              </div>
              <span className="text-white font-bold">
                Pugazhenthi M <span className="text-neutral-600">|</span> MIS Executive <span className="text-neutral-600">|</span> WFM <span className="text-neutral-600">|</span> RTQM <span className="text-neutral-600">|</span> Operations & Reporting
              </span>
            </div>

            <div className="flex items-center space-x-6 text-[11px]">
              <button type="button" onClick={() => scrollTo('home')} className="hover:text-white cursor-pointer">
                Top ↑
              </button>
              <button type="button" onClick={() => scrollTo('about')} className="hover:text-white cursor-pointer">
                About
              </button>
              <button type="button" onClick={() => scrollTo('experience')} className="hover:text-white cursor-pointer">
                Experience
              </button>
              <button type="button" onClick={() => scrollTo('projects')} className="hover:text-white cursor-pointer">
                Projects
              </button>
              <button type="button" onClick={() => setResumeOpen(true)} className="hover:text-white cursor-pointer">
                Resume
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-500 text-[11px]">
            <div>
              © {new Date().getFullYear()} Pugazhenthi M. Built with purpose & operational precision.
            </div>
            <div>
              Coimbatore, Tamil Nadu, India • pugazhenthimurasolimaran@gmail.com
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-[#141414] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl text-white my-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 bg-gradient-to-r ${selectedProject.gradient} border-b border-neutral-800 flex items-start justify-between`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold bg-black/60 px-2.5 py-1 rounded border border-red-900">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">{selectedProject.title}</h3>
                  <p className="text-xs text-neutral-300 mt-1">{selectedProject.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm">
                <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded text-amber-300 text-xs">
                  <strong>Disclaimer:</strong> This project is a demonstration concept built with synthetic sample data to showcase reporting methodology and data visualization architecture.
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold mb-1">
                    Business Challenge
                  </h4>
                  <p className="text-neutral-300 leading-relaxed">{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-green-400 font-bold mb-1">
                    Project Objective
                  </h4>
                  <p className="text-neutral-300 leading-relaxed">{selectedProject.objective}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
                    Sample Analytical Metrics
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedProject.sampleMetrics.map((m, i) => (
                      <div key={i} className="bg-[#1a1a1a] p-3 rounded border border-neutral-800">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">{m.label}</span>
                        <span className="text-base font-bold text-white block mt-0.5">{m.value}</span>
                        <span className="text-[10px] text-neutral-400 block mt-1">{m.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
                    Key Planned Features & Logic
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
                    Technologies Applied
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tools.map((t) => (
                      <span key={t} className="text-xs font-mono bg-[#222222] text-neutral-300 px-2.5 py-1 rounded border border-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Close Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-[#141414] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search projects by keyword, tool (Excel, WFM, Power BI), or domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-neutral-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="text-[10px] font-mono text-neutral-500 bg-neutral-800 px-2 py-1 rounded border border-neutral-700">
                  ESC
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto p-4 space-y-2">
                {!searchQuery.trim() ? (
                  <div className="py-6 text-center text-xs text-neutral-500">
                    Search across sample projects, technical tools, and case studies.
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="py-6 text-center text-xs text-neutral-400">
                    No matching projects found for "{searchQuery}".
                  </div>
                ) : (
                  searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSelectedProject(p);
                      }}
                      className="p-3 bg-[#1c1c1c] hover:bg-neutral-800 rounded-lg border border-neutral-800 hover:border-[#E50914] cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#E50914] uppercase font-bold">
                          {p.category}
                        </span>
                        <h4 className="text-sm font-bold text-white">{p.title}</h4>
                        <p className="text-xs text-neutral-400 line-clamp-1">{p.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-500" />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setResumeOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl bg-[#141414] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl text-white max-h-[92vh] flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-red-950/50 via-neutral-900 to-neutral-900 border-b border-neutral-800 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white">{PERSONAL_INFO.name}</h3>
                  <p className="text-xs font-mono text-[#E50914] mt-0.5 font-bold">
                    {PERSONAL_INFO.headline}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                    {PERSONAL_INFO.location} • {PERSONAL_INFO.phoneFormatted} • {PERSONAL_INFO.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close resume"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold mb-2">
                    Professional Summary
                  </h4>
                  <p className="text-neutral-300 leading-relaxed">
                    Performance-oriented professional with experience in MIS reporting, Real-Time Queue Management (RTQM),
                    Workforce Management (WFM) support, customer service, and operations monitoring. Skilled in Microsoft Excel,
                    performance tracking, data organization, operational reporting, and process improvement. Recognized for
                    consistent quality and performance achievements, with experience supporting operational teams and monitoring
                    service-level performance. Currently working as an MIS Executive at HDB Financial Services and pursuing an
                    MBA in Corporate Management.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold mb-3">
                    Work Experience
                  </h4>
                  <div className="space-y-5">
                    {EXPERIENCE_CARDS.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-neutral-700 pl-4">
                        <div className="flex flex-wrap justify-between items-baseline gap-1">
                          <h5 className="font-bold text-white text-sm">
                            {exp.role} — <span className="text-neutral-300 font-normal">{exp.company}</span>
                          </h5>
                          <span className="text-[11px] font-mono text-neutral-400">{exp.period}</span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-neutral-400 list-disc list-inside">
                          {exp.responsibilities.map((r, idx) => (
                            <li key={idx} className="leading-relaxed">{r}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold mb-2">
                    Key Achievements
                  </h4>
                  <ul className="text-neutral-300 text-xs space-y-1 list-disc list-inside">
                    <li>3-Time Monthly Call Quality Topper (HRH Next Services Limited)</li>
                    <li>2-Time Performance Topper of the Month (HRH Next Services Limited)</li>
                    <li>Promoted to RTQM in recognition of consistent performance and discipline</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold mb-2">
                    Education
                  </h4>
                  <div className="space-y-2 text-neutral-300 text-xs">
                    <div className="flex justify-between">
                      <span><strong>MBA — Corporate Management</strong> (Distance Education, Pursuing)</span>
                      <span className="text-neutral-500 font-mono">Alagappa University</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>B.Sc. — Computer Science</strong> (2021–2024)</span>
                      <span className="text-neutral-500 font-mono">Suguna College of Arts and Science</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">
                  Official Verified Profile Document
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeOpen(false)}
                    className="px-4 py-2 bg-[#E50914] hover:bg-[#b80710] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}