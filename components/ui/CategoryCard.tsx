import Link from 'next/link';
import { ReactNode } from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
}

export default function CategoryCard({ title, description, href, icon, color }: CategoryCardProps) {
  return (
    <Link href={href} className="card group">
      <div className="p-8">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
             style={{ backgroundColor: color }}>
          <div className="text-white text-3xl">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--color-neutral-600)' }}>
          {description}
        </p>
        <div className="mt-6 flex items-center gap-2" style={{ color: color }}>
          <span className="font-semibold">Read More</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}