import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | Umbi',
  description: 'The page you are looking for could not be found. Browse our latest articles on finance, tech, and wellness.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-bold" style={{ color: 'var(--color-neutral-200)', fontFamily: 'var(--font-display)' }}>
            404
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
          Page Not Found
        </h1>
        <p className="text-lg mb-10" style={{ color: 'var(--color-neutral-600)' }}>
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try exploring our content categories below.
        </p>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <Link href="/finance" className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold mb-3 mx-auto">
              $
            </div>
            <h3 className="font-bold mb-1 group-hover:text-emerald-600 transition-colors" style={{ color: 'var(--color-neutral-900)' }}>
              Finance
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
              Budgeting, investing &amp; saving
            </p>
          </Link>

          <Link href="/tech" className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold mb-3 mx-auto">
              /
            </div>
            <h3 className="font-bold mb-1 group-hover:text-blue-600 transition-colors" style={{ color: 'var(--color-neutral-900)' }}>
              Tech
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
              AI tools, productivity &amp; guides
            </p>
          </Link>

          <Link href="/wellness" className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold mb-3 mx-auto">
              +
            </div>
            <h3 className="font-bold mb-1 group-hover:text-purple-600 transition-colors" style={{ color: 'var(--color-neutral-900)' }}>
              Wellness
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
              Fitness, nutrition &amp; sleep
            </p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--color-primary-600)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-semibold border transition-colors"
            style={{ borderColor: 'var(--color-neutral-300)', color: 'var(--color-neutral-700)' }}
          >
            Report an Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
