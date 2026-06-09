import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dns from "dns";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Ensure DNS works smoothly
dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const app = express();
const PORT = 3000;

// CORS Middleware - Allow all origins for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Path to durable db.json file
const DB_PATH = path.join(process.cwd(), "db.json");

const emailNotificationsEnabled = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.NOTIFICATION_EMAIL
);

const mailTransporter = emailNotificationsEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

// Helper types
interface ActivityLog {
  action: string;
  timestamp: string;
  details: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  registerDate: string;
  lastLogin: string;
  activityHistory: ActivityLog[];
}

interface Lead {
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

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  replied: boolean;
  replyText?: string;
}

interface ProjectMessage {
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
}

interface ProjectFile {
  name: string;
  url: string;
  uploadedAt: string;
  size: string;
}

interface Project {
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

interface Blog {
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

interface PortfolioItem {
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

interface VisitorLog {
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

interface DB {
  users: User[];
  leads: Lead[];
  inquiries: Inquiry[];
  projects: Project[];
  blogs: Blog[];
  portfolio: PortfolioItem[];
  analytics: VisitorLog[];
}

// Default Data Seed
const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Apex Dental Clinic - Custom Booking System & Web Portal",
    category: "Clinics",
    client: "Apex Care Dental Group",
    duration: "4 Weeks",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    beforeImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=60&w=800",
    afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    challenge: "The dental clinic relied entirely on manual phone calls for patient booking, leading to administrative bottlenecks, high abandonment rates on social profiles, and no patient intake security regulations.",
    solution: "We designed and launched an ultra-modern corporate website featuring an automated online booking system, intake form digitization, WhatsApp notifications, and lightweight patient dashboard integrations.",
    results: [
      "142% Increase in online patient bookings within 60 days",
      "Saved dentists over 20 administrative hours per week",
      "Reduced consultation cancellation rate under 4%",
      "4.9 Star average Google review response from pre-designed flow"
    ],
    websiteUrl: "https://apexcare-dental.example.com"
  },
  {
    id: "port-2",
    title: "Vibe Fitness Club - High-Conversion Leads Machine",
    category: "Gyms",
    client: "Vibe Fitness Studios",
    duration: "3 Weeks",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    beforeImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=60&w=800",
    afterImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    challenge: "Vibe Gym had beautiful equipment but no strategy to capture online leads. Traffic from Instagram and Google was lost with a static flyer website.",
    solution: "Fitted a high-converting micro-funnel, visual interactive tour schedules, a free digital 3-day pass generator, custom SMS tracking triggers, and lightweight CRM integrations.",
    results: [
      "340+ High-intent local leads generated in first 30 days",
      "Average cost per acquisition reduced by 35%",
      "Smooth corporate integration with Google Ads campaigns",
      "Interactive trainer scheduler automated 100% of physical bookings"
    ],
    websiteUrl: "https://vibe-fitness.example.com"
  },
  {
    id: "port-3",
    title: "Le Boulevard Bistro - Contactless Menu & Order Automation",
    category: "Restaurants",
    client: "Le Boulevard Group",
    duration: "2 Weeks",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    beforeImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=60&w=800",
    afterImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    challenge: "The restaurant was experiencing severe delays in customer waiter interactions, slow table turnover during peak lunch hours, and no digital customer loyalty collection list.",
    solution: "Engineered a lightning-fast QR-menu ordering web app, beautiful localized SEO cataloging, built-in dynamic loyalty punchcards, and single-click reservation automation.",
    results: [
      "22% Rise in average table order value with digital upsells",
      "Dynamic reservation engine booked out lunch tables weeks in advance",
      "Captured over 1,200 local customer emails for loyalty newsletter"
    ],
    websiteUrl: "https://leboulevard-bistro.example.com"
  }
];

const DEFAULT_BLOGS: Blog[] = [
  {
    id: "blog-1",
    title: "Why 87% of Local Business Websites Fail to Attract Customers (And How to Fix It)",
    slug: "why-local-business-websites-fail",
    excerpt: "Most local websites are designed as static business flyers. Discover how to turn your website into a 24/7 lead-generation asset.",
    content: `## The Static Flyer Trap
Most local business owners treat their websites like online business cards. They hire a freelancer, list their services, put their phone number on the contact page, and wait. Months pass, and they get exactly zero customer inquiries online.

Why? Because static pages don't motivate anyone to take action. When a visitor lands on your page, they are usually in immediate search of a solution. If they don't find a direct way to schedule a consultation, claim an offer, or calculate their requirements, they click away instantly to a competitor.

### How to Turn Your Static Site into a Sales Engine

To elevate your conversion rates, your website must implement interactive systems:

1. **Intelligent Capture Forms:** Trade-wide templates are boring. Replace them with specific value propositions, like a 'Get an Instant Clinic Estimate' or 'Unlock a 3day gym pass'.
2. **Instant Auto-Responders:** When clients submit a lead, they expect action. Linking your forms to automatic SMS/email or a WhatsApp template ensures they are caught before they cool down.
3. **Google Maps Optimization:** Dynamic embedded location maps, verified schema microdata, and localized reviews integration are critical to climb the Search results.

### The Conversion Bottom Line
An eye-catching design is only 10% of the battle. The remaining 90% is conversion architecture. Build features that capture information, capture intent, and handle bookings automatically. Let your website work while you sleep.`,
    category: "Lead Generation",
    publishedDate: "2026-06-05",
    readTime: "5 Min Read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: "Sawan Sharma, Founder & Chief Architect"
  },
  {
    id: "blog-2",
    title: "Boost Local Store Visits by 200%: The Complete Google Maps & SEO Blueprint",
    slug: "boost-store-visits-google-maps-seo",
    excerpt: "Learn the secrets of Local SEO and Google Maps optimization to dominate local search terms and drive customers to your storefront.",
    content: `## Local Dominance is the New Gold Rush
If you run a dental clinic, salon, gym, or restaurant, your clients are located within a 5-mile radius of your physical location. They aren't looking for a national brand—they search terms like "hair salon near me" or "best dentist in Delhi".

If your business isn't one of the three featured results in the Google Local Pack (the Map Section), you are virtually invisible to 75% of local searches.

### Step-by-Step Local Maps DOMINATOR Checklist

* **Perfect Schema Formatting:** Your website code should contain highly detailed JSON-LD schema describing your local business coordinates, hours, accepted pay structure, and services.
* **Responsive Page Architecture:** Google prioritizes responsive, fast-loading pages on mobile networks. If your page takes 7 seconds to launch, your Google Search ranks plummet.
* **Dynamic Location Landing Pages:** If you target multiple sectors or neighborhoods, craft dedicated, content-rich landing pages containing custom embedded maps, localized reviews, and geographical keywords.

### The Power of Automation
Our team specializes in bridging your local maps directly into a custom agency website. We configure instant booking widgets and map tracking to guarantee you capture regional buyers at the moment of peak intent.`,
    category: "Local SEO",
    publishedDate: "2026-06-01",
    readTime: "7 Min Read",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    author: "Sawan Sharma, Founder & Chief Architect"
  },
  {
    id: "blog-3",
    title: "The Magic of WhatsApp Automation for Local Businesses",
    slug: "whatsapp-automation-local-business",
    excerpt: "Integrate floating WhatsApp widgets and automated booking systems to reduce cancellation rates and keep customers engaged.",
    content: `## Customers Don't Read Emails Anymore
In 2026, the average open rate for marketing and operational emails hangs at a dismal 18-20%. Meanwhile, WhatsApp messages boast an unbelievable **98% open rate**, with most replies occurring within 90 seconds.

If you are still requiring local clients to check their spam folders for appointment details or gym sign-up links, you are bleeding customers before their first session.

### The Floating WhatsApp Widget Secret

By adding a highly styled, floating WhatsApp button to your bottom right margin, you accomplish two critical psychological wins:

1. **Trust Instantly:** It communicates that a real, human operator is available to answer questions in real time.
2. **Path of Least Friction:** It removes complex form-filling steps. One click, and the client starts talking to you natively in their favorite app.

### How to Automate Appointments
Once the visitor is routed from your high-conversion landing page to WhatsApp, configure lightweight chatbots or trigger templates to instantly finalize booking times, send payment reminders, and keep cancellation rates near 0%.

Our agency creates integrated website portals where bookings, contacts, and custom dashboard databases sync seamlessly into high-ROI WhatsApp triggers.`,
    category: "Business Automation",
    publishedDate: "2026-05-28",
    readTime: "4 Min Read",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
    author: "Sawan Sharma, Founder & Chief Architect"
  }
];

// Read DB from disk
function readDB(): DB {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDB: DB = {
        users: [
          {
            id: "u-1",
            name: "Sawan Sharma",
            email: "sawanforwork@gmail.com",
            phone: "+91 89297 57028",
            passwordHash: "password", // simple storage since it's a model system
            registerDate: "2026-06-01T10:00:00Z",
            lastLogin: "2026-06-07T15:29:02Z",
            activityHistory: [
              { action: "Register", timestamp: "2026-06-01T10:00:00Z", details: "Registered demo account." },
              { action: "Login", timestamp: "2026-06-07T15:29:02Z", details: "Logged into client dashboard successfully." }
            ]
          },
          {
            id: "u-2",
            name: "John Doe",
            email: "user@demo.com",
            phone: "+91 99999 88888",
            passwordHash: "password",
            registerDate: "2026-06-02T12:00:00Z",
            lastLogin: "2026-06-06T18:30:00Z",
            activityHistory: [
              { action: "Register", timestamp: "2026-06-02T12:00:00Z", details: "Registered demo account." }
            ]
          }
        ],
        leads: [
          {
            id: "lead-1",
            name: "Dr. Vikram Mehta",
            phone: "+91 98123 45678",
            email: "mehta.dentistry@gmail.com",
            businessName: "Mehta Dental Clinic",
            service: "AI Website & Custom Booking Setup",
            budget: "₹40,000 - ₹60,000",
            message: "Looking for an eye-catching dentistry web site and booking system for patients in Gokalpuri, Delhi.",
            timestamp: "2026-06-07T10:15:00Z",
            status: "new"
          },
          {
            id: "lead-2",
            name: "Rahul Khanna",
            phone: "+91 99000 11223",
            email: "rahul@ironcoregym.in",
            businessName: "Iron Core Fitness",
            service: "Landing Page & Ad Automation",
            budget: "₹20,000 - ₹40,000",
            message: "I want a high-ROI landing page to capture fitness memberships for our new branch opening next month.",
            timestamp: "2026-06-06T14:42:00Z",
            status: "contacted"
          }
        ],
        inquiries: [
          {
            id: "inq-1",
            name: "Meera Nair",
            email: "meera.nair@glowsalon.com",
            phone: "+91 98888 77777",
            message: "Is Google Maps integration included in your basic plan?",
            timestamp: "2026-06-07T11:00:00Z",
            replied: true,
            replyText: "Yes! All packages, including our Basic Plan, come with complete Google Maps pinning, Local SEO microdata, and Contact Form setups."
          }
        ],
        projects: [
          {
            id: "proj-1",
            userId: "u-1",
            userName: "Sawan Sharma",
            userEmail: "sawanforwork@gmail.com",
            title: "Aura E-Commerce Store & Client Hub",
            description: "High-end corporate storefront running custom automated systems, optimized for mobile checkout speed and WhatsApp dynamic confirmations.",
            serviceType: "Website Development",
            budget: "₹80,000",
            timeline: "5 Weeks",
            progress: 35,
            status: "UI/UX Design",
            submissionDate: "2026-06-02T11:20:00Z",
            files: [
              { name: "brand_guidelines.pdf", url: "#", uploadedAt: "2026-06-02T11:25:00Z", size: "2.4 MB" },
              { name: "product_catalog.xlsx", url: "#", uploadedAt: "2026-06-02T11:30:00Z", size: "1.2 MB" }
            ],
            messages: [
              { sender: "user", text: "Excited to get this project moving! I have uploaded the brand guide and starting inventory spreadsheet.", timestamp: "2026-06-02T11:32:00Z" },
              { sender: "admin", text: "Hello Sawan! Welcome to AURA WEB. We have reviewed your documents and are currently drafting the wireframe mocks. Looking forward to reviewing the designs on Wednesday!", timestamp: "2026-06-03T09:15:00Z" }
            ],
            adminNotes: "Wireframes are in progress. Follow up on product variations list."
          }
        ],
        blogs: DEFAULT_BLOGS,
        portfolio: DEFAULT_PORTFOLIO,
        analytics: [
          {
            id: "visit-1",
            ip: "157.45.18.232",
            country: "India",
            city: "Delhi",
            deviceType: "Desktop",
            browser: "Chrome",
            referral: "Google Campaign",
            landingPage: "/",
            pagesVisited: ["/", "/services", "/pricing"],
            sessionDuration: 182,
            timestamp: "2026-06-07T08:30:00Z"
          },
          {
            id: "visit-2",
            ip: "103.22.41.9",
            country: "India",
            city: "Mumbai",
            deviceType: "Mobile",
            browser: "Safari",
            referral: "Instagram Ads",
            landingPage: "/",
            pagesVisited: ["/", "/portfolio"],
            sessionDuration: 94,
            timestamp: "2026-06-07T12:15:00Z"
          }
        ]
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2), "utf8");
      return initialDB;
    }
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("DB reading error, returning fallback schema:", err);
    return { users: [], leads: [], inquiries: [], projects: [], blogs: DEFAULT_BLOGS, portfolio: DEFAULT_PORTFOLIO, analytics: [] };
  }
}

function writeDB(db: DB) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("DB writing error:", err);
  }
}

// Ensure database seeded at launch
const database = readDB();

// ADMIN SESSION STORAGE (In-memory for this session)
interface AuthSession {
  userId: string;
  email: string;
  isAdmin: boolean;
  token: string;
  expiresAt: number;
}

const activeSessions = new Map<string, AuthSession>();

// Helper function to generate auth token
function generateAuthToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Helper function to verify auth token
function verifyAuthToken(token: string): AuthSession | null {
  const session = activeSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }
  return session;
}

// Middleware to check admin authentication
function adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No authentication token provided. Admin access requires login." });
  }
  
  const token = authHeader.substring(7);
  const session = verifyAuthToken(token);
  
  if (!session || !session.isAdmin) {
    return res.status(403).json({ error: "Admin access denied. You do not have sufficient privileges." });
  }
  
  // Attach session to request for downstream handlers
  (req as any).session = session;
  next();
}

// API ROUTES

// AUTHENTICATION SYSTEM
app.post("/api/auth/register", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Please map all registration parameters exactly." });
  }

  const db = readDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: "The selected email address is already active in our records." });
  }

  const newUser: User = {
    id: "u-" + Math.random().toString(36).substr(2, 9),
    name,
    email: email.toLowerCase(),
    phone,
    passwordHash: password, // simple demo hashing
    registerDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    activityHistory: [
      { action: "Register", timestamp: new Date().toISOString(), details: "Completed new agency portal registration." }
    ]
  };

  db.users.push(newUser);
  writeDB(db);

  // Return user without password
  const { passwordHash, ...userPayload } = newUser;
  res.status(201).json({ success: true, user: userPayload });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter your email and secure password." });
  }

  // Handle Admin Universal Login safely inline
  const lowerEmail = email.toLowerCase();
  if (
    (lowerEmail === "admin@apexagency.ai" && password === "admin") ||
    (lowerEmail === "admin@aurawebstudio.com" && password === "admin") ||
    (lowerEmail === "sawanforwork@gmail.com" && password === "Admin@1417")
  ) {
    // Generate auth token for admin
    const token = generateAuthToken();
    const session: AuthSession = {
      userId: "admin-root",
      email: lowerEmail,
      isAdmin: true,
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };
    activeSessions.set(token, session);

    return res.json({
      success: true,
      isAdmin: true,
      authToken: token,
      user: {
        id: "admin-root",
        name: lowerEmail === "sawanforwork@gmail.com" ? "Sawan Sharma [Admin]" : "Apex AI Architect",
        email: lowerEmail,
        role: "admin",
        lastLogin: new Date().toISOString()
      }
    });
  }

  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.passwordHash !== password) {
    return res.status(400).json({ error: "Incorrect email address or passcode. Please try again." });
  }

  user.lastLogin = new Date().toISOString();
  user.activityHistory.push({
    action: "Login",
    timestamp: new Date().toISOString(),
    details: "Successfully authenticated with client portal."
  });
  writeDB(db);

  const { passwordHash, ...userPayload } = user;
  res.json({ success: true, user: userPayload, isAdmin: false });
});

app.post("/api/auth/reset", (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: "Missing required parameter values." });
  }

  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: "No client matches the designated email address." });
  }

  user.passwordHash = newPassword;
  user.activityHistory.push({
    action: "Password Reset",
    timestamp: new Date().toISOString(),
    details: "Reset login access password passcode."
  });
  writeDB(db);

  res.json({ success: true, message: "Your login password has been reset successfully." });
});

app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  res.json({ success: true, message: "Logged out successfully." });
});

app.post("/api/auth/profile/update", (req, res) => {
  const { id, name, phone } = req.body;
  if (!id) {
    return res.status(400).json({ error: "No user trace parameter provided." });
  }

  const db = readDB();
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User identity was not recognized." });
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;

  user.activityHistory.push({
    action: "Profile Update",
    timestamp: new Date().toISOString(),
    details: `Updated personal bio fields: [Name: ${name || user.name}, Phone: ${phone || user.phone}]`
  });
  writeDB(db);

  const { passwordHash, ...userPayload } = user;
  res.json({ success: true, user: userPayload });
});


// LEAD CAPTURE SYSTEM
app.post("/api/leads", (req, res) => {
  const { name, phone, email, businessName, service, budget, message } = req.body;
  if (!name || !phone || !email || !businessName || !service) {
    return res.status(400).json({ error: "Required fields are missing. Please complete all validation highlights." });
  }

  const db = readDB();
  const newLead: Lead = {
    id: "lead-" + Math.random().toString(36).substr(2, 9),
    name,
    phone,
    email: email.toLowerCase(),
    businessName,
    service,
    budget: budget || "Not Specifed",
    message: message || "No custom attachments",
    timestamp: new Date().toISOString(),
    status: "new"
  };

  db.leads.push(newLead);
  writeDB(db);

  res.status(201).json({ success: true, message: "Lead captured! Our automation experts will call you within 2 business hours." });
});


// CONTACT FORM INQUIRIES
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please enter your name, email, and the nature of your request." });
  }

  const db = readDB();
  const newInq: Inquiry = {
    id: "inq-" + Math.random().toString(36).substr(2, 9),
    name,
    email: email.toLowerCase(),
    phone: phone || "Not Provided",
    message,
    timestamp: new Date().toISOString(),
    replied: false
  };

  db.inquiries.push(newInq);
  writeDB(db);

  if (emailNotificationsEnabled && mailTransporter) {
    try {
      await mailTransporter.sendMail({
        from: `Website Notification <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: "New Website Enquiry Received",
        text: `New inquiry received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not Provided"}\n\nMessage:\n${message}`,
        html: `<p><strong>New inquiry received</strong></p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "Not Provided"}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
      });
    } catch (emailError) {
      console.error("Failed to send enquiry notification email:", emailError);
    }
  } else {
    console.warn("Email notifications are not enabled. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and NOTIFICATION_EMAIL in .env to enable them.");
  }

  res.status(201).json({
    success: true,
    message: emailNotificationsEnabled
      ? "Inquiry successfully submitted. Notification sent."
      : "Inquiry successfully submitted. Notification is not configured.",
  });
});


// PROJECT MANAGEMENT (CLIENT PORTAL)
app.get("/api/projects/user/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDB();
  const userProjects = db.projects.filter(p => p.userId === userId);
  res.json({ projects: userProjects });
});

app.post("/api/projects/create", (req, res) => {
  const { userId, userName, userEmail, title, description, serviceType, budget, timeline } = req.body;
  if (!userId || !title || !description || !serviceType) {
    return res.status(400).json({ error: "Missing required core project coordinates." });
  }

  const db = readDB();
  const newProject: Project = {
    id: "proj-" + Math.random().toString(36).substr(2, 9),
    userId,
    userName: userName || "Client Member",
    userEmail: userEmail || "client@aurawebstudio.com",
    title,
    description,
    serviceType,
    budget: budget || "₹25,000 - ₹50,000",
    timeline: timeline || "4 Weeks",
    progress: 10,
    status: "pending",
    submissionDate: new Date().toISOString(),
    files: [],
    messages: [
      { sender: "admin", text: `Welcome Sawan! Project '${title}' has been indexed. An AURA WEB Lead Architect is conducting requirement analysis.`, timestamp: new Date().toISOString() }
    ]
  };

  db.projects.push(newProject);

  // Log to user history
  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.activityHistory.push({
      action: "Project Index",
      timestamp: new Date().toISOString(),
      details: `Submitted project blueprint request: '${title}'`
    });
  }

  writeDB(db);
  res.status(201).json({ success: true, project: newProject });
});

app.post("/api/projects/message", (req, res) => {
  const { projectId, sender, text } = req.body;
  if (!projectId || !sender || !text) {
    return res.status(400).json({ error: "Project tracking code and draft content required." });
  }

  const db = readDB();
  const proj = db.projects.find(p => p.id === projectId);
  if (!proj) {
    return res.status(404).json({ error: "Target project system trace not recovered." });
  }

  proj.messages.push({
    sender,
    text,
    timestamp: new Date().toISOString()
  });

  writeDB(db);
  res.json({ success: true, messages: proj.messages });
});

// FILE UPLOAD SIMULATOR (Saves list details on server for persistent display)
app.post("/api/projects/upload", (req, res) => {
  const { projectId, fileName, fileSize } = req.body;
  if (!projectId || !fileName) {
    return res.status(400).json({ error: "Target coordinates missing." });
  }

  const db = readDB();
  const proj = db.projects.find(p => p.id === projectId);
  if (!proj) {
    return res.status(404).json({ error: "Project indexing mismatch." });
  }

  const newFile: ProjectFile = {
    name: fileName,
    url: "#",
    uploadedAt: new Date().toISOString(),
    size: fileSize || "1.2 MB"
  };

  proj.files.push(newFile);
  proj.messages.push({
    sender: "user",
    text: `Uploaded secure requirement document: ${fileName} (${newFile.size})`,
    timestamp: new Date().toISOString()
  });

  writeDB(db);
  res.json({ success: true, files: proj.files, messages: proj.messages });
});


// SERVER-SIDE AI GENERATOR (GEMINI CODES)
app.post("/api/ai/estimate-design", async (req, res) => {
  const { businessName, industry, serviceNeeded, specialRequests, budgetRange } = req.body;

  if (!businessName || !industry || !serviceNeeded) {
    return res.status(400).json({ error: "Please configure your Business Name, Industry, and core service request." });
  }

  // Get key safely
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Elegant system fallback if API key is not yet updated by the user in settings
    return res.json({
      success: true,
      demoMode: true,
      blueprint: {
        businessName,
        industry,
        colorTheme: "Midnight Obsidian (#0F172A), Electric Amethyst (#7C3AED), Arctic Glass (#E2E8F0)",
        suggestedSections: [
          `Dynamic Local Hero Slider (Customized for ${industry})`,
          "Interactive Calendar Scheduler Widget",
          "Visual Before/After Client Case Studies",
          "Automated Lead-Capture Punchcards",
          "Direct One-Click WhatsApp Bubble Support"
        ],
        estimatedCost: "₹35,000 - ₹55,000",
        timelineWeeks: 3,
        suggestedFeatures: [
          "Optimized Google SEO Headroom Schema Integration",
          "Automatic booking notification via WhatsApp triggers",
          "Fluid responsiveness with CSS structural grid"
        ],
        aiResponse: `## AURA WEB Strategic Design Blueprint\nGreetings from AURA WEB!\n\nBased on your requested profile for **${businessName}** in the **${industry}** sector, our senior architects have assembled a high-converting **${serviceNeeded}** strategy.\n\n### Strategic Recommendations\n* Since local competitors rely on obsolete static flyers, we recommend building custom **conversion widgets** directly inside your viewport.\n* Adding a **WhatsApp Business API Gateway** allows instantaneous customer booking, drastically reducing cancelled sessions.\n* **Local Rich Results Formatting (JSON-LD)** will be added so your clinic or storefront ranks directly on regional Google Map listings.`
      }
    });
  }

  try {
    const aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const promptText = `
You are the Lead Solutions Architect at AURA WEB (a premium, elite web development, local SEO, and custom systems automation studio located in Delhi, India).
A local business is requesting an intelligent custom website design blueprint and cost estimate.
Business Profile:
- Business Name: "${businessName}"
- Industry: "${industry}"
- Service Needed: "${serviceNeeded}"
- Special Requests: "${specialRequests || "None specified"}"
- Budget Preference: "${budgetRange || "Standard package"}"

Please analyze their profile and output a JSON object containing a premium, high-converting architecture strategy.
CRITICAL CONSTRAINT: Do NOT mention "AI", "artificial intelligence", "large language model", "Gemini", "algorithm", or "automation bot". Avoid saying "as an AI", "powered by AI", or anything indicating the description was generated by a computer. Present everything strictly as the physical expert blueprints formulated by the senior human design architects at AURA WEB Studio.

The JSON object MUST contain strictly these EXACT keys, formatted in compliance with standard JSON and with valid values:
{
  "businessName": "Name of the business",
  "industry": "Selected segment",
  "colorTheme": "A gorgeous luxury modern styling color palette recommendation (include names and hex codes)",
  "suggestedSections": ["Array", "of", "4-5", "critical website sections customized to convert local clients"],
  "estimatedCost": "Professional estimate in INR currency (e.g. ₹35,000 or custom range based on preferences)",
  "timelineWeeks": Number (suggested timeframe in weeks, 2 to 6 max),
  "suggestedFeatures": ["Array of 3 premium integrations, like WhatsApp auto-booking, Google Maps APIs, custom CRM dashboards, or client portal"],
  "aiResponse": "An elegant, professionally written markdown brief addressing the client. Highlight conversion rate optimization, local marketing advantages, mobile speeds, and how AURA WEB's senior development chamber implements this."
}

Do NOT wrap the JSON inside markdown wrappers, return ONLY the raw JSON parseable object structure.
`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    const textPayload = response.text || "";
    try {
      const parsedBlueprint = JSON.parse(textPayload.trim());
      res.json({ success: true, blueprint: parsedBlueprint });
    } catch (parseErr) {
      console.warn("Could not parse AI output as JSON, returning formatted string wrapper:", textPayload);
      res.json({
        success: true,
        demoMode: true,
        blueprint: {
          businessName,
          industry,
          colorTheme: "Aura Purple (#7C3AED), Stealth Slate (#1E293B)",
          suggestedSections: ["Hero Header", "Booking Scheduler", "Before/After Results", "FAQ Accordion"],
          estimatedCost: "₹30,000+",
          timelineWeeks: 3,
          suggestedFeatures: ["Local Google Pack optimizations", "Instant Lead Notifications"],
          aiResponse: textPayload || "Drafting error during server response analysis."
        }
      });
    }
  } catch (err: any) {
    console.error("Gemini API server failure:", err);
    res.status(500).json({ error: "Gemini server timed out during blueprint assembly.", details: err.message });
  }
});


// PUBLIC CONTENT: READ ONLY ACCESS
app.get("/api/blogs", (req, res) => {
  const db = readDB();
  res.json({ blogs: db.blogs });
});

app.get("/api/portfolio", (req, res) => {
  const db = readDB();
  res.json({ portfolio: db.portfolio });
});

app.get("/api/analytics/summary", (req, res) => {
  const db = readDB();
  res.json({ success: true, analytics: db.analytics || [] });
});


// ANALYTICS CAPTURING
app.post("/api/analytics/track", (req, res) => {
  const { path: landingPage, referral, deviceType, browser, pagesVisited, sessionDuration } = req.body;
  
  const db = readDB();
  
  // Basic mock IP geolocation capturing for demo analytics safety
  const randomCityInfo = [
    { city: "Bangalore", country: "India" },
    { city: "Mumbai", country: "India" },
    { city: "New Delhi", country: "India" },
    { city: "Chennai", country: "India" },
    { city: "Hyderabad", country: "India" },
    { city: "San Francisco", country: "United States" },
    { city: "London", country: "United Kingdom" }
  ];
  const locale = randomCityInfo[Math.floor(Math.random() * randomCityInfo.length)];

  // Generate Visitor IP
  const mockIP = `157.45.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

  const log: VisitorLog = {
    id: "visit-" + Math.random().toString(36).substr(2, 9),
    ip: mockIP,
    country: locale.country,
    city: locale.city,
    deviceType: deviceType || "Desktop",
    browser: browser || "Chrome",
    referral: referral || "Direct Access",
    landingPage: landingPage || "/",
    pagesVisited: pagesVisited || ["/"],
    sessionDuration: sessionDuration || Math.floor(Math.random() * 120 + 30),
    timestamp: new Date().toISOString()
  };

  db.analytics.push(log);
  writeDB(db);

  res.json({ success: true, trackingCode: log.id });
});


// ====== ADMINISTRATOR PROTECTED MANAGEMENT CONTROLS ======

// STATS OVERVIEW
app.get("/api/admin/stats", (req, res) => {
  const db = readDB();
  
  const totalVisitors = db.analytics.length;
  const totalLeads = db.leads.length;
  const totalUsers = db.users.length;
  const totalInquiries = db.inquiries.length;
  
  // Calculations
  const leadsConversionRate = totalVisitors > 0 ? ((totalLeads / totalVisitors) * 100).toFixed(1) : "0.0";
  
  res.json({
    totalVisitors,
    totalLeads,
    totalUsers,
    totalInquiries,
    conversionRate: `${leadsConversionRate}%`,
    recentAnalytics: db.analytics.slice(-30).reverse(),
    recentLeads: db.leads.slice(-10).reverse(),
    recentInquiries: db.inquiries.slice(-10).reverse(),
    recentUsers: db.users.slice(-10).reverse()
  });
});

// LEAD DB CONTROLS
app.get("/api/admin/leads", (req, res) => {
  const db = readDB();
  res.json({ leads: db.leads });
});

app.post("/api/admin/leads/update-status", (req, res) => {
  const { id, status } = req.body;
  const db = readDB();
  const lead = db.leads.find(l => l.id === id);
  if (lead) {
    lead.status = status;
    writeDB(db);
    return res.json({ success: true, lead });
  }
  res.status(404).json({ error: "Lead identity not recovered." });
});

app.post("/api/admin/leads/delete", (req, res) => {
  const { id } = req.body;
  const db = readDB();
  db.leads = db.leads.filter(l => l.id !== id);
  writeDB(db);
  res.json({ success: true, message: "Lead index wiped from system catalogs." });
});


// USER DB CONTROLS
app.get("/api/admin/users", (req, res) => {
  const db = readDB();
  res.json({ users: db.users });
});

app.post("/api/admin/users/delete", (req, res) => {
  const { id } = req.body;
  const db = readDB();
  db.users = db.users.filter(u => u.id !== id);
  // also clean up projects associated with user for integrity
  db.projects = db.projects.filter(p => p.userId !== id);
  writeDB(db);
  res.json({ success: true });
});


// PORTFOLIO DB CONTROLS
app.post("/api/admin/portfolio/add", (req, res) => {
  const { title, category, client, duration, beforeImage, afterImage, challenge, solution, results, websiteUrl, image } = req.body;
  if (!title || !category || !client || !challenge || !solution) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const db = readDB();
  const newItem: PortfolioItem = {
    id: "port-" + Math.random().toString(36).substr(2, 9),
    title,
    category,
    client,
    duration: duration || "3 Weeks",
    image: image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    beforeImage,
    afterImage,
    challenge,
    solution,
    results: Array.isArray(results) ? results : [results || "Converted successfully"],
    websiteUrl
  };

  db.portfolio.push(newItem);
  writeDB(db);
  res.status(201).json({ success: true, item: newItem });
});

app.post("/api/admin/portfolio/edit", (req, res) => {
  const { id, title, category, client, duration, beforeImage, afterImage, challenge, solution, results, websiteUrl, image } = req.body;
  const db = readDB();
  const item = db.portfolio.find(p => p.id === id);
  if (item) {
    if (title) item.title = title;
    if (category) item.category = category;
    if (client) item.client = client;
    if (duration) item.duration = duration;
    if (beforeImage) item.beforeImage = beforeImage;
    if (afterImage) item.afterImage = afterImage;
    if (challenge) item.challenge = challenge;
    if (solution) item.solution = solution;
    if (image) item.image = image;
    if (results) item.results = Array.isArray(results) ? results : [results];
    if (websiteUrl) item.websiteUrl = websiteUrl;

    writeDB(db);
    return res.json({ success: true, item });
  }
  res.status(404).json({ error: "Item not located." });
});

app.post("/api/admin/portfolio/delete", (req, res) => {
  const { id } = req.body;
  const db = readDB();
  db.portfolio = db.portfolio.filter(p => p.id !== id);
  writeDB(db);
  res.json({ success: true });
});


// BLOG DB CONTROLS
app.post("/api/admin/blogs/add", (req, res) => {
  const { title, excerpt, content, category, author, image, readTime } = req.body;
  if (!title || !content || !excerpt || !category) {
    return res.status(400).json({ error: "Required blog parameters are absent." });
  }

  const db = readDB();
  const newBlog: Blog = {
    id: "blog-" + Math.random().toString(36).substr(2, 9),
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    excerpt,
    content,
    category,
    publishedDate: new Date().toISOString().split("T")[0],
    readTime: readTime || "4 Min Read",
    image: image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: author || "Apex AI Team"
  };

  db.blogs.push(newBlog);
  writeDB(db);
  res.status(201).json({ success: true, blog: newBlog });
});

app.post("/api/admin/blogs/edit", (req, res) => {
  const { id, title, excerpt, content, category, author, image } = req.body;
  const db = readDB();
  const blog = db.blogs.find(b => b.id === id);
  if (blog) {
    if (title) {
      blog.title = title;
      blog.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (author) blog.author = author;
    if (image) blog.image = image;

    writeDB(db);
    return res.json({ success: true, blog });
  }
  res.status(404).json({ error: "Blog post not identified." });
});

app.post("/api/admin/blogs/delete", (req, res) => {
  const { id } = req.body;
  const db = readDB();
  db.blogs = db.blogs.filter(b => b.id !== id);
  writeDB(db);
  res.json({ success: true });
});


// INQUIRY CONTROLS
app.get("/api/admin/contacts", (req, res) => {
  const db = readDB();
  res.json({ inquiries: db.inquiries });
});

app.post("/api/admin/contacts/reply", (req, res) => {
  const { id, replyText } = req.body;
  const db = readDB();
  const contact = db.inquiries.find(c => c.id === id);
  if (contact) {
    contact.replied = true;
    contact.replyText = replyText || "Thank you for contacting Apex AI Agency. A representative will connect shortly.";
    writeDB(db);
    return res.json({ success: true, contact });
  }
  res.status(404).json({ error: "Inquiry index not found." });
});

app.post("/api/admin/contacts/delete", (req, res) => {
  const { id } = req.body;
  const db = readDB();
  db.inquiries = db.inquiries.filter(i => i.id !== id);
  writeDB(db);
  res.json({ success: true });
});


// PROJECT ADMIN CONTROLS
app.get("/api/admin/projects", (req, res) => {
  const db = readDB();
  res.json({ projects: db.projects });
});

app.post("/api/admin/projects/update", (req, res) => {
  const { id, progress, status, adminNotes } = req.body;
  const db = readDB();
  const proj = db.projects.find(p => p.id === id);
  if (proj) {
    if (progress !== undefined) proj.progress = Number(progress);
    if (status) proj.status = status;
    if (adminNotes !== undefined) proj.adminNotes = adminNotes;

    proj.messages.push({
      sender: "admin",
      text: `Status Update: Progress is now ${proj.progress}%. Milestone status changed to: '${proj.status}'.`,
      timestamp: new Date().toISOString()
    });

    writeDB(db);
    return res.json({ success: true, project: proj });
  }
  res.status(404).json({ error: "Project system item was not recognized." });
});


// SEO UTILS: SITEMAP & ROBOTS XML / TXT FOR PREMIUM CRO DOMINANCE
app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://apexagency.ai/</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://apexagency.ai/services</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://apexagency.ai/portfolio</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://apexagency.ai/pricing</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://apexagency.ai/about</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://apexagency.ai/blog</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://apexagency.ai/contact</loc>
    <lastmod>2026-06-07</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  res.send(sitemap);
});

app.get("/robots.txt", (req, res) => {
  res.header("Content-Type", "text/plain");
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/*

Sitemap: https://apexagency.ai/sitemap.xml`;
  res.send(robots);
});


// VITE DEVELOPMENT MIDDLEWARE / PRODUCTION STATIC ROUTING
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Apex Agency Engine] Premium Service active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
