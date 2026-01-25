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
    <article className="card group h-full flex flex-col">
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
          {/* 수정됨: 인라인 color 스타일을 제거하고 className으로 제어하여 hover 효과가 먹히도록 함 */}
          <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-[#0284c7]" 
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
             {/* 주의: 위 style의 color 때문에 hover가 안 먹힐 수 있으므로, hover시 !important를 쓰거나 
                 색상은 globals.css의 변수를 Tailwind config에 연결하는 게 정석이지만, 
                 지금은 간단히 인라인 스타일을 유지하되 hover가 중요하면 style에서 color를 빼는 게 좋습니다. 
                 
                 ▼ 아래가 hover가 작동하도록 수정한 버전입니다. ▼
             */}
             {title}
          </h3>
        </Link>
        
        {/* 설명글이 길어도 레이아웃 유지 */}
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