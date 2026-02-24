import BudgetPlanner from '@/components/tools/BudgetPlanner';
import Link from 'next/link';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';

export const metadata = {
  title: 'Monthly Budget Planner - Free Budget Calculator | Umbi',
  description:
    'Plan your monthly budget using the 50/30/20 rule. Allocate your income across needs, wants, and savings with our free interactive budget planner and get personalized tips to improve your finances.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/finance/tools/budget-planner',
  },
  openGraph: {
    title: 'Monthly Budget Planner - Free Budget Calculator | Umbi',
    description:
      'Plan your monthly budget using the 50/30/20 rule. Allocate income across needs, wants, and savings with our free interactive calculator.',
    url: 'https://umbi-blog.vercel.app/finance/tools/budget-planner',
    type: 'website',
  },
};

export default function BudgetPlannerPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20" style={{ backgroundColor: '#fefdfb' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-stone-500 flex-wrap">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <FiChevronRight className="inline w-3.5 h-3.5" />
            </li>
            <li>
              <Link
                href="/finance"
                className="hover:text-emerald-600 transition-colors"
              >
                Finance
              </Link>
            </li>
            <li>
              <FiChevronRight className="inline w-3.5 h-3.5" />
            </li>
            <li className="font-medium text-stone-900">Budget Planner</li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/finance"
            className="inline-flex items-center gap-2 font-medium text-stone-500 hover:text-emerald-600 transition-colors"
          >
            <FiArrowLeft /> Back to Finance
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900">
            Monthly Budget Planner
          </h1>
          <p className="text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with the 50/30/20 budgeting rule.
            Enter your income, allocate your expenses across needs, wants, and
            savings, and get personalized tips to optimize your budget.
          </p>
        </div>

        {/* Budget Planner Component */}
        <BudgetPlanner />

        {/* Related Articles Section */}
        <section className="mt-16 pt-12 border-t border-stone-200">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href="/finance/create-budget-that-works"
              className="group block bg-white rounded-2xl shadow-md border border-stone-200 p-6 hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                Finance
              </p>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-600 transition-colors mb-2">
                Create a Budget That Works
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Learn a step-by-step approach to building a realistic budget you
                can actually stick to every month.
              </p>
            </Link>

            <Link
              href="/finance/10-ways-save-money"
              className="group block bg-white rounded-2xl shadow-md border border-stone-200 p-6 hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                Finance
              </p>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-600 transition-colors mb-2">
                10 Ways to Save Money
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Discover practical, everyday strategies to boost your savings rate
                and keep more money in your pocket.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
