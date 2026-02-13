export interface Integration {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  logo: string;
  setupTime: string;
  users: string;
  rating: number;
  overview: string;
  benefits: string[];
  setupSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  useCases: {
    title: string;
    description: string;
    icon: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  security: {
    encryption: boolean;
    ferpaCompliant: boolean;
    sso: boolean;
  };
  relatedIntegrations: string[];
}

export const integrations: Integration[] = [
  {
    id: "1",
    name: "Google Classroom",
    slug: "google-classroom",
    category: "Learning Management",
    description:
      "Seamlessly sync assignments, grades, and student rosters between Zaza Draft and Google Classroom.",
    logo: "/google-classroom-logo.jpg",
    setupTime: "5 minutes",
    users: "2.5M+",
    rating: 4.9,
    overview:
      "The Google Classroom integration allows you to automatically sync your class rosters, push AI-generated assignments directly to Google Classroom, and import student submissions for grading with Zaza Draft. Save hours of manual data entry and keep everything in sync.",
    benefits: [
      "Automatic roster sync - no manual student entry",
      "One-click assignment publishing to Google Classroom",
      "Import student work directly for AI-assisted grading",
      "Sync grades back to Google Classroom gradebook",
      "Real-time updates when students submit work",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Your Google Account",
        description:
          'Click "Connect Google Classroom" in your Zaza Draft settings and authorize access to your Google account.',
      },
      {
        step: 2,
        title: "Select Classes to Sync",
        description:
          "Choose which Google Classroom classes you want to sync with Zaza Draft. You can sync all or select specific classes.",
      },
      {
        step: 3,
        title: "Configure Sync Settings",
        description:
          "Set your preferences for automatic roster updates, grade syncing, and assignment publishing.",
      },
      {
        step: 4,
        title: "Test the Integration",
        description:
          "Create a test assignment in Zaza Draft and publish it to Google Classroom to verify everything works correctly.",
      },
    ],
    useCases: [
      {
        title: "Automated Roster Management",
        description:
          "Student rosters automatically sync from Google Classroom to Zaza Draft, eliminating manual data entry.",
        icon: "Users",
      },
      {
        title: "One-Click Assignment Publishing",
        description:
          "Create assignments in Zaza Draft and publish them directly to Google Classroom with one click.",
        icon: "Send",
      },
      {
        title: "Streamlined Grading Workflow",
        description:
          "Import student submissions from Google Classroom, grade with AI assistance, and sync grades back automatically.",
        icon: "CheckCircle",
      },
    ],
    faqs: [
      {
        question: "Do I need a Google Workspace for Education account?",
        answer:
          "Yes, you need an active Google Workspace for Education account with Google Classroom enabled to use this integration.",
      },
      {
        question: "Will this work with my existing Google Classroom classes?",
        answer:
          "The integration works with all your existing Google Classroom classes. You can choose which classes to sync.",
      },
      {
        question: "Can I control which assignments sync?",
        answer:
          "Yes, you have full control. You can choose to publish assignments to Google Classroom on a per-assignment basis.",
      },
      {
        question: "What happens if I disconnect the integration?",
        answer:
          "Your data in both systems remains intact. You simply lose the automatic syncing capability. You can reconnect at any time.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["canvas-lms", "schoology", "google-drive", "gmail"],
  },
  {
    id: "2",
    name: "Canvas LMS",
    slug: "canvas-lms",
    category: "Learning Management",
    description:
      "Connect Zaza Draft with Canvas to sync courses, assignments, and grades seamlessly.",
    logo: "/canvas-lms-logo.jpg",
    setupTime: "10 minutes",
    users: "850K+",
    rating: 4.8,
    overview:
      "The Canvas LMS integration provides deep integration with your Canvas courses, allowing you to manage assignments, sync grades, and streamline your workflow between Canvas and Zaza Draft.",
    benefits: [
      "Automatic course and student roster sync",
      "Publish assignments directly to Canvas",
      "Import Canvas assignments into Zaza Draft",
      "Bidirectional grade syncing",
      "Support for Canvas rubrics and grading schemes",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Generate Canvas API Token",
        description:
          "Log into Canvas, go to Account Settings, and generate a new API access token.",
      },
      {
        step: 2,
        title: "Enter API Token in Zaza Draft",
        description:
          "Paste your Canvas API token into the integration settings in Zaza Draft.",
      },
      {
        step: 3,
        title: "Select Courses to Sync",
        description:
          "Choose which Canvas courses you want to integrate with Zaza Draft.",
      },
      {
        step: 4,
        title: "Configure Grade Sync",
        description:
          "Set up your grade syncing preferences and test with a sample assignment.",
      },
    ],
    useCases: [
      {
        title: "Course Management",
        description:
          "Automatically sync course rosters and keep student information up to date across both platforms.",
        icon: "BookOpen",
      },
      {
        title: "Assignment Distribution",
        description:
          "Create assignments in Zaza Draft and publish them to Canvas with all settings intact.",
        icon: "FileText",
      },
      {
        title: "Grade Synchronization",
        description:
          "Grades entered in Zaza Draft automatically sync to Canvas gradebook, saving time and reducing errors.",
        icon: "TrendingUp",
      },
    ],
    faqs: [
      {
        question: "Does this work with Canvas Free for Teachers?",
        answer:
          "Yes, the integration works with all Canvas accounts including Canvas Free for Teachers and institutional Canvas instances.",
      },
      {
        question: "Can I use Canvas rubrics with Zaza Draft?",
        answer:
          "Yes, Canvas rubrics are fully supported. You can import Canvas rubrics into Zaza Draft or create new ones.",
      },
      {
        question: "How often does data sync between Canvas and Zaza Draft?",
        answer:
          "Data syncs in real-time for most actions. Roster updates sync every 6 hours automatically, or you can trigger a manual sync anytime.",
      },
      {
        question: "Is my Canvas API token secure?",
        answer:
          "Yes, your API token is encrypted and stored securely. We never share your token with third parties.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["google-classroom", "schoology", "turnitin"],
  },
  {
    id: "3",
    name: "Gmail",
    slug: "gmail",
    category: "Communication",
    description:
      "Send AI-generated parent emails and student feedback directly from Zaza Draft through Gmail.",
    logo: "/gmail-logo.png",
    setupTime: "3 minutes",
    users: "3.2M+",
    rating: 4.9,
    overview:
      "The Gmail integration allows you to send AI-generated parent communications, student feedback, and class announcements directly through your Gmail account, maintaining your professional email identity.",
    benefits: [
      "Send emails directly from your Gmail account",
      "Maintain your email signature and branding",
      "Track email opens and responses",
      "Schedule emails for optimal delivery times",
      "Bulk send personalized emails to multiple recipients",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Gmail Account",
        description:
          'Click "Connect Gmail" and authorize Zaza Draft to send emails on your behalf.',
      },
      {
        step: 2,
        title: "Configure Email Settings",
        description:
          "Set up your default email signature, reply-to address, and sending preferences.",
      },
      {
        step: 3,
        title: "Test Email Sending",
        description:
          "Send a test email to yourself to verify the integration is working correctly.",
      },
    ],
    useCases: [
      {
        title: "Parent Communication",
        description:
          "Generate and send personalized parent emails about student progress, behavior, or upcoming events.",
        icon: "Mail",
      },
      {
        title: "Student Feedback",
        description:
          "Email detailed feedback on assignments directly to students through your Gmail account.",
        icon: "MessageSquare",
      },
      {
        title: "Class Announcements",
        description:
          "Send class-wide announcements and reminders while maintaining your professional email identity.",
        icon: "Bell",
      },
    ],
    faqs: [
      {
        question: "Will emails show as coming from my Gmail address?",
        answer:
          "Yes, all emails are sent from your Gmail address, so recipients see your familiar email identity.",
      },
      {
        question: "Can I use my school Gmail account?",
        answer:
          "Yes, the integration works with both personal Gmail accounts and Google Workspace for Education accounts.",
      },
      {
        question: "Are there any sending limits?",
        answer:
          "Gmail has daily sending limits (500 for personal accounts, 2000 for Workspace accounts). Zaza Draft respects these limits.",
      },
      {
        question: "Can I schedule emails to send later?",
        answer:
          "Yes, you can schedule emails to send at a specific date and time for optimal delivery.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["outlook", "google-classroom", "powerschool"],
  },
  {
    id: "4",
    name: "PowerSchool",
    slug: "powerschool",
    category: "Student Information System",
    description:
      "Sync student data, grades, and attendance between PowerSchool and Zaza Draft.",
    logo: "/powerschool-logo.jpg",
    setupTime: "15 minutes",
    users: "450K+",
    rating: 4.7,
    overview:
      "The PowerSchool integration provides seamless data synchronization between your district's PowerSchool SIS and Zaza Draft, ensuring accurate student information and streamlined grade reporting.",
    benefits: [
      "Automatic student roster and demographic sync",
      "Push grades directly to PowerSchool gradebook",
      "Import attendance data for context",
      "Sync IEP and 504 information (with permissions)",
      "Support for custom PowerSchool fields",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Contact Your IT Administrator",
        description:
          "Work with your school IT admin to obtain PowerSchool API credentials and necessary permissions.",
      },
      {
        step: 2,
        title: "Enter PowerSchool Credentials",
        description:
          "Input your PowerSchool server URL, client ID, and client secret in Zaza Draft integration settings.",
      },
      {
        step: 3,
        title: "Map Grade Categories",
        description:
          "Map your Zaza Draft assignment categories to PowerSchool grade categories.",
      },
      {
        step: 4,
        title: "Configure Sync Schedule",
        description:
          "Set up automatic sync intervals and test the integration with a sample grade entry.",
      },
    ],
    useCases: [
      {
        title: "Student Data Management",
        description:
          "Automatically import and update student rosters, demographics, and enrollment information.",
        icon: "Database",
      },
      {
        title: "Grade Reporting",
        description:
          "Push grades from Zaza Draft directly to PowerSchool gradebook, eliminating double entry.",
        icon: "BarChart",
      },
      {
        title: "Attendance Integration",
        description:
          "View student attendance data from PowerSchool within Zaza Draft for better context.",
        icon: "Calendar",
      },
    ],
    faqs: [
      {
        question: "Do I need special permissions to set up this integration?",
        answer:
          "Yes, you'll need API access permissions from your school or district IT administrator.",
      },
      {
        question: "Can I sync historical grade data?",
        answer:
          "Yes, you can import historical grades from PowerSchool to maintain complete records in Zaza Draft.",
      },
      {
        question: "How often does student data sync?",
        answer:
          "Student roster data syncs automatically every 24 hours, with the option to trigger manual syncs anytime.",
      },
      {
        question: "Is this integration FERPA-ready?",
        answer:
          "Yes, all data transmission is encrypted and we maintain strict FERPA compliance standards.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["infinite-campus", "google-classroom", "canvas-lms"],
  },
  {
    id: "5",
    name: "Google Drive",
    slug: "google-drive",
    category: "Cloud Storage",
    description:
      "Store and organize all your Zaza Draft documents, assignments, and resources in Google Drive.",
    logo: "/google-drive-logo.png",
    setupTime: "5 minutes",
    users: "2.8M+",
    rating: 4.8,
    overview:
      "The Google Drive integration allows you to automatically save all your Zaza Draft content to Google Drive, making it easy to organize, share, and access your teaching materials from anywhere.",
    benefits: [
      "Automatic backup of all Zaza Draft content",
      "Organize materials in custom Drive folders",
      "Share resources with colleagues easily",
      "Access materials from any device",
      "Leverage unlimited storage (with Workspace for Education)",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Google Drive",
        description:
          'Click "Connect Google Drive" and authorize Zaza Draft to access your Drive.',
      },
      {
        step: 2,
        title: "Choose Storage Location",
        description:
          "Select or create a folder in Google Drive where Zaza Draft will save your content.",
      },
      {
        step: 3,
        title: "Configure Auto-Save",
        description:
          "Set up automatic saving preferences for different types of content.",
      },
    ],
    useCases: [
      {
        title: "Automatic Backup",
        description:
          "All your lesson plans, assignments, and resources are automatically backed up to Google Drive.",
        icon: "Cloud",
      },
      {
        title: "Easy Sharing",
        description:
          "Share teaching materials with colleagues by simply sharing the Google Drive folder.",
        icon: "Share2",
      },
      {
        title: "Cross-Device Access",
        description:
          "Access your Zaza Draft materials from any device with Google Drive sync.",
        icon: "Smartphone",
      },
    ],
    faqs: [
      {
        question: "How much storage space do I need?",
        answer:
          "Most teachers use less than 1GB for a full year of materials. Google Workspace for Education provides unlimited storage.",
      },
      {
        question: "Can I organize materials into different folders?",
        answer:
          "Yes, you can create custom folder structures and Zaza Draft will respect your organization.",
      },
      {
        question: "What file formats are saved to Drive?",
        answer:
          "Documents are saved as Google Docs, spreadsheets as Google Sheets, and other files in their native formats.",
      },
      {
        question: "Can I disconnect Drive without losing my Zaza Draft data?",
        answer:
          "Yes, your data remains in Zaza Draft. Disconnecting only stops the automatic syncing to Drive.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["google-classroom", "onedrive", "dropbox"],
  },
  {
    id: "6",
    name: "Schoology",
    slug: "schoology",
    category: "Learning Management",
    description:
      "Integrate Zaza Draft with Schoology to sync courses, assignments, and grades.",
    logo: "/schoology-logo.jpg",
    setupTime: "10 minutes",
    users: "620K+",
    rating: 4.7,
    overview:
      "Connect Zaza Draft with Schoology to streamline your workflow, automatically sync student rosters, and push grades directly to your Schoology gradebook.",
    benefits: [
      "Automatic course and roster synchronization",
      "One-click assignment publishing to Schoology",
      "Bidirectional grade syncing",
      "Import Schoology assignments into Zaza Draft",
      "Support for Schoology rubrics and standards",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Generate Schoology API Key",
        description:
          "Log into Schoology, navigate to App Center, and generate API credentials.",
      },
      {
        step: 2,
        title: "Enter API Credentials",
        description:
          "Input your Schoology consumer key and secret in Zaza Draft settings.",
      },
      {
        step: 3,
        title: "Select Courses",
        description: "Choose which Schoology courses to sync with Zaza Draft.",
      },
      {
        step: 4,
        title: "Test Integration",
        description:
          "Create a test assignment and verify it syncs correctly to Schoology.",
      },
    ],
    useCases: [
      {
        title: "Course Synchronization",
        description:
          "Keep student rosters and course information automatically updated across both platforms.",
        icon: "RefreshCw",
      },
      {
        title: "Assignment Management",
        description:
          "Create assignments in Zaza Draft and publish them to Schoology with one click.",
        icon: "FileText",
      },
      {
        title: "Grade Integration",
        description:
          "Grades from Zaza Draft automatically sync to Schoology gradebook.",
        icon: "Award",
      },
    ],
    faqs: [
      {
        question: "Do I need administrator access to set this up?",
        answer:
          "No, individual teachers can set up the integration with their own Schoology API credentials.",
      },
      {
        question: "Can I use Schoology rubrics in Zaza Draft?",
        answer:
          "Yes, you can import Schoology rubrics or create new ones that sync back to Schoology.",
      },
      {
        question: "How often does data sync?",
        answer:
          "Roster data syncs every 6 hours automatically. Grades and assignments sync in real-time.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["canvas-lms", "google-classroom", "turnitin"],
  },
  {
    id: "7",
    name: "Infinite Campus",
    slug: "infinite-campus",
    category: "Student Information System",
    description:
      "Sync student data, grades, and attendance between Infinite Campus and Zaza Draft.",
    logo: "/infinite-campus-logo.jpg",
    setupTime: "15 minutes",
    users: "380K+",
    rating: 4.6,
    overview:
      "The Infinite Campus integration provides seamless data synchronization with your district's SIS, ensuring accurate student information and streamlined grade reporting.",
    benefits: [
      "Automatic student roster sync",
      "Push grades to Infinite Campus gradebook",
      "Import attendance and demographic data",
      "Support for custom grading scales",
      "Sync special education information (with permissions)",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Obtain API Credentials",
        description:
          "Work with your IT administrator to get Infinite Campus API access credentials.",
      },
      {
        step: 2,
        title: "Configure Connection",
        description:
          "Enter your district's Infinite Campus URL and API credentials in Zaza Draft.",
      },
      {
        step: 3,
        title: "Map Grade Categories",
        description:
          "Map Zaza Draft assignment types to Infinite Campus grade categories.",
      },
      {
        step: 4,
        title: "Test Grade Sync",
        description:
          "Submit a test grade to verify the integration is working correctly.",
      },
    ],
    useCases: [
      {
        title: "Roster Management",
        description:
          "Automatically import and update student rosters from Infinite Campus.",
        icon: "Users",
      },
      {
        title: "Grade Submission",
        description:
          "Push grades directly to Infinite Campus, eliminating manual data entry.",
        icon: "Upload",
      },
      {
        title: "Data Context",
        description:
          "View attendance and demographic data within Zaza Draft for better student understanding.",
        icon: "Info",
      },
    ],
    faqs: [
      {
        question: "Do I need special permissions?",
        answer:
          "Yes, you'll need API access permissions from your school or district IT department.",
      },
      {
        question: "Can I sync historical data?",
        answer:
          "Yes, you can import historical grades and student data from previous terms.",
      },
      {
        question: "Is this FERPA-ready?",
        answer:
          "Yes, all data transmission is encrypted and we maintain strict FERPA compliance.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["powerschool", "google-classroom", "canvas-lms"],
  },
  {
    id: "8",
    name: "Microsoft Outlook",
    slug: "outlook",
    category: "Communication",
    description:
      "Send AI-generated emails and communications through your Microsoft Outlook account.",
    logo: "/outlook-logo.jpg",
    setupTime: "5 minutes",
    users: "1.8M+",
    rating: 4.8,
    overview:
      "The Outlook integration allows you to send parent communications, student feedback, and announcements directly through your Microsoft Outlook account.",
    benefits: [
      "Send emails from your Outlook account",
      "Maintain your email signature and branding",
      "Schedule emails for later delivery",
      "Track email opens and responses",
      "Bulk send personalized messages",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Outlook Account",
        description:
          'Click "Connect Outlook" and sign in with your Microsoft account.',
      },
      {
        step: 2,
        title: "Configure Email Settings",
        description: "Set up your default signature and sending preferences.",
      },
      {
        step: 3,
        title: "Test Email",
        description:
          "Send a test email to verify the integration works correctly.",
      },
    ],
    useCases: [
      {
        title: "Parent Updates",
        description:
          "Send personalized parent emails about student progress and behavior.",
        icon: "Mail",
      },
      {
        title: "Student Feedback",
        description: "Email detailed assignment feedback directly to students.",
        icon: "MessageCircle",
      },
      {
        title: "Announcements",
        description: "Send class-wide announcements and reminders.",
        icon: "Megaphone",
      },
    ],
    faqs: [
      {
        question: "Does this work with Office 365 Education?",
        answer:
          "Yes, the integration works with both personal Outlook accounts and Office 365 Education accounts.",
      },
      {
        question: "Are there sending limits?",
        answer:
          "Microsoft has daily sending limits (typically 500-10,000 depending on your account type).",
      },
      {
        question: "Can I use my school email signature?",
        answer:
          "Yes, you can configure your signature in the integration settings.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["gmail", "onedrive", "google-classroom"],
  },
  {
    id: "9",
    name: "Microsoft OneDrive",
    slug: "onedrive",
    category: "Cloud Storage",
    description:
      "Store and organize your Zaza Draft content in Microsoft OneDrive.",
    logo: "/onedrive-logo.jpg",
    setupTime: "5 minutes",
    users: "1.5M+",
    rating: 4.7,
    overview:
      "The OneDrive integration automatically backs up all your Zaza Draft content to Microsoft OneDrive, making it accessible from any device.",
    benefits: [
      "Automatic backup of all content",
      "Organize materials in custom folders",
      "Share resources with colleagues",
      "Access from any device",
      "1TB+ storage with Office 365 Education",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect OneDrive",
        description:
          'Click "Connect OneDrive" and sign in with your Microsoft account.',
      },
      {
        step: 2,
        title: "Choose Storage Location",
        description:
          "Select or create a folder in OneDrive for Zaza Draft content.",
      },
      {
        step: 3,
        title: "Configure Auto-Save",
        description: "Set up automatic saving preferences.",
      },
    ],
    useCases: [
      {
        title: "Automatic Backup",
        description: "All materials are automatically backed up to OneDrive.",
        icon: "HardDrive",
      },
      {
        title: "Easy Sharing",
        description: "Share teaching materials with colleagues via OneDrive.",
        icon: "Share",
      },
      {
        title: "Multi-Device Access",
        description:
          "Access your materials from any device with OneDrive sync.",
        icon: "Monitor",
      },
    ],
    faqs: [
      {
        question: "How much storage do I need?",
        answer:
          "Most teachers use less than 1GB. Office 365 Education provides 1TB+ of storage.",
      },
      {
        question: "Can I organize files into folders?",
        answer: "Yes, you can create custom folder structures in OneDrive.",
      },
      {
        question: "What file formats are saved?",
        answer:
          "Documents are saved as Word files, spreadsheets as Excel, and other files in native formats.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["google-drive", "dropbox", "outlook"],
  },
  {
    id: "10",
    name: "Dropbox",
    slug: "dropbox",
    category: "Cloud Storage",
    description: "Store and sync your Zaza Draft materials with Dropbox.",
    logo: "/dropbox-logo.jpg",
    setupTime: "5 minutes",
    users: "890K+",
    rating: 4.6,
    overview:
      "The Dropbox integration provides automatic backup and synchronization of all your Zaza Draft content to Dropbox.",
    benefits: [
      "Automatic backup of all materials",
      "Version history for all documents",
      "Share folders with colleagues",
      "Access from any device",
      "Offline access to synced files",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Dropbox",
        description: 'Click "Connect Dropbox" and authorize Zaza Draft access.',
      },
      {
        step: 2,
        title: "Choose Folder",
        description:
          "Select or create a Dropbox folder for your Zaza Draft content.",
      },
      {
        step: 3,
        title: "Configure Sync",
        description: "Set up automatic syncing preferences.",
      },
    ],
    useCases: [
      {
        title: "Automatic Backup",
        description:
          "All your teaching materials are automatically backed up to Dropbox.",
        icon: "Save",
      },
      {
        title: "Version Control",
        description:
          "Access previous versions of documents with Dropbox version history.",
        icon: "History",
      },
      {
        title: "Offline Access",
        description: "Download materials for offline access when needed.",
        icon: "Download",
      },
    ],
    faqs: [
      {
        question: "How much storage do I need?",
        answer:
          "Most teachers use 1-2GB per year. Dropbox offers 2GB free or unlimited with paid plans.",
      },
      {
        question: "Can I share folders with other teachers?",
        answer:
          "Yes, you can share Dropbox folders with colleagues for collaboration.",
      },
      {
        question: "Does this work with Dropbox Business?",
        answer:
          "Yes, the integration works with both personal and Dropbox Business accounts.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: false,
    },
    relatedIntegrations: ["google-drive", "onedrive"],
  },
  {
    id: "11",
    name: "Kahoot!",
    slug: "kahoot",
    category: "Assessment",
    description:
      "Create and import Kahoot! quizzes with AI assistance from Zaza Draft.",
    logo: "/kahoot-logo.jpg",
    setupTime: "5 minutes",
    users: "720K+",
    rating: 4.8,
    overview:
      "The Kahoot! integration allows you to generate quiz questions with AI and export them directly to Kahoot! for engaging classroom activities.",
    benefits: [
      "AI-generated quiz questions",
      "One-click export to Kahoot!",
      "Import Kahoot! results for analysis",
      "Align questions to learning standards",
      "Create formative assessments quickly",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Kahoot! Account",
        description:
          'Click "Connect Kahoot!" and sign in with your Kahoot! account.',
      },
      {
        step: 2,
        title: "Authorize Access",
        description:
          "Grant Zaza Draft permission to create and manage Kahoot! quizzes.",
      },
      {
        step: 3,
        title: "Create Test Quiz",
        description:
          "Generate a test quiz in Zaza Draft and export it to Kahoot!.",
      },
    ],
    useCases: [
      {
        title: "Quick Formative Assessment",
        description:
          "Generate quiz questions with AI and export to Kahoot! in minutes.",
        icon: "Zap",
      },
      {
        title: "Engaging Review Games",
        description: "Create fun review games aligned to your curriculum.",
        icon: "Gamepad2",
      },
      {
        title: "Data Analysis",
        description:
          "Import Kahoot! results back to Zaza Draft for detailed analysis.",
        icon: "PieChart",
      },
    ],
    faqs: [
      {
        question: "Do I need a Kahoot! Pro account?",
        answer:
          "No, the integration works with free Kahoot! accounts, though Pro accounts have additional features.",
      },
      {
        question: "Can I edit questions after exporting?",
        answer:
          "Yes, you can edit questions in Kahoot! after exporting from Zaza Draft.",
      },
      {
        question: "How many questions can I export at once?",
        answer: "You can export up to 100 questions per quiz (Kahoot! limit).",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: false,
    },
    relatedIntegrations: ["quizizz", "formative", "google-forms"],
  },
  {
    id: "12",
    name: "Quizizz",
    slug: "quizizz",
    category: "Assessment",
    description:
      "Generate and export AI-powered quizzes to Quizizz for student practice.",
    logo: "/quizizz-logo.jpg",
    setupTime: "5 minutes",
    users: "650K+",
    rating: 4.7,
    overview:
      "The Quizizz integration enables you to create engaging quizzes with AI assistance and export them to Quizizz for self-paced student practice.",
    benefits: [
      "AI-generated quiz questions",
      "Export to Quizizz with one click",
      "Import quiz results for analysis",
      "Support for multiple question types",
      "Automatic answer explanations",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Quizizz",
        description:
          'Click "Connect Quizizz" and sign in with your Quizizz account.',
      },
      {
        step: 2,
        title: "Grant Permissions",
        description: "Authorize Zaza Draft to create and manage quizzes.",
      },
      {
        step: 3,
        title: "Test Export",
        description: "Create a sample quiz and export it to Quizizz.",
      },
    ],
    useCases: [
      {
        title: "Self-Paced Practice",
        description:
          "Create quizzes for students to complete at their own pace.",
        icon: "Clock",
      },
      {
        title: "Homework Assignments",
        description:
          "Generate engaging homework quizzes with instant feedback.",
        icon: "Home",
      },
      {
        title: "Progress Monitoring",
        description: "Track student progress with detailed analytics.",
        icon: "TrendingUp",
      },
    ],
    faqs: [
      {
        question: "Does this work with Quizizz for Schools?",
        answer:
          "Yes, the integration works with both free and Quizizz for Schools accounts.",
      },
      {
        question: "Can I include images in questions?",
        answer:
          "Yes, you can add images to questions before exporting to Quizizz.",
      },
      {
        question: "How are quiz results imported?",
        answer:
          "Quiz results automatically sync back to Zaza Draft after students complete the quiz.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: false,
    },
    relatedIntegrations: ["kahoot", "formative", "google-forms"],
  },
  {
    id: "13",
    name: "Formative",
    slug: "formative",
    category: "Assessment",
    description:
      "Create and export formative assessments to Formative with AI assistance.",
    logo: "/formative-logo.jpg",
    setupTime: "5 minutes",
    users: "420K+",
    rating: 4.7,
    overview:
      "The Formative integration allows you to generate formative assessment questions with AI and export them to Formative for real-time student feedback.",
    benefits: [
      "AI-generated assessment questions",
      "Real-time student response tracking",
      "Export to Formative with one click",
      "Support for multiple question types",
      "Instant feedback for students",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Formative",
        description:
          'Click "Connect Formative" and sign in with your Formative account.',
      },
      {
        step: 2,
        title: "Authorize Access",
        description: "Grant Zaza Draft permission to create assessments.",
      },
      {
        step: 3,
        title: "Create Test Assessment",
        description: "Generate a test assessment and export it to Formative.",
      },
    ],
    useCases: [
      {
        title: "Real-Time Checks",
        description:
          "Create quick formative assessments to check understanding in real-time.",
        icon: "Activity",
      },
      {
        title: "Exit Tickets",
        description:
          "Generate exit tickets to assess learning at the end of class.",
        icon: "LogOut",
      },
      {
        title: "Differentiation",
        description:
          "Create multiple versions of assessments for differentiated instruction.",
        icon: "GitBranch",
      },
    ],
    faqs: [
      {
        question: "Do I need a Formative Premium account?",
        answer:
          "No, the integration works with free Formative accounts, though Premium has additional features.",
      },
      {
        question: "Can students see feedback immediately?",
        answer:
          "Yes, you can configure Formative to show instant feedback to students.",
      },
      {
        question: "What question types are supported?",
        answer:
          "Multiple choice, short answer, true/false, and show your work questions are all supported.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: false,
    },
    relatedIntegrations: ["kahoot", "quizizz", "google-forms"],
  },
  {
    id: "14",
    name: "Google Forms",
    slug: "google-forms",
    category: "Assessment",
    description: "Generate and export surveys and assessments to Google Forms.",
    logo: "/google-forms-logo.jpg",
    setupTime: "3 minutes",
    users: "2.1M+",
    rating: 4.8,
    overview:
      "The Google Forms integration allows you to create surveys, quizzes, and assessments with AI and export them to Google Forms for easy distribution.",
    benefits: [
      "AI-generated form questions",
      "One-click export to Google Forms",
      "Automatic response collection",
      "Integration with Google Sheets",
      "Support for all Google Forms question types",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Connect Google Account",
        description: 'Click "Connect Google Forms" and authorize access.',
      },
      {
        step: 2,
        title: "Configure Settings",
        description:
          "Set up default form settings and response collection preferences.",
      },
      {
        step: 3,
        title: "Test Export",
        description: "Create a test form and export it to Google Forms.",
      },
    ],
    useCases: [
      {
        title: "Student Surveys",
        description:
          "Create student interest surveys and feedback forms quickly.",
        icon: "ClipboardList",
      },
      {
        title: "Parent Communication",
        description: "Generate parent survey forms for conferences and events.",
        icon: "Users",
      },
      {
        title: "Quick Assessments",
        description:
          "Create simple quizzes and assessments with automatic grading.",
        icon: "CheckSquare",
      },
    ],
    faqs: [
      {
        question: "Do I need a Google Workspace account?",
        answer: "No, the integration works with any Google account.",
      },
      {
        question: "Can I use Google Forms quiz mode?",
        answer: "Yes, you can export quizzes with automatic grading enabled.",
      },
      {
        question: "Where are responses stored?",
        answer:
          "Responses are stored in Google Forms and can be exported to Google Sheets.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["google-classroom", "google-drive", "formative"],
  },
  {
    id: "15",
    name: "Turnitin",
    slug: "turnitin",
    category: "Assessment",
    description:
      "Submit student work to Turnitin for plagiarism detection directly from Zaza Draft.",
    logo: "/turnitin-logo.jpg",
    setupTime: "10 minutes",
    users: "380K+",
    rating: 4.6,
    overview:
      "The Turnitin integration allows you to submit student assignments for plagiarism checking and receive similarity reports directly within Zaza Draft.",
    benefits: [
      "One-click submission to Turnitin",
      "View similarity reports in Zaza Draft",
      "Batch submit multiple assignments",
      "Track submission status",
      "Support for Turnitin Feedback Studio",
    ],
    setupSteps: [
      {
        step: 1,
        title: "Obtain Turnitin API Key",
        description:
          "Contact your institution's Turnitin administrator to get API credentials.",
      },
      {
        step: 2,
        title: "Enter API Credentials",
        description:
          "Input your Turnitin API key and institution ID in Zaza Draft settings.",
      },
      {
        step: 3,
        title: "Configure Submission Settings",
        description:
          "Set up default submission preferences and similarity report options.",
      },
      {
        step: 4,
        title: "Test Submission",
        description:
          "Submit a test document to verify the integration works correctly.",
      },
    ],
    useCases: [
      {
        title: "Plagiarism Detection",
        description:
          "Submit student work to Turnitin for comprehensive plagiarism checking.",
        icon: "Search",
      },
      {
        title: "Originality Reports",
        description:
          "View detailed similarity reports and sources directly in Zaza Draft.",
        icon: "FileSearch",
      },
      {
        title: "Batch Processing",
        description:
          "Submit entire classes of assignments to Turnitin at once.",
        icon: "Layers",
      },
    ],
    faqs: [
      {
        question: "Do I need a Turnitin license?",
        answer:
          "Yes, your institution must have an active Turnitin license for this integration to work.",
      },
      {
        question: "How long do similarity reports take?",
        answer:
          "Most reports are ready within 15-30 minutes, depending on document length and Turnitin server load.",
      },
      {
        question: "Can students see their similarity scores?",
        answer:
          "Yes, you can configure whether students can view their similarity reports.",
      },
      {
        question: "Is student data secure?",
        answer:
          "Yes, all submissions are encrypted and Turnitin maintains strict data privacy standards.",
      },
    ],
    security: {
      encryption: true,
      ferpaCompliant: true,
      sso: true,
    },
    relatedIntegrations: ["canvas-lms", "google-classroom", "schoology"],
  },
];

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((integration) => integration.slug === slug);
}

export function getIntegrationsByCategory(category: string): Integration[] {
  return integrations.filter(
    (integration) => integration.category === category,
  );
}

export function getRelatedIntegrations(slug: string, limit = 3): Integration[] {
  const integration = getIntegrationBySlug(slug);
  if (!integration) return [];

  return integration.relatedIntegrations
    .map((relatedSlug) => getIntegrationBySlug(relatedSlug))
    .filter((int): int is Integration => int !== undefined)
    .slice(0, limit);
}
