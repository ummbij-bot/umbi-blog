export const metadata = {
  title: 'Contact Us - Umbi',
  description: 'Get in touch with the Umbi team.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Contact Us
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Have questions or suggestions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                  style={{ borderColor: 'var(--color-neutral-200)' }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                  style={{ borderColor: 'var(--color-neutral-200)' }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                  style={{ borderColor: 'var(--color-neutral-200)' }}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                  style={{ borderColor: 'var(--color-neutral-200)' }}
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-12" style={{ borderTop: '1px solid var(--color-neutral-200)' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                Other Ways to Reach Us
              </h3>
              <div className="space-y-4">
                <p style={{ color: 'var(--color-neutral-700)' }}>
                  <strong>Email:</strong> contact@umbi.com
                </p>
                <p style={{ color: 'var(--color-neutral-700)' }}>
                  <strong>Business Inquiries:</strong> business@umbi.com
                </p>
                <p style={{ color: 'var(--color-neutral-700)' }}>
                  <strong>Response Time:</strong> We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}