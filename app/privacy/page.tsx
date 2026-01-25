export const metadata = {
  title: 'Privacy Policy - Umbi',
  description: 'Learn how we protect and handle your data.',
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Policy
          </h1>
          <p className="text-xl text-white opacity-90">
            Last Updated: January 25, 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 space-y-8" style={{ boxShadow: 'var(--shadow-soft)' }}>
            
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                1. Information We Collect
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Comments and feedback you provide on our articles</li>
                <li>Contact information when you reach out to us</li>
                <li>Usage data and analytics through cookies and similar technologies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                2. How We Use Your Information
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Send you our newsletter and updates about new content</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and content based on user behavior</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                3. Cookies and Tracking Technologies
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                4. Third-Party Services
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                We may use third-party services for analytics and advertising, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Google Analytics for website analytics</li>
                <li>Google AdSense for advertising</li>
                <li>Email service providers for newsletter distribution</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                5. Data Security
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                6. Your Rights
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Access, update, or delete your personal information</li>
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Object to processing of your personal data</li>
                <li>Request data portability</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                7. Contact Us
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                If you have any questions about this Privacy Policy, please contact us at privacy@umbi.com
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}