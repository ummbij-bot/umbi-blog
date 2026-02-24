import FinanceQuiz from '@/components/tools/FinanceQuiz';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Literacy Quiz - Test Your Money Knowledge | Umbi Finance',
  description:
    'Take our free 10-question financial literacy quiz covering budgeting, investing, credit scores, retirement planning, and more. Get personalized article recommendations based on your score.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/finance/tools/quiz',
  },
  openGraph: {
    title: 'Financial Literacy Quiz - Test Your Money Knowledge',
    description:
      'How much do you really know about personal finance? Take our 10-question quiz and find out.',
    url: 'https://umbi-blog.vercel.app/finance/tools/quiz',
    type: 'website',
  },
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-stone-900">
      {/* Header Section */}
      <section className="pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/finance"
              className="inline-flex items-center gap-2 font-medium text-stone-400 hover:text-emerald-400 transition-colors"
            >
              <FiArrowLeft /> Back to Finance
            </Link>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                Interactive Tool
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Financial Literacy Quiz
            </h1>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Test your knowledge of personal finance with 10 questions covering
              budgeting, investing, credit, taxes, and retirement. Get
              personalized reading recommendations based on your score.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <FinanceQuiz />
        </div>
      </section>

      {/* Custom animation keyframes injected via style tag */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
