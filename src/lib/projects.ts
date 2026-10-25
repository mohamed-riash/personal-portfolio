export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string;
  tech: string[];
  description: string;
  overview: string;
  architecture: string;
  implementation: string;
  stats: ProjectStat[];
  accent: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  /** Alt text for the cover image; defaults to the project title. */
  coverAlt?: string;
  /** Short caption shown under the cover on the details page (e.g. to flag a concept mockup). */
  imageNote?: string;
  /** How the details-page cover fills its frame; 'contain' suits portrait images. */
  imageFit?: 'cover' | 'contain';
  github: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'sinai-guide',
    title: 'Sinai Guide',
    type: 'Web Application · Local Discovery Platform',
    role: 'Independent Project',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'React Router', 'React-Leaflet', 'Framer Motion', 'PWA'],
    description:
      'An Arabic-first discovery platform for exploring places and local businesses across North Sinai, with interactive maps, reviews, favorites, ordering, bookings, and role-based dashboards.',
    overview:
      'Sinai Guide is a digital guide to the restaurants, cafes, beaches, and hotels of Al-Arish and the other cities of North Sinai. Visitors can browse places by city and category, open detailed place pages with maps and reviews, save favorites, and read a local blog, all through a responsive, right-to-left interface with light and dark themes.',
    architecture:
      'Built as a React single-page application with React Router and a set of React Context providers for authentication, the selected city, the shopping cart, theme, toasts, and confirmation dialogs. Data access is organized into service modules (places, reviews, favorites, orders, bookings, notifications, blog) that sit on top of a safe localStorage wrapper. This is a front-end prototype: accounts, orders, and bookings are simulated in the browser rather than stored on a server.',
    implementation:
      'The app serves three role-based experiences. Visitors browse, review, order, and book; business owners get a dashboard to manage their profile, menu, orders, bookings, reviews, and simple analytics; and an administrator dashboard oversees the platform. Interactive maps are rendered with Leaflet and React-Leaflet, including a location picker for business onboarding. A web app manifest and a service worker that caches the app shell make it installable as a Progressive Web App, and Framer Motion drives the page and component transitions.',
    stats: [
      { value: '3', label: 'Role-based interfaces' },
      { value: 'PWA', label: 'Installable web app' },
      { value: 'RTL', label: 'Arabic-first interface' },
    ],
    accent: '#34D399',
    myRole: [
      'Designed and built the full front end independently using React, Tailwind CSS, and React Router.',
      'Implemented place discovery by city and category, place detail pages, favorites, and a review system.',
      'Integrated interactive Leaflet maps for browsing places and picking business locations.',
      'Built cart, ordering, and booking flows along with a business-owner dashboard for menus, orders, bookings, and reviews.',
      'Organized client-side data into service modules over a localStorage layer, keeping the UI ready for a future backend.',
      'Added PWA support with a web app manifest, an app-shell service worker, and an install prompt.',
    ],
    images: ['/Projects/sinai-guide/cover.webp'],
    hoverImage: '/Projects/sinai-guide/cover.webp',
    coverAlt: 'Sinai Guide home page with Arabic hero heading and place search bar',
    github: 'https://github.com/mohamed-riash/Sinai-Guide',
    liveUrl: 'https://sinai-guide.vercel.app/',
  },
  {
    id: 2,
    slug: 'wesal',
    title: 'Wesal',
    type: 'Web Application · Islamic Content Platform',
    role: 'Independent Project',
    tech: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Local Storage', 'Public APIs'],
    description:
      'An interactive Islamic web application for reading the Quran with tafsir, listening to recitations, using Azkar counters, exploring Hadith, and saving bookmarks.',
    overview:
      'Wesal is an Arabic, right-to-left web application that brings together the Holy Quran in Uthmani script with Al-Muyassar tafsir, recitations from several well-known reciters, interactive daily Azkar, and a collection of Hadith, all in a calm interface with light and dark themes.',
    architecture:
      'Built with React and Vite, using React Router for the Home, Quran, Hadith, Azkar, Audio, and Bookmarks pages. Quran text and tafsir are fetched from the public Al Quran Cloud API, and audio is streamed from public mp3quran recitation servers. Shared state lives in React Context providers for audio playback, bookmarks, theme, and user preferences, which persist to localStorage so they survive page reloads.',
    implementation:
      'A persistent audio player keeps a recitation playing while the user moves between pages. Azkar pages provide tap-to-count counters with progress saved locally, and the Hadith section supports category filtering, search, pagination, and detail views. A global search modal looks up Quran verses and Azkar from anywhere in the app, while Framer Motion adds smooth transitions throughout the interface.',
    stats: [
      { value: 'API', label: 'Al Quran Cloud integration' },
      { value: 'Audio', label: 'Persistent recitation player' },
      { value: 'RTL', label: 'Arabic interface' },
    ],
    accent: '#34D399',
    myRole: [
      'Built the application independently with React, Vite, Tailwind CSS, and React Router.',
      'Integrated the Al Quran Cloud API to display surahs in Uthmani script alongside Al-Muyassar tafsir.',
      'Implemented a persistent audio player for streaming recitations from multiple reciters.',
      'Built interactive Azkar counters and a Hadith explorer with categories, search, and pagination.',
      'Added bookmarks, theme, and user preferences persisted in localStorage through React Context.',
      'Created a global search modal and responsive navigation with a mobile bottom bar.',
    ],
    images: ['/Projects/wesal/cover.webp'],
    hoverImage: '/Projects/wesal/cover.webp',
    coverAlt: 'Wesal home page in dark theme with Arabic heading and Quran and Azkar buttons',
    github: 'https://github.com/mohamed-riash/Wesal',
    liveUrl: 'https://wesal-rho.vercel.app/',
  },
  {
    id: 3,
    slug: 'playstation-management-system',
    title: 'PlayStation Management System',
    type: 'Web Application · Gaming Center Management',
    role: 'Independent Project',
    tech: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'React Context', 'Local Storage', 'Web Audio API'],
    description:
      'A management interface for PlayStation gaming centers covering device sessions and timers, billing, a cafe point of sale, inventory, invoices, shift tracking, expenses, and reports.',
    overview:
      'An Arabic dashboard designed around the day-to-day work of a PlayStation gaming lounge. Staff can start and track sessions on each device, take cafe orders, check out customers with an itemized invoice, manage stock, and close a shift with a summary report, all from a single responsive interface.',
    architecture:
      'Built with React and Vite, with application state centralized in a React Context provider. Devices, active sessions, inventory, invoices, expenses, and shift history are persisted in the browser through a custom useLocalStorage hook, so the system keeps working after a page refresh without a server. Data is stored per browser on the device running the app rather than in a central database.',
    implementation:
      'Each device card runs a live session timer with single and multiplayer pricing, and sessions can be transferred between devices. Checkout combines session time with cafe orders into a printable invoice receipt, and a walk-in point-of-sale screen handles cafe-only sales. The inventory view supports adding and restocking products, while the reports view summarizes revenue and expenses. Cashier switching uses a PIN modal, shift closure produces a Z-report, and interface feedback sounds are generated with the Web Audio API.',
    stats: [
      { value: 'Live', label: 'Session timers & billing' },
      { value: 'POS', label: 'Cafe point of sale' },
      { value: 'Z-Report', label: 'Shift closure summary' },
    ],
    accent: '#34D399',
    myRole: [
      'Built the full interface independently with React, Vite, and Tailwind CSS.',
      'Implemented device session management with live timers, pricing modes, and session transfers.',
      'Built checkout and invoice receipts that combine session time with cafe orders.',
      'Created a walk-in point of sale and inventory management with restocking.',
      'Added shift tracking with cashier PIN switching, shift closure reports, expenses, and revenue reports.',
      'Persisted all operational data in the browser using a custom useLocalStorage hook and React Context.',
    ],
    images: ['/Projects/playstation-management-system/cover.webp'],
    hoverImage: '/Projects/playstation-management-system/cover.webp',
    coverAlt: 'PlayStation Management System devices and sessions dashboard showing available consoles',
    github: 'https://github.com/mohamed-riash/playstation-management-system',
    liveUrl: 'https://playstation-management-system-mfr.vercel.app/',
  },
  {
    id: 4,
    slug: 'personal-expense-tracker',
    title: 'Personal Expense Tracker',
    type: 'Mobile Application · Flutter',
    role: 'Independent Project',
    tech: ['Flutter', 'Dart', 'BLoC', 'Firebase Authentication', 'Cloud Firestore', 'fl_chart', 'Dio'],
    description:
      'A Flutter mobile app for tracking personal income and expenses, with Firebase authentication, category statistics, recurring subscriptions, and a currency converter.',
    overview:
      'A mobile application for managing personal finances. Users sign in, record income and expense transactions, review their balance and history, see where their money goes through category charts, keep track of recurring subscriptions, and convert between currencies using live exchange rates.',
    architecture:
      'Built with Flutter and Dart using the BLoC pattern (Cubits) to manage transaction and subscription state. Users authenticate with Firebase Authentication, and each user’s transactions and subscriptions are stored in their own Cloud Firestore collections and streamed to the UI in real time. Exchange rates are fetched over HTTP with Dio.',
    implementation:
      'The home screen shows balance, income, and expense summaries with a filterable transaction list, and transactions can be added, edited, or deleted. The statistics screen renders category breakdowns as pie charts with fl_chart. Subscriptions can be created, paused, and listed by upcoming due date, and due subscriptions are processed into transactions when the app starts. A currency screen converts amounts using live rates.',
    stats: [
      { value: 'BLoC', label: 'State management' },
      { value: 'Firebase', label: 'Auth & Firestore' },
      { value: 'Charts', label: 'Category statistics' },
    ],
    accent: '#34D399',
    myRole: [
      'Built the mobile app independently with Flutter and Dart.',
      'Implemented email and password authentication with Firebase Authentication.',
      'Managed transaction and subscription state with BLoC Cubits backed by Cloud Firestore streams.',
      'Built add, edit, and delete flows for income and expense transactions with filtering.',
      'Created category statistics with fl_chart pie charts.',
      'Added recurring subscription tracking and a currency converter using live exchange rates via Dio.',
    ],
    images: ['/Projects/personal-expense-tracker/cover.webp'],
    hoverImage: '/Projects/personal-expense-tracker/cover.webp',
    coverAlt: 'Concept UI mockup of the Personal Expense Tracker home screen on a phone (not an app screenshot)',
    imageNote: 'Concept UI mockup, not a screenshot of the app',
    imageFit: 'contain',
    github: 'https://github.com/mohamed-riash/personal_expense_tracker',
    liveUrl: '',
  },
];
export function getAllProjects(): Project[] {
  return projects;
}
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: projects[(idx - 1 + projects.length) % projects.length],
    next: projects[(idx + 1) % projects.length],
  };
}
