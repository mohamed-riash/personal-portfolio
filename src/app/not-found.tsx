import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-light px-6 text-center">
      <span className="font-mono text-accent text-sm uppercase tracking-widest mb-4">404</span>
      <h1 className="text-4xl sm:text-6xl font-display font-medium tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-soft max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-accent text-ink font-medium hover:bg-accent-light transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
