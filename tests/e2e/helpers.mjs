export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

// Expected public content. Kept independent of src/lib/projects.ts so a wrong edit there fails the tests.
export const PROJECTS = [
  {
    slug: 'sinai-guide',
    title: 'Sinai Guide',
    liveUrl: 'https://sinai-guide.vercel.app/',
    github: 'https://github.com/mohamed-riash/Sinai-Guide',
  },
  {
    slug: 'wesal',
    title: 'Wesal',
    liveUrl: 'https://wesal-rho.vercel.app/',
    github: 'https://github.com/mohamed-riash/Wesal',
  },
  {
    slug: 'playstation-management-system',
    title: 'PlayStation Management System',
    liveUrl: 'https://playstation-management-system-mfr.vercel.app/',
    github: 'https://github.com/mohamed-riash/playstation-management-system',
  },
  {
    slug: 'personal-expense-tracker',
    title: 'Personal Expense Tracker',
    liveUrl: null, // Flutter app: no web demo and no APK download.
    github: 'https://github.com/mohamed-riash/personal_expense_tracker',
  },
];

export const CV_PATH = '/files/Mohamed_Fayez_CV.pdf';

export const getPage = async (pathname) => {
  const res = await fetch(BASE_URL + pathname);
  return { res, html: await res.text() };
};

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"');

// Same-origin image and icon URLs referenced by a page: <img src/srcset>, icons, and og/twitter images.
export const localAssetUrls = (html) => {
  const urls = new Set();
  for (const [, src] of html.matchAll(/<img[^>]*?\ssrc="([^"]+)"/g)) urls.add(decode(src));
  for (const [, set] of html.matchAll(/\ssrcSet="([^"]+)"|\ssrcset="([^"]+)"/g)) {
    if (!set) continue;
    for (const candidate of decode(set).split(',')) urls.add(candidate.trim().split(/\s+/)[0]);
  }
  for (const [, href] of html.matchAll(/<link[^>]*rel="(?:icon|apple-touch-icon)"[^>]*href="([^"]+)"/g)) urls.add(decode(href));
  for (const [, content] of html.matchAll(/<meta[^>]*(?:property|name)="(?:og:image|twitter:image)"[^>]*content="([^"]+)"/g)) {
    urls.add(new URL(decode(content)).pathname);
  }
  return [...urls].filter((u) => u.startsWith('/'));
};

export const postContact = (body, ip) =>
  fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    // A distinct client IP per test keeps the per-IP rate limit from affecting results.
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
