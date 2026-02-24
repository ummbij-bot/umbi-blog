import { FiMail, FiBookOpen, FiShield, FiDollarSign, FiCpu, FiHeart, FiEdit3, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Umbi - Why I Started This Blog',
  description: 'Umbi is an independent blog by a lifelong learner sharing real-world insights on personal finance, technology, and wellness. Learn about our story and editorial approach.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/about',
  },
  openGraph: {
    title: 'About Umbi - Why I Started This Blog',
    description: 'An independent blog sharing real-world insights on personal finance, technology, and wellness.',
    url: 'https://umbi-blog.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>

      {/* Hero - Personal */}
      <section className="py-20 bg-white border-b border-neutral-200">
        <div className="container-custom max-w-3xl text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full text-indigo-700 mb-6">
            <FiBookOpen size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            Hi, I&apos;m Ummbi.
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: 'var(--color-neutral-600)' }}>
            Welcome to my corner of the internet. I started this blog because I was tired of
            sifting through clickbait and shallow advice when trying to learn about money,
            tech, and health. So I decided to create the resource I wished existed.
          </p>
        </div>
      </section>

      {/* My Story */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            Why I Started Umbi
          </h2>
          <div className="text-neutral-600 space-y-5 text-lg leading-relaxed">
            <p>
              A few years ago, I realized I was terrible with money. I had no budget, no savings plan,
              and I was constantly stressed about finances. So I started reading &mdash; a lot. Personal finance
              books, investment blogs, tax guides. The more I learned, the more frustrated I became with
              how <strong>needlessly complicated</strong> most financial advice was.
            </p>
            <p>
              The same thing happened when I tried to keep up with technology. Every &quot;best tools&quot; article
              was either a thinly veiled ad or so surface-level it was useless. And don&apos;t get me started
              on wellness content &mdash; the amount of pseudoscience out there is staggering.
            </p>
            <p>
              That frustration became the spark for Umbi. I wanted to build a place where:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Complex topics are explained simply</strong> &mdash; without dumbing them down</li>
              <li><strong>Every claim is backed by research</strong> &mdash; with links to actual sources</li>
              <li><strong>Recommendations are honest</strong> &mdash; I only write about things I&apos;ve actually tried or thoroughly researched</li>
              <li><strong>No paywalls, no gimmicks</strong> &mdash; just useful, free content</li>
            </ul>
            <p>
              I&apos;m not a financial advisor, a doctor, or a Silicon Valley engineer. I&apos;m a curious person
              who spends way too much time researching these topics and wants to share what I&apos;ve learned.
              When I write about a budgeting method, it&apos;s because I&apos;ve tried it myself. When I recommend
              a productivity app, it&apos;s because it&apos;s on my phone right now.
            </p>
            <p>
              Umbi isn&apos;t a faceless media company. It&apos;s a one-person project fueled by genuine curiosity
              and a belief that good information should be accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* What I Write About */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
              What I Write About
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-neutral-600)' }}>
              Three topics that I believe make the biggest difference in everyday life.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700 inline-block mb-4">
                <FiDollarSign size={24} />
              </div>
              <h3 className="font-bold text-emerald-900 text-xl mb-3">Personal Finance</h3>
              <p className="text-emerald-800 mb-4 leading-relaxed">
                I went from having zero savings to building a solid financial foundation using the strategies
                I share here. Budgeting, investing, debt payoff &mdash; all tested in real life.
              </p>
              <ul className="text-emerald-700 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Budgeting methods I actually use</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Beginner-friendly investment guides</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Debt payoff strategies that work</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-emerald-500">&#10003;</span> Real numbers, real examples</li>
              </ul>
              <Link href="/finance" className="inline-block mt-6 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors">
                Read Finance Articles &rarr;
              </Link>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-700 inline-block mb-4">
                <FiCpu size={24} />
              </div>
              <h3 className="font-bold text-blue-900 text-xl mb-3">Tech & Productivity</h3>
              <p className="text-blue-800 mb-4 leading-relaxed">
                As someone who uses technology daily for work and personal projects, I test tools
                hands-on before writing about them. No sponsored placements, no affiliate-first reviews.
              </p>
              <ul className="text-blue-700 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> AI tools I use every day</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> Honest productivity app reviews</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> Privacy and security guides</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-blue-500">&#10003;</span> Step-by-step setup tutorials</li>
              </ul>
              <Link href="/tech" className="inline-block mt-6 text-blue-700 font-semibold hover:text-blue-900 transition-colors">
                Read Tech Articles &rarr;
              </Link>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-700 inline-block mb-4">
                <FiHeart size={24} />
              </div>
              <h3 className="font-bold text-purple-900 text-xl mb-3">Health & Wellness</h3>
              <p className="text-purple-800 mb-4 leading-relaxed">
                I got into wellness research after realizing my sleep, exercise, and eating habits were
                all over the place. Every recommendation here is backed by peer-reviewed studies.
              </p>
              <ul className="text-purple-700 text-sm space-y-2">
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Evidence-based fitness routines</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Nutrition without the fads</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Sleep optimization strategies</li>
                <li className="flex items-start gap-2"><span className="mt-1 text-purple-500">&#10003;</span> Mental health and stress management</li>
              </ul>
              <Link href="/wellness" className="inline-block mt-6 text-purple-700 font-semibold hover:text-purple-900 transition-colors">
                Read Wellness Articles &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How I Create Content */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            How I Create Content
          </h2>
          <p className="text-neutral-600 mb-10 text-lg leading-relaxed">
            I take accuracy seriously. Here&apos;s the process behind every article on this site:
          </p>
          <div className="space-y-6">
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                <FiBookOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">Deep Research</h3>
                <p className="text-neutral-600 leading-relaxed">Every article starts with hours of research. I read academic papers, government data, expert opinions, and competing articles to find the most accurate and useful information.</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <FiCheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">Personal Testing</h3>
                <p className="text-neutral-600 leading-relaxed">When I recommend a tool, strategy, or habit, I try it first. If I suggest a budgeting app, I&apos;ve used it for at least a week. If I recommend an exercise routine, I&apos;ve done it myself.</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <FiEdit3 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">Clear Writing</h3>
                <p className="text-neutral-600 leading-relaxed">I break down complex topics into simple, actionable steps. No jargon without explanation. No walls of text. Every article is structured to help you actually do something with the information.</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                <FiShield size={20} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">Source Verification</h3>
                <p className="text-neutral-600 leading-relaxed">Statistics and claims are linked to their original sources wherever possible. If I can&apos;t verify a claim, I don&apos;t include it. Period.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Note */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-amber-900" style={{ fontFamily: 'var(--font-display)' }}>
            A Note on Transparency
          </h2>
          <div className="text-amber-800 space-y-4 leading-relaxed">
            <p>
              <strong>I&apos;m not a certified professional.</strong> I don&apos;t have a CFP, MD, or CS degree.
              What I do have is a genuine passion for research and a commitment to accuracy.
              When topics require professional expertise, I clearly note that readers should
              consult qualified professionals.
            </p>
            <p>
              <strong>This blog may contain affiliate links in the future.</strong> If and when it does,
              I&apos;ll always disclose them clearly. My recommendations will never be influenced by
              compensation &mdash; I&apos;d rather recommend nothing than recommend something I don&apos;t believe in.
            </p>
            <p>
              <strong>I make mistakes.</strong> If you find an error in any article, please{' '}
              <Link href="/contact" className="underline font-semibold hover:text-amber-900">let me know</Link>{' '}
              and I&apos;ll correct it promptly with a transparent update note.
            </p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">45+</div>
              <p className="text-neutral-600 text-sm">In-Depth Articles</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">3</div>
              <p className="text-neutral-600 text-sm">Core Topics</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">5+</div>
              <p className="text-neutral-600 text-sm">Interactive Tools</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">1500+</div>
              <p className="text-neutral-600 text-sm">Words Per Article (avg)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <FiMail className="mx-auto text-4xl mb-6 text-indigo-400" />
          <h2 className="text-3xl font-bold mb-4">Have a Question or Suggestion?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            I genuinely read every message. Whether it&apos;s a topic request, a correction, or just
            to say hi &mdash; I&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="px-8 py-3 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
              Read Latest Articles
            </Link>
            <Link href="/contact" className="px-8 py-3 border border-neutral-700 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
              <FiMail /> Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
