import { FiUser, FiTarget, FiMail, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

export const metadata = {
  title: 'About Umbi - Our Mission & Story',
  description: 'Learn more about Umbi, a platform dedicated to helping you master finance, technology, and wellness.',
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      
      {/* 1. 히어로 섹션 */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="container-custom text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full text-indigo-700 mb-6">
            <FiUser size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            About Umbi
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-neutral-600)' }}>
            We bridge the gap between complex information and your daily life. 
            Our mission is to provide clear, actionable insights in Finance, Tech, and Wellness.
          </p>
        </div>
      </section>

      {/* 2. 미션 섹션 */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                <FiTarget className="text-indigo-600" /> Our Mission
              </h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                In a world overflowing with information, clarity is power. Umbi was founded with a simple goal: to curate high-quality knowledge that empowers you to make better decisions.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Whether you&apos;re looking to grow your wealth, adopt new technologies, or improve your health, we are here to guide you every step of the way.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-800 text-lg mb-2">💰 Finance</h3>
                <p className="text-emerald-700">Smart strategies for saving, investing, and achieving financial freedom.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-800 text-lg mb-2">💻 Tech</h3>
                <p className="text-blue-700">Reviews and guides on the latest tools to boost your productivity.</p>
              </div>
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                <h3 className="font-bold text-rose-800 text-lg mb-2">❤️ Wellness</h3>
                <p className="text-rose-700">Evidence-based advice for a healthier body and a sharper mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 하단 컨택 섹션 */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <FiTrendingUp className="mx-auto text-4xl mb-6 text-indigo-400" />
          <h2 className="text-3xl font-bold mb-4">Ready to upgrade your life?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Join thousands of readers who trust Umbi for their daily dose of insight.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="px-8 py-3 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
              Read Articles
            </Link>
            <a href="mailto:contact@umbi.com" className="px-8 py-3 border border-neutral-700 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2">
              <FiMail /> Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}