export interface ActivityLog {
  action: string;
  timestamp: string;
  details: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registerDate: string;
  lastLogin: string;
  activityHistory: ActivityLog[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessName: string;
  service: string;
  budget: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'negotiating' | 'converted' | 'lost';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  replied: boolean;
  replyText?: string;
}

export interface ProjectMessage {
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
}

export interface ProjectFile {
  name: string;
  url: string;
  uploadedAt: string;
  size: string;
}

export interface Project {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  description: string;
  serviceType: string;
  budget: string;
  timeline: string;
  progress: number;
  status: 'pending' | 'analysis' | 'UI/UX Design' | 'Development' | 'Testing' | 'Completed';
  submissionDate: string;
  files: ProjectFile[];
  messages: ProjectMessage[];
  adminNotes?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedDate: string;
  readTime: string;
  image: string;
  author: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  duration: string;
  beforeImage?: string;
  afterImage?: string;
  challenge: string;
  solution: string;
  results: string[];
  websiteUrl?: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  city: string;
  deviceType: string;
  browser: string;
  referral: string;
  landingPage: string;
  pagesVisited: string[];
  sessionDuration: number;
  timestamp: string;
}

export interface AdminStats {
  totalVisitors: number;
  totalLeads: number;
  totalUsers: number;
  totalInquiries: number;
  conversionRate: string;
  recentAnalytics: VisitorLog[];
  recentLeads: Lead[];
  recentInquiries: Inquiry[];
  recentUsers: User[];
}
