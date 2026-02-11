import { FiTarget, FiMail, FiTrendingUp, FiAward, FiBookOpen, FiShield, FiUsers, FiDollarSign, FiCpu, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Umbi - Our Mission, Team & Expertise',
  description: 'Umbi is a trusted resource for personal finance, technology, and wellness insights. Learn about our mission, editorial standards, and the expertise behind our content.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/about',
  },
  openGraph: {
    title: 'About Umbi - Our Mission, Team & Expertise',
    description: 'Umbi is a trusted resource for personal finance, technology, and wellness insights.',
    url: 'https://umbi-blog.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>

      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="container-custom text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full text-indigo-700 mb-6">
            <FiBookOpen size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            About Umbi
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--color-neutral-600)' }}>
            We believe everyone deserves access to expert-level guidance in personal finance,
            technology, and wellness. Umbi transforms complex topics into clear, actionable insights
            that help you make better decisions every day.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-700">
                  <FiTarget size={24} />
                </div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Our Mission
                </h2>
              </div>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                In a world overflowing with information, clarity is power. Umbi was founded with a singular
                purpose: <strong>to bridge the gap between expert knowledge and everyday decisions</strong>.
              </p>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Too often, critical information about managing money, leveraging technology, and maintaining
                health is locked behind jargon, paywalls, or conflicting advice. We cut through the noise
                to deliver content that is research-backed, practical, and free for everyone.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Every article we publish goes through a rigorous editorial process: research, writing,
                fact-checking, and review. We cite our sources, update our content regularly, and correct
                errors transparently.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-700">
                  <FiTrendingUp size={24} />
                </div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Our Vision
                </h2>
              </div>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                We envision a world where everyone has the knowledge to build financial security, harness
                technology effectively, and maintain optimal health — regardless of their background or
                starting point.
              </p>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                By 2027, our goal is to become one of the most trusted independent resources for
                actionable life optimization content, serving readers across the globe with guides, tools,
                and AI-powered advisors.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We measure our success not by pageviews, but by the real-world impact our content
                has on our readers&apos; lives — whether that&apos;s helping someone create their first budget,
                set up a productive home office, or start a morning workout routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover - Categories */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              What We Cover
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-neutral-600)' }}>
              Three pillars of a well-lived life, explored in depth by specialists in each field.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700 inline-block mb-4">
                <FiDollarSign size={24} />
              </div>
              <h3 className="font-bold text-emerald-900 text-xl mb-3">Personal Finance</h3>
              <p className="text-emerald-800 mb-4 leading-relaxed">
                From building your first emergency fund to advanced investment strategies, our finance
                content is grounded in data from the Federal Reserve, Bureau of Labor Statistics, and
                leading financial institutions.
              </p>
              <ul className="text-emerald-700 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Budgeting methods & tools</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Investment guides for all levels</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Debt management strategies</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Retirement & tax planning</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> AI-powered financial advisor tool</li>
              </ul>
              <Link href="/finance" className="inline-block mt-6 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors">
                Explore Finance &rarr;
              </Link>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-700 inline-block mb-4">
                <FiCpu size={24} />
              </div>
              <h3 className="font-bold text-blue-900 text-xl mb-3">Tech & Productivity</h3>
              <p className="text-blue-800 mb-4 leading-relaxed">
                Our technology coverage goes beyond surface-level reviews. We test tools hands-on,
                compare alternatives objectively, and provide setup guides that save you hours of
                trial and error.
              </p>
              <ul className="text-blue-700 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> AI tools & automation guides</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> Productivity app deep-dives</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> Remote work optimization</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> Cybersecurity essentials</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> AI-powered tech advisor tool</li>
              </ul>
              <Link href="/tech" className="inline-block mt-6 text-blue-700 font-semibold hover:text-blue-900 transition-colors">
                Explore Tech &rarr;
              </Link>
            </div>

            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-700 inline-block mb-4">
                <FiHeart size={24} />
              </div>
              <h3 className="font-bold text-purple-900 text-xl mb-3">Health & Wellness</h3>
              <p className="text-purple-800 mb-4 leading-relaxed">
                Every wellness recommendation we publish is backed by peer-reviewed research from
                journals like The Lancet, JAMA, and the British Journal of Sports Medicine. No fads,
                no pseudoscience — just evidence-based guidance.
              </p>
              <ul className="text-purple-700 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Exercise routines for all levels</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Nutrition & meal planning</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Sleep science & optimization</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Stress management & mindfulness</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> AI-powered wellness coach tool</li>
              </ul>
              <Link href="/wellness" className="inline-block mt-6 text-purple-700 font-semibold hover:text-purple-900 transition-colors">
                Explore Wellness &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Standards - E-E-A-T */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Our Editorial Standards
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-neutral-600)' }}>
              We hold ourselves to the highest standards of accuracy, transparency, and reader trust.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <div className="p-3 bg-amber-100 rounded-xl text-amber-700 inline-block mb-4">
                <FiUsers size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Experience</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Our content is informed by real-world application. We test every tool we recommend,
                follow every strategy we suggest, and share genuine results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-700 inline-block mb-4">
                <FiAward size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Expertise</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Articles are written and reviewed by professionals with relevant qualifications.
                Finance content is reviewed by certified financial planners, wellness content by
                healthcare professionals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700 inline-block mb-4">
                <FiTrendingUp size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Authoritativeness</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We cite reputable sources including government agencies, peer-reviewed journals,
                and established institutions. Every statistic is traceable to its origin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-700 inline-block mb-4">
                <FiShield size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Trustworthiness</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We clearly disclose affiliate relationships, correct errors promptly, and never
                let advertising influence our editorial recommendations. Reader trust is our
                most valuable asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              Meet Our Contributors
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-neutral-600)' }}>
              Our content is crafted by experienced professionals passionate about sharing knowledge.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Personal Finance Editor',
                bio: 'Certified Financial Planner (CFP) with 8+ years of experience in wealth management and financial education. Sarah specializes in budgeting strategies and savings optimization.',
                color: 'emerald',
              },
              {
                name: 'Michael Chen',
                role: 'Investment Specialist',
                bio: 'Former equity analyst with a background in portfolio management. Michael holds a CFA charter and makes complex investment concepts accessible to beginners.',
                color: 'emerald',
              },
              {
                name: 'Alex Thompson',
                role: 'Technology Editor',
                bio: 'Software engineer turned tech journalist with 10+ years in the industry. Alex tests every tool and product before recommending it to readers.',
                color: 'blue',
              },
              {
                name: 'Ryan Kim',
                role: 'Productivity Specialist',
                bio: 'Digital workflow consultant who has helped 50+ companies optimize their remote work operations. Ryan brings hands-on experience to every productivity guide.',
                color: 'blue',
              },
              {
                name: 'Dr. Rachel Kim',
                role: 'Wellness Editor',
                bio: 'Board-certified sleep medicine specialist and public health researcher. Dr. Kim ensures all wellness content meets clinical accuracy standards.',
                color: 'purple',
              },
              {
                name: 'James Wilson',
                role: 'Fitness & Nutrition Writer',
                bio: 'NASM-certified personal trainer and sports nutrition specialist with 6+ years of coaching experience. James creates evidence-based fitness programs for all levels.',
                color: 'purple',
              },
            ].map((member) => (
              <div key={member.name} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                <div className={`w-14 h-14 rounded-full bg-${member.color}-100 flex items-center justify-center text-${member.color}-700 font-bold text-xl mb-4`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className={`text-sm font-medium text-${member.color}-600 mb-3`}>{member.role}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers / Social Proof */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">25+</div>
              <p className="text-neutral-600 text-sm">In-Depth Articles</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">3</div>
              <p className="text-neutral-600 text-sm">Expert Categories</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">5</div>
              <p className="text-neutral-600 text-sm">Interactive Tools</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">3</div>
              <p className="text-neutral-600 text-sm">AI-Powered Advisors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <FiTrendingUp className="mx-auto text-4xl mb-6 text-indigo-400" />
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Explore our latest articles and free tools designed to help you build a better financial future,
            work smarter with technology, and live a healthier life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="px-8 py-3 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
              Read Latest Articles
            </Link>
            <Link href="/contact" className="px-8 py-3 border border-neutral-700 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
              <FiMail /> Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
