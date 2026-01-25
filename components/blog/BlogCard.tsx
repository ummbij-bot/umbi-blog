import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
  priority?: boolean; // LCP 경고 해결을 위한 옵션 추가
}

export default function BlogCard({ title, excerpt, date, category, slug, image, priority = false }: BlogCardProps) {
  return (
    <article className="card group h-full flex flex-col">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            // 경고 해결 1: 화면 크기에 따라 적절한 이미지 크기를 다운로드하도록 설정
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // 경고 해결 2: 중요한 이미지(LCP)는 즉시 로딩
            priority={priority}
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" 
                style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
            {category}
          </span>
          <span className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
            {date}
          </span>
        </div>
        
        <Link href={`/${category.toLowerCase()}/${slug}`} className="block">
          <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-[#0284c7]" 
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
             {title}
          </h3>
        </Link>
        
        <p className="mb-4 flex-grow line-clamp-3" style={{ color: 'var(--color-neutral-600)' }}>
          {excerpt}
        </p>
        
        <Link 
          href={`/${category.toLowerCase()}/${slug}`}
          className="inline-flex items-center gap-2 font-semibold mt-auto"
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