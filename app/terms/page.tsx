export const metadata = {
  title: 'Terms of Service - Umbi',
  description: 'Read our terms and conditions for using Umbi.',
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                By accessing and using Umbi, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                2. Use License
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                Permission is granted to temporarily access the materials on Umbi for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes</li>
                <li>Attempt to reverse engineer any software on Umbi</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                3. Disclaimer
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                The materials on Umbi are provided on an 'as is' basis. Umbi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                4. Content Accuracy
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                While we strive to provide accurate and up-to-date information, Umbi does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website. The information provided is for general informational purposes only and should not be considered as professional advice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                5. Financial Disclaimer
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                The financial information provided on Umbi is for educational purposes only and should not be considered as financial advice. Always consult with a qualified financial advisor before making investment decisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                6. Health Disclaimer
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                The health and wellness information on Umbi is for educational purposes only and is not intended as medical advice. Always consult with your healthcare provider before starting any fitness or nutrition program.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                7. Limitations
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                In no event shall Umbi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Umbi.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                8. Revisions
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                Umbi may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                9. Contact Information
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                If you have any questions about these Terms of Service, please contact us at legal@umbi.com
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}