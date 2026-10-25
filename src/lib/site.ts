// No custom domain is configured yet. Set NEXT_PUBLIC_SITE_URL once one exists;
// on Vercel the production deployment URL is picked up automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const site = {
  name: 'Mohamed Fayez',
  fullName: 'Mohamed Fayez Salama Ayesh',
  firstName: 'Mohamed',
  lastName: 'Fayez',
  handle: 'mohamed-riash',
  title: 'Front-End Developer',
  email: 'aboriash99@gmail.com',
  phone: '+20 106 946 9047',
  phoneHref: 'tel:+201069469047',
  location: 'North Sinai, Egypt',
  university: 'Arish University',
  faculty: 'Faculty of Computers and Information',
  timeZone: 'Africa/Cairo',
  timeZoneLabel: 'Cairo',
  url: siteUrl.replace(/\/$/, ''),
  tagline:
    'Front-End Developer and Computer Science student building responsive, interactive, and user-focused digital experiences.',
  roles: [
    'Front-End Developer',
    'Computer Science Student',
    'React & Tailwind CSS',
    'Flutter Mobile Apps',
  ],
  cv: {
    href: '/files/Mohamed_Fayez_CV.pdf',
    fileName: 'Mohamed_Fayez_CV.pdf',
  },
} as const;

export type SocialKey = 'github' | 'linkedin';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  github: { label: 'GitHub', href: 'https://github.com/mohamed-riash' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mo7med-fayez/' },
};

export const socialList: Array<{ label: string; href: string }> = [
  socials.linkedin,
  socials.github,
];

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
