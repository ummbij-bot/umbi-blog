import BmiCalculator from '@/components/tools/BmiCalculator';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export const metadata = {
  title: 'Free BMI Calculator - Check Your Body Mass Index',
  description: 'Calculate your BMI quickly and accurately with our free tool.',
};

export default function BmiPage() {
  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <div className="container-custom">
        {/* 뒤로가기 */}
        <div className="mb-8">
          <Link 
            href="/wellness" 
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-rose-600"
            style={{ color: 'var(--color-neutral-500)' }}
          >
            <FiArrowLeft /> Back to Wellness
          </Link>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            Check Your Health Status
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-neutral-600)' }}>
            Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity.
          </p>
        </div>

        {/* 계산기 컴포넌트 */}
        <BmiCalculator />

      </div>
    </div>
  );
}