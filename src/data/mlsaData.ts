// ─── Types ────────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'portfolio' | 'github';
  url: string;
  label: string;
}

export interface ChapterInfo {
  name: string;
  fullName: string;
  university: string;
  campus: string;
  socials: SocialLink[];
}

export interface PresidentProfile {
  name: string;
  role: string;
  bio: string;
  portfolio: string;
  linkedin: string;
  instagram: string;
  avatar: string;
}

export type EventCategory = 'Upcoming' | 'Past Workshops' | 'Hackathons';
export type EventStatus = 'Registration Open' | 'Completed';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: EventCategory;
  status: EventStatus;
  description: string;
  speaker: string;
  tags: string[];
  image?: string;
}

export type UpdateCategory = 'Recruitment' | 'Announcement' | 'Achievement';

export interface UpdateItem {
  id: string;
  title: string;
  date: string;
  category: UpdateCategory;
  description: string;
  link?: string;
}

export type TeamDepartment =
  | 'Executive Board'
  | 'Technical Team'
  | 'Event Management'
  | 'Media & Design'
  | 'Marketing & PR';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: TeamDepartment;
  linkedin?: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

// ─── Chapter Info ─────────────────────────────────────────────────────────────

export const chapterInfo: ChapterInfo = {
  name: 'MLSA SZABIST Islamabad',
  fullName: 'Microsoft Learn Student Ambassadors - SZABIST Islamabad Chapter',
  university: 'SZABIST',
  campus: 'Islamabad',
  socials: [
    {
      platform: 'linkedin',
      url: 'https://pk.linkedin.com/company/mlsa-szabist-isb',
      label: 'LinkedIn',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/mlsaszabist_isb/',
      label: 'Instagram',
    },
  ],
};

// ─── President Profile ────────────────────────────────────────────────────────

export const presidentProfile: PresidentProfile = {
  name: 'Shoaib Hassan',
  role: 'President, MLSA SZABIST Islamabad',
  bio: 'Empowering students at SZABIST Islamabad to learn, build, and lead through Microsoft technologies, open-source innovation, and global community collaboration.',
  portfolio: 'https://shoaibhassan10.me/',
  linkedin: 'https://www.linkedin.com/in/shoaibhassan10/',
  instagram: 'https://www.instagram.com/shoaibhassan_10',
  avatar: '',
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export const statsData: StatItem[] = [
  { label: 'Members', value: '500+', description: 'Active Community Members' },
  { label: 'Workshops', value: '30+', description: 'Technical Workshops Delivered' },
  { label: 'Imagine Cup', value: 'Mentorship', description: 'Global Competition Support' },
  { label: 'Tech Wings', value: 'Active', description: 'Specialized Department Teams' },
];

// ─── Events ───────────────────────────────────────────────────────────────────

export const eventsData: EventItem[] = [
  {
    id: 'evt-001',
    title: 'Azure AI & Copilot Bootcamp',
    date: '2026-11-15',
    time: '10:00 AM - 04:00 PM',
    venue: 'SZABIST Islamabad Campus - Auditorium Hall',
    category: 'Upcoming',
    status: 'Registration Open',
    description:
      'Dive deep into Azure AI services and Microsoft Copilot Studio. Build intelligent applications using GPT-4o, Azure Cognitive Services, and learn prompt engineering best practices. Hands-on labs included with free Azure credits for all participants.',
    speaker: 'Shoaib Hassan & Microsoft MVPs',
    tags: ['Azure AI', 'Copilot', 'GPT-4o', 'Prompt Engineering'],
  },
  {
    id: 'evt-002',
    title: 'Microsoft Imagine Cup Ideation Day',
    date: '2026-12-02',
    time: '09:00 AM - 05:00 PM',
    venue: 'SZABIST Islamabad Campus - Innovation Lab',
    category: 'Upcoming',
    status: 'Registration Open',
    description:
      'A full-day ideation and mentorship workshop preparing SZABIST teams for Microsoft Imagine Cup 2027. Learn to pitch your startup ideas, refine project proposals, and receive one-on-one mentorship from past finalists and industry experts.',
    speaker: 'Imagine Cup Alumni Panel',
    tags: ['Imagine Cup', 'Startup', 'Innovation', 'Mentorship'],
  },
  {
    id: 'evt-003',
    title: 'Git & GitHub Open Source 101',
    date: '2026-09-20',
    time: '02:00 PM - 05:00 PM',
    venue: 'SZABIST Islamabad Campus - Lab 3',
    category: 'Past Workshops',
    status: 'Completed',
    description:
      'A beginner-friendly workshop covering Git fundamentals, GitHub workflows, branching strategies, and contributing to open-source projects. Participants made their first pull request to a live MLSA repository.',
    speaker: 'Technical Team Leads',
    tags: ['Git', 'GitHub', 'Open Source', 'Version Control'],
  },
  {
    id: 'evt-004',
    title: 'Next.js & Cloud Deployment Workshop',
    date: '2026-08-10',
    time: '11:00 AM - 03:00 PM',
    venue: 'SZABIST Islamabad Campus - Smart Classroom',
    category: 'Past Workshops',
    status: 'Completed',
    description:
      'Hands-on workshop on building full-stack web applications with Next.js 14 and deploying them to Azure Static Web Apps and Vercel. Covered SSR, API routes, and database integration with Azure Cosmos DB.',
    speaker: 'Shoaib Hassan',
    tags: ['Next.js', 'Azure', 'Vercel', 'Full-Stack', 'Cloud'],
  },
  {
    id: 'evt-005',
    title: 'SZABIST HackFest 2026',
    date: '2026-10-05',
    time: '09:00 AM - 09:00 PM (12-Hour Sprint)',
    venue: 'SZABIST Islamabad Campus - Main Hall',
    category: 'Hackathons',
    status: 'Completed',
    description:
      'SZABIST\'s flagship 12-hour hackathon powered by MLSA. 40+ teams competed across tracks: AI for Good, FinTech, HealthTech, and EdTech. Winners received Azure credits, Microsoft Learn certifications, and mentorship opportunities.',
    speaker: 'Multi-track Mentors',
    tags: ['Hackathon', 'AI for Good', 'FinTech', 'EdTech'],
  },
  {
    id: 'evt-006',
    title: 'Power Platform & Low-Code Challenge',
    date: '2026-11-28',
    time: '01:00 PM - 05:00 PM',
    venue: 'SZABIST Islamabad Campus - Lab 5',
    category: 'Upcoming',
    status: 'Registration Open',
    description:
      'Learn to build enterprise-grade applications without writing extensive code using Microsoft Power Apps, Power Automate, and Power BI. A competitive challenge where teams build solutions for real-world campus problems.',
    speaker: 'Power Platform Community Lead',
    tags: ['Power Platform', 'Low-Code', 'Power Apps', 'Power BI'],
  },
];

// ─── Updates ──────────────────────────────────────────────────────────────────

export const updatesData: UpdateItem[] = [
  {
    id: 'upd-001',
    title: 'Core Team Recruitment 2026 Now Open!',
    date: '2026-10-20',
    category: 'Recruitment',
    description:
      'We\'re looking for passionate students to join our Technical, Events, Media & Design, and Marketing wings. Apply before November 10th and become part of SZABIST\'s most active tech community.',
    link: '#join',
  },
  {
    id: 'upd-002',
    title: 'Cloud Skills Challenge Winners Announced',
    date: '2026-10-12',
    category: 'Achievement',
    description:
      'Congratulations to our top 15 members who completed the Microsoft Cloud Skills Challenge! Special recognition to Ayesha Khan and Bilal Ahmed for finishing all 6 learning paths in record time.',
  },
  {
    id: 'upd-003',
    title: 'Partnership with Microsoft Pakistan Confirmed',
    date: '2026-09-28',
    category: 'Announcement',
    description:
      'MLSA SZABIST Islamabad has been officially recognized as a top-performing chapter in Pakistan. Microsoft Pakistan will sponsor our upcoming Azure AI Bootcamp and provide exclusive swag for participants.',
  },
  {
    id: 'upd-004',
    title: 'Imagine Cup 2027 Campus Qualifier Dates Released',
    date: '2026-10-25',
    category: 'Announcement',
    description:
      'Mark your calendars! The Imagine Cup 2027 campus qualifier will take place on December 2nd. Start forming your teams and brainstorming innovative solutions. Mentorship sessions begin next week.',
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────

export const teamData: TeamMember[] = [
  // Executive Board
  {
    id: 'tm-001',
    name: 'Shoaib Hassan',
    role: 'President',
    department: 'Executive Board',
    linkedin: 'https://www.linkedin.com/in/shoaibhassan10/',
  },
  {
    id: 'tm-002',
    name: 'Fatima Zahra',
    role: 'Vice President',
    department: 'Executive Board',
    linkedin: '#',
  },
  {
    id: 'tm-003',
    name: 'Ahmed Raza',
    role: 'General Secretary',
    department: 'Executive Board',
    linkedin: '#',
  },
  // Technical Team
  {
    id: 'tm-004',
    name: 'Bilal Ahmed',
    role: 'Technical Lead',
    department: 'Technical Team',
    linkedin: '#',
  },
  {
    id: 'tm-005',
    name: 'Ayesha Khan',
    role: 'Cloud & AI Lead',
    department: 'Technical Team',
    linkedin: '#',
  },
  {
    id: 'tm-006',
    name: 'Usman Tariq',
    role: 'Web Development Lead',
    department: 'Technical Team',
    linkedin: '#',
  },
  // Event Management
  {
    id: 'tm-007',
    name: 'Hira Malik',
    role: 'Events Director',
    department: 'Event Management',
    linkedin: '#',
  },
  {
    id: 'tm-008',
    name: 'Zain Ali',
    role: 'Logistics Coordinator',
    department: 'Event Management',
    linkedin: '#',
  },
  // Media & Design
  {
    id: 'tm-009',
    name: 'Sara Noor',
    role: 'Creative Director',
    department: 'Media & Design',
    linkedin: '#',
  },
  {
    id: 'tm-010',
    name: 'Hamza Shah',
    role: 'UI/UX Designer',
    department: 'Media & Design',
    linkedin: '#',
  },
  // Marketing & PR
  {
    id: 'tm-011',
    name: 'Mahnoor Asif',
    role: 'Marketing Lead',
    department: 'Marketing & PR',
    linkedin: '#',
  },
  {
    id: 'tm-012',
    name: 'Danish Iqbal',
    role: 'Social Media Manager',
    department: 'Marketing & PR',
    linkedin: '#',
  },
];

// ─── Department List ──────────────────────────────────────────────────────────

export const departments: TeamDepartment[] = [
  'Executive Board',
  'Technical Team',
  'Event Management',
  'Media & Design',
  'Marketing & PR',
];

// ─── Navigation Links ─────────────────────────────────────────────────────────

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Updates', href: '#updates' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Team', href: '#team' },
  { label: 'Join Us', href: '#join' },
];
