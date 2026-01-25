import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 md:py-32" style={{ background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-neutral-50))' }}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            Welcome to <span style={{ color: 'var(--color-primary-600)' }}>Umbi</span>
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--color-neutral-600)' }}>
            Your go-to source for insightful articles on personal finance, technology & productivity, and health & wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/finance" className="btn-primary inline-block">
              Explore Finance
            </Link>
            <Link href="/tech" className="btn-primary inline-block">
              Explore Tech
            </Link>
            <Link href="/wellness" className="btn-primary inline-block">
              Explore Wellness
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}