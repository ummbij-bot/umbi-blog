import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
  priority?: boolean;
}

const categoryStyles: Record<string, { badge: string; accent: string; glow: string }> = {
  finance: {
    badge: 'bg-emerald-100 text-emerald-700',
    accent: 'text-emerald-600',
    glow: 'hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)]',
  },
  tech: {
    badge: 'bg-blue-100 text-blue-700',
    accent: 'text-blue-600',
    glow: 'hover:shadow-[0_4px_20px_rgba(59,130,246,0.12)]',
  },
  wellness: {
    badge: 'bg-purple-100 text-purple-700',
    accent: 'text-purple-600',
    glow: 'hover:shadow-[0_4px_20px_rgba(147,51,234,0.12)]',
  },
};

export default function BlogCard({ title, excerpt, date, category, slug, image, priority = false }: BlogCardProps) {
  const catKey = category.toLowerCase();
  const style = categoryStyles[catKey] || { badge: 'bg-stone-100 text-stone-700', accent: 'text-stone-600', glow: '' };

  return (
    <article className={`card group h-full flex flex-col ${style.glow}`}>
      {image && (
        <div className="relative h-48 overflow-hidden bg-stone-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${style.badge}`}>
            {category}
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          {!image && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>
              {category}
            </span>
          )}
          <span className="text-xs text-stone-400">{date}</span>
        </div>

        <Link href={`/${catKey}/${slug}`} className="block">
          <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-stone-600 text-stone-900 leading-snug line-clamp-2">
             {title}
          </h3>
        </Link>

        <p className="text-sm text-stone-500 mb-4 flex-grow line-clamp-2 leading-relaxed">
          {excerpt}
        </p>

        <Link
          href={`/${catKey}/${slug}`}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold mt-auto pt-3 border-t border-stone-100 ${style.accent}`}
        >
          Read More
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
