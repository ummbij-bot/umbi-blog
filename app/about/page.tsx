export const metadata = {
  title: 'About Us - Umbi',
  description: 'Learn more about Umbi and our mission to provide insightful content.',
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            About Umbi
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Your trusted source for insights on finance, technology, and wellness.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Our Mission
            </h2>
            <p className="text-lg mb-6" style={{ color: 'var(--color-neutral-700)' }}>
              At Umbi, we believe that everyone deserves access to high-quality, actionable information that can improve their lives. Our mission is to provide insightful, well-researched content across three key areas that matter most to modern professionals.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              What We Cover
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#10b981' }}>
                  Personal Finance
                </h3>
                <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                  We help you take control of your financial future with expert advice on budgeting, investing, saving, and building long-term wealth. Our finance content is designed to be accessible to beginners while providing valuable insights for experienced investors.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#3b82f6' }}>
                  Tech & Productivity
                </h3>
                <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                  Stay ahead of the curve with our coverage of the latest technology trends, tools, and productivity hacks. We review apps, share workflow optimization techniques, and help you leverage technology to work smarter, not harder.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#ef4444' }}>
                  Health & Wellness
                </h3>
                <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                  Achieve your best self with our evidence-based guides on fitness, nutrition, mental health, and lifestyle optimization. We believe that true success includes physical and mental well-being, not just financial prosperity.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Our Commitment
            </h2>
            <p className="text-lg mb-6" style={{ color: 'var(--color-neutral-700)' }}>
              Every article on Umbi is thoroughly researched and written with your best interests in mind. We're committed to providing accurate, up-to-date information that you can trust and apply to your own life.
            </p>
            <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
              Thank you for being part of the Umbi community. We're excited to be part of your journey toward financial freedom, professional excellence, and optimal health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}