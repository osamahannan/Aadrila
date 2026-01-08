// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/', sectionId: 'home' },
  { name: 'Industries', path: '/', sectionId: 'industries' },
  { name: 'Products', path: '/', sectionId: 'products' },
  { name: 'Blog', path: '/', sectionId: 'blog' },
  { name: 'Contact Us', path: '/', sectionId: 'contact' },
  { name: 'About Us', path: '/about', sectionId: null },
] as const

export type NavLink = (typeof NAV_LINKS)[number]

// Hero Section - Documents for carousel
export const HERO_DOCUMENTS = [
  { id: 0, alt: 'Invoice' },
  { id: 1, alt: 'Driver License' },
  { id: 2, alt: 'Document with chart' },
] as const

// Hero Section - Carousel Positions
export const CAROUSEL_POSITIONS = {
  desktop: {
    left: { x: -245, scale: 0.55, zIndex: 10, opacity: 1 },
    center: { x: 0, scale: 1.1, zIndex: 30, opacity: 1 },
    right: { x: 245, scale: 0.55, zIndex: 10, opacity: 1 },
  },
  mobile: {
    left: { x: -120, scale: 0.5, zIndex: 10, opacity: 0.8 },
    center: { x: 0, scale: 1, zIndex: 30, opacity: 1 },
    right: { x: 120, scale: 0.5, zIndex: 10, opacity: 0.8 },
  },
} as const

// Industries Section Data
export const INDUSTRIES = [
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Automate claims processing with accurate document validation.',
    initialPosition: { x: 400, y: -50, opacity: 0 },
    finalPosition: { x: 0, y: 180 },
    delay: 0.6,
  },
  {
    id: 'lending',
    title: 'Lending',
    description: 'Ensure faster loan approvals with fraud detection and instant verification.',
    initialPosition: { x: 200, y: -150, opacity: 0 },
    finalPosition: { x: 0, y: 0 },
    delay: 0.3,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Streamline patient record management and ensure compliance with HIPAA standards.',
    initialPosition: { x: 200, y: -350, opacity: 0 },
    finalPosition: { x: 0, y: -180 },
    delay: 0,
  },
] as const

export type Industry = (typeof INDUSTRIES)[number]

// Products Section Data
export const PRODUCTS = [
  {
    id: 'docsim',
    name: 'DocSim',
    title: 'AI-Powered Document Similarity Engine',
    features: [
      'Detects near-duplicates and tampered documents.',
      'Identifies fraudulent patterns across large repositories.',
      'Multi-language support for global adaptability.',
    ],
    benefits: [
      'Save 30% time on manual checks.',
      'Reduce document fraud by up to 40%.',
    ],
    buttonColor: '#3E6EB4',
    imageOnRight: true,
  },
  {
    id: 'docpilot',
    name: 'DocPilot',
    title: 'Streamline Document Workflows with Automation',
    features: [
      'Automates document collection, routing, and task assignments.',
      'Real-time tracking with advanced dashboards.',
      'Seamless integration with enterprise systems via APIs.',
    ],
    benefits: [
      'Reduce turnaround times by 50%.',
      'Improve operational efficiency with minimal manual effort.',
    ],
    buttonColor: '#3E6EB4',
    imageOnRight: false,
  },
  {
    id: 'doxtract',
    name: 'Doxtract',
    title: 'Extract, Validate, and Process Documents with Ease',
    features: [
      'OCR and NLP-based data extraction.',
      'Handles unstructured documents across industries.',
      'Validates fields using external data sources.',
    ],
    benefits: [
      'Process 10,000+ documents in minutes.',
      'Achieve 99% data accuracy with AI-driven validation.',
    ],
    buttonColor: '#3E6EB4',
    imageOnRight: true,
  },
] as const

export type Product = (typeof PRODUCTS)[number]

// Blog Section Data
export const BLOG_POSTS = [
  {
    id: 1,
    title: 'How AI is Revolutionizing Document Management for Enterprises',
    date: '24 July, 2023',
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    id: 2,
    title: 'Top 5 Fraud Prevention Strategies for Financial Institutions',
    date: '24 July, 2023',
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    id: 3,
    title: 'The Future of OCR: From Basic Extraction to AI-Driven Intelligence',
    date: '24 July, 2023',
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
] as const

export type BlogPost = (typeof BLOG_POSTS)[number]

// Contact Section - Office Locations
export const OFFICE_LOCATIONS = [
  {
    id: 'us',
    title: 'U.S. Office',
    company: 'Aadrila Technologies INC,',
    address: '8 The Green, Ste R, in the City of Dover County of Kent Zip Code 19901.',
  },
  {
    id: 'india',
    title: 'India Office',
    company: 'Aadrila Technologies Private Limited,',
    address: 'Unit 707, Lotus Trade Centre, Sahakar Nagar, New Link Road, Near D.N.Nagar, Andheri West, Mumbai, Maharashtra 400053.',
  },
] as const

export type OfficeLocation = (typeof OFFICE_LOCATIONS)[number]

// Footer Data
export const FOOTER_INFO = {
  copyright: '© 2025 by Aadrila Technologies Private Limited CIN U74999UP2017PTC094688',
  registeredAddress: {
    line1: 'Registered Address: B-1, 127/K, Sector- K Aliganj, Lucknow, Lucknow,',
    line2: 'Uttar Pradesh, India. 226024',
  },
} as const

// Team Section Data
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'MANSI SHUKLA',
    role: 'CEO FutureSphere',
    quote: "For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.",
  },
  {
    id: 2,
    name: 'MANSI SHUKLA',
    role: 'CEO FutureSphere',
    quote: "For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.",
  },
  {
    id: 3,
    name: 'MANSI SHUKLA',
    role: 'CEO FutureSphere',
    quote: "For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.",
  },
] as const

export type TeamMember = (typeof TEAM_MEMBERS)[number]

// About Section Data
export const ABOUT_CONTENT = {
  hero: {
    title: 'About Us',
    subtitle: 'Meet the Minds Shaping Document Automation.',
  },
  vision: {
    title: 'Our Vision',
    description: 'To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust.',
  },
  mission: {
    title: 'Our Mission',
    description: 'To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust.',
  },
} as const

// Contact Form Fields (for form validation/placeholders)
export const CONTACT_FORM_FIELDS = {
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone Number',
  company: 'Company Name',
  inquiryType: 'Inquiry Type',
  message: 'Message',
  submitButton: 'Send Inquiry',
} as const

// Section Headers
export const SECTION_HEADERS = {
  industries: {
    subtitle: 'sector wise',
    title: 'Industries We Serve',
  },
  products: {
    subtitle: 'features and benefits.',
    title: 'Our Products',
  },
  blog: {
    title: 'Blogs',
  },
  contact: {
    title: 'Contact Us',
    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
  },
  team: {
    title: 'Meet Our',
    titleHighlight: 'Teams',
  },
} as const
