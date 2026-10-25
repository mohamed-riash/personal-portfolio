import { Metadata } from 'next';
import { site } from '@/lib/site';

const defaultTitle = `${site.name} - ${site.title}`;
const description =
  'Portfolio of Mohamed Fayez, a Front-End Developer and Computer Science student at Arish University building responsive, interactive web applications with React and Tailwind CSS, and mobile apps with Flutter.';

export const siteMetadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    'Mohamed Fayez',
    'Mohamed Fayez Salama Ayesh',
    'Front-End Developer',
    'Web Developer',
    'React',
    'JavaScript',
    'Tailwind CSS',
    'Flutter',
    'Arish University',
    'Egypt',
    'Portfolio',
  ],
  authors: [
    {
      name: site.fullName,
      url: 'https://github.com/mohamed-riash',
    },
  ],
  creator: site.name,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: defaultTitle,
    description,
    url: site.url,
    siteName: `${site.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
