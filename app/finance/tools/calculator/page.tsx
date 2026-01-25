import CompoundInterestCalculator from '@/components/tools/CompoundInterestCalculator';
import Link from 'next/link';
// 아이콘 패키지가 설치되어 있어야 아래 줄에서 에러가 안 납니다.
import { FiArrowLeft } from 'react-icons/fi';

export const metadata = {
  title: 'Free Compound Interest Calculator - Umbi Finance',
  description: 'Calculate how your savings grow over time.',
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <div className="mb-8">
          <Link 
            href="/finance" 
            className="inline-flex items-center gap-2 font-medium text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <FiArrowLeft /> Back to Finance
          </Link>
        </div>

        {/* 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Watch Your Money Grow
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See the magic of compound interest.
          </p>
        </div>

        {/* 2단계에서 만든 계산기 부품을 여기서 사용합니다 */}
        <CompoundInterestCalculator />

      </div>
    </div>
  );
}