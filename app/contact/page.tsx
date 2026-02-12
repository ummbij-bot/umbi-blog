'use client';

import { useState, FormEvent } from 'react';
import { FiMail, FiMessageSquare, FiSend, FiClock, FiEdit3, FiAlertCircle, FiCheckCircle, FiGithub } from 'react-icons/fi';
import Link from 'next/link';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    // Simulate form submission (replace with real API endpoint like Formspree, EmailJS, etc.)
    try {
      // Using mailto as fallback — in production, connect to an API route or service
      const mailtoLink = `mailto:ummbij@gmail.com?subject=${encodeURIComponent(
        `[Umbi Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.open(mailtoLink, '_blank');
      setFormState('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)' }}>
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4 text-indigo-200">
            <FiMail size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Contact Us
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl">
            Have a question, suggestion, or business inquiry? We&apos;d love to hear from you.
            Our team typically responds within 24–48 hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-neutral-100">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Send Us a Message
                </h2>
                <p className="text-neutral-500 mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {formState === 'sent' && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                    <FiCheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-emerald-800">Message ready to send!</p>
                      <p className="text-emerald-700 text-sm">Your email client should have opened with the message pre-filled. If it didn&apos;t, please email us directly at ummbij@gmail.com.</p>
                    </div>
                  </div>
                )}

                {formState === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <FiAlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-red-800">Something went wrong.</p>
                      <p className="text-red-700 text-sm">Please try again or email us directly at ummbij@gmail.com.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2 text-neutral-800">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-indigo-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2 text-neutral-800">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-indigo-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-neutral-800">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-indigo-500 focus:outline-none transition-colors bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option value="General Question">General Question</option>
                      <option value="Content Feedback">Content Feedback</option>
                      <option value="Error Report">Error Report / Correction</option>
                      <option value="Business Inquiry">Business Inquiry / Partnership</option>
                      <option value="Guest Post">Guest Post / Contribution</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-neutral-800">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-indigo-500 focus:outline-none transition-colors resize-y"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === 'sending' ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <FiSend size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">

              {/* Direct Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FiMail className="text-indigo-600" /> Direct Contact
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">General Inquiries</p>
                    <a href="mailto:ummbij@gmail.com" className="text-indigo-600 hover:text-indigo-700 text-sm">
                      ummbij@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">Business & Partnerships</p>
                    <a href="mailto:ummbij@gmail.com" className="text-indigo-600 hover:text-indigo-700 text-sm">
                      ummbij@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FiClock className="text-indigo-600" /> Response Time
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">General questions</span>
                    <span className="font-semibold text-neutral-800">24–48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Error reports</span>
                    <span className="font-semibold text-neutral-800">12–24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Business inquiries</span>
                    <span className="font-semibold text-neutral-800">2–3 business days</span>
                  </div>
                </div>
              </div>

              {/* Contribute */}
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-indigo-900">
                  <FiEdit3 className="text-indigo-600" /> Write for Us
                </h3>
                <p className="text-indigo-800 text-sm mb-3 leading-relaxed">
                  Are you an expert in finance, technology, or wellness? We welcome guest
                  contributions from qualified professionals.
                </p>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  <strong>Requirements:</strong>
                </p>
                <ul className="text-indigo-700 text-sm mt-2 space-y-1">
                  <li>- Original, unpublished content</li>
                  <li>- Minimum 1,500 words</li>
                  <li>- Data-backed with cited sources</li>
                  <li>- Relevant professional experience</li>
                </ul>
                <p className="text-indigo-700 text-sm mt-3">
                  Send your pitch to <a href="mailto:ummbij@gmail.com" className="font-semibold underline">ummbij@gmail.com</a> with
                  subject line &quot;Guest Post Pitch.&quot;
                </p>
              </div>

              {/* Feedback */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <FiMessageSquare className="text-indigo-600" /> Community
                </h3>
                <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                  Join the conversation on our blog posts using the comments section powered by
                  GitHub Discussions, or connect with us on social media.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/ummbij-bot/umbi-blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg text-neutral-700 text-sm font-medium hover:bg-neutral-200 transition-colors"
                  >
                    <FiGithub size={16} /> GitHub
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is all the content on Umbi free?',
                a: 'Yes. All articles, guides, and interactive tools on Umbi are completely free. We are supported by advertising, which allows us to keep our content accessible to everyone.',
              },
              {
                q: 'How can I report an error or outdated information?',
                a: 'We take accuracy seriously. If you spot an error, please use the contact form above with the subject "Error Report" and include the article URL and a description of the issue. We typically review and correct errors within 12–24 hours.',
              },
              {
                q: 'Can I republish or translate your content?',
                a: 'Our content is protected by copyright. However, you may quote short excerpts (up to 200 words) with proper attribution and a link back to the original article. For full republishing or translation requests, please contact us.',
              },
              {
                q: 'Do you offer sponsored content or paid placements?',
                a: 'We occasionally accept sponsored content, but it must meet our editorial standards and will always be clearly labeled as sponsored. We never allow sponsors to influence our independent reviews or recommendations. Contact us for our media kit.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                <h3 className="font-bold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-500 text-sm">
              Can&apos;t find what you&apos;re looking for? Check our{' '}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Terms of Service
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
