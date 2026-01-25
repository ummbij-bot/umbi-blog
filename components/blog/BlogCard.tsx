import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
}

export default function BlogCard({ title, excerpt, date, category, slug, image }: BlogCardProps) {
  return (
    <article className="card group">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" 
                style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
            {category}
          </span>
          <span className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
            {date}
          </span>
        </div>
        <Link href={`/${category.toLowerCase()}/${slug}`}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors" 
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
            {title}
          </h3>
        </Link>
        <p className="mb-4" style={{ color: 'var(--color-neutral-600)' }}>
          {excerpt}
        </p>
        <Link 
          href={`/${category.toLowerCase()}/${slug}`}
          className="inline-flex items-center gap-2 font-semibold"
          style={{ color: 'var(--color-primary-600)' }}
        >
          Read More
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}